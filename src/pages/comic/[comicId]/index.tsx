import { compose } from 'ramda'
import Comic from './comic'
import withApi from './with-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from 'next-i18next'
const ComposedComic = compose(withApi)(Comic)

export default ComposedComic

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
