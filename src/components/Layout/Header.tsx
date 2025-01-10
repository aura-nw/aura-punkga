import Logo from 'assets/images/header-logo.svg'
import Button from 'components/core/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { Context } from 'src/context'

export default function Header() {
  const { account } = useContext(Context)
  return (
    <header className='bg-neutral-black px-4 h-14 flex items-center justify-between'>
      <Link href={'/'}>
        <Image src={Logo} alt='' className='h-7 w-auto' />
      </Link>
      <div>
        {account ? (
          <></>
        ) : (
          <>
            <Button size='xs' color='neutral'>
              Sign in
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
