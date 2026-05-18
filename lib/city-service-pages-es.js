// Spanish city + service landing page data
// Routes: /es/area-de-servicio/[ciudad]/[servicio]

const ciudades = {
  'beaumont-tx': {
    name: 'Beaumont',
    slug: 'beaumont-tx',
    enSlug: 'beaumont-tx',
    region: 'el sureste de Texas',
    calles: 'Calder Avenue, Phelan Boulevard y Dowlen Road',
    tipo: 'contratistas, restaurantes, tiendas locales y negocios de servicio',
    oficina: 'la Oficina de Desarrollo de la Ciudad de Beaumont',
  },
  'nederland-tx': {
    name: 'Nederland',
    slug: 'nederland-tx',
    enSlug: 'nederland-tx',
    region: 'el sureste de Texas',
    calles: 'Nederland Avenue, Boston Avenue y el corredor comercial de Highway 365',
    tipo: 'tiendas locales, contratistas, negocios familiares y proveedores de servicios',
    oficina: 'la Oficina de Obras Públicas de Nederland',
  },
  'port-arthur-tx': {
    name: 'Port Arthur',
    slug: 'port-arthur-tx',
    enSlug: 'port-arthur-tx',
    region: 'el sureste de Texas',
    calles: 'Gulfway Drive, Memorial Boulevard y Jimmy Johnson Boulevard',
    tipo: 'talleres de auto, restaurantes, contratistas y negocios de servicio industrial',
    oficina: 'la Oficina de Desarrollo Comunitario de Port Arthur',
  },
}

