import PortfolioClient from './PortfolioClient'

export const metadata = {
    title: 'Portfolio',
    description:
        'A growing portfolio of signage, print, website, and phygital branding projects by Pixel & Panel.',
    alternates: {
        canonical: '/portfolio',
    },
}

export default function PortfolioPage() {
    return <PortfolioClient />
}
