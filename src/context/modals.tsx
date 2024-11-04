import MainButton from 'components/Button/MainButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Modal from 'components/Modal'
import ForgotPasswordModal from 'components/Modal/ForgotPasswordModal'
import MigrateWalletModal from 'components/Modal/MigrateWalletModal'
import SignInModal from 'components/Modal/SignInModal'
import SignUpModal from 'components/Modal/SignUpModal'
import SignUpSuccessModal from 'components/Modal/SignUpSuccessModal'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { validateEmail } from 'src/utils'
import { useAccount } from 'wagmi'
import { Context } from '.'
import ConnectModal from 'components/Modal/ConnectModal'
import { removeItem } from 'src/utils/localStorage'
import AddTonWalletModal from 'components/Modal/AddTonWalletModal'
import TeleQrCodeModal from 'components/Modal/TeleQrCodeModal'
import { useSearchParams } from 'next/navigation'
export const ModalContext = createContext<{
  signUpSuccessOpen: boolean
  forgotPasswordOpen: boolean
  signUpOpen: boolean
  teleQrCodeOpen: boolean
  signInOpen: boolean
  connectWalletOpen: boolean
  migrateWalletOpen: boolean
  addTonWalletOpen: boolean
  setTeleQrCodeOpen: Dispatch<SetStateAction<boolean>>
  setSignUpSuccessOpen: Dispatch<SetStateAction<boolean>>
  setForgotPasswordOpen: Dispatch<SetStateAction<boolean>>
  setSignUpOpen: Dispatch<SetStateAction<boolean>>
  setSignInOpen: Dispatch<SetStateAction<boolean>>
  setWalletConnectOpen: Dispatch<SetStateAction<boolean>>
  setMigrateWalletOpen: Dispatch<SetStateAction<boolean>>
  setAddTonWalletOpen: Dispatch<SetStateAction<boolean>>
  showEmailVerification: (email: string, identifier: string) => void
}>({
  signUpSuccessOpen: false,
  forgotPasswordOpen: false,
  signUpOpen: false,
  signInOpen: false,
  connectWalletOpen: false,
  migrateWalletOpen: false,
  addTonWalletOpen: false,
  teleQrCodeOpen: false,
  setTeleQrCodeOpen: () => {},
  setAddTonWalletOpen: () => {},
  setSignUpSuccessOpen: () => {},
  setForgotPasswordOpen: () => {},
  setSignUpOpen: () => {},
  setSignInOpen: () => {},
  setWalletConnectOpen: () => {},
  setMigrateWalletOpen: () => {},
  showEmailVerification: () => {},
})
function ModalProvider({ children }) {
  const [signUpSuccessOpen, setSignUpSuccessOpen] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [addTonWalletOpen, setAddTonWalletOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [connectWalletOpen, setWalletConnectOpen] = useState(false)
  const [migrateWalletOpen, setMigrateWalletOpen] = useState(false)
  const { account, updateProfile, logout } = useContext(Context)
  const { isConnected } = useAccount()
  const [errorMsg, setErrorMsg] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const [teleQrCodeOpen, setTeleQrCodeOpen] = useState(false)
  const [emailNeedVerify, setEmailNeedVerify] = useState('')
  const [identifier, setIdentifier] = useState('')
  const { t } = useTranslation()
  const searchParams = new URLSearchParams(location.search)
  const portalCallbackUrlParam = searchParams.get('login_callback_url')
  useEffect(() => {
    setErrorMsg('')
  }, [name])

  useEffect(() => {
    setEmailErrorMsg('')
  }, [email])

  useEffect(() => {
    if (account) {
      setSignInOpen(false)
      setSignUpOpen(false)
    } else {
      if (isConnected) {
        setSignInOpen(false)
      }
      if (portalCallbackUrlParam) {
        setSignInOpen(true)
      }
    }
  }, [account, isConnected])

  useEffect(() => {
    if (!signUpSuccessOpen) {
      setTimeout(() => setEmailNeedVerify(''), 1000)
    }
  }, [signUpSuccessOpen])

  useEffect(() => {
    setOpen(true)
  }, [account])
  useEffect(() => {
    if (!open) {
      logout()
    }
  }, [open])

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
      showEmailVerification(email, 'update_email')
    } catch (error) {
      setLoading(false)
      if (error.message?.includes('authorizer_users_nickname_key')) {
        setErrorMsg(t('Name already taken'))
        return
      }
      if (error.message?.includes('email address already exists')) {
        setEmailErrorMsg(t('Email has been registered'))
        return
      }
      setErrorMsg(t('Something went wrong'))
    }
  }

  const showEmailVerification = (email: string, identifier: string) => {
    setEmailNeedVerify(email)
    setIdentifier(identifier)
    setSignUpSuccessOpen(true)
  }

  return (
    <ModalContext.Provider
      value={{
        signUpSuccessOpen,
        forgotPasswordOpen,
        addTonWalletOpen,
        signUpOpen,
        signInOpen,
        connectWalletOpen,
        migrateWalletOpen,
        teleQrCodeOpen,
        setTeleQrCodeOpen,
        setSignUpSuccessOpen,
        setAddTonWalletOpen,
        setForgotPasswordOpen,
        setSignUpOpen,
        setSignInOpen,
        setWalletConnectOpen,
        setMigrateWalletOpen,
        showEmailVerification,
      }}>
      <Modal
        preventClickOutsideToClose
        open={signInOpen || signUpOpen}
        setOpen={() => {
          setSignInOpen(false)
          setSignUpOpen(false)
        }}>
        <div className='relative'>
          <SignInModal />
          <SignUpModal />
        </div>
      </Modal>

      <Modal open={teleQrCodeOpen} setOpen={setTeleQrCodeOpen}>
        <TeleQrCodeModal />
      </Modal>
      <Modal open={forgotPasswordOpen} setOpen={setForgotPasswordOpen}>
        <ForgotPasswordModal />
      </Modal>
      <Modal open={addTonWalletOpen} setOpen={setAddTonWalletOpen}>
        <AddTonWalletModal />
      </Modal>
      <Modal open={signUpSuccessOpen} setOpen={setSignUpSuccessOpen}>
        <SignUpSuccessModal email={emailNeedVerify} identifier={identifier} />
      </Modal>
      {migrateWalletOpen && <MigrateWalletModal />}
      {connectWalletOpen && <ConnectModal />}

      {account ? (
        validateEmail(account?.email) ? (
          account?.verified ? (
            account?.name ? (
              <></>
            ) : (
              <Modal open={open} setOpen={setOpen}>
                <div className='p-6 flex flex-col w-[322px]'>
                  <div className='text-xl font-bold leading-6 text-center'>{t('Set a username')}</div>
                  <div className='mt-6'>
                    <OutlineTextField label={t('Username')} errorMsg={errorMsg} value={name} onChange={setName} />
                    <OutlineTextField label={t('Email')} value={account?.email} disabled={true} />
                  </div>
                  <p className='text-[10px] -mt-4'>
                    {t('This email will also be used to receive updates of new chapter when you subscribe a manga.')}
                  </p>
                  <div className='mt-4'>
                    <MainButton className='w-full' disabled={!name} loading={loading} onClick={setUName}>
                      {t('Continue')}
                    </MainButton>
                  </div>
                  <p className='text-xs mt-1 text-center'>
                    {t('Or')}{' '}
                    <a
                      className='text-[#2684FC]'
                      onClick={() => {
                        setOpen(false)
                        setSignInOpen(true)
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
              <SignUpSuccessModal
                email={account?.email}
                identifier={account.signupMethods.includes('basic_auth') ? 'basic_auth_signup' : 'update_email'}
              />
            </Modal>
          )
        ) : (
          <Modal open={open} setOpen={setOpen}>
            <div className='p-6 flex flex-col w-[322px]'>
              <div className='text-xl font-bold leading-6 text-center'>{t('Verify your email')}</div>
              <p className='text-xs leading-4 mt-1 text-center'>
                {t(
                  'An active email is required when sign in to Punkga, verify it only once and enjoy all of our great mangas.'
                )}
              </p>
              <div className='mt-6'>
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
              <MainButton className='w-full mt-6' disabled={!name} loading={loading} onClick={setUNameAndEmail}>
                {t('Continue')}
              </MainButton>
              <p className='text-xs mt-1 text-center'>
                {t('Or')}{' '}
                <a
                  className='text-[#2684FC] '
                  onClick={() => {
                    setOpen(false)
                    setSignInOpen(true)
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

      {children}
    </ModalContext.Provider>
  )
}
export default ModalProvider
