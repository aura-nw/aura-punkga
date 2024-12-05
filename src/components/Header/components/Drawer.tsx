import Logo from 'assets/images/header-logo.svg'
import AboutUs from 'assets/images/icons/aboutUs.svg'
import Campaign from 'assets/images/icons/campaign.svg'
import Language from 'assets/images/icons/language.svg'
import LogOut from 'assets/images/icons/logout.svg'
import MyProfile from 'assets/images/icons/myProfile.svg'
import PunkgaWallet from 'assets/images/punkga.png'
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
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { storyChain } from 'src/services/wagmi/config'
import { shorten } from 'src/utils'
import TonWeb from 'tonweb'
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi'
export default function Drawer({ openNavigation, setOpenNavigation }) {
  const tonweb = new TonWeb()
  const config = getConfig()
  const { t } = useTranslation()
  const router = useRouter()
  const { setMigrateWalletOpen, setAddTonWalletOpen, setTeleQrCodeOpen } = useContext(ModalContext)
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
  const { pathname, asPath, query, locale } = router
  const switchLanguage = () => {
    const newLanguage = locale === 'en' ? 'vn' : 'en'
    router.push({ pathname, query }, asPath, { locale: newLanguage })
  }

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
    <>
      <div className='fixed inset-0 z-10 bg-black/80'></div>
      <div
        className={`z-40 divide-y divide-border-teriary flex flex-col bg-white text-[#414141] p-4 absolute top-0 right-0 h-screen overflow-auto w-4/5 transform transition-transform duration-300 ${
          openNavigation ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className='flex justify-between pb-4 sticky top-0 bg-white'>
          <Image src={Logo} alt='header logo' className='h-[29px] w-auto' />
          <div className='flex items-center gap-4'>
            {/* <Button
                      size='xs'
                      color='dark'
                      variant='outlined'
                      onClick={() => window.open(config.ADMIN_URL, '_blank')}>
                      Create Portal
                    </Button> */}
            <div
              className='w-6 h-6 mt-2 relative'
              onClick={() => {
                setOpenNavigation(false)
              }}>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M18 6.00005L6 18M5.99995 6L17.9999 18'
                  stroke='#000000'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </div>
          </div>
        </div>
        {account?.verified && account?.name && (
          <>
            <div className='pt-2 space-y-2'>
              <div className='flex p-2.5 gap-2 items-center text-base bg-background-bg-primary rounded-mlg '>
                <Image
                  src={account.image ? account.image : PunkgaWallet}
                  width={32}
                  height={32}
                  alt=''
                  className='rounded-full w-8 aspect-square'
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
              {account.noncustodialWalletAddress && (
                <div>
                  <div className='flex items-center gap-3 py-3' onClick={() => setShowWalletDetail(!showWalletDetail)}>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M1.99805 6.2832L2.00195 16.5832C2.00195 17.7614 2.95708 18.7165 4.13529 18.7165H15.8686C17.0468 18.7165 18.002 17.7614 18.002 16.5832V8.04987C18.002 7.06803 17.206 6.27209 16.2242 6.27209H2.01373C2.00667 6.27209 2.00039 6.27655 1.99805 6.2832ZM1.99805 6.2832C1.9987 6.08351 14.002 1.2832 14.002 1.2832V5.7832M13.7492 12.3026L13.7353 12.3165'
                        stroke='#009640'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <span className='text-sm font-medium'>{t('My wallet')}</span>
                  </div>
                  {showWalletDetail && (
                    <div className='space-y-2'>
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
                            <Button
                              size='sm'
                              className='mt-3 w-full'
                              onClick={() => {
                                setOpenNavigation(false)
                                setMigrateWalletOpen(true)
                              }}>
                              {t('Migrate wallet')}
                            </Button>
                          </>
                        ) : null}
                        {(address != account?.activeWalletAddress || !isConnected) &&
                          account?.noncustodialWalletAddress && (
                            <div className='flex items-center gap-1 mt-3 text-xs text-text-error-primary-3'>
                              <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
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
                            <div className='text-text-info-primary'>{`${shorten(
                              account?.tonWalletAddress,
                              8,
                              8
                            )}`}</div>
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
                </div>
              )}
              {!account.tonWalletAddress && (
                <div
                  className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
                  onClick={() => {
                    setOpenNavigation(false)
                    setAddTonWalletOpen(true)
                  }}>
                  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M18 13.8002V14.5502C18.4142 14.5502 18.75 14.2144 18.75 13.8002H18ZM18 9.4002H18.75C18.75 8.98598 18.4142 8.6502 18 8.6502V9.4002ZM5.99443 5.16931C5.646 5.3933 5.54513 5.85734 5.76912 6.20576C5.9931 6.55419 6.45714 6.65507 6.80557 6.43108L5.99443 5.16931ZM12 2.2002L12.592 1.73974C12.3537 1.43333 11.921 1.3594 11.5944 1.56931L12 2.2002ZM14.208 6.26065C14.4623 6.58761 14.9335 6.64651 15.2605 6.39221C15.5874 6.13791 15.6463 5.6667 15.392 5.33974L14.208 6.26065ZM18 13.0502H15.4V14.5502H18V13.0502ZM15.4 10.1502H18V8.6502H15.4V10.1502ZM17.25 9.4002V13.8002H18.75V9.4002H17.25ZM13.95 11.6002C13.95 10.7994 14.5992 10.1502 15.4 10.1502V8.6502C13.7708 8.6502 12.45 9.97096 12.45 11.6002H13.95ZM15.4 13.0502C14.5992 13.0502 13.95 12.401 13.95 11.6002H12.45C12.45 13.2294 13.7708 14.5502 15.4 14.5502V13.0502ZM6.80557 6.43108L12.4056 2.83108L11.5944 1.56931L5.99443 5.16931L6.80557 6.43108ZM11.408 2.66065L14.208 6.26065L15.392 5.33974L12.592 1.73974L11.408 2.66065ZM2.8 6.5502H16.4V5.0502H2.8V6.5502ZM16.4 17.0502H2.8V18.5502H16.4V17.0502ZM2.75 17.0002V6.6002H1.25V17.0002H2.75ZM2.8 17.0502C2.77239 17.0502 2.75 17.0278 2.75 17.0002H1.25C1.25 17.8562 1.94396 18.5502 2.8 18.5502V17.0502ZM16.45 17.0002C16.45 17.0278 16.4276 17.0502 16.4 17.0502V18.5502C17.256 18.5502 17.95 17.8562 17.95 17.0002H16.45ZM16.4 6.5502C16.4276 6.5502 16.45 6.57258 16.45 6.6002H17.95C17.95 5.74416 17.256 5.0502 16.4 5.0502V6.5502ZM2.8 5.0502C1.94396 5.0502 1.25 5.74416 1.25 6.6002H2.75C2.75 6.57258 2.77239 6.5502 2.8 6.5502V5.0502ZM16.45 14.4002V17.0002H17.95V14.4002H16.45ZM16.45 6.6002V8.7002H17.95V6.6002H16.45Z'
                      fill='#009640'
                    />
                  </svg>
                  {t('Add TON Space wallet')}
                </div>
              )}
              <div
                className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
                onClick={() => {
                  setOpenNavigation(false)
                  router.push('/profile')
                }}>
                <Image src={MyProfile} alt='' className='w-5 h-5' />
                {t('My profile')}
              </div>
            </div>
          </>
        )}
        <div className='space-y-2 pt-2'>
          <div
            className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
            onClick={() => {
              setOpenNavigation(false)
              router.push('/characters')
            }}>
            <Image src={AboutUs} alt='' className='w-5 h-5' />
            {t('Characters')}
          </div>
          <div
            className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
            onClick={() => {
              setOpenNavigation(false)
              router.push('/campaigns')
            }}>
            <Image src={Campaign} alt='' className='w-5 h-5' />
            {t('Campaign')}
          </div>
          <div
            className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
            onClick={() => {
              setOpenNavigation(false)
              router.push('/events')
            }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M19.0968 11.0871L12.0911 21.3205C11.7382 21.829 10.9079 21.6007 10.9079 20.9884L10.8976 15.1348C10.8976 14.4601 10.3268 13.9204 9.621 13.9101L5.43836 13.8582C4.9298 13.8478 4.62882 13.3185 4.90905 12.9137L11.9147 2.68029C12.2676 2.17173 13.0979 2.40007 13.0979 3.01241L13.1083 8.86603C13.1083 9.54064 13.6791 10.0803 14.3848 10.0907L18.5675 10.1426C19.0656 10.1426 19.3666 10.6823 19.0968 11.0871Z'
                stroke='#009640'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {t('Event')}
          </div>
          <div
            className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
            onClick={() => {
              setOpenNavigation(false)
              router.push('/collections')
            }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path
                d='M4 18H16C17.1046 18 18 17.0574 18 15.8947V4.10526C18 2.94256 17.1046 2 16 2H4C2.89543 2 2 2.94256 2 4.10526V15.8947C2 17.0574 2.89543 18 4 18Z'
                stroke='#009640'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5 12.9999H15L11.6667 7.16657L9.16667 10.9166L7.5 9.2499L5 12.9999Z'
                stroke='#009640'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {t('Collection')}
          </div>
          <div
            className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
            onClick={() => {
              setOpenNavigation(false)
              router.push('/about-us')
            }}>
            <Image src={AboutUs} alt='' className='w-5 h-5' />
            {t('About Us')}
          </div>
          <div>
            <div
              className='flex justify-between gap-3 items-center py-3 text-sm leading-[18px] font-medium'
              onClick={switchLanguage}>
              <div className='flex gap-3 items-center'>
                <Image src={Language} alt='' className='w-5 h-5' />
                <div>{t('Language')}</div>
              </div>

              <div className='flex gap-4 items-center'>
                {locale == 'en' ? (
                  <div className='text-text-brand-defaul font-medium'>EN</div>
                ) : (
                  <div className='text-text-brand-defaul font-medium'>VN</div>
                )}
              </div>
            </div>
          </div>
          {account && (
            <div
              className='flex gap-3 items-center py-3 text-sm leading-[18px] font-medium'
              onClick={() => {
                setOpenNavigation(false)
                logout()
              }}>
              <Image src={LogOut} alt='' className='w-5 h-5' />
              {t('Log out')}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
