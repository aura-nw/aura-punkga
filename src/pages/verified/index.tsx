import FilledButton from 'components/Button/FilledButton'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Ninja from 'images/ninja.svg'
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
function EmailVerified() {
  const r = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { t } = useTranslation()
  if (error) {
    return (
      <>
        <Header />
        <div className='flex flex-col justify-center items-center h-[calc(80vh-80px)]'>
          <p className='text-xl font-semibold mb-5'>{t('Something went wrong. Your email has not been verified.')}</p>
          <p className='text-xl font-semibold mb-5'>{t('Try agian or contact us.')}</p>
          <Image src={Ninja} alt='' />
          <FilledButton className='mt-5' size='lg' onClick={() => r.push('/')}>
            {t('Explore Punkga')}
          </FilledButton>
        </div>
        <Footer />
      </>
    )
  }
  return (
    <>
      <Header />
      <div className='flex flex-col justify-center items-center h-[calc(80vh-80px)]'>
        <p className='text-xl font-semibold mb-5'>{t('Your email has been verified')}</p>
        <Image src={Ninja} alt='' />
        <FilledButton className='mt-5' size='lg' onClick={() => r.push('/')}>
          {t('Explore Punkga')}
        </FilledButton>
      </div>
      <Footer />
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
