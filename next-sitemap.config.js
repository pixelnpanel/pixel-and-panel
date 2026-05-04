/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.pixelnpanel.com',
    generateRobotsTxt: true,
    exclude: [],
    additionalPaths: async (config) => {
        const cities = ['beaumont-tx', 'port-arthur-tx', 'nederland-tx']
        const services = ['yard-signs', 'vinyl-banners', 'car-magnets', 'metal-signs', 'vehicle-wraps', 'website-design', 'local-seo']
        const paths = []
        cities.forEach(city => {
            services.forEach(service => {
                paths.push({
                    loc: `/service-area/${city}/${service}`,
                    changefreq: 'monthly',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                })
            })
        })
        return paths
    },
}