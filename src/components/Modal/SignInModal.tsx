import { Transition } from '@headlessui/react'
import MainButton from 'components/Button/MainButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Spinner from 'components/Spinner'
import Facebook from 'images/Facebook.png'
import Google from 'images/Google.png'
import Metamask from 'images/metamask.png'
import Zalo from 'images/Zalo.png'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { QRCodeSVG } from 'qrcode.react'
import { useContext, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import WCIcon from 'src/assets/images/wallet-connect.png'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { isMetamaskInstalled, validateEmail } from 'src/utils'
import { Connector, useConnect, useDisconnect } from 'wagmi'
export default function SignInModal() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { signInOpen: show } = useContext(ModalContext)
  const [step, setStep] = useState(1)
  if (!show) return <></>
  return (
    <Transition
      show={show}
      enter='transition-all duration-500 delay-200'
      enterFrom='max-h-[0vh] opacity-0'
      enterTo='max-h-screen opacity-100'
      leave='transition-all duration-500'
      leaveFrom='max-h-screen opacity-100'
      leaveTo='max-h-[0vh] opacity-0'>
      <div className='p-6 w-[90vw] max-w-[322px] md:w-[720px] md:max-w-[720px]'>
        {step == 2 && (
          <div className='md:hidden absolute top-2 left-2' onClick={() => setStep(1)}>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M20 12H4M4 12L10 6M4 12L10 18'
                stroke='#ABABAB'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        )}
        <p className='text-center text-lg font-semibold leading-6 text-[#414141]'>{t('Sign in to Punkga')}</p>
        <div className='mt-6 flex gap-[18px] md:gap-6 flex-col-reverse md:flex-row'>
          <div className='mt-4 md:hidden text-[10px] leading-[14px] text-[#414141] text-center'>
            {t('By continuing, you agree to our')}
            <br />
            <Link href='/policy' target='_blank' className='text-[#2684FC]'>
              {t('Terms of Use')}
            </Link>{' '}
            {locale == 'vn' && 'của chúng tôi'}
          </div>
          {step == 1 && (
            <>
              <div className='flex-1'>
                <ByWallet step={step} />
              </div>
              <div className='w-[1px] h-[400px] bg-[#F0F0F0] hidden md:block'></div>
              <div className='md:hidden flex gap-[18px] items-center w-full'>
                <div className='w-full flex-1 h-[1px] bg-[#F0F0F0]'></div>
                <div className='text-[#414141] text-xs'>Or</div>
                <div className='w-full flex-1 h-[1px] bg-[#F0F0F0]'></div>
              </div>
            </>
          )}
          <div className='flex-1'>
            <ByEmail step={step} setStep={setStep} />
          </div>
        </div>
      </div>
    </Transition>
  )
}

