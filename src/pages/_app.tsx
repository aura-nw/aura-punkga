import '@interchain-ui/react/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import HeadComponent from 'components/Head'
import MaintainPage from 'components/pages/maintainPage'
import moment from 'moment'
import 'moment/locale/vi'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import getConfig, { setConfig } from 'next/config'
import { Plus_Jakarta_Sans, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ContextProvider, { Context } from 'src/context'
import { getWagmiConfig } from 'src/services/wagmi/config'
import 'src/styles/globals.scss'
import { WagmiProvider } from 'wagmi'
const pjs = Plus_Jakarta_Sans({ subsets: ['latin', 'vietnamese'] })
const ws = Work_Sans({ subsets: ['latin', 'vietnamese'] })
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
function MyApp(props: AppProps) {
  const [isSetting, setIsSetting] = useState(true)
  const { locale } = useRouter()
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const { data: config } = await axios.get('/config.json')
    setConfig(config)
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
            font-family: ${pjs.style.fontFamily};
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
          font-family: ${pjs.style.fontFamily};
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
      `}</style>
      <ToastContainer />

      <WagmiProvider config={getWagmiConfig()}>
        <QueryClientProvider client={new QueryClient()}>
          <ContextProvider>
            <App {...props} />
          </ContextProvider>
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

  return <Component {...pageProps} />
}
export default appWithTranslation(MyApp)
