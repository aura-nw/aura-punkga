import { Transition } from '@headlessui/react'
import FilledButton from 'components/Button/FilledButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import { validateEmail, validatePassword } from 'src/utils'
import CheckSquare from 'images/icons/check_square_fill.svg'
export default function SignUpModal({ show, openSignInModal, setSignUpOpen, setSignUpSuccessOpen }) {
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

  const { signUp } = useContext(Context)

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
      setEmailValidateErrorMsg('Invalid email format')
      isError = true
    }
    if (!validatePassword(password)) {
      setPasswordValidateErrorMsg(
        'Password needs to be at least 6 characters long and contain at least one number, one uppercase letter, one lowercase letter and one special character'
      )
      isError = true
    }
    if (password != repassword) {
      setRepasswordValidateErrorMsg('Password doesn’t match')
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
      setSignUpSuccessOpen(true)
    } else {
      if (msg.includes('has already signed up')) setEmailValidateErrorMsg('Email has been registered')
      else if (msg.includes('authorizer_users_nickname_key')) setUsernameValidateErrorMsg('Name already taken')
      else setSignUpErrorMsg(msg)
    }
    setSignUpLoading(false)
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
        <p className='text-center text-xl font-semibold leading-6'>Sign up to Punkga.me</p>
        <p className='text-center font-medium mt-2 text-gray-600'>
          Subscribe, receive notifications and unlock special chapters
        </p>
        <div className='mt-[10px]'>
          <OutlineTextField
            placeholder='Choose a username'
            label='Username'
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
            placeholder='Enter your email'
            label='Email'
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
            placeholder='Enter your password'
            label='Password'
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
            placeholder='Re-enter your password'
            label='Confirm Password'
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
        <FilledButton
          loading={signUpLoading}
          className='mx-auto mt-4'
          size='lg'
          disabled={!(username && email && password && repassword && repasswordValidateSuccess)}
          onClick={signUpHandler}>
          Sign up
        </FilledButton>
        <div className='text-xs font-medium leading-6 text-medium-red min-h-[24px] text-center'>{signUpErrorMsg}</div>
        <div className=' text-xs font-medium text-center leading-6'>
          Or{' '}
          <a className='text-second-color font-semibold' onClick={openSignInModal}>
            sign in
          </a>{' '}
          with another account
        </div>
      </div>
    </Transition>
  )
}
