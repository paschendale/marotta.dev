---
title: "Migrando o n8n de 1.x para 2.x sem quebrar pipelines baseados em shell"
description: "Um guia prático sobre os padrões do n8n 2.x que desligam silenciosamente shell, arquivos e variáveis de ambiente — e as env vars que restauram o comportamento do n8n 1.x."
date: "2026-09-14"
slug: "why-platform-major-version-upgrades-break-automation-nobody"
coverImage: "/blog/why-platform-major-version-upgrades-break-automation-nobody/cover.svg"
author: "victor-marotta"
tags:
  - "n8n"
  - "automação"
  - "guia-de-migração"
  - "devops"
  - "geoprocessamento"
---

## O modelo sobre o qual o n8n 1.x te deixava construir

Se seus workflows de n8n só chamam APIs e movem JSON de um lado para outro, pode pular este texto. Mas se você construiu algo no n8n 1.x que chama ferramentas de linha de comando, lê variáveis de ambiente para configurar um runtime, ou escreve em caminhos arbitrários do disco, você construiu isso sobre um modelo de execução que o n8n 2.x não assume mais por padrão — e o upgrade não vai te avisar disso de um jeito que você perceba antes de produção.

Eu rodo uma imagem personalizada de n8n em várias implantações de clientes que embute ferramental geoespacial de verdade — QGIS, PDAL, tippecanoe, binários de processamento de LiDAR, um cliente de armazenamento de objetos — diretamente dentro do container. Os workflows não chamam uma API REST para reprojetar um arquivo ou gerar tiles de mapa; eles chamam as próprias ferramentas de linha de comando, leem entrada de volumes montados, escrevem a saída de volta em disco ou em armazenamento de objetos, e em alguns workflows importam bibliotecas de GIS dentro de um nó de código que precisa do ambiente Python do container. Isso só funciona porque o n8n 1.x rodava tudo no mesmo processo, no mesmo container, com o mesmo sistema de arquivos e ambiente de qualquer outra coisa rodando ali. Sem sandbox, sem modelo de permissão além do próprio container.

Essa é a suposição a verificar antes de qualquer migração de 1.x para 2.x: todo o valor do seu pipeline depende de capacidades que o n8n 1.x concedia de graça, sem nenhum interruptor para ligá-las?

## O que muda por padrão no n8n 2.x

O n8n 2.x vem com um modelo de execução mais seguro, e para a maioria dos usuários essa é a decisão certa. Quatro padrões mudaram que importam especificamente se você depende de acesso a shell, arquivos ou ambiente:

- **Executores de tarefa (task runners) vêm ligados por padrão.** A execução de código e scripts sai do processo principal do n8n e vai para um executor separado e isolado. Esse executor não herda o ambiente do container principal da mesma forma — incluindo coisas como um `PYTHONPATH` apontando para bindings de bibliotecas de GIS. Um workflow que antes importava uma biblioteca geoespacial sem problema pode começar a falhar com um erro de importação que não tem nada a ver com o seu código.
- **O nó de Execução de Comando vem desabilitado por padrão.** Se alguma parte da sua automação roda um binário com argumentos, esse nó — e a lista de exclusão de nós que o controla — agora precisa ser reabilitado explicitamente.
- **Nós de código perdem acesso direto ao ambiente.** Qualquer coisa que lia uma variável de ambiente dentro de uma etapa de código para configurar comportamento em tempo de execução agora não recebe nada, silenciosamente, a menos que você reative.
- **O acesso a arquivos fica travado a um caminho restrito.** Workflows que liam ou escreviam em volumes montados fora do diretório de dados próprio do n8n — um padrão bem comum num pipeline que move arquivos entre armazenamento e etapas de processamento — vão começar a falhar em caminhos que antes funcionavam.

