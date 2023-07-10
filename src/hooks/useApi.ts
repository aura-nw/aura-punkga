import { useState, useEffect, DependencyList } from "react"
export default function useApi<T>(action, actionCondition: boolean, deps?: DependencyList) {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<T | null | undefined>(undefined)
  const callApi = async (skipLoading?: boolean) => {
    try {
      if (actionCondition) {
        !skipLoading && setLoading(true)
        const res = await action()
        if (res) {
          setData(res)
        } else {
          setData(null)
        }
        !skipLoading && setLoading(false)
      }
    } catch (error) {
      setData(null)
      !skipLoading && setLoading(false)
      console.log("useApi", error)
    }
  }

  useEffect(() => {
    callApi()
  }, deps || [])
  return { loading, data, callApi }
}
