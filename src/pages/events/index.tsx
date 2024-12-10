import Layout from 'components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HeadComponent from '../../components/Head'
import EventPage from './page'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <EventPage />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = async (context) => {
  const props = {
    title: 'Events',
    description:
      context?.locale == 'en'
        ? 'Collection of super hot events taking place on Punkga Me. Explore now!'
        : 'Tổng hợp các sự kiện siêu hấp dẫn trên Punkga Me. Khám phá ngay!',
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
