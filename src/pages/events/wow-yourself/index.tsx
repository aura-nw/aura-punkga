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
    image: '/assets/images/wow-yourself-thumb.png',
    title: 'WoW YOURSELF - Cá Chép Hoá Rồng',
    description:
      ' WoW YOURSELF - theo dấu hành trình vượt Vũ Môn của hoạ sĩ, đắm mình trong mùa hè sáng tạo với các tác phẩm dự thi xuất sắc cùng Punkga Me nhé!',
    canonical: `https://punkga.me/wow-yourself`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
