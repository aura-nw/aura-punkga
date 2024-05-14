import { Transition } from '@headlessui/react'
import MainButton from 'components/Button/MainButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Facebook from 'images/Facebook.png'
import Google from 'images/Google.png'
import Zalo from 'images/Zalo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { validateEmail } from 'src/utils'
import { useConnect } from 'wagmi'
import MetaMaskIcon from 'src/assets/images/metamask.png'
import Image from 'next/image'
export default function SignInModal() {
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
  const { setSignInOpen, setSignUpOpen, setForgotPasswordOpen, signInOpen: show } = useContext(ModalContext)
  const { connectors, connect } = useConnect()

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

  const metamask = connectors.find((c) => c.id == 'io.metamask')

  return (
    <Transition
      show={show}
      enter='transition-all duration-500 delay-200'
      enterFrom='max-h-[0vh] opacity-0'
      enterTo='max-h-screen opacity-100'
      leave='transition-all duration-500'
      leaveFrom='max-h-screen opacity-100'
      leaveTo='max-h-[0vh] opacity-0'>
      <div className='w-[354px] flex flex-col gap-3 p-5'>
        <p className='text-center text-base leading-6 font-semibold md:text-lg md:leading-[23px]'>
          {t('Connect your wallet')}
        </p>
        <div className='mt-3'>
          <button
            onClick={metamask ? () => connect({ connector: metamask }) : null}
            className={`${
              metamask ? 'opacity-100' : 'opacity-40'
            } flex items-center gap-5 hover:bg-[#f5f5f5] p-3 w-full rounded-lg`}>
            <Image src={MetaMaskIcon} alt='' className='w-8 h-8' />
            <div className='font-semibold'>Metamask</div>
          </button>
        </div>
      </div>
    </Transition>
  )
}
