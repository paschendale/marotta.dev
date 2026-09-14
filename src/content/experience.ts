export type ExperienceEntry = {
  org: string;
  location: string;
  period: string;
  role: Record<"en" | "pt" | "es", string>;
  summary: Record<"en" | "pt" | "es", string>;
  /** Extra bullets for the résumé page (English). */
  bullets?: string[];
  /** Shown in the compact timeline on the home page. */
  home?: boolean;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    org: "Territorial",
    location: "Remote",
    period: "2024 – present",
    home: true,
    role: { en: "Founder & Lead Engineer", pt: "Fundador e Engenheiro-chefe", es: "Fundador e Ingeniero Principal" },
    summary: {
      en: "Geospatial engineering consultancy. I lead a team of developers delivering platforms end to end for clients in Sweden, Australia, the US and Brazil, from architecture and development to DevOps, consulting and technical leadership.",
      pt: "Consultoria de engenharia geoespacial. Lidero uma equipe de desenvolvedores entregando plataformas de ponta a ponta para clientes na Suécia, Austrália, EUA e Brasil, da arquitetura e do desenvolvimento a DevOps, consultoria e liderança técnica.",
      es: "Consultoría de ingeniería geoespacial. Lidero un equipo de desarrolladores que entrega plataformas de principio a fin para clientes en Suecia, Australia, EE. UU. y Brasil, desde la arquitectura y el desarrollo hasta DevOps, consultoría y liderazgo técnico.",
    },
    bullets: [
      "Lead engineer for Skyport, Skyforest's photogrammetry operations platform, on n8n, Ordo and a distributed Windows worker fleet.",
      "Lead engineer for MapPrism, a LiDAR and bathymetry processing platform for UAI, with fifteen typed executors and preset pipelines.",
      "Lead engineer for Jane's Weather / ACM: built the weather map runtime and its data pipelines, then led development, DevOps, monitoring and documentation for the whole platform.",
      "Lead engineer behind a natural-language geospatial query product: text-to-SQL engine, product platform and infrastructure.",
      "Author of Ordo (orchestration control plane) and Sentinel (synthetic monitoring), both open source and in production.",
    ],
  },
  {
    org: "IBGE — Instituto Brasileiro de Geografia e Estatística",
    location: "Brasília, DF",
    period: "2025 – present",
    home: true,
    role: {
      en: "Geographic and Statistical Information Technologist",
      pt: "Tecnologista em Informações Geográficas e Estatísticas",
      es: "Tecnólogo en Información Geográfica y Estadística",
    },
    summary: {
      en: "Brazil's national statistics and mapping institute.",
      pt: "Instituto nacional de estatística e cartografia do Brasil.",
      es: "Instituto nacional de estadística y cartografía de Brasil.",
    },
  },
  {
    org: "Topocart Topografia, Engenharia e Aerolevantamentos",
    location: "Brasília, DF",
    period: "2022 – 2025",
    home: true,
    role: {
      en: "Requirements Analyst → Technical Coordinator",
      pt: "Analista de Requisitos → Coordenador Técnico",
      es: "Analista de Requisitos → Coordinador Técnico",
    },
    summary: {
      en: "Technical lead for GIS products, including Geo360 LADM, the first LADM-compliant land administration system in Brazil. Later coordinated the software team.",
      pt: "Líder técnico de produtos SIG, incluindo o Geo360 LADM, o primeiro sistema de administração territorial no Brasil conforme o LADM. Depois coordenou a equipe de software.",
      es: "Líder técnico de productos SIG, incluido Geo360 LADM, el primer sistema de administración de tierras conforme a LADM en Brasil. Luego coordinó el equipo de software.",
    },
    bullets: [
      "Requirements, Figma prototyping and architecture for GIS products across Angular, React, Express, Nest.js, Tauri, Ionic and Django.",
      "Coordinated the development team: agile process, backlog planning, code review and technical support.",
    ],
  },
  {
    org: "ENGEFOTO Engenharia e Aerolevantamentos",
    location: "Brazil",
    period: "2022",
    home: true,
    role: { en: "Geotechnology Consultant", pt: "Consultor em Geotecnologias", es: "Consultor en Geotecnologías" },
    summary: {
      en: "Cadastral (CTM) projects in Nova Serrana, Itabira and União da Vitória: collection methodology, PostgreSQL/PostGIS schemas, QField/QGIS/PyQGIS tooling, quality control and team training.",
      pt: "Projetos de CTM em Nova Serrana, Itabira e União da Vitória: metodologia de coleta, esquemas PostgreSQL/PostGIS, ferramentas QField/QGIS/PyQGIS, controle de qualidade e treinamento de equipe.",
      es: "Proyectos catastrales (CTM) en Nova Serrana, Itabira y União da Vitória: metodología de recolección, esquemas PostgreSQL/PostGIS, herramientas QField/QGIS/PyQGIS, control de calidad y capacitación.",
    },
  },
  {
    org: "COPGEO — Engenharia e Consultoria",
    location: "Brazil",
    period: "2021 – 2022",
    home: true,
    role: { en: "Geotechnology Consultant", pt: "Consultor em Geotecnologias", es: "Consultor en Geotecnologías" },
    summary: {
      en: "Web geointelligence platforms (GeoServer, PostGIS, Node.js) and cartographic quality control per ET-CQDG and NBR 13.133, including GNSS processing and cadastral reference networks.",
      pt: "Plataformas web de inteligência geográfica (GeoServer, PostGIS, Node.js) e controle de qualidade cartográfica conforme ET-CQDG e NBR 13.133, incluindo processamento GNSS e redes de referência cadastral.",
      es: "Plataformas web de inteligencia geográfica (GeoServer, PostGIS, Node.js) y control de calidad cartográfica según ET-CQDG y NBR 13.133, incluido procesamiento GNSS y redes de referencia catastral.",
    },
  },
  {
    org: "Canopy Remote Sensing Solutions",
    location: "Brazil",
    period: "2021",
    role: { en: "GIS Developer", pt: "Desenvolvedor SIG", es: "Desarrollador SIG" },
    summary: {
      en: "Canopy Insight, a geointelligence platform for planted forests, and a deforestation-monitoring system for IEF-MG.",
      pt: "Canopy Insight, plataforma de inteligência geográfica para florestas plantadas, e um sistema de monitoramento de desmatamento para o IEF-MG.",
      es: "Canopy Insight, plataforma de geointeligencia para bosques plantados, y un sistema de monitoreo de deforestación para el IEF-MG.",
    },
  },
  {
    org: "GENTE — Grupo de Engenharia Territorial (UFV)",
    location: "Viçosa, MG",
    period: "2017 – 2023",
    home: true,
    role: { en: "Intern → Researcher → Project Manager", pt: "Estagiário → Pesquisador → Gerente de Projetos", es: "Becario → Investigador → Gerente de Proyectos" },
    summary: {
      en: "Research on multipurpose cadastre data models, WebGIS and spatial data infrastructure; led office and field teams on CTM programs in three municipalities, including UAV photogrammetry and cadastral reference networks.",
      pt: "Pesquisa em modelos de dados para cadastro multifinalitário, WebGIS e infraestrutura de dados espaciais; liderou equipes de escritório e campo em programas de CTM em três municípios, incluindo aerofotogrametria com VANT e redes de referência cadastral.",
      es: "Investigación en modelos de datos para catastro multipropósito, WebGIS e infraestructura de datos espaciales; lideró equipos de oficina y campo en programas CTM en tres municipios, incluida fotogrametría con VANT y redes de referencia catastral.",
    },
    bullets: [
      "Built and maintained the WebGENTE framework for publishing cadastral data on the web.",
      "Geoportal Itabirito: public WebGIS on React, TypeScript and QGIS Server.",
      "Modelled and built a Planta Genérica de Valores and led BCI data-collection campaigns.",
    ],
  },
  {
    org: "LT Engenharia e Legalização",
    location: "Viçosa, MG",
    period: "2019 – 2020",
    role: { en: "Surveying and Cartographic Engineer", pt: "Engenheiro Agrimensor e Cartógrafo", es: "Ingeniero Agrimensor y Cartógrafo" },
    summary: {
      en: "Responsible engineer: rural and urban land regularisation and subdivision projects, from topographic survey to geometric, drainage and earthworks design.",
      pt: "Engenheiro responsável: regularização fundiária rural e urbana e projetos de loteamento, do levantamento topográfico ao projeto geométrico, de drenagem e terraplenagem.",
      es: "Ingeniero responsable: regularización de tierras rurales y urbanas y proyectos de urbanización, desde el levantamiento topográfico hasta el diseño geométrico, de drenaje y movimiento de tierras.",
    },
  },
];

export const EDUCATION = [
  { org: "Universidade Federal de Viçosa", degree: { en: "MSc, Civil Engineering — Spatial Information", pt: "Mestrado em Engenharia Civil — Informações Espaciais", es: "Máster en Ingeniería Civil — Información Espacial" }, period: "2019 – 2021" },
  { org: "Universidade Federal de Viçosa", degree: { en: "BSc, Surveying and Cartographic Engineering", pt: "Engenharia de Agrimensura e Cartográfica", es: "Ingeniería de Agrimensura y Cartográfica" }, period: "2014 – 2018" },
];

export const PUBLICATIONS = [
  "Atualização cartográfica por meio de mapeamento colaborativo",
  "Use of Unmanned Aerial Vehicle in Structural Health Monitoring Based on Photogrammetric Methods",
  "O uso do Geo360 no mapeamento de pacientes com Doença de Chagas em Limoeiro do Norte, Ceará",
  "Implementação do Geo360 em Maracanaú: Integração do Cadastro Territorial Multifinalitário com o Sistema Tributário Municipal",
  "Vantagens da utilização do PostgreSQL e PostGIS para publicação e atualização de dados do Cadastro Técnico Multifinalitário",
];
