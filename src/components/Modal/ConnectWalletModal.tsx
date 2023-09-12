import { useChain } from '@cosmos-kit/react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import FilledButton from 'components/Button/FilledButton'
import SubFilledButton from 'components/Button/FilledButton/SubFilledButton'
import C98 from 'images/c98.png'
import Keplr from 'images/keplr.png'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { setAddress } from 'src/services'
import Modal from '.'
import { Context } from 'src/context'
export default function ConnectWalletModal({ isOpen, setOpen, walletRepo, theme }) {
  const { address, disconnect } = useChain('aura')
  const [errorMsg, setErrorMsg] = useState('')
  const { t } = useTranslation()
  const { getProfile } = useContext(Context)
  const linkWalletToAccount = async () => {
    try {
      const res = await setAddress(address)
      await getProfile()
      if (res) {
        setOpen(false)
      } else {
        setErrorMsg(t('Link wallet failed'))
      }
    } catch (error) {
      console.error(error)
      if (error?.response?.data?.error.includes('authorizer_users_wallet_address_key')) {
        setErrorMsg(t('This wallet address was linked to another account'))
      } else {
        setErrorMsg(t('Link wallet failed'))
      }
    }
  }

  return (
    <Modal open={isOpen} setOpen={setOpen}>
      <div
        className={`flex flex-col p-5 gap-[10px] transition-all duration-300 overflow-hidden justify-start ${
          !address
            ? 'h-[222px] md:w-[380px]'
            : `h-[300px] min-[430px]:h-[320px] md:h-[348px] ${
                errorMsg ? 'h-[312px] min-[430px]:h-[332px] md:h-[360px]' : ''
              }`
        }`}>
        <p className='text-2xl leading-7 font-semibold text-center mt-[14px]'>{t('Link wallet')}</p>
        <div className='relative'>
          <div
            className={`top-0 w-full flex flex-col gap-[10px] transition-all duration-300 absolute ${
              !address ? 'opacity-100 z-10 ' : 'opacity-0 -z-10'
            }`}>
            {walletRepo?.wallets.map(({ walletName, connect }, index) =>
              walletName.includes('keplr') ? (
                <div
                  key={index}
                  className={`flex items-center justify-between bg-[#F1F2F4] text-subtle-dark p-[10px] rounded-xl ${
                    isMobile ? 'cursor-not-allowed opacity-60 pointer-events-none' : 'cursor-pointer'
                  }`}
                  onClick={() => connect()}>
                  <span className='text-2xl leading-10 font-medium'>Keplr</span>
                  <Image src={Keplr} alt='' />
                </div>
              ) : (
                <div
                  key={index}
                  className='flex items-center justify-between bg-[#F1F2F4] text-subtle-dark p-[10px] rounded-xl cursor-pointer'
                  onClick={() => connect()}>
                  <span className='text-2xl leading-10 font-medium'>C98</span>
                  <Image src={C98} alt='' />
                </div>
              )
            )}
          </div>
          <div
            className={`top-0 absolute w-full flex flex-col gap-5 transition-all overflow-hidden duration-300 ${
              address ? 'opacity-100 z-10 ' : 'opacity-0 -z-10 h-0'
            }`}>
            <div className='font-semibold text-sm sm:text-lg sm:leading-6 text-center h-6'>
              {t('Connect to this wallet address')}?
            </div>
            <div className='p-[10px] rounded-xl bg-light-medium-gray text-subtle-dark font-medium flex md:text-base min-[430px]:text-sm min-[390px]:text-xs text-[11px] justify-center'>
              {address}
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
                  disconnect()
                }}>
                {t('Change Wallet')}
              </SubFilledButton>
              <FilledButton
                className='w-full hidden md:block'
                size='lg'
                onClick={() => {
                  linkWalletToAccount()
                }}>
                {t('Link Wallet')}
              </FilledButton>
              <SubFilledButton
                className='w-full md:hidden'
                size='md'
                onClick={() => {
                  setErrorMsg('')
                  disconnect()
                }}>
                {t('Change Wallet')}
              </SubFilledButton>
              <FilledButton
                className='w-full md:hidden'
                size='md'
                onClick={() => {
                  linkWalletToAccount()
                }}>
                {t('Link Wallet')}
              </FilledButton>
            </div>
          </div>
        </div>
        <div className='p-[10px] rounded-xl bg-light-medium-gray text-gray-600 font-medium invisible h-0'>
          test1v43nh6wg2cwcqn66rhx3ecz3y889ww7z5jl3n0
        </div>
      </div>
    </Modal>
  )
}
