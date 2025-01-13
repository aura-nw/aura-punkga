import Logo from 'assets/images/header-logo.svg'
import SearchIcon from 'assets/images/icons/search.svg'
import TextField from 'components/Input/TextField'
import Spinner from 'components/Spinner'
import Button from 'components/core/Button'
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
import { useAccount } from 'wagmi'
import Bg from './assets/bg.svg'
import UserDropdown from './components/UserDropdown'
export const HEADER_HEIGHT = {
  MOBILE: '56px',
  DESKTOP: '80px',
}
export default function Header({ className }: { className?: string }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { setSignInOpen, setMigrateWalletOpen, setWalletConnectOpen } = useContext(ModalContext)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [openNavigation, setOpenNavigation] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { account } = useContext(Context)
  const searchComic = useApi<any[]>(async () => await search(searchValue), !!searchValue, [searchValue])
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
  return (
    <>
      <div
        className={` fixed inset-0 transition-opacity duration-500 bg-[#000] ${
          isSearchFocused ? 'z-20 opacity-25' : '-z-20 opacity-0'
        }`}></div>
      <header
        className={`sticky w-full top-0 z-50 transition-all duration-300 xl:h-20 bg-neutral-black xl:bg-transparent ${className}`}>
        <div
          className={`xl:hidden pk-container py-[10px] px-5 pb-4 bg-neutral-black ${
            router.pathname == '/' ? '' : 'hidden'
          }`}>
          <div ref={divRef} className={`${isSearchFocused ? 'z-30' : ''} w-full xl:max-w-max relative`}>
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
                  isSearchFocused ? 'opacity-100 xl:w-[160%]' : 'pointer-events-none opacity-0 w-full'
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

        <div className='hidden xl:block absolute inset-x-0 top-0 w-full h-[100px]'>
          <Image src={Bg} alt='' className='w-full h-full object-cover' />
        </div>
        <nav
          className={`px-[84px] gap-3 xl:flex items-center justify-between h-[86px] hidden text-neutral-white relative`}
          aria-label='Global'>
          <div className='flex items-center gap-14'>
            <Link href='/' className='flex shrink-0'>
              <span className='sr-only'>Your Company</span>
              <Image src={Logo} alt='header logo' className='w-[104px]' />
            </Link>

            <div
              ref={divRef}
              className={`${
                isSearchFocused ? 'z-30' : ''
              } w-full md:max-w-[170px] xl:max-w-[200px] xl:max-w-[300px] 2xl:max-w-[500px] relative`}>
              <TextField
                inputref={ref}
                onChange={_.debounce(setSearchValue, 500)}
                onFocus={() => setIsSearchFocused(true)}
                className={`transition-[width] bg-neutral-950 border-none w-[384px] duration-500 ${
                  isSearchFocused ? '!w-[160%]' : ''
                }`}
                placeholder={t('Search by title')}
                trailingComponent={
                  searchComic.loading ? (
                    <div>
                      <Spinner size={20} className='w-5 h-5' />
                    </div>
                  ) : (
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
          <div className='flex xl:gap-6 xl:justify-end min-w-[430px] items-center text-sm'>
            <div className='h-fit cursor-pointer font-semibold' onClick={() => router.push('/characters')}>
              <span className={`${pathname.includes('/characters') ? 'text-text-brand-focus' : ''}`}>
                {t('Characters')}
              </span>
            </div>
            <div className='h-fit cursor-pointer font-semibold' onClick={() => router.push('/campaigns')}>
              <span className={`${pathname.includes('/campaigns') ? 'text-text-brand-focus' : ''}`}>
                {t('Campaign')}
              </span>
            </div>
            <div className='h-fit cursor-pointer font-semibold' onClick={() => router.push('/events')}>
              <span className={`${pathname.includes('/events') ? 'text-text-brand-focus' : ''}`}>{t('Event')}</span>
            </div>
            <div className='h-fit cursor-pointer font-semibold' onClick={() => router.push('/collections')}>
              <span className={`${pathname.includes('/collections') ? 'text-text-brand-focus' : ''}`}>
                {t('Collection')}
              </span>
            </div>
            <div className='h-fit cursor-pointer font-semibold' onClick={() => router.push('/about-us')}>
              <span className={`${pathname.includes('/about-us') ? 'text-text-brand-focus' : ''}`}>{t('aboutUs')}</span>
            </div>
            <div className='flex gap-[20px] ml-8 items-center cursor-pointer'>
              <div className='flex gap-4 items-center' onClick={switchLanguage}>
                {locale == 'en' ? (
                  <div className='text-text-brand-defaul font-medium'>EN</div>
                ) : (
                  <div className='text-text-brand-defaul font-medium'>VN</div>
                )}
                <div className='h-4 w-[1px] bg-[#E0E0E0]'></div>
              </div>
              {account?.verified && account?.name ? (
                <UserDropdown />
              ) : (
                <Button size='sm' color='neutral' onClick={() => setSignInOpen(true)}>
                  {t('Sign in')}
                </Button>
              )}
              {account?.verified &&
                account?.name &&
                (!account?.noncustodialWalletAddress ? (
                  <div className='flex gap-3 items-center '>
                    <div className='h-4 w-[1px] bg-[#E0E0E0]'></div>
                    <Button size='sm' color='neutral' onClick={() => setMigrateWalletOpen(true)}>
                      {t('Connect Wallet')}
                    </Button>
                  </div>
                ) : (
                  (address != account?.activeWalletAddress || !isConnected) && (
                    <div className='flex gap-3 items-center '>
                      <div className='h-4 w-[1px] bg-[#E0E0E0]'></div>
                      <Button size='sm' color='neutral' onClick={() => setWalletConnectOpen(true)}>
                        {t('Connect Wallet')}
                      </Button>
                    </div>
                  )
                ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
