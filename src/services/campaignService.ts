import getConfig from 'next/config'
import { LANGUAGE } from 'src/constants'
import { privateAxios } from 'src/context'
import { Campaign } from 'src/models/campaign'

export const campaignService = {
  getCampaignAuthorizedData: async (slug: string) => {
    try {
      const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign/${slug}/authorized`)
      const campaignData = data.data.campaign[0]
      const quests = campaignData.campaign_quests?.map((quest: any) => {
        const q = quest
        LANGUAGE.forEach((l) => {
          const questLanguages =
            quest.quests_i18n.find((ml) => ml.i18n_language.id == l.id) ||
            quest.quests_i18n.find((ml) => ml.i18n_language.is_main)
          q[l.shortLang] = questLanguages?.data || {
            name: quest.name,
            description: quest.description,
          }
        })
        q.pointText = campaignData?.campaign_chain?.punkga_config?.reward_point_name || 'XP'
        return q
      })
      campaignData.campaignQuests = quests?.map((quest) => {
        if (quest.condition?.quest_id) {
          const mappedQuest = quest
          mappedQuest.condition = {
            ...quest.condition,
            requiredQuest: quests.find((q) => q.id == quest.condition.quest_id),
          }
          return mappedQuest
        } else {
          return quest
        }
      })
      return campaignData as Campaign
    } catch (error) {
      console.error(error)
    }
  },

  enrollCampaign: async (id: string) => {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/campaign/${id}/enroll`)
    return data
  },
}
