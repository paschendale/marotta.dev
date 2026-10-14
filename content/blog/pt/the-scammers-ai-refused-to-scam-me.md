---
title: "A IA do golpista se recusou a me aplicar o golpe, e a recusa foi enviada"
description: "Chegou um e-mail frio em que a IA que deveria escrevê-lo explicava por que não ia. Por que recusa não é falha pra tentar de novo."
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

Ri por um bom minuto. Alguém montou uma máquina pra aplicar golpe em freelancer, a IA lá dentro recusou o serviço, e a máquina me mandou a recusa.

## O que a recusa entrega

Não tenho como ver o pipeline do Ken. Só tenho a recusa, escrita pelo único leitor de um prompt que eu nunca vou ver. Levando ela ao pé da letra, o formato fica claro: endereços tirados de commits do GitHub, uma lista de perfis parados no Upwork, um prompt que mantém a oferta vaga e troca as palavras que um filtro de spam pegaria. E um loop. Cada vez que o modelo recusava, a primeira frase da recusa ia pra uma lista de "aberturas proibidas" e o job rodava de novo. Pelo menos dez vezes, pela conta do próprio modelo.

Essa lista é a minha parte favorita. Quem escreveu isso leu cada recusa como problema de redação. O modelo estava recusando o serviço, e o operador continuava tratando isso como escolha de palavras.

Aí nada conferiu a saída. O assunto veio de um template, o corpo foi o que o modelo devolveu, e lá se foi.

## Recusa não é falha pra tentar de novo

Tentar de novo é o reflexo certo pra maioria das falhas. Timeout, limite de taxa, JSON malformado: o pedido estava certo, a tentativa é que falhou, então você tenta outra vez. Recusa é outro tipo de resposta. O modelo leu o pedido e disse que não vai fazer, e por quê. Rodando de novo, o pedido continua o mesmo. Reescrevendo pra passar pela objeção, você já não está se recuperando de uma falha. Está passando por cima de um julgamento que ninguém leu.

Então uma recusa deveria parar o job e colocar a resposta na frente de uma pessoa. Às vezes o modelo está errado, e aí alguém que leu o motivo pode corrigir o prompt ou a entrada. Às vezes está certo, e aí o problema é o job. Loop não resolve nenhum dos dois. O pipeline do Ken tinha o loop e nenhuma pessoa, e o único desfecho que ele nunca previu foi o modelo ganhar.

## Eu já tinha visto essa proposta três vezes

Depois que entendi o que procurar, voltei na minha caixa de entrada. O mesmo formato já tinha chegado três vezes no último mês, sempre sem dizer qual era a ideia:

- **Setembro.** Um "engenheiro de software sênior baseado no Japão" encontrou meu GitHub e depois meu perfil no Upwork. Eu cuidaria da comunicação com o cliente, ele do desenvolvimento, remuneração combinada entre nós. Pedi o LinkedIn dele e o que exatamente ele tinha em mente. A resposta foi, mais ou menos, "vamos fazer uma call".
- **Uma semana depois.** Alguém que assinava com um nome e se apresentava com outro tinha "uma ideia de negócio" pra "gerar renda extra sem exigir investimento inicial significativo". Não disse qual era. Queria uma call curta.
- **Outubro.** Outro desenvolvedor full-stack sênior no Japão compartilhou um PDF no Drive chamado "Collaboration Proposal". Ele repetiu minhas estatísticas do Upwork (Job Success Score, valor por hora, ganhos, horas) e observou que meu último trabalho concluído lá tinha mais de um ano. Duas a três horas por semana. "Um simples Sim ou Não é tudo de que preciso."

Nenhum disse qual era o negócio, então daqui em diante é inferência. Ao lado da recusa do Ken, parecem o mesmo esquema: pegar emprestado o perfil consolidado de um freelancer no Upwork, fazer propostas e entregar com esse nome, e pagar uma parte ao dono. Os termos do Upwork não permitem que outra pessoa use a sua conta. O cliente acha que contratou você, e se algo der errado, é o seu nome que está lá. Reportagens sobre esquemas de falsos trabalhadores de TI descrevem um padrão parecido, com personas inventadas e contas emprestadas. Não sei dizer quem está por trás desses.

A recusa do Ken já tinha resumido numa frase: se a ideia não pode ser escrita, esse é o sinal.

## Por que esse é pessoal

A piada tem mais graça porque eu construo esse tipo de máquina. Já [escrevi aqui](/pt/blog/prospecting-geospatial-firms-with-my-own-algorithm-instead) sobre o assistente de vendas do meu daemon. Ele encontra empresas de geotecnologia, pesquisa cada uma e escreve rascunhos de prospecção na minha voz com o Claude. Entra informação pública e saem e-mails escritos por modelo, em volume. Num diagrama, parece o do Ken. Três salvaguardas fazem a diferença:

- **Saída estruturada que falha fechada.** Toda chamada ao Claude é um prompt de sistema mais um JSON schema, e o código valida a resposta antes de qualquer coisa usá-la. Uma recusa, ou qualquer outra coisa que não seja um rascunho válido, não vira e-mail. Mas o meu próprio runner não é inocente. Ele tenta de novo uma vez quando a saída é inválida, com o erro de validação anexado, e pra ele uma recusa parece saída inválida. Depois disso desiste, guarda o que voltou e marca a chamada como falha. Ou seja, falha fechado, mas ainda não distingue uma recusa de um erro de formato, e depois desse e-mail acho que deveria.
- **Quem envia é uma pessoa.** Os rascunhos caem no Gmail como rascunhos. Nada sai até eu ler aquele e-mail exato e clicar em enviar. Com esse único passo no pipeline do Ken, o e-mail dele teria sido só um rascunho engraçado na caixa de saída de alguém.
- **Todo detalhe pessoal tem fonte.** Um rascunho só pode afirmar o que a própria empresa disse recentemente ou o que uma página mostrou quando conferida no mesmo dia, e lista os fatos em que se apoia, pra eu ver no que estou colocando meu nome. O prompt do Ken, se a recusa descreve bem, faz o contrário e esconde o que está sendo oferecido. Se um dia meu assistente precisar esconder o que eu estou oferecendo, o problema sou eu, não o prompt.

## Se você é freelancer com perfil parado

Meus colegas são exatamente quem recebe esses e-mails. Desenvolvedores GIS parecem estar na lista: o do Drive elogiou meu OpenLayers e Mapbox.

- Seu e-mail de commit aparece em todo repositório público em que você já fez commit. O endereço no-reply do GitHub tira ele dos commits novos. Não tira do histórico antigo, nem de qualquer outro lugar onde ele esteja publicado.
- "Você cuida dos clientes, eu faço o trabalho" numa conta de plataforma é compartilhamento de conta, por mais simpático que seja o texto.
- Peça um LinkedIn, uma empresa, uma descrição por escrito do negócio. Não custa nada. Todos esses sumiram ou insistiram na call.
- Não abra PDF compartilhado por desconhecido pra descobrir qual é a ideia.

Não vou responder o Ken. Se respondesse, provavelmente agradeceria ao modelo.
