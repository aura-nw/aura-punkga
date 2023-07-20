import { useAuthorizer } from '@authorizerdev/authorizer-react'
import { Key } from '@keplr-wallet/types'
import axios from 'axios'
import getConfig from 'next/config'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { createContext, useEffect, useRef, useState } from 'react'
import { IUser } from 'src/models/user'
import { getItem, removeItem, setItem } from 'src/utils/localStorage'
import { handleConnectWallet } from 'src/utils/signer'
export const Context = createContext(null)

function ContextProvider({ children }) {
  const [account, setAccount] = useState<IUser>()
  const [wallet, setWallet] = useState<string>()
  const [isSettingUp, setIsSettingUp] = useState(true)
  const key = useRef<Key>()
  const [provider, setProvider] = useState<'Coin98' | 'Keplr'>()
  const { authorizerRef, user, setUser } = useAuthorizer()
  const router = useRouter()
  const config = getConfig()

  const searchParams = useSearchParams()
  const accessTokenParam = searchParams.get('access_token')
  const expiresInParam = searchParams.get('expires_in')
  useEffect(() => {
    if (user?.id)
      setAccount({
        email: user.email,
        name: user.nickname,
        image: user.picture,
        id: user.id,
        verified: user.email_verified,
      } as IUser)
  }, [user])

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = getItem('token')
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )
  }, [])

  useEffect(() => {
    if (location.search.includes('access_token')) {
      if (accessTokenParam) {
        console.log('Setting up punkga with access token')
        setUp()
      }
    } else {
      console.log('Setting up punkga')
      setUp()
    }
  }, [accessTokenParam])

  const setLogoutTimeout = (timeout: any) => {
    if (window.logoutTimeoutId) {
      clearTimeout(window.logoutTimeoutId)
    }
    window.logoutTimeoutId = setTimeout(
      () => {
        setAccount(null)
      },
      timeout > 86400000 ? 86400000 : timeout
    )
  }

  const setUp = async () => {
    setIsSettingUp(true)
    if (accessTokenParam) {
      setItem('token', accessTokenParam, new Date(Date.now() + (expiresInParam ? +expiresInParam * 1000 : 10800000)))
      setLogoutTimeout(expiresInParam ? +expiresInParam * 1000 : 10800000)
      router.push(location.pathname)
    } else {
      const token = getItem('token')
      if (token) {
        const t = localStorage.getItem('token')
        setLogoutTimeout(new Date(JSON.parse(t).exprire).getTime() - Date.now())
        await getProfile(token)
        const connectedProvider = getItem('connected_provider') as 'Coin98' | 'Keplr'
        if (connectedProvider) {
          await getWallet(connectedProvider)
          await connectWallet()
        }
      }
    }
    setIsSettingUp(false)
  }

  const getProfile = async (token?: string) => {
    try {
      const t = token || getItem('token')
      if (!t) {
        throw new Error('Unauthorized access token')
      }
      const res = await authorizerRef.getProfile({
        Authorization: `Bearer ${t}`,
      })
      if (res) {
        setAccount({
          email: res.email,
          name: res.nickname,
          image: res.picture,
          id: res.id,
          verified: res.email_verified,
        } as IUser)
      }
      return res
    } catch (error) {
      removeItem('token')
      console.log('getProfile', error)
    }
  }
  const getWallet = async (p: 'Coin98' | 'Keplr') => {
    if (p == 'Coin98' && !window.coin98?.keplr) {
      alert('Please install Coin98 wallet extension.')
      return
    }
    if (p == 'Keplr' && !window.keplr) {
      alert('Please install Keplr wallet extension.')
      return
    }
    setProvider(p)
    const keplr = p == 'Coin98' ? window.coin98?.keplr : window.keplr
    await keplr.experimentalSuggestChain(JSON.parse(getConfig().CHAIN_INFO))
    await keplr.enable(getConfig().CHAIN_ID)
    key.current = await keplr.getKey(getConfig().CHAIN_ID)
    return key.current.bech32Address
  }

  const connectWallet = async (callback?: () => void) => {
    try {
      const keplr = provider == 'Coin98' ? window.coin98?.keplr : window.keplr
      const res = await handleConnectWallet(keplr, key.current)
      setItem('connected_provider', provider)
      if (res) {
        setWallet(key.current.bech32Address)
        callback && callback()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const unlinkWallet = async (callback?: () => void) => {
    removeItem('connected_provider')
    key.current = null
    setWallet(null)
    setProvider(null)
  }

  const login = async (email: string, password: string, callback?: (status: string, msg?: string) => void) => {
    try {
      const res = await authorizerRef.login({
        email: email,
        password: password,
      })
      if (res) {
        callback && callback('success')
        setItem('token', res.access_token, new Date(Date.now() + res.expires_in * 1000))
        setLogoutTimeout(res.expires_in * 1000)
        setUser(res.user)
      }
    } catch (error) {
      callback && callback('failed', error.message)
      console.log('login error: ' + error)
    }
  }

  const oauth = async (provider: string, callback?: (status: string) => void) => {
    try {
      await authorizerRef.oauthLogin(provider)
    } catch (error) {
      callback && callback('failed')
      console.log('oauth error: ' + error)
    }
  }

  const logout = async (callback?: () => void) => {
    removeItem('token')
    removeItem('current_reading_manga')
    setAccount(null)
    setUser(null)
    unlinkWallet()
    router.push(location.origin + location.pathname)
  }

  const signUp = async (
    username: string,
    email: string,
    password: string,
    callback?: (status: string, msg?: string) => void
  ) => {
    try {
      const res = await authorizerRef.signup({
        nickname: username,
        email: email,
        password: password,
        confirm_password: password,
        redirect_uri: config.REDIRECT_URL + '/verified',
      })
      if (res) {
        callback && callback('success')
        setUser(res.user)
      }
    } catch (error) {
      callback && callback('failed', error.message)
      console.log('sign up error: ' + error)
    }
  }

  const updateProfile = async (data: any) => {
    const token = getItem('token')
    const res = await authorizerRef.updateProfile(data, {
      Authorization: `Bearer ${token}`,
    })
    if (res) {
      await getProfile()
    }
    return res
  }

  return (
    <Context.Provider
      value={{
        account,
        wallet,
        getWallet,
        connectWallet,
        unlinkWallet,
        login,
        oauth,
        logout,
        signUp,
        isSettingUp,
        updateProfile,
      }}>
      {children}
    </Context.Provider>
  )
}
export default ContextProvider
