import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { compose } from 'ramda'
import Artist from './artist'
import withApi from './with-api'
import HeadComponent from 'components/Head'
import Layout from 'components/Layout'
const ComposedArtist = compose(withApi)(Artist)

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <ComposedArtist data={props.pageProps?.metadata || props.metadata} />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
const authorSeo = [
  {
    slug: 'tien_tran_rb',
    description:
      "A 17-year-old artist with over 10 years of comic drawing experience. She has drawn the 'HAMULAGE' comic - a compelling psychological story about Brenda and her quest for ancient power.",
  },
  {
    slug: 'moffi',
    description:
      "With one year of comic drawing experience, MOFFI introduces to PunkgaMe the comic 'Neon force' - exploring powers from 'punk' Chip and the Neon Force's battle against darkness.",
  },
  {
    slug: 'tate',
    description:
      "Study abroad in Australia, presenting a Cyberpunk world of body mods and 'punkchips' for superpowers. Bill, unable to use them, dreams of their mystical powers.",
  },
  {
    slug: 'phat_bear',
    description:
      "With 8 years of comic-creating experience, taking PunkgaMe readers on a journey to explore the primitive world of Hero Cyber, battling against Yukio Sasaki's blood-soaked Heaven",
  },
  {
    slug: 'hanz',
    description:
      "With over 10 years of comic creating, the author of 'Hero Cyber' - a journey of an orphan boy who becomes a hacker by night, whose life changes after meeting a mysterious girl.",
  },
  {
    slug: 'howater',
    description:
      'Drawing comics since age 7, author of 3 held comics, passionate about Sennen, Shounen, ... Bringing the tale of Young Hero Pan JR and his companion.',
  },
  {
    slug: 'uma',
    description:
      "Passionate about movies, reading, and sports. Motto: Art isn't just for money. Presenting the story of 'Spice' and the team, uncovering dark secrets in Revo.",
  },
]
export const getServerSideProps = async (context) => {
  if (context.params?.artist) {
    const host = context.req.headers.host || context.req.headers.Host
    const res = await fetch(
      host.includes('dev')
        ? `https://api.dev.punkga.me/creator/${context.params?.artist}`
        : host.includes('staging')
        ? `https://api.staging.punkga.me/creator/${context.params?.artist}`
        : `https://api.punkga.me/creator/${context.params?.artist}`
    )
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
      description:
        context?.locale == 'en' && authorSeo.find((author) => context.params?.artist.includes(author.slug))?.description
          ? authorSeo.find((author) => context.params?.artist.includes(author.slug)).description
          : creator.bio,
      canonical: `https://punkga.me/artist/${context.params?.artist}`,
    }
    return {
      props: {
        metadata: props,
        ...(await serverSideTranslations(context?.locale!, ['common'])),
      },
    }
  }
}
