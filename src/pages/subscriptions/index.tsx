import ComicCard from 'components/Comic/ComicCard'
import Layout from 'components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useContext } from 'react'
import { Context } from 'src/context'
import { userService } from 'src/services/userService'
import useSWR from 'swr'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Subscriptions />
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
function Subscriptions() {
  const { account } = useContext(Context)
  const { data: subscriptionList } = useSWR({ key: 'get-subscriptions', id: account?.id }, ({ id }) =>
    id ? userService.getSubscriptionList(id) : null
  )
  return (
    <div className='bg-background p-4 min-h-screen text-white'>
      <div className='space-y-4'>
        <div className='text-lg font-medium'>Subcribed mangas</div>
        {!account ? (
          <div className='flex flex-col items-center gap-4 text-sm font-medium py-10'>
            Sign in to see your subscriptions
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            {subscriptionList?.map((manga, index) => (
              <ComicCard key={index} {...manga} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
