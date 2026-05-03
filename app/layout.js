import './globals.css'

export const metadata = {
  title: 'Pixel & Panel | Phygital Branding Agency — Beaumont, TX',
  description:
    'Pixel & Panel bridges physical signage and digital marketing for Texas businesses. Custom signs with QR tracking, websites, local SEO, and CRM automation. Serving Beaumont, Port Arthur, and Orange TX.',
  metadataBase: new URL('https://pixelnpanel.com'),
  openGraph: {
    title: 'Pixel & Panel — Your Vision. Made Visible.',
    description: 'We put your brand on the street AND on the screen. Custom signage + digital marketing for Texas businesses.',
    url: 'https://pixelnpanel.com',
    siteName: 'Pixel & Panel',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}