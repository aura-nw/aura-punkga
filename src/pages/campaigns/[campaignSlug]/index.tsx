import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CampaignDetail from './campaignDetail'
import Layout from 'components/Layout'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <></>
  }
  return <CampaignDetail />
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export const getServerSideProps = async (context) => {
  if (context.params?.campaignSlug) {
    const res = await fetch(`https://api.punkga.me/campaign/${context.params?.campaignSlug}`)
    const data = await res.json()
    const campaign = data?.data?.campaign?.[0]
    if (!campaign)
      return {
        props: {
          ...(await serverSideTranslations(context?.locale!, ['common'])),
        },
      }
    const props = {
      image: '',
      title: '',
      description: '',
      canonical: `https://punkga.me/campaigns/${context.params?.campaignSlug}`,
    }
    if (context.locale == 'en') {
      const campaignLanguages =
        campaign.campaign_i18n.find((ml) => ml.i18n_language.id == 1) ||
        campaign.campaign_i18n.find((ml) => ml.i18n_language.is_main)
      
      props.image = campaignLanguages?.data?.thumbnail_url
      props.title = campaignLanguages?.data?.name
      props.description = campaignLanguages?.data?.description
    } else {
      const campaignLanguages =
        campaign.campaign_i18n.find((ml) => ml.i18n_language.id == 2) ||
        campaign.campaign_i18n.find((ml) => ml.i18n_language.is_main)

      props.image = campaignLanguages?.data?.thumbnail_url
      props.title = campaignLanguages?.data?.name
      props.description = campaignLanguages?.data?.description
    }
    return {
      props: {
        metadata: props,
        ...(await serverSideTranslations(context?.locale!, ['common'])),
      },
    }
  }
}
