export interface IComment {
  id: string
  content: string
  createAt: Date
  replies: IReply[]
  author: {
    id: string
    nickname: string
    image?: string
  }
}
export interface IReply {
  content: string
  createAt: Date
  author: {
    id: string
    nickname: string
    image?: string
  }
}