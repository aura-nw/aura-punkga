import getConfig from 'next/config'
import { privateAxios } from 'src/context'

export const mangaService = {
  getMangaList: async (limit?: number, offset?: number, userId?: string) => {
    const { data } = await privateAxios.get(`${getConfig().API_URL}/api/rest/public/latest`, {
      params: {
        limit,
        offset,
        user_id: userId,
      },
    })
    return data
  },
}
