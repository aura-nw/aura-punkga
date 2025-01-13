import getConfig from 'next/config'
import { privateAxios } from 'src/context'

export const contentService = {
  getPostList: async (limit?: number, offset?: number, userId?: string) => {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/post/latest`, {
      params: {
        limit,
        offset,
        user_id: userId,
      },
    })
    return data
  },
  likeChapter: async (id?: string) => {
    await privateAxios.post(`${getConfig().REST_API_URL}/user/like-chapter/${id}`)
  },
  unlikeChapter: async (id?: string) => {
    await privateAxios.delete(`${getConfig().REST_API_URL}/user/unlike-chapter/${id}`)
  },
}
