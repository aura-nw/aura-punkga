import HeadComponent from 'components/Head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import WowYourSelf from './page'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <WowYourSelf />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export const getServerSideProps = async (context) => {
  const props = {
    image: 'https://punkga.me/assets/images/wow-yourself-thumb.png',
    title: '',
    description: '',
    canonical: `https://punkga.me/wow-yourself`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
