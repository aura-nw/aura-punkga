import { compose } from 'ramda'
import Comic from './comic'
import withApi from './with-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const ComposedComic = compose(withApi)(Comic)

export default ComposedComic

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export const getStaticPaths = ({ locales }) => {
  return {
    paths: [],
    fallback: true,
  }
}
