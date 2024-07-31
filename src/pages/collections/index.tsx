import Layout from 'components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HeadComponent from '../../components/Head'
import Collection from './collection'
export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <Collection />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = async (context) => {
  const props = {
    title: 'Collections',
    description:
      context?.locale == 'en'
        ? 'List of super hot collections taking place on Punkga Me.'
        : 'Tổng hợp các bộ sưu tập siêu hấp dẫn đang diễn ra trên Punkga Me.',
    canonical: `https://punkga.me/collections`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
