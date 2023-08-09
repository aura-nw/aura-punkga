import axios from 'axios'
import getConfig from 'next/config'
import { COMIC_STATUS, LANGUAGE } from 'src/constants'
import { IComic } from 'src/models/comic'
import { privateAxios } from 'src/context'
import { formatStatus } from 'src/utils'

export const getLatestComic = async (): Promise<IComic[]> => {
  return await axios.get(`${getConfig().API_URL}/api/rest/public/latest`).then((res) =>
    res.data?.manga?.map((m: any) => {
      const response = {
        id: m.id,
        image: m.poster,
        status: {
          type: COMIC_STATUS[formatStatus(m.status)],
          text: formatStatus(m.status),
        },
        authors: m.manga_creators?.map((c: any) => (c.creator?.isActive ? c.creator?.name : 'Unknown creator')),
        views: m.manga_total_views?.views || 0,
        likes: m.manga_total_likes?.likes || 0,
        latestChap: {
          number: m.chapters?.[0]?.chapter_number,
          id: m.chapters?.[0]?.id,
        },
        tags: m.manga_tags.map(({ tag }: any) => {
          const r = {}
          LANGUAGE.forEach((l) => {
            const tagLanguage = tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages[0]
            r[l.shortLang] = tagLanguage.value
          })
          return r
        }),
      }
      LANGUAGE.forEach((language) => {
        const l =
          m.manga_languages.find((ml) => ml.language_id == language.id) ||
          m.manga_languages.find((ml) => ml.is_main_language)
        response[language.shortLang] = {
          title: l ? l?.title : 'Unknown title',
          description: l ? l?.description : 'Unknown description',
        }
      })
      return response
    })
  )
}

export const getTrendingComic = async (): Promise<IComic[]> => {
  return await axios.get(`${getConfig().API_URL}/api/rest/public/trending`).then((res) =>
    res.data?.manga?.map((m: any) => {
      const response = {
        id: m.id,
        image: m.poster,
        status: {
          type: COMIC_STATUS[m.status],
          text: m.status,
        },
        authors: m.manga_creators?.map((c: any) => (c.creator?.isActive ? c.creator?.name : 'Unknown creator')),
        views: m.manga_total_views?.views || 0,
        likes: m.manga_total_likes?.likes || 0,
        latestChap: {
          number: m.chapters?.[0]?.chapter_number,
          id: m.chapters?.[0]?.id,
        },
      }
      LANGUAGE.forEach((language) => {
        const l =
          m.manga_languages.find((ml) => ml.language_id == language.id) ||
          m.manga_languages.find((ml) => ml.is_main_language)
        response[language.shortLang] = {
          title: l ? l?.title : 'Unknown title',
          description: l ? l?.description : 'Unknown description',
        }
      })
      return response
    })
  )
}

export const replyComment = async (content: string, ref: string, chapterId: string) => {
  const { data } = await privateAxios.post(`${getConfig().API_URL}/api/rest/user/chapters/${chapterId}/comments`, {
    content: content,
    ref_activity: ref,
  })
  return data
}

export const getAllTags = async () => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/tags`)
  return data?.tags?.map((tag: any) => {
    const r = {}
    LANGUAGE.forEach((l) => {
      const tagLanguage =
        tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages.find((tl) => tl.language_id == 1)
      r[l.shortLang] = tagLanguage.value
    })
    return r
  })
}

export const search = async (content: string) => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/search_manga`, {
    params: {
      text: `%${content}%`,
    },
  })
  return data?.manga?.map((m: any) => {
    const response = {
      id: m.id,
      image: m.poster,
      status: {
        type: COMIC_STATUS[formatStatus(m.status)],
        text: formatStatus(m.status),
      },
      authors: m.manga_creators?.map((c: any) => (c.creator?.isActive ? c.creator?.name : 'Unknown creator')),
      views: m.manga_total_views?.views || 0,
      likes: m.manga_total_likes?.likes || 0,
      latestChap: {
        number: m.chapters?.[0]?.chapter_number,
        id: m.chapters?.[0]?.id,
      },
      tags: m.manga_tags.map(({ tag }: any) => {
        const r = {}
        LANGUAGE.forEach((l) => {
          const tagLanguage = tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages[0]
          r[l.shortLang] = tagLanguage.value
        })
        return r
      }),
    }
    LANGUAGE.forEach((language) => {
      const l =
        m.manga_languages.find((ml) => ml.language_id == language.id) ||
        m.manga_languages.find((ml) => ml.is_main_language)
      response[language.shortLang] = {
        title: l ? l?.title : 'Unknown title',
        description: l ? l?.description : 'Unknown description',
      }
    })
    return response
  })
}
