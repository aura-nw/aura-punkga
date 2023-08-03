import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Carousel from 'components/Carousel'
import Header from 'components/Header'
import FbIcon from 'images/Facebook.svg'
import XVector from 'images/XVector.svg'
import Img1 from 'images/abu-1.svg'
import Img2 from 'images/abu-2.svg'
import Img3 from 'images/abu-3.svg'
import AbuImg from 'images/about-us-img.png'
import BeIcon from 'images/behance.svg'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import IgIcon from 'images/instagram.svg'
import MonoLogo from 'images/mono-logo.svg'
import { i18n, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useState } from 'react'
import { authorData } from '../../utils/authorData'
import { useRouter } from 'next/router'

export default function AboutUs() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  return (
    <>
      <Header />
      <div className='pk-container py-3 md:mt-6 lg:mt-16'>
        <div className='w-full'>
          <div className='flex justify-center gap-3 w-[90%] overflow-hidden ml-auto'>
            <Image src={MonoLogo} alt='' className='w-full max-w-[115px] md:max-w-[235px] lg:max-w-[305px]' />
            <Image src={AbuImg} alt='' className='w-full max-w-[234px] md:max-w-[405px] lg:max-w-[605px]' />
          </div>
          <p className='text-center mt-3 text-xs leading-[150%] max-w-[90vw] mx-auto md:max-w-[700px] lg:max-w-[1170px] md:text-lg md:leading-[125%] lg:text-2xl'>
            {t('about-us-general')}
          </p>
        </div>
        <div className='mt-8 md:mt-14 lg:hidden'>
          <Carousel
            setting={{
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: false,
              centerMode: true,
              appendDots: () => <></>,
              customPaging: () => <></>,
            }}>
            <div className='px-3'>
              <Image src={Img1} alt='' className='mx-auto h-[120px] w-[120px]' />
              <p className='text-center text-subtle-dark max-w-[400px] mx-auto mt-2'>{t('about-us-des-1')}</p>
            </div>
            <div className='px-3'>
              <Image src={Img2} alt='' className='mx-auto h-[120px] w-[120px]' />
              <p className='text-center text-subtle-dark max-w-[400px] mx-auto mt-2'>{t('about-us-des-2')}</p>
            </div>
            <div className='px-3'>
              <Image src={Img3} alt='' className='mx-auto h-[120px] w-[120px]' />
              <p className='text-center text-subtle-dark max-w-[400px] mx-auto mt-2'>{t('about-us-des-3')}</p>
            </div>
          </Carousel>
        </div>
        <div className='hidden lg:flex justify-between mt-28'>
          <div className='px-3'>
            <Image src={Img1} alt='' className='mx-auto h-[120px] w-[120px]' />
            <p className='text-center text-subtle-dark max-w-[400px] mx-auto mt-2'>{t('about-us-des-1')}</p>
          </div>
          <div className='px-3'>
            <Image src={Img2} alt='' className='mx-auto h-[120px] w-[120px]' />
            <p className='text-center text-subtle-dark max-w-[400px] mx-auto mt-2'>{t('about-us-des-2')}</p>
          </div>
          <div className='px-3'>
            <Image src={Img3} alt='' className='mx-auto h-[120px] w-[120px]' />
            <p className='text-center text-subtle-dark max-w-[400px] mx-auto mt-2'>{t('about-us-des-3')}</p>
          </div>
        </div>
        <div className='px-3 md:mt-14 lg:mt-28'>
          <div className='lg:flex justify-start items-center lg:mb-10'>
            <div className='px-2 bg-[#23FF81] rounded-md w-fit mx-auto mt-8 lg:mt-0 lg:mx-0'>
              <h1 className='text-[40px] font-medium'>{t('Authors')}</h1>
            </div>
            <p className='text-xs max-w-[270px] text-center mx-auto mt-3 md:text-lg md:max-w-[470px] lg:mt-0 lg:mx-10 lg:text-left'>
              {t('Meet the skilled and experienced team behind our successful artwork strategies')}
            </p>
          </div>
          <div className='mt-5 flex flex-col gap-5 lg:flex-row'>
            <div className='lg:w-[calc(50%-10px)] lg:flex-auto flex flex-col gap-5'>
              {authorData[locale].slice(0, Math.ceil(authorData[locale].length / 2)).map((d, i) => (
                <Author key={i} data={d} />
              ))}
            </div>
            <div className='lg:w-[calc(50%-10px)] lg:flex-auto flex flex-col gap-5'>
              {authorData[locale]
                .slice(Math.ceil(authorData[locale].length / 2), authorData[locale].length)
                .map((d, i) => (
                  <Author key={i} data={d} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Author = ({ data }) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <div className='rounded-[45px] border-solid border border-[#191A23] py-5 px-9 shadow-[0px_5px_0px_0px_#191A23] '>
      <div className='flex gap-5'>
        <div className='w-1/3 max-w-[120px] aspect-square relative '>
          <Image src={XVector} alt='' className='absolute top-2 -right-2 w-full aspect-square' />
          <div className={`x-mask w-full aspect-square`}>
            {data.avatar ? (
              <Image src={data.avatar} alt='' className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full bg-second-color'></div>
            )}
          </div>
        </div>
        <div className='w-2/3 flex-auto'>
          <div className='font-medium'>{data.name}</div>
          <div className='flex items-center flex-wrap'>
            <div className='text-second-color text-lg mr-4 font-bold'>{data.nickname}</div>
            <div className='flex items-center gap-1'>
              {t(data.gender)}
              <span>
                <Image src={data.gender.toLowerCase() == 'male' ? MaleIcon : FemaleIcon} alt='' className='w-5' />
              </span>
            </div>
          </div>
          <div className='flex gap-5 justify-end items-center mt-1'>
            {data.socialLink.fb && <Image src={FbIcon} alt='' onClick={() => window.open(data.socialLink.fb)} />}
            {data.socialLink.be && <Image src={BeIcon} alt='' onClick={() => window.open(data.socialLink.be)} />}
            {data.socialLink.ig && <Image src={IgIcon} alt='' onClick={() => window.open(data.socialLink.ig)} />}
          </div>
        </div>
      </div>
      <div className='w-full my-5 flex items-center gap-1'>
        <div className='flex-auto h-[2px] bg-black'></div>
        <div
          className='w-fit flex gap-3 items-center justify-center px-5 py-1 rounded-full bg-primary-color cursor-pointer'
          onClick={() => setOpen(!open)}>
          <ChevronDownIcon className={`w-5 ${open ? 'rotate-180' : 'rotate-0'} transition-all`} />
          <p className='text-sm leading-[125%] font-semibold'>{open ? t('Hide info') : t('Show info')}</p>
        </div>
      </div>
      <ul className={`list-disc list-inside transition-all overflow-hidden ${open ? 'max-h-[500px]' : 'max-h-[0px]'}`}>
        {data.bio.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
