import { LANGUAGE } from 'src/constants'
import { IMultiLanguageContent } from './multiLanguageContent'
import { IStatus } from './status'
import { IChapter } from './chapter'

interface Basic {
  id: string
  image: string
  status: IStatus
  authors: {
    id?: string
    name: string
  }[]
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
  hasAccess: boolean
  languages: Array<
    (typeof LANGUAGE)[number] & {
      isMainLanguage: boolean
    }
  >
  chapters: IChapter[]
  collections: any[]
  isSubscribe?: boolean
}

export interface IComicDetail
  extends Basic,
    Detail,
    IMultiLanguageContent<{
      title: string
      description: string
    }> {}
