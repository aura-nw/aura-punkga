import HeadComponent from 'components/Head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { compose } from 'ramda'
import Comic from './comic'
import withApi from './with-api'
const ComposedComic = compose(withApi)(Comic)

export default function Page(props) {
  if (props.justHead || props.pageProps.justHead) {
    return <HeadComponent data={props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.metadata} />
      <ComposedComic />
    </>
  )
}

export const getServerSideProps = async (context) => {
  if (context.params?.comicSlug) {
    const res = await fetch(`https://api.staging.punkga.me/manga/${context.params?.comicSlug}`)
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
    }
    if (context.locale == 'en') {
      const mangaLanguages =
        manga.manga_languages.find((ml) => ml.language_id == 1) ||
        manga.manga_languages.find((ml) => ml.is_main_language)
      props.title = mangaLanguages?.title
      props.description = mangaLanguages?.description
    } else {
      const mangaLanguages =
        manga.manga_languages.find((ml) => ml.language_id == 2) ||
        manga.manga_languages.find((ml) => ml.is_main_language)
      props.title = mangaLanguages?.title
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
