---
title: "Prospectando empresas geoespaciais com meu algoritmo, não o do LinkedIn"
description: "Como troquei um dia de buscas no LinkedIn por uma busca que eu controlo: as perguntas de encaixe que faço a uma empresa geoespacial e as regras que mantêm a prospecção honesta."
date: "2026-10-05"
slug: "prospecting-geospatial-firms-with-my-own-algorithm-instead"
coverImage: "/blog/prospecting-geospatial-firms-with-my-own-algorithm-instead/cover.svg"
author: "victor-marotta"
tags:
  - "mercado geoespacial"
  - "gis open source"
  - "prospecção"
  - "workflow"
  - "automação"
---

Durante anos, prospectar significou passar um dia no LinkedIn. Eu percorria conexões em comum, seguia o que o algoritmo do LinkedIn me colocava na frente, abria páginas de empresas e tentava adivinhar quem poderia precisar de uma software house geoespacial. Quando eu sentava e me dedicava a isso, levava um dia inteiro.

Numa empresa pequena acontece muita coisa, e esse dia raramente estava sobrando. Então eu prospectava quando dava, não toda semana. Desconfio que quase todo mundo que toca uma pequena empresa de topografia, mapeamento ou GIS e vende o próprio trabalho conhece esse padrão.

Além do tempo, há um segundo problema. O algoritmo do LinkedIn trabalha para o LinkedIn. Ele me mostra pessoas próximas de pessoas que eu já conheço, o que é um jeito estranho de achar uma empresa de mapeamento num país onde nunca trabalhei e que de fato poderia nos contratar.

Então construí o meu próprio. É o módulo de vendas do daemon de assistentes que já cuida das minhas horas trabalhadas. Ele roda há duas semanas, e há uma eu faço prospecção de verdade com ele. Este post é uma nota sobre como ele funciona e o que aprendi, ainda não uma história de sucesso.

## Meu próprio algoritmo

A busca é configurada por país e por tipo de empresa. Os países têm peso pela faixa de renda do Banco Mundial, porque alguns mercados conseguem pagar o que uma software house cobra e outros, na maioria, não. É um peso suave, não um filtro: uma empresa com bom encaixe ainda aparece, venha de onde vier. Antes, a régua dava um bônus fixo a qualquer coisa fora do Brasil, então uma empresa no Quênia e uma na Suécia tinham a mesma nota. Era um belo gesto pela diversidade e inútil para pagar as contas.

Cada empresa encontrada é então enriquecida: o site, as pessoas e o trabalho dela são pesquisados. Isso consome um orçamento semanal da minha assinatura do Claude, não uma cota diária fixa. Quando a semana está terminando e sobra capacidade, um modo burst a gasta encontrando mais empresas. Quando quero mais sugestões na hora, há um botão para isso.

O resultado, nas únicas palavras em que confio aqui: praticamente toda empresa que ele encontrou é uma que eu não teria encontrado sozinho. Posso mandar priorizar certos tipos de empresa e certos países, coisa que o LinkedIn nunca vai fazer por mim. É como ter seu próprio algoritmo trabalhando a seu favor.

## Encaixando a empresa na Territorial

Encontrar empresas geoespaciais é a parte fácil. O trabalho de verdade é decidir se uma empresa poderia mesmo nos contratar, e as perguntas que decidem isso só existem neste mercado:

- **Ela tem um time de software interno, e de que tamanho?** Uma empresa de topografia ou mapeamento sem desenvolvedores precisa de algo diferente de uma que tem um departamento de engenharia.
- **O que faríamos para ela: desenvolvimento de produto ou consultoria?** Construir o produto deles é uma conversa. Trabalhar ao lado de um time que já constrói esse produto é outra.
- **Ela já roda algo da nossa stack?** Uma empresa que já roda PostGIS, GeoServer, MapLibre ou ferramentas de nuvem de pontos já fez escolhas com as quais conseguimos trabalhar.
- **Ela trabalha com produtos Esri ou com open source?** Em geoespacial, essa costuma ser a linha que decide a conversa inteira. Um pitch que ignora isso é um pitch para a empresa errada.

