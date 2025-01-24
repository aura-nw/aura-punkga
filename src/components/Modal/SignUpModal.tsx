import MainButton from 'components/Button/MainButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import CheckSquare from 'images/icons/check_square_fill.svg'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { validateEmail, validatePassword } from 'src/utils'
export default function SignUpModal() {
  const [email, setEmail] = useState('')
  const [emailValidateErrorMsg, setEmailValidateErrorMsg] = useState('')
  const [username, setUsername] = useState('')
  const [usernameValidateErrorMsg, setUsernameValidateErrorMsg] = useState('')
  const [password, setPassword] = useState('')
  const [passwordValidateErrorMsg, setPasswordValidateErrorMsg] = useState('')
  const [repassword, setRepassword] = useState('')
  const [repasswordValidateErrorMsg, setRepasswordValidateErrorMsg] = useState('')
  const [repasswordValidateSuccess, setRepasswordValidateSuccess] = useState(false)

  const [signUpLoading, setSignUpLoading] = useState(false)
  const [signUpErrorMsg, setSignUpErrorMsg] = useState('')

  const usernameRef = useRef<any>()
  const emailRef = useRef<any>()
  const passwordRef = useRef<any>()
  const rpasswordRef = useRef<any>()
  const buttonRef = useRef<any>()
  const { t } = useTranslation()
  const { signUp } = useContext(Context)
  const { setSignUpOpen, setSignInOpen, showEmailVerification, signUpOpen: show } = useContext(ModalContext)

  useEffect(() => {
    setSignUpErrorMsg('')
  }, [username, email, password, repassword])

  useEffect(() => {
    setEmailValidateErrorMsg('')
  }, [email])
  useEffect(() => {
    setUsernameValidateErrorMsg('')
  }, [username])
  useEffect(() => {
    setPasswordValidateErrorMsg('')
  }, [password])

  useEffect(() => {
    setRepasswordValidateErrorMsg('')
    if (password == repassword && password) {
      setRepasswordValidateSuccess(true)
    } else {
      setRepasswordValidateSuccess(false)
    }
  }, [password, repassword])

  const signUpHandler = () => {
    let isError = false
    if (!validateEmail(email)) {
      setEmailValidateErrorMsg(t('Invalid email format'))
      isError = true
    }
    if (!validatePassword(password)) {
      setPasswordValidateErrorMsg(
        t(
          'Password needs to be at least 6 characters long and contain at least one number, one uppercase letter, one lowercase letter and one special character'
        )
      )
      isError = true
    }
    if (password != repassword) {
      setRepasswordValidateErrorMsg(t('Password doesn’t match'))
      isError = true
    }
    if (!isError) {
      setSignUpLoading(true)
      signUp(username, email, password, signUpCallBack)
    }
  }

  const signUpCallBack = (status, msg: string) => {
    if (status === 'success') {
      setSignUpOpen(false)
      showEmailVerification(email, 'basic_auth_signup')
    } else {
      if (msg.includes('has already signed up')) setEmailValidateErrorMsg(t('Email has been registered'))
      else if (msg.includes('authorizer_users_nickname_key')) setUsernameValidateErrorMsg(t('Name already taken'))
      else setSignUpErrorMsg(msg)
    }
    setSignUpLoading(false)
  }
  if (!show) return <></>
  return (
    <div className='p-6 w-[90vw] md:w-[720px] md:max-w-[720px]'>
      <p className='text-center text-xl font-bold leading-6'>{t('Sign up to Punkga.me')}</p>
      <p className='text-center text-xs leading-[15px] max-w-[226px] mx-auto mt-1 text-[#61646B'>
        {t('Subscribe, receive notifications and unlock special chapters')}
      </p>
      <div className='mt-3'>
        <OutlineTextField
          placeholder={t('Choose a username')}
          label={t('Username')}
          errorMsg={usernameValidateErrorMsg}
          value={username}
          onChange={setUsername}
          inputRef={usernameRef}
          onKeyDown={(e) => {
            if (e.which == 13) {
              emailRef.current?.focus()
            }
          }}
        />
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
          errorMsg={passwordValidateErrorMsg}
          onChange={setPassword}
          inputRef={passwordRef}
          onKeyDown={(e) => {
            if (e.which == 13) {
              rpasswordRef.current?.focus()
            }
          }}
        />
        <OutlineTextField
          placeholder={t('Re-enter your password')}
          label={t('Confirm Password')}
          type='password'
          errorMsg={repasswordValidateErrorMsg}
          value={repassword}
          onChange={setRepassword}
          trailingComponent={repasswordValidateSuccess ? <Image src={CheckSquare} alt='' /> : null}
          inputRef={rpasswordRef}
          onKeyDown={(e) => {
            if (e.which == 13) {
              buttonRef.current?.click()
            }
          }}
        />
      </div>
      <MainButton
        buttonRef={buttonRef}
        loading={signUpLoading}
        className='w-full mt-3'
        disabled={!(username && email && password && repassword)}
        onClick={signUpHandler}>
        {t('Sign up')}
      </MainButton>
      {/* <div className='text-xs font-medium leading-6 text-red-600 min-h-[24px] text-center'>{signUpErrorMsg}</div> */}
      <div className='mt-1 text-[#61646B] text-xs text-center leading-[15px]'>
        {t('Already have an account?')}{' '}
        <a
          className='text-[#2684FC]'
          onClick={() => {
            setSignInOpen(true)
            setSignUpOpen(false)
          }}>
          {t('Sign in')}
        </a>
      </div>
    </div>
  )
}
