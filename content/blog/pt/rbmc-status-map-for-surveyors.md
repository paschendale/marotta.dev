---
title: "Monitoramento RBMC"
description: "Como usei o Sentinel pra acompanhar as 157 estações da RBMC — e o que isso muda pro IBGE e pra quem usa RTK e pós-processamento."
date: "2026-09-16"
slug: "rbmc-status-map-for-surveyors"
coverImage: "/blog/rbmc-status-map-for-surveyors/cover.png"
author: "victor-marotta"
tags:
  - "rbmc"
  - "gnss"
  - "agrimensura"
  - "ntrip"
  - "open-source"
---

Estou há um ano no IBGE, e recentemente migrei da área de cartografia para geodésia, e resolvi pegar pra trabalhar um problema que eu sempre vejo nos grupos de WhatsApp de agrimensores que estou. Sempre tem uma conversa assim:

"A estação VICO tá fora do ar?"

"Tá sim, desde semana passada."

"Puts, tava precisando fazer um NTRIP na região."

Bom, é verdade, a RBMC cai muito. E nem sempre é culpa do IBGE.

Atualmente a RBMC tem 157 estações, quase todas instaladas em instituições parceiras pelo Brasil inteiro. É universidade, instituto federal, INMET, INCRA, e mais um monte de lugar. Cada instalação segue critérios muito rígidos de posicionamento, rede elétrica, rede lógica, estabilidade, mas a verdade é que mesmo com todo cuidado do mundo, coisas acontecem. Cai internet, cai energia, cai raio que propaga na rede lógica (acredite, acontece) queimando saída de rede, de tudo.

![Mapa das estações da RBMC no Brasil, coloridas por status](/blog/rbmc-status-map-for-surveyors/mapa.png)

E monitorar essas 157 estações não é fácil, ainda mais que até então, a saída para nós aqui no IBGE era verificar se o dado estava chegando no servidor do NTRIP, identificar as falhas e entrar em contato posteriormente.

Foi então que eu resolvi pegar uma solução que uso em diversos projetos — o Sentinel — e dar uma adaptada pra fazer funcionar aqui.

## O que é o Sentinel?

> Parte técnica, pule se não quiser ficar entediado.

Sentinel é uma plataforma de monitoramento sintético que eu desenvolvi para monitorar freshness, uptime e lógica de aplicações na web que precisem passar por esse tipo de checagem constante.

Por exemplo, imagine que eu tenho uma API que extrai dados de previsão do tempo. Eu preciso garantir que esses dados estejam sempre com no máximo 2 horas de distância da última atualização. O Sentinel me permite escrever um teste em JavaScript que garanta que essa condição seja atendida e, se não for, me manda uma notificação em algum lugar — Discord, Slack, webhook, tanto faz.

Na prática, um teste é uma função JavaScript com uma pequena API (`ctx`) que dá acesso a HTTP, download de arquivo, secrets, o que for preciso pra fazer a checagem. Ela roda numa agenda (a cada 5 minutos, a cada hora, o que você configurar) e devolve um de três resultados: passou, alerta (degradado) ou falhou. Toda mudança de estado dispara notificação, e cada execução fica guardada como histórico — dá pra olhar pra trás e ver exatamente quando e por quanto tempo algo ficou fora do ar.

## Como usar o Sentinel para monitorar a RBMC?

Usar o Sentinel pra monitorar a RBMC é simples. O IBGE expõe os dados do NTRIP através do servidor caster em `http://gps-ntrip.ibge.gov.br:2101/`.

Nesse endereço são expostas as informações de todas as 157 estações da RBMC, quando todas estão disponíveis — é o chamado *sourcetable* do protocolo NTRIP. Um check básico é feito pra garantir que um determinado código de estação apareça numa linha `STR` daquela resposta. Um trecho real, com a estação VICO (Viçosa) destacada:

```
CAS;gps-ntrip.ibge.gov.br;2101;Ntrip_Prof_1.5.8;IBGE;0;BRA;-22.91;-43.22;http://www.ibge.gov.br/home
NET;RBMC-IP;IBGE;B;N;http://www.ibge.gov.br/home/geociencias/geodesia/rbmc/rbmc.shtm;https://gps-ntrip.ibge.gov.br/skl/;http://www.ibge.gov.br/home/geociencias/download/tela_inicial.php;none
...
STR;VICO1;Vicosa;RTCM 3.0;1004(1),1006(1),1008(10),1012(1),1013(1),1019(15),1020(15),1033(10);2;GPS+GLO;RBMC-IP;BRA;-20.76;-42.87;0;0;TRIMBLE NETR9;none;B;N;1500;RBMC-VICO
```

Se o código da estação aparecer assim, numa linha `STR`, tá tudo certo — serviço OK. Se não aparecer, problema, serviço degradado ou fora do ar.

O bacana é que o Sentinel permite analisar o histórico de cada estação, e dá pra ver exatamente quando ela saiu do ar. E essa conversa lá do início não é hipotética: foi exatamente isso que aconteceu com a VICO. Olha o histórico dela:

![Histórico da estação VICO no Sentinel, mostrando um período fora do ar seguido de recuperação](/blog/rbmc-status-map-for-surveyors/vico-history.png)

## Melhorando um pouco mais

Da primeira vez que fiz esse monitoramento, senti que precisava de um tempero a mais. Pra isso, criei uma branch específica do Sentinel pra monitorar a RBMC, com um mapa, uma interatividade de histórico com ele, e uma alimentação da base de estações a partir do shapefile exportado do [BDG](http://www.bdg.ibge.gov.br/appbdg/) (Banco de Dados Geodésicos).

Essa parte resolve um problema chato: manter 157 testes atualizados na mão. Nessa branch, um job de sincronização lê o shapefile do BDG assim que o Sentinel sobe e sempre que o arquivo muda, e reconcilia um teste por estação automaticamente — sem precisar mexer em nada manualmente. Estação nova no shapefile ganha teste novo; estação que sai (desativada, removida) tem o teste desabilitado, nunca apagado, então o histórico continua lá se ela voltar. O mapa mostra cada estação colorida pelo status, e clicando numa estação dá pra ver as informações dela, o uptime dos últimos 30 dias e um link pro histórico completo:

![Mapa da RBMC com uma estação clicada, mostrando status, uptime e link para o histórico](/blog/rbmc-status-map-for-surveyors/mapa-com-clique.png)

Cada teste roda a cada 15 minutos, e as consultas ao caster ficam em cache por 60 segundos — então checar as 157 estações custa ao servidor do IBGE uma requisição por minuto, não 157. Não custa nada ser um bom vizinho da própria infraestrutura que a gente monitora.

O Sentinel é open source ([github.com/paschendale/sentinel](https://github.com/paschendale/sentinel)), e essa branch de monitoramento da RBMC tá publicada e disponível pra qualquer um em [rbmc.marotta.dev/status](https://rbmc.marotta.dev/status).

## Ok, mas pra que isso serve?

Aqui nós temos dois usos interessantes.

Primeiro, para o IBGE. O Sentinel nos permite identificar proativamente e tomar ações pra corrigir os acessos da RBMC com as instituições parceiras. Antes, se uma estação periférica ficava fora do ar, só percebíamos ao processar os dados da rede SIRGAS algumas semanas depois. Agora, o próprio Sentinel nos avisa.

Segundo, para a comunidade. Nós mesmos, enquanto engenheiros agrimensores e usuários da RBMC, temos informação sobre o status de cada estação. Fica mais fácil ter transparência sobre o funcionamento, e também cobrar a nós mesmos (enquanto IBGE) pelo funcionamento delas.
