import Stars from 'assets/images/Stars.svg'
import EN from 'assets/images/en.svg'
import Logo from 'assets/images/header-logo.svg'
import AboutUs from 'assets/images/icons/aboutUs.svg'
import Campaign from 'assets/images/icons/campaign.svg'
import Collection from 'assets/images/icons/collection.svg'
import Language from 'assets/images/icons/language.svg'
import LogOut from 'assets/images/icons/logout.svg'
import MyProfile from 'assets/images/icons/myProfile.svg'
import SearchIcon from 'assets/images/icons/search.svg'
import PunkgaWallet from 'assets/images/punkga.png'
import User from 'assets/images/user.svg'
import UserGreen from 'assets/images/userGreen.svg'
import VN from 'assets/images/vn.svg'
import Button from 'components/Button'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import TextField from 'components/Input/TextField'
import Spinner from 'components/Spinner'
import CopySvg from 'images/icons/copy.svg'
import Menu from 'images/icons/menu.svg'
import EyeClose from 'images/icons/eye-closed.svg'
import EyeOpen from 'images/icons/eye-open.svg'
import Warning from 'images/icons/warning.svg'
import NoImage from 'images/no_img.png'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import useApi from 'src/hooks/useApi'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { search } from 'src/services'
import { shorten } from 'src/utils'
import NewButton from 'components/core/Button/Button'
import { useAccount, useBalance } from 'wagmi'
import getConfig from 'next/config'

