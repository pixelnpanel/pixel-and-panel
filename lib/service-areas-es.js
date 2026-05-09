const popularSignage = [
  {
    label: "Banners de Vinilo",
    href: "/es/letreros/banners-de-vinilo",
    description: "Banners para promociones, eventos, cercas, aperturas y mensajes visibles.",
  },
  {
    label: "Letreros para Jardín",
    href: "/es/letreros/letreros-para-jardin",
    description: "Letreros para yarda, eventos, sitios de trabajo y promociones locales.",
  },
  {
    label: "Gráficos para Vehículos",
    href: "/es/letreros/graficos-para-vehiculos",
    description: "Rotulación y gráficos para camionetas, vans, trailers y flotillas.",
  },
  {
    label: "Letreros para Negocios",
    href: "/es/letreros/letreros-para-negocios",
    description: "Letreros para locales, escaparates, oficinas y espacios comerciales.",
  },
  {
    label: "Tarjetas de Presentación",
    href: "/es/letreros/tarjetas-de-presentacion",
    description: "Tarjetas limpias para referidos, citas, contacto y seguimiento.",
  },
];

const popularDigital = [
  {
    label: "Desarrollo Web",
    href: "/es/servicios-digitales/desarrollo-web",
    description: "Sitios web claros, rápidos y enfocados en llamadas y cotizaciones.",
  },
  {
    label: "SEO Local",
    href: "/es/servicios-digitales/seo-local",
    description: "Mejoras para que clientes cercanos entiendan y encuentren tu negocio.",
  },
  {
    label: "Perfil de Google",
    href: "/es/servicios-digitales/perfil-de-google",
    description: "Información más clara para clientes que buscan antes de llamar o visitar.",
  },
  {
    label: "Campañas con QR",
    href: "/es/servicios-digitales/campanas-con-qr",
    description: "Conecta impresos, letreros y menús con acciones digitales útiles.",
  },
];

const services = [
  {
    title: "Sitios web",
    description:
      "Páginas móviles y claras que explican tus servicios y hacen fácil pedir una cotización.",
  },
  {
    title: "SEO local",
    description:
      "Estructura y contenido para que clientes cercanos entiendan mejor qué haces y dónde trabajas.",
  },
  {
    title: "Perfil de Google",
    description:
      "Información, servicios y enlaces más claros para llamadas, visitas y solicitudes.",
  },
  {
    title: "Letreros e impresión",
    description:
      "Banners, tarjetas, gráficos, letreros y materiales impresos para negocios locales.",
  },
  {
    title: "Códigos QR y captura de leads",
    description:
      "Conecta tus letreros, impresos y sitio web con códigos QR que llevan al siguiente paso.",
  },
];

const whyCards = [
  "Sitios web, letreros y códigos QR trabajando juntos",
  "Proceso claro y fácil de entender",
  "Opciones para negocios pequeños y nuevos",
  "Solicitud de cotización sin presión",
];

function buildFaqs(cityName) {
  return [
    [
      `¿Trabajan con negocios en ${cityName}?`,
      `Sí. Pixel & Panel ayuda a negocios en ${cityName}, TX con sitios web, SEO local, letreros, impresión y campañas con códigos QR.`,
    ],
    [
      "¿Pueden ayudar con sitios web y letreros?",
      "Sí. Podemos conectar lo que el cliente ve en Google, en tu sitio web y en tus letreros para que el siguiente paso sea más claro.",
    ],
    [
      "¿Pueden agregar códigos QR a mis materiales impresos?",
      "Sí. Los códigos QR pueden llevar a menús, formularios, páginas de servicio, ofertas, llamadas o información de contacto.",
    ],
    [
      "¿Pueden ayudar con mi Perfil de Google?",
      "Sí. Revisamos información, servicios, enlaces y detalles que ayudan a que el perfil sea más útil para clientes locales.",
    ],
    [
      "¿Cómo solicito una cotización?",
      "Puedes usar el formulario de cotización y compartir qué necesitas, dónde se usará y qué resultado quieres lograr.",
    ],
  ];
}

