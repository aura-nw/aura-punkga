import axios from 'axios'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useContext, useRef } from 'react'
import { LANGUAGE } from 'src/constants'
import { CHAPTER_TYPE } from 'src/constants/chapter.constant'
import { Context, privateAxios } from 'src/context'
import useApi from 'src/hooks/useApi'
import { IChapter } from 'src/models/chapter'
import { IComicDetail } from 'src/models/comic'
import { IComment } from 'src/models/comment'
import { getComicDetail } from 'src/services'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { query } = useRouter()
  const { account } = useContext(Context)
  const config = getConfig()
  const chapterId = useRef()

  const getChapterDetails = async () => {
    const {
      data: { chapters: cdata },
    } = await privateAxios.get(
      `${config.API_URL}/api/rest/public/manga/${query.comicSlug}/chapters/${query.chapterNumber}`,
      {
        params: {
          user_id: account?.id,
        },
      }
    )
    const data = cdata[0]

    if (!data) {
      return null
    }

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

    if (
      (data.chapter_type == CHAPTER_TYPE.ACCOUNT_ONLY || data.chapter_type == CHAPTER_TYPE.NFTS_ONLY) &&
      account?.id
    ) {
      const { data: protectedData } = await privateAxios.get(`${config.REST_API_URL}/chapter/${data.id}/protected`)
      LANGUAGE.forEach((l) => {
        const chapterLanguage = protectedData.data.chapters[0].chapter_languages.find((cl) => cl.language_id == l.id)
        res[l.shortLang] = chapterLanguage?.detail ? chapterLanguage.detail.map((page) => page.image_path) : null
      })
    } else {
      LANGUAGE.forEach((l) => {
        const chapterLanguage = data.chapter_languages.find((cl) => cl.language_id == l.id)
        res[l.shortLang] = chapterLanguage?.detail ? chapterLanguage.detail.map((page) => page.image_path) : null
      })
    }

    chapterId.current = data.id

    return res
  }

  const getChapterComments = async () => {
    const { data } = await axios.get(`${config.API_URL}/api/rest/public/chapters/${chapterId.current}/comments`)
    if (data.social_activities) {
      return data.social_activities.map((socialActivity) => ({
        id: socialActivity.id,
        content: socialActivity.content,
        replies: socialActivity.replies.map((reply) => ({
          content: reply.content,
          createAt: reply.created_at,
          author: reply.social_activities_authorizer_user
            ? {
                id: reply.social_activities_authorizer_user.id,
                nickname: reply.social_activities_authorizer_user.nickname,
                image: reply.social_activities_authorizer_user.picture,
              }
            : null,
        })),
        createAt: socialActivity.created_at,
        author: socialActivity.social_activities_authorizer_user
          ? {
              id: socialActivity.social_activities_authorizer_user.id,
              nickname: socialActivity.social_activities_authorizer_user.nickname,
              image: socialActivity.social_activities_authorizer_user.picture,
            }
          : null,
      }))
    }
    return []
  }

  const comicDetails = useApi<IComicDetail>(
    async () => await getComicDetail(query.comicSlug as string, account?.id),
    !!query.comicSlug,
    [query.comicSlug, account?.id]
  )
  const chapterComments = useApi<IComment[]>(getChapterComments, !!chapterId.current, [chapterId.current])
  const chapterDetails = useApi<IChapter>(getChapterDetails, !!query.comicSlug && !!query.chapterNumber, [
    query.comicSlug,
    query.chapterNumber,
    account?.id,
  ])

  const postComment = async (content: string) => {
    const { data } = await privateAxios.post(`${config.API_URL}/api/rest/user/chapters/${chapterId.current}/comments`, {
      content: content,
      ref_activity: null,
    })
    if (data) {
      chapterComments.callApi(true)
    }
  }

  const like = async (id?: string) => {
    await privateAxios.post(`${config.API_URL}/api/rest/user/chapters/${id || chapterId.current}/likes`)
  }
  const unlike = async (id?: string) => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/chapters/${id || chapterId.current}/likes`)
  }
  const subscribe = async () => {
    await privateAxios.post(`${config.API_URL}/api/rest/user/manga/${query.comicSlug}/subscribe`)
  }
  const unsubscribe = async () => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/manga/${query.comicSlug}/subscribe`)
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
