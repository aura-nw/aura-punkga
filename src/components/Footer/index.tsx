import Image from 'next/image'
import Logo from 'assets/images/header-logo-native.svg'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { postSubscribeEmail } from 'src/services'
import { validateEmail } from 'src/utils'
import Link from 'next/link'

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
      <div className='w-full bg-[#1B1B1B] relative mt-16 md:mt-40 z-10'>
        <div className='absolute border-b-[17px] lg:border-b-[40px] border-b-[#1b1b1b] border-s-[50vw] border-s-transparent border-e-[49vw] border-e-transparent -top-[16px] lg:-top-[40px] left-0'></div>
        <div className='px-10 pt-10 pb-6 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start lg:pb-[60px] lg:pt-[100px] lg:px-[140px]'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <div onClick={() => router.push('/')}>
                <Image src={Logo} alt='header logo' className='h-[60px] w-auto' />
              </div>
              <div className='text-sm leading-[18px] lg:leading-[21px] text-[#ABABAB]'>
                <p>{t('The Manga Multiverse For All')}</p>
              </div>
            </div>
            <div className='hidden items-center gap-6 md:flex'>
              <Link target='_blank' href='https://www.facebook.com/PunkgaMeManga/'>
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
                  <circle cx='16' cy='16.8906' r='14' fill='#23FF81' />
                  <path
                    d='M21.2137 21.1722L21.8356 17.2207H17.9452V14.6576C17.9452 13.5763 18.4877 12.5217 20.2302 12.5217H22V9.15762C22 9.15762 20.3945 8.89062 18.8603 8.89062C15.6548 8.89062 13.5617 10.7836 13.5617 14.2091V17.2207H10V21.1722H13.5617V30.7251C14.2767 30.8346 15.0082 30.8906 15.7534 30.8906C16.4986 30.8906 17.2302 30.8346 17.9452 30.7251V21.1722H21.2137Z'
                    fill='black'
                  />
                </svg>
              </Link>
              <Link target='_blank' href='https://twitter.com/PunkgaMeManga'>
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
                  <path
                    d='M2.06813 3L12.8786 17.4544L2 29.2065H4.44853L13.9729 18.9171L21.6681 29.2065H30L18.581 13.9392L28.7069 3H26.2584L17.4872 12.476L10.4 3H2.06813ZM5.6688 4.80339H9.49643L26.3989 27.4031H22.5712L5.6688 4.80339Z'
                    fill='#23FF81'
                  />
                </svg>
              </Link>
              <Link target='_blank' href='https://www.youtube.com/@PunkgaMeManga'>
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
                  <path
                    d='M2.24451 10.8317C2.37304 8.85296 3.96395 7.30219 5.94447 7.20407C8.81239 7.06199 12.9115 6.89062 16 6.89062C19.0885 6.89062 23.1876 7.06199 26.0555 7.20407C28.0361 7.30219 29.627 8.85296 29.7555 10.8317C29.8786 12.7276 30 15.0603 30 16.8906C30 18.721 29.8786 21.0537 29.7555 22.9495C29.627 24.9283 28.0361 26.4791 26.0555 26.5772C23.1876 26.7193 19.0885 26.8906 16 26.8906C12.9115 26.8906 8.81239 26.7193 5.94447 26.5772C3.96395 26.4791 2.37304 24.9283 2.24451 22.9495C2.12136 21.0537 2 18.721 2 16.8906C2 15.0603 2.12136 12.7276 2.24451 10.8317Z'
                    fill='#23FF81'
                  />
                  <path d='M13 12.8906V20.8906L21 16.8906L13 12.8906Z' fill='black' />
                </svg>
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <div>
              <div className='text-[32px] leading-[40px] text-[#C8C8C8] font-bold lg:text-5xl lg:leading-[60px]'>
                {t('Never miss a drop')}
              </div>
              <div className='text-sm leading-[18px] text-[#ABABAB] lg:text-base lg:leading-5 lg:mt-4'>
                {t('Subscribe to get fresh news update')}
              </div>
            </div>
            <div>
              <div className='border-[1.5px] py-2 pl-6 pr-2 flex gap-6 rounded-[32px] max-w-md'>
                <input
                  placeholder={t('Enter your email')}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className='text-xs lg:text-sm lg:leading-5 text-white leading-[15px] placeholder:text-[#545454] outline-none border-none !bg-transparent w-full'
                />
                <button
                  className='py-[10px] lg:py-4 px-6 text-sm leading-[18px] text-[#1B1B1B] bg-primary-color rounded-full font-semibold whitespace-nowrap'
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
                <div className='h-[16px] mt-[5px]'></div>
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center gap-6 md:hidden justify-center pb-4'>
          <Link target='_blank' href='https://www.facebook.com/PunkgaMeManga/'>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
              <circle cx='16' cy='16.8906' r='14' fill='#23FF81' />
              <path
                d='M21.2137 21.1722L21.8356 17.2207H17.9452V14.6576C17.9452 13.5763 18.4877 12.5217 20.2302 12.5217H22V9.15762C22 9.15762 20.3945 8.89062 18.8603 8.89062C15.6548 8.89062 13.5617 10.7836 13.5617 14.2091V17.2207H10V21.1722H13.5617V30.7251C14.2767 30.8346 15.0082 30.8906 15.7534 30.8906C16.4986 30.8906 17.2302 30.8346 17.9452 30.7251V21.1722H21.2137Z'
                fill='black'
              />
            </svg>
          </Link>
          <Link target='_blank' href='https://twitter.com/PunkgaMeManga'>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
              <path
                d='M2.06813 3L12.8786 17.4544L2 29.2065H4.44853L13.9729 18.9171L21.6681 29.2065H30L18.581 13.9392L28.7069 3H26.2584L17.4872 12.476L10.4 3H2.06813ZM5.6688 4.80339H9.49643L26.3989 27.4031H22.5712L5.6688 4.80339Z'
                fill='#23FF81'
              />
            </svg>
          </Link>
          <Link target='_blank' href='https://www.youtube.com/@PunkgaMeManga'>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
              <path
                d='M2.24451 10.8317C2.37304 8.85296 3.96395 7.30219 5.94447 7.20407C8.81239 7.06199 12.9115 6.89062 16 6.89062C19.0885 6.89062 23.1876 7.06199 26.0555 7.20407C28.0361 7.30219 29.627 8.85296 29.7555 10.8317C29.8786 12.7276 30 15.0603 30 16.8906C30 18.721 29.8786 21.0537 29.7555 22.9495C29.627 24.9283 28.0361 26.4791 26.0555 26.5772C23.1876 26.7193 19.0885 26.8906 16 26.8906C12.9115 26.8906 8.81239 26.7193 5.94447 26.5772C3.96395 26.4791 2.37304 24.9283 2.24451 22.9495C2.12136 21.0537 2 18.721 2 16.8906C2 15.0603 2.12136 12.7276 2.24451 10.8317Z'
                fill='#23FF81'
              />
              <path d='M13 12.8906V20.8906L21 16.8906L13 12.8906Z' fill='black' />
            </svg>
          </Link>
        </div>
        <div className='w-full text-center text-[#A8A8A8] opacity-60 px-6 py-4 lg:py-5 text-xs leading-[15px]'>
          {`© ${new Date().getFullYear()} ${t('Punkga.me . All rights reserved')}.`}
        </div>
      </div>
    </>
  )
}
