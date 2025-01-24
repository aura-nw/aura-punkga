import getConfig from 'next/config'
import { COMIC_STATUS, LANGUAGE } from 'src/constants'
import { privateAxios } from 'src/context'
import { IComic } from 'src/models/comic'
import { formatStatus } from 'src/utils'

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
  comic: {
    getTrendingComic: async (): Promise<IComic[]> => {
      return await privateAxios.get(`${getConfig().API_URL}/api/rest/public/trending`).then((res) =>
        res.data?.manga?.map((m: any) => {
          const response = {
            id: m.id,
            slug: m.slug,
            image: m.poster,
            status: {
              type: COMIC_STATUS[formatStatus(m.status)],
              text: formatStatus(m.status),
            },
            authors: m.manga_creators?.map((c: any) => ({
              id: c.creator?.isActive ? c.creator?.id : undefined,
              slug: c.creator?.isActive ? c.creator?.slug : undefined,
              name: c.creator?.isActive ? c.creator?.pen_name || c.creator?.name : 'Unknown creator',
            })),
            views: m.manga_total_views?.views || 0,
            likes: m.manga_total_likes?.likes || 0,
            subscriptions: m.manga_subscribers_aggregate?.aggregate?.count || 0,
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
    },
    getLatestComic: async (limit?: number, offset?: number, tags?: number[], status?: string[]): Promise<IComic[]> => {
      return await privateAxios
        .get(`${getConfig().REST_API_URL}/manga/latest`, {
          params: {
            limit,
            offset,
            tags,
            status,
          },
        })
        .then((res) =>
          res.data?.data?.manga?.map((m: any) => {
            const response = {
              id: m.id,
              slug: m.slug,
              image: m.poster,
              status: {
                type: COMIC_STATUS[formatStatus(m.status)],
                text: formatStatus(m.status),
              },
              authors: m.manga_creators?.map((c: any) => ({
                id: c.creator?.isActive ? c.creator?.id : undefined,
                slug: c.creator?.isActive ? c.creator?.slug : undefined,
                name: c.creator?.isActive ? c.creator?.pen_name || c.creator?.name : 'Unknown creator',
              })),
              views: m.manga_total_views?.views || 0,
              likes: m.manga_total_likes?.likes || 0,
              subscriptions: m.manga_subscribers_aggregate?.aggregate?.count || 0,
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
    },
  },
  artwork: {
    getArtworkList: async (limit?: number, offset?: number) => {
      const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/story-protocol/artwork`, {
        params: {
          limit,
          offset,
        },
      })
      return data
    },
    getArtworkDetail: async (userId, id) => {
      const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/artwork/${id}`, {
        params: userId
          ? {
              user_id: userId,
            }
          : undefined,
      })
      return data?.data?.artworks_by_pk
    },
    getRelatedArtwork: async (id, limit, offset, userId) => {
      const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/artwork/${id}/related`, {
        params: {
          id,
          limit,
          offset,
          user_id: userId,
        },
      })
      return data
    },
  },
  character: {
    getCharacters: async ({
      userId,
      offset,
      sort,
      type,
      search,
      contestId,
      limit,
    }: {
      userId?: string
      offset?: number
      sort?: string
      type?: string
      search?: string
      contestId?: string
      limit?: string
    }) => {
      const res = await privateAxios.get(`${getConfig().REST_API_URL}/story-event/character`, {
        params: {
          limit: limit || 20,
          offset: offset,
          order_by: sort,
          user_id: userId,
          is_default: type == 'sponsored' ? true : type == 'user' ? false : undefined,
          text: search,
          contest_id: contestId,
        },
      })
      return res.data
    },
  },
}
