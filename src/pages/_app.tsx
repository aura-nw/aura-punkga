import { AuthorizerProvider } from "@authorizerdev/authorizer-react"
import { appWithTranslation } from "next-i18next"
import { AppProps } from "next/app"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import ContextProvider from "src/context"
import "src/styles/globals.scss"
import config from "public/config.json"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthorizerProvider
      config={{
        authorizerURL: config.AUTHORIZER_URL,
        redirectURL: config.REDIRECT_URL,
        clientID: config.AUTHORIZER_CLIENT_ID,
      }}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </AuthorizerProvider>
  )
}

export default appWithTranslation(MyApp)
