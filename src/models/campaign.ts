export type Campaign = {
  id: string
  slug: string
  campaignQuests?: Quest[]
  reward: {
    xp: number
    nft?: {
      img_name?: string
      img_url?: string
      nft_name?: string
      ipfs?: string
    }
  }
  start_date: string
  end_date: string
  status: string
  campaign_user: any[]
  user_campaign_rewards: any[]
  participants: { aggregate: { count: number } }
  en?: {
    seo?: {
      title?: string
      description?: string
      thumbnail_url?: string
    }
    name?: string
    description?: string
    thumbnail_url?: string
  }
  vn?: {
    seo?: {
      title?: string
      description?: string
      thumbnail_url?: string
    }
    name?: string
    description?: string
    thumbnail_url?: string
  }
}
export type Quest = {
  id: string
  repeat: 'Once' | 'Daily'
  type: 'Read' | 'Comment' | 'Subscribe' | 'Like' | 'Poll' | 'Quiz' | 'Empty'
  reward_status: 'NOT_SATISFY' | 'CAN_CLAIM' | 'CLAIMED' | 'OUT_OF_SLOT'
  status: string
  created_at: string
  unlock: boolean
  quest_reward_claimed: number
  en?: {
    name?: string
    description?: string
  }
  vn?: {
    name?: string
    description?: string
  }
  condition: {
    quest_id?: number
    level?: number
    requiredQuest?: Quest
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
    like?: {
      manga?: {
        slug: string
        title: string
      }
    }
    quiz: {
      multiple_choice: {
        question: string
        correct_answer: string
        wrong_answer: string[]
      }[]
    }
  }
  reward: {
    nft?: {
      img_url: string
      nft_name: string
    }
    xp: number
    slots?: number
  }
  repeat_quests?: {
    repeat_quest_reward_claimed: number
  }[]
}
