import HeadComponent from 'components/Head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import Event from './page'
import { GetServerSideProps } from 'next'

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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const artworkId = context.query.artwork_id
  const host = context.req.headers.host || context.req.headers.Host
  const res = await fetch(
    host.includes('dev') || host.includes('localhost')
      ? `https://api.dev.punkga.me/story-event/artwork/${artworkId}`
      : host.includes('staging')
      ? `https://api.staging.punkga.me/story-event/artwork/${artworkId}`
      : `https://api.punkga.me/story-event/artwork/${artworkId}`
  )
  const data = await res.json()
  const artworkData = data?.data?.story_artwork_by_pk?.artwork
  return {
    props: {
      metadata: artworkData
        ? {
            ...pageMetadata(context),
            image: artworkData.url,
            title: artworkData.name,
            description: artworkData.description,
          }
        : pageMetadata(context),
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}

export const pageMetadata = (context) => ({
  image: context.locale == 'vn' ? `/assets/images/your-city-thumb.png` : `/assets/images/your-city-thumb.png`,
  title: context?.locale == 'en' ? 'Your City: Your Dream, Your Color' : 'Thành phố của bạn: Nhịp tim của ký ức',
  description:
    context?.locale == 'en'
      ? 'Ready to draw your own city, a place where your imagination knows no bounds and your dreams can soar.'
      : 'Sẵn sàng vẽ thành phố của riêng bạn, một nơi mà trí tưởng tượng của bạn không có giới hạn và ước mơ của bạn có thể bay cao.',
})
