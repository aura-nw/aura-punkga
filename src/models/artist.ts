import { IComic } from './comic'

export interface IArtist {
  id: string
  name?: string
  penName: string
  bio?: string
  dob?: string
  gender?: string
  avatar?: string
  joinDate?: string
  totalSubscribers: number
  link: {
    website?: string
    behance?: string
  }
  collections?: {
    name: string
    address: string
    tokens: {
      image: string
      name: string
      id: number
    }[]
  }[]
  comics: IComic[]
}
