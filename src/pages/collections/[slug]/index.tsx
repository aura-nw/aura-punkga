import HeadComponent from 'components/Head'
import Layout from 'components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CollectionDetail from './page'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <CollectionDetail />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export const getServerSideProps = async (context) => {
  if (context.params?.slug) {
    const res = await fetch(`https://api.punkga.me/launchpad/slug/${context.params?.slug}`)
    const data = await res.json()
    const launchpad = data?.data?.launchpad?.[0]
    if (!launchpad)
      return {
        props: {
          ...(await serverSideTranslations(context?.locale!, ['common'])),
        },
      }
    const props = {
      image: '',
      title: '',
      description: '',
      canonical: `https://punkga.me/launchpad/slug/${context.params?.slug}`,
    }
    if (context.locale == 'en') {
      const languages =
        launchpad.launchpad_i18ns.find((ml) => ml.language_id == 1)

      props.image = languages?.data?.thumbnail_url
      props.title = languages?.data?.name
      props.description = languages?.data?.seo_description || languages?.data?.description
    } else {
      const languages =
        launchpad.launchpad_i18ns.find((ml) => ml.language_id == 2) ||
        launchpad.launchpad_i18ns.find((ml) => ml.language_id == 1)

      props.image = languages?.data?.thumbnail_url
      props.title = languages?.data?.name
      props.description = languages?.data?.seo_description || languages?.data?.description
    }
    return {
      props: {
        metadata: props,
        ...(await serverSideTranslations(context?.locale!, ['common'])),
      },
    }
  }
}
