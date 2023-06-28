import { AppProps } from "next/app"

import { appWithTranslation } from "next-i18next"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import "src/styles/globals.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
