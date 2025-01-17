import { createContext, useState } from 'react'
export const ArtworkListContext = createContext<{
  data: {
    list: any[]
    offset: number
    remaining: boolean
  }
  setData?: (data: any) => void
}>({
  data: {
    list: [],
    offset: 0,
    remaining: true,
  },
  setData: () => {},
})
function ArtworkListProvider({ children }) {
  const [artworkData, setArtworkData] = useState({
    list: [],
    offset: 0,
    remaining: true,
  })
  return (
    <ArtworkListContext.Provider
      value={{
        data: artworkData,
        setData: (newData) => {
          setArtworkData((prev) => {
            return { ...prev, ...newData }
          })
        },
      }}>
      {children}
    </ArtworkListContext.Provider>
  )
}
export default ArtworkListProvider