const servicios = {
  'graficos-para-vehiculos': {
    name: 'Gráficos para Vehículos',
    slug: 'graficos-para-vehiculos',
    enSlug: 'vehicle-graphics',
    type: 'signage',
    mainHref: '/es/letreros/graficos-para-vehiculos',
    quoteProduct: 'Gráficos para Vehículos',
    quoteCategory: 'Letreros e Impresión',
    pricingNote: 'La rotulación simple (nombre, teléfono, sitio web) generalmente empieza en menos de $300. Las envolturas parciales oscilan entre $500 y $1,200. Las envolturas completas varían según el vehículo — la mayoría de camionetas de servicio caen entre $2,000 y $4,500 instaladas.',
    headline: (city) => `Gráficos para vehículos en ${city.name}, TX`,
    intro: (city) => `Los gráficos para vehículos convierten tu camioneta, van o auto en un anuncio móvil que llega a miles de personas en ${city.name} cada semana. Ya sea que necesites una envoltura completa, gráficos parciales o rotulación sencilla, Pixel & Panel diseña gráficos resistentes al calor y la humedad del sureste de Texas.`,
    localContext: (city) => `En ${city.name}, muchos clientes ven tu vehículo antes de visitar tu sitio web o encontrar tu tarjeta. Los contratistas que trabajan en ${city.calles}, los equipos de servicio que cubren ${city.region} y los repartidores que pasan por toda la ciudad tienen algo en común: el vehículo es la primera impresión. Una camioneta rotulada transmite profesionalismo antes de que toques la puerta. Para ${city.tipo}, los gráficos para vehículos son a menudo la inversión de marketing más rentable disponible — llegan a nuevos clientes potenciales en cada kilómetro, cada día, sin costo recurrente después de la instalación.`,
    benefits: [
      'Publicidad en movimiento sin costo mensual',
      'Transmite profesionalismo desde el primer contacto',
      'Aumenta reconocimiento de marca en tu área de servicio',
      'Dura 5–7 años con vinilo de calidad profesional',
      'Funciona de día y de noche sin mantenimiento activo',
    ],
    cityUses: (city) => [
      `Camionetas de HVAC, plomería y electricistas en ${city.name}`,
      `Flotillas de servicio con múltiples vehículos`,
      `Contratistas que trabajan en vecindarios de ${city.name}`,
      `Negocios de entrega y repartidores locales`,
      `Autos y vans de servicio para ${city.tipo}`,
    ],
    industries: (city) => [
      `Contratistas de construcción y remodelación en ${city.name}`,
      `HVAC, plomería y servicios eléctricos`,
      `Paisajismo y mantenimiento de exteriores`,
      `Servicios de limpieza y mantenimiento`,
      `Restaurantes con servicio a domicilio`,
      `Negocios de transporte y entrega local`,
    ],
    process: [
      ['Cuéntanos de tu vehículo', 'Comparte el tipo de vehículo, año y la cobertura que tienes en mente — envoltura completa, parcial o rotulación sencilla.'],
      ['Diseño y aprobación', 'Preparamos el arte para que lo revises antes de imprimir. Hacemos ajustes hasta que quedes satisfecho.'],
      ['Instalación profesional', 'La instalación toma entre 1 y 3 días según la cobertura. Usamos vinilo de calidad que aguanta el calor de Texas.'],
      ['Entrega lista para trabajar', 'Tu vehículo sale listo. El vinilo necesita 24 horas antes del primer lavado.'],
    ],
    faqs: (city) => [
      [`¿Cuánto cuestan los gráficos para vehículos en ${city.name}?`, `Depende del tamaño del vehículo y la cobertura. La rotulación sencilla (nombre, teléfono, sitio web) generalmente empieza en menos de $300. Las envolturas parciales van de $500 a $1,200. Las envolturas completas varían según el vehículo pero generalmente cuestan entre $2,000 y $4,500 instaladas.`],
      [`¿Cuánto duran los gráficos en el calor de ${city.name}?`, `El vinilo cast de calidad profesional dura 5–7 años incluso en el calor del sureste de Texas. Usamos materiales resistentes a UV y altas temperaturas. Evitar lavadoras a presión directas en los bordes extiende significativamente la vida útil.`],
      [`¿Puedo usar los gráficos en varios vehículos?`, `Sí. Las flotillas son uno de nuestros pedidos más comunes. El costo por vehículo normalmente baja a medida que aumenta la cantidad, y podemos estandarizar el diseño para que toda tu flota luzca uniforme.`],
      [`¿Necesito preparar el vehículo antes de la instalación?`, `Sí. El vehículo debe estar limpio y seco. Si hay oxidación, daños en la pintura o calcomanías viejas, indícalo al solicitar la cotización para que lo incluyamos en el proceso.`],
      [`¿Puedo retirar los gráficos después?`, `Sí. El vinilo de calidad profesional se retira limpiamente sin dañar la pintura original cuando lo hace un instalador con experiencia. Evita herramientas afiladas y usa calor controlado para facilitar el retiro.`],
    ],
    crossSell: {
      label: 'Letreros para tu local',
      description: 'Combina los gráficos de tu vehículo con un letrero de escaparate que refuerce tu marca en todo punto de contacto.',
      href: `/es/area-de-servicio/beaumont-tx/letreros-para-negocios`,
    },
  },

  'letreros-para-negocios': {
    name: 'Letreros para Negocios',
    slug: 'letreros-para-negocios',
    enSlug: 'storefront-signs',
    type: 'signage',
    mainHref: '/es/letreros/letreros-para-negocios',
    quoteProduct: 'Letreros para Negocios',
    quoteCategory: 'Letreros e Impresión',
    pricingNote: 'Los letreros de panel de aluminio compuesto empiezan alrededor de $200–$500. Las letras dimensionales y los gabinetes iluminados varían según el tamaño — la mayoría de los escaparates caen entre $800 y $3,000 instalados. Las letras de canal iluminadas para uso exterior empiezan en $1,500–$5,000 según el tamaño.',
    headline: (city) => `Letreros para negocios en ${city.name}, TX`,
    intro: (city) => `Un letrero de escaparate claro y profesional suele ser la primera impresión que tu negocio causa en los clientes que pasan por ${city.name}. Pixel & Panel diseña y produce letreros legibles desde la calle, resistentes a la intemperie y adaptados a tu marca — desde letras dimensionales hasta paneles iluminados.`,
    localContext: (city) => `Los negocios en ${city.name} compiten por atención a lo largo de ${city.calles} — zonas donde los clientes potenciales pasan frente a decenas de opciones antes de decidir dónde detenerse. Un letrero débil o inexistente no solo afecta la visibilidad; también señala que el negocio no ha invertido lo suficiente en su imagen. Para ${city.tipo}, un letrero exterior profesional es la pieza de marketing más visible que tienes. Funciona las 24 horas, los 7 días de la semana, y a diferencia de los anuncios digitales, nunca se apaga cuando se acaba el presupuesto.`,
    benefits: [
      'Visibilidad constante sin costo mensual después de la instalación',
      'Transmite profesionalismo y establece confianza antes del primer contacto',
      'Aumenta el tráfico de clientes que pasan frente al negocio',
      'Disponible en materiales resistentes al calor y la humedad de Texas',
      'Opciones iluminadas para visibilidad nocturna',
    ],
    cityUses: (city) => [
      `Letreros de escaparate para ${city.tipo} en ${city.name}`,
      `Letras dimensionales para oficinas y consultorios`,
      `Letreros iluminados para negocios con horario nocturno`,
      `Identificación de locales en plazas comerciales`,
      `Señales de entrada y directorio para edificios de oficinas`,
    ],
    industries: (city) => [
      `Restaurantes y negocios de comida en ${city.name}`,
      `Consultorios médicos y dentales`,
      `Tiendas minoristas y boutiques`,
      `Talleres de auto y servicios automotrices`,
      `Salones de belleza y spas`,
      `Oficinas profesionales y despachos`,
    ],
    process: [
      ['Cuéntanos de tu local', 'Comparte el tipo de edificio, restricciones del arrendamiento y qué quieres que los clientes vean desde la calle.'],
      ['Diseño y medidas', 'Preparamos el arte a escala para tu fachada. Revisamos requisitos de permisos si aplica.'],
      ['Fabricación', 'Producimos tu letrero con materiales resistentes al exterior y calificados para el clima de Texas.'],
      ['Instalación', 'Instalamos y verificamos que todo quede seguro y bien alineado antes de irnos.'],
    ],
    faqs: (city) => [
      [`¿Necesito permiso para un letrero en ${city.name}?`, `La mayoría de los letreros exteriores permanentes requieren permiso de ${city.oficina}. Los requisitos varían según tamaño, iluminación y ubicación. Pixel & Panel puede orientarte sobre lo que generalmente se necesita.`],
      [`¿Qué tipo de letrero funciona mejor para mi negocio en ${city.name}?`, `Para la mayoría de los negocios, las letras dimensionales de acrílico o metal o los paneles de aluminio compuesto son las opciones más duraderas y profesionales. Para locales con horario nocturno o alta visibilidad, las letras de canal iluminadas son la mejor opción.`],
      [`¿Cuánto tarda la fabricación e instalación?`, `Los letreros estándar toman 2–3 semanas desde el diseño aprobado hasta la instalación. Los letreros que requieren permiso pueden tardar más dependiendo del tiempo de revisión del municipio.`],
      [`¿Pueden adaptar el letrero al diseño de mi local?`, `Sí. Trabajamos con tu logo y paleta de colores, y podemos hacer muestras físicas de materiales para que apruebes el acabado antes de producir.`],
      [`¿Qué pasa si soy inquilino y no puedo hacer perforaciones?`, `Existen opciones de montaje que minimizan el daño a la fachada, como sistemas de rieles o paneles que se fijan con adhesivo estructural. Indícanos las restricciones de tu arrendamiento y encontramos la mejor solución.`],
    ],
    crossSell: {
      label: 'Gráficos para vehículos',
      description: 'Refuerza tu imagen de marca en la calle con gráficos en tu camioneta o vehículo de trabajo.',
      href: `/es/area-de-servicio/beaumont-tx/graficos-para-vehiculos`,
    },
  },

  'banners-de-vinilo': {
    name: 'Banners de Vinilo',
    slug: 'banners-de-vinilo',
    enSlug: 'vinyl-banners',
    type: 'signage',
    mainHref: '/es/letreros/banners-de-vinilo',
    quoteProduct: 'Banners de Vinilo',
    quoteCategory: 'Letreros e Impresión',
    pricingNote: 'Los banners de vinilo estándar de 2\'×4\' empiezan alrededor de $40–$60. Los tamaños grandes como 4\'×8\' oscilan entre $80 y $150. Los precios varían según el material, la cantidad y la urgencia.',
    headline: (city) => `Banners de vinilo en ${city.name}, TX`,
    intro: (city) => `Los banners de vinilo son una de las formas más rápidas y económicas de promocionar tu negocio en ${city.name} — aperturas, ventas de temporada, eventos o publicidad en sitios de trabajo. Pixel & Panel produce banners legibles a distancia, preparados para exteriores y listos en tan solo 3 días hábiles.`,
    localContext: (city) => `En ${city.name}, los banners son una de las herramientas de marketing a corto plazo más usadas — y también uno de los más desperdiciados. Un banner con demasiado texto, del tamaño equivocado para su ubicación, o con material que se desvanece después de una temporada termina haciendo más daño que bien. Pixel & Panel ayuda a los negocios de ${city.name} a hacerlo bien desde la primera vez: tamaño correcto para la distancia de visualización, mensaje legible con un llamado a la acción claro, y material resistente al calor, la humedad y las tormentas típicas de ${city.region}.`,
    benefits: [
      'Producción rápida — listos en 3–5 días hábiles',
      'Económicos para campañas temporales y eventos',
      'Disponibles en vinilo estándar, malla y tela para diferentes usos',
      'Legibles desde la calle con el diseño correcto',
      'Resistentes al calor, lluvia y humedad del sureste de Texas',
    ],
    cityUses: (city) => [
      `Aperturas y promociones estacionales para negocios en ${city.name}`,
      `Banners para sitios de trabajo y cercas de contratistas`,
      `Eventos de iglesias, escuelas y comunidades locales`,
      `Publicidad en vitrinas y exteriores de locales`,
      `Anuncios de ofertas especiales para restaurantes y tiendas`,
    ],
    industries: (city) => [
      `Restaurantes y negocios de comida en ${city.name}`,
      `Contratistas y empresas de construcción`,
      `Iglesias y organizaciones comunitarias`,
      `Escuelas y academias privadas`,
      `Tiendas minoristas y boutiques`,
      `Eventos deportivos y torneos locales`,
    ],
    process: [
      ['Dinos el uso del banner', 'Comparte tamaño aproximado, dónde lo colocarás y cuánto tiempo estará instalado.'],
      ['Diseño incluido', 'Preparamos el arte basado en tu logo y mensaje. Hacemos ajustes hasta que quedes satisfecho.'],
      ['Impresión y acabado', 'Imprimimos, ribeteamos y colocamos ojales listos para colgar.'],
      ['Listo en 3–5 días', 'Recógelo en nuestro taller o coordina la entrega para tu evento o apertura.'],
    ],
    faqs: (city) => [
      [`¿Qué tamaño de banner necesito para mi negocio en ${city.name}?`, `Depende de la distancia de visualización. Para una vitrina o cerca visible a 9 metros o más, un banner de 3\'×8\' o 4\'×8\' con letras de 8–10 cm funciona bien. Para eventos interiores o visualización cercana, un 2\'×4\' o 2\'×6\' suele ser suficiente.`],
      [`¿Cuánto dura un banner al exterior en el calor de ${city.name}?`, `El vinilo estándar de 13 oz aguanta 1–2 años en exteriores. Para banners en sol directo o uso permanente, recomendamos vinilo pesado de 18 oz. Retirar el banner durante tormentas fuertes extiende significativamente su vida útil.`],
      [`¿Pueden incluir un código QR en el banner?`, `Sí, siempre que el banner esté lo suficientemente cerca para que lo escaneen — generalmente dentro de 3 metros. Para banners a mayor distancia, una URL corta es más fácil de usar que un código QR.`],
      [`¿Hay reglas para colocar banners en ${city.name}?`, `Los banners en propiedad privada (tu edificio, cercas o sitio de trabajo) generalmente están permitidos. Los banners en vía pública, medianas o postes de utilidad normalmente requieren permiso temporal de ${city.oficina}.`],
      [`¿Pueden hacer banners de malla para sitios con viento?`, `Sí. El vinilo de malla tiene perforaciones que reducen la resistencia al viento — ideal para cercas, sitios de construcción y áreas expuestas al viento. Tiene la misma impresión de calidad que el vinilo sólido.`],
    ],
    crossSell: {
      label: 'Letreros para jardín',
      description: 'Complementa tu banner con letreros de jardín para reforzar el mensaje en múltiples puntos de tu área de trabajo.',
      href: `/es/area-de-servicio/beaumont-tx/letreros-para-jardin`,
    },
  },

  'letreros-para-jardin': {
    name: 'Letreros para Jardín',
    slug: 'letreros-para-jardin',
    enSlug: 'yard-signs',
    type: 'signage',
    mainHref: '/es/letreros/letreros-para-jardin',
    quoteProduct: 'Letreros para Jardín',
    quoteCategory: 'Letreros e Impresión',
    pricingNote: 'Los letreros de jardín de 18"×24" empiezan alrededor de $15–$25 por unidad. Los pedidos más grandes (25, 50, 100 unidades) reducen el costo por pieza. Las estacas de alambre están incluidas en el precio estándar.',
    headline: (city) => `Letreros para jardín en ${city.name}, TX`,
    intro: (city) => `Los letreros para jardín son económicos, fáciles de colocar y útiles para negocios que necesitan visibilidad en vecindarios, cerca de sitios de trabajo o alrededor de eventos en ${city.name}. Funcionan mejor cuando el diseño es simple y el llamado a la acción es obvio.`,
    localContext: (city) => `En ${city.name}, los letreros para jardín son especialmente efectivos para contratistas que trabajan en zonas residenciales a lo largo de ${city.calles}. Un letrero bien colocado frente a un trabajo en curso convierte a tus vecinos en clientes potenciales — personas que ya vieron la calidad de tu trabajo y necesitan exactamente ese servicio. Para ${city.tipo}, los letreros de jardín ofrecen el costo por impacto más bajo de cualquier formato impreso.`,
    benefits: [
      'Económicos — sin mínimo de pedido requerido',
      'Ideales para sitios de trabajo, eventos y promociones locales',
      'Fáciles de instalar y reubicar',
      'Disponibles en coroplast estándar o de alta resistencia',
      'Listos en 3–5 días hábiles',
    ],
    cityUses: (city) => [
      `Sitios de trabajo de contratistas en vecindarios de ${city.name}`,
      `Eventos de iglesias, escuelas y organizaciones locales`,
      `Señales direccionales para estacionamientos y entradas`,
      `Promociones locales para tiendas y restaurantes`,
      `Campaña de reconocimiento de marca en zonas clave de ${city.name}`,
    ],
    industries: (city) => [
      `Contratistas de techado, plomería y HVAC en ${city.name}`,
      `Paisajistas y servicios de jardinería`,
      `Iglesias y organizaciones religiosas`,
      `Escuelas y academias privadas`,
      `Agentes de bienes raíces`,
      `Restaurantes y negocios de entrega a domicilio`,
    ],
    process: [
      ['Comparte el mensaje', 'Dinos qué debe decir el letrero: nombre del negocio, servicio principal, teléfono o sitio web.'],
      ['Diseño rápido', 'Preparamos el arte con tu logo. Un letrero de jardín efectivo tiene 5–7 palabras máximo.'],
      ['Impresión en 3–5 días', 'Imprimimos en coroplast resistente a la intemperie con estacas de alambre incluidas.'],
      ['Colócalos donde más te vean', 'Sitios de trabajo activos, entradas de eventos y zonas de alto tráfico peatonal o vehicular.'],
    ],
    faqs: (city) => [
      [`¿Cuántos letreros de jardín debo pedir?`, `Los pedidos comunes son 10, 25, 50 y 100 unidades. El costo por unidad baja con mayor cantidad. Para contratistas que trabajan en múltiples sitios, 25–50 unidades es un punto de inicio práctico.`],
      [`¿Son resistentes al calor y la lluvia de ${city.name}?`, `Sí. El coroplast de 4mm aguanta calor, lluvia y humedad de 6 a 12 meses en exteriores. Para campañas de más de un año, el aluminio es la opción más duradera.`],
      [`¿Debo incluir teléfono o sitio web?`, `Generalmente uno solo, no los dos. El teléfono funciona mejor para servicios donde el cliente quiere llamar de inmediato. Una URL corta funciona cuando quieres que lleguen a una página específica, como un formulario de cotización.`],
      [`¿Puedo reutilizar los letreros en diferentes sitios?`, `Sí. Los letreros de coroplast son livianos y fáciles de mover. Muchos contratistas los rotan entre sitios de trabajo activos durante toda la semana.`],
      [`¿Están disponibles en doble cara?`, `Sí. Los letreros de doble cara son visibles desde ambos sentidos del tráfico — ideal para esquinas y entradas. Cuestan un poco más que los de una sola cara.`],
    ],
    crossSell: {
      label: 'Banners de vinilo',
      description: 'Combina los letreros de jardín con un banner de mayor tamaño para reforzar tu presencia en eventos y aperturas.',
      href: `/es/area-de-servicio/beaumont-tx/banners-de-vinilo`,
    },
  },

  'seo-local': {
    name: 'SEO Local',
    slug: 'seo-local',
    enSlug: 'local-seo',
    type: 'digital',
    mainHref: '/es/servicios-digitales/seo-local',
    quoteProduct: 'SEO Local',
    quoteCategory: 'Servicios Digitales',
    pricingNote: 'El trabajo de SEO local generalmente se cotiza por proyecto o por hora. Un paquete básico de optimización de página y Perfil de Google puede empezar en $400–$800. El trabajo continuo varía según el alcance.',
    headline: (city) => `SEO local en ${city.name}, TX`,
    intro: (city) => `El SEO local ayuda a que tu negocio en ${city.name} aparezca más fácilmente cuando clientes cercanos buscan tus servicios en Google. Pixel & Panel mejora las señales locales de tu sitio web — estructura de páginas, textos de servicio y alineación con tu Perfil de Google — para que Google entienda qué haces y dónde lo haces.`,
    localContext: (city) => `En ${city.name}, la mayoría de los clientes comparan negocios en Google antes de llamar, visitar o pedir una cotización. Si tu negocio no aparece en los primeros resultados para términos como "plomero en ${city.name}" o "restaurante cerca de mí", estás perdiendo clientes frente a competidores mejor posicionados. Para ${city.tipo}, mejorar la visibilidad en búsquedas locales a menudo genera un impacto más directo en llamadas y cotizaciones que cualquier otra inversión de marketing.`,
    benefits: [
      'Más visibilidad cuando clientes buscan tus servicios en Google',
      'Mayor tráfico orgánico sin pagar por anuncios',
      'Señales locales más claras para Google Maps y búsquedas de área',
      'Mejora continua que se acumula con el tiempo',
      'Alineación entre sitio web y Perfil de Google',
    ],
    cityUses: (city) => [
      `Contratistas que quieren aparecer en búsquedas de ${city.name}`,
      `Restaurantes que buscan más clientes cercanos`,
      `Negocios de servicio que atienden múltiples zonas de ${city.region}`,
      `Tiendas locales que compiten con cadenas nacionales`,
      `Consultorios médicos y profesionales en ${city.name}`,
    ],
    industries: (city) => [
      `Contratistas de construcción y servicios en el hogar`,
      `Restaurantes y negocios de comida en ${city.name}`,
      `Consultorios médicos y dentales`,
      `Talleres de auto y servicios automotrices`,
      `Agencias inmobiliarias y constructoras`,
      `Servicios profesionales y despachos`,
    ],
    process: [
      ['Auditoría de visibilidad actual', 'Revisamos cómo aparece tu negocio hoy en Google y qué términos de búsqueda son prioritarios para tu mercado.'],
      ['Mejoras en el sitio web', 'Actualizamos textos de servicio, estructura de páginas y metadatos con enfoque en búsquedas locales.'],
      ['Alineación con Perfil de Google', 'Sincronizamos la información del sitio con tu Perfil de Google para reforzar las señales locales.'],
      ['Seguimiento y ajuste', 'Monitoreamos resultados y ajustamos la estrategia según cómo responde Google a los cambios.'],
    ],
    faqs: (city) => [
      [`¿Cuánto tiempo tarda el SEO local en dar resultados en ${city.name}?`, `Es un proceso continuo. Algunas mejoras básicas pueden ayudar a Google a entender mejor tu negocio en semanas, pero el impacto en rankings generalmente se ve en 3–6 meses. No prometemos rankings garantizados — la transparencia sobre esto es parte de cómo trabajamos.`],
      [`¿El SEO local es diferente del SEO general?`, `Sí. El SEO local se enfoca en que aparezcas para búsquedas con intención geográfica — "servicio cerca de mí", "en ${city.name}", "en el sureste de Texas". Involucra señales locales específicas como tu Perfil de Google, menciones locales y páginas de área de servicio.`],
      [`¿Necesito un sitio web para hacer SEO local?`, `Un sitio web bien estructurado hace que el SEO local sea más efectivo. Sin sitio, el Perfil de Google puede hacer trabajo, pero hay un límite en cuánto puede comunicar. Un sitio con páginas de servicio claras le da a Google más señales para mostrar tu negocio.`],
      [`¿Puede Pixel & Panel manejar mi SEO si ya tengo un sitio web?`, `Sí. Trabajamos con sitios existentes — revisamos lo que ya tienes, identificamos qué mejorar y hacemos los cambios sin afectar lo que ya funciona.`],
      [`¿Qué diferencia hay entre SEO local y pagar por anuncios de Google?`, `Los anuncios de Google generan tráfico inmediato pero dejan de funcionar cuando dejas de pagar. El SEO local construye visibilidad orgánica que se mantiene y se acumula con el tiempo. Muchos negocios usan ambos — anuncios para resultados inmediatos y SEO para crecimiento a largo plazo.`],
    ],
    crossSell: {
      label: 'Perfil de Google',
      description: 'El SEO local y el Perfil de Google trabajan juntos. Un perfil completo refuerza todo el trabajo de posicionamiento.',
      href: `/es/area-de-servicio/beaumont-tx/perfil-de-google`,
    },
  },

  'desarrollo-web': {
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    enSlug: 'web-development',
    type: 'digital',
    mainHref: '/es/servicios-digitales/desarrollo-web',
    quoteProduct: 'Desarrollo Web',
    quoteCategory: 'Servicios Digitales',
    pricingNote: 'Los sitios web para negocios locales generalmente empiezan en $299–$499 para páginas de una sola página. Los sitios completos con múltiples páginas de servicio oscilan entre $799 y $999. Los precios varían según el alcance y las funciones requeridas.',
    headline: (city) => `Desarrollo web para negocios en ${city.name}, TX`,
    intro: (city) => `Un buen sitio web para tu negocio en ${city.name} debe explicar lo que haces, verse profesional en celular y hacer fácil que un cliente llame, escriba o pida una cotización. Pixel & Panel construye sitios enfocados en conversiones — no en ganar premios de diseño.`,
    localContext: (city) => `En ${city.name}, la mayoría de los clientes revisan el sitio web de un negocio antes de llamar o visitar. Un sitio lento, desactualizado o difícil de navegar en celular envía a los clientes directamente a tu competencia. Para ${city.tipo}, un sitio web claro y rápido que cargue bien en teléfono y facilite el contacto puede ser la diferencia entre una llamada y un clic de vuelta al buscador.`,
    benefits: [
      'Diseño móvil primero — la mayoría de tus clientes navegan desde el teléfono',
      'Páginas claras de servicios que responden las preguntas antes de la llamada',
      'Formulario de cotización integrado para capturar prospectos',
      'Velocidad de carga optimizada para móvil',
      'Configuración básica de SEO local incluida',
    ],
    cityUses: (city) => [
      `Negocios nuevos en ${city.name} que necesitan una base profesional`,
      `Contratistas y servicios locales que necesitan más solicitudes`,
      `Restaurantes que quieren un menú y formulario de contacto en línea`,
      `Tiendas locales que compiten con opciones en línea`,
      `Profesionales y consultores en ${city.name}`,
    ],
    industries: (city) => [
      `Contratistas y servicios en el hogar en ${city.name}`,
      `Restaurantes y negocios de comida`,
      `Consultorios médicos y dentales`,
      `Servicios profesionales y despachos`,
      `Tiendas minoristas y boutiques`,
      `Academias y centros de educación`,
    ],
    process: [
      ['Cuéntanos de tu negocio', 'Comparte qué servicios ofreces, quién es tu cliente típico y qué quieres que haga el visitante en tu sitio.'],
      ['Estructura y diseño', 'Diseñamos páginas claras con jerarquía móvil — los primeros 3 segundos son los que cuentan.'],
      ['Revisión y ajustes', 'Te mostramos el sitio antes de publicarlo. Hacemos cambios hasta que quedes satisfecho.'],
      ['Publicación y configuración SEO', 'Publicamos el sitio con metadatos locales configurados y te entregamos acceso completo.'],
    ],
    faqs: (city) => [
      [`¿Cuánto tiempo tarda crear un sitio web para mi negocio en ${city.name}?`, `Un sitio de una página puede estar listo en 1–2 semanas. Un sitio con múltiples páginas de servicio generalmente toma 3–4 semanas desde la aprobación del diseño hasta la publicación.`],
      [`¿El sitio funciona bien en celular?`, `Sí. El diseño móvil es prioridad porque la mayoría de los clientes locales buscan y llaman desde el teléfono. Verificamos la velocidad y usabilidad en dispositivos móviles antes de publicar.`],
      [`¿Pueden trabajar con mi dominio y hosting existente?`, `Generalmente sí. Dinos dónde está alojado tu sitio actual y lo evaluamos. En muchos casos podemos trabajar con tu proveedor existente o recomendarte uno más adecuado.`],
      [`¿El sitio puede conectarse con códigos QR y letreros?`, `Sí. Podemos conectar tus letreros, flyers, tarjetas y banners con páginas específicas de tu sitio a través de códigos QR y URLs cortas.`],
      [`¿Necesito contratar a alguien para mantener el sitio después?`, `Depende del tipo de sitio. Los sitios más simples son fáciles de actualizar por tu cuenta con una guía. Para sitios más complejos, ofrecemos mantenimiento básico como parte de nuestros servicios.`],
    ],
    crossSell: {
      label: 'SEO local',
      description: 'Un sitio web bien hecho es la base — el SEO local ayuda a que los clientes lo encuentren en Google.',
      href: `/es/area-de-servicio/beaumont-tx/seo-local`,
    },
  },

  'perfil-de-google': {
    name: 'Perfil de Google',
    slug: 'perfil-de-google',
    enSlug: 'google-business-profile',
    type: 'digital',
    mainHref: '/es/servicios-digitales/perfil-de-google',
    quoteProduct: 'Perfil de Google',
    quoteCategory: 'Servicios Digitales',
    pricingNote: 'La configuración y optimización del Perfil de Google generalmente empieza en $200–$400. El trabajo de mantenimiento mensual varía según el alcance. La plataforma de Google en sí es gratuita para los negocios.',
    headline: (city) => `Perfil de Google para negocios en ${city.name}, TX`,
    intro: (city) => `Tu Perfil de Google es lo primero que los clientes ven cuando buscan tu negocio en ${city.name}. Un perfil completo y actualizado — con horarios correctos, fotos, servicios, reseñas y respuestas — puede ser la diferencia entre una llamada y un clic de vuelta al buscador.`,
    localContext: (city) => `En ${city.name}, la mayoría de las búsquedas de servicios locales muestran el Perfil de Google del negocio antes de su sitio web. Para ${city.tipo}, un perfil incompleto o desactualizado puede hacer que un cliente potencial elija a un competidor con información más clara — incluso si ofreces mejor servicio. El Perfil de Google también es la fuente de reseñas locales, y los negocios con más reseñas positivas aparecen más arriba en Google Maps.`,
    benefits: [
      'Mayor visibilidad en Google Maps y búsquedas locales',
      'Información correcta y completa que da confianza al cliente',
      'Más llamadas directas desde el panel de resultados de Google',
      'Plataforma de reseñas que refuerza la credibilidad',
      'Fotos y actualizaciones que muestran que el negocio está activo',
    ],
    cityUses: (city) => [
      `Negocios nuevos en ${city.name} que necesitan establecer presencia en Google`,
      `Negocios con perfil desactualizado o con información incorrecta`,
      `Contratistas y servicios que quieren aparecer en Google Maps`,
      `Restaurantes que necesitan horarios, menú y fotos actualizados`,
      `Negocios que quieren solicitar y gestionar reseñas de clientes`,
    ],
    industries: (city) => [
      `Contratistas y servicios en el hogar en ${city.name}`,
      `Restaurantes y negocios de comida`,
      `Consultorios médicos y dentales`,
      `Talleres de auto y servicios automotrices`,
      `Tiendas minoristas y boutiques`,
      `Servicios profesionales y despachos`,
    ],
    process: [
      ['Auditoría del perfil actual', 'Revisamos tu Perfil de Google actual, identificamos información incorrecta o faltante y documentamos oportunidades de mejora.'],
      ['Actualización completa', 'Actualizamos nombre, dirección, teléfono, horarios, categorías, descripción, servicios y atributos.'],
      ['Fotos y contenido', 'Te guiamos para agregar fotos de calidad de tu negocio, equipo y trabajo. Las fotos aumentan la confianza del cliente.'],
      ['Estrategia de reseñas', 'Te explicamos cómo solicitar reseñas a clientes satisfechos de forma natural y cómo responder a las reseñas existentes.'],
    ],
    faqs: (city) => [
      [`¿Qué tan importante es el Perfil de Google para un negocio en ${city.name}?`, `Muy importante. La mayoría de los clientes revisan el Perfil de Google antes de llamar o visitar. Un perfil con información correcta, fotos y reseñas genera más confianza y más contactos directos que un perfil vacío o desactualizado.`],
      [`¿El Perfil de Google es gratis?`, `Sí, la plataforma de Google es gratuita para los negocios. Pixel & Panel cobra por el trabajo de configuración, optimización y mantenimiento — no por el acceso a la plataforma.`],
      [`¿Cuántas reseñas necesito para que mi perfil sea efectivo?`, `No hay un número mágico, pero los negocios con 10 o más reseñas y una calificación de 4.0 o más generalmente generan más confianza. Más importante que la cantidad es responder a todas las reseñas, positivas y negativas.`],
      [`¿Pueden ayudarme si alguien escribió una reseña negativa falsa?`, `Sí. Te explicamos el proceso para reportar y solicitar la eliminación de reseñas que violan las políticas de Google. También te ayudamos a redactar una respuesta profesional que muestre a los clientes potenciales cómo manejas los comentarios.`],
      [`¿El Perfil de Google me ayuda a aparecer en Google Maps?`, `Sí. El Perfil de Google es la principal fuente de información para Google Maps. Un perfil completo y activo mejora tu posición en el paquete local de Google Maps para búsquedas relacionadas con tu negocio en ${city.name}.`],
    ],
    crossSell: {
      label: 'SEO local',
      description: 'El Perfil de Google y el SEO local trabajan juntos para maximizar tu visibilidad en búsquedas de tu área.',
      href: `/es/area-de-servicio/beaumont-tx/seo-local`,
    },
  },
}

// Build static params: all 3 cities × 7 services = 21 pages
export const cityServiceStaticParamsEs = Object.keys(ciudades).flatMap((ciudadSlug) =>
  Object.keys(servicios).map((servicioSlug) => ({
    ciudad: ciudadSlug,
    servicio: servicioSlug,
  }))
)

export function getCityServiceDataEs(ciudadSlug, servicioSlug) {
  const city = ciudades[ciudadSlug]
  const service = servicios[servicioSlug]
  if (!city || !service) return null
  return { city, service }
}

export function getSpanishCityServicePath(enCitySlug, enServiceSlug) {
  const city = Object.values(ciudades).find((item) => item.enSlug === enCitySlug)
  const service = Object.values(servicios).find((item) => item.enSlug === enServiceSlug)

  if (!city || !service) return null

  return `/es/area-de-servicio/${city.slug}/${service.slug}`
}
