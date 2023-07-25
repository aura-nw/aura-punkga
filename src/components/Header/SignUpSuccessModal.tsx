import Mail from 'images/Mail.svg'
import Image from 'next/image'
import { useContext } from 'react'
import { Context } from 'src/context'
export default function SignUpSuccessModal({ setSignUpOpen, onClose }) {
  const { account, resendVerifyEmail } = useContext(Context)
  return (
    <div className={` py-6 px-[60px] flex flex-col gap-4 w-full max-w-[670px]`}>
      <p className='text-center text-xl leading-6 font-semibold'>Email verification</p>
      <Image src={Mail} alt='' className='mx-auto' />
      <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
        A verification link has been sent to <span className='text-second-color font-bold'>{account?.email}</span>.
        Please click on the link to verify your email account.
      </p>
      <div className='flex flex-col text-center'>
        <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
          Have not received any email?{' '}
          <span
            className='text-second-color font-bold cursor-pointer'
            onClick={() => resendVerifyEmail(account?.email)}>
            Click here
          </span>{' '}
          to resend verification link
        </p>
        <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
          Or{' '}
          <span
            className='text-second-color font-bold cursor-pointer'
            onClick={() => {
              onClose()
              setSignUpOpen(true)
            }}>
            sign up
          </span>{' '}
          with another email
        </p>
      </div>
    </div>
  )
}
