export type Campain = {
  id: string
  name: string
  campaign_quests: Quest[]
}
export type Quest = {
  id: string
  type: 'Once' | 'Weekly'
  status: string
  name: string
  unlock: boolean
  condition: {
    duration?: {
      after?: string
      before?: string
    }
  }
  requirement: {
    read?: {
      chapter_id?: string
      manga_id?: string
    }
  }
  reward: {
    nft?: {
      img_url: string
      img_name: string
    }
    xp?: number
  }
}
