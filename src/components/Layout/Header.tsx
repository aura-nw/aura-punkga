import Logo from 'assets/images/header-logo.svg'
import Button from 'components/core/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { useAccount } from 'wagmi'
import UserGreen from 'assets/images/userGreen.svg'
import Drawer from './components/Drawer'
import { useWindowSize } from 'usehooks-ts'
import UserDropdown from './components/UserDropdown'
import SearchBox from './components/SearchBox'
import cn from 'classnames'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import LI from 'assets/images/literature-infinity.png'
export default function Header() {
  const { account } = useContext(Context)
  const { width } = useWindowSize()
  const { setSignInOpen, setMigrateWalletOpen, setWalletConnectOpen } = useContext(ModalContext)
  const { isConnected, address } = useAccount()
  const [openDrawer, setOpenDrawer] = useState(false)
  if (width >= 1024) {
    return (
      <header className='bg-neutral-black text-white px-8 py-5 sticky top-0 flex justify-between items-center z-30'>
        <div className='flex items-center gap-10'>
          <Link href={'/'}>
            <Image src={Logo} alt='' className='h-[42px] w-auto' />
          </Link>
          <div>
            <SearchBox />
          </div>
          <div className='flex gap-8 items-center'>
            <Link
              className={cn('text-sm font-semibold hover:text-brand-200', {
                'text-brand-default': window.location.pathname.includes('/explore/manga'),
              })}
              href={'/explore/manga'}>
              Manga
            </Link>
            <Link
              className={cn('text-sm font-semibold hover:text-brand-200', {
                'text-brand-default': window.location.pathname.includes('/events/literature-infinity'),
              })}
              href={'/events/literature-infinity'}>
              <Image src={LI} alt='' className='h-10 w-auto' />
            </Link>
            <Dropdown>
              <DropdownToggle>
                <div className={cn('text-sm font-semibold hover:text-brand-200 flex items-center gap-1.5')}>
                  Explore
                  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
                    <path
                      d='M7.41211 10L12.4129 14.58L17.4121 10'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </DropdownToggle>
              <DropdownMenu customClass='!bg-neutral-950 !rounded-md p-3 space-y-4 border border-neutral-950'>
                <>
                  <Link
                    href={'/characters'}
                    className={cn('text-sm block font-semibold hover:text-brand-200', {
                      'text-brand-default': window.location.pathname.includes('/character'),
                    })}>
                    Character
                  </Link>

                  <Link
                    href={'/events'}
                    className={cn('text-sm block font-semibold hover:text-brand-200', {
                      'text-brand-default': window.location.pathname.includes('/events'),
                    })}>
                    Events
                  </Link>
                  <Link
                    href={'/campaigns'}
                    className={cn('text-sm block font-semibold hover:text-brand-200', {
                      'text-brand-default': window.location.pathname.includes('/campaigns'),
                    })}>
                    Campaign
                  </Link>
                </>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div>
          {account?.verified && account?.name ? (
            <UserDropdown />
          ) : (
            <Button size='xs' color='neutral' onClick={() => setSignInOpen(true)}>
              Sign in
            </Button>
          )}
        </div>
      </header>
    )
  }
  return (
    <header className='bg-neutral-black px-4 h-14 flex items-center justify-between sticky top-0 w-screen z-30'>
      <Link href={'/'}>
        <Image src={Logo} alt='' className='h-7 w-auto' />
      </Link>
      <div className='flex items-center gap-4'>
        {account?.verified && account?.name ? (
          <>
            {!account?.noncustodialWalletAddress ? (
              <Button size='xs' color='neutral' onClick={() => setMigrateWalletOpen(true)}>
                Connect Wallet
              </Button>
            ) : (
              (address != account?.activeWalletAddress || !isConnected) && (
                <Button size='xs' color='neutral' onClick={() => setWalletConnectOpen(true)}>
                  Connect Wallet
                </Button>
              )
            )}
            <Image
              src={account?.image || UserGreen}
              alt=''
              className='w-[30px] h-[30px] rounded-full object-cover'
              width={30}
              height={30}
              onClick={() => setOpenDrawer(true)}
            />
          </>
        ) : (
          <Button size='xs' color='neutral' onClick={() => setSignInOpen(true)}>
            Sign in
          </Button>
        )}
      </div>
      {openDrawer && <Drawer open={openDrawer} setOpen={setOpenDrawer} />}
    </header>
  )
}
