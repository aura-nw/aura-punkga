import { compose } from 'ramda'
import LaunchpadDetail from './launchpadDetail'
import withApi from './with-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from 'next-i18next'
import { GetStaticPaths } from 'next'
const ComposedLaunchpadDetail = compose(withApi)(LaunchpadDetail)

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <></>
  }
  return <ComposedLaunchpadDetail />
}

export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
      paths: [], 
      fallback: true 
  }
}