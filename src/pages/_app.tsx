import axios from 'axios'
import FilledButton from 'components/Button/FilledButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Modal from 'components/Modal'
import MaintainPage from 'components/pages/maintainPage'
import moment from 'moment'
import 'moment/locale/vi'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import getConfig, { setConfig } from 'next/config'
import { Plus_Jakarta_Sans, Work_Sans } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ContextProvider, { Context } from 'src/context'
import 'src/styles/globals.scss'
import { validateEmail } from 'src/utils'
import Mail from 'images/Mail.svg'

const pjs = Plus_Jakarta_Sans({ subsets: ['latin', 'vietnamese'] })
const ws = Work_Sans({ subsets: ['latin', 'vietnamese'] })
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
  if (getConfig().IN_MAINTENANCE_MODE) {
    return (
      <>
        <style jsx global>{`
          html {
            font-family: ${pjs.style.fontFamily};
          }
          .font-ws {
            font-family: ${ws.style.fontFamily};
          }
        `}</style>
        <MaintainPage />
      </>
    )
  }
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${pjs.style.fontFamily};
        }
        .font-ws {
          font-family: ${ws.style.fontFamily};
        }
      `}</style>
      <ContextProvider>
        <App {...props} />
      </ContextProvider>
    </>
  )
}
const App = ({ Component, pageProps }: AppProps) => {
  const { isSettingUp, account, updateProfile, resendVerifyEmail } = useContext(Context)
  const [errorMsg, setErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setErrorMsg('')
  }, [name])
  useEffect(() => {
    setEmailErrorMsg('')
  }, [email])

  useEffect(() => {
    const scriptElement = document.createElement('script')
    scriptElement.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${getConfig()['GTM_ID']}');`
    document.head.append(scriptElement)
    const noscriptElement = document.createElement('noscript')
    noscriptElement.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${
      getConfig()['GTM_ID']
    }" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    document.body.append(noscriptElement)
  }, [])

  if (isSettingUp) {
    return <></>
  }

  const setUName = async () => {
    try {
      setLoading(true)
      await updateProfile({
        nickname: name,
      })
      setLoading(false)
    } catch (error) {
      setErrorMsg(t('Name already taken'))
      setLoading(false)
    }
  }
  const setUNameAndEmail = async () => {
    try {
      if (!validateEmail(email)) {
        setEmailErrorMsg('Invalid email address')
        return
      }
      setLoading(true)
      await updateProfile({
        nickname: name,
        email,
      })
      setLoading(false)
      setOpen(false)
      setOpenSuccessModal(true)
    } catch (error) {
      if (error.message?.includes('authorizer_users_nickname_key')) setErrorMsg(t('Name already taken'))
      if (error.message?.includes('email address already exists'))
        setEmailErrorMsg(t('This email address already exists'))
      setLoading(false)
    }
  }
  return (
    <>
      {account ? (
        validateEmail(account?.email) ? (
          account?.name ? (
            account?.verified ? (
              <></>
            ) : (
              <Modal open={openSuccessModal} setOpen={setOpenSuccessModal}>
                <div className={` py-6 px-[60px] flex flex-col gap-4 w-full max-w-[670px]`}>
                  <p className='text-center text-xl leading-6 font-semibold'>{t('Email verification')}</p>
                  <Image src={Mail} alt='' className='mx-auto' />
                  <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
                    {t('A verification link has been sent to')}{' '}
                    <span className='text-second-color font-bold'>{account?.email || email}</span>.
                    {t('Please click on the link to verify your email account.')}
                  </p>
                  <div className='flex flex-col text-center text-xs leading-[14px]'>
                    <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
                      {t('Have not received any email')}?{' '}
                      <span
                        className='text-second-color font-bold cursor-pointer'
                        onClick={() => resendVerifyEmail(account?.email || email, 'update_email')}>
                        {t('Click here')}
                      </span>{' '}
                      {t('to resend verification link')}
                    </p>
                    <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
                      {t('Or')}{' '}
                      <span
                        className='text-second-color font-bold cursor-pointer'
                        onClick={() => {
                          setOpenSuccessModal(false)
                          document.getElementById('open-sign-in-btn')?.click()
                        }}>
                        {t('sign up')}
                      </span>{' '}
                      {t('with another email')}
                    </p>
                  </div>
                </div>
              </Modal>
            )
          ) : (
            <Modal open={open} setOpen={setOpen}>
              <div className='p-6 flex flex-col w-[322px]'>
                <div className='gap-2 flex flex-col'>
                  <div className='text-xl font-semibold leading-6 text-center'>{t('Set a username')}</div>

                  <OutlineTextField label={t('Username')} errorMsg={errorMsg} value={name} onChange={setName} />
                  <OutlineTextField label={t('Email')} value={account.email} disabled={true} />
                </div>
                <p className='text-xs mt-[6px] text-center'>
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
          )
        ) : (
          <Modal open={open} setOpen={setOpen}>
            <div className='p-6 flex flex-col w-[322px]'>
              <div className='gap-3 flex flex-col'>
                <div className='text-xl font-semibold leading-6 text-center'>{t('Verify your email')}</div>
                <p className='text-[10px] leading-3 text-center'>
                  {t(
                    'An active email is required when sign in to Punkga, verify it only once and enjoy all of our great mangas.'
                  )}
                </p>
                <OutlineTextField
                  label={t('Email')}
                  value={email}
                  onChange={setEmail}
                  errorMsg={emailErrorMsg}
                  placeholder={t('Enter your email')}
                />
                <OutlineTextField
                  label={t('Username')}
                  errorMsg={errorMsg}
                  value={name}
                  onChange={setName}
                  placeholder={t('Enter username')}
                />
              </div>
              <div className='mt-3 mx-auto'>
                <FilledButton size='lg' disabled={!name} loading={loading} onClick={setUNameAndEmail}>
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
        )
      ) : (
        <></>
      )}
      <Modal open={openSuccessModal} setOpen={setOpenSuccessModal}>
        <div className={` py-6 px-[60px] flex flex-col gap-4 w-full max-w-[670px]`}>
          <p className='text-center text-xl leading-6 font-semibold'>{t('Email verification')}</p>
          <Image src={Mail} alt='' className='mx-auto' />
          <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
            {t('A verification link has been sent to')} <span className='text-second-color font-bold'>{email}</span>.
            {t('Please click on the link to verify your email account.')}
          </p>
          <div className='flex flex-col text-center text-xs leading-[14px]'>
            <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
              {t('Have not received any email')}?{' '}
              <span
                className='text-second-color font-bold cursor-pointer'
                onClick={() => resendVerifyEmail(email, 'update_email')}>
                {t('Click here')}
              </span>{' '}
              {t('to resend verification link')}
            </p>
            <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
              {t('Or')}{' '}
              <span
                className='text-second-color font-bold cursor-pointer'
                onClick={() => {
                  setOpenSuccessModal(false)
                  document.getElementById('open-sign-in-btn')?.click()
                }}>
                {t('sign up')}
              </span>{' '}
              {t('with another email')}
            </p>
          </div>
        </div>
      </Modal>
      <Component {...pageProps} />
    </>
  )
}
export default appWithTranslation(MyApp)
