import Head from 'next/head'
import { useRouter } from 'next/router'
export default function HeadComponent({ title, description }: { title?: string; description?: string }) {
  const { locale } = useRouter()
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
      <title>{punkgaTitle}</title>
      <meta name='description' content={punkgaDescription}></meta>

      <meta itemProp='name' content={punkgaTitle}></meta>
      <meta itemProp='description' content={punkgaDescription}></meta>
      <meta itemProp='image' content='/assets/images/thumb.png'></meta>

      <meta property='og:url' content={punkgaTitle}></meta>
      <meta property='og:type' content='website'></meta>
      <meta property='og:title' content={punkgaTitle}></meta>
      <meta property='og:description' content={punkgaDescription}></meta>
      <meta property='og:image' content='/assets/images/thumb.png'></meta>

      <meta name='twitter:card' content='summary_large_image'></meta>
      <meta name='twitter:title' content={punkgaTitle}></meta>
      <meta name='twitter:description' content={punkgaDescription}></meta>
      <meta name='twitter:image' content='/assets/images/thumb.png'></meta>
    </Head>
  )
}
