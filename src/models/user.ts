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
  }[]
  completedQuests: any[]
  quests: any
  rank: number
  activeWalletAddress: string
}
