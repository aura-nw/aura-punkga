import { useAuthorizer } from "@authorizerdev/authorizer-react"
import { Key } from "@keplr-wallet/types"
import { createContext, useEffect, useRef, useState } from "react"
import { IUser } from "src/models/user"
import { handleConnectWallet } from "src/utils/signer"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import config from "public/config.json"
export const Context = createContext(null)

function ContextProvider({ children }) {
  const [account, setAccount] = useState<IUser>()
  const [wallet, setWallet] = useState<string>()
  const key = useRef<Key>()
  const [provider, setProvider] = useState<"Coin98" | "Keplr">()
  const { authorizerRef, user, setUser } = useAuthorizer()
  const router = useRouter()

  const searchParams = useSearchParams()
  const accessTokenParam = searchParams.get("access_token")

  useEffect(() => {
    if (user?.id)
      setAccount({
        email: user.email,
        name: user.nickname,
        image: user.picture,
      } as IUser)
  }, [user])

  useEffect(() => {
    setUp()
  }, [])

  const setUp = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      await getProfile(token)
    }
    const connectedProvider = localStorage.getItem("connected_provider") as "Coin98" | "Keplr"
    if (connectedProvider) {
      await getWallet(connectedProvider)
      await connectWallet()
    }
  }

  useEffect(() => {
    if (accessTokenParam) {
      localStorage.setItem("token", accessTokenParam)
      getProfile(accessTokenParam)
    }
  }, [accessTokenParam])

  const getProfile = async (token: string) => {
    try {
      const res = await authorizerRef.getProfile({
        Authorization: `Bearer ${token}`,
      })
      if (res) {
        setAccount({
          email: res.email,
          name: res.nickname,
          image: res.picture,
        } as IUser)
      }
    } catch (error) {
      console.log("getProfile", error)
    }
  }

  const getWallet = async (p: "Coin98" | "Keplr") => {
    if (p == "Coin98" && !window.coin98?.keplr) {
      alert("Please install Coin98 wallet extension.")
      return
    }
    if (p == "Keplr" && !window.keplr) {
      alert("Please install Keplr wallet extension.")
      return
    }
    setProvider(p)
    const keplr = p == "Coin98" ? window.coin98?.keplr : window.keplr
    await keplr.experimentalSuggestChain(JSON.parse(config.CHAIN_INFO))
    await keplr.enable(config.CHAIN_ID)
    key.current = await keplr.getKey(config.CHAIN_ID)
    return key.current.bech32Address
  }

  const connectWallet = async (callback?: () => void) => {
    try {
      const keplr = provider == "Coin98" ? window.coin98?.keplr : window.keplr
      const res = await handleConnectWallet(keplr, key.current)
      localStorage.setItem("connected_provider", provider)
      if (res) {
        setWallet(key.current.bech32Address)
        callback && callback()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const unlinkWallet = async (callback?: () => void) => {
    localStorage.removeItem("connected_provider")
    key.current = null
    setWallet(null)
    setProvider(null)
  }

  const login = async (email: string, password: string, callback?: (status: string) => void) => {
    try {
      const res = await authorizerRef.login({
        email: email,
        password: password,
      })
      if (res) {
        callback && callback("success")
        localStorage.setItem("token", res.access_token)
        setUser(res.user)
      }
    } catch (error) {
      callback && callback("failed")
      console.log("login error: " + error)
    }
  }

  const oauth = async (provider: string, callback?: (status: string) => void) => {
    try {
      const res = await authorizerRef.oauthLogin(provider)
      console.log("oauth", res)
    } catch (error) {
      callback && callback("failed")
      console.log("oauth error: " + error)
    }
  }

  const logout = async (callback?: () => void) => {
    localStorage.removeItem("token")
    setAccount(null)
    setUser(null)
    unlinkWallet()
    router.push(location.origin + location.pathname)
  }

  const signUp = async (username: string, email: string, password: string, callback?: (status: string) => void) => {
    try {
      const res = await authorizerRef.signup({
        nickname: username,
        email: email,
        password: password,
        confirm_password: password,
      })
      if (res) {
        callback && callback("success")
        setUser(res.user)
      }
    } catch (error) {
      callback && callback("failed")
      console.log("sign up error: " + error)
    }
  }

  return (
    <Context.Provider value={{ account, wallet, getWallet, connectWallet, unlinkWallet, login, oauth, logout, signUp }}>
      {children}
    </Context.Provider>
  )
}
export default ContextProvider
