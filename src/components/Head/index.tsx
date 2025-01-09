import Head from 'next/head'
import { useRouter } from 'next/router'
export default function HeadComponent({ data }: { data?: any }) {
  const { locale } = useRouter()
  const title = data?.title
  const description = data?.description
  const punkgaTitle = title
    ? `${title} | Punkga.Me`
    : locale == 'vn'
    ? 'Đa Vũ Trụ Truyện Tranh Online Cho Mọi Người | Punkga.Me'
    : 'Punkga.Me | The Manga Multiverse For All'
  const punkgaDescription = description
    ? description
    : locale == 'vn'
    ? 'Đọc truyện tranh online tiếng việt cập nhật chapter mới mỗi tuần tại Punkga.Me. Đa dạng thể loại: Hành động, Tragedy, Slice of life, Ecchi, Sci-fi, Adventure,...'
    : 'Read Manga online free, fast updated, officially licensed with high-quality translated chapters. Start reading now!'
  const punkgaImage = data?.image || 'https://app.punkga.me/assets/images/thumb.png'
  return (
    <Head>
      <title key='title'>{punkgaTitle}</title>
      <meta name='description' key='description' content={punkgaDescription}></meta>

      <meta itemProp='name' key='ip:name' content={punkgaTitle}></meta>
      <meta itemProp='description' key='ip:description' content={punkgaDescription}></meta>
      <meta itemProp='image' key='ip:image' content={punkgaImage}></meta>

      <meta property='og:type' key='og:type' content='website'></meta>
      <meta property='og:title' key='og:title' content={punkgaTitle}></meta>
      <meta property='og:description' key='og:description' content={punkgaDescription}></meta>
      <meta property='og:image' key='og:image' content={punkgaImage}></meta>

      <meta name='twitter:card' key='twitter:card' content='summary_large_image'></meta>
      <meta name='twitter:title' key='twitter:title' content={punkgaTitle}></meta>
      <meta name='twitter:description' key='twitter:description' content={punkgaDescription}></meta>
      <meta name='twitter:image' key='twitter:image' content={punkgaImage}></meta>

      <meta name='zalo-platform-site-verification' content='FlcZSlNaC71_yvXd-8SAVXA5tYR-ymnzDpCs' />
      <link rel='manifest' href='/manifest.json' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <link rel='apple-touch-icon' href='/logo.png' />
      <link rel='apple-touch-startup-image' href='/logo.png' />
    </Head>
  )
}
