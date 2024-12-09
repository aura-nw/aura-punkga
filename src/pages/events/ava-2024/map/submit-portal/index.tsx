import HeadComponent from 'components/Head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import PageContent from './page'
export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <PageContent />
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
        ? 'assets/images/ava-thumb.png'
        : 'assets/images/ava-thumb.png',
    title:
      context.locale == 'vn'
        ? `AVA Grand Contest 2024 - Find Your Artistic Voice`
        : `AVA Grand Contest 2024 - Find Your Artistic Voice`,
    description:
      context.locale == 'vn'
        ? `Tham gia AVA Grand Contest 2024 trên PunkgaMe để chứng tỏ bản sắc nghệ thuật của riêng bạn và giành lấy phần thưởng lên tới 150 Triệu VNĐ!`
        : `Join the AVA Grand Contest 2024 on Punkga Me to showcase your talent and win prizes up to 6,000 USD. Prove the power of true art in an AI-driven world!`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