export const serviceAreasEs = [
  {
    slug: "beaumont-tx",
    enPath: "/service-area/beaumont-tx",
    name: "Beaumont",
    title: "Sitios Web, Letreros y SEO Local en Beaumont, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Beaumont, TX con sitios web, letreros, impresión, SEO local, Perfil de Google y campañas con códigos QR.",
    h1: "Sitios web, letreros y SEO local en Beaumont, TX",
    intro:
      "Pixel & Panel ayuda a negocios en Beaumont, TX a verse más profesionales, aparecer mejor en búsquedas locales y convertir la atención en llamadas, mensajes y solicitudes de cotización.",
    body:
      "En Beaumont, muchos clientes comparan negocios en Google antes de llamar, visitar o pedir una cotización. Una presencia clara en línea y letreros bien pensados ayudan a que tu negocio se vea profesional en más lugares.",
    focus: [
      "Desarrollo web para negocios locales",
      "SEO local y visibilidad en Google",
      "Perfil de Google más claro",
      "Letreros para negocios y escaparates",
      "Banners y gráficos para vehículos",
    ],
    services,
    popularSignage,
    popularDigital,
    whyCards,
    faqs: buildFaqs("Beaumont"),
  },
  {
    slug: "nederland-tx",
    enPath: "/service-area/nederland-tx",
    name: "Nederland",
    title: "Sitios Web, Letreros e Impresión en Nederland, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Nederland, TX con sitios web, tarjetas, volantes, banners, letreros, SEO local y códigos QR.",
    h1: "Sitios web, letreros e impresión en Nederland, TX",
    intro:
      "Pixel & Panel ayuda a negocios en Nederland, TX a crear una presencia más clara con sitios web, materiales impresos, letreros y códigos QR que facilitan que los clientes den el siguiente paso.",
    body:
      "Para negocios pequeños en Nederland, piezas prácticas como tarjetas, volantes, menús, banners y un sitio web claro pueden hacer que los clientes recuerden, contacten y vuelvan más fácil.",
    focus: [
      "Sitios web para negocios pequeños",
      "Tarjetas de presentación y volantes",
      "Letreros para jardín y banners",
      "Menús y materiales impresos",
      "Códigos QR para contacto, menús y ofertas",
    ],
    services,
    popularSignage,
    popularDigital,
    whyCards,
    faqs: buildFaqs("Nederland"),
  },
  {
    slug: "port-arthur-tx",
    enPath: "/service-area/port-arthur-tx",
    name: "Port Arthur",
    title: "Letreros, Sitios Web y SEO Local en Port Arthur, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Port Arthur, TX con gráficos para vehículos, letreros, sitios web, SEO local, impresión y campañas con códigos QR.",
    h1: "Letreros, sitios web y SEO local en Port Arthur, TX",
    intro:
      "Pixel & Panel ayuda a negocios en Port Arthur, TX a mejorar su visibilidad con letreros, gráficos para vehículos, sitios web, SEO local y campañas con códigos QR que conectan el mundo real con el digital.",
    body:
      "Negocios de servicio, contratistas, tiendas y restaurantes en Port Arthur necesitan verse profesionales en la calle y ser fáciles de encontrar en línea cuando el cliente está listo para llamar.",
    focus: [
      "Gráficos para vehículos y flotillas",
      "Letreros de metal y para negocios",
      "Banners para sitios de trabajo y promociones",
      "SEO local para servicios y contratistas",
      "Códigos QR para cotizaciones y contacto",
    ],
    services,
    popularSignage,
    popularDigital,
    whyCards,
    faqs: buildFaqs("Port Arthur"),
  },
];

export function getServiceAreaEs(slug) {
  return serviceAreasEs.find((city) => city.slug === slug);
}
