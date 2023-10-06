import Head from 'next/head'
import { useRouter } from 'next/router'
export default function HeadComponent({ data }: { data?: any }) {
  const { locale } = useRouter()
  const title = data?.title
  const description = data?.description
  const punkgaImage = data.image || 'https://punkga.me/assets/images/thumb.png'
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
      <meta itemProp='image' content={punkgaImage}></meta>

      <meta property='og:url' content={punkgaTitle}></meta>
      <meta property='og:type' content='website'></meta>
      <meta property='og:title' content={punkgaTitle}></meta>
      <meta property='og:description' content={punkgaDescription}></meta>
      <meta property='og:image' content={punkgaImage}></meta>

      <meta name='twitter:card' content='summary_large_image'></meta>
      <meta name='twitter:title' content={punkgaTitle}></meta>
      <meta name='twitter:description' content={punkgaDescription}></meta>
      <meta name='twitter:image' content={punkgaImage}></meta>
    </Head>
  )
}
export const getServerSideProps = async ({ params, locale }) => {
  if (params?.comicSlug) {
    const res = await fetch(`https://api.staging.punkga.me/manga/${params?.comicSlug}`)
    const data = await res.json()
    const manga = data?.data?.manga?.[0]
    const props = {
      image: manga.poster,
      title: '',
      description: '',
    }
    if (locale == 'en') {
      const mangaLanguages =
        data.manga_languages.find((ml) => ml.language_id == 1) || data.manga_languages.find((ml) => ml.is_main_language)
      props.title = mangaLanguages?.title
      props.description = mangaLanguages?.description
    }
    if (locale == 'vn') {
      const mangaLanguages =
        data.manga_languages.find((ml) => ml.language_id == 2) || data.manga_languages.find((ml) => ml.is_main_language)
      props.title = mangaLanguages?.title
      props.description = mangaLanguages?.description
    }
    return {
      props: {
        data: props,
      },
    }
  }
}
