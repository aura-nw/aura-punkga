import PunkgaWallet from 'assets/images/punkga.png'
import UserGreen from 'assets/images/userGreen.svg'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import Button from 'components/core/Button/Button'
import QRCode from 'images/QR Code.svg'
import CopySvg from 'images/icons/copy.svg'
import EyeClose from 'images/icons/eye-closed.svg'
import EyeOpen from 'images/icons/eye-open.svg'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { storyChain } from 'src/services/wagmi/config'
import { shorten } from 'src/utils'
import TonWeb from 'tonweb'
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi'
export default function UserDropdown() {
  const tonweb = new TonWeb()
  const config = getConfig()
  const { t } = useTranslation()
  const router = useRouter()
  const { setMigrateWalletOpen, setAddTonWalletOpen, setTeleQrCodeOpen } =
    useContext(ModalContext)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isTonCopied, setIsTonCopied] = useState(false)
  const [showWalletDetail, setShowWalletDetail] = useState(false)
  const [hideBalance, setHideBalance] = useState(false)
  const [hideTonBalance, setHideTonBalance] = useState(false)
  const [tonBalance, setTonBalance] = useState(0)
  const { account, logout } = useContext(Context)
  const walletBalance = useBalance({
    address: account?.activeWalletAddress as any,
  })
  const { switchChain } = useSwitchChain()
  const chainId = useChainId()
  const { isConnected, address, chain } = useAccount()
  async function checkTONBalance() {
    try {
      // Fetch account information
      const accountInfo = await tonweb.provider.getBalance(account?.tonWalletAddress)

      // Convert the balance from nanograms to TONs (1 TON = 1e9 nanograms)
      const balanceInTON = accountInfo / 1e9

      setTonBalance(balanceInTON)
    } catch (error) {
      console.error('Error fetching balance:', error.message)
    }
  }
  useEffect(() => {
    if (account?.tonWalletAddress) {
      checkTONBalance()
    }
  }, [account?.tonWalletAddress])
  const copyAddress = async () => {
    navigator.clipboard.writeText(account?.activeWalletAddress)
    setIsCopied(true)
    _.debounce(() => {
      _.delay(() => setIsCopied(false), 3000)
    }, 1000)()
  }
  const copyTonAddress = async () => {
    navigator.clipboard.writeText(account?.tonWalletAddress)
    setIsTonCopied(true)
    _.debounce(() => {
      _.delay(() => setIsTonCopied(false), 3000)
    }, 1000)()
  }
  const handleOpenWalletOnExplorer = () => {
    const url = new URL(`${chain.blockExplorers.default.url}/address/${account?.activeWalletAddress}`)
    window.open(url.toString(), '_blank')
  }
  return (
    <Dropdown>
      <DropdownToggle>
        {/* <MainButton hasAvatar style='secondary' leadingIcon={account?.image || Avatar}>
                      {account?.name}
                    </MainButton> */}
        <div className='relative p-0.5'>
          <div className='absolute inset-0 bg-[conic-gradient(#009640_70deg,#6D6D6D_0)] rounded-xl rotate-180'></div>
          <div className='border border-neautral-black p-[1px] bg-neutral-500 rounded-mlg relative'>
            <div className='border border-neutral-800 rounded-lg overflow-hidden'>
              <Image src={account?.image || UserGreen} width={50} height={50} className='w-12 h-12' alt='user' />
            </div>
          </div>
          <div className='absolute bottom-0 w-full font-jaro text-center text-stroke -mb-1'>
            <div className='text-base'>{account.level}</div>
            <div className='text-xs -mt-2'>LEVEL</div>
          </div>
        </div>
      </DropdownToggle>

      <DropdownMenu customClass='right-0 !w-[405px] max-w-[405px] !overflow-visible mt-[26px]'>
        <div className='p-5 flex flex-col gap-5'>
          <div className='flex p-2.5 gap-2 items-center text-base bg-background-bg-primary rounded-mlg '>
            <Image
              src={account.image ? account.image : PunkgaWallet}
              width={32}
              height={32}
              alt=''
              className='rounded-full'
            />
            <div className='text-sm font-medium text-text-primary w-full'>{account?.name}</div>
            <div onClick={() => setTeleQrCodeOpen(true)}>
              <Image src={QRCode} alt='' className='w-8 h-8' />
            </div>
          </div>
          <div className='text-xs font-normal text-brand-2-defaul'>
            Connected chain: {chainId == config.CHAIN_INFO.evmChainId ? 'Aura' : 'Story'} •{' '}
            <span
              className='underline'
              onClick={() => {
                switchChain({
                  chainId: chainId == config.CHAIN_INFO.evmChainId ? storyChain.id : config.CHAIN_INFO.evmChainId,
                })
              }}>
              {chainId == config.CHAIN_INFO.evmChainId ? 'Switch to Story' : 'Switch to Aura'}
            </span>
          </div>
          <div className='text-text-primary text-sm font-semibold leading-5'>
            {account.noncustodialWalletAddress && (
              <div onClick={() => setShowWalletDetail(!showWalletDetail)} className='flex items-center justify-between'>
                <span>{t('My wallet')}</span>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  className={`${showWalletDetail ? 'rotate-180' : ''}`}
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M7 10L12.0008 14.58L17 10'
                    stroke='#6D6D6D'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            )}
            {showWalletDetail && (
              <div className='space-y-2 my-2 font-medium'>
                <div className='bg-background-bg-primary p-2.5 rounded-mlg text-sm'>
                  <div className='text-[#ABABAB] text-sm mb-1'>{`${t('Wallet')}`}</div>
                  <div className='flex justify-between items-center text-[#4E5056] font-semibold relative'>
                    <div className='text-text-info-primary' onClick={handleOpenWalletOnExplorer}>{`${shorten(
                      account?.activeWalletAddress,
                      8,
                      8
                    )}`}</div>
                    <div onClick={copyAddress}>
                      <Image width={18} height={18} src={CopySvg} alt='' />
                    </div>
                    <span
                      className={`transition-all w-fit mr-2 absolute -top-full right-0 text-xs bg-light-gray py-1 px-2 border rounded-md ${
                        isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}>
                      {t('Copied')}
                    </span>
                  </div>
                  <div className='text-[#ABABAB] text-sm mt-3 mb-1'>{`${t('Balance')}`}</div>
                  <div className='flex justify-between items-center text-[#4E5056] font-semibold leading-5'>
                    <div className='flex items-center'>
                      {hideBalance
                        ? '********'
                        : `${(+walletBalance?.data?.formatted || 0).toFixed(2)} ${
                            walletBalance?.data?.symbol || 'AURA'
                          }`}
                    </div>
                    <span className='inline-block'>
                      {
                        <div className='ml-2 relative'>
                          {hideBalance ? (
                            <Image
                              src={EyeClose}
                              alt=''
                              onClick={() => setHideBalance(false)}
                              className='w-[18px] h-[18px] cursor-pointer'
                            />
                          ) : (
                            <Image
                              src={EyeOpen}
                              alt=''
                              onClick={() => setHideBalance(true)}
                              className='w-[18px] h-[18px] cursor-pointer'
                            />
                          )}
                        </div>
                      }
                    </span>
                  </div>
                  {!account?.noncustodialWalletAddress ? (
                    <>
                      <Button size='sm' className='mt-3 w-full' onClick={() => setMigrateWalletOpen(true)}>
                        {t('Migrate wallet')}
                      </Button>
                    </>
                  ) : null}
                  {(address != account?.activeWalletAddress || !isConnected) && account?.noncustodialWalletAddress && (
                    <div className='flex items-center gap-1 mt-3 text-xs text-text-error-primary-3'>
                      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M17.542 15.5891L10.8845 3.22578C10.4127 2.34922 9.15564 2.34922 8.68337 3.22578L2.02634 15.5891C1.92388 15.7794 1.87252 15.993 1.87725 16.209C1.88199 16.4251 1.94267 16.6363 2.05336 16.8219C2.16406 17.0075 2.32099 17.1613 2.50884 17.2681C2.69669 17.375 2.90904 17.4313 3.12517 17.4316H16.4412C16.6575 17.4317 16.8701 17.3756 17.0582 17.2688C17.2463 17.1621 17.4035 17.0084 17.5144 16.8227C17.6254 16.637 17.6862 16.4258 17.691 16.2095C17.6959 15.9933 17.6445 15.7795 17.542 15.5891ZM9.78415 15.5176C9.62963 15.5176 9.47859 15.4718 9.35011 15.3859C9.22164 15.3001 9.1215 15.1781 9.06237 15.0353C9.00324 14.8925 8.98777 14.7355 9.01791 14.5839C9.04806 14.4324 9.12246 14.2932 9.23172 14.1839C9.34098 14.0746 9.48019 14.0002 9.63174 13.9701C9.78328 13.9399 9.94037 13.9554 10.0831 14.0145C10.2259 14.0737 10.3479 14.1738 10.4337 14.3023C10.5196 14.4308 10.5654 14.5818 10.5654 14.7363C10.5654 14.9435 10.4831 15.1422 10.3366 15.2888C10.1901 15.4353 9.99135 15.5176 9.78415 15.5176ZM10.6326 7.66016L10.4084 12.4258C10.4084 12.5915 10.3425 12.7505 10.2253 12.8677C10.1081 12.9849 9.94913 13.0508 9.78337 13.0508C9.61761 13.0508 9.45864 12.9849 9.34143 12.8677C9.22422 12.7505 9.15837 12.5915 9.15837 12.4258L8.93415 7.66211C8.92911 7.54828 8.94704 7.4346 8.98688 7.32784C9.02671 7.22109 9.08763 7.12344 9.166 7.04073C9.24437 6.95802 9.33859 6.89194 9.44305 6.84642C9.5475 6.8009 9.66006 6.77688 9.774 6.77578H9.7822C9.89691 6.77572 10.0105 6.79891 10.116 6.84393C10.2215 6.88896 10.3168 6.95489 10.3961 7.03776C10.4754 7.12063 10.5371 7.21871 10.5775 7.32608C10.6179 7.43346 10.6361 7.5479 10.631 7.6625L10.6326 7.66016Z'
                          fill='#F73B3B'
                        />
                      </svg>
                      Wallet not connected
                    </div>
                  )}
                </div>
                {account?.tonWalletAddress && (
                  <div className='bg-background-bg-primary p-2.5 rounded-mlg text-sm'>
                    <div className='text-[#ABABAB] text-sm mb-1'>{`${t('TON Space')}`}</div>
                    <div className='flex justify-between items-center text-[#4E5056] font-semibold relative'>
                      <div className='text-text-info-primary'>{`${shorten(account?.tonWalletAddress, 8, 8)}`}</div>
                      <div onClick={copyTonAddress}>
                        <Image width={18} height={18} src={CopySvg} alt='' />
                      </div>
                      <span
                        className={`transition-all w-fit mr-2 absolute -top-full right-0 text-xs bg-light-gray py-1 px-2 border rounded-md ${
                          isTonCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}>
                        {t('Copied')}
                      </span>
                    </div>
                    <div className='text-[#ABABAB] text-sm mt-3 mb-1'>{`${t('Balance')}`}</div>
                    <div className='flex justify-between items-center text-[#4E5056] font-semibold leading-5'>
                      <div className='flex items-center'>
                        {hideTonBalance ? '********' : `${tonBalance.toFixed(2)} TON`}
                      </div>
                      <span className='inline-block'>
                        {
                          <div className='ml-2 relative'>
                            {hideTonBalance ? (
                              <Image
                                src={EyeClose}
                                alt=''
                                onClick={() => setHideTonBalance(false)}
                                className='w-[18px] h-[18px] cursor-pointer'
                              />
                            ) : (
                              <Image
                                src={EyeOpen}
                                alt=''
                                onClick={() => setHideTonBalance(true)}
                                className='w-[18px] h-[18px] cursor-pointer'
                              />
                            )}
                          </div>
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <span className='w-full block my-[10px] border-[1px] border-solid border-[#F0F0F0] '></span>
            {!account.tonWalletAddress && (
              <>
                <div
                  onClick={() => {
                    setAddTonWalletOpen(true)
                  }}>
                  <span>{t('Add TON Space wallet')}</span>
                </div>
                <span className='w-full block my-[10px] border-[1px] border-solid border-[#F0F0F0] '></span>
              </>
            )}
            <div onClick={() => router.push('/profile')}>
              <span>{t('My profile')}</span>
            </div>
            <span className='w-full block my-[10px] border-[1px] border-solid border-[#F0F0F0] '></span>
            <div onClick={logout}>
              <span>{t('Log out')}</span>
            </div>
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  )
}
