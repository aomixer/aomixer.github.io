import { queryCollection } from '@nuxt/content/server'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '~/utils/site'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog').order('pubDate', 'DESC').all()

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}${post.path?.endsWith('/') ? post.path : `${post.path}/`}`
      const pubDate = post.pubDate ? new Date(post.pubDate).toUTCString() : ''
      return `
    <item>
      <title>${escapeXml(post.title || '')}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <description>${escapeXml(post.description || '')}</description>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ja</language>${items}
  </channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=UTF-8')
  return xml
})
