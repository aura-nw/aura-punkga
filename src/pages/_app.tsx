import { AuthorizerProvider } from "@authorizerdev/authorizer-react"
import { appWithTranslation } from "next-i18next"
import { AppProps } from "next/app"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import ContextProvider from "src/context"
import "src/styles/globals.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthorizerProvider
      config={{
        authorizerURL: process.env.NEXT_PUBLIC_AUTHORIZER_URL,
        redirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL,
        clientID: process.env.NEXT_PUBLIC_AUTHORIZER_CLIENT_ID,
      }}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </AuthorizerProvider>
  )
}

export default appWithTranslation(MyApp)
