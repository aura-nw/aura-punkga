import Image from 'next/image'
import Logo from 'assets/images/header-logo-native.svg'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { postSubscribeEmail } from 'src/services'
import { validateEmail } from 'src/utils'

export default function Footer() {
  const router = useRouter()
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [isSuccess, setIsSuccess] = useState<boolean>()
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
        alert(t('Invalid email'))
      }
    } catch (error) {
      setIsSuccess(false)
    }
  }
  useEffect(() => {
    setIsSuccess(undefined)
  }, [value])
  return (
    <>
      <div className='w-full bg-[#1B1B1B] relative mt-32'>
        <div className='absolute border-b-[17px] lg:border-b-[40px] border-b-[#1b1b1b] border-s-[50vw] border-s-transparent border-e-[49vw] border-e-transparent -top-[17px] lg:-top-[40px] left-0'></div>
        <div className='p-10 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start lg:pb-[60px] lg:pt-[100px] lg:px-[140px]'>
          <div className='flex flex-col gap-4'>
            <div onClick={() => router.push('/')}>
              <Image src={Logo} alt='header logo' className='h-[60px] w-auto' />
            </div>
            <div className='text-sm leading-[18px] lg:leading-[21px] text-[#ABABAB]'>
              <p>{t('Punkga.me is the best Nft manga in the world')}</p>
              <p>{t('You can creative manga, NFTs, trading NFT')}</p>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              <div className='text-2xl leading-[38px] text-[#C8C8C8] capitalize font-bold lg:text-5xl lg:leading-[54px]'>
                {t('Never miss a drop')}
              </div>
              <div className='text-sm leading-[18px] text-[#ABABAB]'>
                {t('Subscribe to get fresh news update trending NFT')}
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
                  className='py-[10px] lg:py-4 px-6 text-sm leading-[18px] text-[#1B1B1B] bg-primary-color rounded-full font-semibold'
                  onClick={subscibeHandler}>
                  {t('Subscribe')}
                </button>
              </div>
              {isSuccess != undefined ? (
                isSuccess ? (
                  <div className='text-xs text-primary-color mt-1'>
                    {t('Thank you for subscribing to our newsletter.')}
                  </div>
                ) : (
                  <div className='text-xs text-[red] mt-1'>{t('Something went wrong')}</div>
                )
              ) : null}
            </div>
          </div>
        </div>
        <div className='w-full text-center text-[#A8A8A8] opacity-60 px-6 py-4 lg:py-5 text-xs leading-[15px]'>
          {`© ${new Date().getFullYear()} ${t('Punkga.me . All rights reserved')}.`}
        </div>
      </div>
    </>
  )
}
