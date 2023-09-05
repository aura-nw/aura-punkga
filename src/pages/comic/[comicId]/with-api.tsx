import axios from 'axios'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { LANGUAGE } from 'src/constants'
import { Context, privateAxios } from 'src/context'
import useApi from 'src/hooks/useApi'
import { IComicDetail } from 'src/models/comic'
import { formatStatus } from 'src/utils'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { account } = useContext(Context)
  const { query } = useRouter()
  const config = getConfig()
  const getComicDetail = async () => {
    const d: any = await axios.get(`${config.API_URL}/api/rest/public/manga/${query.comicId}`, {
      params: {
        user_id: account?.id,
      },
    })
    const data = d?.data?.manga[0]
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
        status: formatStatus(chapter.status),
        thumbnail: chapter.thumbnail_url,
        date: chapter.pushlish_date,
        likes: chapter.chapter_total_likes?.likes || 0,
        views: chapter.views || 0,
        isLiked: !!chapter.chapters_likes?.length,
      })),
      views: data.manga_total_views?.views || 0,
      likes: data.manga_total_likes?.likes || 0,
      isSubscribe: !!data.manga_subscribers.length,
      image: data.poster,
      cover: data.banner,
      tags: data.manga_tags.map(({ tag }: any) => {
        const r = {}
        LANGUAGE.forEach((l) => {
          const tagLanguage = tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages[0]
          r[l.shortLang] = tagLanguage.value
        })
        return r
      }),
      authors: data.manga_creators?.map((c: any) => ({
        id: c.creator?.isActive ? c.creator?.id : undefined,
        name: c.creator?.isActive ? c.creator?.name : 'Unknown creator',
      })),
    }

    LANGUAGE.forEach((l) => {
      const mangaLanguages =
        data.manga_languages.find((ml) => ml.language_id == l.id) ||
        data.manga_languages.find((ml) => ml.is_main_language)
      res[l.shortLang] = {
        title: mangaLanguages?.title,
        description: mangaLanguages?.description,
      }
    })
    return res
  }
  const subscribe = async () => {
    await privateAxios.post(`${config.API_URL}/api/rest/user/manga/${query.comicId}/subscribe`)
  }
  const unsubscribe = async () => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/manga/${query.comicId}/subscribe`)
  }

  const like = async (id) => {
    await privateAxios.post(`${config.API_URL}/api/rest/user/chapters/${id}/likes`)
  }
  const unlike = async (id) => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/chapters/${id}/likes`)
  }

  const comicDetails = useApi<IComicDetail>(getComicDetail, !!query.comicId, [query.comicId, account?.id])
  return (
    <Component
      {...props}
      comicDetails={comicDetails}
      subscribe={subscribe}
      unsubscribe={unsubscribe}
      like={like}
      unlike={unlike}
    />
  )
}

export default withApi
