import axios from 'axios'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useContext, useRef } from 'react'
import { COMIC_STATUS, LANGUAGE } from 'src/constants'
import { Context, privateAxios } from 'src/context'
import useApi from 'src/hooks/useApi'
import { IChapter } from 'src/models/chapter'
import { IComicDetail } from 'src/models/comic'
import { IComment } from 'src/models/comment'
import { formatStatus } from 'src/utils'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { query } = useRouter()
  const { account } = useContext(Context)
  const config = getConfig()
  const chapterId = useRef()
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
      status: {
        type: COMIC_STATUS[formatStatus(data.status)],
        text: formatStatus(data.status),
      },
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
      authors: data.manga_creators?.map((c: any) => (c.creator?.isActive ? c.creator?.name : 'Unknown creator')),
      releaseDate: data.release_date,
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
    } = await privateAxios.get(
      `${config.API_URL}/api/rest/public/manga/${query.comicId}/chapters/${query.chapterNumber}`,
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

    LANGUAGE.forEach((l) => {
      const chapterLanguage = data.chapter_languages.find((cl) => cl.language_id == l.id)
      res[l.shortLang] = chapterLanguage?.detail ? chapterLanguage.detail.map((page) => page.image_path) : null
    })

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
          author: socialActivity.social_activities_authorizer_user
            ? {
                id: socialActivity.social_activities_authorizer_user.id,
                nickname: socialActivity.social_activities_authorizer_user.nickname,
                image: socialActivity.social_activities_authorizer_user.picture,
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

  const comicDetails = useApi<IComicDetail>(getComicDetail, !!query.comicId, [query.comicId, account?.id])
  const chapterComments = useApi<IComment[]>(getChapterComments, !!chapterId.current, [chapterId.current])
  const chapterDetails = useApi<IChapter>(getChapterDetails, !!query.comicId && !!query.chapterNumber, [
    query.comicId,
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
    await privateAxios.post(`${config.API_URL}/api/rest/user/manga/${query.comicId}/subscribe`)
  }
  const unsubscribe = async () => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/manga/${query.comicId}/subscribe`)
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
