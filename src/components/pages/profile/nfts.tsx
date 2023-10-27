import HeaderBg from './assets/nfts-list-header-background.svg'
import FooterBg from './assets/nfts-list-footer-background.svg'
import Image from 'next/image'
import NoImage from 'images/no_img.png'
import { useTranslation } from 'react-i18next'
import { useContext, useEffect, useState } from 'react'
import { Context } from 'src/context'
import { getUserNfts } from 'src/services'
import getConfig from 'next/config'
import Link from 'next/link'
import useSWR from 'swr'

export default function NFTList() {
  const { t } = useTranslation()
  const { wallet } = useContext(Context)
  const { data } = useSWR(
    {
      key: 'pooling nfts',
      wallet,
    },
    ({ wallet }) => (wallet ? getUserNfts(wallet) : null),
    { refreshInterval: 10000 }
  )
  return (
    <div className='my-[60px] relative'>
      <Image src={HeaderBg} alt='' />
      <div className='text-primary-color font-extrabold text-2xl leading-[30px] font-orbitron absolute top-[22px] left-[2%]'>
        NFTs
      </div>
      <div className='bg-[#f0f0f0] px-[55px]'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(max(160px,calc(100%/5)),1fr))] grid-rows-[auto_auto] lg:grid-rows-1 auto-rows-[0px] overflow-hidden'>
          {data.map((token, index) => (
            <Link
              target='_blank'
              href={`${getConfig()['CHAIN_INFO'].explorer}/tokens/token-nft/${
                token.cw721_contract.smart_contract.address
              }/${token.id}`}
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
