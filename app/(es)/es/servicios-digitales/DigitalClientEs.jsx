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
      'Un sitio web rápido y profesional creado para aparecer en Google y convertir visitantes en clientes. Móvil primero, claro y fácil de mantener.',
    features: [
      'Diseño personalizado para tu marca',
      'Preparado para búsqueda local en Google',
      'Funciona bien en cualquier dispositivo',
      'Estructura fácil de actualizar',
    ],
  },
  {
    icon: MapPin,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    name: 'Aparece en Google',
    href: '/es/servicios-digitales/seo-local',
    description:
      'Ayuda a clientes cercanos a encontrar tu negocio en Google y Google Maps cuando buscan lo que ofreces.',
    features: [
      'Configuración y optimización de Perfil de Google',
      'Enfoque en lo que tus clientes realmente buscan',
      'Información correcta en Google y directorios',
      'Actualizaciones claras de progreso',
    ],
  },
  {
    icon: Zap,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    name: 'Nunca Pierdas un Lead',
    href: '/es/servicios-digitales/automatizacion-crm',
    description:
      'Cuando alguien pregunta por tus servicios, debe recibir respuesta rápido. Configuramos herramientas simples para ayudarte a responder sin perder solicitudes.',
    features: [
      'Respuesta automática cuando alguien escribe',
      'Seguimiento por texto y correo',
      'Solicitudes abiertas en un solo lugar',
      'Opción de configuración de citas',
    ],
  },
  {
    icon: QrCode,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    name: 'Campañas con Códigos QR',
    href: '/es/servicios-digitales/campanas-con-qr',
    description:
      'Agrega códigos QR a letreros, volantes o tarjetas para llevar clientes directo a tu sitio, menú o formulario de cotización.',
    features: [
      'QR para letreros, volantes y tarjetas',
      'Revisión de cuántas personas escanean',
      'Envía clientes al formulario o sitio correcto',
      'Identifica qué materiales generan respuesta',
    ],
  },
]

const copy = {
  label: 'Servicios Digitales',
  titleStart: 'Haz que te encuentren en línea.',
  titleHighlight: 'Convierte visitantes en clientes.',
  intro:
    'Todo lo que un negocio local necesita para aparecer en Google, verse profesional en línea y facilitar que los clientes te contacten.',
  learnMore: 'Ver más',
  quoteCta: 'Cotizar',
  quotePath: '/es/solicitar-cotizacion',
  quoteCategory: 'Servicios Digitales',
  bottomTitle: '¿No sabes por dónde empezar?',
  bottomCopy:
    'Cuéntanos sobre tu negocio y recomendaremos exactamente lo que necesitas, sin presión y sin palabras complicadas.',
  bottomQuoteHref: '/es/solicitar-cotizacion',
  bottomQuoteCta: 'Consulta gratis',
  bottomVisibilityHref: '/es/chequeo-gratis-de-visibilidad',
  bottomVisibilityCta: 'Chequeo gratis de visibilidad',
}

export default function DigitalClientEs() {
  return <DigitalClient services={services} copy={copy} />
}