Nenhuma dessas mudanças aparece como uma quebra manchete. Elas aparecem como um workflow que roda, não produz erro óbvio, e silenciosamente faz a coisa errada — ou falha com uma mensagem que parece um bug no seu código, não um padrão da plataforma.

## O checklist de migração: as env vars que restauram o comportamento de 1.x

Para um pipeline que depende de acesso a shell, arquivos e ambiente do jeito que o 1.x permitia, este é o conjunto de variáveis de ambiente a configurar explicitamente antes de apontar tráfego de produção para o n8n 2.x:

```
N8N_RUNNERS_ENABLED=false
N8N_ENABLE_EXECUTE_COMMAND=true
NODES_EXCLUDE=[]
N8N_BLOCK_ENV_ACCESS_IN_NODE=false
N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES=false
N8N_RESTRICT_FILE_ACCESS_TO=
```

Algumas dessas merecem uma nota, porque o raciocínio importa mais do que o nome da flag:

- `N8N_RUNNERS_ENABLED=false` é a que precisa acertar primeiro. É tentador deixar os executores ligados e só configurá-los, mas um executor isolado rodando no próprio interpretador não vai herdar um ambiente cuidadosamente construído — caminhos do conda, bindings de biblioteca, qualquer coisa configurada especificamente para o container. Desabilitar os executores mantém a execução de código e de comandos no mesmo processo, contra o sistema de arquivos e ambiente reais do container, igual ao funcionamento do 1.x.
- `N8N_ENABLE_EXECUTE_COMMAND=true` e `NODES_EXCLUDE=[]` precisam ser configuradas as duas — são dois controles separados sobre o mesmo nó, e configurar só uma deixa ele desabilitado.
- `N8N_RESTRICT_FILE_ACCESS_TO=` combinado com `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES=false` é o par que restaura acesso irrestrito a arquivos; configurar só uma ainda deixa caminhos bloqueados.

Vale checar separadamente: releases menores do n8n 2.x mudaram a versão mínima exigida do Node.js mais de uma vez nos primeiros lançamentos da linha 2.x. Isso não é uma flag que você configura — é uma verificação de imagem base a fazer antes do deploy, não depois de algo falhar silenciosamente na inicialização do container.

## Onde conseguir esses números em vez de chutar

As env vars acima não vieram de ler as notas de release com mais cuidado — notas de release dizem que um padrão mudou, não qual flag reverte isso nem como as flags interagem entre si. O que resolveu foi comparar com uma implantação separada, já rodando o n8n 2.x, para uma carga de trabalho sem relação nenhuma, e ler a configuração dela linha por linha. Esse é o método de verdade, não "pesquisar até achar um post de blog": se você tiver qualquer implantação real de 2.x rodando em algum lugar, trate a configuração funcional dela como mais confiável do que a documentação, e compare com suas suposições antes de chutar.

## O que isso significa se você está planejando uma migração parecida

Antes de mover qualquer plataforma de orquestração através de uma versão maior quando seus workflows dependem mais de ferramentas de linha de comando do que de APIs:

- Liste toda capacidade fora do padrão que seus workflows usam: execução de shell, leitura direta de ambiente, caminhos de arquivo fora do diretório de dados próprio da plataforma, interpretadores customizados.
- Para cada uma, encontre a flag específica que a restaura na nova versão — não assuma que um único "modo de compatibilidade" cobre todas elas.
- Teste os comandos e operações de arquivo reais que seu pipeline executa, não só se a plataforma inicializa. Um log de inicialização limpo não diz nada sobre se seu nó de Execução de Comando ainda executa ou se seu nó de código ainda enxerga o interpretador que você configurou.
- Trate uma implantação real já rodando a nova versão, mesmo que de um projeto completamente diferente, como uma fonte de verdade melhor do que a documentação.

O upgrade em si não é o risco. Tratar um bump de versão maior como uma substituição direta, quando todo o seu pipeline roda sobre capacidades que a plataforma agora trata como exceções opcionais, é.
