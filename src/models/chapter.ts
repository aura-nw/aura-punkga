import { IMultiLanguageContent } from "./multiLanguageContent"
import { IStatus } from "./status"

export interface IChapter {
  id: string
  number: number
  name: string
  type: 'Free'
  status: string
  thumbnail: string
  pages: IMultiLanguageContent<string[] | null>
  views: number
  likes: number
  comments: number
  isLiked: boolean
  date: Date
}
