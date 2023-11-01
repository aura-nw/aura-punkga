export type Campaign = {
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
  description?: string
  condition: {
    after?: string
    before?: string
    level?: number
  }
  requirement: {
    read?: {
      chapter?: {
        number: number
        title: string
      }
      manga?: {
        slug: string
        title: string
      }
    }
    comment?: {
      chapter?: {
        number: number
        title: string
      }
      manga?: {
        slug: string
        title: string
      }
    }
    subscribe?: {
      manga?: {
        slug: string
        title: string
      }
    }
  }
  reward: {
    nft?: {
      img_url: string
      nft_name: string
    }
    xp?: number
  }
}
