/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://pixelnpanel.com',
    generateRobotsTxt: false,
    exclude: [
        '/icon.png',
        '/apple-icon.png',
        '/opengraph-image.png',
        '/twitter-image.png',
        '/opengraph-image',
        '/twitter-image',
        '/robots.txt',
        '/sitemap.xml',
        '/sitemap-*.xml',
        '/service-area/*/*',
        '/digital/qr-campaigns',
        '/api/*',
        '/_next/*',
    ],
    transform: async (config, path) => {
        if (
            path.includes('?') ||
            path.startsWith('/api/') ||
            path.startsWith('/_next/') ||
            path === '/robots.txt' ||
            path === '/sitemap.xml' ||
            path.match(/^\/sitemap-\d+\.xml$/) ||
            path.match(/\.(png|jpg|jpeg|webp|gif|svg|ico|css|js|woff|woff2|ttf|otf)$/i)
        ) {
            return null
        }

        return {
            loc: path,
            changefreq: path.startsWith('/service-area/') || path.startsWith('/es/area-de-servicio/') ? 'monthly' : 'weekly',
            priority: path === '/' ? 1.0 : path.startsWith('/service-area/') || path.startsWith('/es/area-de-servicio/') ? 0.8 : 0.7,
            lastmod: undefined,
        }
    },
    additionalPaths: async (config) => {
        return [
            await config.transform(config, '/quote-request'),
            await config.transform(config, '/free-visibility-check'),
            await config.transform(config, '/learning-center'),
            await config.transform(config, '/learning-center/how-much-do-yard-signs-cost'),
            await config.transform(config, '/learning-center/what-size-banner-do-i-need'),
            await config.transform(config, '/learning-center/website-checklist-for-new-local-businesses'),
            await config.transform(config, '/learning-center/how-to-show-up-on-google-locally'),
            await config.transform(config, '/learning-center/qr-codes-on-signs-and-print'),
            await config.transform(config, '/learning-center/best-marketing-materials-for-new-local-business'),
            await config.transform(config, '/es'),
            await config.transform(config, '/es/precios'),
            await config.transform(config, '/es/contacto'),
            await config.transform(config, '/es/solicitar-cotizacion'),
            await config.transform(config, '/es/chequeo-gratis-de-visibilidad'),
            await config.transform(config, '/es/portafolio'),
            await config.transform(config, '/es/servicios-digitales'),
            await config.transform(config, '/es/servicios-digitales/desarrollo-web'),
            await config.transform(config, '/es/servicios-digitales/seo-local'),
            await config.transform(config, '/es/servicios-digitales/perfil-de-google'),
            await config.transform(config, '/es/servicios-digitales/automatizacion-crm'),
            await config.transform(config, '/es/servicios-digitales/campanas-con-qr'),
            await config.transform(config, '/es/letreros'),
            await config.transform(config, '/es/letreros/banners-de-vinilo'),
            await config.transform(config, '/es/letreros/letreros-para-jardin'),
            await config.transform(config, '/es/letreros/letreros-inmobiliarios'),
            await config.transform(config, '/es/letreros/graficos-para-vehiculos'),
            await config.transform(config, '/es/letreros/imanes-para-vehiculos'),
            await config.transform(config, '/es/letreros/graficos-para-ventanas'),
            await config.transform(config, '/es/letreros/letreros-para-negocios'),
            await config.transform(config, '/es/letreros/letreros-de-metal'),
            await config.transform(config, '/es/letreros/letreros-de-coroplast'),
            await config.transform(config, '/es/letreros/letreros-tipo-a'),
            await config.transform(config, '/es/letreros/tarjetas-de-presentacion'),
            await config.transform(config, '/es/letreros/volantes'),
            await config.transform(config, '/es/letreros/posters'),
            await config.transform(config, '/es/letreros/menus'),
            await config.transform(config, '/es/area-de-servicio/beaumont-tx'),
            await config.transform(config, '/es/area-de-servicio/nederland-tx'),
            await config.transform(config, '/es/area-de-servicio/port-arthur-tx'),
        ]
    },
}
