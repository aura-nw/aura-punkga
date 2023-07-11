import { useState, useEffect, DependencyList, useContext } from "react"
import { Context } from "src/context"
export default function useApi<T>(action, actionCondition: boolean, deps?: DependencyList) {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<T | null | undefined>(undefined)

  const { isSettingUp } = useContext(Context)

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
    if (!isSettingUp) {
      callApi()
    }
  }, [...deps, isSettingUp] || [isSettingUp])
  return { loading, data, callApi }
}
