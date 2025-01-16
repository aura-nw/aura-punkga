import getConfig from "next/config";
import { privateAxios } from "src/context";
export const eventService = {
  report: async (payload) =>
    await privateAxios.post(`${getConfig().REST_API_URL}/report`, payload),
  getAll: async () =>
    await privateAxios.get(`${getConfig().REST_API_URL}/contest`),
  story: {
    searchCharacter: async (search: string) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/character/search`,
        {
          params: {
            text: search,
          },
        }
      ),
    createCharacter: async (payload) =>
      await privateAxios.post(
        `${getConfig().REST_API_URL}/story-event/submission/character`,
        payload
      ),
    getAvailableCharacter: async () =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/character/available`
      ),
    getCharacters: async (userId, page, sort, type, search?: string) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/character`,
        {
          params: {
            limit: 20,
            offset: (page - 1) * 20,
            order_by: sort,
            user_id: userId,
            is_default:
              type == "sponsored" ? true : type == "user" ? false : undefined,
            text: search,
          },
        }
      ),
    getCollectedCharacters: async () =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/character/collected`
      ),
    likeCharacter: async (id) =>
      await privateAxios.post(
        `${getConfig().REST_API_URL}/user/like-character/${id}`
      ),
    unlikeCharacter: async (id) =>
      await privateAxios.delete(
        `${getConfig().REST_API_URL}/user/unlike-character/${id}`
      ),
    collectCharacter: async (id) =>
      await privateAxios.post(
        `${getConfig().REST_API_URL}/story-event/character/${id}/collect`
      ),
    getSubmissions: async (contest_id?: string | number) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/submission`,
        {
          params: contest_id && { contest_id: contest_id },
        }
      ),
    submitManga: async (payload) =>
      await privateAxios.post(
        `${getConfig().REST_API_URL}/story-event/submission/manga`,
        payload
      ),
    getManga: async (page, userId) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/manga?limit=9&offset=${
          (page - 1) * 9
        }${userId ? `&user_id=${userId}` : ``}`
      ),
    submitArtwork: async (payload) =>
      await privateAxios.post(
        `${getConfig().REST_API_URL}/story-event/submission/artwork`,
        payload
      ),
    getArtwork: async (userId, page) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/artwork?limit=12&offset=${
          (page - 1) * 12
        }${userId ? `&user_id=${userId}` : ``}`
      ),
    getArtworkDetail: async (userId, id) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/artwork/${id}`,
        {
          params: userId
            ? {
                user_id: userId,
              }
            : undefined,
        }
      ),
    getCharacterDetail: async (userId, id, page) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/story-event/character/get-by-id/${id}`,
        {
          params: {
            limit: 24,
            offset: (page - 1) * 24,
            ...(userId ? { user_id: userId } : {}),
          },
        }
      ),
    likeArtwork: async (id) =>
      await privateAxios.post(
        `${getConfig().REST_API_URL}/user/artwork/${id}/like`
      ),
    unlikeArtwork: async (id) =>
      await privateAxios.post(
        `${getConfig().REST_API_URL}/user/artwork/${id}/unlike`
      ),
  },
  punktober: {
    getAllTopic: async () =>
      await privateAxios.get(`${getConfig().REST_API_URL}/artwork-topic`),
    getTopic: async (id: string) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/artwork-topic/${id}`,
        {
          params: {
            limit: 999,
            offset: 0,
          },
        }
      ),
    getUserArtworks: async (id: string) =>
      await privateAxios.get(
        `${getConfig().REST_API_URL}/user/artwork-topics`,
        {
          params: {
            user_id: id,
          },
        }
      ),
  },
  liXi: {
    getFortuneNumbers: async () =>
      await privateAxios
        .get(`${getConfig().REST_API_URL}/referral/fortune-numbers`)
        .then((res) => res.data),
    getUserLixi: async () =>
      await privateAxios
        .get(`${getConfig().REST_API_URL}/lixi/user-lixi`)
        .then((res) => res.data),
    getHistory: async () =>
      await privateAxios
        .get(`${getConfig().REST_API_URL}/referral/history`)
        .then((res) => res.data),
    getReferralStatus: async () =>
      await privateAxios
        .get(`${getConfig().REST_API_URL}/referral/status`)
        .then((res) => res.data),
    applyFortuneNumbers: async (body) =>
      await privateAxios
        .post(`${getConfig().REST_API_URL}/referral/fortune-numbers`, body)
        .then((res) => res.data),
  },
};
