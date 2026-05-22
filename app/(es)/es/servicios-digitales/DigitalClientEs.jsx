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
      'Un sitio web rápido y profesional creado para búsqueda local, confianza y solicitudes de cotización. Móvil primero y fácil de usar.',
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
      'Ayuda a clientes cercanos a entender tus servicios, zonas de trabajo y opciones de contacto cuando buscan en Google y Google Maps.',
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
      'Cuando alguien pregunta por tus servicios, el siguiente paso debe ser claro. Configuramos rutas simples para responder mejor a cada solicitud.',
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
  label: 'Servicios Digitales',
  titleStart: 'Sitios web y optimización en Google',
  titleHighlight: 'para convertir búsquedas en clientes.',
  titleStartMobile: 'Aparece en Google',
  titleHighlightMobile: 'y recibe más solicitudes.',
  intro:
    'Creamos sitios web rápidos, bases de SEO local, mejoras de Perfil de Google y herramientas simples de leads para negocios en Beaumont y el sureste de Texas.',
  learnMore: 'Ver más',
  quoteCta: 'Cotizar',
  quotePath: '/es/solicitar-cotizacion',
  quoteCategory: 'Servicios Digitales',
  bottomTitle: '¿Necesitas sitio web o visibilidad en Google?',
  bottomCopy:
    'Cuéntanos qué vendes, dónde trabajas y qué tipo de clientes necesitas. Recomendaremos un siguiente paso práctico sin palabras complicadas.',
  bottomQuoteHref: '/es/solicitar-cotizacion',
  bottomQuoteCta: 'Solicitar cotización',
  bottomVisibilityHref: '/es/chequeo-gratis-de-visibilidad',
  bottomVisibilityCta: 'Chequeo gratis en Google',
}

export default function DigitalClientEs() {
  return <DigitalClient services={services} copy={copy} />
}
