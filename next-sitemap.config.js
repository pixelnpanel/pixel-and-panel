/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://pixelnpanel.com',
    generateRobotsTxt: true,
    exclude: [
        '/icon.png',
        '/apple-icon.png',
        '/opengraph-image.png',
        '/twitter-image.png',
        '/service-area/*/*',
    ],
    transform: async (config, path) => {
        if (path.match(/\.(png|jpg|jpeg|webp|gif|svg|ico)$/i)) {
            return null
        }

        return {
            loc: path,
            changefreq: path.startsWith('/service-area/') ? 'monthly' : 'weekly',
            priority: path === '/' ? 1.0 : path.startsWith('/service-area/') ? 0.8 : 0.7,
            lastmod: new Date().toISOString(),
        }
    },
    additionalPaths: async (config) => {
        return [await config.transform(config, '/quote-request')]
    },
}
