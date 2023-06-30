import Chapter from "./chapter"
import { compose } from "ramda"
import withApi from "./with-api"
import withStyle from "./with-style"
import withCssModule from "./with-css-module"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
const ComposedChapter = compose(withCssModule, withStyle, withApi)(Chapter)

export default ComposedChapter

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
})

export const getStaticPaths = ({ locales }) => {
  return {
    paths: [],
    fallback: true,
  }
}
