import Button from 'components/core/Button/Button'
import TextField from 'components/Input/TextField'
import OutlineTextField from 'components/Input/TextField/Outline'
import Mail from 'images/Mail.svg'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
export default function AddTonWalletModal() {
  const { resendVerifyEmail } = useContext(Context)
  const { setAddTonWalletOpen } = useContext(ModalContext)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const handler = async () => {
    try {
      setLoading(true)
    } catch (error) {
      setLoading(false)
      toast(error.message, { type: 'error' })
    }
  }
  return (
    <div className={` py-6 px-8 flex flex-col gap-8 w-full max-w-[670px]`}>
      <div className='space-y-2'>
        <div className='text-lg font-semibold text-center'>{t('Confirm to link TON Space wallet')}</div>
        <div className='text-sm text-center'>
          {t('Your account will be linked to the wallet address.')}
          <br />
          {t('This action is irreversible')}
        </div>
      </div>
      <div className='space-y-2'>
        <label className='text-sm text-text-teriary font-medium'>{t('Enter your TON Space wallet address...')}</label>
        <OutlineTextField value={value} onChange={setValue} placeholder={t('Your TON Space address')} />
      </div>
      <div className='grid grid-cols-2 gap-4 -mt-4'>
        <Button color='dark' size='sm' className='w-full' onClick={() => setAddTonWalletOpen(false)}>
          {t('Cancel')}
        </Button>
        <Button size='sm' className='w-full' onClick={handler} loading={loading}>
          {t('Continue')}
        </Button>
      </div>
    </div>
  )
}
