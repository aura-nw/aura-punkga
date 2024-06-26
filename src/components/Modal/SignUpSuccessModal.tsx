import Mail from 'images/Mail.svg'
import Image from 'next/image'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
export default function SignUpSuccessModal({ email,identifier }) {
  const { resendVerifyEmail } = useContext(Context)
  const { setSignUpOpen, setSignUpSuccessOpen } = useContext(ModalContext)
  const { t } = useTranslation()
  return (
    <div className={` py-6 px-[60px] flex flex-col gap-4 w-full max-w-[670px]`}>
      <p className='text-center text-xl leading-6 font-bold'>{t('Email verification')}</p>
      <Image src={Mail} alt='' className='mx-auto' />
      <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
        {t('A verification link has been sent to')} <span className='text-second-color font-bold'>{email}</span>.
        {t('Please check your email.')}
      </p>
      <div className='flex flex-col text-center text-xs leading-[14px]'>
        <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
          {t('Have not received any email')}?{' '}
          <span className='text-second-color font-bold cursor-pointer' onClick={() => resendVerifyEmail(email,identifier)}>
            {t('Click here')}
          </span>{' '}
          {t('to resend verification link')}
        </p>
        <p className=' font-medium text-center w-full max-w-[500px] mx-auto'>
          {t('Or')}{' '}
          <span
            className='text-second-color font-bold cursor-pointer'
            onClick={() => {
              setSignUpSuccessOpen(false)
              setSignUpOpen(true)
            }}>
            {t('sign up')}
          </span>{' '}
          {t('with another email')}
        </p>
      </div>
    </div>
  )
}
