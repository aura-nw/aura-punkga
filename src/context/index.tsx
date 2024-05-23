import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { Authorizer } from '@authorizerdev/authorizer-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { createClient } from 'graphql-ws'
import getConfig from 'next/config'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IUser } from 'src/models/user'
import { getProfile as getProfileService } from 'src/services'
import { oauthLogin } from 'src/utils'
import { getItem, removeItem, setItem } from 'src/utils/localStorage'
import ModalProvider from './modals'
import { useAccount, useChainId, useDisconnect, useSignMessage } from 'wagmi'
import { SiweMessage, generateNonce } from 'siwe'
import { BrowserProvider } from 'ethers'
import StoryProvider from './story'
const queryClient = new QueryClient()

export const Context = createContext<{
  account?: IUser
  wallet?: string
  login: (email: string, password: string, callback?: (status: string, msg?: string) => void) => Promise<any>
  oauth: (provider: string, callback?: (status: string) => void) => Promise<any>
  logout: () => Promise<any>
  signUp: (
    username: string,
    email: string,
    password: string,
    callback?: (status: string, msg?: string) => void
  ) => Promise<any>
  isSettingUp: boolean
  updateProfile: (data: any) => Promise<any>
  resendVerifyEmail: (email: string, identifier?: string) => Promise<any>
  getProfile: (token?: string) => Promise<any>
  forgotPassword: (email: string) => Promise<any>
  resetPassword: (token: string, newPassword: string) => Promise<any>
  getIPAsset: (user_id: string) => Promise<any>
  registerIPAsset: (user_id: string, nft_token_id: string, nft_contract_address: string, ip_asset_id: string) => Promise<any>
}>({
  account: undefined,
  wallet: undefined,
  login: async () => {},
  oauth: async () => {},
  logout: async () => {},
  signUp: async () => {},
  isSettingUp: true,
  updateProfile: async () => {},
  resendVerifyEmail: async () => {},
  getProfile: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => { },
  getIPAsset: async () => { },
  registerIPAsset: async () => { },
})
export const privateAxios = axios.create()
function ContextProvider({ children }: any) {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { signMessage } = useSignMessage()
  const { disconnect } = useDisconnect()
  const [account, setAccount] = useState<IUser>()
  const [wallet, setWallet] = useState<string>()
  const [isSettingUp, setIsSettingUp] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const accessTokenParam = searchParams.get('access_token') || searchParams.get('token')
  const expiresInParam = searchParams.get('expires_in')
  const config = getConfig()
  const authorizerRef = new Authorizer({
    authorizerURL: config.AUTHORIZER_URL,
    redirectURL: location.href || config.REDIRECT_URL,
    clientID: config.AUTHORIZER_CLIENT_ID,
  })

  const httpLink = new HttpLink({
    uri: `${config.API_URL}/v1/graphql`,
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `wss://${config.API_URL.split('//')[1]}/v1/graphql`,
    })
  )

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  })

  useEffect(() => {
    privateAxios.interceptors.request.use(
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
    if (location.search.includes('access_token') || location.search.includes('token')) {
      if (accessTokenParam) {
        console.log('Setting up punkga with access token')
        setUp()
      }
    } else {
      console.log('Setting up punkga')
      setUp()
    }
  }, [accessTokenParam])

  useEffect(() => {
    if (address && isConnected) {
      const domain = window.location.host
      const origin = window.location.origin
      const statement = 'Sign in with Ethereum to the app.'
      const siweMessage = new SiweMessage({
        scheme: undefined,
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId,
        nonce: generateNonce(),
      })
      const message = siweMessage.prepareMessage()
      signMessage(
        { message, account: address },
        {
          onSuccess: (data) =>
            getAccessToken({
              message,
              signature: data,
            }),
        }
      )
    }
  }, [address, isConnected])

  const getAccessToken = async ({ message, signature }) => {
    try {
      const res = await authorizerRef.graphqlQuery({
        query: `mutation Siwe {
          siwe(
              params: {
                  message: "${message.replace(/(?:\r\n|\r|\n)/g, '\\n')}"
                  signature: "${signature}"
              }
          ) {
              message
              should_show_otp_screen
              access_token
              id_token
              refresh_token
              expires_in
          }
      }`,
      })
      if (res?.siwe?.access_token) {
        const token = res?.siwe?.access_token
        setItem('token', res?.siwe?.access_token)
        setLogoutTimeout(res?.siwe?.expires_in)
        await getProfile(token)
      }
    } catch (error) {
      console.log('resendVerifyEmail', error)
      return null
    }
  }

  const setLogoutTimeout = (timeout: any) => {
    if (window.logoutTimeoutId) {
      clearTimeout(window.logoutTimeoutId)
    }
    window.logoutTimeoutId = setTimeout(
      () => {
        setAccount(undefined)
      },
      timeout > 86400000 ? 86400000 : timeout
    )
  }

  const setUp = async () => {
    try {
      setIsSettingUp(true)
      if (location.pathname.includes('reset_password') || location.pathname.includes('verified')) {
        await authorizerRef.logout()
        removeItem('token')
        removeItem('current_reading_manga')
        setAccount(undefined)
      } else {
        if (accessTokenParam) {
          setItem(
            'token',
            accessTokenParam,
            new Date(Date.now() + (expiresInParam ? +expiresInParam * 1000 : 10800000))
          )
          setLogoutTimeout(expiresInParam ? +expiresInParam * 1000 : 10800000)
          router.push(location.pathname)
        } else {
          const token = getItem('token')
          if (token) {
            const t = localStorage.getItem('token') as string
            setLogoutTimeout(new Date(JSON.parse(t).exprire).getTime() - Date.now())
            await getProfile(token)
          }
        }
      }
      setIsSettingUp(false)
    } catch (error) {
      console.log('setUp', error)
      return null
    }
  }

  const getProfile = async (token?: string) => {
    try {
      const t = token || getItem('token')
      if (!t) {
        throw new Error('Unauthorized access token')
      }
      const res = await getProfileService()
      if (res?.id) {
        if (res.wallet_address) {
          setWallet(res.wallet_address)
        }
        setAccount({
          email: res.email,
          name: res.nickname,
          image: res.picture,
          verified: !!res.email_verified_at,
          id: res.id,
          gender: res.gender || '',
          birthdate: res.birthdate,
          bio: res.bio,
          signupMethods: res.signup_methods,
          walletAddress: res.authorizer_users_user_wallet?.address,
          xp: res.levels?.[0]?.xp || 0,
          level: res.levels?.[0]?.level || 0,
          completedQuests: res.user_quests || [],
          quests: res?.user_quests_aggregate?.aggregate?.count,
          rank: res.rank || 999999,
          activeWalletAddress: res.active_wallet_address,
        } as IUser)
      }
      if (!res.email_verified_at && res.email && res.nickname) {
        removeItem('token')
      }
      return res
    } catch (error) {
      removeItem('token')
      console.log('getProfile', error)
    }
  }

  const login = async (email: string, password: string, callback?: (status: string, msg?: string) => void) => {
    try {
      const res = await authorizerRef.login({
        email: email,
        password: password,
      })
      if (res && !res?.user?.roles?.includes('admin')) {
        callback && callback('success')
        setItem('token', res.access_token, new Date(Date.now() + res.expires_in * 1000))
        setLogoutTimeout(res.expires_in * 1000)
        getProfile(res.access_token)
      } else {
        callback && callback('failed', 'Admin account cannot be used for user purposes')
      }
    } catch (error: any) {
      callback && callback('failed', error.message.includes('credentials') ? 'Wrong email or password' : error.message)
      console.log('login error: ' + error)
    }
  }

  const oauth = async (provider: string, callback?: (status: string) => void) => {
    try {
      if (provider == 'zalo') {
        await oauthLogin('zalo', undefined, location.href || config.REDIRECT_URL)
      } else {
        await authorizerRef.oauthLogin(provider)
      }
    } catch (error) {
      callback && callback('failed')
      console.log('oauth error: ' + error)
    }
  }

  const logout = async () => {
    try {
      await authorizerRef.logout()
      disconnect()
      removeItem('token')
      removeItem('current_reading_manga')
      setAccount(undefined)
      router.push(location.origin + location.pathname)
    } catch (error) {
      console.log('logout', error)
      return null
    }
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
      }
    } catch (error: any) {
      callback && callback('failed', error.message)
      console.log('sign up error: ' + error)
    }
  }

  const updateProfile = async (data: any) => {
    try {
      const token = getItem('token')
      const res = await authorizerRef.updateProfile(data, {
        Authorization: `Bearer ${token}`,
      })
      if (res) {
        await getProfile()
      }
      return res
    } catch (error: any) {
      console.log('update profile error: ' + error)
      throw new Error(error)
    }
  }
  const forgotPassword = async (email: string) => {
    try {
      const res = await authorizerRef.forgotPassword({
        email,
        redirect_uri: config.REDIRECT_URL + '/reset_password',
      })
      return res
    } catch (error) {
      console.log('forgotPassword', error)
      return error
    }
  }
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const res = await authorizerRef.resetPassword({
        token,
        password: newPassword,
        confirm_password: newPassword,
      })
      return res
    } catch (error) {
      console.log('resetPassword', error)
      return error
    }
  }
  async function resendVerifyEmail(email: string, identifier?: string) {
    try {
      await authorizerRef.graphqlQuery({
        query: `mutation ResendVerifyEmail($identifier: String!, $email: String!) {
        resend_verify_email(params: {identifier: $identifier, email: $email}) {
            message
        }
    }`,
        variables: {
          email,
          identifier,
        },
      })
    } catch (error) {
      console.log('resendVerifyEmail', error)
      return null
    }
  }
  const getIPAsset = async (user_id: string) => {
    try {
      const res = await privateAxios.get(`${config.API_URL}/api/rest/public/ip-assets?user_id=${user_id}`)
      return res
    } catch (error) {
      console.log('getIPAsset', error)
      return null
    }
   }

  const registerIPAsset = async (user_id: string, nft_token_id: string, nft_contract_address: string, ip_asset_id: string) => {
    try {
      const res = await privateAxios.post(`${config.API_URL}/api/rest/users/ip-assets`, {
        object: {
          user_id,
          nft_token_id,
          nft_contract_address,
          ip_asset_id
        }
      })
      return res
    } catch (error) {
      console.log('RegisterIPAsset', error)
      return null
    }
   }
  return (
    <Context.Provider
      value={{
        account,
        wallet,
        login,
        oauth,
        logout,
        signUp,
        isSettingUp,
        updateProfile,
        resendVerifyEmail,
        getProfile,
        forgotPassword,
        resetPassword,
        getIPAsset,
        registerIPAsset,
      }}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <StoryProvider>
            <ModalProvider>{children}</ModalProvider>
          </StoryProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </Context.Provider>
  )
}
export default ContextProvider
