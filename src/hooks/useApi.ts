import { useState, useEffect, DependencyList } from "react"
export default function useApi<T>(action, actionCondition: boolean, deps?: DependencyList) {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<T | null | undefined>(undefined)
  const runAction = async () => {
    try {
      if (actionCondition) {
        setLoading(true)
        const res = await action()
        if (res) {
          setData(res)
        } else {
          setData(null)
        }
        setLoading(false)
      }
    } catch (error) {
      setData(null)
      setLoading(false)
      console.log("useApi", error)
    }
  }

  useEffect(() => {
    runAction()
  }, deps || [])
  return { loading, data, runAction }
}
