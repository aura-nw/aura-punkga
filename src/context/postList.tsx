import { createContext, useState } from 'react'
export const PostListContext = createContext<{
  postList: {
    list: any[]
    offset: number
    remaining: boolean
    search: string
  }
  likedList: any[]
  setLikedList?: (likedList: any) => void
  setPostData?: (postList: any) => void
}>({
  postList: {
    list: [],
    offset: 0,
    remaining: true,
    search: '',
  },
  likedList: [],
  setLikedList: () => {},
  setPostData: () => {},
})
function MangaListProvider({ children }) {
  const [postList, setPostListData] = useState({
    list: [],
    offset: 0,
    remaining: true,
    search: '',
  })
  const [likedList, setLikedList] = useState([])
  return (
    <PostListContext.Provider
      value={{
        postList,
        setPostData: (newData) => setPostListData((prev) => ({ ...prev, ...newData })),
        likedList,
        setLikedList,
      }}>
      {children}
    </PostListContext.Provider>
  )
}
export default MangaListProvider
