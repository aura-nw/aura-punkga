import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import FilledButton from 'components/Button/FilledButton'
import SubFilledButton from 'components/Button/FilledButton/SubFilledButton'
import C98 from 'images/c98.png'
import Keplr from 'images/keplr.png'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
export default function ConnectWalletModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [wallet, setWallet] = useState('')
  const { getWallet, connectWallet } = useContext(Context)
  const [errorMsg, setErrorMsg] = useState('')
  const { t } = useTranslation()
  const connectWalletHandler = async (provider) => {
    const w = await getWallet(provider)
    if (w) {
      setWallet(w)
      setStep(2)
    }
  }

  const connectWalletCallback = (status: string, error?: any) => {
    if (status === 'success') {
      onClose()
    } else {
      if (error?.response?.data?.error.includes('authorizer_users_wallet_address_key')) {
        setErrorMsg(t('This wallet address was linked to another account'))
      } else {
        alert(t('Link wallet failed'))
      }
    }
  }

  return (
    <div
      className={`flex flex-col p-5 gap-[10px] transition-all duration-300 overflow-hidden justify-start ${
        step == 1
          ? 'h-[222px] md:w-[380px]'
          : `h-[300px] min-[430px]:h-[320px] md:h-[348px] ${
              errorMsg ? 'h-[312px] min-[430px]:h-[332px] md:h-[360px]' : ''
            }`
      }`}>
      <p className='text-2xl leading-7 font-semibold text-center mt-[14px]'>{t('Link wallet')}</p>
      <div className='relative'>
        <div
          className={`top-0 w-full flex flex-col gap-[10px] transition-all duration-300 absolute ${
            step == 1 ? 'opacity-100 z-10 ' : 'opacity-0 -z-10'
          }`}>
          <div
            className='flex items-center justify-between bg-[#F1F2F4] text-subtle-dark p-[10px] rounded-xl cursor-pointer'
            onClick={() => connectWalletHandler('Coin98')}>
            <span className='text-2xl leading-10 font-medium'>Coin98</span>
            <Image src={C98} alt='' />
          </div>
          <div
            className='flex items-center justify-between bg-[#F1F2F4] text-subtle-dark p-[10px] rounded-xl cursor-pointer'
            onClick={() => connectWalletHandler('Keplr')}>
            <span className='text-2xl leading-10 font-medium'>Keplr</span>
            <Image src={Keplr} alt='' />
          </div>
        </div>
        <div
          className={`top-0 absolute w-full flex flex-col gap-5 transition-all overflow-hidden duration-300 ${
            step == 2 ? 'opacity-100 z-10 ' : 'opacity-0 -z-10 h-0'
          }`}>
          <div className='font-semibold text-sm sm:text-lg sm:leading-6 text-center h-6'>
            {t('Connect to this wallet address')}?
          </div>
          <div className='p-[10px] rounded-xl bg-light-medium-gray text-subtle-dark font-medium flex md:text-base min-[430px]:text-sm min-[390px]:text-xs text-[11px] justify-center'>
            {wallet}
          </div>
          {errorMsg && <div className='-mb-[10px] -mt-[15px] text-[#e50000] text-xs'>{errorMsg}</div>}
          <div className='flex p-[10px] rounded-xl bg-light-yellow gap-[10px]'>
            <ExclamationTriangleIcon className='text-medium-yellow w-6 h-6 min-w-[24px]' />
            <p className='text-subtle-dark font-medium max-w-[350px] text-xs min-[430px]:text-sm md:text-base'>
              {t('link-wallet-warning')}
            </p>
          </div>
          <div className='flex gap-[10px] -mt-[10px]'>
            <SubFilledButton
              className='w-full hidden md:block'
              size='lg'
              onClick={() => {
                setErrorMsg('')
                setStep(1)
              }}>
              {t('Change Wallet')}
            </SubFilledButton>
            <FilledButton
              className='w-full hidden md:block'
              size='lg'
              onClick={() => {
                setErrorMsg('')
                connectWallet(connectWalletCallback)
              }}>
              {t('Link Wallet')}
            </FilledButton>
            <SubFilledButton
              className='w-full md:hidden'
              size='md'
              onClick={() => {
                setErrorMsg('')
                setStep(1)
              }}>
              {t('Change Wallet')}
            </SubFilledButton>
            <FilledButton
              className='w-full md:hidden'
              size='md'
              onClick={() => {
                setErrorMsg('')
                connectWallet(connectWalletCallback)
              }}>
              {t('Link Wallet')}
            </FilledButton>
          </div>
        </div>
      </div>
      <div className='p-[10px] rounded-xl bg-light-medium-gray text-gray-600 font-medium invisible h-0'>
        aura1v43nh6wg2cwcqn66rhx3ecz3y889ww7z5jl3n0
      </div>
    </div>
  )
}
