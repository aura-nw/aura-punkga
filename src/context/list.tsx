import { createContext, useState } from 'react'
export const ListContext = createContext<{
  characterData: {
    list: any[]
    page: number
    remaining: boolean
  }
  setCharacterData?: (characterData: any) => void
}>({
  characterData: {
    list: [],
    page: 0,
    remaining: true,
  },
  setCharacterData: () => {},
})
function ListProvider({ children }) {
  const [characterData, setCharacterData] = useState({
    list: [],
    page: 1,
    remaining: true,
  })
  return (
    <ListContext.Provider
      value={{
        characterData,
        setCharacterData: (newCharacterData) => setCharacterData((prev) => ({ ...prev, ...newCharacterData })),
      }}>
      {children}
    </ListContext.Provider>
  )
}
export default ListProvider
