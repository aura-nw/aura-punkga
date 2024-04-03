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
  walletAddress: string
  xp: number
  level: number
  completedQuests: any[]
  quests: any
  rank: number
}
