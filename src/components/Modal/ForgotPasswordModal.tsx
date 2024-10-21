import { Transition } from '@headlessui/react'
import MainButton from 'components/Button/MainButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Mail from 'images/Mail.svg'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { validateEmail } from 'src/utils'
export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFirstStep, setIsFirstStep] = useState(true)
  const { t } = useTranslation()
  const { forgotPassword } = useContext(Context)
  const submit = async () => {
    if (validateEmail(email)) {
      setLoading(true)
      const r = await forgotPassword(email)
      setLoading(false)
      if (r?.message?.includes('We have sent a password reset')) {
        setIsFirstStep(false)
      } else {
        if (r?.message) {
          setEmailErrorMsg(t(r?.message))
        } else {
          setEmailErrorMsg(t('Something went wrong'))
        }
      }
    } else {
      setEmailErrorMsg(t('Invalid email format'))
    }
  }
  return (
    <div
      className={`flex flex-col p-6 transition-all duration-300 ${
        isFirstStep ? ' w-[400px] h-[250px]' : ' w-[670px] h-[230px] pt-9'
      }`}>
      <p className='text-2xl leading-6 font-bold text-center'>{t('Forgot password')}?</p>
      <div className='h-full relative'>
        <Transition
          className='absolute inset-0 flex flex-col'
          as='div'
          show={isFirstStep}
          leave=' transition-all duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='mt-1 mb-3'>
            <p className='text-xs leading-[15px] text-center line-clamp-1'>
              {t('Kindly enter the email linked to your account')},
            </p>
            <p className='text-xs leading-[15px] text-center line-clamp-1'>
              {t('we’ll send you a link to reset password')}
            </p>
          </div>
          <OutlineTextField
            label={t('Email')}
            placeholder={t('Enter email address')}
            errorMsg={emailErrorMsg}
            value={email}
            onChange={(e) => {
              setEmail(e)
              setEmailErrorMsg('')
            }}
          />
          <MainButton disabled={!email} loading={loading} className='mt-3' onClick={submit}>
            {t('Continue')}
          </MainButton>
        </Transition>
        <Transition
          as='div'
          className='flex flex-col justify-between items-center'
          show={!isFirstStep}
          enter=' transition-all duration-150 delay-150'
          enterFrom='opacity-0'
          enterTo='opacity-100'>
          <Image src={Mail} alt='' className='mt-3' />
          <div className='mt-3 text-subtle-dark'>
            <p className='text-sm leading-[18px] text-center line-clamp-1'>
              {t('A password reset link has been sent to')}{' '}
              <span className='text-second-color cursor-pointer'>{email}</span>.
            </p>
            <p className='text-sm leading-[18px] text-center line-clamp-1'>{t('Please check your email.')}</p>
          </div>
          <div className='flex flex-col text-center text-sm leading-[18px] text-subtle-dark mt-3'>
            <p className='line-clamp-1'>
              {t('Have not received any email')}?{' '}
              <span className='text-second-color cursor-pointer' onClick={() => setIsFirstStep(true)}>
                {t('Resend')}
              </span>
            </p>
          </div>
        </Transition>
      </div>
    </div>
  )
}
