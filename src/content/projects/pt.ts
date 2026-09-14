import type { ProjectText } from "./types";

export const pt: Record<string, ProjectText> = {
  skyforest: {
    title: "Skyport",
    tagline: "A plataforma de operações que transforma os voos de drone da Skyforest em camadas de mapa prontas, de ponta a ponta.",
    summary:
      "A Skyforest, empresa sueca de tecnologia florestal, precisava que a fotogrametria por drone fluísse do campo até as camadas publicadas sem especialistas em SIG no caminho. Arquitetei a plataforma e lidero a equipe da Territorial que a constrói e opera: aplicação web, API e um backend de processamento distribuído.",
    role: "Engenheiro líder e arquiteto, equipe Territorial",
    highlights: [
      "Backend construído inteiramente sobre workflows n8n e o Ordo, o plano de controle de orquestração que criei para este projeto",
      "A fotogrametria roda em uma frota de máquinas Windows coordenadas por locks distribuídos no MinIO com detecção de processos do Agisoft",
      "Aplicação web em Next.js com mapas MapLibre para clientes, missões, ordens de serviço e submissão de dados offline-first",
      "Toda missão, cliente e camada processada passa pelo sistema sem ninguém tocar em um terminal",
    ],
    sections: [
      {
        heading: "O problema",
        body: [
          "A Skyforest sobrevoa propriedades florestais com drones e entrega ortomosaicos, modelos de elevação e camadas derivadas aos seus clientes. O gargalo nunca foi o voo: era tudo o que vinha depois. Conjuntos de fotos precisavam ser movidos à mão, processados em software desktop, conferidos, publicados em um servidor de mapas e acompanhados em planilhas, e cada etapa dependia de alguém que entendesse de SIG.",
          "O objetivo era uma plataforma em que a equipe de operações submete um voo e as camadas prontas aparecem, com cada job visível e recuperável ao longo do caminho.",
        ],
      },
      {
        heading: "O que construímos",
        body: [
          "O Skyport é três coisas: uma aplicação web onde a equipe gerencia clientes, missões e ordens de serviço e submete novos conjuntos de fotos; uma API que detém o modelo de domínio e conversa com o storage; e um backend de processamento que faz o trabalho pesado. A aplicação web é um Next.js com mapas MapLibre, implantado na borda, com um fluxo de submissão offline-first para que dados de campo possam ser preparados antes de haver conexão. Um toolkit desktop cobre os casos em que submeter direto da máquina que guarda as fotos é mais rápido.",
          "O backend é onde foi a maior parte da engenharia. Não há um servidor de jobs feito sob medida: cada etapa de processamento é um workflow n8n, e o Ordo fica acima do n8n como plano de controle. O Ordo valida cada job contra contratos de executores antes de rodar, registra jobs, etapas e artefatos como estado de primeira classe no banco e permite que os workers n8n reivindiquem etapas com segurança. A fotogrametria em si roda no Agisoft Metashape em uma frota de workers Windows. Cada worker mantém locks no MinIO com TTL, detecta um processo Agisoft em execução para evitar agendamento duplo, e um workflow reaper renova ou libera locks conforme a execução n8n dona ainda esteja viva. Os rasters finais são publicados no GeoServer e viram camadas que o cliente abre na manhã seguinte.",
        ],
      },
      {
        heading: "Por que importou",
        body: [
          "O Skyport é o projeto que tornou o Ordo necessário. Automação de workflow pura servia para as etapas individuais, mas não garantia que um job de várias etapas terminasse ou falhasse de forma visível, com seus artefatos contabilizados. Quando essa camada passou a existir, o resto da plataforma ficou entediante no melhor sentido: a equipe submete, a frota processa, o mapa atualiza.",
          "Hoje o Skyport roda o pipeline de fotogrametria de produção da Skyforest, e o Sentinel vigia cada peça dele, dos workers n8n ao GeoServer.",
        ],
      },
    ],
    captions: [
      "Dashboard agrupando missões e ordens de serviço por cliente",
      "Visão de missão com a cobertura dos voos processados em um mapa MapLibre",
      "Fluxo de submissão: selecionar fotos, importar posições GPS, confirmar",
    ],
  },

  "mapping-sdk": {
    title: "MapPrism",
    tagline: "Uma plataforma de processamento de LiDAR e batimetria que transforma nuvens de pontos brutas em produtos 3D e 2D prontos para a web, automaticamente.",
    summary:
      "Construída para a UAI, empresa de levantamentos hidrográficos e topográficos, a MapPrism recebe nuvens LAS/LAZ de sonar multifeixe e LiDAR e produz curvas de nível, hillshades, MDEs colorizados, tilesets COPC/EPT e cenas Potree sem ninguém tocar em PDAL ou GDAL à mão.",
    role: "Engenheiro líder e arquiteto, equipe Territorial",
    highlights: [
      "Quinze executores tipados (reprojeção, regrid, colorização, MDS/hillshade, curvas de nível, COPC/EPT/Potree, tiles XYZ) implementados como workflows n8n",
      "Oito pipelines predefinidos registrados como receitas no Ordo, além de receitas personalizadas validadas contra os contratos dos executores",
      "Gerenciamento adaptativo de memória divide levantamentos enormes em subconjuntos Entwine em potências de quatro e os funde de volta",
      "Um site de documentação (VitePress) escrito para os desenvolvedores frontend e autores de pipeline do cliente",
    ],
    sections: [
      {
        heading: "O problema",
        body: [
          "Levantamentos subaquáticos e topográficos produzem nuvens de pontos muito grandes em sistemas de coordenadas inconsistentes, e cada entrega precisa da mesma família de produtos: uma nuvem transmissível para o navegador, um MDE e um hillshade, curvas de nível, às vezes uma nuvem colorizada com imagem. Fazer isso com scripts funciona até o volume crescer e ninguém lembrar quais parâmetros geraram qual arquivo.",
        ],
      },
      {
        heading: "Como funciona",
        body: [
          "O frontend do cliente submete um job ao Ordo com uma receita e os artefatos de entrada. O Ordo valida a receita (todo tipo de etapa precisa existir, todo slot de entrada e saída precisa bater com o contrato do executor, toda referência de artefato precisa ter namespace e ser produzível), armazena o job e sua fila de etapas no PostgreSQL e devolve um id. Workers n8n consultam etapas pendentes, baixam o artefato do MinIO, executam a ferramenta (PDAL, GDAL, Entwine, PotreeConverter), sobem o resultado e reportam. Um webhook on_exit dispara quando o job termina, com sucesso ou falha, com os metadados do dataset anexados.",
          "Receitas são DAGs determinísticos: artefatos mantêm seus nomes por todo o grafo, parâmetros vivem no job e não na receita, e a mesma receita com as mesmas entradas sempre gera os mesmos produtos. Os presets cobrem os caminhos comuns (inspeção do dataset, atribuição de CRS, reprojeção, COPC, EPT, Potree, hillshade colorido com tiles XYZ, curvas de nível em MBTiles e PMTiles) e receitas personalizadas são validadas antes de qualquer execução.",
        ],
      },
      {
        heading: "Detalhes que deram trabalho",
        body: [
          "O Entwine carrega o dataset inteiro na memória ao indexar, então o executor de EPT estima a contagem de pontos com o PDAL, calcula um número seguro de subconjuntos para a RAM disponível, arredonda para uma potência de quatro e constrói e funde os subconjuntos automaticamente. A reprojeção detecta metadados de CRS inválidos embutidos e carimba o correto sem mover pontos. A geração de curvas de nível produz MBTiles e PMTiles com classificação mestra/secundária para o mapa web estilizar diretamente.",
          "As saídas alimentam um visualizador em tela dividida que combina uma cena 3D Potree com um mapa 2D MapLibre sincronizado, que é o que as capturas mostram. A MapPrism é a segunda plataforma de produção rodando sobre o Ordo, depois do Skyport.",
        ],
      },
    ],
    captions: [
      "Nuvem de pontos batimétrica 3D ao lado de um mapa 2D com curvas de nível, hillshade, backscatter e sonar de varredura lateral",
      "Levantamento de reservatório: nuvem colorizada com medições, sincronizada com a camada de batimetria 2D",
      "Site de documentação da MapPrism: API, receitas, executores e pipelines predefinidos",
    ],
  },

  "weather-data-platform": {
    title: "Plataforma de Dados Meteorológicos",
    tagline: "Engenheiro líder na Jane's Weather, plataforma australiana de dados meteorológicos hoje parte da ACM: de construir o mapa meteorológico a operar a plataforma inteira com a equipe da Territorial.",
    summary:
      "Entrei na Jane's Weather como desenvolvedor SIG e construí o runtime do mapa meteorológico e os pipelines de dados por trás dele. Quando a plataforma passou a fazer parte da ACM, o contrato cresceu: hoje lidero a equipe da Territorial responsável por desenvolvimento, manutenção, DevOps, monitoramento e documentação de todo o sistema.",
    role: "Engenheiro líder, equipe Territorial",
    highlights: [
      "Construí o runtime do mapa meteorológico (React, MapLibre, PMTiles) e seus workflows Argo de processamento: isolinhas de previsão, radar, satélite, alertas e mapas base",
      "Argo Workflows em Kubernetes ingerem sete modelos de previsão (GFS, ACCESS-G, GEM, três variantes ECMWF, CAMS) além de radar, satélite e alertas",
      "Cloudflare Workers, R2, KV e D1 servem tiles e dados de previsão na borda, com APIs em Kubernetes atrás do Kong como fallback",
      "63 testes sintéticos no Sentinel verificam frescor e saúde de fora do cluster; um site de documentação em Diátaxis construído a partir do código, inventários do cluster e uma exportação de 130 páginas do Confluence",
    ],
    sections: [
      {
        heading: "A plataforma",
        body: [
          "A Jane's Weather produz previsões, imagens de radar e satélite e alertas para aplicativos de consumo e para clientes como o FarmOnline Weather da ACM. A produção de dados roda como Argo Workflows e CronJobs Kubernetes em um cluster OVH em Sydney: rodadas de modelo em GRIB2 são convertidas em Zarr, imagens de radar e Himawari viram PMTiles e pirâmides de tiles a cada cinco minutos, alertas do Bureau of Meteorology são ingeridos em PostGIS. A entrega é storage-first: os frontends resolvem artefatos versionados no Cloudflare R2 via Workers, e um Worker provedor de dados usa D1 e KV para catálogo e autenticação antes de recorrer às APIs em Kubernetes.",
        ],
      },
      {
        heading: "O mapa",
        body: [
          "Minha primeira responsabilidade foi o mapa. Projetei e construí o runtime do mapa meteorológico que hoje é a experiência de mapa canônica da plataforma e de quem a incorpora, como o FarmOnline Weather: uma aplicação React sobre MapLibre com PMTiles para mapas base e camadas meteorológicas, dois modos (previsão, guiado pela linha do tempo e pelos modelos; agora, com prioridade ao radar mais satélite, observações e alertas), uma abstração compartilhada de camadas temporais com pré-carregamento, e um contrato de incorporação URL-first para que sites parceiros controlem modo, modelo, camadas e viewport por parâmetros de consulta.",
          "O mapa é só metade. Também escrevi o lado de processamento que o alimenta: o modelo de configuração de camadas, os scripts Python que transformam previsões em grade Zarr em isolinhas PMTiles, e os workflows Argo que publicam artefatos de previsão, radar, Himawari, alertas e mapas base no R2 em agenda, além da ferramenta de captura headless que renderiza imagens estáticas de previsão para o site principal.",
        ],
      },
      {
        heading: "Operando a plataforma inteira",
        body: [
          "Depois que a plataforma passou para a ACM e migrou entre nuvens, o conhecimento de como ela se encaixava estava espalhado por repositórios, um espaço Confluence desatualizado e a cabeça das pessoas. A equipe da Territorial assumiu a plataforma inteira, e eu lidero esse trabalho. Construímos o programa de documentação primeiro: um site VitePress organizado por fronteira de sistema, com cada afirmação rastreada ao código ou à configuração viva e cada lacuna declarada explicitamente. Isso revelou riscos concretos (o cluster de desenvolvimento servindo tráfego de produção, um cronjob de ingestão cujo código implantado vinha de um repositório diferente do que todos supunham, credenciais sem caminho de rotação) e os transformou em issues acompanhadas.",
          "Depois, monitoramento. Os exit handlers do Argo só avisavam quando um pipeline dizia ter falhado; nada verificava se os artefatos estavam de fato frescos e acessíveis. Implantamos o Sentinel com uma suíte que hoje cobre os Workers de borda, as APIs em Kubernetes, o proxy do BoM, as fontes dos modelos e os três frontends, usando limiares de defasagem calculados independentemente a partir dos horários observados de chegada dos modelos, e não das flags da própria plataforma. No dia a dia a equipe cuida de desenvolvimento e manutenção das APIs e frontends, secrets e rollouts no Kubernetes, investigação de incidentes e postmortems (um rate limit do ECMWF, uma migração de URL do GEM, um pico de gastos na Vercel, um crash loop por corrupção de NaN na API de consumo).",
        ],
      },
    ],
    flow: [
      { label: "Provedores meteorológicos", sub: "modelos NWP, radar e satélite do BoM, alertas" },
      { label: "Argo Workflows", sub: "Kubernetes · GRIB2 → Zarr · PMTiles" },
      { label: "Storage", sub: "Cloudflare R2 · Supabase · OVH S3" },
      { label: "Workers de borda", sub: "KV · D1 · entrega R2-first" },
      { label: "Mapa e clientes", sub: "runtime MapLibre · apps na Vercel · APIs" },
    ],
  },

  ordo: {
    title: "Ordo",
    tagline: "Um plano de controle de orquestração orientado a contratos para jobs de processamento longos, feito para ficar acima do n8n.",
    summary:
      "Motores de workflow como o n8n executam etapas bem, mas não oferecem um modelo durável e validado de um job com várias etapas. O Ordo é essa camada que faltava: valida receitas, impõe contratos de entrada e saída entre etapas e registra cada job, etapa e artefato como estado consultável. Código aberto, e o backend de toda plataforma pesada que construo.",
    role: "Autor e mantenedor",
    highlights: [
      "Receitas são DAGs determinísticos baseados em artefatos, validados contra contratos de executores antes de qualquer execução",
      "Jobs, etapas e artefatos são estado de primeira classe no PostgreSQL, com progresso, logs por etapa e hooks de ciclo de vida",
      "Deliberadamente não executa etapas, não gerencia workers nem tem UI: execução pertence ao motor abaixo dele",
      "Em produção no Skyport e na MapPrism; lançado com versionamento semântico, migrações e suíte Vitest",
    ],
    sections: [
      {
        heading: "Por que existe",
        body: [
          "Construí o Ordo enquanto construía o Skyport. O n8n era excelente para executar etapas e integrar sistemas, mas o pipeline vivia precisando de garantias que o n8n não dava: que as entradas de um job fossem válidas antes da primeira etapa rodar, que as saídas de uma etapa batessem com o que a próxima esperava, que um job falho deixasse um rastro claro do que foi e do que não foi produzido. Eu queria algo que ficasse acima da execução, continuasse simples e ainda assim fosse rigoroso.",
        ],
      },
      {
        heading: "O modelo",
        body: [
          "Uma receita é uma lista de etapas. Cada etapa nomeia um tipo de executor, mapeia os slots de entrada do executor para referências de artefato com namespace (job:<nome> para entradas do job, step:<id>.<slot> para saídas de etapa) e mapeia seus slots de saída para nomes de artefato. Executores são linhas em uma tabela step_executor declarando o que aceitam e produzem; a validação da receita confere que todo tipo de etapa existe, todo slot está ligado exatamente uma vez, todo artefato referenciado é produzível e nenhum nome de artefato se repete. Parâmetros são declarados nas receitas só por chave e fornecidos por job, então valores de parâmetro nunca afetam a identidade de uma receita.",
          "Jobs são criados a partir de uma receita mais artefatos de entrada concretos, parâmetros e declarações opcionais de saída. O Ordo insere a fila de etapas, expõe o progresso como fração entre as etapas, mostra a última linha de log de cada etapa e roda uma etapa on_exit depois que o grafo principal termina, independentemente do resultado. Um max_concurrency por etapa limita quantas instâncias de um executor rodam ao mesmo tempo entre todos os jobs.",
        ],
      },
      {
        heading: "Fronteiras e próximos passos",
        body: [
          "O Ordo não executa etapas, não gerencia infraestrutura, não oferece editor nem move arquivos. Workers n8n reivindicam etapas direto do banco, executam a ferramenta, registram artefatos e reportam status; um workflow finalizador separado entrega as saídas declaradas ao seu caminho final de storage. Esse contrato direto com o banco é pragmático, não fundamental, e o roadmap é desacoplá-lo atrás de filas ou APIs para que vários backends de execução rodem lado a lado.",
          "A API é um pequeno serviço TypeScript/Express sobre PostgreSQL com migrações aplicadas na inicialização, lançado via semantic-release e distribuído como imagem Docker.",
        ],
      },
    ],
    flow: [
      { label: "Cliente", sub: "POST /jobs com receita + artefatos" },
      { label: "Ordo", sub: "valida · armazena · rastreia estado" },
      { label: "Workers n8n", sub: "reivindica etapa · roda ferramenta · registra artefato" },
      { label: "Object storage", sub: "artefatos em MinIO / S3" },
      { label: "Finalizador", sub: "entrega saídas · hook on_exit" },
    ],
  },

  sentinel: {
    title: "Sentinel",
    tagline: "Uma plataforma programável de monitoramento sintético: testes em JavaScript, alertas por mudança de estado, páginas de status públicas, em um VPS de 1 GB.",
    summary:
      "Os monitores de uptime existentes ou fazem ping em URLs a partir de YAML ou crescem em dashboards pesados. O Sentinel roda funções de teste JavaScript de verdade em agenda, valida lógica de negócio e alerta por Discord, Slack ou webhooks. Ele vigia toda plataforma que opero, além da rede GNSS nacional do IBGE.",
    role: "Autor e mantenedor",
    highlights: [
      "Testes são JavaScript puro com uma pequena API ctx: HTTP, FTP, S3 (SigV4 implementado à mão), secrets, asserções e avisos",
      "Três resultados possíveis (pass, warn, fail), limiares de falha, cooldowns e roteamento de canais por tipo de evento",
      "Páginas de status públicas por tag, métricas Prometheus, cofre de secrets criptografado e um servidor MCP completo para agentes de IA",
      "Projetado para 1 GB de RAM e meia vCPU: escritas em lote, tabelas particionadas, estatísticas diárias pré-agregadas",
    ],
    sections: [
      {
        heading: "Por que mais um monitor",
        body: [
          "Eu precisava saber que o pipeline de um cliente tinha parado de atualizar antes que o cliente soubesse. Um 200 de uma API não diz nada sobre a previsão por trás dela ter seis horas de idade, ou sobre uma camada do GeoServer ainda ter dados. Monitores por configuração não conseguiam expressar isso; ferramentas centradas em dashboard não rodavam centenas de checagens em uma máquina pequena. O Sentinel é a ferramenta que eu queria: um teste é uma função que recebe um contexto e devolve verdadeiro ou falso, e a plataforma cuida de agendamento, retentativas, alertas e histórico.",
        ],
      },
      {
        heading: "Arquitetura",
        body: [
          "Todo o desenho parte de um único alvo de implantação: um VPS de 1 GB e meia vCPU rodando cerca de 500 testes por minuto. Um único processo Fastify em Node.js agenda testes com intervalos com jitter, compila o código do usuário uma vez ao salvar, corre cada execução contra seu timeout e limita a concorrência com um pequeno pool de slots. Resultados são bufferizados e gravados no PostgreSQL em lotes, em tabelas particionadas por mês; uma tabela de agregados diários alimenta as páginas de status públicas para que nunca toquem nas execuções brutas. HTTP de saída passa pelo Undici com pool de conexões por host. Secrets são criptografados em repouso com AES-256-GCM e expostos aos testes como um objeto síncrono em memória.",
          "As notificações são orientadas a eventos e fire-and-forget: um teste vira falha só depois de N falhas consecutivas, avisos disparam na primeira ocorrência com cooldown, recuperação é um evento próprio, e cada atribuição de canal filtra quais tipos de evento recebe. O dashboard é um app Next.js que pode ser implantado no Cloudflare Pages com apenas a API e o banco no VPS. Um servidor MCP envolve as rotas REST em processo, então um agente de IA pode criar, rodar e inspecionar testes com a mesma validação e autenticação.",
        ],
      },
      {
        heading: "Em produção: a rede RBMC",
        body: [
          "A implantação pública mais exigente monitora a RBMC, a Rede Brasileira de Monitoramento Contínuo dos Sistemas GNSS, operada pelo IBGE. A RBMC é uma rede de cerca de 150 estações GNSS permanentes espalhadas pelo Brasil que transmitem e publicam observações contínuas de satélite. É a materialização física do SIRGAS2000, o referencial geodésico nacional, e a espinha dorsal do posicionamento preciso no país: levantamentos pós-processados, correções em tempo real, georreferenciamento de imóveis rurais, monitoramento de engenharia e trabalho científico dependem de seus dados estarem disponíveis e atualizados.",
          "A página de status da RBMC acompanha cada estação individualmente com histórico de 24 horas, para que um agrimensor confira se a estação mais próxima de um serviço está publicando antes de sair a campo. O Sentinel também vigia a plataforma da Jane's Weather com 63 testes e cada serviço por trás do Skyport e da MapPrism.",
        ],
      },
    ],
    captions: [
      "Grade de status de todos os ambientes que o Sentinel vigia, filtrada por tag",
      "Lista de testes com resultado, última execução, tempo médio de resposta e histórico de 24 horas",
      "Alertas de mudança de estado no Discord: falha com motivo e contagem consecutiva, depois recuperação com tempo de indisponibilidade",
    ],
  },

  "territorial-invoices": {
    title: "Territorial Invoices",
    tagline: "O sistema que roda o faturamento da Territorial: apontamento de horas em calendário, contratos com matemática de cobrança determinística e faturas geradas em minutos.",
    summary:
      "A Territorial fatura vários clientes sob tipos de contrato diferentes todo mês. Esta plataforma interna registra horas em um calendário de arrastar-e-criar, consolida as horas por contrato e marco e gera um lote completo de faturas com PDFs. O fechamento que levava uma tarde hoje leva menos de quinze minutos.",
    role: "Autor; produto interno da Territorial",
    highlights: [
      "Horas são registradas em um calendário como se cria um evento no Google Calendar: arrastar, redimensionar, mover",
      "Três tipos de contrato com matemática de cobrança pura e testável: por hora, por hora com base fixa, e por hora com crédito rotativo",
      "Faturas em rascunho são projeções ao vivo; faturas emitidas são snapshots imutáveis com câmbio congelado e PDFs A4",
      "Um servidor MCP permite que o Territorial Assistant registre lançamentos de horas automaticamente a partir da minha atividade",
    ],
    sections: [
      {
        heading: "O problema",
        body: [
          "Faturar consultoria é simples até deixar de ser: um cliente por hora simples, outro em retainer com hora extra, um terceiro com base que rola horas não usadas para frente, todos em moedas diferentes, todos precisando de um documento com cara de definitivo. Eu queria que o mês inteiro fechasse em minutos e que os números fossem reproduzíveis.",
        ],
      },
      {
        heading: "O que faz",
        body: [
          "Clientes, contratos, projetos e marcos formam o modelo; lançamentos de horas se ligam a um projeto e marco e herdam a taxa do contrato. O calendário é o caminho rápido para registrar, com filtros por cliente, projeto e marco e cores por projeto. Quando um período fecha, o sistema calcula as horas faturáveis de cada contrato: por hora simples cobra o trabalhado; com base cobra o piso mais as extras à sua própria taxa; com rollover cobra a base, difere o excedente para um buffer de um ciclo e usa o crédito trazido para cobrir déficits antes de expirá-lo. Cada regra é uma função pura com exemplos resolvidos na documentação e nos testes.",
          "Faturas começam como rascunhos projetados ao vivo dos lançamentos e se tornam imutáveis ao serem emitidas, com linhas, totais e câmbio congelados. PDFs são renderizados com Playwright a partir do mesmo HTML que a aplicação mostra, em inglês ou português, com endereços estruturados de emissor e cliente e instruções de pagamento por moeda. Um dashboard mostra horas, receita, distribuição por cliente e alertas de lançamentos órfãos e risco de horas base.",
        ],
      },
      {
        heading: "Automação e integração fiscal",
        body: [
          "Com o tempo fiquei preguiçoso para apontar, então hoje o Territorial Assistant propõe lançamentos a partir do histórico git, transcrições do Claude Code e atividade de janelas e os registra aqui por um endpoint MCP com token de acesso pessoal, com o mesmo modelo de papéis da aplicação web. A integração fiscal com a NF-e está em andamento: hoje a plataforma prepara tudo o que o sistema fiscal pede, de modo que emitir a nota vira uma tarefa de copiar e colar em vez de reconstrução.",
          "A stack é um monorepo pnpm com uma API Fastify (validação Zod, Prisma, PostgreSQL) e um frontend Next.js App Router que mantém toda a lógica de negócio no servidor.",
        ],
      },
    ],
    captions: [
      "Dashboard: horas, receita, distribuição diária por cliente e alertas",
      "Apontamento de horas em calendário com lançamentos por arrastar-e-criar, filtrados por cliente, projeto e marco",
    ],
  },

  "territorial-assistant": {
    title: "Territorial Assistant",
    tagline: "Um daemon baseado em Discord que transforma minha própria atividade de trabalho em timesheets aprovados e em uma base curada de histórias de engenharia.",
    summary:
      "Reconstruir horas faturáveis de memória e achar tempo para escrever sobre o trabalho eram duas tarefas que eu vivia adiando. Este assistente de processo único lê ActivityWatch, git, GitHub e transcrições do Claude Code, propõe timesheets diários no Discord e minera a mesma evidência em busca de histórias que valham publicação.",
    role: "Autor; ferramenta pessoal",
    highlights: [
      "Um processo TypeScript, um banco Postgres, um bot Discord; nenhuma UI web para manter",
      "Claude é usado só para julgamento, nunca para contabilidade: regras e caches respondem primeiro, e as chamadas são liberadas apenas com orçamento sobrando na assinatura",
      "O assistente de timesheet propõe lançamentos por cliente, aprende regras de mapeamento a partir de correções em linguagem natural e registra dias aprovados no Territorial Invoices",
      "O assistente de marketing extrai e pontua histórias semanalmente e redige posts; informação confidencial de clientes é excluída por projeto",
    ],
    sections: [
      {
        heading: "Como funciona o assistente de timesheet",
        body: [
          "A cada quinze minutos o daemon ingere eventos de janela e navegador do ActivityWatch, os compacta em blocos de atividade e resolve tudo o que consegue com regras aprendidas: este repositório é aquele cliente, este host de URL é aquele projeto. Só o restante ambíguo vai para o Claude. Blocos viram intervalos brutos por cliente, intervalos são fundidos em sessões cognitivas com margem de 15 minutos e tolerância de 45 minutos entre elas, e cada sessão é enriquecida com o que foi de fato feito usando commits e transcrições daquela janela.",
          "O resultado é uma proposta em uma thread do Discord, uma por dia. Respondo em linguagem natural (\"S2 é ACM, marco Maintenance & DevOps\"), o bot revisa, aprende a regra e, na aprovação, registra um lançamento por sessão e projeto pelo endpoint MCP do Invoices. Dias incompletos são recusados em vez de registrados pela metade.",
        ],
      },
      {
        heading: "O assistente de marketing",
        body: [
          "O segundo módulo trata expertise como produto. Ele reúne o histórico git, pull requests e transcrições da semana, extrai o que aconteceu e qual foi a lição, e pontua cada item como um ângulo com que um gestor de SIG ou CTO se importaria mesmo sem conhecer o projeto. Segunda-feira chega um digest de candidatas no Discord; eu escolho e atribuo cada uma a um blog, o assistente redige em uma thread, abre um pull request no repositório do site na aprovação e prepara posts para o LinkedIn quando o artigo vai ao ar. A base de conhecimento persiste entre semanas, então itens de baixa pontuação podem ser revividos depois.",
        ],
      },
      {
        heading: "Restrições de projeto",
        body: [
          "Os estágios se comunicam apenas pelo banco, então qualquer um deles pode ser reexecutado. O Claude é invocado pela CLI local com esquemas de saída estruturada, sem ferramentas e sem persistência de sessão, para que chamadas geradas pelo assistente nunca contaminem as transcrições que ele lê depois. Um gate consulta o endpoint de uso da assinatura e esvazia uma fila de prioridade só quando o orçamento ficaria sem uso: respostas interativas primeiro, timesheets em seguida, marketing por último.",
        ],
      },
    ],
    captions: [
      "Proposta diária no Discord: sessões por cliente, trabalho sem correspondência sinalizado, correção em linguagem natural",
      "Digest semanal de histórias do assistente de marketing com threads por história",
    ],
  },

  finances: {
    title: "Finances",
    tagline: "Um app pessoal de livro-razão e orçamento com arquitetura Postgres-first: uma instância PostgREST, um frontend estático, nada mais.",
    summary:
      "Depois de cinco anos como usuário intenso de apps de finanças comerciais que viviam mudando a própria estrutura, escrevi os requisitos que eu de fato tinha e construí a ferramenta. Ela roda no menor servidor que tenho e serve de laboratório para o quão fino um backend pode ser.",
    role: "Autor; ferramenta pessoal",
    highlights: [
      "PostgreSQL é o backend: o PostgREST expõe o esquema, a autenticação é uma RPC no Postgres com tokens hasheados e permissões por papel",
      "O frontend React/Vite é estático e é implantado em qualquer lugar (Vercel, Cloudflare, uma VM gratuita)",
      "Livro-razão multicontas, saldos acumulados, histórico de composição de ativos e orçamentos anuais com acompanhamento mensal",
      "Um servidor MCP expõe o razão para ferramentas de IA classificarem e analisarem",
    ],
    sections: [
      {
        heading: "Por que construí",
        body: [
          "Todo app de finanças que usei acabou redesenhando seu modelo de dados debaixo de mim: categorias se fundiram, orçamentos viraram outra coisa, exportações pararam de bater. Eu não queria funcionalidades; queria registrar transações do mesmo jeito por uma década. Depois de usar essas ferramentas diariamente por anos, os requisitos estavam incomumente claros, então construir saiu mais barato do que se adaptar de novo.",
        ],
      },
      {
        heading: "Arquitetura",
        body: [
          "O objetivo de projeto era facilidade de implantação. Um único processo PostgREST na frente do PostgreSQL é todo o backend: tabelas, views e funções definem a API, papéis do banco impõem permissões, e o login é uma procedure que valida um token hasheado e emite um JWT. Não há servidor de aplicação para atualizar ou escalar. O frontend é um app React, Vite, TypeScript e Tailwind que compila para arquivos estáticos, então pode viver na Vercel ou no Cloudflare enquanto o banco fica em uma pequena instância gratuita da Oracle. O Docker Compose sobe tudo localmente sem configuração.",
          "Funcionalmente cobre contas organizadas por tipo, um razão com totais acumulados por dia e exportação, um gráfico de histórico de composição de ativos e orçamentos planejados anualmente e executados mensalmente com mínimo, máximo e restante por categoria. O servidor MCP permite que um assistente leia saldos e lance transações diretamente.",
        ],
      },
    ],
    captions: [
      "Dashboard com grupos de contas, patrimônio líquido e histórico de composição de ativos",
      "Razão com totais diários acumulados, categorias e contas",
      "Visão geral de contas agrupadas por tipo",
      "Execução do orçamento contra o plano anual",
    ],
  },

  "ai-geospatial-query": {
    title: "Plataforma de Consulta Geoespacial em Linguagem Natural",
    tagline: "Um produto em que usuários fazem perguntas sobre dados geográficos em linguagem natural e recebem respostas, gráficos e mapas, gerados por um LLM sobre PostGIS.",
    summary:
      "Trabalho para cliente sob NDA, então nomes e datasets ficam de fora: um motor de consulta texto-para-SQL sobre dados públicos multijurisdicionais, a plataforma de produto ao redor dele (API, aplicação web, SDKs, cobrança) e a infraestrutura em que roda. Liderei sua concepção e engenharia com a equipe da Territorial.",
    role: "Engenheiro líder: concepção, motor de consulta, plataforma de produto e infraestrutura, equipe Territorial",
    note: "Trabalho protegido por NDA; produto, cliente e datasets não são nomeados intencionalmente.",
    highlights: [
      "Motor de consulta: linguagem natural → SQL ciente do esquema → validação → PostGIS → resposta em linguagem natural, em uma única chamada",
      "Dois backends de LLM intercambiáveis atrás de uma interface REST idêntica; restrição por esquema para que uma conversa só toque nas fontes de dados que lhe foram concedidas",
      "Sandbox analítico: um loop de ferramentas limitado para análises subsequentes (razões, rankings, comparações), gráficos, mapas e um interpretador de código opcional",
      "Plataforma de produto com organizações, chaves de API, medição de uso, rate limits, webhooks, cobrança por assinatura, SDKs em TypeScript e Python e site de documentação",
    ],
    sections: [
      {
        heading: "O motor de consulta",
        body: [
          "O motor é um serviço FastAPI sobre PostgreSQL/PostGIS com datasets públicos em nível federal, estadual e municipal: financiamento de campanha, demografia censitária, registros e licenças de empresas, alvarás, criminalidade, tributos. A parte difícil de texto-para-SQL sobre dados assim não é o modelo; é dar ao modelo um esquema sobre o qual ele consiga raciocinar. Projetei a camada de dados: como jurisdições de níveis diferentes se relacionam, como geometrias são expostas e simplificadas, quais colunas carregam significado e como tudo isso é descrito para que o SQL gerado esteja correto de primeira com mais frequência. A correspondência aproximada de nomes usa similaridade por trigramas no banco, então lugares e candidatos com grafia errada ainda resolvem.",
          "Uma pergunta vira um candidato a SQL, é validada e restringida (esquemas são permitidos por conversa, esquemas internos nunca podem ser consultados), executada e resumida de volta em linguagem. O backend de LLM é plugável: uma implementação com modelos da OpenAI via LangChain, outra com o framework de agentes do Google e Gemini, ambas atrás do mesmo contrato REST com histórico de conversa, de modo que comparar provedores foi configuração e não reescrita. Um modo analítico acrescenta um loop de agente limitado sobre dados recém-buscados, com timeouts por consulta, tetos de retentativa e um prazo de ponta a ponta, produzindo percentuais, rankings, gráficos e mapas.",
        ],
      },
      {
        heading: "O produto ao redor",
        body: [
          "Um motor de consulta não é um produto. Também liderei a plataforma que o transforma em um: uma API Express com PostgreSQL/PostGIS em camadas de controllers, services e repositories, uma aplicação web React para chat e gestão de conversas, SDKs em TypeScript e Python para acesso programático, organizações e equipes, chaves de API, medição de uso e rate limiting, um sistema de webhooks para notificações de eventos, cobrança por assinatura via Stripe e um site de documentação.",
        ],
      },
      {
        heading: "Infraestrutura",
        body: [
          "Tudo roda como stacks Docker Compose atrás do Traefik, com ambientes separados de desenvolvimento, beta e produção, atualização automática de imagens, uma camada de métricas e BI e o Sentinel vigiando o conjunto. Secrets são escopados por serviço e carregados de um único arquivo de ambiente para que a configuração continue legível conforme a stack cresce. Chamadas que levam dados de clientes a endpoints externos de modelos resolvem seus destinos em modo fail-closed: produção se recusa a rodar sem um endpoint explícito e nunca recorre a um público.",
        ],
      },
    ],
    flow: [
      { label: "Pergunta", sub: "linguagem natural, via app web ou SDK" },
      { label: "LLM", sub: "geração de SQL ciente do esquema" },
      { label: "Validação", sub: "esquemas permitidos · consulta restrita" },
      { label: "PostGIS", sub: "execução espacial" },
      { label: "Resposta", sub: "texto · gráfico · mapa · análise" },
    ],
  },

  "geo360-ladm": {
    title: "Geo360 LADM",
    tagline: "O primeiro sistema de administração territorial no Brasil construído sobre o padrão ISO 19152 LADM, liderado enquanto eu estava na Topocart.",
    summary:
      "Como líder técnico na Topocart, conduzi a concepção e a arquitetura do módulo LADM do Geo360: um sistema cadastral e registral em que partes, direitos, restrições e unidades espaciais seguem o modelo internacional em vez de esquemas municipais improvisados.",
    role: "Líder técnico e analista de requisitos na Topocart",
    highlights: [
      "Land Administration Domain Model (ISO 19152) implementado em PostgreSQL/PostGIS",
      "Direitos, restrições e responsabilidades modelados explicitamente, ligando partes a unidades espaciais",
      "Interoperável por projeto com sistemas tributários municipais e a prática registral nacional",
      "Implementação de referência para projetos cadastrais posteriores na empresa",
    ],
    sections: [
      {
        heading: "Contexto",
        body: [
          "Municípios brasileiros mantêm cadastros multifinalitários sobre modelos de dados que cresceram organicamente, o que torna frágil a troca de dados entre cadastro, registro e fisco. O LADM oferece um vocabulário padrão para esse problema: partes, unidades administrativas básicas, direitos, restrições, responsabilidades e unidades espaciais, com versionamento embutido.",
        ],
      },
      {
        heading: "O que fiz",
        body: [
          "Liderei o levantamento de requisitos com atores do cadastro e do registro, projetei o modelo conceitual e lógico e implementei o esquema em PostgreSQL/PostGIS, mantendo os pacotes do padrão reconhecíveis e acomodando o que a prática brasileira de fato exige. O GeoServer publica as unidades espaciais para os clientes web do Geo360. O trabalho se apoiou na modelagem de dados cadastrais que publiquei durante o mestrado e na literatura do LADM, e o módulo se tornou a referência da empresa para administração territorial interoperável. Duas das minhas publicações saíram de implantações do Geo360 em municípios do Ceará.",
        ],
      },
    ],
    captions: ["Interface cadastral do Geo360"],
  },

  dragonfly: {
    title: "Dragonfly GeoAnalytics",
    tagline: "Uma plataforma de geointeligência que ajuda municípios a combater dengue, Zika e chikungunya com imagens de drone e mapeamento de casos.",
    summary:
      "Libélulas predam larvas de mosquito; o Dragonfly mapeia focos e casos de doença a partir de voos de drone para que equipes de saúde vejam os surtos enquanto se movem. Construí o ecossistema inteiro para uma empresa de engenharia brasileira: frontend, dois backends, servidor de tiles e o deploy em GitOps.",
    role: "Engenheiro full-stack e arquiteto, contratado",
    highlights: [
      "Frontend React com Mapbox (react-map-gl), dashboards em Highcharts e Chakra UI em modo escuro",
      "API de dados em Express e Prisma; serviço de autenticação em Django REST Framework com OAuth2",
      "PostGIS com pg_tileserv servindo tiles vetoriais (MVT) direto do banco",
      "Implantado para vários municípios por um pipeline GitOps em Docker Swarm com Portainer",
    ],
    sections: [
      {
        heading: "O sistema",
        body: [
          "Equipes de campo sobrevoam bairros com drones; a plataforma georreferencia focos potenciais e casos confirmados, os agrega no tempo e no espaço e apresenta estatísticas e tendências por distrito. O frontend renderiza tiles vetoriais servidos direto do PostGIS pelo pg_tileserv, o que manteve o backend pequeno e os mapas rápidos.",
          "Dividi o backend em dois de propósito: uma API de dados tipada em Express e Prisma pela velocidade de iteração, e um serviço em Django REST Framework com Django OAuth Toolkit para um sistema de autenticação robusto e baseado em padrões. Um módulo mobile separado foi construído como projeto próprio.",
        ],
      },
      {
        heading: "Entrega",
        body: [
          "O contrato cobriu design, desenvolvimento, a metodologia de coleta de dados e a implantação em nuvem. Tudo é conteinerizado e distribuído por um pipeline de infraestrutura como código, de modo que um novo município é uma mudança de configuração e não um novo build.",
        ],
      },
    ],
  },

  "geoserver-mobile-client": {
    title: "GeoServer Mobile Client",
    tagline: "Um cliente mobile com suporte offline para camadas do GeoServer: baixar, visualizar, editar feições e exportar, construído em três semanas.",
    summary:
      "Um cliente já gerenciava suas camadas em um sistema web sobre GeoServer, mas precisava que equipes de campo levassem essas camadas offline, editassem feições e adicionassem novas pelo celular. Ionic, React, TypeScript e OpenLayers, com a API REST do GeoServer como único backend.",
    role: "Desenvolvedor único, na Topocart",
    highlights: [
      "Ionic + React + OpenLayers com interação offline completa: baixar camadas, navegar, editar, coletar, exportar GeoJSON",
      "Sem backend próprio: o REST do GeoServer gerencia workspaces, stores, camadas, usuários e estilos",
      "Do levantamento de requisitos a uma publicação não listada no Google Play em três semanas",
      "Publicado via Ionic Appflow, restrito aos usuários autorizados do cliente",
    ],
    sections: [
      {
        heading: "Abordagem",
        body: [
          "Ionic e React deram uma UI mobile responsiva rapidamente, e o OpenLayers trouxe a profundidade cartográfica que o trabalho exigia: renderização eficiente de vetores e rasters, além de ferramentas de desenho para feições complexas. Construir direto sobre a API REST do GeoServer fez o app herdar os usuários, camadas e estilos existentes do cliente em vez de duplicá-los.",
        ],
      },
    ],
  },

  "territorial-maps": {
    title: "Territorial Maps",
    tagline: "Um SaaS para publicar imagens de drone: envie do seu computador, receba camadas prontas para a web e instruções de acesso para qualquer SIG.",
    summary:
      "O Territorial Maps recebe rasters direto da máquina do usuário, gera tiles automaticamente, organiza por projeto e produz instruções prontas para abrir os dados no ArcGIS Online, QGIS e outros clientes. Nenhuma expertise em SIG ou infraestrutura necessária do lado do usuário.",
    role: "Engenheiro líder; produto da Territorial",
    highlights: [
      "Envie TIF, JPG ou PNG; tiling e publicação rodam automaticamente em pipelines n8n",
      "Organização por projeto com tokens de acesso para compartilhamento controlado",
      "Instruções de compartilhamento geradas por plataforma SIG para que clientes consumam camadas onde já trabalham",
      "Frontend Next.js e MapLibre implantado no Cloudflare",
    ],
    sections: [
      {
        heading: "O que resolve",
        body: [
          "Operadores de drone produzem ortomosaicos e depois gastam horas colocando-os na frente dos clientes: convertendo formatos, construindo pirâmides, hospedando tiles, escrevendo instruções. O Territorial Maps reduz isso a enviar, esperar, compartilhar. O pipeline de processamento e o modelo de publicação são os mesmos que cresceram até virar o Skyport, aplicados a um produto self-service.",
        ],
      },
    ],
  },

  "pointcloud-automation": {
    title: "Automação de Publicação de Nuvens de Pontos",
    tagline: "Um framework baseado em n8n que leva nuvens de pontos brutas a cenas Potree otimizadas, construído como backend de um SaaS.",
    summary:
      "A primeira geração do framework de processamento que depois virou a MapPrism e parte do Skyport: workflows n8n orquestrando PDAL, Entwine e PotreeConverter para classificar, comprimir, tilear e descrever nuvens de pontos grandes com atenção a velocidade e uso de recursos.",
    role: "Engenheiro líder; produto da Territorial",
    highlights: [
      "Pipeline de ponta a ponta de LAS/LAZ bruto a Potree, com geração de metadados",
      "Gerenciamento de fila para jobs concorrentes e agendamento consciente de recursos",
      "Projetado como serviço de backend para um frontend SaaS",
      "As lições deste framework foram o que motivou o modelo orientado a contratos do Ordo",
    ],
    sections: [
      {
        heading: "Notas",
        body: [
          "Foi aqui que aprendi que automação de workflow sozinha não é um modelo de orquestração. O pipeline funcionava e processava dados reais, mas rastrear qual artefato veio de qual execução, e garantir que uma cadeia de etapas terminasse ou falhasse de forma visível, exigia uma camada que o n8n não oferecia. Essa lacuna é o que o Ordo preenche hoje.",
        ],
      },
    ],
  },

  "geoportal-itabirito": {
    title: "Geoportal Itabirito",
    tagline: "Um WebGIS público que consolida o cadastro territorial multifinalitário de Itabirito, Minas Gerais, em um único mapa.",
    summary:
      "Construído para o município durante meus anos de pesquisa, o geoportal expõe dados cadastrais, tributários e fundiários por um mapa web em React e TypeScript sobre QGIS Server, mantendo toda a stack em código aberto e livre de licenças proprietárias de SIG.",
    role: "Desenvolvedor, grupo de pesquisa GENTE na UFV",
    highlights: [
      "Frontend React + TypeScript + OpenLayers conversando diretamente com o QGIS Server",
      "Stack de código aberto de ponta a ponta, sem licença proprietária de servidor de mapas",
      "Conteinerizado e implantado com Docker Compose",
      "Ainda no ar, servindo o município",
    ],
    sections: [
      {
        heading: "Contexto",
        body: [
          "O cadastro territorial multifinalitário (CTM) é a base do município para tributação, planejamento e regularização fundiária. Publicá-lo como WebGIS permite que cidadãos e secretarias consultem lotes e camadas sem SIG desktop, e o QGIS Server nos deixou reutilizar os mesmos projetos que a equipe cadastral já mantinha.",
        ],
      },
    ],
  },

  slope: {
    title: "Slope",
    tagline: "Desenhe uma linha no mapa e receba um perfil de elevação ao vivo calculado direto de um raster no PostGIS.",
    summary:
      "Um protótipo que explora até onde o PostGIS vai em análise interativa sem um backend pesado: um mapa Next.js com rlayers, uma única rota de API com SQL puro e um gráfico Plotly que atualiza enquanto você desenha.",
    role: "Autor; P&D pessoal",
    highlights: [
      "Lê a resolução nativa de pixel do raster e amostra a linha desenhada nessa resolução",
      "Interpola valores de elevação do raster em SQL; sem Python, sem serviço GDAL",
      "Consultas parametrizadas, nomes de tabela em lista branca e bearer token na rota da API",
      "Next.js, React, rlayers (OpenLayers), Plotly e node-postgres",
    ],
    sections: [
      {
        heading: "Por quê",
        body: [
          "Perfis de elevação são uma tarefa clássica de SIG geralmente resolvida com uma ferramenta desktop ou um serviço de processamento. Eu queria ver se o banco sozinho conseguiria servi-los interativamente. Consegue: as funções raster do PostGIS lidam com amostragem e interpolação rápido o bastante para o perfil parecer vivo enquanto o usuário ainda desenha.",
        ],
      },
    ],
    flow: [
      { label: "Desenhe uma linha", sub: "mapa rlayers" },
      { label: "Rota de API", sub: "Next.js · node-postgres" },
      { label: "PostGIS", sub: "amostra o raster na resolução nativa" },
      { label: "Perfil", sub: "gráfico Plotly" },
    ],
  },
};
