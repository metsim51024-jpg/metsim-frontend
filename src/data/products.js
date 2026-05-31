// src/data/products.js

export const products = [
  {
    id: "columnas-metalicas",
    name: "Columnas Metálicas",
    shortDescription:
      "Columnas metálicas telescópicas y octogonales de 7 a 16 metros para alumbrado público, señalización vial y aplicaciones industriales según normas internacionales.",
    description:
      "METSIM Solutions fabrica columnas metálicas telescópicas y octogonales de 7, 9, 10, 12, 14 y 16 metros de altura, diseñadas para alumbrado público, señalización vial y soporte industrial. Cada columna es calculada estructuralmente con software de simulación avanzado (SolidWorks), garantizando cumplimiento con normas IEC, ITAIPÚ y ANDE. Ofrecemos columnas troncocónicas, cilíndricas y octogonales en acero galvanizado o con recubrimiento epoxi.",
    category: "Alumbrado y Señalización",
    badge: "Norma IEC",
    icon: "🏗️",
    keywords: [
      "columnas metálicas Paraguay",
      "postes metálicos Asunción",
      "columnas telescópicas Paraguay",
      "columnas octogonales Paraguay",
      "columnas para alumbrado público",
      "columnas de acero Paraguay",
      "postes de iluminación 7 9 10 12 14 16 metros",
    ],
    metaDescription:
      "Fabricación de columnas metálicas telescópicas y octogonales de 7 a 16m en Paraguay. METSIM Solutions produce columnas para alumbrado público, señalización y uso industrial con cálculo estructural y normas IEC.",
    specs: [
      { label: "Material", value: "Acero SAE 1020 / Acero galvanizado" },
      { label: "Altura disponible", value: "7m, 9m, 10m, 12m, 14m, 16m" },
      { label: "Tipo", value: "Telescópica / Octogonal / Troncocónica" },
      { label: "Acabado", value: "Galvanizado en caliente / Pintura epoxi" },
      { label: "Norma", value: "IEC 60598 / ITAIPÚ / ANDE" },
      { label: "Cálculo", value: "Simulación estructural SolidWorks" },
    ],
    applications: [
      "Alumbrado público urbano y rural",
      "Señalización vial y cartelería",
      "Industria y plantas de producción",
      "Estadios y espacios deportivos",
      "Redes eléctricas de distribución",
    ],
    models: [
      { src: "/models/columna-metalica.glb", label: "Columna Metálica" },
    ],
    modelPoster: null,
  },
  {
    id: "brazos-alumbrado",
    name: "Brazos de Alumbrado Público",
    shortDescription:
      "Brazos metálicos para postes de alumbrado público diseñados según norma, con simulación estructural avanzada.",
    description:
      "Fabricamos brazos porta-luminaria para alumbrado público en simple y doble brazo, adaptados a diferentes tipos de columnas y luminarias LED. Cada pieza es diseñada en SolidWorks y validada estructuralmente para soportar viento, peso y vibración según normativa nacional e internacional. Entregamos con todos los accesorios de montaje.",
    category: "Alumbrado y Señalización",
    badge: "Doble brazo disponible",
    icon: "💡",
    keywords: [
      "brazos de alumbrado público Paraguay",
      "brazos metálicos para postes",
      "porta luminarias Paraguay",
      "brazos alumbrado LED Asunción",
      "brazo metálico para columna",
    ],
    metaDescription:
      "Brazos de alumbrado público en Paraguay. METSIM fabrica brazos metálicos para postes de luz según norma, en simple y doble brazo, con todos los accesorios de montaje incluidos.",
    specs: [
      { label: "Material", value: "Acero estructural / Aluminio" },
      { label: "Longitud", value: "2m – 3m (personalizable)" },
      { label: "Tipo", value: "Simple brazo / Doble brazo / Ornamental" },
      { label: "Acabado", value: "Galvanizado / Pintura polvo" },
      { label: "Compatibilidad", value: "Luminarias LED, sodio, vapor de mercurio" },
      { label: "Montaje", value: "Incluye pernos y accesorios" },
    ],
    applications: [
      "Alumbrado de calles y avenidas",
      "Alumbrado de rutas nacionales",
      "Parques y plazas públicas",
      "Proyectos MOPC / Municipalidades",
      "Zonas industriales y logísticas",
    ],
    models: [
      { src: "/models/brazo-alumbrado-2m.glb", label: "Brazo 2m" },
      { src: "/models/brazo-alumbrado-3m.glb", label: "Brazo 3m" },
      { src: "/models/petalo-3-hojas.glb", label: "Pétalo 3 Hojas" },
    ],
    modelPoster: null,
  },
  {
    id: "estructuras-metalicas",
    name: "Estructuras Metálicas",
    shortDescription:
      "Diseño y fabricación de estructuras metálicas industriales: galpones, naves industriales, entrepisos metálicos y cobertizos.",
    description:
      "METSIM diseña y fabrica estructuras metálicas para la industria de la construcción en Paraguay. Desde galpones industriales hasta edificios metálicos completos y entrepisos estructurales, cada proyecto incluye cálculo estructural, planos de fabricación y montaje. Trabajamos con acero A36 y A572, con uniones soldadas y bulonadas según norma AISC.",
    category: "Construcción Industrial",
    badge: "Norma AISC",
    icon: "🏭",
    keywords: [
      "estructuras metálicas Paraguay",
      "galpones metálicos Asunción",
      "naves industriales acero",
      "construcción metálica Paraguay",
      "galpones prefabricados Paraguay",
      "entrepiso metálico Paraguay",
    ],
    metaDescription:
      "Estructuras metálicas en Paraguay. METSIM diseña y fabrica galpones, naves industriales, entrepisos y estructuras de acero con cálculo estructural, planos y montaje incluido.",
    specs: [
      { label: "Material", value: "Acero A36 / A572 Gr50" },
      { label: "Norma de diseño", value: "AISC 360 / CIRSOC" },
      { label: "Luz máxima", value: "Hasta 60m sin columnas intermedias" },
      { label: "Altura", value: "Personalizable según proyecto" },
      { label: "Cubierta", value: "Chapa acanalada, sandwich, policarbonato" },
      { label: "Entrega", value: "Incluye planos, fabricación y montaje" },
    ],
    applications: [
      "Galpones industriales y logísticos",
      "Naves de producción y almacenaje",
      "Entrepisos metálicos estructurales",
      "Cobertizos y estacionamientos",
      "Estructuras para agroindustria",
      "Edificios comerciales e institucionales",
    ],
    models: [
      { src: "/models/nave-industrial.glb", label: "Nave Industrial" },
      { src: "/models/estructura-metalica-entrepiso.glb", label: "Entrepiso Metálico" },
    ],
    softwareImage: {
      src: "https://res.cloudinary.com/dk6wclcew/image/upload/v1775394343/metsim/quotes/g0f9ki8ouxpvfg7ygr4z.png",
      alt: "Cálculo estructural con SolidWorks — METSIM Solutions",
    },
    modelPoster: null,
  },
  {
    id: "tanques-metalicos",
    name: "Tanques Metálicos",
    shortDescription:
      "Fabricación de tanques metálicos para almacenamiento de agua, combustibles y líquidos industriales con certificación.",
    description:
      "Diseñamos y fabricamos tanques metálicos a medida para almacenamiento de agua potable, combustibles, aceites y líquidos industriales. Cada tanque es calculado según norma API 650, ASME o requerimiento del cliente, con control de calidad en cada etapa de producción. Disponibles en acero al carbono, inoxidable y con revestimiento interno según el fluido.",
    category: "Almacenamiento Industrial",
    badge: "Norma API 650",
    icon: "🛢️",
    keywords: [
      "tanques metálicos Paraguay",
      "tanques de almacenamiento acero",
      "depósitos metálicos industriales",
      "tanques combustible Paraguay",
      "tanques agua acero inoxidable",
    ],
    metaDescription:
      "Tanques metálicos en Paraguay. METSIM fabrica tanques de almacenamiento de agua, combustibles y líquidos industriales según norma API 650 y ASME, con control de calidad.",
    specs: [
      { label: "Material", value: "Acero al carbono / Inoxidable 304-316" },
      { label: "Norma", value: "API 650 / ASME VIII / EN 13121" },
      { label: "Capacidad", value: "500 litros – 500.000 litros" },
      { label: "Fluidos", value: "Agua, combustibles, aceites, químicos" },
      { label: "Instalación", value: "Aéreo, semienterrado, enterrado" },
      { label: "Acabado", value: "Pintura epoxi / Revestimiento interno" },
    ],
    applications: [
      "Almacenamiento de agua potable e industrial",
      "Depósitos de combustible (nafta, gasoil, GLP)",
      "Reservorios para riego agrícola",
      "Industria alimentaria y farmacéutica",
      "Plantas de tratamiento de agua",
    ],
    models: [],
    modelPoster: null,
  },
  {
    id: "tamiz-rotativo",
    name: "Tamiz Rotativo de Finos",
    shortDescription:
      "Fabricación de tamices rotativos (trommel) para clasificación y separación de materiales finos en industria minera, agrícola y ambiental.",
    description:
      "El tamiz rotativo (trommel) de METSIM es un equipo de clasificación y separación de materiales por tamaño de partícula. Fabricado íntegramente en acero estructural y malla de acero de alta resistencia, ideal para la industria minera, agrícola, de reciclaje y tratamiento de residuos. Diseño modular, fácil mantenimiento y alta eficiencia de separación.",
    category: "Equipamiento Industrial",
    badge: "Diseño modular",
    icon: "⚙️",
    keywords: [
      "tamiz rotativo Paraguay",
      "trommel separación materiales",
      "criba rotatoria Paraguay",
      "tamiz finos industria minera",
      "separador de materiales Paraguay",
    ],
    metaDescription:
      "Tamiz rotativo de finos en Paraguay. METSIM fabrica trommel para clasificación y separación de materiales en industria minera, agrícola y de reciclaje. Alta eficiencia.",
    specs: [
      { label: "Material", value: "Acero estructural + malla de acero" },
      { label: "Diámetro del tambor", value: "500mm – 2000mm" },
      { label: "Longitud", value: "1m – 6m (personalizable)" },
      { label: "Apertura de malla", value: "3mm – 100mm (según material)" },
      { label: "Accionamiento", value: "Motor eléctrico + reductor" },
      { label: "Inclinación", value: "3° – 8° ajustable" },
    ],
    applications: [
      "Clasificación de minerales y áridos",
      "Separación de compost y tierra",
      "Reciclaje de residuos sólidos",
      "Tratamiento de biomasa agrícola",
      "Industria cementera y cerámica",
    ],
    models: [
      { src: "/models/tamiz-rotativo.glb", label: "Tamiz Rotativo" },
    ],
    modelPoster: null,
  },
  {
    id: "soporte-panel-solar",
    name: "Soporte de Panel Solar y Batería",
    shortDescription:
      "Estructuras metálicas para soporte de paneles solares y baterías, diseñadas para instalaciones de iluminación autónoma y sistemas de energía solar.",
    description:
      "METSIM fabrica soportes metálicos estructurales para paneles solares y baterías, utilizados en sistemas de iluminación solar autónoma, telecomunicaciones y generación de energía off-grid. Diseñados con acero galvanizado de alta resistencia y calculados para soportar cargas de viento según normativa local. Compatible con paneles solares de hasta 400W y baterías de ciclo profundo.",
    category: "Energía Solar",
    badge: "Sistema autónomo",
    icon: "☀️",
    keywords: [
      "soporte panel solar Paraguay",
      "estructura panel solar metálica",
      "soporte batería solar Paraguay",
      "iluminación solar Paraguay",
      "energía solar off-grid Paraguay",
    ],
    metaDescription:
      "Soportes metálicos para paneles solares y baterías en Paraguay. METSIM fabrica estructuras galvanizadas para sistemas de iluminación solar autónoma y energía off-grid.",
    specs: [
      { label: "Material", value: "Acero galvanizado en caliente" },
      { label: "Compatibilidad", value: "Paneles hasta 400W / Baterías ciclo profundo" },
      { label: "Acabado", value: "Galvanizado / Pintura anticorrosiva" },
      { label: "Inclinación panel", value: "Ajustable según latitud" },
      { label: "Cálculo", value: "Estructural para carga de viento" },
      { label: "Entrega", value: "Incluye accesorios de montaje" },
    ],
    applications: [
      "Iluminación solar autónoma en rutas",
      "Sistemas de telecomunicaciones off-grid",
      "Alumbrado de zonas rurales sin red eléctrica",
      "Cámaras de seguridad solar",
      "Señalización vial solar",
    ],
    models: [
      { src: "/models/soporte-panel-solar.glb", label: "Soporte Panel Solar" },
    ],
    modelPoster: null,
  },
  {
    id: "flotador-aire-disuelto",
    name: "Flotador por Aire Disuelto (DAF)",
    shortDescription:
      "Sistema DAF para tratamiento de aguas residuales industriales con floculador tubular y mezclador estático integrados.",
    description:
      "El Flotador por Aire Disuelto (DAF) de METSIM es un sistema de tratamiento de aguas residuales industriales que separa sólidos suspendidos, grasas y aceites mediante microburbujas de aire. Fabricado en acero al carbono A36 con recubrimiento en pintura epoxi de alta resistencia química. El sistema integra un floculador tubular y un mezclador estático para optimizar el proceso de coagulación-floculación previo a la flotación. Incluye sistema de tamizado previo en acero inoxidable AISI 304.",
    category: "Tratamiento de Aguas",
    badge: "Sistema integrado DAF",
    icon: "💧",
    keywords: [
      "flotador aire disuelto Paraguay",
      "DAF tratamiento aguas residuales",
      "sistema DAF Paraguay",
      "tratamiento aguas industriales Paraguay",
      "flotación aire disuelto",
      "floculador tubular Paraguay",
    ],
    metaDescription:
      "Sistema Flotador por Aire Disuelto (DAF) en Paraguay. METSIM fabrica equipos DAF para tratamiento de aguas residuales industriales con floculador tubular y mezclador estático integrado.",
    specs: [
      { label: "Material principal", value: "Acero al carbono A36" },
      { label: "Recubrimiento", value: "Pintura epoxi alta resistencia química" },
      { label: "Sistema de bombeo", value: "Bombas sumergibles para aguas residuales" },
      { label: "Sistema de aireación", value: "Compresor de aire disuelto" },
      { label: "Pre-tratamiento", value: "Tamiz en Acero Inoxidable AISI 304, malla 3mm" },
      { label: "Accesorios incluidos", value: "Floculador tubular + Mezclador estático" },
    ],
    applications: [
      "Tratamiento de efluentes industriales",
      "Plantas de tratamiento de agua potable",
      "Industria alimentaria y frigorífica",
      "Industria textil y papelera",
      "Efluentes con alta carga de grasas y aceites",
    ],
    models: [
      { src: "/models/daf-5m3h.glb", label: "Vista Isométrica", staticView: true, cameraOrbit: "25deg 68deg auto" },
      { src: "/models/daf-5m3h.glb", label: "Vista Superior",   staticView: true, cameraOrbit: "0deg 8deg auto" },
    ],
    images: [
      { src: "/images/daf/DAF-0.jpg", label: "DAF 5 m³/h — METSIM Solutions" },
      { src: "/images/daf/DAF-1.jpg", label: "DAF — Sistema completo instalado" },
      { src: "/images/daf/DAF-2.jpg", label: "DAF — Vista lateral" },
      { src: "/images/daf/DAF-3.jpg", label: "DAF — Detalle de construcción" },
      { src: "/images/daf/DAF-4.jpg", label: "DAF — Montaje en planta" },
      { src: "/images/daf/DAF-5.jpg", label: "DAF — Instalación completa" },
    ],
    pdfSrc: "/docs/DAF-Layout5.pdf",
    modelPoster: null,
  },
  {
    id: "floculador-tubular",
    name: "Floculador Tubular",
    shortDescription:
      "Reactor de floculación de flujo forzado para tratamiento de agua potable e industrial. Sin partes móviles, 3 puntos de inyección integrados. Fabricación e instalación a nivel nacional según requerimientos del cliente.",
    description:
      "El Floculador Tubular METSIM es un reactor de flujo forzado que homogeneiza y dosifica productos químicos —coagulantes, floculantes, reguladores de pH, oxidantes— directamente en la línea de tratamiento de agua. La energía de mezcla se genera por turbulencias forzadas en los giros, constricciones y ampliaciones de la tubería, sin necesidad de agitadores eléctricos ni partes móviles. Cada unidad integra 3 puntos de inyección para una dosificación química instantánea y precisa. Diseño compacto sin zonas muertas ni retromezclado, con excelentes propiedades de crecimiento uniforme del flóculo. Fabricamos e instalamos en todo el territorio nacional, desde modelos DN63 hasta DN250, adaptados al caudal y requerimientos específicos de cada proyecto. Tiempo de respuesta y cotización en 24 horas.",
    category: "Tratamiento de Aguas",
    badge: "Sin partes móviles",
    icon: "🌀",
    keywords: [
      "floculador tubular Paraguay",
      "floculación agua potable Paraguay",
      "reactor floculación hidráulica",
      "equipo tratamiento agua Paraguay",
      "floculador PVC acero inoxidable",
      "planta potabilizadora Paraguay",
    ],
    metaDescription:
      "Floculador tubular en Paraguay. METSIM fabrica e instala reactores de floculación de flujo forzado para agua potable e industrial, desde DN63 hasta DN250, sin partes móviles. Cotizá en 24 horas.",
    specs: [
      { label: "Material tubería", value: "PVC PN10 resistente a químicos" },
      { label: "Estructura soporte", value: "Galvanizado o acero inoxidable (según modelo)" },
      { label: "Puntos de inyección", value: "3 integrados por unidad" },
      { label: "Pérdida de presión", value: "< 0,2 bar" },
      { label: "Partes móviles", value: "Ninguna — mantenimiento mínimo" },
      { label: "Modelos METSIM", value: "DN63 (8–12 m³/h) a DN250 (180–250 m³/h)" },
      { label: "Dimensiones", value: "Largo aprox. 3.200–4.000 mm (según modelo)" },
      { label: "Fabricación", value: "A medida según caudal del proyecto" },
    ],
    applications: [
      "Plantas de agua potable",
      "Aguas industriales y efluentes",
      "Pre-tratamiento para flotadores DAF",
      "Pre-tratamiento para decantadores",
      "Rotura de emulsiones por coagulación",
      "Dosificación de oxidantes y desinfectantes",
    ],
    models: [],
    images: [
      { src: "/images/floculadores/floculador-tubular-1.jpeg", label: "Floculador Tubular — METSIM Solutions" },
      { src: "/images/floculadores/floculador-tubular-2.jpeg", label: "Floculador Tubular — detalle de construcción" },
      { src: "/images/floculadores/floculador-tubular-3.jpeg", label: "Floculador Tubular — montaje en planta" },
      { src: "/images/floculadores/floculador-tubular-4.jpeg", label: "Floculador Tubular — instalación completa" },
    ],
    modelPoster: null,
  },
  {
    id: "mezclador-estatico",
    name: "Mezclador Estático",
    shortDescription:
      "Mezcladores estáticos inline con elementos helicoidales para mezcla radial y axial de reactivos químicos en tuberías. Sin partes móviles, cero consumo eléctrico. Fabricación e instalación a nivel nacional.",
    description:
      "El Mezclador Estático METSIM es un dispositivo inline que genera mezcla continua y homogénea de fluidos mediante láminas guía helicoidales estacionarias. El fluido es cortado y forzado contra las paredes opuestas de la tubería, creando vórtices alternados de rotación inversa que garantizan una mezcla radial y axial completa con baja caída de presión. Sin partes móviles, sin consumo eléctrico —la energía de mezcla proviene únicamente del fluido bombeado. Disponible con elemento fijo o desmontable según la aplicación. Fabricamos e instalamos en todo el territorio nacional en diámetros desde 3/4\" hasta 6\" (DN20 a DN150), en cuerpo de acero inoxidable AISI 304 o PVC sch80, con conexiones bridadas o roscadas. Cotización en 24 horas.",
    category: "Tratamiento de Aguas",
    badge: "Cero consumo eléctrico",
    icon: "🔄",
    keywords: [
      "mezclador estático Paraguay",
      "mezclador inline acero inoxidable",
      "dosificación química agua Paraguay",
      "mezclador estático tratamiento agua",
      "mezcla reactivos sin partes moviles",
      "mezclador tubería Paraguay",
    ],
    metaDescription:
      "Mezcladores estáticos en Paraguay. METSIM fabrica e instala mezcladores inline en acero inoxidable AISI 304 o PVC para dosificación de reactivos, cloración y control de pH. Sin partes móviles.",
    specs: [
      { label: "Material cuerpo", value: "Acero inoxidable AISI 304 / PVC sch80" },
      { label: "Material elementos", value: "Acero inoxidable AISI 304" },
      { label: "Diámetros disponibles", value: "3/4\" a 6\" (DN20 a DN150)" },
      { label: "Cantidad de elementos", value: "6 elementos mezcladores por unidad" },
      { label: "Conexión", value: "Bridada / Roscada (según diámetro)" },
      { label: "Caudal referencial", value: "4–9 g/min (3/4\") hasta 260–580 g/min (6\")" },
      { label: "Partes móviles", value: "Ninguna — virtualmente libre de mantenimiento" },
      { label: "Elemento desmontable", value: "Disponible según requerimiento" },
    ],
    applications: [
      "Dosificación de coagulantes y floculantes",
      "Cloración y ozonización en línea",
      "Dilución de polímeros y aditivos",
      "Control y corrección de pH",
      "Pre-mezcla para sistemas DAF",
      "Industria química, alimentaria y farmacéutica",
    ],
    models: [
      { src: "/models/mezclador-estatico.glb", label: "Vista 3D" },
    ],
    images: [
      { src: "/images/mezcladores/mezclador-estatico-1.jpeg", label: "Mezclador Estático — METSIM Solutions" },
      { src: "/images/mezcladores/mezclador-estatico-2.jpeg", label: "Mezclador Estático — detalle constructivo" },
      { src: "/images/mezcladores/mezclador-estatico-3.jpeg", label: "Mezclador Estático — fabricación en planta" },
    ],
    modelPoster: null,
  },
];

export const getProductBySlug = (slug) =>
  products.find((p) => p.id === slug) || null;
