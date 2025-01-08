import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { Authorizer } from '@authorizerdev/authorizer-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import BackgroundAudio from 'components/pages/event/ava-2024/BackgroundAudio'
import { createClient } from 'graphql-ws'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { toast } from 'react-toastify'
import { SiweMessage, generateNonce } from 'siwe'
import { IUser } from 'src/models/user'
import { getProfile as getProfileService } from 'src/services'
import { storyChain } from 'src/services/wagmi/config'
import { oauthLogin } from 'src/utils'
import { getItem, removeItem, setItem } from 'src/utils/localStorage'
import { useAccount, useChainId, useDisconnect, useSignMessage, useSwitchChain } from 'wagmi'
import ListProvider from './list'
import ModalProvider from './modals'

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
  connectHandler: (data?: any) => Promise<any>
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
  resetPassword: async () => {},
  connectHandler: async () => {},
})
export const privateAxios = axios.create()
function ContextProvider({ children }: any) {
  const { address } = useAccount()
  const chainId = useChainId()
  const { signMessage } = useSignMessage()
  const { switchChain } = useSwitchChain()
  const { disconnectAsync } = useDisconnect()
  const [account, setAccount] = useState<IUser>()
  const [wallet, setWallet] = useState<string>()
  const [, setLevel] = useState(undefined)
  const [isSettingUp, setIsSettingUp] = useState(true)
  const router = useRouter()
  const config = getConfig()
  const authorizerRef = new Authorizer({
    authorizerURL: config.AUTHORIZER_URL,
    redirectURL: location.href || config.REDIRECT_URL,
    clientID: config.AUTHORIZER_CLIENT_ID,
  })

  const httpLink = new HttpLink({
    uri: `${config.API_URL}/v1/graphql`,
  })
  useEffect(() => {
    setLevel((prev) => {
      if (typeof prev != 'undefined' && account?.level) {
        if (prev != +account?.level) {
          toast(
            router.locale == 'vn'
              ? `Chúc mừng! Bạn đã lên level ${account?.level}!🎉`
              : `Congratulations! You've reached level ${account?.level}!🎉`,
            {
              type: 'success',
            }
          )
        }
      }
      return account?.level
    })
  }, [account?.level])
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
    console.log('Setting up punkga')
    setUp()
  }, [])

  const connectHandler = async (data: any) => {
    try {
      let targetChainId = config.DEFAULT_CHAIN_ID
      if (location.pathname.includes('ava-2024')) {
        targetChainId = storyChain.id
      }
      if (chainId != targetChainId && targetChainId != undefined) {
        switchChain(
          {
            chainId: targetChainId,
          },
          {
            onSuccess: () => signConnectMessage(data),
            onError: (error) => console.error(error),
          }
        )
      } else {
        signConnectMessage(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const signConnectMessage = (data?: any) => {
    const domain = window.location.hostname
    const origin = window.location.origin
    const statement =
      chainId == storyChain.id ? 'Sign in with Story Network to the app.' : 'Sign in with Aura Network to the app.'
    const addr = data?.accounts[0] || address
    const siweMessage = new SiweMessage({
      scheme: undefined,
      domain,
      address: addr,
      statement,
      uri: origin,
      version: '1',
      chainId,
      nonce: generateNonce(),
    })
    const message = siweMessage.prepareMessage()
    signMessage(
      { message, account: addr },
      {
        onSuccess: (data) =>
          getTokenFromSiwe({
            message,
            signature: data,
          }),
      }
    )
  }

  const getTokenFromSiwe = async ({ message, signature }) => {
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
        await getProfile()
      }
    } catch (error) {
      console.log('resendVerifyEmail', error)
      return null
    }
  }

  const getTokens = async () => {
    try {
      const tokens = await authorizerRef.getSession()
      setItem('token', tokens.access_token, new Date(Date.now() + tokens.expires_in))
      return tokens
    } catch (error) {
      return null
    }
  }

  const setUp = async () => {
    try {
      setIsSettingUp(true)
      await getTokens()
      privateAxios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true
            try {
              const tokens = await getTokens()
              if (tokens) {
                prevRequest.headers['Authorization'] = `Bearer ${tokens.access_token}`
                return privateAxios(prevRequest)
              } else {
                throw new Error('Unauthorized access token')
              }
            } catch (error) {
              removeItem('token')
              return Promise.reject(error)
            }
          }
          return Promise.reject(error)
        }
      )
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
      if (location.pathname.includes('reset_password') || location.pathname.includes('verified')) {
        await authorizerRef.logout()
        removeItem('current_reading_manga')
        setAccount(undefined)
      } else {
        await getProfile()
      }
      setIsSettingUp(false)
    } catch (error) {
      setIsSettingUp(false)
      console.log('setUp', error)
      return null
    }
  }

  const getProfile = async () => {
    try {
      const token = getItem('token')
      if (!token) {
        const tokens = await getTokens()
        if (!tokens) return
      }
      const res = await getProfileService()
      if (res?.id) {
        setAccount(undefined)
        if (res.wallet_address) {
          setWallet(res.wallet_address)
        }
        setAccount({
          email: res.email,
          name: res.nickname,
          image: res.picture,
          creator: res.creator,
          verified: !!res.email_verified_at,
          id: res.id,
          gender: res.gender || '',
          birthdate: res.birthdate,
          bio: res.bio,
          socialAccount: {
            twitter: res.authorizer_users_twitter_accounts[0],
            discord: res.authorizer_users_discord_accounts[0],
          },
          signupMethods: res.signup_methods,
          custodialWalletAddress: res.authorizer_users_user_wallet?.address,
          xp: res.levels.find((level) => level.user_level_chain.punkga_config.reward_point_name == 'XP')?.xp || 0,
          kp: res.levels.find((level) => level.user_level_chain.punkga_config.reward_point_name == 'KP')?.xp || 0,
          sf: res.levels.find((level) => level.user_level_chain.punkga_config.reward_point_name == 'SF')?.xp || 0,
          level:
            res.levels?.find((level) => level.user_level_chain.punkga_config.reward_point_name == 'XP')?.level || 0,
          levels: res.levels?.map((v) => ({
            level: v.level,
            xp: v.xp,
            chain: v.user_level_chain.punkga_config.reward_point_name,
          })),
          completedQuests: res.user_quests || [],
          quests: res?.user_quests_aggregate?.aggregate?.count,
          rank: res.rank || 999999,
          activeWalletAddress: res.active_wallet_address,
          noncustodialWalletAddress: res.wallet_address,
          tonWalletAddress: res.ton_wallet_address,
          activities: res?.punkga_wallets?.[0]?.punkga_wallet_activities,
        } as IUser)
      }
      return res
    } catch (error) {
      console.log('getProfile', error)
    }
  }

  const login = async (email: string, password: string, callback?: (status: string, msg?: string) => void) => {
    try {
      const res = await authorizerRef.login({
        email: email,
        password: password,
        scope: ['offline_access'],
      })
      if (res) {
        callback && callback('success')
        getProfile()
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
      await oauthLogin(provider, undefined, location.href || config.REDIRECT_URL, 'offline_access')
      // if (provider == 'zalo') {
      //   await oauthLogin('zalo', undefined, location.href || config.REDIRECT_URL, 'offline_access')
      // } else {
      //   await authorizerRef.oauthLogin(provider)
      // }
    } catch (error) {
      callback && callback('failed')
      console.log('oauth error: ' + error)
    }
  }

  const logout = async () => {
    try {
      await authorizerRef.logout()
      await disconnectAsync()
      removeItem('current_reading_manga')
      removeItem('token')
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

  if (isSettingUp) {
    return null
  }
  return (
    <GoogleReCaptchaProvider reCaptchaKey={config.RECAPCHA_SITE_KEY}>
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
          connectHandler,
        }}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={client}>
            <ModalProvider>
              <ListProvider>
                {location.pathname.includes('events/ava-2024') && <BackgroundAudio />}
                {children}
              </ListProvider>
            </ModalProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </Context.Provider>
    </GoogleReCaptchaProvider>
  )
}
export default ContextProvider
