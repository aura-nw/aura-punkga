import axios from "axios"
import { useRouter } from "next/router"
import { LANGUAGE, LOCALES } from "src/constants"
import useApi from "src/hooks/useApi"
import { IChapter } from "src/models/chapter"
import { IComicDetail } from "src/models/comic"
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { query } = useRouter()

  const getComicDetail = async () => {
    const {
      data: { manga_by_pk: data },
    } = await axios.get(`http://hasura.dev.punkga.me/api/rest/public/manga/${query.comicId}`)

    const res = {
      id: data.id,
      languages: data.manga_languages.map((ml) => ({
        ...LANGUAGE.find((l) => l.id == ml.language_id),
        isMainLanguage: ml.is_main_language,
      })),
      chapters: data.chapters.map((chapter) => ({
        id: chapter.id,
        name: chapter.chapter_name,
        number: chapter.chapter_number,
        type: chapter.chapter_type,
        status: chapter.stauts,
        thumbnail: chapter.thumbnail_url,
      })),
    }

    LANGUAGE.forEach((l) => {
      const mangaLanguages = data.manga_languages.find((ml) => ml.language_id == l.id) || data.manga_languages.find((ml) => ml.is_main_language)
      res[l.shortLang] = {
        title: mangaLanguages?.title,
        description: mangaLanguages?.description,
      }
    })
    return res
  }

  const getChapterDetail = async () => {
    const {
      data: { chapters: cdata },
    } = await axios.get(
      `http://hasura.dev.punkga.me/api/rest/public/manga/${query.comicId}/chapters/${query.chapterId}`
    )
    const data = cdata[0]

    const res = {
      id: data.id,
      views: data.views || 0,
      likes: data.chapters_likes_aggregate?.aggregate?.count || 0,
      comments: data.comments?.aggregate?.count || 0,
      type: data.chapter_type,
      name: data.chapter_name,
      number: data.chapter_number,
    }

    LANGUAGE.forEach((l) => {
      const chapterLanguage =
        data.chapter_languages.find((cl) => cl.language_id == l.id) ||
        data.chapter_languages.find((cl) => cl.is_main_language)
      res[l.shortLang] = chapterLanguage.detail.map((page) => page.image_path)
    })

    return res
  }

  const { loading, data, runAction } = useApi<IComicDetail>(getComicDetail, !!query.comicId, [query.comicId])
  const {
    loading: chapterLoading,
    data: chapterData,
    runAction: chapterRunAction,
  } = useApi<IChapter>(getChapterDetail, !!query.comicId && !!query.chapterId, [(query.comicId, query.chapterId)])

  return (
    <Component {...props} loading={loading} chapterLoading={chapterLoading} chapterData={chapterData} data={data} />
  )
}

export default withApi