import { useAuthorizer } from "@authorizerdev/authorizer-react"
import { useRouter } from "next/router"
import { useContext } from "react"
import { Context } from "src/context"
import useApi from "src/hooks/useApi"
import { getItem } from "src/utils/localStorage"
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { query } = useRouter()
  const { account } = useContext(Context)
  const { authorizerRef } = useAuthorizer()
  const getProfile = async () => {
    const token = getItem("token")
    const res = await authorizerRef.getProfile({
      Authorization: `Bearer ${token}`,
    })
    if (res) {
      return res
    }
  }
  const profile = useApi<any>(getProfile, !!account, [account])
  return <Component {...props} profile={profile} />
}

export default withApi
