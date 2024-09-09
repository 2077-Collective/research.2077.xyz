import fs from 'fs/promises'

interface Article {
    id: string
    categories: {
        id: string
        name: string
    }[]
    title: string
    summary: string
    slug: string
    thumb: string
}

interface DynamicPage {
    url: string
}

(async() => {
    console.log('Generating sitemap.xml')

    const dynamicPages = await fetchDynamicPages()
    const sitemap = generateSitemap(dynamicPages)
    await fs.writeFile('public/sitemap.xml', sitemap)
})()

function generateSitemap(pages: DynamicPage[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://research.2077.xyz</loc>
      </url>
      ${pages
          .map(
              (page) => `
        <url>
          <loc>${page.url}</loc>
        </url>
      `,
          )
          .join('')}
    </urlset>`
}

async function fetchDynamicPages(): Promise<DynamicPage[]> {
    const response = await fetch('https://cms.2077.xyz/api/articles')
    const articles = (await response.clone().json()) as Article[]

    return articles.map((article) => ({
        url: `https://research.2077.xyz/${article.slug}`,
    }))
}