const ByWallet = ({ step }) => {
  const { t } = useTranslation()
  const { connectors, connectAsync: wagmiConnect } = useConnect()
  const { connectHandler } = useContext(Context)
  const { disconnect: wagmiDisconnect, disconnectAsync } = useDisconnect()
  const [mobileWallet, setMobileWallet] = useState<Connector[]>([])
  const [installed, setInstalled] = useState<Connector[]>([])
  const [otherWallet, setOtherWallet] = useState<Connector[]>([])
  //QRCode
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrError, setQRError] = useState('')

  useEffect(() => {
    const setConnector = async () => {
      const installedWallet = [] as Connector[]
      const otherWallet = [] as Connector[]
      const mobile = [] as Connector[]

      for (let i = 0; i < connectors.length; i++) {
        const connector = connectors[i]

        if (connector.type === 'injected') {
          if (connector.id === 'injected') {
            mobile.push(connector)
          }
          connector.icon && installedWallet.push(connector)
        } else if (connector.type === 'walletConnect') {
          otherWallet.push(connector)
        }
      }
      setMobileWallet(mobile)
      setInstalled(installedWallet)
      setOtherWallet(otherWallet)
    }

    setConnector()
  }, [connectors])
  return (
    <>
      {!showQRCode ? (
        <div className='flex flex-col gap-3'>
          <div className='font-semibold text-[#414141] hidden md:block'>{t('Sign in using a wallet')}</div>
          <div className='font-semibold text-[#414141] md:hidden text-sm w-full text-center'>
            {t('Connect a wallet')}
          </div>
          <div className='text-sm hidden md:block'>
            {t('If you don’t have a wallet yet, you can select a provider and create one now.')}
          </div>
          <div className='text-xs md:hidden w-full text-center'>
            {t('Select a provider to connect or create a wallet.')}
          </div>
          {isMobile ? (
            <div className='gap-2 md:gap-0 flex flex-col'>
              {mobileWallet.map((connector) => (
                <div key={connector.id}>
                  <div
                    className='flex gap-2 w-full items-center hover:bg-[#f0f0f0] bg-[#f0f0f0] md:bg-white cursor-pointer p-2 md:py-3 md:px-4 rounded-lg'
                    onClick={async () => {
                      try {
                        await wagmiConnect(
                          { connector, chainId: getConfig().CHAIN_INFO.evmChainId },
                          { onSuccess: connectHandler }
                        )
                        if (!isMetamaskInstalled()) {
                          window.open(`https://metamask.app.link/dapp/${location.hostname}/`)
                        }
                      } catch (error: any) {
                        console.error(error.message)
                        wagmiDisconnect()
                      }
                    }}>
                    <Image src={Metamask} alt={`${connector.name}-Icon`} height={32} width={32} />
                    <div>MetaMask</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='gap-2 md:gap-0 flex flex-col'>
              {installed.map((connector) => (
                <div key={connector.id}>
                  <div
                    className='flex gap-2 w-full items-center hover:bg-[#f0f0f0] bg-[#f0f0f0] md:bg-white cursor-pointer p-2 md:py-3 md:px-4 rounded-lg'
                    onClick={async () => {
                      try {
                        setShowQRCode(false)
                        await wagmiConnect(
                          { connector, chainId: getConfig().CHAIN_INFO.evmChainId },
                          {
                            onSuccess: connectHandler,
                          }
                        )
                      } catch (error: any) {
                        console.error(error)
                        wagmiDisconnect()
                      }
                    }}>
                    <Image src={connector.icon} alt={`${connector.name}-Icon`} className='' height={32} width={32} />
                    <div className=' text-sm font-semibold'>{connector.name}</div>
                  </div>
                </div>
              ))}
              {otherWallet.map((connector) => (
                <div key={connector.id}>
                  <div
                    className='flex gap-2 w-full items-center hover:bg-[#f0f0f0] bg-[#f0f0f0] md:bg-white cursor-pointer p-2 md:py-3 md:px-4 rounded-lg'
                    onClick={async () => {
                      try {
                        setShowQRCode(!showQRCode)
                        setLoading(true)
                        setQRError('')
                        wagmiConnect(
                          { connector, chainId: getConfig().CHAIN_INFO.evmChainId },
                          {
                            onSuccess: (data) => {
                              setLoading(false)
                              connectHandler(data)
                            },

                            onError: (props) => {
                              setQRError(props.message)
                            },
                          }
                        )
                        const provider = (await connector.getProvider()) as any
                        const deepLink = await new Promise<string>((resolve) => {
                          provider.on('display_uri', (uri: string) => {
                            resolve(uri)
                          })
                        })
                        setLoading(false)
                        setQrCode(deepLink)
                      } catch (error: any) {
                        console.error(error)
                        wagmiDisconnect()
                      }
                    }}>
                    <Image src={WCIcon} alt={`${connector.name}-Icon`} height={30} width={30} />
                    <div className='text-sm font-semibold'>{connector.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col gap-6'>
          <div
            className='font-semibold text-[#414141] flex items-center cursor-pointer'
            onClick={() => setShowQRCode(false)}>
            <span className='mr-1'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M15 5L9 12L15 19'
                  stroke='#1C274C'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
            {t('Scan with your wallet')}
          </div>
          <div className='flex flex-col items-center'>
            {loading ? (
              <div className='w-[290px] bg-[#f0f0f0] rounded-lg aspect-square flex justify-center items-center'>
                <Spinner className='w-8 h-8' />
              </div>
            ) : (
              <>
                {qrError && (
                  <div className='expired'>
                    {/* <Icon name='danger' size='xl' /> */}
                    {qrError}
                  </div>
                )}
                <QRCodeSVG value={qrCode} size={290} level='H' bgColor='#FFFFFF' fgColor='#000000' />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const ByEmail = ({ step, setStep }) => {
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
    <div>
      <div className='font-semibold text-[#414141] mb-4 hidden md:block '>{t('Sign in with email')}</div>
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
      {(step == 2 || !isMobile) && (
        <>
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
          <div
            className='text-[#2684FC] text-sm leading-[18px] text-right cursor-pointer -mt-[18px]'
            onClick={() => {
              setSignInOpen(false)
              setForgotPasswordOpen(true)
            }}>
            {t('Forgot password')}
          </div>
        </>
      )}
      <div className='mt-4 flex flex-col items-center w-full'>
        <MainButton
          buttonRef={buttonRef}
          disabled={step == 1 ? !email : !(email && password)}
          onClick={() => setStep(2)}
          className='w-full md:hidden'>
          {t(step == 1 ? 'Continue' : 'Sign in')}
        </MainButton>
        <MainButton
          buttonRef={buttonRef}
          disabled={!(email && password)}
          loading={loginLoading}
          onClick={loginHandler}
          className='min-w-[128px] hidden md:block'>
          {t('Sign in')}
        </MainButton>
        <div className='text-xs md:text-sm leading-[18px] min-h-[18px] text-[#F0263C] mt-1'>{loginErrorMsg}</div>
        <div className='text-xs md:text-sm leading-[18px] mt-1 mb-4 text-[#414141]'>
          {t('Don’t have an account')}?{' '}
          <a
            className='text-[#2684FC] cursor-pointer'
            onClick={() => {
              setSignUpOpen(true)
              setSignInOpen(false)
            }}>
            {t('Sign up')}
          </a>
        </div>
        <div className='mb-4 text-sm leading-[18px] hidden md:block text-[#414141]'>{t('or')}</div>
        <div className='flex gap-4 w-full items-center'>
          <MainButton
            iconOnly={Facebook}
            onClick={() => oauth('facebook')}
            style='outline'
            size='small'
            className='w-full'
          />
          <MainButton iconOnly={Zalo} onClick={() => oauth('zalo')} style='outline' size='small' className='w-full' />
          <MainButton
            iconOnly={Google}
            onClick={() => oauth('google')}
            style='outline'
            size='small'
            className='w-full'
          />
        </div>
        <div className='mt-4 hidden md:block text-xs leading-[15px] text-[#414141] text-center'>
          {t('By continuing, you agree to our')}
          <br />
          <Link href='/policy' target='_blank' className='text-[#2684FC]'>
            {t('Terms of Use')}
          </Link>{' '}
          {locale == 'vn' && 'của chúng tôi'}
        </div>
      </div>
    </div>
  )
}
