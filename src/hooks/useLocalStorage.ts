import { useEffect, useState } from 'react'
import { getItem, setItem } from 'src/utils/localStorage'

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue)

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      setItem(key, valueToStore)
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }
      const value = getItem(key)
      setState(value ?? initialValue)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue] as [T, (value: T) => void]
}

export default useLocalStorage
