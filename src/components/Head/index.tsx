import Head from 'next/head'
import { useRouter } from 'next/router'
export default function HeadComponent({ data }: { data?: any }) {
  const { locale } = useRouter()
  const title = data?.title
  const description = data?.description
  const punkgaImage = data?.image || 'https://punkga.me/assets/images/thumb.png'
  const punkgaTitle = title
    ? title
    : locale == 'vn'
    ? 'Đa Vũ Trụ Truyện Tranh Online Cho Mọi Người | Punkga.me'
    : 'Punkga.me | The Manga Multiverse For All'
  const punkgaDescription = description
    ? description
    : locale == 'vn'
    ? 'Đọc truyện tranh online tiếng việt cập nhật chapter mới mỗi tuần tại Punkga.me. Đa dạng thể loại: Hành động, Tragedy, Slice of life, Ecchi, Sci-fi, Adventure,...'
    : 'Read Manga online free, fast updated, officially licensed with high-quality translated chapters. Start reading now!'
  return (
    <Head>
      <title key='title'>{punkgaTitle}</title>
      <meta name='description' key='description' content={punkgaDescription}></meta>

      <meta itemProp='name' key='ip:name' content={punkgaTitle}></meta>
      <meta itemProp='description' key='ip:description' content={punkgaDescription}></meta>
      <meta itemProp='image' key='ip:image' content={punkgaImage}></meta>

      <meta property='og:url' key='og:url' content='https://punkga.me'></meta>
      <meta property='og:type' key='og:type' content='website'></meta>
      <meta property='og:title' key='og:title' content={punkgaTitle}></meta>
      <meta property='og:description' key='og:description' content={punkgaDescription}></meta>
      <meta property='og:image' key='og:image' content={punkgaImage}></meta>

      <meta name='twitter:card' key='twitter:card' content='summary_large_image'></meta>
      <meta name='twitter:title' key='twitter:title' content={punkgaTitle}></meta>
      <meta name='twitter:description' key='twitter:description' content={punkgaDescription}></meta>
      <meta name='twitter:image' key='twitter:image' content={punkgaImage}></meta>

      <meta name="zalo-platform-site-verification" content="FlcZSlNaC71_yvXd-8SAVXA5tYR-ymnzDpCs" />
    </Head>
  )
}
