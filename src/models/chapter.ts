import { IMultiLanguageContent } from "./multiLanguageContent"
import { IStatus } from "./status"

export interface IChapter {
  id: string
  number: number
  name: string
  type: "Free"
  status: IStatus
  thumbnail: string
  pages: IMultiLanguageContent<string[]>
  views: number
  likes: number
  comments: number
}
