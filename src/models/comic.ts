import { LANGUAGE } from "src/constants"
import { IMultiLanguageContent } from "./multiLanguageContent"
import { IStatus } from "./status"
import { IChapter } from "./chapter"

interface Basic {
  id: string
  image: string
  status: IStatus
  authors: string[]
  tags: IMultiLanguageContent<string>[]
  views: number
  likes: number
  releaseDate?: string
  nearestUpcoming?: string
  latestChap: {
    number: number
    id: string
    pushlishDate?: string | number | Date
  }
}

export interface IComic
  extends Basic,
    IMultiLanguageContent<{
      title: string
      description: string
    }> {}

interface Detail {
  cover: string
  languages: Array<
    (typeof LANGUAGE)[number] & {
      isMainLanguage: boolean
    }
  >
  chapters: IChapter[]
  isSubscribe?: boolean
}

export interface IComicDetail
  extends Basic,
    Detail,
    IMultiLanguageContent<{
      title: string
      description: string
    }> {}
