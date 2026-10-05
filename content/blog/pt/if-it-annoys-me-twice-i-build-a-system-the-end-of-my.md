---
title: "Se me irrita duas vezes, vira sistema: o fim dos meus timesheets"
description: "Meus timesheets levavam quase 30 minutos por dia no Excel. Hoje o ActivityWatch, minhas conversas no Claude Code e o Discord fazem isso em segundos."
date: "2026-10-05"
slug: "if-it-annoys-me-twice-i-build-a-system-the-end-of-my"
coverImage: "/blog/if-it-annoys-me-twice-i-build-a-system-the-end-of-my/cover.svg"
author: "victor-marotta"
tags:
  - "automação"
  - "activitywatch"
  - "claude-code"
  - "timesheets"
  - "workflow"
---

Até o mês passado, meus timesheets viviam no bom e velho Excel. Todo dia eu gastava quase 30 minutos garantindo que as descrições batessem com o que eu tinha feito de verdade. Em algumas semanas eu me atrasava e passava a sexta-feira reconstruindo a semana inteira. Era horrível.

Hoje leva poucos segundos, e o resultado é melhor do que o que eu fazia à mão. As descrições descrevem o trabalho, e as faturas ficaram mais transparentes. Nenhum cliente nunca questionou uma linha, mas eu sempre tive medo de que alguém questionasse. E se alguém perguntar o que foi aquela tarde de terça? Linhas mais claras são prevenção, e eu durmo melhor.

O que me trouxe até aqui é mais um hábito do que uma ferramenta: se algo me irrita duas vezes, provavelmente vou construir um sistema em volta disso. Os timesheets me irritaram bem mais do que duas vezes antes de eu ceder, o que diz algo sobre a minha paciência e nada de bom sobre o meu discernimento.

## Uma lista de peças que ninguém projetou para encaixar

O sistema é um daemon no meu Mac, montado com coisas que nunca foram feitas para se encontrar:

- **ActivityWatch**, um rastreador de tempo open source que registra cada janela em foco e por quanto tempo.
- **As transcrições das minhas sessões do Claude Code**, que se acumulam no disco porque passo o dia programando, prototipando e discutindo implementações com ele.
- **O Claude, rodando pela linha de comando** (`claude -p`) na minha própria assinatura, com saída estruturada, como componente e não como chat.
- **Um servidor do Discord**, que acaba sendo uma excelente mesa de revisão.
- **O Territorial Invoices**, nosso próprio sistema de faturamento, no fim da linha.

Nenhuma dessas peças sabe que as outras existem. O daemon é a cola.

## Como a cadeia funciona

Isto é a direção, não uma receita.

A atividade chega do ActivityWatch e é compactada em blocos. Regras e um cache resolvem o que conseguem sem perguntar a ninguém: este repositório é daquele cliente, aquele site é interno. As conversas do Claude Code entram ao lado dos blocos e dizem o que estava sendo construído, prototipado ou decidido. O que ainda estiver nebuloso vai para o Claude. Ele vê o dia inteiro de uma vez e devolve as linhas de trabalho que há nele: o que cada uma foi, quais repositórios e janelas pertencem a ela e o que foi feito quando.

O Claude tem uma única função ali, e não tem a palavra final. Ele nunca cria tempo. O código confere a resposta contra a atividade, e as minhas regras vencem os palpites dele. Depois o dia é agrupado por cliente, escrito em linhas que uma pessoa consegue ler e postado numa thread do Discord. Eu leio e corrijo em linguagem comum o que estiver errado ("aquela tarde foi a ferramenta interna, não trabalho de cliente"). Depois aprovo. Só o que eu aprovo chega ao faturamento.

Como roda numa assinatura e não numa API cobrada por uso, a parte difícil do agendamento não foram os timesheets. Foi dividir capacidade comigo mesmo. O daemon lê o meu consumo, espera momentos em que eu não estou usando o Claude e fica dentro dos limites, para nunca comer o que eu preciso para o trabalho de verdade. Depois acrescentei um modo burst para o fim da semana, quando sobra capacidade que de outro jeito ficaria sem uso. O assistente de vendas a gasta procurando leads.

