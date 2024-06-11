import { compose } from 'ramda'
import Profile from './profile'
import withApi from './with-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from 'next-i18next'
import Layout from 'components/Layout'
const ComposedProfile = compose(withApi)(Profile)

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <></>
  }
  return <ComposedProfile />
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
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
