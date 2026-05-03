import './globals.css'

export const metadata = {
  title: {
    default: 'Pixel & Panel | Phygital Branding Agency — Beaumont, TX',
    template: '%s | Pixel & Panel',
  },
  description:
    'Pixel & Panel bridges physical signage and digital marketing for Texas businesses. Custom signs with QR tracking, websites, local SEO, and CRM automation.',
  metadataBase: new URL('https://www.pixelnpanel.com'),
  verification: {
    google: '-wqixEnumXctHrPavJMu9bStE-tlyPyt-MxbFJt5sfk',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}