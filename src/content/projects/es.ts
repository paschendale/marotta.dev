import type { ProjectText } from "./types";

export const es: Record<string, ProjectText> = {
  skyforest: {
    title: "Skyport",
    tagline: "La plataforma de operaciones que convierte los vuelos de dron de Skyforest en capas de mapa terminadas, de principio a fin.",
    summary:
      "Skyforest, una empresa sueca de tecnología forestal, necesitaba que la fotogrametría con drones fluyera del campo a las capas publicadas sin especialistas SIG de por medio. Diseñé la arquitectura de la plataforma y lidero el equipo de Territorial que la construye y opera: aplicación web, API y un backend de procesamiento distribuido.",
    role: "Ingeniero principal y arquitecto, equipo Territorial",
    highlights: [
      "Backend construido íntegramente sobre workflows de n8n y Ordo, el plano de control de orquestación que creé para este proyecto",
      "La fotogrametría corre en una flota de máquinas Windows coordinadas con locks distribuidos en MinIO y detección de procesos de Agisoft",
      "Aplicación web en Next.js con mapas MapLibre para clientes, misiones, órdenes de trabajo y envío de datos offline-first",
      "Cada misión, cliente y capa procesada pasa por el sistema sin que nadie toque una terminal",
    ],
    sections: [
      {
        heading: "El problema",
        body: [
          "Skyforest sobrevuela fincas forestales con drones y entrega ortomosaicos, modelos de elevación y capas derivadas a sus clientes. El cuello de botella nunca fue el vuelo: era todo lo que venía después. Los conjuntos de fotos había que moverlos a mano, procesarlos en software de escritorio, revisarlos, publicarlos en un servidor de mapas y seguirlos en hojas de cálculo, y cada paso dependía de alguien que supiera SIG.",
          "El objetivo era una plataforma en la que el equipo de operaciones envía un vuelo y las capas terminadas aparecen, con cada trabajo visible y recuperable por el camino.",
        ],
      },
      {
        heading: "Qué construimos",
        body: [
          "Skyport son tres cosas: una aplicación web donde el equipo gestiona clientes, misiones y órdenes de trabajo y envía nuevos conjuntos de fotos; una API que posee el modelo de dominio y habla con el almacenamiento; y un backend de procesamiento que hace el trabajo pesado. La aplicación web es un Next.js con mapas MapLibre, desplegada en el borde, con un flujo de envío offline-first para preparar datos de campo antes de tener conexión. Un toolkit de escritorio cubre los casos en que enviar directamente desde la máquina que guarda las fotos es más rápido.",
          "El backend es donde fue la mayor parte de la ingeniería. No hay un servidor de trabajos a medida: cada paso de procesamiento es un workflow de n8n, y Ordo se sitúa sobre n8n como plano de control. Ordo valida cada trabajo contra contratos de ejecutores antes de correr, registra trabajos, pasos y artefactos como estado de primera clase en la base de datos y permite que los workers de n8n reclamen pasos con seguridad. La fotogrametría en sí corre en Agisoft Metashape en una flota de workers Windows. Cada worker mantiene locks en MinIO con TTL, detecta un proceso Agisoft en ejecución para evitar doble programación, y un workflow reaper renueva o libera locks según la ejecución de n8n propietaria siga viva. Los rásteres finales se publican en GeoServer y se convierten en capas que el cliente abre a la mañana siguiente.",
        ],
      },
      {
        heading: "Por qué importó",
        body: [
          "Skyport es el proyecto que hizo necesario a Ordo. La automatización de workflows a secas servía para los pasos individuales pero no garantizaba que un trabajo de varios pasos terminara o fallara de forma visible, con sus artefactos contabilizados. Una vez existió esa capa, el resto de la plataforma se volvió aburrido en el mejor sentido: el equipo envía, la flota procesa, el mapa se actualiza.",
          "Hoy Skyport ejecuta el pipeline de fotogrametría de producción de Skyforest, y Sentinel vigila cada pieza, desde los workers de n8n hasta GeoServer.",
        ],
      },
    ],
    captions: [
      "Panel que agrupa misiones y órdenes de trabajo por cliente",
      "Vista de misión con la cobertura de vuelos procesados en un mapa MapLibre",
      "Flujo de envío: seleccionar fotos, importar posiciones GPS, confirmar",
    ],
  },

  "mapping-sdk": {
    title: "MapPrism",
    tagline: "Una plataforma de procesamiento LiDAR y batimétrico que convierte nubes de puntos crudas en productos 3D y 2D listos para la web, automáticamente.",
    summary:
      "Construida para UAI, una empresa de levantamientos hidrográficos y topográficos, MapPrism toma nubes LAS/LAZ de sonar multihaz y LiDAR y produce curvas de nivel, hillshades, MDE coloreados, tilesets COPC/EPT y escenas Potree sin que nadie toque PDAL ni GDAL a mano.",
    role: "Ingeniero principal y arquitecto, equipo Territorial",
    highlights: [
      "Quince ejecutores tipados (reproyección, regrid, coloreado, MDS/hillshade, curvas de nivel, COPC/EPT/Potree, teselas XYZ) implementados como workflows de n8n",
      "Ocho pipelines predefinidos registrados como recetas en Ordo, más recetas personalizadas validadas contra los contratos de los ejecutores",
      "La gestión adaptativa de memoria divide levantamientos enormes en subconjuntos Entwine en potencias de cuatro y los vuelve a fusionar",
      "Un sitio de documentación (VitePress) escrito para los desarrolladores frontend y autores de pipelines del cliente",
    ],
    sections: [
      {
        heading: "El problema",
        body: [
          "Los levantamientos subacuáticos y topográficos producen nubes de puntos muy grandes en sistemas de coordenadas inconsistentes, y cada entrega necesita la misma familia de productos: una nube transmisible para el navegador, un MDE y un hillshade, curvas de nivel, a veces una nube coloreada con imagen. Hacerlo con scripts funciona hasta que el volumen crece y nadie recuerda qué parámetros produjeron qué archivo.",
        ],
      },
      {
        heading: "Cómo funciona",
        body: [
          "El frontend del cliente envía un trabajo a Ordo con una receta y los artefactos de entrada. Ordo valida la receta (cada tipo de paso debe existir, cada slot de entrada y salida debe coincidir con el contrato de su ejecutor, cada referencia de artefacto debe tener namespace y ser producible), guarda el trabajo y su cola de pasos en PostgreSQL y devuelve un id. Los workers de n8n consultan pasos pendientes, descargan el artefacto de MinIO, ejecutan la herramienta (PDAL, GDAL, Entwine, PotreeConverter), suben el resultado e informan. Un webhook on_exit se dispara al terminar el trabajo, con éxito o fallo, con los metadatos del dataset adjuntos.",
          "Las recetas son DAG deterministas: los artefactos conservan sus nombres por todo el grafo, los parámetros viven en el trabajo y no en la receta, y la misma receta con las mismas entradas siempre da los mismos productos. Los presets cubren los caminos comunes (inspección del dataset, asignación de CRS, reproyección, COPC, EPT, Potree, hillshade coloreado con teselas XYZ, curvas de nivel en MBTiles y PMTiles) y las recetas personalizadas se validan antes de ejecutar nada.",
        ],
      },
      {
        heading: "Detalles que costaron trabajo",
        body: [
          "Entwine carga el dataset completo en memoria al indexar, así que el ejecutor de EPT estima el número de puntos con PDAL, calcula un número seguro de subconjuntos para la RAM disponible, redondea a una potencia de cuatro y construye y fusiona los subconjuntos automáticamente. La reproyección detecta metadatos de CRS inválidos incrustados y estampa el correcto sin mover puntos. La generación de curvas de nivel produce MBTiles y PMTiles con clasificación maestra/secundaria para que el mapa web las estilice directamente.",
          "Las salidas alimentan un visor de pantalla dividida que combina una escena 3D Potree con un mapa 2D MapLibre sincronizado, que es lo que muestran las capturas. MapPrism es la segunda plataforma de producción que corre sobre Ordo, después de Skyport.",
        ],
      },
    ],
    captions: [
      "Nube de puntos batimétrica 3D junto a un mapa 2D con curvas de nivel, hillshade, backscatter y sonar de barrido lateral",
      "Levantamiento de embalse: nube coloreada con mediciones, sincronizada con la capa de batimetría 2D",
      "Sitio de documentación de MapPrism: API, recetas, ejecutores y pipelines predefinidos",
    ],
  },

  "weather-data-platform": {
    title: "Plataforma de Datos Meteorológicos",
    tagline: "Ingeniero principal en Jane's Weather, una plataforma australiana de datos meteorológicos hoy parte de ACM: de construir su mapa meteorológico a operar toda la plataforma con el equipo de Territorial.",
    summary:
      "Me incorporé a Jane's Weather como su desarrollador SIG y construí el runtime del mapa meteorológico y los pipelines de datos que lo alimentan. Cuando la plataforma pasó a formar parte de ACM, el contrato creció: hoy lidero el equipo de Territorial responsable del desarrollo, mantenimiento, DevOps, monitoreo y documentación de todo el sistema.",
    role: "Ingeniero principal, equipo Territorial",
    highlights: [
      "Construí el runtime del mapa meteorológico (React, MapLibre, PMTiles) y sus workflows Argo de procesamiento: isolíneas de pronóstico, radar, satélite, alertas y mapas base",
      "Argo Workflows en Kubernetes ingieren siete modelos de pronóstico (GFS, ACCESS-G, GEM, tres variantes ECMWF, CAMS) más radar, satélite y alertas",
      "Cloudflare Workers, R2, KV y D1 sirven teselas y datos de pronóstico en el borde, con APIs en Kubernetes tras Kong como respaldo",
      "63 pruebas sintéticas en Sentinel verifican frescura y salud desde fuera del clúster; un sitio de documentación en Diátaxis construido a partir del código, inventarios del clúster y una exportación de 130 páginas de Confluence",
    ],
    sections: [
      {
        heading: "La plataforma",
        body: [
          "Jane's Weather produce pronósticos, imágenes de radar y satélite y alertas para aplicaciones de consumo y para clientes como FarmOnline Weather de ACM. La producción de datos corre como Argo Workflows y CronJobs de Kubernetes en un clúster OVH en Sídney: las corridas de modelos en GRIB2 se convierten a Zarr, las imágenes de radar y Himawari se vuelven PMTiles y pirámides de teselas cada cinco minutos, las alertas del Bureau of Meteorology se ingieren en PostGIS. La entrega es storage-first: los frontends resuelven artefactos versionados en Cloudflare R2 a través de Workers, y un Worker proveedor de datos usa D1 y KV para catálogo y autenticación antes de recurrir a las APIs en Kubernetes.",
        ],
      },
      {
        heading: "El mapa",
        body: [
          "Mi primera responsabilidad fue el mapa. Diseñé y construí el runtime del mapa meteorológico que hoy es la experiencia de mapa canónica de la plataforma y de quienes la incrustan, como FarmOnline Weather: una aplicación React sobre MapLibre con PMTiles para mapas base y capas meteorológicas, dos modos (pronóstico, guiado por la línea de tiempo y los modelos; ahora, con prioridad al radar más satélite, observaciones y alertas), una abstracción compartida de capas temporales con precarga, y un contrato de incrustación URL-first para que los sitios asociados controlen modo, modelo, capas y vista desde parámetros de consulta.",
          "El mapa es solo la mitad. También escribí el lado de procesamiento que lo alimenta: el modelo de configuración de capas, los scripts Python que convierten pronósticos en malla Zarr en isolíneas PMTiles, y los workflows Argo que publican artefactos de pronóstico, radar, Himawari, alertas y mapas base en R2 según horario, además de la herramienta de captura headless que renderiza imágenes estáticas de pronóstico para el sitio principal.",
        ],
      },
      {
        heading: "Operar toda la plataforma",
        body: [
          "Después de que la plataforma pasara a ACM y migrara entre nubes, el conocimiento de cómo encajaba estaba repartido entre repositorios, un espacio de Confluence desactualizado y la cabeza de las personas. El equipo de Territorial asumió toda la plataforma, y yo lidero ese trabajo. Construimos primero el programa de documentación: un sitio VitePress organizado por fronteras de sistema, con cada afirmación rastreada al código o a la configuración viva y cada vacío declarado explícitamente. Eso destapó riesgos concretos (el clúster de desarrollo sirviendo tráfico de producción, un cronjob de ingesta cuyo código desplegado venía de un repositorio distinto al que todos suponían, credenciales sin ruta de rotación) y los convirtió en incidencias con seguimiento.",
          "Después, el monitoreo. Los exit handlers de Argo solo avisaban cuando un pipeline decía haber fallado; nada verificaba que los artefactos estuvieran realmente frescos y accesibles. Desplegamos Sentinel con una suite que hoy cubre los Workers de borde, las APIs en Kubernetes, el proxy del BoM, las fuentes de los modelos y los tres frontends, con umbrales de desfase calculados de forma independiente a partir de los horarios observados de llegada de los modelos, no de las banderas de la propia plataforma. En el día a día el equipo se ocupa del desarrollo y mantenimiento de las APIs y frontends, secretos y despliegues en Kubernetes, investigación de incidentes y postmortems (un rate limit de ECMWF, una migración de URL de GEM, un pico de gasto en Vercel, un crash loop por corrupción de NaN en la API de consumo).",
        ],
      },
    ],
    flow: [
      { label: "Proveedores meteorológicos", sub: "modelos NWP, radar y satélite del BoM, alertas" },
      { label: "Argo Workflows", sub: "Kubernetes · GRIB2 → Zarr · PMTiles" },
      { label: "Almacenamiento", sub: "Cloudflare R2 · Supabase · OVH S3" },
      { label: "Workers de borde", sub: "KV · D1 · entrega R2-first" },
      { label: "Mapa y clientes", sub: "runtime MapLibre · apps en Vercel · APIs" },
    ],
  },

  ordo: {
    title: "Ordo",
    tagline: "Un plano de control de orquestación basado en contratos para trabajos de procesamiento largos, hecho para situarse sobre n8n.",
    summary:
      "Los motores de workflow como n8n ejecutan pasos bien pero no ofrecen un modelo durable y validado de un trabajo de varios pasos. Ordo es esa capa que faltaba: valida recetas, impone contratos de entrada y salida entre pasos y registra cada trabajo, paso y artefacto como estado consultable. Código abierto, y el backend de toda plataforma pesada que construyo.",
    role: "Autor y mantenedor",
    highlights: [
      "Las recetas son DAG deterministas basados en artefactos, validados contra contratos de ejecutores antes de ejecutar nada",
      "Trabajos, pasos y artefactos son estado de primera clase en PostgreSQL, con progreso, logs por paso y hooks de ciclo de vida",
      "Deliberadamente no ejecuta pasos, no gestiona workers ni trae UI: la ejecución pertenece al motor de abajo",
      "En producción en Skyport y MapPrism; publicado con versionado semántico, migraciones y una suite Vitest",
    ],
    sections: [
      {
        heading: "Por qué existe",
        body: [
          "Construí Ordo mientras construía Skyport. n8n era excelente ejecutando pasos e integrando sistemas, pero el pipeline seguía necesitando garantías que n8n no daba: que las entradas de un trabajo fueran válidas antes de correr el primer paso, que las salidas de un paso coincidieran con lo que el siguiente esperaba, que un trabajo fallido dejara un rastro claro de qué se había producido y qué no. Quería algo que se situara sobre la ejecución, siguiera siendo simple y aun así fuera estricto.",
        ],
      },
      {
        heading: "El modelo",
        body: [
          "Una receta es una lista de pasos. Cada paso nombra un tipo de ejecutor, mapea los slots de entrada del ejecutor a referencias de artefacto con namespace (job:<nombre> para entradas del trabajo, step:<id>.<slot> para salidas de paso) y mapea sus slots de salida a nombres de artefacto. Los ejecutores son filas de una tabla step_executor que declaran qué aceptan y producen; la validación de la receta comprueba que cada tipo de paso existe, cada slot está ligado exactamente una vez, cada artefacto referenciado es producible y ningún nombre de artefacto se repite. Los parámetros se declaran en las recetas solo por clave y se suministran por trabajo, así que sus valores nunca afectan a la identidad de una receta.",
          "Los trabajos se crean a partir de una receta más artefactos de entrada concretos, parámetros y declaraciones opcionales de salida. Ordo inserta la cola de pasos, expone el progreso como fracción entre pasos, muestra la última línea de log de cada paso y ejecuta un paso on_exit cuando el grafo principal termina, sea cual sea el resultado. Un max_concurrency por paso limita cuántas instancias de un ejecutor corren a la vez entre todos los trabajos.",
        ],
      },
      {
        heading: "Límites y próximos pasos",
        body: [
          "Ordo no ejecuta pasos, no gestiona infraestructura, no ofrece editor ni mueve archivos. Los workers de n8n reclaman pasos directamente de la base de datos, ejecutan la herramienta, registran artefactos e informan el estado; un workflow finalizador aparte entrega las salidas declaradas a su ruta final de almacenamiento. Ese contrato directo con la base de datos es pragmático, no fundamental, y la hoja de ruta es desacoplarlo tras colas o APIs para que varios backends de ejecución corran en paralelo.",
          "La API es un pequeño servicio TypeScript/Express sobre PostgreSQL con migraciones aplicadas al arrancar, publicado con semantic-release y distribuido como imagen Docker.",
        ],
      },
    ],
    flow: [
      { label: "Cliente", sub: "POST /jobs con receta + artefactos" },
      { label: "Ordo", sub: "valida · guarda · rastrea estado" },
      { label: "Workers n8n", sub: "reclama paso · ejecuta herramienta · registra artefacto" },
      { label: "Object storage", sub: "artefactos en MinIO / S3" },
      { label: "Finalizador", sub: "entrega salidas · hook on_exit" },
    ],
  },

  sentinel: {
    title: "Sentinel",
    tagline: "Una plataforma programable de monitoreo sintético: pruebas en JavaScript, alertas por cambio de estado, páginas de estado públicas, en un VPS de 1 GB.",
    summary:
      "Los monitores de uptime existentes o hacen ping a URLs desde YAML o crecen hasta ser paneles pesados. Sentinel ejecuta funciones de prueba JavaScript reales según un horario, valida lógica de negocio y alerta por Discord, Slack o webhooks. Vigila todas las plataformas que opero, además de la red GNSS nacional del IBGE.",
    role: "Autor y mantenedor",
    highlights: [
      "Las pruebas son JavaScript puro con una pequeña API ctx: HTTP, FTP, S3 (SigV4 implementado a mano), secretos, aserciones y avisos",
      "Tres resultados (pass, warn, fail), umbrales de fallo, cooldowns y enrutamiento de canales por tipo de evento",
      "Páginas de estado públicas por etiqueta, métricas Prometheus, almacén de secretos cifrado y un servidor MCP completo para agentes de IA",
      "Diseñado para 1 GB de RAM y media vCPU: escrituras por lotes, tablas particionadas, estadísticas diarias preagregadas",
    ],
    sections: [
      {
        heading: "Por qué otro monitor",
        body: [
          "Necesitaba saber que el pipeline de un cliente se había quedado obsoleto antes de que lo supiera el cliente. Un 200 de una API no dice nada sobre si el pronóstico detrás tiene seis horas, o si una capa de GeoServer todavía tiene datos. Los monitores por configuración no podían expresarlo; las herramientas centradas en paneles no podían correr cientos de comprobaciones en una máquina pequeña. Sentinel es la herramienta que quería: una prueba es una función que recibe un contexto y devuelve verdadero o falso, y la plataforma se ocupa de programación, reintentos, alertas e historial.",
        ],
      },
      {
        heading: "Arquitectura",
        body: [
          "Todo el diseño parte de un único objetivo de despliegue: un VPS de 1 GB y media vCPU corriendo unas 500 pruebas por minuto. Un solo proceso Fastify en Node.js programa pruebas con intervalos con jitter, compila el código del usuario una vez al guardar, enfrenta cada ejecución a su timeout y limita la concurrencia con un pequeño pool de slots. Los resultados se almacenan en búfer y se vuelcan a PostgreSQL por lotes en tablas particionadas por mes; una tabla de agregados diarios alimenta las páginas de estado públicas para que nunca toquen las ejecuciones crudas. El HTTP saliente pasa por Undici con pool de conexiones por host. Los secretos se cifran en reposo con AES-256-GCM y se exponen a las pruebas como un objeto síncrono en memoria.",
          "Las notificaciones son dirigidas por eventos y fire-and-forget: una prueba pasa a fallo solo tras N fallos consecutivos, los avisos se disparan en la primera ocurrencia con cooldown, la recuperación es su propio evento y cada asignación de canal filtra qué tipos de evento recibe. El panel es una app Next.js que puede desplegarse en Cloudflare Pages con solo la API y la base de datos en el VPS. Un servidor MCP envuelve las rutas REST en proceso, así que un agente de IA puede crear, ejecutar e inspeccionar pruebas con la misma validación y autenticación.",
        ],
      },
      {
        heading: "En producción: la red RBMC",
        body: [
          "El despliegue público más exigente monitorea la RBMC, la Red Brasileña de Monitoreo Continuo de los Sistemas GNSS, operada por el IBGE. La RBMC es una red de unas 150 estaciones GNSS permanentes repartidas por Brasil que transmiten y publican observaciones satelitales continuas. Es la materialización física de SIRGAS2000, el marco de referencia geodésico nacional, y la columna vertebral del posicionamiento preciso en el país: levantamientos posprocesados, correcciones en tiempo real, georreferenciación de inmuebles rurales, monitoreo de ingeniería y trabajo científico dependen de que sus datos estén disponibles y al día.",
          "La página de estado de la RBMC sigue cada estación individualmente con historial de 24 horas, para que un topógrafo compruebe si la estación más cercana a un trabajo está publicando antes de salir a campo. Sentinel también vigila la plataforma de Jane's Weather con 63 pruebas y cada servicio detrás de Skyport y MapPrism.",
        ],
      },
    ],
    captions: [
      "Cuadrícula de estado de todos los entornos que Sentinel vigila, filtrada por etiqueta",
      "Lista de pruebas con resultado, última ejecución, tiempo medio de respuesta e historial de 24 horas",
      "Alertas de cambio de estado en Discord: fallo con motivo y recuento consecutivo, luego recuperación con tiempo de caída",
    ],
  },

  "territorial-invoices": {
    title: "Territorial Invoices",
    tagline: "El sistema que lleva la facturación de Territorial: registro de horas en calendario, contratos con matemática de cobro determinista y facturas generadas en minutos.",
    summary:
      "Territorial factura a varios clientes bajo distintos tipos de contrato cada mes. Esta plataforma interna registra horas en un calendario de arrastrar y crear, consolida las horas por contrato e hito y genera un lote completo de facturas con PDF. Un cierre que llevaba una tarde hoy toma menos de quince minutos.",
    role: "Autor; producto interno de Territorial",
    highlights: [
      "Las horas se registran en un calendario como se crea un evento en Google Calendar: arrastrar, redimensionar, mover",
      "Tres tipos de contrato con matemática de cobro pura y testeable: por hora, por hora con base fija y por hora con crédito acumulable",
      "Las facturas en borrador son proyecciones en vivo; las emitidas son instantáneas inmutables con tipo de cambio congelado y PDF A4",
      "Un servidor MCP permite que Territorial Assistant registre horas automáticamente a partir de mi propia actividad",
    ],
    sections: [
      {
        heading: "El problema",
        body: [
          "Facturar consultoría es simple hasta que deja de serlo: un cliente por hora simple, otro en retainer con horas extra, un tercero con una base que traslada las horas no usadas al siguiente ciclo, todos en monedas distintas, todos necesitando un documento con aspecto definitivo. Quería que el mes entero cerrara en minutos y que los números fueran reproducibles.",
        ],
      },
      {
        heading: "Qué hace",
        body: [
          "Clientes, contratos, proyectos e hitos forman el modelo; las entradas de tiempo se asocian a un proyecto e hito y heredan la tarifa del contrato. El calendario es la vía rápida para registrar, con filtros por cliente, proyecto e hito y colores por proyecto. Al cerrar un periodo, el sistema calcula las horas facturables de cada contrato: por hora simple cobra lo trabajado; con base cobra el mínimo más las extras a su propia tarifa; con rollover cobra la base, difiere el excedente a un búfer de un ciclo y usa el crédito arrastrado para cubrir déficits antes de que expire. Cada regla es una función pura con ejemplos resueltos en la documentación y las pruebas.",
          "Las facturas empiezan como borradores proyectados en vivo desde las entradas y se vuelven inmutables al emitirse, con líneas, totales y tipo de cambio congelados. Los PDF se renderizan con Playwright a partir del mismo HTML que muestra la aplicación, en inglés o portugués, con direcciones estructuradas de emisor y cliente e instrucciones de pago por moneda. Un panel muestra horas, ingresos, distribución por cliente y alertas de entradas huérfanas y riesgo de horas base.",
        ],
      },
      {
        heading: "Automatización e integración fiscal",
        body: [
          "Con el tiempo me volví perezoso para registrar, así que ahora Territorial Assistant propone entradas a partir del historial git, transcripciones de Claude Code y actividad de ventanas y las registra aquí por un endpoint MCP con token de acceso personal, con el mismo modelo de roles que la aplicación web. La integración fiscal con el sistema NF-e de Brasil está en marcha: hoy la plataforma prepara todo lo que pide el sistema fiscal, de modo que emitir la nota es copiar y pegar en vez de reconstruir.",
          "El stack es un monorepo pnpm con una API Fastify (validación Zod, Prisma, PostgreSQL) y un frontend Next.js App Router que mantiene toda la lógica de negocio en el servidor.",
        ],
      },
    ],
    captions: [
      "Panel: horas, ingresos, distribución diaria por cliente y alertas",
      "Registro de horas en calendario con entradas por arrastrar y crear, filtradas por cliente, proyecto e hito",
    ],
  },

  "territorial-assistant": {
    title: "Territorial Assistant",
    tagline: "Un daemon basado en Discord que convierte mi propia actividad de trabajo en hojas de horas aprobadas y en una base curada de historias de ingeniería.",
    summary:
      "Reconstruir horas facturables de memoria y encontrar tiempo para escribir sobre el trabajo eran dos tareas que siempre posponía. Este asistente de proceso único lee ActivityWatch, git, GitHub y transcripciones de Claude Code, propone hojas de horas diarias en Discord y extrae de la misma evidencia historias que merecen publicarse.",
    role: "Autor; herramienta personal",
    highlights: [
      "Un proceso TypeScript, una base Postgres, un bot de Discord; ninguna UI web que mantener",
      "Claude se usa solo para criterio, nunca para contabilidad: reglas y cachés responden primero, y las llamadas se liberan solo con presupuesto sobrante en la suscripción",
      "El asistente de hojas de horas propone entradas por cliente, aprende reglas de mapeo a partir de correcciones en lenguaje natural y registra los días aprobados en Territorial Invoices",
      "El asistente de marketing extrae y puntúa historias cada semana y redacta posts; la información confidencial de clientes se excluye por diseño",
    ],
    sections: [
      {
        heading: "Cómo funciona el asistente de hojas de horas",
        body: [
          "Cada quince minutos el daemon ingiere eventos de ventana y navegador de ActivityWatch, los compacta en bloques de actividad y resuelve todo lo que puede con reglas aprendidas: este repositorio es aquel cliente, este host de URL es aquel proyecto. Solo el resto ambiguo va a Claude. Los bloques se convierten en intervalos por cliente, los intervalos se fusionan en sesiones cognitivas con un margen de 15 minutos y una tolerancia de 45 minutos entre ellas, y cada sesión se enriquece con lo que realmente se hizo usando commits y transcripciones de esa ventana.",
          "El resultado es una propuesta en un hilo de Discord, una por día. Respondo en lenguaje natural (\"S2 es ACM, hito Maintenance & DevOps\"), el bot revisa, aprende la regla y, al aprobar, registra una entrada por sesión y proyecto a través del endpoint MCP de Invoices. Los días incompletos se rechazan en lugar de registrarse a medias.",
        ],
      },
      {
        heading: "El asistente de marketing",
        body: [
          "El segundo módulo trata la experiencia como el producto. Reúne el historial git, pull requests y transcripciones de la semana, extrae qué pasó y cuál fue la lección, y puntúa cada elemento como un ángulo que le importaría a un gestor SIG o CTO aun sin conocer el proyecto. El lunes llega un resumen de candidatas a Discord; elijo y asigno cada una a un blog, el asistente redacta en un hilo, abre un pull request contra el repositorio del sitio al aprobar y prepara publicaciones para LinkedIn cuando el artículo está en línea. La base de conocimiento persiste entre semanas, así que los elementos con baja puntuación pueden rescatarse después.",
        ],
      },
      {
        heading: "Restricciones de diseño",
        body: [
          "Las etapas se comunican solo a través de la base de datos, así que cualquiera puede volver a ejecutarse. Claude se invoca mediante la CLI local con esquemas de salida estructurada, sin herramientas y sin persistencia de sesión, para que las llamadas generadas por el asistente nunca contaminen las transcripciones que luego lee. Una compuerta consulta el endpoint de uso de la suscripción y vacía una cola de prioridad solo cuando el presupuesto quedaría sin usar: respuestas interactivas primero, hojas de horas después, marketing al final.",
        ],
      },
    ],
    captions: [
      "Propuesta diaria en Discord: sesiones por cliente, trabajo sin correspondencia señalado, corrección en lenguaje natural",
      "Resumen semanal de historias del asistente de marketing con hilos por historia",
    ],
  },

  finances: {
    title: "Finances",
    tagline: "Una app personal de libro mayor y presupuesto con arquitectura Postgres-first: una instancia PostgREST, un frontend estático, nada más.",
    summary:
      "Tras cinco años como usuario intensivo de apps de finanzas comerciales que cambiaban su propia estructura una y otra vez, escribí los requisitos que realmente tenía y construí la herramienta. Corre en el servidor más pequeño que tengo y sirve de laboratorio de cuán delgado puede ser un backend.",
    role: "Autor; herramienta personal",
    highlights: [
      "PostgreSQL es el backend: PostgREST expone el esquema, la autenticación es una RPC de Postgres con tokens hasheados y permisos por rol",
      "El frontend React/Vite es estático y se despliega en cualquier sitio (Vercel, Cloudflare, una VM gratuita)",
      "Libro mayor multicuenta, saldos acumulados, historial de composición de activos y presupuestos anuales con seguimiento mensual",
      "Un servidor MCP expone el libro mayor a herramientas de IA para clasificar y analizar",
    ],
    sections: [
      {
        heading: "Por qué lo construí",
        body: [
          "Todas las apps de finanzas que usé acabaron rediseñando su modelo de datos debajo de mí: las categorías se fusionaron, los presupuestos se volvieron otra cosa, las exportaciones dejaron de cuadrar. No quería funciones; quería registrar transacciones de la misma forma durante una década. Tras usar esas herramientas a diario durante años, los requisitos estaban inusualmente claros, así que construir salió más barato que adaptarse otra vez.",
        ],
      },
      {
        heading: "Arquitectura",
        body: [
          "El objetivo de diseño era la facilidad de despliegue. Un único proceso PostgREST delante de PostgreSQL es todo el backend: tablas, vistas y funciones definen la API, los roles de la base de datos imponen permisos y el login es un procedimiento almacenado que valida un token hasheado y emite un JWT. No hay servidor de aplicación que parchear ni escalar. El frontend es una app React, Vite, TypeScript y Tailwind que compila a archivos estáticos, así que puede vivir en Vercel o Cloudflare mientras la base de datos está en una pequeña instancia gratuita de Oracle. Docker Compose levanta todo en local sin configuración.",
          "Funcionalmente cubre cuentas organizadas por tipo, un libro mayor con totales acumulados por día y exportación, un gráfico de historial de composición de activos y presupuestos planificados anualmente y ejecutados mensualmente con mínimo, máximo y restante por categoría. El servidor MCP permite que un asistente lea saldos y registre transacciones directamente.",
        ],
      },
    ],
    captions: [
      "Panel con grupos de cuentas, patrimonio neto e historial de composición de activos",
      "Libro mayor con totales diarios acumulados, categorías y cuentas",
      "Vista general de cuentas agrupadas por tipo",
      "Ejecución del presupuesto frente al plan anual",
    ],
  },

  "ai-geospatial-query": {
    title: "Plataforma de Consulta Geoespacial en Lenguaje Natural",
    tagline: "Un producto donde los usuarios preguntan sobre datos geográficos en lenguaje natural y reciben respuestas, gráficos y mapas, generados por un LLM sobre PostGIS.",
    summary:
      "Trabajo para un cliente bajo NDA, así que nombres y datasets quedan fuera: un motor de consulta texto-a-SQL sobre datos públicos multijurisdiccionales, la plataforma de producto a su alrededor (API, aplicación web, SDKs, facturación) y la infraestructura en la que corre. Lideré su concepción e ingeniería con el equipo de Territorial.",
    role: "Ingeniero principal: concepción, motor de consulta, plataforma de producto e infraestructura, equipo Territorial",
    note: "Trabajo protegido por NDA; el producto, el cliente y los datasets no se nombran intencionadamente.",
    highlights: [
      "Motor de consulta: lenguaje natural → SQL consciente del esquema → validación → PostGIS → respuesta en lenguaje natural, en una sola llamada",
      "Dos backends de LLM intercambiables tras una interfaz REST idéntica; restricción por esquema para que una conversación solo toque las fuentes de datos que le fueron concedidas",
      "Sandbox analítico: un bucle de herramientas acotado para análisis posteriores (razones, rankings, comparaciones), gráficos, mapas y un intérprete de código opcional",
      "Plataforma de producto con organizaciones, claves de API, medición de uso, rate limits, webhooks, facturación por suscripción, SDKs en TypeScript y Python y sitio de documentación",
    ],
    sections: [
      {
        heading: "El motor de consulta",
        body: [
          "El motor es un servicio FastAPI sobre PostgreSQL/PostGIS con datasets públicos a nivel federal, estatal y municipal: financiación de campañas, demografía censal, registros y licencias de empresas, permisos, criminalidad, impuestos. La parte difícil de texto-a-SQL sobre datos así no es el modelo; es darle al modelo un esquema sobre el que pueda razonar. Diseñé la capa de datos: cómo se relacionan jurisdicciones de distintos niveles, cómo se exponen y simplifican las geometrías, qué columnas tienen significado y cómo se describe todo eso para que el SQL generado sea correcto a la primera con más frecuencia. La coincidencia aproximada de nombres usa similitud por trigramas en la base de datos, así que lugares y candidatos mal escritos siguen resolviéndose.",
          "Una pregunta se convierte en un candidato SQL, se valida y restringe (los esquemas se permiten por conversación, los esquemas internos nunca pueden consultarse), se ejecuta y se resume de vuelta en lenguaje. El backend de LLM es intercambiable: una implementación con modelos de OpenAI vía LangChain, otra con el framework de agentes de Google y Gemini, ambas tras el mismo contrato REST con historial de conversación, de modo que comparar proveedores fue configuración y no una reescritura. Un modo analítico añade un bucle de agente acotado sobre datos recién obtenidos, con timeouts por consulta, límites de reintentos y un plazo de extremo a extremo, produciendo porcentajes, rankings, gráficos y mapas.",
        ],
      },
      {
        heading: "El producto alrededor",
        body: [
          "Un motor de consulta no es un producto. También lideré la plataforma que lo convierte en uno: una API Express con PostgreSQL/PostGIS en capas de controllers, services y repositories, una aplicación web React para chat y gestión de conversaciones, SDKs en TypeScript y Python para acceso programático, organizaciones y equipos, claves de API, medición de uso y rate limiting, un sistema de webhooks para notificaciones de eventos, facturación por suscripción vía Stripe y un sitio de documentación.",
        ],
      },
      {
        heading: "Infraestructura",
        body: [
          "Todo corre como stacks de Docker Compose tras Traefik, con entornos separados de desarrollo, beta y producción, actualización automática de imágenes, una capa de métricas y BI y Sentinel vigilando el conjunto. Los secretos están acotados por servicio y se cargan desde un único archivo de entorno para que la configuración siga siendo legible a medida que crece el stack. Las llamadas que llevan datos de clientes a endpoints externos de modelos resuelven sus destinos en modo fail-closed: producción se niega a correr sin un endpoint explícito y nunca recurre a uno público.",
        ],
      },
    ],
    flow: [
      { label: "Pregunta", sub: "lenguaje natural, vía app web o SDK" },
      { label: "LLM", sub: "generación de SQL consciente del esquema" },
      { label: "Validación", sub: "esquemas permitidos · consulta restringida" },
      { label: "PostGIS", sub: "ejecución espacial" },
      { label: "Respuesta", sub: "texto · gráfico · mapa · análisis" },
    ],
  },

  "geo360-ladm": {
    title: "Geo360 LADM",
    tagline: "El primer sistema de administración de tierras en Brasil construido sobre el estándar ISO 19152 LADM, liderado mientras estaba en Topocart.",
    summary:
      "Como líder técnico en Topocart, dirigí la concepción y la arquitectura del módulo LADM de Geo360: un sistema catastral y registral donde partes, derechos, restricciones y unidades espaciales siguen el modelo internacional en lugar de esquemas municipales improvisados.",
    role: "Líder técnico y analista de requisitos en Topocart",
    highlights: [
      "Land Administration Domain Model (ISO 19152) implementado en PostgreSQL/PostGIS",
      "Derechos, restricciones y responsabilidades modelados explícitamente, vinculando partes con unidades espaciales",
      "Interoperable por diseño con sistemas tributarios municipales y la práctica registral nacional",
      "Implementación de referencia para proyectos catastrales posteriores en la empresa",
    ],
    sections: [
      {
        heading: "Contexto",
        body: [
          "Los municipios brasileños gestionan catastros multipropósito sobre modelos de datos que crecieron orgánicamente, lo que hace frágil el intercambio entre catastro, registro y hacienda. LADM ofrece un vocabulario estándar para ese problema: partes, unidades administrativas básicas, derechos, restricciones, responsabilidades y unidades espaciales, con versionado incorporado.",
        ],
      },
      {
        heading: "Qué hice",
        body: [
          "Lideré el levantamiento de requisitos con actores del catastro y del registro, diseñé el modelo conceptual y lógico e implementé el esquema en PostgreSQL/PostGIS, manteniendo reconocibles los paquetes del estándar y acomodando lo que la práctica brasileña realmente necesita. GeoServer publica las unidades espaciales a los clientes web de Geo360. El trabajo se apoyó en el modelado de datos catastrales que publiqué durante el máster y en la literatura de LADM, y el módulo se convirtió en la referencia de la empresa para administración de tierras interoperable. Dos de mis publicaciones salieron de despliegues de Geo360 en municipios de Ceará.",
        ],
      },
    ],
    captions: ["Interfaz catastral de Geo360"],
  },

  dragonfly: {
    title: "Dragonfly GeoAnalytics",
    tagline: "Una plataforma de geointeligencia que ayuda a los municipios a combatir dengue, Zika y chikungunya con imágenes de dron y mapeo de casos.",
    summary:
      "Las libélulas depredan larvas de mosquito; Dragonfly mapea focos y casos de enfermedad a partir de vuelos de dron para que los equipos de salud vean los brotes mientras se mueven. Construí todo el ecosistema para una empresa de ingeniería brasileña: frontend, dos backends, servidor de teselas y el despliegue GitOps.",
    role: "Ingeniero full-stack y arquitecto, contratado",
    highlights: [
      "Frontend React con Mapbox (react-map-gl), paneles Highcharts y Chakra UI en modo oscuro",
      "API de datos en Express y Prisma; servicio de autenticación en Django REST Framework con OAuth2",
      "PostGIS con pg_tileserv sirviendo teselas vectoriales (MVT) directamente desde la base de datos",
      "Desplegado para varios municipios mediante un pipeline GitOps en Docker Swarm con Portainer",
    ],
    sections: [
      {
        heading: "El sistema",
        body: [
          "Los equipos de campo sobrevuelan barrios con drones; la plataforma georreferencia focos potenciales y casos confirmados, los agrega en tiempo y espacio y presenta estadísticas y tendencias por distrito. El frontend renderiza teselas vectoriales servidas directamente desde PostGIS con pg_tileserv, lo que mantuvo el backend pequeño y los mapas rápidos.",
          "Dividí el backend en dos a propósito: una API de datos tipada en Express y Prisma por velocidad de iteración, y un servicio Django REST Framework con Django OAuth Toolkit para un sistema de autenticación robusto y basado en estándares. Un módulo móvil aparte se construyó como proyecto propio.",
        ],
      },
      {
        heading: "Entrega",
        body: [
          "El contrato cubrió diseño, desarrollo, la metodología de recolección de datos y el despliegue en la nube. Todo está contenedorizado y se despliega mediante un pipeline de infraestructura como código, de modo que un nuevo municipio es un cambio de configuración y no una nueva compilación.",
        ],
      },
    ],
  },

  "geoserver-mobile-client": {
    title: "GeoServer Mobile Client",
    tagline: "Un cliente móvil con soporte offline para capas de GeoServer: descargar, ver, editar entidades y exportar, construido en tres semanas.",
    summary:
      "Un cliente ya gestionaba sus capas en un sistema web sobre GeoServer pero necesitaba que los equipos de campo llevaran esas capas offline, editaran entidades y añadieran nuevas desde el móvil. Ionic, React, TypeScript y OpenLayers, con la API REST de GeoServer como único backend.",
    role: "Desarrollador único, en Topocart",
    highlights: [
      "Ionic + React + OpenLayers con interacción offline completa: descargar capas, navegar, editar, recolectar, exportar GeoJSON",
      "Sin backend propio: el REST de GeoServer gestiona workspaces, stores, capas, usuarios y estilos",
      "De los requisitos a una publicación no listada en Google Play en tres semanas",
      "Publicado mediante Ionic Appflow, restringido a los usuarios autorizados del cliente",
    ],
    sections: [
      {
        heading: "Enfoque",
        body: [
          "Ionic y React dieron una UI móvil responsiva rápidamente, y OpenLayers aportó la profundidad cartográfica que el trabajo necesitaba: renderizado eficiente de vectores y rásteres, además de herramientas de dibujo para entidades complejas. Construir directamente sobre la API REST de GeoServer hizo que la app heredara los usuarios, capas y estilos existentes del cliente en lugar de duplicarlos.",
        ],
      },
    ],
  },

  "territorial-maps": {
    title: "Territorial Maps",
    tagline: "Un SaaS para publicar imágenes de dron: sube desde tu computadora, obtén capas listas para la web e instrucciones de acceso para cualquier SIG.",
    summary:
      "Territorial Maps toma rásteres directamente de la máquina del usuario, genera teselas automáticamente, los organiza por proyecto y produce instrucciones listas para abrir los datos en ArcGIS Online, QGIS y otros clientes. Sin experiencia SIG ni infraestructura del lado del usuario.",
    role: "Ingeniero principal; producto de Territorial",
    highlights: [
      "Sube TIF, JPG o PNG; el teselado y la publicación corren automáticamente en pipelines n8n",
      "Organización por proyecto con tokens de acceso para compartir de forma controlada",
      "Instrucciones de acceso generadas por plataforma SIG para que los clientes consuman capas donde ya trabajan",
      "Frontend Next.js y MapLibre desplegado en Cloudflare",
    ],
    sections: [
      {
        heading: "Qué resuelve",
        body: [
          "Los operadores de dron producen ortomosaicos y luego pasan horas poniéndolos delante de los clientes: convirtiendo formatos, construyendo pirámides, alojando teselas, escribiendo instrucciones. Territorial Maps lo reduce a subir, esperar, compartir. El pipeline de procesamiento y el modelo de publicación son los mismos que crecieron hasta ser Skyport, aplicados a un producto de autoservicio.",
        ],
      },
    ],
  },

  "pointcloud-automation": {
    title: "Automatización de Publicación de Nubes de Puntos",
    tagline: "Un framework basado en n8n que lleva nubes de puntos crudas a escenas Potree optimizadas, construido como backend de un SaaS.",
    summary:
      "La primera generación del framework de procesamiento que luego se convirtió en MapPrism y en parte de Skyport: workflows n8n orquestando PDAL, Entwine y PotreeConverter para clasificar, comprimir, teselar y describir nubes de puntos grandes con atención a la velocidad y el uso de recursos.",
    role: "Ingeniero principal; producto de Territorial",
    highlights: [
      "Pipeline de extremo a extremo de LAS/LAZ crudo a Potree, con generación de metadatos",
      "Gestión de colas para trabajos concurrentes y programación consciente de recursos",
      "Diseñado como servicio de backend para un frontend SaaS",
      "Las lecciones de este framework son las que motivaron el modelo basado en contratos de Ordo",
    ],
    sections: [
      {
        heading: "Notas",
        body: [
          "Aquí aprendí que la automatización de workflows por sí sola no es un modelo de orquestación. El pipeline funcionaba y procesaba datos reales, pero rastrear qué artefacto venía de qué ejecución, y garantizar que una cadena de pasos terminara o fallara de forma visible, requería una capa que n8n no ofrecía. Ese vacío es el que hoy llena Ordo.",
        ],
      },
    ],
  },

  "geoportal-itabirito": {
    title: "Geoportal Itabirito",
    tagline: "Un WebGIS público que consolida el catastro territorial multipropósito de Itabirito, Minas Gerais, en un solo mapa.",
    summary:
      "Construido para el municipio durante mis años de investigación, el geoportal expone datos catastrales, tributarios y de tierras a través de un mapa web en React y TypeScript sobre QGIS Server, manteniendo todo el stack en código abierto y libre de licencias SIG propietarias.",
    role: "Desarrollador, grupo de investigación GENTE en la UFV",
    highlights: [
      "Frontend React + TypeScript + OpenLayers hablando directamente con QGIS Server",
      "Stack de código abierto de extremo a extremo, sin licencia propietaria de servidor de mapas",
      "Contenedorizado y desplegado con Docker Compose",
      "Sigue en línea sirviendo al municipio",
    ],
    sections: [
      {
        heading: "Contexto",
        body: [
          "El catastro territorial multipropósito (CTM) es la base del municipio para tributación, planificación y regularización de tierras. Publicarlo como WebGIS permite que ciudadanos y departamentos consulten parcelas y capas sin SIG de escritorio, y QGIS Server nos permitió reutilizar los mismos proyectos que el equipo catastral ya mantenía.",
        ],
      },
    ],
  },

  slope: {
    title: "Slope",
    tagline: "Dibuja una línea en el mapa y obtén un perfil de elevación en vivo calculado directamente desde un ráster en PostGIS.",
    summary:
      "Un prototipo que explora hasta dónde llega PostGIS en análisis interactivo sin un backend pesado: un mapa Next.js con rlayers, una única ruta de API con SQL puro y un gráfico Plotly que se actualiza mientras dibujas.",
    role: "Autor; I+D personal",
    highlights: [
      "Lee la resolución nativa de píxel del ráster y muestrea la línea dibujada a esa resolución",
      "Interpola valores de elevación del ráster en SQL; sin Python, sin servicio GDAL",
      "Consultas parametrizadas, nombres de tabla en lista blanca y bearer token en la ruta de la API",
      "Next.js, React, rlayers (OpenLayers), Plotly y node-postgres",
    ],
    sections: [
      {
        heading: "Por qué",
        body: [
          "Los perfiles de elevación son una tarea clásica de SIG que suele resolverse con una herramienta de escritorio o un servicio de procesamiento. Quería ver si la base de datos sola podía servirlos de forma interactiva. Puede: las funciones ráster de PostGIS manejan el muestreo y la interpolación lo bastante rápido como para que el perfil parezca vivo mientras el usuario todavía dibuja.",
        ],
      },
    ],
    flow: [
      { label: "Dibuja una línea", sub: "mapa rlayers" },
      { label: "Ruta de API", sub: "Next.js · node-postgres" },
      { label: "PostGIS", sub: "muestrea el ráster a resolución nativa" },
      { label: "Perfil", sub: "gráfico Plotly" },
    ],
  },
};
