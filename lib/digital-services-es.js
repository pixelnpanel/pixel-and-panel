export const digitalSlugMap = {
  "web-development": "desarrollo-web",
  "local-seo": "seo-local",
  "google-business-profile": "perfil-de-google",
  "crm-automation": "automatizacion-crm",
  "qr-code-campaigns": "campanas-con-qr",
};

export const digitalSlugMapReverse = Object.fromEntries(
  Object.entries(digitalSlugMap).map(([en, es]) => [es, en]),
);

export const digitalServicesEs = [
  {
    slug: "desarrollo-web",
    enSlug: "web-development",
    name: "Diseño Web y SEO Local",
    title: "Diseño Web y SEO Local | Pixel & Panel",
    description:
      "Sitios web rápidos y claros para negocios locales que necesitan aparecer en Google, explicar servicios y convertir visitas en llamadas o cotizaciones.",
    h1: "Diseño web para búsqueda local y generación de leads",
    intro:
      "Tu sitio web es la vitrina digital de tu negocio. Pixel & Panel crea sitios rápidos, seguros y fáciles de entender que explican tus servicios, apoyan el SEO local y hacen simple que un cliente llame, visite o pida una cotización.",
    helps: [
      "Ayudar a clientes locales a entender tus servicios",
      "Convertir visitas desde celular en llamadas o cotizaciones",
      "Conectar tu sitio web con Google, letreros, impresos y códigos QR",
    ],
    includes: [
      "Arquitectura móvil primero",
      "Páginas de servicios y ubicaciones principales",
      "Formularios de contacto y cotización",
      "Metadatos y encabezados para SEO local",
      "Sitemap listo para Google",
    ],
    bestFor: [
      "Negocios nuevos que necesitan una base profesional",
      "Contratistas y servicios locales que dependen de cotizaciones",
      "Restaurantes, tiendas y negocios que necesitan generar confianza rápido",
    ],
    how:
      "Pixel & Panel crea sitios enfocados en estructura para búsqueda local, velocidad móvil, texto claro y rutas de contacto que tienen sentido para clientes locales.",
    faqs: [
      ["¿Necesito un sitio web si ya tengo Perfil de Google?", "Sí. El Perfil de Google ayuda a que te encuentren, pero el sitio explica tus servicios, muestra confianza y permite pedir cotización con más detalle."],
      ["¿El sitio funciona bien en celular?", "Sí. El diseño móvil es prioridad porque muchos clientes locales buscan, comparan y llaman desde el teléfono."],
      ["¿El sitio puede conectarse con códigos QR?", "Sí. Podemos conectar letreros, flyers, tarjetas, menús y gráficos de vehículos a páginas útiles del sitio."],
    ],
    related: ["seo-local", "perfil-de-google", "campanas-con-qr"],
  },
  {
    slug: "seo-local",
    enSlug: "local-seo",
    name: "SEO Local",
    title: "SEO Local | Pixel & Panel",
    description:
      "SEO local para ayudar a negocios de Beaumont, Nederland, Port Arthur y el sureste de Texas a ser más fáciles de encontrar en Google.",
    h1: "SEO local para que clientes cercanos encuentren tu negocio",
    intro:
      "El SEO local ayuda a que Google entienda qué haces, dónde trabajas y qué páginas deben ver los clientes cuando buscan tus servicios.",
    helps: [
      "Mejorar cómo aparece tu negocio en búsquedas locales",
      "Aclarar servicios y áreas de servicio",
      "Crear enlaces internos que ayuden al cliente a avanzar",
    ],
    includes: [
      "Planeación de palabras clave locales",
      "Mejoras en páginas existentes",
      "Estructura de enlaces internos",
      "Guía para contenido de servicios y áreas",
      "Alineación con Perfil de Google",
    ],
    bestFor: [
      "Contratistas y negocios de servicios",
      "Negocios con buen trabajo pero poca visibilidad",
      "Equipos que atienden Beaumont, Nederland y Port Arthur",
    ],
    how:
      "Pixel & Panel mejora señales locales prácticas: estructura de páginas, textos de servicio, Perfil de Google y enlaces útiles. No prometemos rankings garantizados.",
    faqs: [
      ["¿Cuánto tarda el SEO local?", "Es un trabajo continuo, pero las bases pueden ayudar a Google a entender mejor tu negocio."],
      ["¿El SEO local solo es para sitios web?", "No. Tu sitio, Perfil de Google, citas, reseñas y contenido trabajan juntos."],
      ["¿Garantizan rankings en Google?", "No. Mejoramos la base de visibilidad local, pero nadie debe prometer posiciones exactas."],
    ],
    related: ["perfil-de-google", "desarrollo-web", "campanas-con-qr"],
  },
  {
    slug: "perfil-de-google",
    enSlug: "google-business-profile",
    name: "Perfil de Google",
    title: "Perfil de Google | Pixel & Panel",
    description:
      "Optimización de Perfil de Google para negocios locales que necesitan información más clara antes de recibir llamadas o visitas.",
    h1: "Optimización de Perfil de Google para negocios locales",
    intro:
      "Tu Perfil de Google muchas veces es lo primero que el cliente ve antes de llamar, visitar o pedir una cotización.",
    helps: [
      "Hacer más clara la información principal del negocio",
      "Conectar visitantes del perfil con páginas o formularios útiles",
      "Mejorar lo que clientes ven antes de contactarte",
    ],
    includes: [
      "Revisión de información del perfil",
      "Limpieza de categorías y servicios",
      "Texto para descripción y servicios",
      "Alineación con sitio web y cotización",
      "Guía para publicaciones y actualizaciones",
    ],
    bestFor: [
      "Negocios con datos viejos o incompletos",
      "Tiendas y servicios que dependen de llamadas y visitas",
      "Equipos que necesitan categorías y servicios más claros",
    ],
    how:
      "Pixel & Panel revisa tu perfil desde el punto de vista del cliente y mejora detalles, enlaces, servicios y estructura de actualización.",
    faqs: [
      ["¿Pueden crear un Perfil de Google nuevo?", "Podemos guiar la configuración y optimización para que sea correcto y útil."],
      ["¿Qué debe tener mi Perfil de Google?", "Datos correctos, categorías, fotos, descripción, servicios y enlaces útiles."],
      ["¿El Perfil de Google reemplaza un sitio web?", "No. El perfil ayuda al descubrimiento; el sitio ofrece más detalle y control."],
    ],
    related: ["seo-local", "desarrollo-web", "automatizacion-crm"],
  },
  {
    slug: "automatizacion-crm",
    enSlug: "crm-automation",
    name: "Nunca Pierdas un Lead",
    title: "Nunca Pierdas un Lead | Pixel & Panel",
    description:
      "Herramientas simples de seguimiento para que los negocios locales respondan rápido a cada solicitud o consulta.",
    h1: "Nunca pierdas una solicitud o consulta de cliente",
    intro:
      "Muchos leads se pierden porque el seguimiento tarda o queda regado entre mensajes, correos y formularios.",
    helps: [
      "Organizar solicitudes de cotización y contacto",
      "Reducir seguimientos perdidos",
      "Responder más rápido cuando alguien te contacta",
    ],
    includes: [
      "Planeación de captura de leads",
      "Flujo de solicitud de cotización",
      "Seguimiento simple de solicitudes (nueva, contactada, cotizada, cerrada)",
      "Guía para seguimiento por correo",
      "Respuesta automática cuando alguien te contacta",
    ],
    bestFor: [
      "Negocios que reciben leads de varios lugares",
      "Equipos pequeños que necesitan seguimiento más simple",
      "Dueños que quieren ver detalles claros antes de responder",
    ],
    how:
      "Pixel & Panel ayuda a ordenar el flujo para que los datos del cliente lleguen con contexto y el siguiente paso sea más fácil.",
    faqs: [
      ["¿Necesito un sistema complicado?", "No. Muchos negocios locales necesitan algo simple que capture leads y facilite responder."],
      ["¿Los formularios pueden conectarse al seguimiento?", "Sí. Los formularios pueden estructurarse para revisar y responder más fácil."],
      ["¿Pueden conectarse leads de diferentes canales?", "Sí. Leads de tu sitio web, letreros y otras fuentes pueden enviarse a un mismo lugar."],
    ],
    related: ["campanas-con-qr", "desarrollo-web", "seo-local"],
  },
  {
    slug: "campanas-con-qr",
    enSlug: "qr-code-campaigns",
    name: "Campañas con Códigos QR",
    title: "Campañas con Códigos QR | Pixel & Panel",
    description:
      "Campañas con códigos QR que conectan letreros, banners, volantes, tarjetas y menús con acciones digitales.",
    h1: "Campañas con códigos QR que conectan impresos con resultados",
    intro:
      "Los códigos QR pueden convertir letreros e impresos en herramientas medibles que llevan a menús, llamadas, ofertas o formularios.",
    helps: [
      "Conectar letreros e impresos con páginas útiles",
      "Enviar clientes al siguiente paso correcto",
      "Hacer más útiles banners, menús, tarjetas y volantes",
    ],
    includes: [
      "Planeación de destino QR",
      "Recomendaciones de página destino",
      "Guía de colocación en impresos",
      "Flujos de escanear para llamar o cotizar",
      "Estructura básica de seguimiento",
    ],
    bestFor: [
      "Banners, menús, volantes y tarjetas",
      "Eventos y promociones con una acción clara",
      "Negocios que quieren conectar impresos con formularios o páginas",
    ],
    how:
      "Pixel & Panel planea ubicación, destino y estructura para que el escaneo lleve a algo útil, no solo a una página genérica.",
    faqs: [
      ["¿Todo letrero puede llevar código QR?", "Muchos sí, pero la distancia y ubicación importan."],
      ["¿A dónde debe mandar un código QR?", "A un siguiente paso útil: cotización, menú, oferta, llamada o contacto."],
      ["¿Sirven los QR en materiales impresos?", "Sí. Volantes, tarjetas, pósters, menús y banners pueden conectar a acciones digitales."],
    ],
    related: ["desarrollo-web", "automatizacion-crm", "seo-local"],
  },
];

export function getDigitalServiceEs(slug) {
  return digitalServicesEs.find((service) => service.slug === slug);
}

export function getRelatedDigitalServicesEs(service) {
  return service.related.map((slug) => getDigitalServiceEs(slug)).filter(Boolean);
}
