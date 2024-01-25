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
              <Link href='https://www.facebook.com/PunkgaMeManga/'>
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
                  <circle cx='16' cy='16.8906' r='14' fill='#23FF81' />
                  <path
                    d='M21.2137 21.1722L21.8356 17.2207H17.9452V14.6576C17.9452 13.5763 18.4877 12.5217 20.2302 12.5217H22V9.15762C22 9.15762 20.3945 8.89062 18.8603 8.89062C15.6548 8.89062 13.5617 10.7836 13.5617 14.2091V17.2207H10V21.1722H13.5617V30.7251C14.2767 30.8346 15.0082 30.8906 15.7534 30.8906C16.4986 30.8906 17.2302 30.8346 17.9452 30.7251V21.1722H21.2137Z'
                    fill='black'
                  />
                </svg>
              </Link>
              <Link href='https://twitter.com/PunkgaMeManga'>
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
                  <rect x='2' y='2.89062' width='28' height='28' rx='6' fill='#23FF81' />
                  <rect x='2' y='2.89062' width='28' height='28' rx='6' fill='#23FF81' />
                  <rect x='2' y='2.89062' width='28' height='28' rx='6' fill='#23FF81' />
                  <path
                    d='M23 11.3906C23 12.2191 22.3284 12.8906 21.5 12.8906C20.6716 12.8906 20 12.2191 20 11.3906C20 10.5622 20.6716 9.89062 21.5 9.89062C22.3284 9.89062 23 10.5622 23 11.3906Z'
                    fill='black'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16 21.8906C18.7614 21.8906 21 19.652 21 16.8906C21 14.1292 18.7614 11.8906 16 11.8906C13.2386 11.8906 11 14.1292 11 16.8906C11 19.652 13.2386 21.8906 16 21.8906ZM16 19.8906C17.6569 19.8906 19 18.5475 19 16.8906C19 15.2338 17.6569 13.8906 16 13.8906C14.3431 13.8906 13 15.2338 13 16.8906C13 18.5475 14.3431 19.8906 16 19.8906Z'
                    fill='black'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M6 16.4906C6 13.1303 6 11.4502 6.65396 10.1667C7.2292 9.03771 8.14708 8.11983 9.27606 7.54459C10.5595 6.89062 12.2397 6.89062 15.6 6.89062H16.4C19.7603 6.89062 21.4405 6.89062 22.7239 7.54459C23.8529 8.11983 24.7708 9.03771 25.346 10.1667C26 11.4502 26 13.1303 26 16.4906V17.2906C26 20.6509 26 22.3311 25.346 23.6146C24.7708 24.7435 23.8529 25.6614 22.7239 26.2367C21.4405 26.8906 19.7603 26.8906 16.4 26.8906H15.6C12.2397 26.8906 10.5595 26.8906 9.27606 26.2367C8.14708 25.6614 7.2292 24.7435 6.65396 23.6146C6 22.3311 6 20.6509 6 17.2906V16.4906ZM15.6 8.89062H16.4C18.1132 8.89062 19.2777 8.89218 20.1779 8.96573C21.0548 9.03737 21.5032 9.16722 21.816 9.3266C22.5686 9.71009 23.1805 10.322 23.564 11.0747C23.7234 11.3875 23.8533 11.8359 23.9249 12.7127C23.9984 13.6129 24 14.7775 24 16.4906V17.2906C24 19.0038 23.9984 20.1684 23.9249 21.0685C23.8533 21.9454 23.7234 22.3938 23.564 22.7066C23.1805 23.4592 22.5686 24.0712 21.816 24.4547C21.5032 24.614 21.0548 24.7439 20.1779 24.8155C19.2777 24.8891 18.1132 24.8906 16.4 24.8906H15.6C13.8868 24.8906 12.7223 24.8891 11.8221 24.8155C10.9452 24.7439 10.4968 24.614 10.184 24.4547C9.43139 24.0712 8.81947 23.4592 8.43597 22.7066C8.27659 22.3938 8.14674 21.9454 8.0751 21.0685C8.00156 20.1684 8 19.0038 8 17.2906V16.4906C8 14.7775 8.00156 13.6129 8.0751 12.7127C8.14674 11.8359 8.27659 11.3875 8.43597 11.0747C8.81947 10.322 9.43139 9.71009 10.184 9.3266C10.4968 9.16722 10.9452 9.03737 11.8221 8.96573C12.7223 8.89218 13.8868 8.89062 15.6 8.89062Z'
                    fill='black'
                  />
                </svg>
              </Link>
              <Link href='https://www.youtube.com/@PunkgaMeManga'>
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
          <div className='flex flex-col gap-5'>
            <div>
              <div className='text-2xl leading-[38px] text-[#C8C8C8] capitalize font-bold lg:text-5xl lg:leading-[54px]'>
                {t('Never miss a drop')}
              </div>
              <div className='text-sm leading-[18px] text-[#ABABAB]'>{t('Subscribe to get fresh news update')}</div>
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
                  <div className='text-sm px-6 mt-[5px] text-primary-color'>
                    {t('Thank you for subscribing to our newsletter')}
                  </div>
                ) : (
                  <div className='text-sm px-6 mt-[5px] text-[#F0263C]'>{error || t('Something went wrong')}</div>
                )
              ) : null}
            </div>
          </div>
        </div>
        <div className='flex items-center gap-6 md:hidden justify-center pt-7 pb-4'>
          <Link href='https://www.facebook.com/PunkgaMeManga/'>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
              <circle cx='16' cy='16.8906' r='14' fill='#23FF81' />
              <path
                d='M21.2137 21.1722L21.8356 17.2207H17.9452V14.6576C17.9452 13.5763 18.4877 12.5217 20.2302 12.5217H22V9.15762C22 9.15762 20.3945 8.89062 18.8603 8.89062C15.6548 8.89062 13.5617 10.7836 13.5617 14.2091V17.2207H10V21.1722H13.5617V30.7251C14.2767 30.8346 15.0082 30.8906 15.7534 30.8906C16.4986 30.8906 17.2302 30.8346 17.9452 30.7251V21.1722H21.2137Z'
                fill='black'
              />
            </svg>
          </Link>
          <Link href='https://twitter.com/PunkgaMeManga'>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
              <rect x='2' y='2.89062' width='28' height='28' rx='6' fill='#23FF81' />
              <rect x='2' y='2.89062' width='28' height='28' rx='6' fill='#23FF81' />
              <rect x='2' y='2.89062' width='28' height='28' rx='6' fill='#23FF81' />
              <path
                d='M23 11.3906C23 12.2191 22.3284 12.8906 21.5 12.8906C20.6716 12.8906 20 12.2191 20 11.3906C20 10.5622 20.6716 9.89062 21.5 9.89062C22.3284 9.89062 23 10.5622 23 11.3906Z'
                fill='black'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M16 21.8906C18.7614 21.8906 21 19.652 21 16.8906C21 14.1292 18.7614 11.8906 16 11.8906C13.2386 11.8906 11 14.1292 11 16.8906C11 19.652 13.2386 21.8906 16 21.8906ZM16 19.8906C17.6569 19.8906 19 18.5475 19 16.8906C19 15.2338 17.6569 13.8906 16 13.8906C14.3431 13.8906 13 15.2338 13 16.8906C13 18.5475 14.3431 19.8906 16 19.8906Z'
                fill='black'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6 16.4906C6 13.1303 6 11.4502 6.65396 10.1667C7.2292 9.03771 8.14708 8.11983 9.27606 7.54459C10.5595 6.89062 12.2397 6.89062 15.6 6.89062H16.4C19.7603 6.89062 21.4405 6.89062 22.7239 7.54459C23.8529 8.11983 24.7708 9.03771 25.346 10.1667C26 11.4502 26 13.1303 26 16.4906V17.2906C26 20.6509 26 22.3311 25.346 23.6146C24.7708 24.7435 23.8529 25.6614 22.7239 26.2367C21.4405 26.8906 19.7603 26.8906 16.4 26.8906H15.6C12.2397 26.8906 10.5595 26.8906 9.27606 26.2367C8.14708 25.6614 7.2292 24.7435 6.65396 23.6146C6 22.3311 6 20.6509 6 17.2906V16.4906ZM15.6 8.89062H16.4C18.1132 8.89062 19.2777 8.89218 20.1779 8.96573C21.0548 9.03737 21.5032 9.16722 21.816 9.3266C22.5686 9.71009 23.1805 10.322 23.564 11.0747C23.7234 11.3875 23.8533 11.8359 23.9249 12.7127C23.9984 13.6129 24 14.7775 24 16.4906V17.2906C24 19.0038 23.9984 20.1684 23.9249 21.0685C23.8533 21.9454 23.7234 22.3938 23.564 22.7066C23.1805 23.4592 22.5686 24.0712 21.816 24.4547C21.5032 24.614 21.0548 24.7439 20.1779 24.8155C19.2777 24.8891 18.1132 24.8906 16.4 24.8906H15.6C13.8868 24.8906 12.7223 24.8891 11.8221 24.8155C10.9452 24.7439 10.4968 24.614 10.184 24.4547C9.43139 24.0712 8.81947 23.4592 8.43597 22.7066C8.27659 22.3938 8.14674 21.9454 8.0751 21.0685C8.00156 20.1684 8 19.0038 8 17.2906V16.4906C8 14.7775 8.00156 13.6129 8.0751 12.7127C8.14674 11.8359 8.27659 11.3875 8.43597 11.0747C8.81947 10.322 9.43139 9.71009 10.184 9.3266C10.4968 9.16722 10.9452 9.03737 11.8221 8.96573C12.7223 8.89218 13.8868 8.89062 15.6 8.89062Z'
                fill='black'
              />
            </svg>
          </Link>
          <Link href='https://www.youtube.com/@PunkgaMeManga'>
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
