import { createContext, useState } from 'react'
export const ListContext = createContext<{
  characterData: {
    list: any[]
    page: number
    remaining: boolean
    search: string
  }
  setCharacterData?: (characterData: any) => void
}>({
  characterData: {
    list: [],
    page: 0,
    remaining: true,
    search: '',
  },
  setCharacterData: () => {},
})
function ListProvider({ children }) {
  const [characterData, setCharacterData] = useState({
    list: [],
    page: 1,
    remaining: true,
    search: '',
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
