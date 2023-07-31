import FilledButton from 'components/Button/FilledButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import { Fragment, useEffect, useState } from 'react'
import { validateEmail } from 'src/utils'
import Mail from 'images/Mail.svg'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFirstStep, setIsFirstStep] = useState(true)
  const { t } = useTranslation()
  const submit = async () => {
    if (validateEmail(email)) {
      setLoading(true)
      setIsFirstStep(false)
    } else {
    }
  }
  return (
    <div
      className={`flex flex-col p-6 gap-3 transition-all duration-300 h-[250px] ${
        isFirstStep ? ' w-[322px] ' : ' w-[670px]'
      }`}>
      <p className='text-2xl leading-6 font-semibold text-center '>{t('Forgot password')}?</p>
      <div className='h-full relative'>
        <Transition
          className='absolute inset-0 flex flex-col gap-3'
          as='div'
          show={isFirstStep}
          leave=' transition-all duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div>
            <p className='text-xs leading-[14px] text-center'>{t('Kindly enter the email linked to your account')},</p>
            <p className='text-xs leading-[14px] text-center'>{t('we’ll send you a link to reset password')}</p>
          </div>
          <OutlineTextField
            label={t('Email')}
            placeholder={t('Enter email address')}
            value={email}
            onChange={setEmail}
          />
          <FilledButton
            disabled={!email || !validateEmail(email)}
            loading={loading}
            size='lg'
            className='mx-auto'
            onClick={() => setIsFirstStep(!isFirstStep)}>
            {t('Continue')}
          </FilledButton>
        </Transition>
        <Transition
          as='div'
          className='flex flex-col gap-3 justify-between items-center'
          show={!isFirstStep}
          enter=' transition-all duration-150 delay-150'
          enterFrom='opacity-0'
          enterTo='opacity-100'>
          <Image src={Mail} alt='' />
          <div>
            <p className='text-base leading-5 text-center line-clamp-1'>
              {t('A password reset link has been sent to')}{' '}
              <span className='text-second-color font-semibold cursor-pointer'>{email}</span>.
            </p>
            <p className='text-base leading-5 text-center line-clamp-1'>
              {'Please click on the link to change your password.'}
            </p>
          </div>
          <div className='flex flex-col text-center'>
            <p className='line-clamp-1'>
              {t('Have not received any email')}?{' '}
              <span className='text-second-color font-semibold cursor-pointer' onClick={() => setIsFirstStep(true)}>
                {t('Click here')}
              </span>{' '}
              {t('to resend verification link')}
            </p>
            <p className='line-clamp-1'>
              {t('Or')} <span className='text-second-color font-semibold cursor-pointer'>{t('sign up')}</span>{' '}
              {t('with another email')}
            </p>
          </div>
        </Transition>
      </div>
    </div>
  )
}
