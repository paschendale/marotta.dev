---
title: "Olá. Sou o Victor, e é isto que eu faço."
description: "Um engenheiro agrimensor que acabou escrevendo software: como fui dos levantamentos de campo aos planos de controle de orquestração, e para que serve este blog."
date: "2026-09-14"
tags: [sobre, agrimensura, sig, software]
---

Me formei engenheiro agrimensor e cartógrafo. Nos primeiros anos de carreira fiz o que isso implica: levantamentos topográficos, processamento GNSS, campanhas cadastrais em municípios pequenos de Minas Gerais, um ou outro projeto de loteamento. Eu gostava. Ainda gosto. Mas todo projeto terminava do mesmo jeito: com uma pilha de dados que alguém precisava ver em um mapa, e esse alguém nunca tinha o software para abrir.

Então comecei a construir o software.

## Do cadastro ao código

O primeiro sistema de verdade que escrevi foi um framework para publicar dados de cadastro multifinalitário na web, durante os anos de pesquisa na Universidade Federal de Viçosa. Era feio e funcionava, e municípios que nunca tinham tido um mapa dos próprios lotes de repente tinham um no navegador. Essa experiência definiu o padrão de tudo o que veio depois: o problema interessante raramente é o algoritmo. É levar o dado espacial de onde foi produzido até quem precisa dele, com confiabilidade, sem um especialista em SIG no meio do caminho.

Depois liderei projetos cadastrais em empresas de engenharia e o desenvolvimento de produtos SIG na Topocart, onde fui o líder técnico do Geo360 LADM, o primeiro sistema de administração territorial do Brasil construído sobre a norma ISO 19152. No caminho concluí um mestrado em engenharia civil focado em bancos de dados espaciais e SIG e publiquei sobre modelagem de dados cadastrais e cadastros territoriais em PostGIS.

## Territorial

Em 2024 fundei a [Territorial](https://territorial.dev), uma pequena consultoria de engenharia. A ideia é simples: empresas cujo trabalho depende de dados espaciais normalmente precisam de software que ferramentas de prateleira não oferecem, e precisam de alguém que entenda tanto de geodésia quanto de deploy. É essa lacuna que eu preencho.

Pela Territorial lidero uma equipe de desenvolvedores, e o papel em cada projeto vai da arquitetura e do desenvolvimento a DevOps, consultoria e liderança técnica. Entre os clientes estão uma empresa sueca de tecnologia florestal, uma empresa de levantamentos hidrográficos e uma plataforma australiana de dados meteorológicos. Em paralelo, atuo no IBGE, o instituto nacional de estatística e cartografia, como Tecnologista em Informações Geográficas.

## As ferramentas que acabei escrevendo

Um tema recorrente: vivo precisando de infraestrutura que ainda não existe, então escrevo.

- O [Ordo](/pt/projects/ordo) é um plano de controle de orquestração que fica acima do n8n e dá a jobs de processamento com várias etapas as garantias que a automação de workflow sozinha não dá: contratos validados entre etapas, artefatos como estado de primeira classe, uma resposta clara para "o que aconteceu com o job 412".
- O [Sentinel](/pt/projects/sentinel) é uma plataforma de monitoramento sintético em que os testes são funções JavaScript em vez de YAML. Ele vigia toda plataforma que opero e, publicamente, a rede GNSS nacional do IBGE.
- Coisas menores também: o [sistema de faturamento](/pt/projects/territorial-invoices) que roda a Territorial, um [assistente no Discord](/pt/projects/territorial-assistant) que transforma meu histórico git em timesheets, um [razão pessoal](/pt/projects/finances) sobre nada além de PostgreSQL e PostgREST.

## Para que serve este blog

Pretendo escrever sobre a interseção em que vivo: agrimensura e geodésia de um lado, bancos de dados espaciais e engenharia de software do outro. Esperem notas sobre pipelines de nuvens de pontos, PostGIS, orquestração, monitoramento, modelos de dados cadastrais e os erros que cometi colocando tudo isso em produção. Alguns posts serão lições curtas; outros, histórias mais longas com começo, investigação e fim.

Se algo disso for útil, ou se você tem um problema parecido com os de cima, [fale comigo](mailto:victor@marotta.dev).
