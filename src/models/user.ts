export interface IUser {
  email: string
  name?: string
  image?: string
  id: string
  verified: boolean
  gender: string
  birthdate?: string
  bio?: string
  signupMethods: string
  custodialWalletAddress: string
  noncustodialWalletAddress?: string
  xp: number
  kp: number
  level: number
  levels: {
    chain: string
    xp: number
    level: number
    user_level_chain: {
      id: number
      name: string
      punkga_config: {
        reward_point_name: string
        explorer: {
          account_path: string
          base_url: string
          tx_path: string
        }
      }
    }
  }[]
  completedQuests: any[]
  quests: any
  rank: number
  activeWalletAddress: string
}
