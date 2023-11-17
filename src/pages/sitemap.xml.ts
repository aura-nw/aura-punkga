function generateSiteMap(data) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://punkga.me/</loc>
      <priority>0.4</priority>
    </url>
    <url>
      <loc>https://punkga.me/vn</loc>
      <priority>0.4</priority>
    </url>
    <url>
      <loc>https://punkga.me/about-us</loc>
      <priority>0.2</priority>
    </url>
    <url>
      <loc>https://punkga.me/vn/about-us</loc>
      <priority>0.2</priority>
    </url>
    <url>
      <loc>https://punkga.me/campaigns</loc>
      <priority>0.2</priority>
    </url>
    <url>
      <loc>https://punkga.me/vn/campaigns</loc>
      <priority>0.2</priority>
    </url>
    <url>
      <loc>https://punkga.me/policy</loc>
      <priority>0.2</priority>
    </url>
    <url>
      <loc>https://punkga.me/vn/policy</loc>
      <priority>0.2</priority>
    </url>
     ${data
       .map((manga) => {
         return [
           `
              <url>
                  <loc>${`https://punkga.me/comic/${manga.slug}`}</loc>
                  <priority>0.1</priority>
              </url>
              <url>
                  <loc>${`https://punkga.me/vn/comic/${manga.slug}`}</loc>
                  <priority>0.1</priority>
              </url>
            `,
           ...manga.chapters.map((chapter) => {
             return `
              <url>
                  <loc>${`https://punkga.me/comic/${manga.slug}/chapter/${chapter.chapter_number}`}</loc>
                  <priority>0.1</priority>
              </url>
              <url>
                  <loc>${`https://punkga.me/vn/comic/${manga.slug}/chapter/${chapter.chapter_number}`}</loc>
                  <priority>0.1</priority>
              </url>
            `
           }),
         ].join('')
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const request = await fetch('https://hasura.punkga.me/api/rest/public/manga')
  const data = await request.json()

  const sitemap = generateSiteMap(data.manga)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
