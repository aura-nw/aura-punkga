export type Campaign = {
  id: string
  slug: string
  name: string
  campaign_quests?: Quest[]
  reward: {
    xp: number
    nft?: {
      img_name?: string
      img_url?: string
      nft_name?: string
      ipfs?: string
    }
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
  repeat: 'Once' | 'Daily'
  type: 'Read' | 'Comment' | 'Subscribe' | 'Like' | 'Poll' | 'Quiz' | 'Empty'
  reward_status: 'NOT_SATISFY' | 'CAN_CLAIM' | 'CLAIMED' | 'OUT_OF_SLOT'
  status: string
  name: string
  unlock: boolean
  description?: string
  quest_reward_claimed: number
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
}
