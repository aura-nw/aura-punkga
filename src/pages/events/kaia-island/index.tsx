import HeadComponent from 'components/Head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import KaiaIsland from './page'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <KaiaIsland />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export const getServerSideProps = async (context) => {
  const props = {
    image:
      context.locale == 'vn'
        ? 'https://punkga.me/assets/images/kaia-island-thumb-vn.png'
        : 'https://punkga.me/assets/images/kaia-island-thumb.png',
    title: `Kaia's Island Mythology Record - Ghi chép về truyền thuyết đảo Kaia`,
    description: `Kaia's Island Mythology Record Description`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
