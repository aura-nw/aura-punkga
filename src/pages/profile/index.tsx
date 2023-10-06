import { compose } from 'ramda'
import Profile from './profile'
import withApi from './with-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { i18n } from 'next-i18next'
const ComposedProfile = compose(withApi)(Profile)

export default function Page(props) {
  if (props.justHead || props.pageProps.justHead) {
    return <></>
  }
  return <ComposedProfile />
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
