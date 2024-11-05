import '@interchain-ui/react/styles'
import '@radix-ui/themes/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import HeadComponent from 'components/Head'
import MaintainPage from 'components/pages/maintainPage'
import moment from 'moment'
import 'moment/locale/vi'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import getConfig, { setConfig } from 'next/config'
import { Inter, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ContextProvider, { Context } from 'src/context'
import { getWagmiConfig } from 'src/services/wagmi/config'
import 'src/styles/globals.scss'
import { WagmiProvider } from 'wagmi'
const ws = Work_Sans({ subsets: ['latin', 'vietnamese'] })
export const inter = Inter({ subsets: ['latin', 'vietnamese'] })
const orbitron = localFont({
  src: [
    {
      path: '../assets/fonts/Orbitron_Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Orbitron_Medium.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Orbitron_Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const masgistral = localFont({
  src: [
    {
      path: '../assets/fonts/FS_Magistral-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/FS_Magistral-Book.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/FS_Magistral-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})
const atlantis = localFont({
  src: [
    {
      path: '../assets/fonts/AtlantisInternational.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})
const jaro = localFont({
  src: [
    {
      path: '../assets/fonts/Jaro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})
function MyApp(props: AppProps) {
  const [isSetting, setIsSetting] = useState(true)
  const { locale } = useRouter()
  const [wagmiConfig, setWagmiConfig] = useState<any>()
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const { data: config } = await axios.get('/config.json')
    setConfig(config)
    setWagmiConfig(getWagmiConfig(config.WALLET_CONNECT_PROJECT_ID))
    setIsSetting(false)
  }
  useEffect(() => {
    if (locale == 'vn') {
      moment.locale('vi')
    } else {
      moment.locale('en')
    }
  }, [locale])
  if (isSetting) {
    const Component = props.Component
    return (
      <>
        <HeadComponent />
        <Component {...props} justHead />
      </>
    )
  }
  if (getConfig().IN_MAINTENANCE_MODE) {
    return (
      <>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
          .font-ws {
            font-family: ${ws.style.fontFamily};
          }
        `}</style>
        <HeadComponent />
        <MaintainPage />
      </>
    )
  }
  return (
    <>
      <HeadComponent />
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        .font-ws {
          font-family: ${ws.style.fontFamily};
        }
        .font-orbitron {
          font-family: ${orbitron.style.fontFamily};
        }
        .font-masgistral {
          font-family: ${masgistral.style.fontFamily};
        }
        .font-atlantis {
          font-family: ${atlantis.style.fontFamily};
        }
        .font-jaro {
          font-family: ${jaro.style.fontFamily};
        }
      `}</style>
      <ToastContainer />

      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={new QueryClient()}>
          <CookiesProvider
            defaultSetOptions={{
              path: '/',
              domain:
                location.hostname == 'localhost' ? 'localhost' : getConfig().REDIRECT_URL.replace('https://', '.'),
            }}>
            <ContextProvider>
              <App {...props} />
            </ContextProvider>
          </CookiesProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
const App = ({ Component, pageProps }: AppProps) => {
  const { isSettingUp } = useContext(Context)

  useEffect(() => {
    const scriptElement = document.createElement('script')
    scriptElement.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${getConfig()['GTM_ID']}');`
    document.head.append(scriptElement)
    const noscriptElement = document.createElement('noscript')
    noscriptElement.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${
      getConfig()['GTM_ID']
    }" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    document.body.append(noscriptElement)
  }, [])

  if (isSettingUp) {
    return <></>
  }
  const getLayout = (Component as any).getLayout ?? ((page) => page)

  if (pageProps.justHead) return <Component {...pageProps} />

  return getLayout(<Component {...pageProps} />)
}
export default appWithTranslation(MyApp)
