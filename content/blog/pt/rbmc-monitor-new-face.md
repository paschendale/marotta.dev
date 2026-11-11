---
title: "O monitor da RBMC está de cara nova"
description: "O mapa das estações da RBMC em rbmc.marotta.dev foi refeito: estados mais claros, painel por estação, modo claro e escuro, e sem alarme por oscilação."
date: "2026-11-30"
slug: "rbmc-monitor-new-face"
coverImage: "/blog/rbmc-monitor-new-face/cover.png"
author: "victor-marotta"
tags:
  - "rbmc"
  - "gnss"
  - "agrimensura"
  - "ntrip"
  - "open-source"
---

Em setembro eu escrevi sobre [monitorar a RBMC](/pt/blog/rbmc-status-map-for-surveyors): o Sentinel acompanhando as 157 estações da rede GNSS contínua do IBGE pelo caster NTRIP da RBMC-IP, com um mapa que qualquer um pode abrir. Desde então, o mapa encontrou o seu público. Os agrimensores adoraram. Eles abrem o mapa antes de ir a campo para ver se a sessão NTRIP que planejaram vai funcionar e, quando a estação deles está fora, entram em contato com o IBGE para que ela volte. Do lado do IBGE, a adoção tem sido mais lenta; por lá ainda é cedo.

Agora o monitor está de cara nova. Mesmo endereço, [rbmc.marotta.dev](https://rbmc.marotta.dev), mesmas estações, refeito do zero.

![O mapa das estações da RBMC: 157 estações com cor e forma conforme o estado](/blog/rbmc-monitor-new-face/rbmc-map-dark.png)

## O mapa vem primeiro

Abra o endereço e o mapa é a primeira coisa que você vê, com a lista completa de estações logo abaixo. Cada estação é desenhada com uma forma e uma cor:

- um **círculo verde** é uma estação Operational (operando);
- um **triângulo amarelo** é Degraded (degradada): está falhando há menos de uma hora, ou acabou de voltar e ainda está se provando;
- um **quadrado vermelho** está em Outage (fora do ar);
- um anel vazado significa que ainda não há dados, e uma barra curta significa que a estação está pausada.

As formas estão ali para que ninguém precise distinguir vermelho de verde para ler o mapa: funciona para agrimensores daltônicos e no celular debaixo do sol. Abaixo do mapa, uma linha conta as estações em cada estado. No dia em que escrevo, 11 de novembro de 2026, ela mostra 157 estações: 112 operando, 43 fora do ar, 2 degradadas.

## Clique numa estação

Clicar numa estação abre um painel com o que o agrimensor precisa antes de sair: o estado, a disponibilidade nos últimos 30 dias, os mountpoints que o caster está listando para ela agora (por exemplo `VICO0`, RTCM 3.2) e um link para o histórico completo.

![Uma estação clicada no mapa: estado, disponibilidade em 30 dias, mountpoints ativos e link para o histórico](/blog/rbmc-monitor-new-face/rbmc-panel.png)

O histórico é a parte que eu acho mais útil. Ele mostra a estação nas últimas 24 horas, 7 dias ou 30 dias, então dá para distinguir uma estação que caiu uma vez ontem à noite de uma que está fora desde a semana passada. A segunda é a que vale uma mensagem para o IBGE, e agora você pode mandar a evidência junto.

A página segue o modo claro ou escuro do seu celular ou computador, tem um botão para ver os horários em UTC ou no seu fuso, e se atualiza sozinha a cada minuto.

![O mapa da RBMC no celular, no modo claro](/blog/rbmc-monitor-new-face/rbmc-mobile-light.png)

## Uma oscilação não é uma queda

Essa é a mudança que mais me importa, e foi decisão minha. Estações falham em oscilações. A internet do parceiro cai por dez minutos, a energia pisca, um roteador reinicia. Isso não é problema para quem está planejando um levantamento, e não deveria pintar o mapa de vermelho.

Então o monitor agora usa uma janela de uma hora. Uma estação só entra em Outage depois de passar uma hora inteira falhando. Quando ela volta, fica Degraded até completar uma hora inteira transmitindo, e só então fica verde de novo. No meio do caminho, um triângulo amarelo diz "vale dar uma olhada", e não "não conte com ela". Um quadrado vermelho agora quer dizer alguma coisa: essa estação está fora há tempo suficiente para afetar a sua sessão.

## Por baixo do capô

O monitor continua sendo o [Sentinel](https://github.com/territorial-dev/sentinel), a ferramenta open source que construí na Territorial, que ganhou nova identidade e foi reconstruída este mês. A parte da RBMC vivia num branch que estava ficando para trás; agora é um fork de verdade, [github.com/paschendale/sentinel-rbmc](https://github.com/paschendale/sentinel-rbmc), que recebe cada nova versão do Sentinel com um clique.

O que continua igual:

- A lista de estações continua vindo do shapefile exportado do Banco de Dados Geodésicos (BDG) do IBGE. Uma estação nova ganha sua própria verificação; uma que sai da lista tem a verificação pausada, nunca apagada, então o histórico continua lá se ela voltar.
- Cada estação é verificada a cada 15 minutos contra a sourcetable do caster, e a sourcetable fica em cache por 60 segundos, então acompanhar 157 estações continua custando ao servidor do IBGE uma requisição por minuto.
- Tudo o que aparece é dado público: o que o caster lista e há quanto tempo cada estação está sendo listada.

## Para que serve

Para os agrimensores, é um jeito de planejar de olhos abertos: verificar a base em que você vai confiar antes de pegar a estrada, e ver se ela é do tipo que cai por alguns minutos ou do tipo que está desligada há dias. Quando é do segundo tipo, o histórico é o começo da conversa com o IBGE.

Para o IBGE, é a mesma coisa vista do outro lado: um retrato da rede que não espera ninguém processar os dados semanas depois. Esse uso ainda está crescendo, e espero que a cara nova ajude.

Se você usa, me conta o que está faltando. O mapa está em [rbmc.marotta.dev](https://rbmc.marotta.dev).
