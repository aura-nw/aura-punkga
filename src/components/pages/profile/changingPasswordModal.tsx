import FilledButton from 'components/Button/FilledButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import Modal from 'components/Modal'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import SuccessImg from 'images/Mascot2.png'
import { convertStringToDot, validatePassword } from 'src/utils'
import CheckSquare from 'images/icons/check_square_fill.svg'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import Eye from 'assets/images/icons/eye.svg'
import EyeClosed from 'assets/images/icons/eye_closed.svg'
import MainButton from 'components/Button/MainButton'
import ChupButton from 'components/core/Button/ChupButton'
export default function ChangingPasswordModal({ open, setOpen }) {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [rePasswordError, setRePasswordError] = useState('')
  const { updateProfile, account } = useContext(Context)
  const [repasswordValidateSuccess, setRepasswordValidateSuccess] = useState(false)
  const r1 = useRef<any>()
  const r2 = useRef<any>()
  const { t } = useTranslation()
  useEffect(() => {
    _.delay(() => {
      if (!open) {
        setSuccess(false)
        setLoading(false)
        setRepasswordValidateSuccess(false)
        setCurrentPassword('')
        setCurrentPasswordError('')
        setNewPassword('')
        setRePassword('')
        setRePasswordError('')
      }
    }, 1000)
  }, [open])
  useEffect(() => {
    setRePasswordError('')
    if (rePassword == newPassword && newPassword) {
      setRepasswordValidateSuccess(true)
    } else {
      setRepasswordValidateSuccess(false)
    }
  }, [rePassword, newPassword])

  useEffect(() => {
    setCurrentPasswordError('')
  }, [currentPassword])

  const changePasswordHandler = async () => {
    try {
      if (newPassword != rePassword) {
        setRePasswordError(t('Password doesn’t match'))
        return
      }
      if (newPassword == currentPassword) {
        setRePasswordError(t('New and old passwords must not match'))
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
      const res = await updateProfile({
        old_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: rePassword,
      })
      if (res) {
        setLoading(false)
        setSuccess(true)
      } else {
        setLoading(false)
        setCurrentPasswordError(t('Incorrect password'))
      }
    } catch (error) {
      console.log(error.message)
      if (error.message.includes('incorrect old')) {
        setCurrentPasswordError(t('Incorrect password'))
      }
      setLoading(false)
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} hideClose={success} preventClickOutsideToClose>
      <div className={`p-6 w-[322px] transition-all duration-300 h-auto`}>
        <div className={` flex flex-col gap-6 transition-all duration-300 ${success ? 'opacity-0' : 'opacity-100'}`}>
          <p className='text-center text-xl leading-6 font-bold'>{t('Change password')}</p>
          <OutlineTextField
            label={t('Old password')}
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder={t('Enter current password')}
            errorMsg={currentPasswordError}
            onKeyDown={(e) => {
              if (e.which == 13) {
                r1.current?.focus()
              }
            }}
            type='password'
          />
          <div>
            <OutlineTextField
              label={t('New password')}
              value={newPassword}
              onChange={setNewPassword}
              type='password'
              placeholder={t('Enter new password')}
              inputRef={r1}
              onKeyDown={(e) => {
                if (e.which == 13) {
                  r2.current?.focus()
                }
              }}
            />
            <OutlineTextField
              label={t('Confirm new password')}
              value={rePassword}
              onChange={setRePassword}
              type='password'
              trailingComponent={
                <div className='flex items-center gap-[10px]'>
                  {repasswordValidateSuccess ? <Image src={CheckSquare} alt='' /> : null}
                </div>
              }
              errorMsg={rePasswordError}
              inputRef={r2}
              placeholder={t('Re-enter new password')}
            />
          </div>
          <ChupButton
            size='sm'
            disabled={!newPassword || !rePassword || !currentPassword}
            className='w-full'
            loading={loading}
            onClick={changePasswordHandler}>
            {t('Confirm')}
          </ChupButton>
        </div>
        <div
          className={`absolute inset-0 py-6 px-4 flex flex-col gap-6 transition-all duration-300 ${
            success ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          <p className='text-center text-xl leading-6 font-bold'>{t('Successful password change')}!</p>
          <Image src={SuccessImg} alt='' className='w-[188px] mx-auto max-h-[188px]' />
          <div className='flex flex-col gap-2'>
            <p className='text-sm leading-[18px] font-semibold text-center w-[246px] mx-auto'>
              {t('You can use the new password to log in Punkga now')}
            </p>
            <ChupButton
              className='w-full'
              onClick={() => {
                setOpen(false)
              }}>
              {t('Continue')}
            </ChupButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}
