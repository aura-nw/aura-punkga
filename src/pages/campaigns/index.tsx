import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Campaigns from './campaigns'
import Layout from 'components/Layout'
import HeadComponent from '../../components/Head'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <Campaigns />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = async (context) => {
  const props = {
    title: 'Campaigns',
    description: context?.locale == 'en' ? 'Collection of super hot campaigns taking place on Punkga Me. Join and earn rewards now!' : 'Tổng hợp các campaign siêu hấp dẫn đang diễn ra trên Punkga Me. Tham gia và nhận thưởng ngay!',
    canonical: `https://punkga.me/campaigns`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
