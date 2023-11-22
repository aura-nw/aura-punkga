import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { compose } from 'ramda'
import Chapter from './chapter'
import withApi from './with-api'
import withCssModule from './with-css-module'
import withStyle from './with-style'
import HeadComponent from 'components/Head'
const ComposedChapter = compose(withCssModule, withStyle, withApi)(Chapter)

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <ComposedChapter />
    </>
  )
}

export const getServerSideProps = async (context) => {
  if (context.params?.comicSlug) {
    const res = await fetch(`https://api.punkga.me/manga/${context.params?.comicSlug}`)
    const data = await res.json()
    const manga = data?.data?.manga?.[0]
    if (!manga)
      return {
        props: {
          ...(await serverSideTranslations(context?.locale!, ['common'])),
        },
      }
    const props = {
      image: manga.poster,
      title: '',
      description: '',
      canonical: `htts://punkga.me/comic/${context.params?.comicSlug}/chapter/${context.params?.chapterNumber}`,
    }
    if (context.locale == 'en') {
      const mangaLanguages =
        manga.manga_languages.find((ml) => ml.language_id == 1) ||
        manga.manga_languages.find((ml) => ml.is_main_language)
      props.title = `${mangaLanguages?.title} - Chapter ${context.params?.chapterNumber}`
      props.description = mangaLanguages?.description
    } else {
      const mangaLanguages =
        manga.manga_languages.find((ml) => ml.language_id == 2) ||
        manga.manga_languages.find((ml) => ml.is_main_language)
      props.title = `${mangaLanguages?.title} - Chương ${context.params?.chapterNumber}`
      props.description = mangaLanguages?.description
    }
    return {
      props: {
        metadata: props,
        ...(await serverSideTranslations(context?.locale!, ['common'])),
      },
    }
  }
}
