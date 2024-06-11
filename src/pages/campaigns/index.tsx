import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Campaigns from './campaigns'
import Layout from 'components/Layout'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <></>
  }
  return <Campaigns />
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
