import Layout from 'components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HeadComponent from '../../components/Head'
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
  return {
    props: {
      metadata: {
        title: 'PunkgaMe: Colorful Adventures with Unique Characters',
        description:
          'Explore a colorful world and embark on exciting adventures with unique characters created by talented artists!',
        image: `/assets/images/characters-thumbnail.png`,
      },
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