As respostas não só filtram empresas. Elas dão forma ao pitch. O assistente não apenas encontra a empresa. Ele encaixa a empresa na Territorial, conduz o pitch e escolhe para quem escrever: primeiro o CTO, depois o CEO, depois o diretor de cartografia ou técnico. Uma empresa só entra na minha lista quando essa pessoa tem e-mail e perfil no LinkedIn, porque um contato que não consigo alcançar é só curiosidade.

O outro lado do encaixe é o que a Territorial de fato sabe fazer, e isso também não é uma lista fixa. O assistente aprende isso com a minha própria atividade: horas trabalhadas, repositórios, o que eu escrevo. Se eu começar a trabalhar com Kubernetes, Kubernetes passa a fazer parte do encaixe. Esse aprendizado merece um post próprio, e vai ganhar um.

## Sites de empresas geoespaciais estão quase sempre desatualizados

Essa foi a lição que mais custou. Os sites de empresas geoespaciais estão quase sempre desatualizados. Páginas de serviços, listas de projetos, os softwares que dizem usar. Meus primeiros rascunhos se ancoravam no que o enriquecimento tinha raspado, então corriam o risco de abrir com uma afirmação que deixou de ser verdade há anos. Também pareciam escritos por ninguém em particular.

Um site desatualizado não faz o pitch fracassar. Só exige mais cuidado. Por isso agora existe uma regra dos fatos: um rascunho só pode afirmar o que vem das palavras da própria empresa ou do próprio contato nos últimos doze meses, ou de uma página verificada ao vivo naquele mesmo dia. Cada rascunho lista os fatos que usa e se cada um foi verificado ao vivo, para eu ver com o que estou prestes a assinar embaixo.

## Um minuto por contato

Foi isso que mudou minha semana. Cada contato agora me toma cerca de um minuto: leio o briefing sobre a empresa e reviso um rascunho que já está no Gmail, escrito na minha voz. Deixo duas abas abertas, reviso, envio.

A maioria dos rascunhos precisa de pequenos ajustes. Faço isso principalmente ensinando minha voz ao assistente. Cada e-mail que envio é comparado com o rascunho de onde saiu, e as diferenças viram regras sobre como eu escrevo. Os primeiros e-mails seguem a forma que os meus já tinham: a situação, o problema como pergunta, o resultado, uma pergunta no final, de 150 a 220 palavras, mais uma nota no LinkedIn enviada no mesmo dia. Ainda é um trabalho em andamento, mas tem devolvido coisas boas.

Mais duas coisas mantêm tudo honesto, e aprendi as duas errando:

- **As conversas são rastreadas pela thread do Gmail, não pelo endereço.** As pessoas respondem de um endereço diferente daquele para o qual você escreveu. Rastreie pelo remetente e a resposta acaba sem dono. Anexar e-mails à mão também não é seguro. Uma vez tive que conferir os anexos de um dia contra a caixa de e-mail real, depois de colocar vários e-mails nas empresas erradas.
- **Uma resposta aparece no Today no momento em que chega.** No começo, as respostas só apareciam quando vencia o lembrete de respondê-las, dois dias úteis depois. Ou seja, o e-mail que mais precisava de resposta rápida era justamente o que o sistema escondia de mim. Agora a resposta aparece na hora, com um rascunho de resposta pronto.

## Onde está

Duas semanas rodando, uma semana de prospecção de verdade. Até agora vieram muitas respostas e algumas reuniões. Ainda não tenho números de quantas delas viram negócio de verdade, e não vou fingir que tenho. Volto a olhar daqui a seis meses.

Se você toca uma pequena empresa geoespacial e vende o próprio trabalho, a maquinaria é a parte menos transportável disto. O que se transporta são as perguntas: essa empresa tem um time de software, nós construiríamos ou assessoraríamos, ela está na nossa stack, Esri ou open source. Depois, uma regra de que toda afirmação que você faz sobre uma empresa vem das palavras recentes dela ou de uma página que você verificou hoje. Fazer essas perguntas é o que eu já fazia por instinto num bom dia de LinkedIn. Agora elas são feitas toda semana, sobre empresas que eu nunca teria alcançado, e o dia que eu não tinha virou um minuto que eu tenho.
