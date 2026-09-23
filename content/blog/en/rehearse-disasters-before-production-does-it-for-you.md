---
title: "Rehearse disasters before production does it for you"
description: "A hands-on GitOps runbook: minikube, Terraform, Argo CD app-of-apps, and three disaster drills to run before a real migration."
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

## The problem with untested runbooks

Every team has a disaster recovery doc somewhere — a wiki page, a `RUNBOOK.md` nobody opens outside onboarding. It says what to do when a deployment breaks or scaling misbehaves. Nobody has ever run it. Before migrating a client's production infrastructure to a new cluster, I built a throwaway local setup specifically to break on purpose. Here's the walkthrough — steal it before your next migration, not during it.

## What you need

- `minikube`, `kubectl`, `terraform`, the `argocd` CLI
- A git repo you control (a throwaway GitHub repo is fine)

## Step 1 — Spin up a disposable cluster

```bash
minikube start --cpus=4 --memory=8192 --driver=docker
kubectl get nodes
```

## Step 2 — Install Argo CD with Terraform

Use Terraform instead of a raw manifest — it's likely the same tool you'll use to provision the real cluster's supporting resources, so tracking infra state starts here.

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
argocd login localhost:8080 --username admin --password <password> --insecure
```

## Step 3 — Structure the deployment as app-of-apps

Layout in your git repo:

```
apps/
  root-app.yaml
  weather/
    argocd-app.yaml
    deployment.yaml
    service.yaml
```

`apps/root-app.yaml` — one Application that manages the rest from Git:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: root-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<you>/gitops-sandbox.git
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

`apps/weather/argocd-app.yaml` — the child app:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: weather-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<you>/gitops-sandbox.git
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

## Step 4 — Deploy something disposable

The app doesn't matter — a trivial weather API works fine. What matters is that it has replicas, a rollout strategy, and a real sync policy, so it fails the way a production deployment fails.

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

## Drill 1 — Manual fix vs. self-heal

With `selfHeal: true`, GitOps reconciles continuously. That also means an emergency manual fix gets silently undone.

```bash
# Emergency scale-down directly on the cluster
kubectl -n weather scale deployment weather-api --replicas=0

# Argo CD notices the drift and reverts it within seconds
kubectl -n weather get pods -w
```

Now disable self-heal on purpose and repeat:

```bash
argocd app set weather-api --self-heal=false
kubectl -n weather scale deployment weather-api --replicas=0
kubectl -n weather get pods
# this time it sticks

# resume normal operation
argocd app set weather-api --self-heal=true
argocd app sync weather-api
```

Knowing which flag to flip, and remembering to flip it back, is not obvious the first time. It's obvious the second time, if the first was a drill.

## Drill 2 — Reverting a bad scaling change

Push a bad replica count through Git, the way a real change would arrive:

```bash
sed -i '' 's/replicas: 2/replicas: 0/' apps/weather/deployment.yaml
git commit -am "oops" && git push
argocd app sync weather-api
kubectl -n weather get pods
```

Revert it the correct way — through Git, so the desired state stays truthful:

```bash
git revert HEAD --no-edit && git push
argocd app sync weather-api
```

Then time the fast-but-wrong path for comparison:

```bash
kubectl -n weather scale deployment weather-api --replicas=2
```

The manual command is faster in the moment and gets erased by the next sync. Knowing that tradeoff before an incident changes what your team reaches for under pressure.

## Drill 3 — Rolling back a bad deployment

Break the image tag on purpose:

```bash
sed -i '' 's/1.0.0/does-not-exist/' apps/weather/deployment.yaml
git commit -am "broken release" && git push
argocd app sync weather-api
kubectl -n weather get pods
# ImagePullBackOff
```

Roll back through Argo CD's own history:

```bash
argocd app history weather-api
argocd app rollback weather-api <REVISION_ID>
```

Or, as the emergency fallback when you can't wait for Git or CI:

```bash
kubectl -n weather rollout undo deployment/weather-api
```

Time both. If the Argo CD rollback takes ten minutes on a sandbox with nothing on the line, it will not magically take two during a real migration weekend.

## Turning the drills into a runbook

Write the exact commands you just ran — including the flags you had to look up — into a `RUNBOOK.md` next to the app-of-apps manifests. Not the theory. The commands, in the order that worked.

These drills are what shaped decisions on the real migration that followed: event-driven autoscaling backed by a message queue instead of static replica counts (manual scaling reverts were the clumsiest drill), a managed Postgres instance instead of in-cluster storage, a dedicated workflow engine instead of ad-hoc jobs, and a remote Terraform state backend chosen upfront instead of as an afterthought. None of that came from a whiteboard — it came from watching what was awkward to recover from in the sandbox.

## What this costs

A local cluster and a disposable app cost an afternoon. A rollback that fails under pressure during a real migration costs a lot more — in downtime, and in explaining afterward why the documented procedure didn't work when it mattered. Run the drills on a system with nothing to lose, before production runs them for you on a schedule it controls.
