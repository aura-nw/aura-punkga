import axios from 'axios'
import FilledButton from 'components/Button/FilledButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Modal from 'components/Modal'
import moment from 'moment'
import 'moment/locale/vi'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { setConfig } from 'next/config'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ContextProvider, { Context } from 'src/context'
import 'src/styles/globals.scss'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import Head from 'next/head'
const pjs = Plus_Jakarta_Sans({ subsets: ['latin', 'vietnamese'] })
function MyApp(props: AppProps) {
  const [isSetting, setIsSetting] = useState(true)
  const { locale } = useRouter()
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const { data: config } = await axios.get('/config.json')
    setConfig(config)
    setIsSetting(false)
  }
  useEffect(() => {
    if (locale == 'vn') {
      moment.locale('vi')
    } else {
      moment.locale('en')
    }
  }, [locale])
  if (isSetting) return <></>
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${pjs.style.fontFamily};
        }
      `}</style>
      <ContextProvider>
        <App {...props} />
      </ContextProvider>
    </>
  )
}
const App = ({ Component, pageProps }: AppProps) => {
  const { isSettingUp, account, updateProfile } = useContext(Context)
  const [errorMsg, setErrorMsg] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    setErrorMsg('')
  }, [name])

  if (isSettingUp) {
    return <></>
  }

  const setUName = async () => {
    try {
      setLoading(true)
      const res = await updateProfile({
        nickname: name,
      })
      setLoading(false)
    } catch (error) {
      setErrorMsg(t('Name already taken'))
      setLoading(false)
    }
  }

  return (
    <>
      <Script id='gtm'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PF4MH72V');`}
      </Script>
      {account?.verified ? (
        account?.email ? (
          account?.name ? (
            <></>
          ) : (
            <>
              <Modal open={open} setOpen={setOpen}>
                <div className='p-6 flex flex-col w-[322px]'>
                  <div className='gap-2 flex flex-col'>
                    <div className='text-xl font-semibold leading-6 text-center'>{t('Set a username')}</div>

                    <OutlineTextField label='Username' errorMsg={errorMsg} value={name} onChange={setName} />
                    <OutlineTextField label='Email' value={account.email} disabled={true} />
                  </div>
                  <p className='text-xs mt-[6px]'>
                    {t('This email will also be used to receive updates of new chapter when you subscribe a manga.')}
                  </p>
                  <div className='mt-3 mx-auto'>
                    <FilledButton size='lg' disabled={!name} loading={loading} onClick={setUName}>
                      {t('Continue')}
                    </FilledButton>
                  </div>
                  <p className='text-xs mt-2 font-medium text-center'>
                    {t('Or')}{' '}
                    <a
                      className='text-second-color font-bold'
                      onClick={() => {
                        setOpen(false)
                        document.getElementById('open-sign-in-btn')?.click()
                      }}>
                      {t('sign in')}
                    </a>{' '}
                    {t('with another account')}
                  </p>
                </div>
              </Modal>
            </>
          )
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <Component {...pageProps} />
    </>
  )
}
export default appWithTranslation(MyApp)
