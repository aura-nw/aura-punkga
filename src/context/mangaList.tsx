import { createContext, useState } from 'react'
export const MangaListContext = createContext<{
  mangaList: {
    list: any[]
    offset: number
    remaining: boolean
    search: string
  }
  setMangaData?: (mangaList: any) => void
}>({
  mangaList: {
    list: [],
    offset: 0,
    remaining: true,
    search: '',
  },
  setMangaData: () => {},
})
function MangaListProvider({ children }) {
  const [mangaList, setMangaListData] = useState({
    list: [],
    offset: 0,
    remaining: true,
    search: '',
  })
  return (
    <MangaListContext.Provider
      value={{
        mangaList,
        setMangaData: (newData) => setMangaListData((prev) => ({ ...prev, ...newData })),
      }}>
      {children}
    </MangaListContext.Provider>
  )
}
export default MangaListProvider
