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
export default function Header() {
  const { account } = useContext(Context)
  const { setSignInOpen, setMigrateWalletOpen, setWalletConnectOpen } = useContext(ModalContext)
  const { isConnected, address } = useAccount()
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <header className='bg-neutral-black px-4 h-14 flex items-center justify-between'>
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
