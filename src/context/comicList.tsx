import { createContext, useState } from 'react'
export const ComicListContext = createContext<{
  latestData: {
    list: any[]
    offset: number
    remaining: boolean
    selectedTags?: any[]
    selectedStatus?: any[]
  }
  setLatestData?: (data: any) => void
}>({
  latestData: {
    list: [],
    offset: 0,
    remaining: true,
    selectedTags: [],
    selectedStatus: [],
  },
  setLatestData: () => {},
})
function ComicListProvider({ children }) {
  const [latestMangaData, setLatestMangaData] = useState({
    list: [],
    offset: 0,
    remaining: true,
    selectedTags: [],
    selectedStatus: [],
  })
  return (
    <ComicListContext.Provider
      value={{
        latestData: latestMangaData,
        setLatestData: (newData) => {
          setLatestMangaData((prev) => {
            return { ...prev, ...newData }
          })
        },
      }}>
      {children}
    </ComicListContext.Provider>
  )
}
export default ComicListProvider
