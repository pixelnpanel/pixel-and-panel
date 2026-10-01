// Run against a running production build or a preview:
// npm run check:seo -- http://localhost:3000
// Reads public pages only; never submits forms or opens customer tracking URLs.
import assert from 'node:assert/strict'
import { SITE_URL } from '../lib/seo.js'

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
const failures = []
const pages = new Map()
const links = new Set()
const decode = (value = '') => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]))
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => attrs(m[0]))
const normalize = (url) => new URL(url, SITE_URL).pathname.replace(/\/$/, '') || '/'
const sameUrl = (a, b) => Boolean(a && b) && new URL(a, SITE_URL).href === new URL(b, SITE_URL).href
const check = (condition, message) => { if (!condition) failures.push(message) }

async function get(path) {
    return fetch(`${base}${path}`, { redirect: 'manual', signal: AbortSignal.timeout(30000) })
}

function visit(node, callback) {
    if (!node || typeof node !== 'object') return
    callback(node)
    Object.values(node).forEach((value) => visit(value, callback))
}

const sitemapResponse = await get('/sitemap.xml')
assert.equal(sitemapResponse.status, 200, 'Sitemap must return HTTP 200')
const xml = await sitemapResponse.text()
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    url: decode(m[1].match(/<loc>(.*?)<\/loc>/)?.[1]),
    alternates: tags(m[1], 'xhtml:link'),
}))
assert(entries.length > 0, 'Sitemap must contain public URLs')
assert.equal(new Set(entries.map((e) => e.url)).size, entries.length, 'Sitemap URLs must be unique')

let next = 0
await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < entries.length) {
        const entry = entries[next++]
        const path = normalize(entry.url)
        try {
            check(new URL(entry.url).origin === SITE_URL && !new URL(entry.url).search, `${path}: noncanonical sitemap URL`)
            const response = await get(path)
            check(response.status === 200, `${path}: HTTP ${response.status}`)
            if (response.status !== 200) continue
            const html = await response.text()
            const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
            const meta = tags(body, 'meta')
            const link = tags(body, 'link')
            const canonical = link.filter((x) => x.rel === 'canonical')
            check(canonical.length === 1 && sameUrl(canonical[0].href, entry.url), `${path}: canonical differs from sitemap`)
            check((body.match(/<h1\b/gi) || []).length === 1, `${path}: expected one H1`)
            check(/<title>[^<]+<\/title>/i.test(body), `${path}: missing title`)
            check(meta.some((x) => x.name === 'description' && x.content?.trim()), `${path}: missing description`)
            check(!meta.some((x) => /^(robots|googlebot)$/.test(x.name) && /noindex/i.test(x.content)), `${path}: sitemap page is noindex`)
            check(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${path}: noindex response header`)
            check(meta.some((x) => x.property === 'og:image' && x.content), `${path}: missing OG image`)
            check(meta.some((x) => x.name === 'twitter:image' && x.content), `${path}: missing Twitter image`)
            const language = tags(body, 'html')[0]?.lang || ''
            check(language.startsWith(path === '/es' || path.startsWith('/es/') ? 'es' : 'en'), `${path}: wrong HTML language`)
            const alternates = link.filter((x) => x.hreflang)
            for (const alternate of entry.alternates) {
                check(alternates.some((x) => x.hreflang === alternate.hreflang && sameUrl(x.href, alternate.href)), `${path}: sitemap and HTML hreflang differ`)
            }
            for (const image of tags(body, 'img')) check('alt' in image, `${path}: image missing alt`)
            const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => JSON.parse(m[1]))
            visit(schemas, (node) => {
                if (node['@type'] === 'BreadcrumbList') {
                    for (const item of node.itemListElement || []) {
                        const url = new URL(item.item, SITE_URL)
                        if (url.origin === SITE_URL) links.add(url.pathname)
                    }
                }
                if (node['@type'] === 'Offer') check(Number(node.price) > 0, `${path}: invalid or zero-priced offer`)
                check(node['@type'] !== 'AggregateOffer', `${path}: variants incorrectly grouped as AggregateOffer`)
            })
            pages.set(path, { alternates, title: body.match(/<title>(.*?)<\/title>/)?.[1] })
            for (const anchor of tags(body, 'a')) {
                if (!anchor.href || /^(mailto:|tel:|javascript:|#)/i.test(anchor.href)) continue
                const url = new URL(anchor.href, SITE_URL)
                if (url.origin === SITE_URL && !/^\/(api|admin|track)\//.test(url.pathname)) links.add(url.pathname)
            }
        } catch (error) { failures.push(`${path}: ${error.message}`) }
    }
}))

for (const [path, page] of pages) {
    for (const alternate of page.alternates) {
        const target = pages.get(normalize(alternate.href))
        check(target?.alternates.some((x) => normalize(x.href) === path), `${path}: nonreciprocal alternate ${alternate.href}`)
    }
}
for (const path of links) {
    if (pages.has(normalize(path)) || /\.(pdf|png|jpg|webp|svg|ico)$/i.test(path)) continue
    try {
        const response = await get(path)
        check(response.status === 200, `${path}: internal link HTTP ${response.status}`)
    } catch (error) { failures.push(`${path}: ${error.message}`) }
}
for (const path of ['/seo-check-missing-page', '/es/seo-check-missing-page']) {
    const response = await get(path)
    check(response.status === 404, `${path}: invalid route must be HTTP 404`)
}
const robots = await (await get('/robots.txt')).text()
check(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots.txt: wrong sitemap')
check(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt: public crawling is blocked')

console.log(JSON.stringify({ checkedPages: pages.size, internalLinks: links.size, failures }, null, 2))
process.exitCode = failures.length ? 1 : 0
