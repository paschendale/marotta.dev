---
title: "Cresci com enchentes; hoje ajusto previsões como uma superfície"
description: "Um agrimensor de cidade de enchentes trata a previsão aberta de chuva do ECMWF como superfície a ajustar a pontos de controle. Resultados iniciais mistos."
date: "2026-11-23"
slug: "i-grew-up-with-floods-now-i-adjust-rain-forecasts-like-a"
coverImage: "/blog/i-grew-up-with-floods-now-i-adjust-rain-forecasts-like-a/cover.svg"
author: "victor-marotta"
tags:
  - "calibração de chuva"
  - "ecmwf"
  - "dados em grade"
  - "ajustamento geodésico"
  - "dados abertos"
---

## Guidoval

Sou de Guidoval e de Ubá, na Zona da Mata de Minas Gerais, e convivi com o medo das enchentes a vida inteira. Em Guidoval passei por muitas delas, entre elas as de 2008 e de 2012, e vi como elas quebraram a cidade. A lembrança mais nítida que tenho é de acordar no meio da noite para ajudar os vizinhos a levantar as coisas do chão, para que não perdessem tudo. E depois perdemos tudo mesmo assim, porque a chuva foi muito além de qualquer coisa que alguém pudesse esperar. Em 2012 o rio subiu mais de 11 metros, a ponte de entrada da cidade foi destruída e cerca de 6.000 pessoas ficaram isoladas ([Estado de Minas](https://www.em.com.br/app/noticia/gerais/2012/06/21/interna_gerais,301631/ponte-de-guidoval-e-inaugurada-seis-meses-apos-cidade-ser-arrasada-pela-chuva.shtml)).

Não moro mais lá. Em 23 e 24 de fevereiro deste ano a Zona da Mata alagou de novo. 73 pessoas morreram, 8 delas em Ubá, onde caíram 174 mm em três horas e meia ([Wikipédia](https://pt.wikipedia.org/wiki/Enchentes_e_deslizamentos_na_Zona_da_Mata_Mineira_em_2026)). A notícia chegou até mim pela família e pelos amigos, e fiquei morrendo de preocupação de que a chuva voltasse.

## O que mudou em outubro

A partir da rodada das 06Z de 20 de outubro de 2026, o ECMWF passou a publicar as previsões do IFS a 0,1°, cerca de 9 km, de graça, sob CC BY 4.0 ([fórum do ECMWF](https://forum.ecmwf.int/t/ecmwfs-9km-data-is-free-and-open-from-tuesday-20th-october/15459)). Foi isso que me pôs em movimento. Eu tinha passado os dois anos anteriores trabalhando com sistemas de meteorologia. Minha pergunta era se aquilo que eu sei fazer melhor (sensoriamento remoto, geoprocessamento e infraestrutura própria) poderia dar à minha região uma previsão melhor, e barata. A especificação do Ara, a plataforma que construí para descobrir, é de 19 de outubro.

Há duas resoluções em jogo aqui, e elas não podem ser confundidas. As previsões do histórico do Ara são os arquivos que o ECMWF publicava antes de outubro, com resolução nativa de 0,25°. O Ara os reamostra para a sua grade de análise de 0,1°, que coincide com a malha do MERGE, de modo que previsão e observação compartilham as mesmas células. A reamostragem coloca os dois nas mesmas células; ela não acrescenta detalhe. Um campo de 0,25° numa grade de 0,1° continua carregando informação de 0,25°. Todos os números deste post vêm desse histórico. Os arquivos de 9 km começam na rodada de 20 de outubro, então ainda não estão nele.

O Ara custa US$ 0 além da minha conta de luz. Roda na minha máquina de desenvolvimento e no plano gratuito da Cloudflare, pensado para continuar quase de graça pelo menos nas primeiras centenas de usuários. Isso me custou uma lição: armazenamento de objetos cobra por operação, e um histórico em Zarr é uma quantidade enorme de objetos pequenos. 852 mil deles saíram do R2 para um armazenamento próprio, e o R2 agora guarda só o que é servido.

## Uma superfície de modelo e seus pontos de controle

Este é o enquadramento que usei, e qualquer agrimensor o conhece. A previsão do ECMWF na grade de 0,1° é a superfície do modelo. Meus pontos de controle são:

- a grade diária de chuva do MERGE (pluviômetros combinados com satélite)
- a temperatura em grade do SAMeT
- as estações do INMET e do CEMADEN, lidas na sua célula nativa, sem interpolação

Todo ajustamento tem de responder à mesma pergunta: a superfície ajustada é melhor que a não ajustada nos pontos que ela nunca viu?

Antes de ajustar qualquer coisa ao controle, você confere o controle. Os rótulos de dia do SAMeT cobrem janelas de 24 horas diferentes. A temperatura máxima com rótulo do dia D é o dia das 12Z que termina em D+1. Medi isso antes de montar um único par. Pareie pelo rótulo e você compara a previsão com a tarde errada.

Testei o MERGE contra 4.126 pluviômetros do INMET e do CEMADEN, em 1,46 milhão de estações-dia. Ele marca 10–15% abaixo dos pluviômetros, tanto perto dos seus próprios pluviômetros quanto longe deles, e mostra só metade a dois terços dos dias de 50 mm. Esse é o limite deste controle, e ele pesa justamente onde mais me importa. Dá para confiar no MERGE para dizer se um dia foi chuvoso. Para chuva intensa, ele é uma referência baixa: todo número de dia de chuva forte daqui em diante é medido contra o MERGE, portanto descreve o modelo diante de uma verdade que já perde parte da cauda. A cauda pesada precisa ser conferida contra as estações.

## Onde a superfície bruta erra

Comparei a previsão com o MERGE célula a célula sobre o Brasil, de fevereiro de 2024 a outubro de 2025. Em quantidade, o maior erro são dias demais de chuva fraca. No dia 1, o ECMWF molha 47% das células-dia, contra 33% no MERGE.

O erro que mais importa é o dia de chuva forte. Nos dias chuvosos, o percentil 99 da chuva é 39 mm no modelo contra 60 mm no MERGE, e a cauda do próprio MERGE já fica aquém dos pluviômetros. O modelo prevê dias de 50 mm com um quarto da frequência com que eles acontecem e, no dia 1, acerta 6% deles. A noite de Guidoval fica na parte da distribuição que a superfície bruta não alcança. Uma célula de grade com quilômetros de lado não enxerga uma tempestade de um lado do morro.

## Ajustar por região, avaliar em meses que o ajuste nunca viu

Ajusto a chuva por região, nem por célula nem para o país inteiro. Rodei k-means sobre a climatologia do MERGE (forma sazonal, frequência de dias chuvosos e intensidade). Isso dá 12 regimes de chuva, que se dividem em 15 regiões contíguas cobrindo 72.086 células. O agrupamento tem de seguir o clima: num ajuste para o Brasil inteiro, a garoa do Nordeste e os dias de chuva forte do Sudeste se anulariam. É o mesmo motivo pelo qual não se força uma única transformação sobre blocos que se comportam de forma diferente.

O método é mapeamento de quantis dentro de cada região. Avaliei deixando um mês de fora por vez, de maio a outubro de 2025, no dia 1:

- razão de chuva: 1,30 → 1,01
- viés de frequência de dias chuvosos: 1,47 → 0,99
- viés de frequência de 50 mm: 0,49 → 1,08
- MAE: cai 6%, em todos os dias de antecedência
- RMSE: sobe 10%

A quantidade de dias de chuva forte agora está mais ou menos certa, em relação ao MERGE. A queda do MAE pede uma leitura cuidadosa. Para uma previsão de valor único, o CRPS se reduz ao erro absoluto, então o MAE é o CRPS de uma previsão única, a mesma métrica que o critério de publicação lê. Uma queda de 6% é uma primeira vitória sobre o ECMWF bruto na própria métrica do critério. Mas não é o critério: são meses do período de treino, avaliados deixando um mês de fora, não o ano reservado, e o escore de Brier ainda não entra.

A alta do RMSE é a parte honesta. Quando um dia de chuva forte cai no lugar errado, o RMSE o pune duas vezes: uma onde a chuva caiu e outra onde ela foi prevista. Os índices de acerto (threat scores) quase não se mexem. Esse é o limite a ter em mente: o ajuste corrige frequência e volume, com que frequência chove e quanto chove, mas não onde. O mapeamento de quantis altera cada valor no lugar; ele não consegue mover uma tempestade de uma célula para a outra. Um dia de chuva forte previsto sobre o vale errado continua sobre o vale errado, agora com a quantidade certa de chuva. Posicionar os dias de chuva forte é tarefa da próxima etapa, pelas probabilidades do ensemble.

As ressalvas importam. É uma única estação, majoritariamente seca, e um único ciclo do modelo, e ainda não é o método final.

A temperatura se comporta de outro jeito, e eu a corrijo por célula. O MAE da máxima diária no dia 1 vai de 1,35 para 1,05 °C, com o mesmo ganho nas células das estações (1,41 → 1,11). Agrupar com as vizinhas piorou, porque o agrupamento suaviza o relevo que torna cada célula diferente. Chuva pede regiões; temperatura pede a célula.

## A régua vem antes da resposta

A climatologia é o piso: uma previsão tem de superar a mediana do MERGE para aquela célula e aquele dia do ano. A barra que decide a publicação é mais alta. O produto ajustado tem de superar o ECMWF bruto em CRPS e no escore de Brier num ano reservado, de 1º de novembro de 2025 a 31 de outubro de 2026, no qual nenhum parâmetro foi escolhido. Também não pode ser pior em nenhuma faixa de antecedência, julgado contra um bootstrap em blocos de dias inteiros. Fixei essa regra antes de rodar qualquer experimento, do jeito que se definem as tolerâncias antes do ajustamento, e não depois de ver os resíduos. O veredito vai ter um post próprio.

Por enquanto a resposta é honesta e mista. Ajustar a previsão às observações dentro de 15 regiões de chuva supera o ECMWF bruto em MAE e deixa a quantidade de dias de chuva forte mais ou menos certa, fora da amostra. Ainda não coloca esses dias no lugar certo, e o lugar certo é o que uma cidade de enchentes precisa.

## O que eu quero de verdade

Meu objetivo para o Ara é o nowcasting. O CEMADEN faz um ótimo trabalho dando à Defesa Civil seus alertas de curto prazo. Mas, como cidadão, eu preciso de mais: ser avisado mais cedo e com mais precisão, com tempo para me preparar, sem depender só dos alertas da Defesa Civil.

Nas próximas semanas vou escrever mais sobre o Ara. Em dezembro vou escrever sobre o TempoFirme, o app de tempo que estou construindo em cima dele.
