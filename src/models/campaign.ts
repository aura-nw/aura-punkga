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
  condition: {
    duration?: {
      after?: string
      before?: string
    }
    level?: number
  }
  requirement: {
    read?: {
      chapter?: {
        chapter_number: number
        chapter_name: string
      }
      manga?: {
        slug: string
        title: string
      }
    }
    comment?: {
      chapter?: {
        chapter_number: number
        chapter_name: string
      }
      manga?: {
        slug: string
        title: string
      }
    }
    subscribe?: {
      slug: string
      title: string
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
