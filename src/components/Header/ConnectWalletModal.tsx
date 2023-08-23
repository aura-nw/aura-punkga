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
  const { t } = useTranslation()
  const connectWalletHandler = async (provider) => {
    const w = await getWallet(provider)
    setWallet(w)
    setStep(2)
  }

  const connectWalletCallback = (status: string) => {
    if (status === 'success') {
      onClose()
    } else {
      alert('Link wallet failed')
    }
  }

  return (
    <div
      className={`flex flex-col p-5 gap-[10px] transition-all duration-300 overflow-hidden justify-start ${
        step == 1 ? 'h-[222px]' : 'h-[300px] min-[430px]:h-[320px] md:h-[338px]'
      }`}>
      <p className='text-2xl leading-7 font-semibold text-center '>{t('Link Wallet')}</p>
      <div className='relative'>
        <div
          className={`top-0 w-full flex flex-col gap-5 transition-all duration-300 absolute ${
            step == 1 ? 'opacity-100 z-10 ' : 'opacity-0 -z-10'
          }`}>
          <div
            className='flex items-center justify-between bg-light-medium-gray text-gray-600 p-[10px] rounded-xl cursor-pointer'
            onClick={() => connectWalletHandler('Coin98')}>
            <span className='text-base leading-10 font-medium'>Coin98</span>
            <Image src={C98} alt='' />
          </div>
          <div
            className='flex items-center justify-between bg-light-medium-gray text-gray-600 p-[10px] rounded-xl cursor-pointer'
            onClick={() => connectWalletHandler('Keplr')}>
            <span className='text-base leading-10 font-medium'>Keplr</span>
            <Image src={Keplr} alt='' />
          </div>
        </div>
        <div
          className={`top-0 absolute w-full flex flex-col gap-5 transition-all overflow-hidden duration-300 ${
            step == 2 ? 'opacity-100 z-10 ' : 'opacity-0 -z-10 h-0'
          }`}>
          <div className='font-semibold text-md sm:text-lg leading-6 text-center'>
            {t('Connect to this wallet address')}?
          </div>
          <div className='p-[10px] rounded-xl bg-light-medium-gray text-gray-600 font-medium flex md:text-base min-[430px]:text-sm min-[390px]:text-xs text-[11px] justify-center'>
            {wallet}
          </div>
          <div className='flex p-[10px] rounded-xl bg-light-yellow gap-[10px]'>
            <ExclamationTriangleIcon className='text-medium-yellow w-6 h-6 min-w-[24px]' />
            <p className='text-gray-600 font-medium max-w-[350px] text-xs min-[430px]:text-sm md:text-base'>
              {t('link-wallet-warning')}
            </p>
          </div>
          <div className='flex gap-[10px] md:-mt-[10px]'>
            <SubFilledButton className='w-full hidden md:block' size='lg' onClick={() => setStep(1)}>
              {t('Change Wallet')}
            </SubFilledButton>
            <FilledButton
              className='w-full hidden md:block'
              size='lg'
              onClick={() => connectWallet(connectWalletCallback)}>
              {t('Link Wallet')}
            </FilledButton>
            <SubFilledButton className='w-full md:hidden' size='md' onClick={() => setStep(1)}>
              {t('Change Wallet')}
            </SubFilledButton>
            <FilledButton className='w-full md:hidden' size='md' onClick={() => connectWallet(connectWalletCallback)}>
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
