import { AuthorizerProvider } from "@authorizerdev/authorizer-react"
import axios from "axios"
import { appWithTranslation } from "next-i18next"
import { AppProps } from "next/app"
import getConfig, { setConfig } from "next/config"
import { useContext, useEffect, useState } from "react"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import ContextProvider, { Context } from "src/context"
import "src/styles/globals.scss"
function MyApp(props: AppProps) {
  const [isSetting, setIsSetting] = useState(true)
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const { data: config } = await axios.get("/config.json")
    setConfig(config)
    setIsSetting(false)
  }
  const config = getConfig()
  if (isSetting) return <></>
  return (
    <AuthorizerProvider
      config={{
        authorizerURL: config.AUTHORIZER_URL,
        redirectURL: config.REDIRECT_URL,
        clientID: config.AUTHORIZER_CLIENT_ID,
      }}>
      <ContextProvider>
        <App {...props} />
      </ContextProvider>
    </AuthorizerProvider>
  )
}
const App = ({ Component, pageProps }: AppProps) => {
  const { isSettingUp } = useContext(Context)
  if (isSettingUp) {
    return <></>
  }
  return <Component {...pageProps} />
}
export default appWithTranslation(MyApp)
