import MainButton from 'components/Button/MainButton'
import Footer from 'components/Footer'
import Header from 'components/Header'
import OutlineTextField from 'components/Input/TextField/Outline'
import CheckSquare from 'images/icons/check_square_fill.svg'
import SuccessImg from 'images/Mascot2.png'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { validatePassword } from 'src/utils'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <ResetPassword />
}
function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { t } = useTranslation()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [rePasswordError, setRePasswordError] = useState('')
  const { resetPassword } = useContext(Context)
  const { setSignInOpen } = useContext(ModalContext)
  const r = useRef<any>()
  const [repasswordValidateSuccess, setRepasswordValidateSuccess] = useState(false)
  const router = useRouter()
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
      } else {
        if (res?.message) {
          setRePasswordError(t(res?.message))
        } else {
          setRePasswordError(t('Something went wrong'))
        }
      }
    } catch (error) {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <>
        <Header />
        <div className='pk-container py-4'>Missing token!</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      {!success ? (
        <div className='flex justify-center md:items-center py-[120px] flex-col w-full max-w-[398px] mx-auto'>
          <p className='text-center text-xl leading-6 font-bold mb-10'>{t('Reset password')}</p>
          <OutlineTextField
            label={t('New password')}
            value={newPassword}
            onChange={setNewPassword}
            type='password'
            placeholder={t('Enter new password')}
            onKeyDown={(e) => {
              if (e.which == 13) {
                r.current?.focus()
              }
            }}
          />
          <OutlineTextField
            label={t('Confirm new password')}
            value={rePassword}
            onChange={setRePassword}
            type='password'
            errorMsg={rePasswordError}
            placeholder={t('Re-enter new password')}
            inputRef={r}
            trailingComponent={repasswordValidateSuccess ? <Image src={CheckSquare} alt='' /> : null}
          />
          <MainButton
            className='w-full mt-3'
            disabled={!newPassword || !rePassword}
            loading={loading}
            onClick={setPasswordHandler}>
            {t('Reset password')}
          </MainButton>
        </div>
      ) : (
        <div className='flex justify-center md:items-center my-[30px] flex-col w-full max-w-[393px] mx-auto p-6'>
          <p className='text-center text-xl leading-6 font-bold'>{t('Successful password reset')}!</p>
          <Image src={SuccessImg} alt='' className='mx-auto my-5 w-[320px] h-[320px]' />
          <p className='text-sm leading-6 font-semibold text-center mx-auto text-[#414141]'>
            {t('You can use the new password to log in Punkga now')}
          </p>
          <MainButton
            className='mt-2 mx-auto w-full'
            onClick={() => {
              setSignInOpen(true)
            }}>
            {t('Sign in')}
          </MainButton>
        </div>
      )}
      <Footer />
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
