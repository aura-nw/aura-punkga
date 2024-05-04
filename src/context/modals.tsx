import Modal from 'components/Modal'
import ForgotPasswordModal from 'components/Modal/ForgotPasswordModal'
import MigrateWalletModal from 'components/Modal/MigrateWalletModal'
import SignInModal from 'components/Modal/SignInModal'
import SignUpModal from 'components/Modal/SignUpModal'
import SignUpSuccessModal from 'components/Modal/SignUpSuccessModal'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export const ModalContext = createContext<{
  signUpSuccessOpen: boolean
  forgotPasswordOpen: boolean
  signUpOpen: boolean
  signInOpen: boolean
  migrateWalletOpen: boolean
  setSignUpSuccessOpen: Dispatch<SetStateAction<boolean>>
  setForgotPasswordOpen: Dispatch<SetStateAction<boolean>>
  setSignUpOpen: Dispatch<SetStateAction<boolean>>
  setSignInOpen: Dispatch<SetStateAction<boolean>>
  setMigrateWalletOpen: Dispatch<SetStateAction<boolean>>
}>({
  signUpSuccessOpen: false,
  forgotPasswordOpen: false,
  signUpOpen: false,
  signInOpen: false,
  migrateWalletOpen: false,
  setSignUpSuccessOpen: () => {},
  setForgotPasswordOpen: () => {},
  setSignUpOpen: () => {},
  setSignInOpen: () => {},
  setMigrateWalletOpen: () => {},
})
function ModalProvider({ children }) {
  const [signUpSuccessOpen, setSignUpSuccessOpen] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [migrateWalletOpen, setMigrateWalletOpen] = useState(false)
  return (
    <ModalContext.Provider
      value={{
        signUpSuccessOpen,
        forgotPasswordOpen,
        signUpOpen,
        signInOpen,
        migrateWalletOpen,
        setSignUpSuccessOpen,
        setForgotPasswordOpen,
        setSignUpOpen,
        setSignInOpen,
        setMigrateWalletOpen,
      }}>
      <Modal
        preventClickOutsideToClose
        open={signInOpen || signUpOpen}
        setOpen={() => {
          setSignInOpen(false)
          setSignUpOpen(false)
        }}>
        <div className='relative min-h-[40vh]'>
          <SignInModal
            show={signInOpen}
            openSignUpModal={() => {
              setSignUpOpen(true)
              setSignInOpen(false)
            }}
            setForgotPasswordOpen={setForgotPasswordOpen}
          />
          <SignUpModal
            show={signUpOpen}
            openSignInModal={() => {
              setSignInOpen(true)
              setSignUpOpen(false)
            }}
            setSignUpOpen={setSignUpOpen}
            setSignUpSuccessOpen={setSignUpSuccessOpen}
          />
        </div>
      </Modal>

      <Modal open={forgotPasswordOpen} setOpen={setForgotPasswordOpen}>
        <ForgotPasswordModal onClose={() => setForgotPasswordOpen(false)} />
      </Modal>
      <Modal open={signUpSuccessOpen} setOpen={setSignUpSuccessOpen}>
        <SignUpSuccessModal setSignUpOpen={setSignUpOpen} onClose={() => setSignUpSuccessOpen(false)} />
      </Modal>
      {migrateWalletOpen && <MigrateWalletModal open={migrateWalletOpen} setOpen={setMigrateWalletOpen} />}
      {children}
    </ModalContext.Provider>
  )
}
export default ModalProvider
