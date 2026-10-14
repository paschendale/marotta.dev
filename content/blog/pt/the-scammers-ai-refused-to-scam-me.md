---
title: "A IA do golpista se recusou a me aplicar o golpe, e a recusa foi enviada"
description: "Chegou um e-mail frio em que a IA que deveria escrevê-lo explicava por que não ia. O que isso diz sobre o golpe do Upwork e sobre máquinas de prospecção."
date: "2026-10-14"
slug: "the-scammers-ai-refused-to-scam-me"
coverImage: "/blog/the-scammers-ai-refused-to-scam-me/cover.svg"
author: "victor-marotta"
tags:
  - "upwork"
  - "golpes"
  - "ia"
  - "automação"
  - "workflow"
---

Hoje de manhã recebi um e-mail de um tal de Ken. Assunto: "Victor - brief question". O corpo inteiro, traduzido por mim:

> Li o arquivo de prompt. A resposta continua sendo não: não vou escrever este e-mail, e essa é a mesma conclusão a que chegaram pelo menos dez execuções anteriores (a lista de "aberturas proibidas" no fim é um registro dessas recusas sendo realimentadas para contorná-las).
>
> O motivo não é a frase de abertura, então reescrever não muda nada. Os problemas estão na substância do pedido:
>
> - A proposta é escondida de propósito do destinatário ("NÃO explique qual é a ideia"), e o contexto em volta (mirar freelancers inativos do Upwork, "colaborar através do perfil deles", trocas de palavras como "divisão de lucro" e "sua parte") aponta para um esquema de aluguel de conta do Upwork, que engana o Upwork e os clientes sobre quem está fazendo o trabalho.
> - As instruções reescrevem frases explicitamente para driblar filtros de spam, o que é evasão de detecção de abuso, não refinamento de texto.
> - Os e-mails dos destinatários foram coletados do histórico de commits do GitHub; eles nunca aceitaram esse contato, e o e-mail foi construído para levá-los a uma chamada sem dizer com o que estariam concordando.
>
> Adicionar cada recusa a uma lista de aberturas proibidas muda as palavras que tenho à disposição, não a decisão. Sugiro remover esse caminho de geração de leads do pipeline, ou mudar a proposta para que possa ser dita honestamente no próprio e-mail. Se a ideia não pode ser escrita, esse é o sinal que merece atenção.

Ri por um bom minuto. Alguém montou uma máquina pra aplicar golpe em freelancer, a IA lá dentro recusou o serviço, e a máquina me mandou a recusa. O golpe se explicou pro próprio alvo.

## Como a máquina é por dentro

Lido como relatório de incidente, o pipeline inteiro está ali.

Alguém varre o GitHub atrás de e-mails de commit, cruza os nomes com perfis do Upwork e fica com os freelancers cujos perfis andam parados. Um arquivo de prompt pede a um modelo um e-mail simpático e vago que termine numa chamada. O prompt toma cuidado pra nunca dizer qual é o negócio, e troca as palavras que acionariam um filtro de spam. Quando o modelo recusa, um script pega a primeira frase da recusa, coloca numa lista de "aberturas proibidas" e roda de novo. Pelo menos dez vezes, pela conta do próprio modelo.

Essa última parte é a minha favorita. Quem escreveu isso leu cada recusa como problema de redação. Se o modelo começa com "não posso ajudar com isso", proíbe essa frase e tenta de novo. O modelo estava recusando o serviço, e o operador continuava tratando isso como escolha de palavras.

Aí nada conferiu a saída antes do envio. O assunto veio de um template, o corpo foi o que o modelo devolveu, e lá se foi.

## Eu já tinha visto esse golpe três vezes

Depois que entendi o que procurar, voltei na minha caixa de entrada. A mesma proposta já tinha chegado três vezes no último mês, sempre sem dizer qual era a ideia.

