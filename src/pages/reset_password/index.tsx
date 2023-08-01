import Header from 'components/Header'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Ninja from 'images/ninja.svg'
import FilledButton from 'components/Button/FilledButton'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { i18n } from 'next-i18next'
import OutlineTextField from 'components/Input/TextField/Outline'
import Modal from 'components/Modal'
import { useState, useContext, useEffect } from 'react'
import { Context } from 'src/context'
import { validatePassword } from 'src/utils'
import SuccessImg from 'images/ninja.svg'
import CheckSquare from 'images/icons/check_square_fill.svg'
export default function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [rePasswordError, setRePasswordError] = useState('')
  const { resetPassword } = useContext(Context)
  const router = useRouter()
  const [repasswordValidateSuccess, setRepasswordValidateSuccess] = useState(false)
  useEffect(() => {
    setRePasswordError('')
    if (rePassword == newPassword && newPassword) {
      setRepasswordValidateSuccess(true)
    } else {
      setRepasswordValidateSuccess(false)
    }
  }, [rePassword, newPassword])

  const setPasswordHandler = async () => {
    try {
      if (newPassword != rePassword) {
        setRePasswordError(t('Password doesn’t match'))
        return
      }
      if (!validatePassword(newPassword)) {
        setRePasswordError(
          t(
            'Password needs to be at least 6 characters long and contain at least one number, one uppercase letter, one lowercase letter and one special character'
          )
        )
        return
      }
      setLoading(true)
      const res = await resetPassword(token, newPassword)
      setLoading(false)
      if (res) {
        setSuccess(true)
        return
      }
      setRePasswordError(t('Something went wrong'))
    } catch (error) {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <>
        <Header />
        <div className='pk-container py-4'>Missing token!</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <Modal
        open={open}
        setOpen={() => {
          setOpen(false)
        }}>
        <div className={`p-6 w-[322px] relative transition-all duration-300 ${success ? 'h-[400px]' : ''}`}>
          <div className={` flex flex-col gap-3 transition-all duration-300 ${success ? 'opacity-0' : 'opacity-100'}`}>
            <p className='text-center text-xl leading-6 font-semibold'>{t('Set password')}</p>
            <OutlineTextField
              label={t('New password')}
              value={newPassword}
              onChange={setNewPassword}
              type='password'
              placeholder={t('Enter new password')}
            />
            <OutlineTextField
              label={t('Confirm new password')}
              value={rePassword}
              onChange={setRePassword}
              type='password'
              errorMsg={rePasswordError}
              placeholder={t('Re-Enter new password')}
              trailingComponent={repasswordValidateSuccess ? <Image src={CheckSquare} alt='' /> : null}
            />
            <FilledButton
              disabled={!newPassword || !rePassword}
              className='mt-2 mx-auto'
              size='lg'
              loading={loading}
              onClick={setPasswordHandler}>
              {t('Confirm')}
            </FilledButton>
          </div>
          <div
            className={`absolute inset-0 py-6 px-4 flex flex-col gap-3 transition-all duration-300 ${
              success ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            <p className='text-center text-xl leading-6 font-semibold'>{t('Successful password set up')}!</p>
            <Image src={SuccessImg} alt='' className='mx-auto' />
            <p className='text-sm leading-6 font-medium text-center w-[246px] mx-auto'>
              {t('You can now use the new password to sign in to your account')}
            </p>
            <FilledButton
              className='mt-2 mx-auto'
              size='lg'
              onClick={() => {
                router.push('/')
              }}>
              {t('Explore')}
            </FilledButton>
          </div>
        </div>
      </Modal>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
