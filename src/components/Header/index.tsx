import { useChain } from '@cosmos-kit/react'
import Avatar from 'assets/images/avatar.svg'
import EN from 'assets/images/en.svg'
import Logo from 'assets/images/header-logo.svg'
import SearchIcon from 'assets/images/icons/search.svg'
import VN from 'assets/images/vn.svg'
import Button from 'components/Button'
import FilledButton from 'components/Button/FilledButton'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import TextField from 'components/Input/TextField'
import Modal from 'components/Modal'
import Spinner from 'components/Spinner'
import CopySvg from 'images/icons/copy.svg'
import NoImage from 'images/no_img.png'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import useApi from 'src/hooks/useApi'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { getBalances, search } from 'src/services'
import ForgotPasswordModal from './ForgotPasswordModal'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import SignUpSuccessModal from './SignUpSuccessModal'
import Stars from 'assets/images/Stars.svg'
import { shorten } from 'src/utils'
import useSWR from 'swr'
import { BigNumber } from 'bignumber.js'
import PunkgaWallet from 'assets/images/punkga.png'
import MigrateWalletModal from './MigrateWalletModal'
import getConfig from 'next/config'
export default function Header({ className }: { className?: string }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [openNavigation, setOpenNavigation] = useState(false)
  const [hideBalance, setHideBalance] = useState(false)
  const [migrateWalletOpen, setMigrateWalletOpen] = useState(false)
  const [signUpSuccessOpen, setSignUpSuccessOpen] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { account, wallet, logout } = useContext(Context)
  const searchComic = useApi<any[]>(async () => await search(searchValue), !!searchValue, [searchValue])

  const { data: balance } = useSWR(
    { key: 'get_balance', address: wallet || account?.walletAddress },
    ({ address }) => (address ? getBalances(address) : undefined),
    {
      refreshInterval: 60000,
    }
  )
  const ref = useRef<any>()
  const divRef = useRef<any>()
  const mref = useRef<any>()
  const mdivRef = useRef<any>()
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
    navigator.clipboard.writeText(wallet)
    setIsCopied(true)
    _.debounce(() => {
      _.delay(() => setIsCopied(false), 3000)
    }, 1000)()
  }

  return (
    <>
      <div
        className={` fixed inset-0 transition-opacity duration-500 bg-[#000] ${
          isSearchFocused ? 'z-20 opacity-25' : '-z-20 opacity-0'
        }`}></div>
      <header
        className={`border-b-2 border-light-gray border-solid sticky w-full top-0 z-50 transition-all duration-300 bg-white ${className}`}>
        <nav className='lg:hidden pk-container py-[10px] px-5'>
          <div className='flex justify-between items-center gap-2'>
            <div onClick={() => router.push('/')}>
              <Image src={Logo} alt='header logo' className='h-[40px] w-auto' />
            </div>
            <div>
              <div className='flex items-center gap-4'>
                <div className='flex gap-[4px] font-bold' onClick={switchLanguage}>
                  {locale == 'en' ? (
                    <Image className='w-[24px] h-[24px] border-black border rounded-full' src={EN} alt='' />
                  ) : (
                    <Image className='w-[24px] h-[24px]' src={VN} alt='' />
                  )}
                  <button>{t('switchLanguage')}</button>
                </div>
                {account?.verified && account?.name ? (
                  <div
                    className='flex items-center whitespace-nowrap w-max gap-[5px] bg-[#F0F0F0] rounded-[20px] py-1 px-2'
                    onClick={() => {
                      setOpenNavigation(false)
                      setOpenProfile(!openProfile)
                    }}>
                    <Image
                      src={account.image || Avatar}
                      alt=''
                      width={36}
                      height={36}
                      className='rounded-full object-cover w-[18px] h-[18px] aspect-square'
                    />
                    <span className='md:max-w-[200px] max-w-[140px] truncate text-sm leading-[17.5px] font-bold'>
                      {account.name}
                    </span>
                  </div>
                ) : (
                  <FilledButton id='open-sign-in-btn' size='sm' onClick={() => setSignInOpen(true)}>
                    {t('Sign in')}
                  </FilledButton>
                )}
              </div>
            </div>
          </div>
          <div className={`${openProfile ? 'max-h-[280px]' : 'max-h-[0px]'} overflow-hidden transition-all`}>
            {account?.walletAddress || wallet ? (
              <div className='my-[10px] flex flex-col w-full  gap-3 bg-light-gray rounded-xl p-3'>
                <div
                  className='flex justify-between items-center text-second-color text-sm font-medium  relative'
                  onClick={copyAddress}>
                  <div className='flex gap-2 items-center'>
                    <Image src={PunkgaWallet} alt='' className='w-6 h-6' />
                    <div>{`${shorten(account.walletAddress || wallet, 8, 8)}`}</div>
                  </div>
                  <span
                    className={`transition-all w-fit mr-2 absolute -top-full right-[20px] text-xs bg-light-gray py-1 px-2 border rounded-md ${
                      isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                    {t('Copied')}
                  </span>
                  <Image src={CopySvg} alt='' />
                </div>
                <div className='flex justify-between items-center text-sm font-semibold  leading-[18px]'>
                  <div className=''>Balance:</div>
                  <div className='flex items-center'>
                    {hideBalance
                      ? '********'
                      : `${BigNumber(balance || 0)
                          .div(BigNumber(10).pow(8))
                          .toFixed(3)}`}{' '}
                    <span className='inline-block'>
                      {
                        <div className='ml-2 w-6 h-6 relative'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            className={`absolute inset-0 transition-all ${
                              hideBalance ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                            onClick={() => setHideBalance(false)}>
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M22.2954 6.31064C22.6761 6.47381 22.8524 6.91472 22.6893 7.29544L21.9999 7C22.6893 7.29544 22.6894 7.29526 22.6893 7.29544L22.6886 7.29712L22.6875 7.29961L22.6843 7.30696L22.6736 7.33104C22.6646 7.35118 22.6518 7.37939 22.6352 7.41508C22.6019 7.48643 22.5533 7.58775 22.4888 7.71416C22.3599 7.9668 22.1675 8.32068 21.9084 8.73647C21.4828 9.41951 20.8724 10.2777 20.0619 11.1302L21.0303 12.0985C21.3231 12.3914 21.3231 12.8663 21.0303 13.1592C20.7374 13.4521 20.2625 13.4521 19.9696 13.1592L18.969 12.1586C18.3093 12.7113 17.5528 13.23 16.695 13.6562L17.6286 15.091C17.8545 15.4381 17.7562 15.9027 17.409 16.1286C17.0618 16.3545 16.5972 16.2562 16.3713 15.909L15.2821 14.2351C14.5028 14.4897 13.659 14.6626 12.7499 14.7246V16.5C12.7499 16.9142 12.4141 17.25 11.9999 17.25C11.5857 17.25 11.2499 16.9142 11.2499 16.5V14.7246C10.3689 14.6645 9.54909 14.5002 8.78982 14.2584L7.71575 15.9091C7.48984 16.2563 7.02526 16.3546 6.67807 16.1287C6.33089 15.9028 6.23257 15.4382 6.45847 15.091L7.37089 13.6888C6.5065 13.2667 5.74381 12.7502 5.07842 12.1983L4.11744 13.1592C3.82455 13.4521 3.34968 13.4521 3.05678 13.1592C2.76389 12.8663 2.76389 12.3915 3.05678 12.0986L3.98055 11.1748C3.15599 10.3151 2.53525 9.44656 2.10277 8.75467C1.83984 8.33404 1.6446 7.97565 1.51388 7.71969C1.44848 7.59163 1.3991 7.48895 1.36537 7.41664C1.3485 7.38048 1.33553 7.35188 1.32641 7.33148L1.31562 7.30709L1.31238 7.29965L1.31129 7.29714L1.31088 7.29619C1.31081 7.29601 1.31056 7.29544 1.99992 7L1.31088 7.29619C1.14772 6.91546 1.32376 6.47381 1.70448 6.31064C2.08489 6.14761 2.52539 6.32355 2.68888 6.70362C2.68882 6.70349 2.68894 6.70375 2.68888 6.70362L2.68983 6.70581L2.69591 6.71953C2.7018 6.73272 2.7114 6.75391 2.72472 6.78248C2.75139 6.83964 2.79296 6.92625 2.84976 7.03747C2.96345 7.2601 3.13762 7.58027 3.37472 7.9596C3.85033 8.72048 4.57157 9.70709 5.55561 10.6216C6.42151 11.4263 7.48259 12.1676 8.75165 12.6558C9.70614 13.023 10.7854 13.25 11.9999 13.25C13.2416 13.25 14.342 13.0128 15.3124 12.6308C16.5738 12.1343 17.6277 11.3882 18.4866 10.582C19.4562 9.67197 20.1668 8.69516 20.6354 7.94321C20.869 7.56831 21.0405 7.25227 21.1525 7.03267C21.2085 6.92296 21.2494 6.83757 21.2757 6.78125C21.2888 6.75309 21.2983 6.73223 21.3041 6.71924L21.31 6.70576L21.3106 6.70456C21.3105 6.70466 21.3106 6.70446 21.3106 6.70456M22.2954 6.31064C21.9147 6.14752 21.4738 6.32404 21.3106 6.70456L22.2954 6.31064ZM2.68888 6.70362C2.68882 6.70349 2.68894 6.70375 2.68888 6.70362V6.70362Z'
                              fill='#1C274C'
                            />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            className={`absolute inset-0 transition-all ${
                              !hideBalance ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                            onClick={() => setHideBalance(true)}>
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z'
                              fill='#1C274C'
                            />
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z'
                              fill='#1C274C'
                            />
                          </svg>
                        </div>
                      }
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div
              className='py-3 text-sm leading-[18px] text-[#414141] font-bold border-b border-[#F2F2F2]'
              onClick={() => router.push('/profile')}>
              {t('My profile')}
            </div>
            <div
              className='py-3 text-sm leading-[18px] text-[#414141] font-bold border-b border-[#F2F2F2]'
              onClick={() => setMigrateWalletOpen(true)}>
              {t('Migrate your wallet')}{' '}
              <span>
                <Image src={Stars} alt='' className='inline-block ml-1' />
              </span>
            </div>
            <div
              className='py-3 text-sm leading-[18px] text-[#414141] font-bold border-b border-[#F2F2F2]'
              onClick={logout}>
              {t('Log out')}
            </div>
          </div>
          <div className='flex justify-between items-center mt-[10px]'>
            <div ref={mdivRef} className={`${isSearchFocused ? 'z-30' : ''} relative w-full`}>
              <TextField
                inputref={mref}
                onChange={_.debounce(setSearchValue, 500)}
                onFocus={() => setIsSearchFocused(true)}
                className={`transition-[width] bg-light-gray duration-500 text-sm leading-6 [&>input]:py-[3px] rounded-lg`}
                placeholder={t('Search by title')}
                trailingComponent={
                  searchComic.loading ? (
                    <Spinner className='w-[22px] h-[22px]' />
                  ) : (
                    <Image
                      src={SearchIcon}
                      className='w-[22px] h-[22px]'
                      alt=''
                      onClick={() => {
                        if (mref.current.value) {
                          setIsSearchFocused(false)
                          router.push(`/search?keyword=${mref.current.value}`)
                        }
                      }}
                    />
                  )
                }
              />
              {!!searchComic.data?.length && (
                <div
                  className={`absolute bg-light-gray transition-all -bottom-4 translate-y-full duration-500 rounded-[10px] max-h-[40vh] overflow-hidden ${
                    isSearchFocused ? 'opacity-100 w-full max-w-sm' : 'pointer-events-none opacity-0 w-full'
                  }`}>
                  <div className={`max-h-[40vh] overflow-auto flex flex-col gap-3 p-2`}>
                    {searchComic.data?.map((manga, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 cursor-pointer ${
                          manga.status.text == 'Upcoming' && '[&_a:not(.author)]:pointer-events-none'
                        }`}
                        onClick={() => router.push(`/comic/${manga.slug}/chapter/1`)}>
                        <Image
                          src={manga.image || NoImage}
                          width={48}
                          height={64}
                          className='w-12 h-16 bg-medium-gray rounded-md object-cover'
                          alt=''
                        />
                        <div className='flex flex-col justify-between'>
                          <div>
                            <p className='text-second-color text-sm font-bold cursor-pointer'>{manga[locale].title}</p>
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
            <div className='ml-6 w-6 h-6 relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className={`absolute inset-0 transition-all ${openNavigation ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                onClick={() => setOpenNavigation(false)}>
                <path
                  d='M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z'
                  stroke='#1C274C'
                  strokeWidth='1.5'
                />
                <path
                  d='M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5'
                  stroke='#1C274C'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className={`absolute inset-0 transition-all ${!openNavigation ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                onClick={() => {
                  setOpenProfile(false)
                  setOpenNavigation(true)
                }}>
                <path d='M20 7L4 7' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
                <path d='M20 12L4 12' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
                <path d='M20 17L4 17' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
              </svg>
            </div>
          </div>
          <div className={`${openNavigation ? 'max-h-[100px]' : 'max-h-[0px]'} overflow-hidden transition-all`}>
            <div
              className='py-3 text-sm leading-[18px] text-[#414141] font-bold border-b border-[#F2F2F2]'
              onClick={() => router.push('/about-us')}>
              {t('About Us')}
            </div>
            <div
              className='py-3 text-sm leading-[18px] text-[#414141] font-bold'
              onClick={() => router.push('/campaigns')}>
              {t('Campaign')}
            </div>
          </div>
        </nav>
        <nav
          className={`pk-container gap-3 lg:flex items-center justify-between pt-[10px] pb-[8px] hidden`}
          aria-label='Global'>
          <div className=''>
            <Link href='/' className='flex'>
              <span className='sr-only'>Your Company</span>
              <Image src={Logo} alt='header logo' className='h-[60px] min-w-[107px]' />
            </Link>
          </div>
          <div
            ref={divRef}
            className={`${
              isSearchFocused ? 'z-30' : ''
            } w-full md:max-w-[170px] lg:max-w-[200px] xl:max-w-[300px] 2xl:max-w-[500px] relative`}>
            <TextField
              inputref={ref}
              onChange={_.debounce(setSearchValue, 500)}
              onFocus={() => setIsSearchFocused(true)}
              className={`transition-[width] bg-light-gray duration-500 ${isSearchFocused ? '!w-[160%]' : ''}`}
              size='lg'
              placeholder={t('Search by title')}
              leadingComponent={
                <Image
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
              trailingComponent={searchComic.loading ? <Spinner className='w-6 h-6' /> : null}
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
          <div className='flex lg:gap-[40px] lg:justify-end min-w-[430px]'>
            <Button size='lg' onClick={() => router.push('/campaigns')}>
              {t('Campaign')}
            </Button>
            <Button size='lg' onClick={() => router.push('/about-us')}>
              {t('aboutUs')}
            </Button>
            <div className='flex gap-[20px] items-center cursor-pointer'>
              <div className='flex gap-[4px] font-bold' onClick={switchLanguage}>
                {locale == 'en' ? (
                  <Image className='w-[24px] h-[24px] border-black border rounded-full' src={EN} alt='' />
                ) : (
                  <Image className='w-[24px] h-[24px] ' src={VN} alt='' />
                )}
                <button>{t('switchLanguage')}</button>
              </div>
              {account?.verified && account?.name ? (
                <Dropdown>
                  <DropdownToggle>
                    <FilledButton size='lg'>
                      <div className='flex items-center whitespace-nowrap w-max gap-[10px] h-[25px]'>
                        <Image
                          src={account.image || Avatar}
                          alt=''
                          width={36}
                          height={36}
                          className='rounded-full object-cover aspect-square w-[36px]'
                        />
                        <span className='md:max-w-[150px] max-w-[80px] truncate'>{account.name}</span>
                      </div>
                    </FilledButton>
                  </DropdownToggle>
                  {wallet ? (
                    <DropdownMenu customClass='right-0 !w-[405px] max-w-[405px] !overflow-visible mt-[26px]'>
                      <div className='p-5 flex flex-col gap-5'>
                        <div
                          className='flex font-medium justify-between items-center text-second-color bg-light-gray p-[10px] rounded-xl relative min'
                          onClick={copyAddress}>
                          {`${wallet.substr(0, 8)}...${wallet.substr(-8)}`}
                          <span
                            className={`transition-all w-fit mr-2 absolute bottom-[110%] left-[20px] text-xs bg-light-gray py-1 px-2 border rounded-md ${
                              isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}>
                            <span className='absolute border-[5px] border-light-gray border-r-transparent border-b-transparent border-l-transparent top-full left-1/2 -translate-x-1/2'></span>
                            {t('Copied')}
                          </span>
                          <Image src={CopySvg} alt='' />
                        </div>
                        <div>
                          <div onClick={() => router.push('/profile')}>
                            <strong>{t('My profile')}</strong>
                          </div>
                          <span className='w-full block my-[10px] border-[1px] border-solid border-[#F0F0F0] '></span>
                          <div className='' onClick={() => setMigrateWalletOpen(true)}>
                            {t('Migrate your wallet')}{' '}
                            <span>
                              <Image src={Stars} alt='' className='inline-block ml-1' />
                            </span>
                          </div>
                          <span className='w-full block my-[10px] border-[1px] border-solid border-[#F0F0F0] '></span>
                          <div onClick={logout}>
                            <strong>{t('Log out')}</strong>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu customClass='right-0 w-[220px] max-w-[220px] mt-[26px]' closeOnClick={true}>
                      <div className='p-5 flex flex-col gap-5'>
                        <div>
                          <div onClick={() => router.push('/profile')}>
                            <strong>{t('My profile')}</strong>
                          </div>
                          <span className='w-full block my-[10px] border-[1px] border-solid border-[#F0F0F0]'></span>
                          <div className='font-bold' onClick={() => setMigrateWalletOpen(true)}>
                            {t('Migrate your wallet')}{' '}
                            <span>
                              <Image src={Stars} alt='' className='inline-block ml-1' />
                            </span>
                          </div>
                          <span className='w-full block my-[10px] border-[1px] border-solid border-[#F0F0F0]'></span>
                          <div onClick={logout}>
                            <strong>{t('Log out')}</strong>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  )}
                </Dropdown>
              ) : (
                <FilledButton id='open-sign-in-btn' size='lg' onClick={() => setSignInOpen(true)}>
                  {t('Sign in')}
                </FilledButton>
              )}
            </div>
          </div>
        </nav>
      </header>
      <Modal
        open={signInOpen || signUpOpen}
        setOpen={() => {
          setSignInOpen(false)
          setSignUpOpen(false)
        }}>
        <div className='relative min-h-[40vh]'>
          <SignInModal
            show={signInOpen}
            openSignUpModal={() => {
              setSignUpOpen(true)
              setSignInOpen(false)
            }}
            setSignInOpen={setSignInOpen}
            setForgotPasswordOpen={setForgotPasswordOpen}
          />
          <SignUpModal
            show={signUpOpen}
            openSignInModal={() => {
              setSignInOpen(true)
              setSignUpOpen(false)
            }}
            setSignUpOpen={setSignUpOpen}
            setSignUpSuccessOpen={setSignUpSuccessOpen}
          />
        </div>
      </Modal>

      <Modal open={forgotPasswordOpen} setOpen={setForgotPasswordOpen}>
        <ForgotPasswordModal onClose={() => setForgotPasswordOpen(false)} />
      </Modal>
      <Modal open={signUpSuccessOpen} setOpen={setSignUpSuccessOpen}>
        <SignUpSuccessModal setSignUpOpen={setSignUpOpen} onClose={() => setSignUpSuccessOpen(false)} />
      </Modal>
      <MigrateWalletModal open={migrateWalletOpen} setOpen={setMigrateWalletOpen} />
    </>
  )
}
