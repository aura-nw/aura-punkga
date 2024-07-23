import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { postSubscribeEmail } from 'src/services'
import { validateEmail } from 'src/utils'
import Link from 'next/link'
import Logo from 'assets/images/header-logo.svg'
import Facebook from 'assets/images/facebook-logo.svg'
import Youtube from 'assets/images/youtube-logo.svg'
import X from 'assets/images/x-logo.svg'

export default function Footer() {
  const router = useRouter()
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [error, setError] = useState('')
  const subscibeHandler = async () => {
    try {
      if (validateEmail(value)) {
        const data = await postSubscribeEmail(value)
        if (data) {
          setIsSuccess(true)
        } else {
          setIsSuccess(false)
        }
      } else {
        setError(t('Invalid email'))
      }
    } catch (error) {
      setIsSuccess(false)
    }
  }
  useEffect(() => {
    setIsSuccess(undefined)
    setError('')
  }, [value])
  return (
    <>
      <div className='w-full relative z-10 pb-[114px] pt-6 md:pb-0 md:pt-0 mt-14 bg-white'>
        <div className='pk-container pt-6 pb-6 hidden md:flex flex-col gap-5 lg:pb-[74px] lg:pt-8'>
          <div className='flex justify-between border-b-[1px] border-border-teriary'>
            <div onClick={() => router.push('/')} className='pt-[13px]'>
              <Image src={Logo} alt='footer logo' className='h-10 w-auto' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <div className='text-xs leading-[18px] font-medium text-text-primary flex items-start'>
                {t('Subscribe to get fresh news update')}
              </div>
              <div className='border-[1px] border-[#BDBDBD] rounded-[10px] pl-[14px] flex gap-6 max-w-md'>
                <input
                  placeholder={t('Enter your email')}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className='text-sm leading-5 text-text-text-primary placeholder:text-text-quatenary outline-none border-none !bg-transparent w-full'
                />
                <button
                  className='py-[10px] px-6 text-sm leading-5 text-text-white bg-gray-900 border-[1px] border-gray-900 font-semibold whitespace-nowrap rounded-r-[10px]'
                  onClick={subscibeHandler}>
                  {t('Subscribe')}
                </button>
              </div>
              {isSuccess != undefined || error ? (
                isSuccess ? (
                  <div className='text-xs mt-[5px] text-primary-color'>{t('Email submitted')}</div>
                ) : (
                  <div className='text-xs mt-[5px] text-[#F0263C]'>{error || t('Something went wrong')}</div>
                )
              ) : (
                <div className='h-[32px] mt-[5px]'></div>
              )}
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='items-center gap-4 flex'>
              <Link className='cursor-pointer' target='_blank' href='https://www.facebook.com/PunkgaMeManga/'>
                <Image src={Facebook} alt='facebook-logo' width={24} height={24} />
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://twitter.com/PunkgaMeManga'>
                <Image src={X} alt='x-logo' width={24} height={24} />
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://www.youtube.com/@Punkga'>
                <Image src={Youtube} alt='youtube-logo' width={24} height={24} />
              </Link>
            </div>
            <div className='text-text-primary opacity-60 text-sm leading-5'>
              {`© ${new Date().getFullYear()} ${t('Punkga.me . All rights reserved')}.`}
            </div>
          </div>

        </div>
        <div className='flex md:hidden flex-col items-center gap-8 justify-center'>
          <div onClick={() => router.push('/')}>
            <Image src={Logo} alt='footer logo' className='h-[60px] w-auto' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='text-xs leading-[18px] font-medium text-text-primary flex items-start'>
              {t('Subscribe to get fresh news update')}
            </div>
            <div className='border-[1px] border-[#BDBDBD] rounded-[10px] pl-[14px] flex gap-6 max-w-md'>
              <input
                placeholder={t('Enter your email')}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className='text-sm leading-5 text-text-text-primary placeholder:text-text-quatenary outline-none border-none !bg-transparent w-full'
              />
              <button
                className='py-[10px] px-6 text-sm leading-5 text-text-white bg-gray-900 border-[1px] border-gray-900 font-semibold whitespace-nowrap rounded-r-[10px]'
                onClick={subscibeHandler}>
                {t('Subscribe')}
              </button>
            </div>
            {isSuccess != undefined || error ? (
              isSuccess ? (
                <div className='text-xs mt-[5px] text-primary-color'>{t('Email submitted')}</div>
              ) : (
                <div className='text-xs mt-[5px] text-[#F0263C]'>{error || t('Something went wrong')}</div>
              )
            ) : (
              <div className='h-[32px] mt-[5px]'></div>
            )}
            <div className='text-text-primary opacity-60 text-sm leading-5 flex justify-center'>
              {`© ${new Date().getFullYear()} ${t('Punkga.me . All rights reserved')}.`}
            </div>
            <div className='items-center justify-center gap-4 flex mt-4'>
              <Link className='cursor-pointer' target='_blank' href='https://www.facebook.com/PunkgaMeManga/'>
                <Image src={Facebook} alt='facebook-logo' width={24} height={24} />
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://twitter.com/PunkgaMeManga'>
                <Image src={X} alt='x-logo' width={24} height={24} />
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://www.youtube.com/@Punkga'>
                <Image src={Youtube} alt='youtube-logo' width={24} height={24} />
              </Link>
            </div>
          </div>

        </div>


      </div>
    </>
  )
}
