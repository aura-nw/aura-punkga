import { Transition } from '@headlessui/react'
import FilledButton from 'components/Button/FilledButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Zalo from 'images/Zalo.png'
import Google from 'images/Google.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { validateEmail } from 'src/utils'
import Facebook from 'images/Facebook.png'
import MainButton from 'components/Button/MainButton'
export default function SignInModal({ show, openSignUpModal, setSignInOpen, setForgotPasswordOpen }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef<any>()
  const passwordRef = useRef<any>()
  const buttonRef = useRef<any>()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [emailValidateErrorMsg, setEmailValidateErrorMsg] = useState('')
  const [loginErrorMsg, setLoginErrorMsg] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const router = useRouter()
  const { login, oauth } = useContext(Context)

  useEffect(() => {
    setEmailValidateErrorMsg('')
  }, [email])

  useEffect(() => {
    setLoginErrorMsg('')
  }, [email, password])

  useEffect(() => {
    if (!show) {
      setLoginErrorMsg('')
      setEmailValidateErrorMsg('')
      setLoginLoading(false)
    }
  }, [show])

  const loginHandler = () => {
    if (validateEmail(email)) {
      setLoginLoading(true)
      login(email, password, loginCallBack)
    } else {
      setEmailValidateErrorMsg(t('Invalid email format'))
    }
  }

  const loginCallBack = (status, msg) => {
    if (status === 'success') {
      setSignInOpen(false)
      if (location.pathname.includes('reset_password') || location.pathname.includes('verified')) {
        router.push('/')
      }
    } else {
      setLoginErrorMsg(msg || t('Something went wrong'))
    }
    setLoginLoading(false)
  }

  return (
    <Transition
      show={show}
      enter='transition-all duration-500 delay-200'
      enterFrom='max-h-[0vh] opacity-0'
      enterTo='max-h-screen opacity-100'
      leave='transition-all duration-500'
      leaveFrom='max-h-screen opacity-100'
      leaveTo='max-h-[0vh] opacity-0'>
      <div className='p-6 md:w-[400px]'>
        <p className='text-center text-lg font-semibold leading-6 text-[#414141]'>{t('Sign in to Punkga.me')}</p>
        <div className='mt-6'>
          <OutlineTextField
            placeholder={t('Enter your email')}
            label={t('Email')}
            type='email'
            errorMsg={emailValidateErrorMsg}
            value={email}
            onChange={setEmail}
            inputRef={emailRef}
            onKeyDown={(e) => {
              if (e.which == 13) {
                passwordRef.current?.focus()
              }
            }}
          />
          <OutlineTextField
            placeholder={t('Enter your password')}
            label={t('Password')}
            type='password'
            value={password}
            onChange={setPassword}
            inputRef={passwordRef}
            onKeyDown={(e) => {
              if (e.which == 13) {
                emailRef.current?.focus()
                buttonRef.current?.click()
              }
            }}
          />
        </div>
        <div
          className='text-[#2684FC] text-sm leading-[18px] text-right cursor-pointer -mt-[18px]'
          onClick={() => {
            setSignInOpen(false)
            setForgotPasswordOpen(true)
          }}>
          {t('Forgot password')}
        </div>
        <div className='mt-4 flex flex-col items-center w-full max-w-[300px] mx-auto'>
          <MainButton
            size='large'
            buttonRef={buttonRef}
            disabled={!(email && password)}
            onClick={loginHandler}>
            {t('Sign in')}
          </MainButton>
          <div className='text-xs font-medium leading-6 text-red-600 min-h-[24px]'>{loginErrorMsg}</div>
          <div className='text-xs font-medium leading-6 min-h-[24px] mt-2 text-gray-600'>
            {t('Don’t have an account')}?{' '}
            <a className='text-[#2684FC] cursor-pointer' onClick={openSignUpModal}>
              {t('Sign up')}
            </a>
          </div>
          <div className='my-4 text-sm leading-[18px] text-[#414141]'>{t('or')}</div>
          <div className='flex justify-center items-center'></div>
          <button
            className='mt-2 flex gap-[10px] items-center rounded-full bg-light-gray px-4 py-2 leading-5 font-medium w-full'
            onClick={() => oauth('facebook')}>
            <Image src={Facebook} alt='' />
            {t('Continue with Facebook')}
          </button>
          <button
            className='mt-2 flex gap-[10px] items-center rounded-full bg-light-gray px-4 py-2 leading-5 font-medium w-full'
            onClick={() => oauth('zalo')}>
            <Image src={Zalo} alt='' />
            {t('Continue with Zalo')}
          </button>
          <button
            className='mt-2 flex gap-[10px] items-center rounded-full bg-light-gray px-4 py-2 leading-5 font-medium w-full'
            onClick={() => oauth('google')}>
            <Image src={Google} alt='' />
            {t('Continue with Google')}
          </button>
          <div className='mt-4 text-sm leading-[18px] text-[#414141] text-center'>
            {t('By continuing, you agree to our')}
            <br />
            <Link href='/policy' target='_blank' className='text-[#2684FC]'>
              {t('Terms of Use')}
            </Link>{' '}
            {locale == 'vn' && 'của chúng tôi'}
          </div>
        </div>
      </div>
    </Transition>
  )
}
