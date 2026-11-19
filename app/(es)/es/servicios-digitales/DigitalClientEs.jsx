'use client'

import { MapPin, Monitor, QrCode, Zap } from 'lucide-react'
import DigitalClient from '../../../(en)/digital/DigitalClient'

const services = [
  {
    icon: Monitor,
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.08)',
    name: 'Desarrollo Web',
    href: '/es/servicios-digitales/desarrollo-web',
    description:
      'Un sitio web rápido, seguro y profesional creado para búsqueda local, confianza y solicitudes de cotización.',
    features: [
      'Diseño personalizado para tu marca',
      'Estructura de SEO local incluida',
      'Funciona claramente en celulares',
      'Pensado para llamadas y cotizaciones',
    ],
  },
  {
    icon: MapPin,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    name: 'Aparece en Google',
    href: '/es/servicios-digitales/seo-local',
    description:
      'Ayuda a clientes cercanos a encontrar tus servicios, zonas de trabajo y opciones de contacto cuando buscan en Google Maps.',
    features: [
      'Configuración y optimización de Perfil de Google',
      'Planeación de palabras clave y servicios locales',
      'Guía para directorios y datos consistentes',
      'Actualizaciones claras y fáciles de entender',
    ],
  },
  {
    icon: Zap,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    name: 'Nunca Pierdas un Lead',
    href: '/es/servicios-digitales/automatizacion-crm',
    description:
      'No dejes solicitudes en el olvido. Configuramos rutas simples para responder mejor a cada cliente potencial.',
    features: [
      'Respuesta automática cuando alguien escribe',
      'Mejor organización de formularios y cotizaciones',
      'Solicitudes abiertas en un solo lugar',
      'Opción de citas o seguimiento',
    ],
  },
  {
    icon: QrCode,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    name: 'Campañas con Códigos QR',
    href: '/es/servicios-digitales/campanas-con-qr',
    description:
      'Agrega códigos QR a letreros, volantes, menús, vehículos o tarjetas para llevar clientes directo a una acción útil.',
    features: [
      'QR para letreros, volantes, menús y tarjetas',
      'Opciones para medir escaneos por campaña',
      'Formularios, menús, ofertas o páginas destino',
      'Conecta impresos con acciones medibles',
    ],
  },
]

const copy = {
  locale: 'es',
  label: 'Servicios Digitales',
  titleStart: 'Sitios web y optimización en Google',
  titleHighlight: 'para convertir búsquedas en clientes.',
  titleStartMobile: 'Aparece en Google',
  titleHighlightMobile: 'y recibe más solicitudes.',
  intro:
    'Desarrollamos páginas web veloces, optimizaciones para Google Maps, SEO local y sistemas simples de respuesta para negocios en Beaumont y el sureste de Texas.',
  learnMore: 'Ver más',
  quoteCta: 'Cotizar',
  quotePath: '/es/solicitar-cotizacion',
  quoteCategory: 'Servicios Digitales',
  bottomTitle: '¿Necesitas sitio web o visibilidad en Google?',
  bottomCopy:
    'Cuéntanos qué vendes, dónde trabajas y qué tipo de clientes necesitas. Recomendaremos un plan práctico para mejorar tu presencia web y posicionamiento local.',
  bottomQuoteHref: '/es/solicitar-cotizacion',
  bottomQuoteCta: 'Solicitar cotización',
  bottomVisibilityHref: '/es/chequeo-gratis-de-visibilidad',
  bottomVisibilityCta: 'Chequeo gratis en Google',
  pricingHref: '/es/precios#website-pricing',
  pricingCta: 'Comparar paquetes web',
  region: 'Atendemos Houston y el sureste de Texas',
  reviewLabel: 'Lee las reseñas de clientes en Google',
  reviewerLabel: 'Cliente de diseño web · Reseña de Google',
  how: 'Cómo funciona',
  step: 'Paso',
  steps: [
    ['Cuéntanos qué necesitas', 'Comparte qué ofreces, dónde trabajas y cómo te gustaría recibir consultas.'],
    ['Revisa la propuesta', 'Confirmamos el alcance y el precio. Podrás revisar el sitio antes de publicarlo.'],
    ['Publica tu sitio', 'Ponemos el sitio en línea y comprobamos los medios de contacto incluidos en tu paquete.'],
  ],
  faq: 'Preguntas frecuentes',
  faqs: [
    ['¿Cuánto cuesta un sitio web?', 'La página de lanzamiento empieza en $299 y el paquete de hasta cinco páginas empieza en $499. Consulta los paquetes para comparar el alcance y los costos opcionales.'],
    ['¿Necesito un sitio si ya tengo un Perfil de Google?', 'El Perfil de Google ayuda a que te encuentren. En tu sitio, los clientes pueden ver tus servicios, revisar ejemplos y pedir una cotización.'],
    ['¿Mi sitio funciona en celulares?', 'Sí. Diseñamos la navegación y las acciones de contacto para que funcionen en teléfonos y pantallas más grandes.'],
    ['¿Cuánto tarda el SEO local?', 'Depende del punto de partida, la competencia y la indexación de Google. Te explicamos qué podemos mejorar y cómo dar seguimiento.'],
    ['¿Garantizan una posición en Google?', 'La posición depende de Google y de la competencia. Podemos mejorar la estructura del sitio y el Perfil de Google según el servicio contratado.'],
    ['¿Puedo conectar mis impresos con el sitio?', 'Sí. Un código QR puede llevar a un menú, una página de servicio o un formulario de cotización.'],
  ],
  explore: 'Explora todos los servicios',
  exploreLinks: [...services.map(({ name, href }) => ({ name, href })), { name: 'Perfil de Google', href: '/es/servicios-digitales/perfil-de-google' }],
  shop: 'Ver letreros e impresos',
  shopHref: '/es/letreros',
}

export default function DigitalClientEs() {
  return <DigitalClient services={services} copy={copy} />
}
