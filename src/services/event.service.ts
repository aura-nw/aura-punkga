import getConfig from 'next/config'
import { privateAxios } from 'src/context'
export const eventService = {
  story: {
    createCharacter: async (payload) =>
      await privateAxios.post(`${getConfig().REST_API_URL}/story-event/submission/character`, payload),
    getCharacters: async (userId, page, sort) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/character?limit=10&offset=${(page - 1) * 4}&order_by=${sort}${
          userId ? `&user_id=${userId}` : ``
        }`
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
  },
}
