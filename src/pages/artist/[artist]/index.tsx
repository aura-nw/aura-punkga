import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { compose } from 'ramda'
import Artist from './artist'
import withApi from './with-api'
import HeadComponent from 'components/Head'
const ComposedArtist = compose(withApi)(Artist)

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <ComposedArtist />
    </>
  )
}
export const getServerSideProps = async (context) => {
  if (context.params?.artist) {
    const res = await fetch(`https://api.punkga.me/creator/${context.params?.artist}`)
    const data = await res.json()
    const creator = data?.data?.creators?.[0]
    if (!creator)
      return {
        props: {
          ...(await serverSideTranslations(context?.locale!, ['common'])),
        },
      }
    const props = {
      image: creator.avatar_url,
      title: creator.pen_name,
      description: creator.bio,
    }
    return {
      props: {
        metadata: props,
        ...(await serverSideTranslations(context?.locale!, ['common'])),
      },
    }
  }
}
