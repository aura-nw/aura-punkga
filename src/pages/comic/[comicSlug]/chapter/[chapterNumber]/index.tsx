import Chapter from "./chapter"
import { compose } from "ramda"
import withApi from "./with-api"
import withStyle from "./with-style"
import withCssModule from "./with-css-module"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { i18n } from 'next-i18next'
const ComposedChapter = compose(withCssModule, withStyle, withApi)(Chapter)

export default ComposedChapter

export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export const getStaticPaths = ({ locales }) => {
  return {
    paths: [],
    fallback: true,
  }
}
