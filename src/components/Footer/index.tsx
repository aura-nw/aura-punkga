import Logo from 'assets/images/neautral-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { postSubscribeEmail } from 'src/services'
import { validateEmail } from 'src/utils'

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
      <div className='w-full relative z-10 pb-[114px] pt-6 md:pb-0 md:pt-0 bg-neutral-black text-neutral-white'>
        <div className='pk-container pt-6 pb-6 hidden md:flex flex-col gap-5 lg:pb-[74px] lg:pt-8'>
          <div className='flex justify-between border-b-[1px] border-border-primary'>
            <div onClick={() => router.push('/')} className='pt-[13px]'>
              <Image src={Logo} alt='footer logo' className='h-[60px] w-auto' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <div className='text-xs leading-[18px] font-medium text-neutral-50 flex items-start'>
                {t('Subscribe to get fresh news update')}
              </div>
              <div className='flex max-w-md'>
                <input
                  placeholder={t('Enter your email')}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className='text-sm leading-5 text-black placeholder:text-text-quatenary outline-none rounded-l-mlg px-3.5 border-none w-full'
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
                <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <circle cx='12.5' cy='12' r='9' fill='#F6F6F6' />
                  <path
                    d='M15.1069 14.3738L15.4178 11.6796H13.4726V9.93204C13.4726 9.1948 13.7438 8.47573 14.6151 8.47573H15.5V6.18204C15.5 6.18204 14.6973 6 13.9301 6C12.3274 6 11.2808 7.29064 11.2808 9.62621V11.6796H9.5V14.3738H11.2808V20.8871C11.6384 20.9618 12.0041 21 12.3767 21C12.7493 21 13.1151 20.9618 13.4726 20.8871V14.3738H15.1069Z'
                    fill='#0B0B0B'
                  />
                </svg>
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://twitter.com/PunkgaMeManga'>
                <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M3.5416 4L10.1418 12.8249L3.5 20H4.99492L10.8099 13.718L15.5081 20H20.595L13.6233 10.6788L19.8055 4H18.3106L12.9555 9.78545L8.6285 4H3.5416ZM5.73994 5.10103H8.07684L18.3964 18.899H16.0595L5.73994 5.10103Z'
                    fill='#F6F6F6'
                  />
                </svg>
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://www.youtube.com/@Punkga'>
                <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M2.18338 7.45583C2.27978 5.97175 3.47296 4.80867 4.95835 4.73508C7.10929 4.62852 10.1836 4.5 12.5 4.5C14.8164 4.5 17.8907 4.62852 20.0417 4.73508C21.527 4.80867 22.7202 5.97175 22.8166 7.45583C22.909 8.8777 23 10.6272 23 12C23 13.3728 22.909 15.1223 22.8166 16.5442C22.7202 18.0283 21.527 19.1913 20.0417 19.2649C17.8907 19.3715 14.8164 19.5 12.5 19.5C10.1836 19.5 7.10929 19.3715 4.95835 19.2649C3.47296 19.1913 2.27978 18.0283 2.18338 16.5442C2.09102 15.1223 2 13.3728 2 12C2 10.6272 2.09102 8.87769 2.18338 7.45583Z'
                    fill='#F6F6F6'
                  />
                  <path d='M10.25 9V15L16.25 12L10.25 9Z' fill='#0B0B0B' />
                </svg>
              </Link>
            </div>
            <div className='text-neutral-50 opacity-60 text-sm leading-5'>
              {`© ${new Date().getFullYear()} ${t('Punkga.me . All rights reserved')}.`}
            </div>
          </div>
        </div>
        <div className='flex md:hidden flex-col items-center gap-8 justify-center'>
          <div onClick={() => router.push('/')}>
            <Image src={Logo} alt='footer logo' className='h-[60px] w-auto' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='text-xs leading-[18px] font-medium text-neutral-50 flex items-start'>
              {t('Subscribe to get fresh news update')}
            </div>
            <div className='flex max-w-md'>
              <input
                placeholder={t('Enter your email')}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className='text-sm rounded-l-mlg leading-5 text-black bg-[#FDFDFD] placeholder:text-text-quatenary outline-none border-none w-full px-3.5'
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
            <div className='text-neutral-50 opacity-60 text-sm leading-5 flex justify-center'>
              {`© ${new Date().getFullYear()} ${t('Punkga.me . All rights reserved')}.`}
            </div>
            <div className='items-center justify-center gap-4 flex mt-4'>
              <Link className='cursor-pointer' target='_blank' href='https://www.facebook.com/PunkgaMeManga/'>
                <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <circle cx='12.5' cy='12' r='9' fill='#F6F6F6' />
                  <path
                    d='M15.1069 14.3738L15.4178 11.6796H13.4726V9.93204C13.4726 9.1948 13.7438 8.47573 14.6151 8.47573H15.5V6.18204C15.5 6.18204 14.6973 6 13.9301 6C12.3274 6 11.2808 7.29064 11.2808 9.62621V11.6796H9.5V14.3738H11.2808V20.8871C11.6384 20.9618 12.0041 21 12.3767 21C12.7493 21 13.1151 20.9618 13.4726 20.8871V14.3738H15.1069Z'
                    fill='#0B0B0B'
                  />
                </svg>
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://twitter.com/PunkgaMeManga'>
                <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M3.5416 4L10.1418 12.8249L3.5 20H4.99492L10.8099 13.718L15.5081 20H20.595L13.6233 10.6788L19.8055 4H18.3106L12.9555 9.78545L8.6285 4H3.5416ZM5.73994 5.10103H8.07684L18.3964 18.899H16.0595L5.73994 5.10103Z'
                    fill='#F6F6F6'
                  />
                </svg>
              </Link>
              <Link className='cursor-pointer' target='_blank' href='https://www.youtube.com/@Punkga'>
                <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M2.18338 7.45583C2.27978 5.97175 3.47296 4.80867 4.95835 4.73508C7.10929 4.62852 10.1836 4.5 12.5 4.5C14.8164 4.5 17.8907 4.62852 20.0417 4.73508C21.527 4.80867 22.7202 5.97175 22.8166 7.45583C22.909 8.8777 23 10.6272 23 12C23 13.3728 22.909 15.1223 22.8166 16.5442C22.7202 18.0283 21.527 19.1913 20.0417 19.2649C17.8907 19.3715 14.8164 19.5 12.5 19.5C10.1836 19.5 7.10929 19.3715 4.95835 19.2649C3.47296 19.1913 2.27978 18.0283 2.18338 16.5442C2.09102 15.1223 2 13.3728 2 12C2 10.6272 2.09102 8.87769 2.18338 7.45583Z'
                    fill='#F6F6F6'
                  />
                  <path d='M10.25 9V15L16.25 12L10.25 9Z' fill='#0B0B0B' />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
