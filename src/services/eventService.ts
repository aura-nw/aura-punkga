import getConfig from 'next/config'
import { privateAxios } from 'src/context'
export const eventService = {
  report: async (payload) =>
    await privateAxios.post(`${getConfig().REST_API_URL}/report`, payload),
  story: {
    createCharacter: async (payload) =>
      await privateAxios.post(`${getConfig().REST_API_URL}/story-event/submission/character`, payload),
    getAvailableCharacter: async () =>
      await privateAxios.get(`${getConfig().REST_API_URL}/story-event/character/available`),
    getCharacters: async (userId, page, sort, type) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/character?limit=20&offset=${(page - 1) * 20}&order_by=${sort}${
          userId ? `&user_id=${userId}` : ``
        }${type == 'sponsored' ? '&is_default=true' : type == 'user' ? '&is_default=false' : ''}`
      ),
    getCollectedCharacters: async () =>
      await privateAxios.get(`${getConfig().REST_API_URL}/story-event/character/collected`),
    likeCharacter: async (id) =>
      await privateAxios.post(`${getConfig().API_URL}/api/rest/user/story-event/characters/${id}/likes`),
    unlikeCharacter: async (id) =>
      await privateAxios.delete(`${getConfig().API_URL}/api/rest/user/story-event/characters/${id}/likes`),
    collectCharacter: async (id) =>
      await privateAxios.post(`${getConfig().REST_API_URL}/story-event/character/${id}/collect`),
    getSubmissions: async () => await privateAxios.get(`${getConfig().REST_API_URL}/story-event/submission`),
    submitManga: async (payload) =>
      await privateAxios.post(`${getConfig().REST_API_URL}/story-event/submission/manga`, payload),
    getManga: async (page, userId) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/manga?limit=9&offset=${(page - 1) * 9}${
          userId ? `&user_id=${userId}` : ``
        }`
      ),
    submitArtwork: async (payload) =>
      await privateAxios.post(`${getConfig().REST_API_URL}/story-event/submission/artwork`, payload),
    getArtwork: async (userId, page) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/artwork?limit=12&offset=${(page - 1) * 12}${
          userId ? `&user_id=${userId}` : ``
        }`
      ),
    getArtworkDetail: async (userId, id) =>
      await privateAxios.get(`${getConfig().REST_API_URL}/story-event/artwork/${id}`, {
        params: userId
          ? {
              user_id: userId,
            }
          : undefined,
      }),
    likeArtwork: async (id) => await privateAxios.post(`${getConfig().REST_API_URL}/user/artwork/${id}/like`),
    unlikeArtwork: async (id) => await privateAxios.post(`${getConfig().REST_API_URL}/user/artwork/${id}/unlike`),
  },
  punktober: {
    getAllTopic: async () => await privateAxios.get(`${getConfig().REST_API_URL}/artwork-topic`),
    getTopic: async (id: string) =>
      await privateAxios.get(`${getConfig().REST_API_URL}/artwork-topic/${id}`, {
        params: {
          limit: 999,
          offset: 0,
        },
      }),
  },
}
