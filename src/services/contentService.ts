import getConfig from 'next/config'
import { LANGUAGE } from 'src/constants'
import { privateAxios } from 'src/context'

export const contentService = {
  getPostList: async (limit?: number, offset?: number, userId?: string, tags?: number[]) => {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/post/latest`, {
      params: {
        limit,
        offset,
        user_id: userId,
        tags,
      },
    })
    return data
  },
  getTagList: async () => {
    const { data } = await privateAxios.get(`${getConfig().API_URL}/api/rest/public/tags`)
    return data?.tags?.map((tag: any) => {
      const r = {
        id: tag.id,
      }
      LANGUAGE.forEach((l) => {
        const tagLanguage =
          tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages.find((tl) => tl.language_id == 1)
        r[l.shortLang] = tagLanguage.value
      })
      return r
    })
  },
  chapter: {
    likeChapter: async (id?: string) => {
      await privateAxios.post(`${getConfig().REST_API_URL}/user/like-chapter/${id}`)
    },
    unlikeChapter: async (id?: string) => {
      await privateAxios.delete(`${getConfig().REST_API_URL}/user/unlike-chapter/${id}`)
    },
  },
}
