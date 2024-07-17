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
    title:
      context.locale == 'vn'
        ? `Cuộc Thi Vẽ Tranh Về Truyền Thuyết Đảo Kaia`
        : `Kaia Island Mythology Drawing Contest`,
    description:
      context.locale == 'vn'
        ? `Khám phá đảo Kaia kỳ bí, thể hiện tài năng hội họa và giành giải thưởng 50 triệu tại cuộc thi "Ghi Chép Về Truyền Thuyết Đảo Kaia" cùng PunkgaMe nào!`
        : `Explore the mysterious Kaia Island, showcase your artistic talent, and win a 2000 USD prize in the "Kaia's Island Mythology Record" contest with PunkgaMe!`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
