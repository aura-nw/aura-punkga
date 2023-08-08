import Avatar from 'assets/images/avatar.png'
import EN from 'assets/images/en.svg'
import Logo from 'assets/images/header-logo.svg'
import SearchIcon from 'assets/images/icons/search.svg'
import VN from 'assets/images/vn.svg'
import Button from 'components/Button'
import FilledButton from 'components/Button/FilledButton'
import SubFilledButton from 'components/Button/FilledButton/SubFilledButton'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import TextField from 'components/Input/TextField'
import Modal from 'components/Modal'
import Spinner from 'components/Spinner'
import c98 from 'images/c98.png'
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
import { search } from 'src/services'
import ConnectWalletModal from './ConnectWalletModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import SignUpSuccessModal from './SignUpSuccessModal'

export default function Header({}) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
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

  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [signUpSuccessOpen, setSignUpSuccessOpen] = useState(false)
  const [connectWalletOpen, setConnectWalletOpen] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { account, wallet, logout, unlinkWallet } = useContext(Context)
  const searchComic = useApi<any[]>(async () => await search(searchValue), !!searchValue, [searchValue])

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
        className='border-b-2 border-light-gray border-solid sticky w-full overflow-x-hidden top-0 z-50 transition-all duration-300 backdrop-blur-[15px] !bg-transparent
        '>
        <nav className='md:hidden pk-container p-3'>
          <div className='flex justify-between items-center gap-2'>
            <div onClick={() => router.push('/')}>
              <Image src={Logo} alt='header logo' className='h-[40px] w-auto' />
            </div>
            <div ref={mdivRef} className={`${isSearchFocused ? 'z-30' : ''} relative`}>
              <TextField
                inputref={mref}
                onChange={_.debounce(setSearchValue, 500)}
                onFocus={() => setIsSearchFocused(true)}
                className={`transition-[width] bg-light-gray duration-500`}
                placeholder={t('Search by title')}
                trailingComponent={
                  searchComic.loading ? (
                    <Spinner className='w-6 h-6' />
                  ) : (
                    <Image
                      src={SearchIcon}
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
                  className={`absolute bg-light-gray transition-all -bottom-4 translate-y-full duration-500 rounded-[20px] max-h-[40vh] overflow-hidden ${
                    isSearchFocused ? 'opacity-100 w-[160%]' : 'pointer-events-none opacity-0 w-full'
                  }`}>
                  <div className={`max-h-[40vh] overflow-auto  flex flex-col gap-7  p-5`}>
                    {searchComic.data?.map((manga, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 cursor-pointer ${
                          manga.status.text == 'Upcoming' && 'pointer-events-none'
                        }`}
                        onClick={() => router.push(`/comic/${manga.id}/chapter/1`)}>
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
                                  <span className='text-second-color font-[600]'>{t(author)}</span>
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
                                  router.push(`/comic/${manga.id}/chapter/${manga.latestChap.number}`)
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
            <div className='flex gap-[4px] font-bold' onClick={switchLanguage}>
              {locale == 'en' ? (
                <Image className='w-[24px] h-[24px] border-black border rounded-full' src={EN} alt='' />
              ) : (
                <Image className='w-[24px] h-[24px]' src={VN} alt='' />
              )}
              <button>{t('switchLanguage')}</button>
            </div>
          </div>
          <div className='flex justify-between items-center mt-2'>
            <Button size='sm' onClick={() => router.push('/about-us')}>
              {t('aboutUs')}
            </Button>
            <div>
              {account?.verified && account?.name ? (
                <Dropdown>
                  <DropdownToggle>
                    <FilledButton size='sm'>
                      <div className='flex items-center whitespace-nowrap w-max gap-[10px] h-[25px]'>
                        <Image
                          src={account.image || Avatar}
                          alt=''
                          width={36}
                          height={36}
                          className='rounded-full object-cover h-full w-[25px]'
                        />
                        <span className='max-w-[150px] text-ellipsis overflow-hidden'>{account.name}</span>
                      </div>
                    </FilledButton>
                  </DropdownToggle>
                  {wallet ? (
                    <DropdownMenu customClass='right-0 min-w-[200px]'>
                      <div className='p-5 flex flex-col gap-5'>
                        <div className='flex justify-center items-center'>
                          <Image src={c98} alt='c98' />
                          <div className='ml-[10px] font-[500]'>{t('Connected with coin 98')}</div>
                        </div>
                        <div className='flex'>
                          <div className='flex-auto w-[60%]'></div>
                          <div className='flex-auto w-[10%]'></div>
                          <div className='flex-auto w-[30%]'></div>
                        </div>
                        <SubFilledButton className='w-full' size='lg' onClick={unlinkWallet}>
                          {t('Disconnect Wallet')}
                        </SubFilledButton>
                        <div className='mt-[10px]'>
                          <div onClick={() => router.push('/profile')}>
                            <strong>{t('My profile')}</strong>
                          </div>
                          <span className='w-full block my-[10px] border-[1px] border-solid border-light-medium-gray '></span>
                          <div onClick={logout}>
                            <strong>{t('Log out')}</strong>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu customClass='right-0 min-w-[200px]'>
                      <div className='p-5 flex flex-col gap-5'>
                        <div className='mt-[10px]'>
                          <div onClick={() => router.push('/profile')}>
                            <strong>{t('My profile')}</strong>
                          </div>
                          {/* <span className='w-full block my-[10px] border-[1px] border-solid border-light-medium-gray '></span>
                          <div onClick={() => setConnectWalletOpen(true)}>
                            <strong>{t('Link Wallet')}</strong>
                          </div> */}
                          <span className='w-full block my-[10px] border-[1px] border-solid border-light-medium-gray '></span>
                          <div onClick={logout}>
                            <strong>{t('Log out')}</strong>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  )}
                </Dropdown>
              ) : (
                <FilledButton id='open-sign-in-btn' size='sm' onClick={() => setSignInOpen(true)}>
                  {t('Sign in')}
                </FilledButton>
              )}
            </div>
          </div>
        </nav>
        <nav
          className={`pk-container gap-3 md:flex items-center justify-between pt-[10px] pb-[8px] hidden`}
          aria-label='Global'>
          <div className=''>
            <Link href='/' className='flex'>
              <span className='sr-only'>Your Company</span>
              <Image src={Logo} alt='header logo' className='h-[60px] min-w-[107px]' />
            </Link>
          </div>
          <div ref={divRef} className={`${isSearchFocused ? 'z-30' : ''} w-full max-w-[500px] relative`}>
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
                      className={`flex gap-2 ${manga.status.text == 'Upcoming' && 'pointer-events-none'}`}
                      onClick={() => router.push(`/comic/${manga.id}/chapter/1`)}>
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
                                <span className='text-second-color font-[600]'>{t(author)}</span>
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
                                router.push(`/comic/${manga.id}/chapter/${manga.latestChap.number}`)
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
          <div className='flex gap-[40px] lg:justify-end min-w-[430px]'>
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
                          className='rounded-full object-cover h-full w-[25px]'
                        />
                        <span className='max-w-[150px] text-ellipsis overflow-hidden'>{account.name}</span>
                      </div>
                    </FilledButton>
                  </DropdownToggle>
                  {wallet ? (
                    <DropdownMenu customClass='right-[50%] translate-x-[50%] min-w-[200px]'>
                      <div className='p-5 flex flex-col gap-5'>
                        <div className='flex justify-center items-center'>
                          <Image src={c98} alt='c98' />
                          <div className='ml-[10px] font-[500]'>{t('Connected with coin 98')}</div>
                        </div>
                        <div className='flex'>
                          <div className='flex-auto w-[60%]'></div>
                          <div className='flex-auto w-[10%]'></div>
                          <div className='flex-auto w-[30%]'></div>
                        </div>
                        <SubFilledButton className='w-full' size='lg' onClick={unlinkWallet}>
                          {t('Disconnect Wallet')}
                        </SubFilledButton>
                        <div className='mt-[10px]'>
                          <div onClick={() => router.push('/profile')}>
                            <strong>{t('My profile')}</strong>
                          </div>
                          <span className='w-full block my-[10px] border-[1px] border-solid border-light-medium-gray '></span>
                          <div onClick={logout}>
                            <strong>{t('Log out')}</strong>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu customClass='right-[50%] translate-x-[50%] min-w-[200px]'>
                      <div className='p-5 flex flex-col gap-5'>
                        <div className='mt-[10px]'>
                          <div onClick={() => router.push('/profile')}>
                            <strong>{t('My profile')}</strong>
                          </div>
                          {/* <span className='w-full block my-[10px] border-[1px] border-solid border-light-medium-gray '></span>
                          <div onClick={() => setConnectWalletOpen(true)}>
                            <strong>{t('Link Wallet')}</strong>
                          </div> */}
                          <span className='w-full block my-[10px] border-[1px] border-solid border-light-medium-gray '></span>
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
      <Modal open={connectWalletOpen} setOpen={setConnectWalletOpen}>
        <ConnectWalletModal onClose={() => setConnectWalletOpen(false)} />
      </Modal>
      <Modal open={forgotPasswordOpen} setOpen={setForgotPasswordOpen}>
        <ForgotPasswordModal onClose={() => setForgotPasswordOpen(false)} />
      </Modal>
      <Modal open={signUpSuccessOpen} setOpen={setSignUpSuccessOpen}>
        <SignUpSuccessModal setSignUpOpen={setSignUpOpen} onClose={() => setSignUpSuccessOpen(false)} />
      </Modal>
    </>
  )
}
