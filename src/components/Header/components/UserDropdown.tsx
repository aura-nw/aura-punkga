import UserGreen from 'assets/images/userGreen.svg'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import Button from 'components/core/Button/Button'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { storyChain } from 'src/services/wagmi/config'
import { formatNumber, shorten } from 'src/utils'
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi'
import DP from 'assets/images/dp.svg'
import Link from 'next/link'
export default function UserDropdown() {
  const config = getConfig()
  const { t } = useTranslation()
  const router = useRouter()
  const [showActivities, setShowActivities] = useState(false)
  const { setMigrateWalletOpen } = useContext(ModalContext)
  const [isCopied, setIsCopied] = useState(false)
  const [showWalletDetail, setShowWalletDetail] = useState(false)
  const [hideBalance, setHideBalance] = useState(false)
  const { account, logout } = useContext(Context)
  const walletBalance = useBalance({
    address: account?.activeWalletAddress as any,
  })
  const dpBalance = useBalance({
    address: account?.activeWalletAddress as any,
    token: config.DP_ADDRESS,
  })
  const { switchChain } = useSwitchChain()
  const chainId = useChainId()
  const { isConnected, address, chain } = useAccount()

  const copyAddress = async () => {
    navigator.clipboard.writeText(account?.activeWalletAddress)
    setIsCopied(true)
    _.debounce(() => {
      _.delay(() => setIsCopied(false), 3000)
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
          <div className='border border-neutral-black p-[1px] bg-neutral-500 rounded-mlg relative'>
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

      <DropdownMenu customClass='right-0 !w-[405px] max-w-[405px] !overflow-visible mt-[26px] !bg-transparent'>
        <div className='p-4 border-2 border-[#B0B0B0] flex flex-col bg-[#3D3D3DE5] rounded-mlg'>
          {showActivities ? (
            <>
              <div>
                <div className='text-sm font-bold flex items-center' onClick={() => setShowActivities(false)}>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M15 17L10 12L15 7'
                      stroke='white'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  Activity
                </div>
                <div className='mt-4 space-y-4 h-[400px] overflow-auto'>
                  {account?.activities?.map((act, index) => {
                    if (act.type == 'SUBMIT_ARTWORK')
                      return (
                        <Link
                          target='_blank'
                          href={`${storyChain.blockExplorers.default.url}/tx/${act.story_artwork?.artwork_topic?.distribute_reward_hash}`}
                          key={index}
                          className='flex gap-4 items-center'>
                          <Image
                            alt=''
                            src={act.story_artwork.display_url}
                            width={100}
                            height={100}
                            className='w-11 h-11 rounded-lg object-cover'
                          />
                          <div className='w-full min-w-0'>
                            <div className='text-[#10B970] text-sm font-medium'>Submit</div>
                            <div className='mt-1 flex justify-between items-center w-full'>
                              <div className='text-xs font-bold text-neutral-200 truncate whitespace-nowrap min-w-0'>
                                {act.story_artwork.name}
                              </div>
                              <div className='text-xs font-medium'>+{formatNumber(act.amount)}DP</div>
                            </div>
                          </div>
                        </Link>
                      )
                    return null
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='p-2.5 text-base bg-neutral-950 rounded-mlg'>
                <div className='font-bold text-green-500 w-full'>{account?.name}</div>
                <div className='flex justify-between items-center'>
                  <Link
                    href={`${storyChain.blockExplorers.default.url}/token/${config.DP_ADDRESS}`}
                    className='mt-1.5 flex items-center gap-1.5 text-sm font-medium'>
                    <Image src={DP} width={50} height={50} className='w-[18px] h-[18px]' alt='dream-point' />
                    {formatNumber(+(+dpBalance?.data?.formatted || 0).toFixed(2))} {dpBalance?.data?.symbol || 'AURA'}
                  </Link>
                  <div
                    className='flex items-center text-sm text-feedback-info-link-defaul'
                    onClick={() => setShowActivities(true)}>
                    Activity
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M10 7L15 12L10 17'
                        stroke='#2D72FB'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='text-xs font-normal text-white mt-2'>
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
              <div className='text-white text-sm font-medium leading-5'>
                {account.noncustodialWalletAddress && (
                  <div
                    onClick={() => setShowWalletDetail(!showWalletDetail)}
                    className='flex items-center justify-between py-[18px] cursor-pointer'>
                    <div className='flex items-center gap-3'>
                      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M1.99805 6.28125L2.00195 16.5812C2.00195 17.7595 2.95708 18.7146 4.13529 18.7146H15.8686C17.0468 18.7146 18.002 17.7595 18.002 16.5812V8.04792C18.002 7.06608 17.206 6.27014 16.2242 6.27014H2.01373C2.00667 6.27014 2.00039 6.27459 1.99805 6.28125ZM1.99805 6.28125C1.9987 6.08156 14.002 1.28125 14.002 1.28125V5.78125M13.7492 12.3007L13.7353 12.3146'
                          stroke='#E7E7E7'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span>{t('My wallet')}</span>
                    </div>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      className={`${showWalletDetail ? 'rotate-180' : ''}`}
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M7 10L12.0008 14.58L17 10'
                        stroke='#fff'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                )}
                {showWalletDetail && (
                  <div className='space-y-2 my-2 font-medium'>
                    <div className='bg-neutral-950 p-2.5 rounded-mlg text-sm'>
                      <div className='text-[#fff] text-sm mb-1'>{`${t('Wallet')}`}</div>
                      <div className='flex justify-between items-center text-[#fff] font-semibold relative'>
                        <div className='text-text-info-primary' onClick={handleOpenWalletOnExplorer}>{`${shorten(
                          account?.activeWalletAddress,
                          8,
                          8
                        )}`}</div>
                        <div onClick={copyAddress}>
                          <svg
                            width='15'
                            height='16'
                            viewBox='0 0 15 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M6.98537 4.24688V6.27188C6.98537 6.64467 7.28758 6.94688 7.66037 6.94688H9.68537M11.0354 1.54688H6.31021C5.56463 1.54688 4.96021 2.15129 4.96021 2.89687V4.24688M11.0354 1.54688H11.4119C11.602 1.54688 11.783 1.62694 11.9139 1.76472C12.1107 1.97178 12.4225 2.29058 12.7229 2.55938C12.9583 2.77004 13.3282 3.14811 13.5497 3.37789C13.6695 3.50215 13.7354 3.66806 13.7354 3.84066L13.7354 4.24688M11.0354 1.54688V3.57188C11.0354 3.94467 11.3376 4.24688 11.7104 4.24688H13.7354M13.7354 4.24688L13.7352 10.9969C13.7352 11.7425 13.1308 12.3469 12.3852 12.3469H9.68516M8.67287 5.25938C8.37245 4.99058 8.06071 4.67178 7.86391 4.46472C7.73295 4.32694 7.55201 4.24688 7.36192 4.24688H2.26021C1.51463 4.24688 0.910213 4.85129 0.910208 5.59687L0.910156 13.6968C0.910151 14.4424 1.51457 15.0468 2.26015 15.0469L8.33518 15.0469C9.08075 15.0469 9.68517 14.4425 9.68518 13.6969L9.68536 6.54066C9.68537 6.36806 9.61952 6.20215 9.49973 6.07789C9.27822 5.84812 8.90832 5.47004 8.67287 5.25938Z'
                              stroke='#fff'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                        <span
                          className={`transition-all w-fit mr-2 absolute -top-full right-0 text-xs bg-light-gray py-1 px-2 border rounded-md text-black ${
                            isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}>
                          {t('Copied')}
                        </span>
                      </div>
                      <div className='text-[#fff] text-sm mt-3 mb-1'>{`${t('Balance')}`}</div>
                      <div className='flex justify-between items-center text-[#fff] font-semibold leading-5'>
                        <div className='flex items-center'>
                          {hideBalance
                            ? '********'
                            : `${formatNumber(+(+walletBalance?.data?.formatted || 0).toFixed(2))} ${
                                walletBalance?.data?.symbol || 'AURA'
                              }`}
                        </div>
                        <span className='inline-block'>
                          {
                            <div className='ml-2 relative'>
                              {hideBalance ? (
                                <svg
                                  width='18'
                                  height='18'
                                  viewBox='0 0 18 18'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='w-[18px] h-[18px] cursor-pointer'>
                                  <path
                                    d='M15.3008 14.625L4.05078 3.375M7.65078 7.83118C7.37072 8.13994 7.20078 8.54553 7.20078 8.98973C7.20078 9.95707 8.00667 10.7412 9.00078 10.7412C9.45914 10.7412 9.87748 10.5745 10.1953 10.3M15.3299 10.7412C15.9495 9.81362 16.2008 9.0571 16.2008 9.0571C16.2008 9.0571 14.5623 3.825 9.00078 3.825C8.68855 3.825 8.38869 3.84149 8.10078 3.87262M13.0508 13.0121C12.0177 13.6711 10.6878 14.1371 9.00078 14.1096C3.50847 14.0197 1.80078 9.0571 1.80078 9.0571C1.80078 9.0571 2.59417 6.52356 4.95078 4.98249'
                                    stroke='#fff'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width='18'
                                  height='18'
                                  viewBox='0 0 18 18'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='w-[18px] h-[18px] cursor-pointer'>
                                  <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M2.6047 9.07949C2.65453 9.19313 2.72468 9.343 2.81724 9.51863C3.04185 9.94486 3.3942 10.5148 3.90188 11.0856C4.90898 12.2179 6.52217 13.3533 9.01335 13.394C11.4884 13.4345 13.0909 12.3081 14.0959 11.1579C14.6029 10.5776 14.9555 9.99222 15.1807 9.55196C15.277 9.36385 15.3491 9.20392 15.3995 9.08448C15.3505 8.96229 15.2798 8.79792 15.1848 8.60414C14.9643 8.15444 14.6173 7.55561 14.1137 6.95937C13.1154 5.77745 11.5107 4.60938 9.00109 4.60938C6.49145 4.60938 4.88678 5.77745 3.88848 6.95937C3.38487 7.55561 3.0379 8.15444 2.8174 8.60414C2.72368 8.7953 2.65362 8.95783 2.6047 9.07949ZM16.2011 9.09147C16.9168 8.86734 16.9167 8.86698 16.9166 8.8666L16.9157 8.86366L16.9139 8.85807L16.9084 8.84124C16.9039 8.82755 16.8976 8.80898 16.8895 8.78584C16.8734 8.73958 16.85 8.675 16.8188 8.5947C16.7564 8.43425 16.6622 8.21023 16.5316 7.94377C16.2711 7.41245 15.8608 6.70326 15.2596 5.99147C14.0483 4.55735 12.053 3.10938 9.00109 3.10938C5.94919 3.10938 3.95386 4.55735 2.74254 5.99147C2.14134 6.70326 1.7311 7.41245 1.47059 7.94377C1.33994 8.21023 1.24582 8.43425 1.18339 8.5947C1.15215 8.675 1.12877 8.73958 1.11264 8.78584C1.10458 8.80898 1.09832 8.82755 1.0938 8.84124L1.08831 8.85807L1.08652 8.86366L1.08586 8.86574C1.08574 8.86612 1.08536 8.86734 1.80109 9.09147L1.08536 8.86734L1.01172 9.1025L1.0919 9.33551L1.80109 9.09147C1.0919 9.33551 1.09177 9.33513 1.0919 9.33551L1.09245 9.3371L1.09316 9.33916L1.09508 9.34462L1.10091 9.36091C1.10568 9.3741 1.11226 9.39194 1.1207 9.41411C1.13758 9.45844 1.16195 9.52017 1.19435 9.59685C1.25911 9.75007 1.35626 9.96373 1.49022 10.2179C1.75744 10.725 2.17528 11.4014 2.78106 12.0825C4.00089 13.4539 5.98769 14.8447 8.98882 14.8938C12.0061 14.9432 14.0036 13.5433 15.2255 12.1449C15.8319 11.4508 16.2495 10.7562 16.5161 10.2351C16.6498 9.97379 16.7467 9.75379 16.8112 9.59611C16.8435 9.5172 16.8677 9.45368 16.8844 9.40816C16.8928 9.38539 16.8993 9.3671 16.904 9.35361L16.9098 9.33702L16.9116 9.33149L16.9123 9.32943C16.9125 9.32905 16.9129 9.32785 16.2011 9.09147ZM16.2011 9.09147L16.9129 9.32785L16.9891 9.09823L16.9166 8.8666L16.2011 9.09147ZM2.51626 9.31738C2.51615 9.31771 2.51617 9.31765 2.51626 9.31738V9.31738ZM9.00109 8.02259C8.40175 8.02259 7.95109 8.49016 7.95109 9.02411C7.95109 9.55806 8.40175 10.0256 9.00109 10.0256C9.60042 10.0256 10.0511 9.55806 10.0511 9.02411C10.0511 8.49016 9.60042 8.02259 9.00109 8.02259ZM15.4859 9.31729C15.486 9.31757 15.486 9.31763 15.4859 9.31729V9.31729ZM6.45109 9.02411C6.45109 7.62338 7.6122 6.52259 9.00109 6.52259C10.39 6.52259 11.5511 7.62338 11.5511 9.02411C11.5511 10.4248 10.39 11.5256 9.00109 11.5256C7.6122 11.5256 6.45109 10.4248 6.45109 9.02411Z'
                                    fill='#fff'
                                  />
                                </svg>
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
                  </div>
                )}
                <div
                  onClick={() => router.push('/profile')}
                  className='py-[18px] cursor-pointer flex items-center gap-3'>
                  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M7.14286 2V18M14.5714 8.85714H10.5714M14.5714 5.42857H10.5714M4.28571 5.42857H2M4.28571 8.85714H2M4.28571 12.2857H2M5.42857 18H15.7143C16.9766 18 18 16.9766 18 15.7143V4.28571C18 3.02335 16.9766 2 15.7143 2H5.42857C4.16621 2 3.14286 3.02335 3.14286 4.28571V15.7143C3.14286 16.9766 4.16621 18 5.42857 18Z'
                      stroke='#E7E7E7'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                  </svg>
                  <span>{t('My profile')}</span>
                </div>
                <div onClick={logout} className='py-[18px] cursor-pointer flex items-center gap-3'>
                  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M7.31778 3H4.22955C3.76152 3 3.31266 3.18437 2.98171 3.51256C2.65077 3.84075 2.46484 4.28587 2.46484 4.75V15.25C2.46484 15.7141 2.65077 16.1592 2.98171 16.4874C3.31266 16.8156 3.76152 17 4.22955 17H7.31778M7.53711 10H17.5371M17.5371 10L13.7162 6M17.5371 10L13.7162 14'
                      stroke='#E7E7E7'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>

                  <span>{t('Log out')}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenu>
    </Dropdown>
  )
}
