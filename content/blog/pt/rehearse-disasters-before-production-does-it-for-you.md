---
title: "Ensaie desastres antes que a produção faça isso por você"
description: "Um runbook prático de GitOps: minikube, Terraform, Argo CD em app-of-apps e três ensaios de desastre antes de uma migração real."
date: "2026-09-23"
slug: "rehearse-disasters-before-production-does-it-for-you"
coverImage: "/blog/rehearse-disasters-before-production-does-it-for-you/cover.svg"
author: "victor-marotta"
tags:
  - "gitops"
  - "argocd"
  - "kubernetes"
  - "terraform"
  - "disaster-recovery"
---

## O problema com runbooks nunca testados

Toda equipe tem um documento de disaster recovery em algum lugar — uma página de wiki, um `RUNBOOK.md` que ninguém abre fora do onboarding. Ele diz o que fazer quando um deploy quebra ou o scaling se comporta mal. Ninguém nunca o executou. Antes de migrar a infraestrutura de produção de um cliente para um novo cluster, montei um setup local descartável especificamente para quebrar de propósito. Segue o passo a passo — roube isso antes da sua próxima migração, não durante ela.

## O que você precisa

- `minikube`, `kubectl`, `terraform`, a CLI `argocd`
- Um repositório git que você controla (um repo descartável no GitHub serve)

## Passo 1 — Suba um cluster descartável

```bash
minikube start --cpus=4 --memory=8192 --driver=docker
kubectl get nodes
```

## Passo 2 — Instale o Argo CD com Terraform

Use Terraform em vez de um manifesto cru — é provavelmente a mesma ferramenta que você vai usar para provisionar os recursos de suporte do cluster real, então rastrear o estado da infra começa aqui.

```hcl
# main.tf
terraform {
  required_providers {
    kubernetes = { source = "hashicorp/kubernetes", version = "~> 2.27" }
    helm       = { source = "hashicorp/helm",       version = "~> 2.12" }
  }
}

provider "kubernetes" { config_path = "~/.kube/config" }
provider "helm" {
  kubernetes { config_path = "~/.kube/config" }
}

resource "kubernetes_namespace" "argocd" {
  metadata { name = "argocd" }
}

resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = kubernetes_namespace.argocd.metadata[0].name
  version    = "6.7.3"
}
```

```bash
terraform init
terraform apply -auto-approve

kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d

kubectl -n argocd port-forward svc/argocd-argocd-server 8080:443 &
argocd login localhost:8080 --username admin --password <senha> --insecure
```

## Passo 3 — Estruture o deployment como app-of-apps

Estrutura no repositório git:

```
apps/
  root-app.yaml
  weather/
    argocd-app.yaml
    deployment.yaml
    service.yaml
```

`apps/root-app.yaml` — uma Application que gerencia o resto a partir do Git:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: root-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<voce>/gitops-sandbox.git
    targetRevision: main
    path: apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

`apps/weather/argocd-app.yaml` — a app filha:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: weather-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<voce>/gitops-sandbox.git
    targetRevision: main
    path: apps/weather
  destination:
    server: https://kubernetes.default.svc
    namespace: weather
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

```bash
kubectl create namespace weather
kubectl apply -f apps/root-app.yaml
argocd app list
```

## Passo 4 — Implante algo descartável

O app não importa — uma API de clima trivial serve. O que importa é que ele tenha réplicas, uma estratégia de rollout e uma política de sync real, para falhar do jeito que um deployment de produção falha.

```yaml
# apps/weather/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: weather-api
  namespace: weather
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate: { maxUnavailable: 1, maxSurge: 1 }
  selector: { matchLabels: { app: weather-api } }
  template:
    metadata: { labels: { app: weather-api } }
    spec:
      containers:
        - name: weather-api
          image: ghcr.io/example/weather-api:1.0.0
          ports: [{ containerPort: 8080 }]
```

```bash
git add . && git commit -m "deploy weather-api" && git push
argocd app sync weather-api
kubectl -n weather get pods -w
```

## Ensaio 1 — Correção manual vs. self-heal

Com `selfHeal: true`, o GitOps reconcilia continuamente. Isso também significa que uma correção manual de emergência é desfeita silenciosamente.

```bash
# Scale-down de emergência direto no cluster
kubectl -n weather scale deployment weather-api --replicas=0

# O Argo CD nota o drift e reverte em segundos
kubectl -n weather get pods -w
```

Agora desative o self-heal de propósito e repita:

```bash
argocd app set weather-api --self-heal=false
kubectl -n weather scale deployment weather-api --replicas=0
kubectl -n weather get pods
# desta vez, permanece

# retome a operação normal
argocd app set weather-api --self-heal=true
argocd app sync weather-api
```

Saber qual flag alternar, e lembrar de voltá-la depois, não é óbvio na primeira vez. Fica óbvio na segunda, se a primeira foi um ensaio.

## Ensaio 2 — Revertendo uma mudança de scaling ruim

Suba uma contagem de réplicas ruim pelo Git, do jeito que uma mudança real chegaria:

```bash
sed -i '' 's/replicas: 2/replicas: 0/' apps/weather/deployment.yaml
git commit -am "oops" && git push
argocd app sync weather-api
kubectl -n weather get pods
```

Reverta pelo caminho correto — via Git, para que o estado desejado continue verdadeiro:

```bash
git revert HEAD --no-edit && git push
argocd app sync weather-api
```

Depois, cronometre o caminho rápido-mas-errado para comparação:

```bash
kubectl -n weather scale deployment weather-api --replicas=2
```

O comando manual é mais rápido no momento e é apagado pelo próximo sync. Saber dessa troca antes de um incidente muda para onde sua equipe se volta sob pressão.

## Ensaio 3 — Rollback de um deployment ruim

Quebre a tag da imagem de propósito:

```bash
sed -i '' 's/1.0.0/does-not-exist/' apps/weather/deployment.yaml
git commit -am "broken release" && git push
argocd app sync weather-api
kubectl -n weather get pods
# ImagePullBackOff
```

Reverta usando o histórico do próprio Argo CD:

```bash
argocd app history weather-api
argocd app rollback weather-api <REVISION_ID>
```

Ou, como caminho de emergência quando não dá para esperar o Git ou o CI:

```bash
kubectl -n weather rollout undo deployment/weather-api
```

Cronometre os dois. Se o rollback pelo Argo CD leva dez minutos num sandbox sem nada em jogo, ele não vai magicamente levar dois durante um fim de semana de migração real.

## Transformando os ensaios em runbook

Escreva os comandos exatos que você acabou de rodar — incluindo as flags que precisou procurar — num `RUNBOOK.md` ao lado dos manifestos do app-of-apps. Não a teoria. Os comandos, na ordem que funcionou.

Foram exatamente esses ensaios que moldaram decisões na migração real que veio depois: autoscaling orientado a eventos apoiado numa fila de mensagens em vez de contagens estáticas de réplicas (a reversão manual de scaling foi o ensaio mais desajeitado), uma instância Postgres gerenciada em vez de armazenamento dentro do cluster, um engine de workflow dedicado em vez de jobs improvisados, e um backend remoto de estado do Terraform definido desde o início em vez de um detalhe posterior. Nada disso veio de um quadro branco — veio de observar o que era desajeitado de recuperar no sandbox.

## O que isso custa

Um cluster local e um app descartável custam uma tarde. Um rollback que falha sob pressão durante uma migração real custa muito mais — em downtime, e em explicar depois por que o procedimento documentado não funcionou quando importava. Rode os ensaios num sistema sem nada a perder, antes que a produção os rode por você num cronograma que ela controla.