## As conversas são a parte esperta

Um título de janela é uma testemunha fraca. Ele diz "editor", "terminal", "navegador", "localhost". Oito horas disso provam que eu estava no computador, coisa que a minha cadeira já sabia.

Uma conversa diz o que estava sendo resolvido e por quê. Por exemplo: "a etapa de reprojeção está perdendo feições perto do antimeridiano, descubra onde" (um exemplo inventado, mas o formato é esse). Coloque isso ao lado de duas horas de editor e terminal, e o bloco deixa de ser tempo e vira trabalho: *investigou feições perdidas perto do antimeridiano durante a reprojeção e corrigiu a etapa de recorte*. Um cliente lê essa linha sem precisar me perguntar nada.

Quase ninguém construiu essa parte, e foi ela que deixou as descrições melhores que as minhas. Quando eu as escrevia à mão no fim do dia, lembrava da última coisa que tinha feito e de um contorno vago da manhã. As transcrições lembram de tudo, inclusive dos becos sem saída.

## O que foi preciso para confiar nele

Fazer funcionar foi a parte divertida. Fazer acertar levou mais tempo. Os bugs são coadjuvantes aqui, então cada um ganha uma ou duas frases.

- **Correções voltam ao registro bruto.** No começo, quando eu corrigia uma atribuição no Discord, a correção ficava no resumo e nunca voltava para a atividade por baixo, então o mesmo trecho de trabalho podia aparecer duas vezes. Agora a edição é gravada nos blocos de atividade e o dia é reconstruído a partir deles. É o agrimensor em mim: você ajusta as observações, nunca edita o produto à mão.
- **Ele atribui por repositório, não por site.** Ele tinha aprendido que um site de hospedagem de código significava um cliente específico, mas todos os meus clientes vivem nessa mesma plataforma. Agora o cache é indexado por repositório, conta ou projeto.
- **Ele aprova exatamente o que eu vi.** Se um dia muda depois de postado, a nova versão é postada e nada é registrado até eu aprovar essa.
- **O registro bruto é a rede de segurança.** Quando meu Mac ficou quatro dias na rede errada, o daemon ficou em silêncio. Quando reconectou, reconstruiu esses dias a partir da atividade bruta.

E ele fica mais esperto à medida que eu corrijo os erros. Meu detalhe favorito é o que acontece quando corrijo a mesma atribuição num segundo dia: a revisão se oferece para transformá-la em regra. O sistema pegou o meu hábito. Se me irrita duas vezes, vira regra.

## O registro vira fonte

Quando você tem um registro limpo, dia a dia, do que realmente fez, usá-lo só para faturas é desperdício.

O mesmo registro agora alimenta uma base de conhecimento e um editor que lê o meu trabalho, acompanha as frentes dele e me entrevista sobre o que veio delas. Este post saiu de uma dessas entrevistas. Já escrevi antes sobre fazer o mesmo com prospecção. Isso também roda no mesmo daemon, ao lado de um assistente que varre vagas do Upwork e de um doctor que publica as próprias correções quando algo quebra.

As peças centrais (o executor do Claude, o controle de consumo e o bot do Discord) também foram reaproveitadas para colocar de pé, em um único dia, um assistente completamente diferente: um bot de Discord que transforma PDFs de curso em questões de estudo. Quando o encanamento é chato e sólido, uma ideia nova custa um dia e não um mês.

## O hábito, não a ferramenta

Nada disso é produto, e eu não diria a ninguém para copiar peça por peça. O que eu passaria adiante é o hábito. Quando algo te irritar duas vezes, olhe o que está à mão. Um rastreador de tempo, uma pilha de transcrições, um app de chat e um sistema de faturamento não parecem um pipeline até você precisar que sejam um.

Meus timesheets me custavam quase 30 minutos por dia e uma ou outra sexta-feira arruinada. Hoje levam poucos segundos, as linhas dizem o que eu fiz, e eu não fico mais pensando no que um cliente acharia se perguntasse sobre alguma delas.
