export type Campaign = {
  id: string
  slug: string
  name: string
  campaign_quests?: Quest[]
  reward: {
    xp?: number
    img_name?: string
    img_url?: string
    nft_name?: string
    ipfs?: string
  }
  description?: string
  start_date: string
  end_date: string
  status: string
  campaign_user: any[]
  participants: { aggregate: { count: number } }
}
export type Quest = {
  id: string
  repeat: 'Once' | 'Weekly'
  type: 'Quiz' | 'Read'
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