export const HEADER_HEIGHT = {
  MOBILE: '56px',
  DESKTOP: '80px',
}
export default function Header({ className }: { className?: string }) {
  const config = getConfig()
  const { t } = useTranslation()
  const router = useRouter()
  const { setSignInOpen, setMigrateWalletOpen, setWalletConnectOpen } = useContext(ModalContext)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [openNavigation, setOpenNavigation] = useState(false)
  const [hideBalance, setHideBalance] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { account, logout } = useContext(Context)
  const searchComic = useApi<any[]>(async () => await search(searchValue), !!searchValue, [searchValue])
  const walletBalance = useBalance({
    address: account?.activeWalletAddress as any,
  })
  const ref = useRef<any>()
  const divRef = useRef<any>()
  const mref = useRef<any>()
  const mdivRef = useRef<any>()
  const { isConnected, address } = useAccount()
  useClickOutside(divRef, () => {
    if (window.innerWidth > 768) {
      setIsSearchFocused(false)
    }
  })
  useClickOutside(mdivRef, () => {
    if (window.innerWidth <= 768) {
      setIsSearchFocused(false)
    }
  })
  const { pathname, asPath, query, locale } = router
  const switchLanguage = () => {
    const newLanguage = locale === 'en' ? 'vn' : 'en'
    router.push({ pathname, query }, asPath, { locale: newLanguage })
  }

  useEffect(() => {
    ;(window as any).isSearchFocused = isSearchFocused
  }, [isSearchFocused])

  useEffect(() => {
    ref.current?.addEventListener(
      'keypress',
      _.debounce(
        (e: KeyboardEvent) => {
          if (e.which == 13) {
            setIsSearchFocused(false)
            ref.current.blur()
            router.push(`/search?keyword=${ref.current.value}`)
          }
        },
        1000,
        { leading: true, trailing: false }
      )
    )
    mref.current?.addEventListener(
      'keypress',
      _.debounce(
        (e: KeyboardEvent) => {
          if (e.which == 13) {
            mref.current.blur()
            setIsSearchFocused(false)
            router.push(`/search?keyword=${mref.current.value}`)
          }
        },
        1000,
        { leading: true, trailing: false }
      )
    )
  }, [])
  const copyAddress = async () => {
    navigator.clipboard.writeText(account?.activeWalletAddress)
    setIsCopied(true)
    _.debounce(() => {
      _.delay(() => setIsCopied(false), 3000)
    }, 1000)()
  }
  const handleOpenWalletOnExplorer = () => {
    const url = new URL(`${config.CHAIN_INFO.explorer}/address/${account?.activeWalletAddress}`)
    window.open(url.toString(), '_blank')
  }
  return (
    <>
      <div
        className={` fixed inset-0 transition-opacity duration-500 bg-[#000] ${
          isSearchFocused ? 'z-20 opacity-25' : '-z-20 opacity-0'
        }`}></div>
      <header
        className={`sticky w-full top-0 z-50 transition-all duration-300 bg-white ${className} lg:shadow-[0px_4px_4px_0px_#0000001A]`}>
        <nav className='lg:hidden pk-container z-10 w-full shadow-[0px_4px_4px_0px_#0000001A]'>
          <div className='flex justify-between items-center gap-2 w-full h-14'>
            <div onClick={() => router.push('/')}>
              <Image src={Logo} alt='header logo' className='h-[30px] w-auto' />
            </div>
            <div>
              <div className='flex items-center gap-4'>
                {account?.verified && account?.name ? (
                  (address != account?.activeWalletAddress || !isConnected) &&
                  account?.noncustodialWalletAddress && (
                    <div className='flex gap-3 items-center '>
                      <NewButton size='xs' color='dark' onClick={() => setWalletConnectOpen(true)}>
                        {t('Connect Wallet')}
                      </NewButton>
                    </div>
                  )
                ) : (
                  <NewButton size='xs' color='dark' onClick={() => setSignInOpen(true)}>
                    {t('Sign in')}
                  </NewButton>
                )}
                <div className='w-6 h-6 relative'>
                  <Image src={Menu} alt='menu icon' width={24} height={24} onClick={() => setOpenNavigation(true)} />
                </div>
              </div>
            </div>
          </div>
          {openNavigation && (
            <>
              <div className='fixed inset-0 z-10 bg-black/80'></div>
              <div
                className={`z-40  flex flex-col gap-2 bg-white text-[#414141] p-4 absolute top-0 right-0 h-screen w-4/5 transform transition-transform duration-300 ${
                  openNavigation ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className='flex justify-between border-b border-[#E9E9E9] pb-4'>
                  <Image src={Logo} alt='header logo' className='h-[29px] w-auto' />
                  <div
                    className='w-6 h-6 mt-2 relative'
                    onClick={() => {
                      setOpenNavigation(false)
                      setOpenProfile(false)
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

                {account?.verified && account?.name && (
                  <div className='bg-[#F2F2F2] p-4 rounded-xl'>
                    <div
                      className='flex justify-between items-center text-second-color text-lg font-semibold  relative'
                      onClick={copyAddress}>
                      <div className='flex gap-2 items-center text-base'>
                        <Image
                          src={account.image ? account.image : PunkgaWallet}
                          width={32}
                          height={32}
                          alt=''
                          className='rounded-full'
                        />
                        <div className='text-[#4E5056] font-semibold'>{account?.name}</div>
                      </div>
                    </div>
                    <div className='h-[1px] w-full bg-[#DEDEDE] mt-[10px] mb-[16px]'></div>
                    <div className='text-[#ABABAB] text-sm mb-1'>{`${t('Wallet')}`}</div>
                    <div className='flex justify-between items-center text-[#4E5056] text-base font-semibold relative'>
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
                    <div className='flex justify-between items-center text-[#4E5056] text-base font-semibold leading-5'>
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
                        <NewButton size='sm' className='mt-3 w-full' onClick={() => setMigrateWalletOpen(true)}>
                          {t('Migrate your wallet')}
                        </NewButton>
                      </>
                    ) : null}
                    {account?.noncustodialWalletAddress && account?.name && !isConnected && (
                      <div className='flex gap-2 items-center mt-3'>
                        <Image src={Warning} alt='warning' width={20} height={20} />
                        <div className='text-[#FF4D00] text-xs'>Wallet not connected</div>
                      </div>
                    )}
                  </div>
                )}

                {account && (
                  <div
                    className='flex gap-3 items-center py-4 text-sm leading-[18px] text-[#414141] font-semibold border-b border-[#E9E9E9]'
                    onClick={() => {
                      setOpenNavigation(false)
                      router.push('/profile')
                    }}>
                    <Image src={MyProfile} alt='' className='w-5 h-5' />
                    {t('My profile')}
                  </div>
                )}

                <div
                  className='flex gap-3 items-center py-4 text-sm leading-[18px] font-semibold'
                  onClick={() => {
                    setOpenNavigation(false)
                    router.push('/campaigns')
                  }}>
                  <Image src={Campaign} alt='' className='w-5 h-5' />
                  {t('Campaign')}
                </div>
                <div
                  className='flex gap-3 items-center py-4 text-sm leading-[18px] font-semibold'
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
                  className='flex gap-3 items-center py-4 text-sm leading-[18px] font-semibold'
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
                  className='flex gap-3 items-center py-4 text-sm leading-[18px] font-semibold'
                  onClick={() => {
                    setOpenNavigation(false)
                    router.push('/about-us')
                  }}>
                  <Image src={AboutUs} alt='' className='w-5 h-5' />
                  {t('About Us')}
                </div>
                <div>
                  <div
                    className='flex justify-between gap-3 items-center py-4 text-sm leading-[18px] font-semibold'
                    onClick={switchLanguage}>
                    <div className='flex gap-3 items-center'>
                      <Image src={Language} alt='' className='w-5 h-5' />
                      <div>{t('Switch Language')}</div>
                    </div>

                    <div className='flex gap-4 items-center'>
                      {locale == 'en' ? (
                        <Image className='w-[24px] h-[24px] rounded-full' src={EN} alt='' />
                      ) : (
                        <Image className='w-[24px] h-[24px] ' src={VN} alt='' />
                      )}
                    </div>
                  </div>
                </div>
                {account && (
                  <div
                    className='flex gap-3 items-center py-4 text-sm leading-[18px] text-[#414141] font-semibold'
                    onClick={() => {
                      setOpenProfile(false)
                      setOpenNavigation(false)
                      logout()
                    }}>
                    <Image src={LogOut} alt='' className='w-5 h-5' />
                    {t('Log out')}
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        <div
          className={`lg:hidden pk-container py-[10px] px-5 pb-4 bg-[#F4F3F7] ${
            router.pathname == '/' ? '' : 'hidden'
          }`}>
          <div ref={divRef} className={`${isSearchFocused ? 'z-30' : ''} w-full lg:max-w-max relative`}>
            <TextField
              inputref={ref}
              onChange={_.debounce(setSearchValue, 500)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className='duration-500 bg-white'
              placeholder={t('Search by title')}
              leadingComponent={
                <Image
                  width={20}
                  height={20}
                  src={SearchIcon}
                  alt=''
                  className='w-5 h-5'
                  onClick={() => {
                    if (ref.current.value) {
                      setIsSearchFocused(false)
                      router.push(`/search?keyword=${ref.current.value}`)
                    }
                  }}
                />
              }
              trailingComponent={
                searchComic.loading ? (
                  <div>
                    <Spinner size={20} className='w-5 h-5' />
                  </div>
                ) : (
                  <div></div>
                )
              }
            />
            {!!searchComic.data?.length && (
              <div
                className={`absolute bg-light-gray transition-all -bottom-6 translate-y-full duration-500 rounded-[20px] max-h-[40vh] overflow-hidden ${
                  isSearchFocused ? 'opacity-100 lg:w-[160%]' : 'pointer-events-none opacity-0 w-full'
                }`}>
                <div className={`max-h-[40vh] overflow-auto  flex flex-col gap-7  p-5`}>
                  {searchComic.data?.map((manga, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 ${
                        manga.status.text == 'Upcoming' && '[&_a:not(.author)]:pointer-events-none'
                      }`}
                      onClick={() => router.push(`/comic/${manga.slug}/chapter/1`)}>
                      <Image
                        src={manga.image || NoImage}
                        width={48}
                        height={64}
                        className='w-12 h-16 bg-medium-gray rounded-xl object-cover'
                        alt=''
                      />
                      <div className='flex flex-col justify-between'>
                        <div>
                          <p className='text-second-color text-base font-bold cursor-pointer'>{manga[locale].title}</p>
                          <div className='text-xs'>
                            {manga.authors.map((author, index) => (
                              <Fragment key={index}>
                                <span className='text-second-color font-[600] first:hidden'>, </span>
                                <span className='text-second-color font-[600]'>
                                  {author.slug ? (
                                    <Link className='author' href={`/artist/${author.slug}`}>
                                      {t(author.name)}
                                    </Link>
                                  ) : (
                                    t(author.name)
                                  )}
                                </span>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                        {!!manga.latestChap.number && (
                          <p className='text-xs'>
                            {t('Latest chap')}:{' '}
                            <span
                              className='text-second-color font-semibold cursor-pointer'
                              onClick={(e) => {
                                router.push(`/comic/${manga.slug}/chapter/${manga.latestChap.number}`)
                                e.preventDefault()
                              }}>
                              {manga.latestChap.number}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className={`pk-container gap-3 lg:flex items-center justify-between h-20 hidden`} aria-label='Global'>
          <div className='flex items-center gap-8'>
            <Link href='/' className='flex shrink-0'>
              <span className='sr-only'>Your Company</span>
              <Image src={Logo} alt='header logo' className='w-[72px]' />
            </Link>

            <div
              ref={divRef}
              className={`${
                isSearchFocused ? 'z-30' : ''
              } w-full md:max-w-[170px] lg:max-w-[200px] xl:max-w-[300px] 2xl:max-w-[500px] relative`}>
              <TextField
                inputref={ref}
                onChange={_.debounce(setSearchValue, 500)}
                onFocus={() => setIsSearchFocused(true)}
                className={`transition-[width] duration-500 ${isSearchFocused ? '!w-[160%]' : ''}`}
                placeholder={t('Search by title')}
                leadingComponent={
                  <Image
                    width={20}
                    height={20}
                    src={SearchIcon}
                    alt=''
                    onClick={() => {
                      if (ref.current.value) {
                        setIsSearchFocused(false)
                        router.push(`/search?keyword=${ref.current.value}`)
                      }
                    }}
                  />
                }
                trailingComponent={
                  searchComic.loading ? (
                    <div>
                      <Spinner size={20} className='w-5 h-5' />
                    </div>
                  ) : (
                    <div></div>
                  )
                }
              />
              {!!searchComic.data?.length && (
                <div
                  className={`absolute bg-light-gray transition-all -bottom-4 translate-y-full duration-500 rounded-[20px] max-h-[40vh] overflow-hidden ${
                    isSearchFocused ? 'opacity-100 w-[160%]' : 'pointer-events-none opacity-0 w-full'
                  }`}>
                  <div className={`max-h-[40vh] overflow-auto  flex flex-col gap-7  p-5`}>
                    {searchComic.data?.map((manga, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 ${
                          manga.status.text == 'Upcoming' && '[&_a:not(.author)]:pointer-events-none'
                        }`}
                        onClick={() => router.push(`/comic/${manga.slug}/chapter/1`)}>
                        <Image
                          src={manga.image || NoImage}
                          width={48}
                          height={64}
                          className='w-12 h-16 bg-medium-gray rounded-xl object-cover'
                          alt=''
                        />
                        <div className='flex flex-col justify-between'>
                          <div>
                            <p className='text-second-color text-base font-bold cursor-pointer'>
                              {manga[locale].title}
                            </p>
                            <div className='text-xs'>
                              {manga.authors.map((author, index) => (
                                <Fragment key={index}>
                                  <span className='text-second-color font-[600] first:hidden'>, </span>
                                  <span className='text-second-color font-[600]'>
                                    {author.slug ? (
                                      <Link className='author' href={`/artist/${author.slug}`}>
                                        {t(author.name)}
                                      </Link>
                                    ) : (
                                      t(author.name)
                                    )}
                                  </span>
                                </Fragment>
                              ))}
                            </div>
                          </div>
                          {!!manga.latestChap.number && (
                            <p className='text-xs'>
                              {t('Latest chap')}:{' '}
                              <span
                                className='text-second-color font-semibold cursor-pointer'
                                onClick={(e) => {
                                  router.push(`/comic/${manga.slug}/chapter/${manga.latestChap.number}`)
                                  e.preventDefault()
                                }}>
                                {manga.latestChap.number}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='flex lg:gap-[32px] lg:justify-end min-w-[430px]'>
            <Button onClick={() => router.push('/campaigns')}>
              <span
                style={{ fontWeight: '500' }}
                className={`${pathname.includes('/campaigns') ? 'text-text-brand-defaul' : ''}`}>
                {t('Campaign')}
              </span>
            </Button>
            <Button onClick={() => router.push('/events')}>
              <span
                style={{ fontWeight: '500' }}
                className={`${pathname.includes('/events') ? 'text-text-brand-defaul' : ''}`}>
                {t('Event')}
              </span>
            </Button>
            <Button onClick={() => router.push('/collections')}>
              <span
                style={{ fontWeight: '500' }}
                className={`${pathname.includes('/collections') ? 'text-text-brand-defaul' : ''}`}>
                {t('Collection')}
              </span>
            </Button>
            <Button size='md' onClick={() => router.push('/about-us')}>
              <span
                style={{ fontWeight: '500' }}
                className={`${pathname.includes('/about-us') ? 'text-text-brand-defaul' : ''}`}>
                {t('aboutUs')}
              </span>
            </Button>
            <div className='flex gap-[20px] items-center cursor-pointer'>
              <div className='flex gap-4 items-center' onClick={switchLanguage}>
                {locale == 'en' ? (
                  <Image className='w-[24px] h-[24px] rounded-full' src={EN} alt='' />
                ) : (
                  <Image className='w-[24px] h-[24px] ' src={VN} alt='' />
                )}
                <div className='h-4 w-[1px] bg-[#E0E0E0]'></div>
              </div>
              {account?.verified && account?.name ? (
                <Dropdown>
                  <DropdownToggle>
                    {/* <MainButton hasAvatar style='secondary' leadingIcon={account?.image || Avatar}>
                      {account?.name}
                    </MainButton> */}
                    <Image src={account?.noncustodialWalletAddress ? UserGreen : User} alt='user' />
                  </DropdownToggle>

                  <DropdownMenu customClass='right-0 !w-[405px] max-w-[405px] !overflow-visible mt-[26px]'>
                    <div className='p-5 flex flex-col gap-5'>
                      <div className='bg-[#F2F2F2] p-4 rounded-xl'>
                        <div
                          className='flex justify-between items-center text-second-color text-lg font-semibold  relative'
                          onClick={copyAddress}>
                          <div className='flex gap-2 items-center text-base'>
                            <Image
                              src={account.image ? account.image : PunkgaWallet}
                              width={32}
                              height={32}
                              alt=''
                              className='rounded-full'
                            />
                            <div className='text-[#4E5056] font-semibold'>{account?.name}</div>
                          </div>
                        </div>
                        <div className='h-[1px] w-full bg-[#DEDEDE] mt-[10px] mb-[16px]'></div>
                        <div className='text-[#ABABAB] text-sm mb-1'>{`${t('Wallet')}`}</div>
                        <div className='flex justify-between items-center text-[#4E5056] text-base font-semibold relative'>
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
                        <div className='flex justify-between items-center text-[#4E5056] text-base font-semibold leading-5'>
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
                            <NewButton size='sm' className='mt-3 w-full' onClick={() => setMigrateWalletOpen(true)}>
                              {t('Migrate wallet')}
                            </NewButton>
                          </>
                        ) : null}
                        {account?.noncustodialWalletAddress && account?.name && !isConnected && (
                          <div className='flex gap-2 items-center mt-3'>
                            <Image src={Warning} alt='warning' width={20} height={20} />
                            <div className='text-[#FF4D00] text-xs'>Wallet not connected</div>
                          </div>
                        )}
                      </div>
                      <div className='text-text-primary text-sm font-semibold leading-5'>
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
              ) : (
                <NewButton size='sm' color='dark' onClick={() => setSignInOpen(true)}>
                  {t('Sign in')}
                </NewButton>
              )}
              {(address != account?.activeWalletAddress || !isConnected) &&
                account?.verified &&
                account?.name &&
                account?.noncustodialWalletAddress && (
                  <div className='flex gap-3 items-center '>
                    <div className='h-4 w-[1px] bg-[#E0E0E0]'></div>
                    <NewButton size='sm' color='dark' onClick={() => setWalletConnectOpen(true)}>
                      {t('Connect Wallet')}
                    </NewButton>
                  </div>
                )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
