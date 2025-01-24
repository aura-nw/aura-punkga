import getConfig from 'next/config'
import { COMIC_STATUS, LANGUAGE } from 'src/constants'
import { privateAxios } from 'src/context'
import { formatStatus } from 'src/utils'
export const userService = {
  updateArtistProfile: async (payload) => await privateAxios.post(`${getConfig().REST_API_URL}/user/artist`, payload),
  getAvailableQuests: async () => {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/user/available-quests`)
    const res = data.map((quest: any) => {
      const q = quest
      LANGUAGE.forEach((l) => {
        const questLanguages =
          quest.quests_i18n.find((ml) => ml.i18n_language.id == l.id) ||
          quest.quests_i18n.find((ml) => ml.i18n_language.is_main)
        q[l.shortLang] = questLanguages?.data || {
          name: quest?.name,
          description: quest?.description,
        }
      })
      q.pointText = q.quests_campaign?.campaign_chain?.punkga_config?.reward_point_name || 'XP'
      return q
    })
    return res
  },
  getSubscriptionList: async (id: string) => {
    const res: any = await privateAxios.get(`${getConfig().API_URL}/api/rest/public/profiles/${id}/subscribe`)
    return res.data?.subscribers?.map(({ subscribers_manga: m }: any) => {
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
        nearestUpcoming: m.nearest_upcoming,
        latestChap: {
          number: m.chapters?.[0]?.chapter_number,
          id: m.chapters?.[0]?.id,
          pushlishDate: m.chapters?.[0]?.pushlish_date,
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
  },
}
