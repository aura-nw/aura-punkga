import MainButton from 'components/Button/MainButton'
import Layout from 'components/Layout'
import Mascot2 from 'images/Mascot2.png'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <EmailVerified />
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
function EmailVerified() {
  const r = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { t } = useTranslation()
  if (error) {
    return (
      <>
        <div className='flex flex-col justify-center items-center h-[calc(80vh-80px)]'>
          <p className='text-xl font-semibold mb-5'>{t('Something went wrong. Your email has not been verified.')}</p>
          <p className='text-xl font-semibold mb-5'>{t('Try agian or contact us.')}</p>
          <Image src={Mascot2} alt='' width={320} height={320} />
          <MainButton className='mt-5' size='large' onClick={() => r.push('/')}>
            {t('Explore Punkga')}
          </MainButton>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center h-[calc(80vh-80px)]'>
        <p className='text-2xl font-semibold mb-5'>{t('Your email has been verified')}</p>
        <Image src={Mascot2} alt='' width={320} height={320} />
        <MainButton className='mt-5' size='large' onClick={() => r.push('/')}>
          {t('Explore Punkga')}
        </MainButton>
      </div>
    </>
  )
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
