import HeadComponent from 'components/Head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import Event from './page'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <Event />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export const getServerSideProps = async (context) => {
  return {
    props: {
      metadata: pageMetadata(context),
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}

export const pageMetadata = (context) => ({
  image:
    context.locale == 'vn'
      ? `${context.req.headers.host}/assets/images/your-city-thumb.png`
      : `${context.req.headers.host}/assets/images/your-city-thumb.png`,
  title: context?.locale == 'en' ? 'Your City: Your Dream, Your Color' : 'Thành phố của bạn: Nhịp tim của ký ức',
  description:
    context?.locale == 'en'
      ? 'Ready to draw your own city, a place where your imagination knows no bounds and your dreams can soar.'
      : 'Sẵn sàng vẽ thành phố của riêng bạn, một nơi mà trí tưởng tượng của bạn không có giới hạn và ước mơ của bạn có thể bay cao.',
})