import NoImage from 'images/no_img.png'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { getUserNfts } from 'src/services'
import useSWR from 'swr'
import Banner from './assets/banner.png'
import BannerVN from './assets/banner_vn.svg'
import FooterBg from './assets/nfts-list-footer-background.svg'
import HeaderBg from './assets/nfts-list-header-background.svg'
import FilledButton from 'components/core/Button/FilledButton'
import { useRouter } from 'next/router'

export default function NFTList() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const { wallet } = useContext(Context)
  const [seeAll, setSeeAll] = useState(false)
  const { data } = useSWR(
    {
      key: 'pooling nfts',
      wallet,
    },
    ({ wallet }) => (wallet ? getUserNfts(wallet) : null),
    { refreshInterval: 10000 }
  )
  if (!data || !data.length) {
    return (
      <div className='w-full p-5 rounded-2xl bg-[#F2F2F2] md:mt-10'>
        <div className='text-[#1C1C1C] font-bold leading-5 md:text-xl md:leading-[25px]'>{t('Your NFTs')}</div>
        <div className='mt-5 md:mt-[10px] flex justify-between flex-col md:flex-row'>
          <div className='2xl:pt-5 flex flex-col justify-between'>
            <div>
              <div className='font-bold text-xs leading-[15px] md:text-base md:leading-5'>
                {t('You don’t have any NFTs in your collection yet')}.
              </div>
              <div className='text-xs leading-[15px] md:text-sm md:leading-[18px] mt-[5px] md:mt-[10px]'>
                {t('You can earn NFTs by completing quest')}
              </div>
            </div>
            <div className='hidden md:block'>
              <Link
                href='/campaigns'
                className='block w-fit bg-primary-color text-lg leading-6 px-8 py-3 rounded-[20px] font-bold'>
                {t('Go to campaign')}
              </Link>
            </div>
          </div>
          {locale === 'vn' ? (
            <Image
              src={BannerVN}
              alt=''
              className='rounded-[10px] md:max-w-[500px] md:w-1/2 aspect-[5/2] object-cover my-[10px] md:my-0 w-full max-w-none'
            />) : (
            <Image
              src={Banner}
              alt=''
              className='rounded-[10px] md:max-w-[500px] md:w-1/2 aspect-[5/2] object-cover my-[10px] md:my-0 w-full max-w-none'
            />)}
          <div className='md:hidden'>
            <FilledButton
              href='/campaigns'
              className='block w-full text-center bg-primary-color text-lg leading-6 px-8 py-3 rounded-[20px] font-bold'>
              {t('Go to campaign')}
            </FilledButton>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='w-full p-5 rounded-2xl md:mt-10 bg-[#F2F2F2]'>
      <div className='flex items-center gap-5'>
        <div className='text-[#1C1C1C] font-bold text-xl leading-[25px]'>{t('Your NFTs')}</div>
        {data.length > 5 && (
          <button
            onClick={() => setSeeAll(!seeAll)}
            className='px-6 py-2 rounded-full border-2 border-second-color text-second-color font-bold leading-5'>
            {t(seeAll ? 'See less' : 'See all')}
          </button>
        )}
      </div>
      <div
        className={`mt-[10px] -mx-5 grid grid-cols-[repeat(auto-fill,minmax(max(160px,calc(100%/5)),1fr))] overflow-hidden ${seeAll ? '' : 'grid-rows-1 auto-rows-[0px]'
          }`}>
        {data?.map((token, index) => (
          <Link
            target='_blank'
            href={`${getConfig()['CHAIN_INFO'].explorer}/tokens/token-nft/${token.cw721_contract.smart_contract.address
              }/${token.token_id}`}
            className='p-5 [&:hover_.view-on-seekhype]:translate-y-0'
            key={index}>
            <div className={`bg-white rounded-[20px] p-[10px]`}>
              <div className='w-full aspect-square rounded-[15px] overflow-hidden relative'>
                <Image
                  src={token.image_url || NoImage}
                  width={160}
                  height={160}
                  className='w-full object-contain aspect-square'
                  alt=''
                />
                <div className='view-on-seekhype transition-all translate-y-full absolute bottom-0 bg-primary-color py-2 w-full text-sm leading-[18px] font-bold text-center'>
                  {t('View on AuraScan')}
                </div>
              </div>
              <div className={`mt-[10px] text-subtle-dark text-sm font-bold leading-[18px] text-center truncate`}>
                {token.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
  return (
    <div className='my-[60px] relative'>
      <Image src={HeaderBg} alt='' />
      <div className='text-primary-color font-extrabold text-2xl leading-[30px] font-orbitron absolute top-[22px] left-[2%]'>
        NFTs
      </div>
      <div className='bg-[#f0f0f0] px-[55px]'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(max(160px,calc(100%/5)),1fr))] grid-rows-[auto_auto] lg:grid-rows-1 auto-rows-[0px] overflow-hidden'>
          {data?.reverse()?.map((token, index) => (
            <Link
              target='_blank'
              href={`${getConfig()['CHAIN_INFO'].explorer}/tokens/token-nft/${token.cw721_contract.smart_contract.address
                }/${token.token_id}`}
              className='p-[5px] lg:p-5 [&:hover_.view-on-seekhype]:translate-y-0'
              key={index}>
              <div className={`bg-white rounded-[20px] p-[10px]`}>
                <div className='w-full aspect-square rounded-[15px] overflow-hidden relative'>
                  <Image
                    src={token.image_url || NoImage}
                    width={160}
                    height={160}
                    className='w-full object-cover aspect-square'
                    alt=''
                  />
                  <div className='view-on-seekhype transition-all translate-y-full absolute bottom-0 bg-primary-color py-2 w-full text-xl leading-[25px] font-bold text-center'>
                    {t('View on AuraScan')}
                  </div>
                </div>
                <div
                  className={`mt-[10px] text-subtle-dark text-sm font-bold leading-[18px] text-center truncate lg:text-xl lg:leading-[25px]`}>
                  {token.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Image src={FooterBg} alt='' />
      <div className='absolute left-[6%] bottom-[38px]'>
        <svg xmlns='http://www.w3.org/2000/svg' width='192' height='58' viewBox='0 0 192 58' fill='none'>
          <path
            d='M1 23.8579V11C1 5.47715 5.47715 1 11 1H171.858C174.51 1 177.054 2.05357 178.929 3.92893L187.929 12.9289C191.834 16.8342 191.834 23.1658 187.929 27.0711L160.929 54.0711C159.054 55.9464 156.51 57 153.858 57H34.1421C31.49 57 28.9464 55.9464 27.0711 54.0711L3.92893 30.9289C2.05357 29.0536 1 26.51 1 23.8579Z'
            stroke='#1FAB5E'
          />
        </svg>
        <div className='absolute inset-0 grid place-items-center text-second-color font-semibold'>See more</div>
      </div>
    </div>
  )
}
