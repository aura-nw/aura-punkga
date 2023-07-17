import axios from "axios"
import getConfig from "next/config"
import { useRouter } from "next/router"
import { useContext, useRef } from "react"
import { LANGUAGE } from "src/constants"
import { Context } from "src/context"
import useApi from "src/hooks/useApi"
import { IChapter } from "src/models/chapter"
import { IComicDetail } from "src/models/comic"
import { IComment } from "src/models/comment"
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { query } = useRouter()
  const { account } = useContext(Context)
  const config = getConfig()
  const chapterId = useRef()
  const getComicDetail = async () => {
    const {
      data: { manga_by_pk: data },
    } = await axios.get(`${config.API_URL}/api/rest/public/manga/${query.comicId}`, {
      params: {
        user_id: account?.id,
      },
    })

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
      views: data.chapters_aggregate?.aggregate?.sum?.views,
      likes: data.chapters_aggregate?.aggregate?.sum?.likes,
      isSubscribe: !!data.manga_subscribers.length,
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

  const getChapterDetails = async () => {
    const {
      data: { chapters: cdata },
    } = await axios.get(`${config.API_URL}/api/rest/public/manga/${query.comicId}/chapters/${query.chapterNumber}`, {
      params: {
        user_id: account?.id,
      },
    })
    const data = cdata[0]

    const res = {
      id: data.id,
      views: data.views || 0,
      likes: data.chapters_likes_aggregate?.aggregate?.count || 0,
      comments: data.comments?.aggregate?.count || 0,
      type: data.chapter_type,
      name: data.chapter_name,
      number: data.chapter_number,
      isLiked: !!data.chapters_likes.length,
    }

    LANGUAGE.forEach((l) => {
      const chapterLanguage = data.chapter_languages.find((cl) => cl.language_id == l.id)
      res[l.shortLang] = chapterLanguage ? chapterLanguage.detail.map((page) => page.image_path) : null
    })

    chapterId.current = data.id

    return res
  }

  const getChapterComments = async () => {
    const { data } = await axios.get(`${config.API_URL}/api/rest/public/chapters/${query.chapterNumber}/comments`)
    if (data.social_activities) {
      return data.social_activities.map((socialActivity) => ({
        id: socialActivity.id,
        content: socialActivity.content,
        replies: socialActivity.replies.map((reply) => ({
          content: reply.content,
          createAt: reply.created_at,
          author: {
            id: reply.social_activities_authorizer_user.id,
            nickname: reply.social_activities_authorizer_user.nickname,
          },
        })),
        createAt: socialActivity.created_at,
        author: {
          id: socialActivity.social_activities_authorizer_user.id,
          nickname: socialActivity.social_activities_authorizer_user.nickname,
        },
      }))
    }
    return []
  }

  const comicDetails = useApi<IComicDetail>(getComicDetail, !!query.comicId, [query.comicId, account?.id])
  const chapterComments = useApi<IComment[]>(getChapterComments, !!query.chapterNumber, [query.chapterNumber])
  const chapterDetails = useApi<IChapter>(getChapterDetails, !!query.comicId && !!query.chapterNumber, [
    query.comicId,
    query.chapterNumber,
    account?.id,
  ])

  const postComment = async (content: string) => {
    const { data } = await axios.post(`${config.API_URL}/api/rest/user/chapters/${chapterId.current}/comments`, {
      content: content,
      ref_activity: null,
    })
    if (data) {
      chapterComments.callApi(true)
    }
  }

  const like = async () => {
    await axios.post(`${config.API_URL}/api/rest/user/chapters/${chapterId.current}/likes`)
  }
  const unlike = async () => {
    await axios.delete(`${config.API_URL}/api/rest/user/chapters/${chapterId.current}/likes`)
  }
  const subscribe = async () => {
    await axios.post(`${config.API_URL}/api/rest/user/manga/${query.comicId}/subscribe`)
  }
  const unsubscribe = async () => {
    await axios.delete(`${config.API_URL}/api/rest/user/manga/${query.comicId}/subscribe`)
  }

  return (
    <Component
      {...props}
      comicDetails={comicDetails}
      chapterDetails={chapterDetails}
      chapterComments={chapterComments}
      postComment={postComment}
      like={like}
      unlike={unlike}
      subscribe={subscribe}
      unsubscribe={unsubscribe}
    />
  )
}

export default withApi
