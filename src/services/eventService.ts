import getConfig from 'next/config'
import { privateAxios } from 'src/context'
export const eventService = {
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
    getManga: async (page) =>
      await privateAxios.get(`${getConfig().REST_API_URL}/story-event/manga?limit=9&offset=${(page - 1) * 9}`),
    submitArtwork: async (payload) =>
      await privateAxios.post(`${getConfig().REST_API_URL}/story-event/submission/artwork`, payload),
    getArtwork: async (page) =>
      await privateAxios.get(`${getConfig().REST_API_URL}/story-event/artwork?limit=9&offset=${(page - 1) * 9}`),
  },
}