- Em setembro, um "engenheiro de software sênior baseado no Japão" encontrou meu perfil no GitHub "e depois também olhou meu perfil no Upwork". Ele mandava bem na parte técnica, mas achava difícil lidar com clientes estrangeiros. A proposta: eu cuido da comunicação com o cliente, ele cuida do desenvolvimento, remuneração combinada entre nós. Respondi pedindo o LinkedIn dele, como ele tinha me achado e o que exatamente tinha em mente. A resposta foi, mais ou menos, "vamos fazer uma call".
- Uma semana depois, alguém que assinava com um nome e se apresentava com outro tinha "uma ideia de negócio" capaz de "gerar renda extra sem exigir investimento inicial significativo". Não disse qual era. Queria uma call curta.
- Em outubro, outro desenvolvedor full-stack sênior no Japão compartilhou um PDF no Drive chamado "Collaboration Proposal". A mensagem repetia minhas estatísticas do Upwork (Job Success Score, valor por hora, ganhos, horas) e observava que meu último trabalho concluído lá tinha mais de um ano. Duas a três horas por semana. "Um simples Sim ou Não é tudo de que preciso."

Lidos ao lado da recusa do Ken, os três se encaixam. Eles querem freelancers com bons perfis no Upwork que andam parados. Você empresta seu nome e o histórico da conta, eles fazem propostas e entregam como se fossem você, e você fica com uma parte. O Upwork chama isso de compartilhamento de conta e bane por isso. O cliente acha que contratou você, e se algo der errado, é o seu nome que está lá. Reportagens sobre esquemas de falsos trabalhadores de TI descrevem exatamente esse padrão, com personas inventadas e contas reais emprestadas. Não sei dizer quem está por trás desses, mas o padrão bate.

O que entrega os três é o que a IA disse numa frase: se a ideia não pode ser escrita, esse é o sinal.

## Por que esse é pessoal

O que me fez rir ainda mais é que eu construo esse tipo de máquina.

Já [escrevi aqui](/pt/blog/prospecting-geospatial-firms-with-my-own-algorithm-instead) sobre o assistente de vendas do meu daemon. Ele encontra empresas de geotecnologia, pesquisa cada uma e escreve rascunhos de prospecção na minha voz com o Claude. Ou seja, coleta informação pública, um modelo escreve os e-mails e eles saem em escala. No papel, é a mesma arquitetura do Ken. A diferença são três regras que eu já tinha escrito por outros motivos, e o pipeline do Ken quebra as três.

- **A resposta do modelo é dado, e o código confere.** Toda chamada ao Claude no meu daemon é um prompt de sistema mais um JSON schema. O rascunho volta como campos estruturados, e o código valida antes de qualquer outra coisa. Uma recusa não cabe no schema, então nunca vira e-mail. O pipeline do Ken pegou o texto que voltou e usou como corpo.
- **Quem envia é uma pessoa.** Meus rascunhos caem no Gmail como rascunhos. Nada sai até eu ler aquele e-mail exato e clicar em enviar. Com esse passo, o e-mail que me contou o golpe teria sido só um rascunho engraçado na caixa de saída de alguém.
- **Toda afirmação tem fonte.** Meus rascunhos só podem afirmar o que a própria empresa disse recentemente ou o que uma página mostra quando conferida no mesmo dia, e cada rascunho lista os fatos em que se apoia. O prompt do Ken vai no sentido oposto: manda o modelo esconder o que está sendo oferecido de verdade. Se um dia meu assistente precisar esconder o que eu estou oferecendo, o problema sou eu, não o prompt.

Tem uma lição mais discreta na lista de "aberturas proibidas" também. Quando um modelo recusa várias vezes, a pergunta útil é se ele tem razão. O operador do Ken perguntou como contornar, e dessa vez a resposta chegou na minha caixa de entrada.

## Se você é freelancer com perfil parado

Algumas notas práticas, já que meus colegas são exatamente quem recebe esses e-mails. Desenvolvedores GIS parecem estar na lista: o do Drive elogiou meu OpenLayers e Mapbox.

- Seu e-mail de commit é público. Se é o seu endereço principal, espere esse tipo de mensagem. O endereço no-reply do GitHub resolve isso para commits novos.
- "Você cuida dos clientes, eu faço o trabalho" numa conta de plataforma é compartilhamento de conta, por mais simpático que seja o texto.
- Pedir um LinkedIn, uma empresa ou uma descrição por escrito do negócio não custa nada. Todos esses sumiram ou insistiram na call.
- Não abra PDF compartilhado por desconhecido pra descobrir qual é a ideia.

Não vou responder o Ken. Se respondesse, provavelmente agradeceria ao modelo.
