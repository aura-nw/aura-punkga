import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import NoImage from 'images/no_img.png'
import { useTranslation } from 'react-i18next'
import { SubCard } from 'components/Card'
import ShareIcon from 'images/icons/share.svg'

export default function NFTList({ collections, theme }) {
  const { t } = useTranslation()
  const seekhypeBaseUrl = new URL(getConfig().SEEKHYPE_URL).origin
  return (
    <div className='p-5 flex flex-col gap-5 bg-black lg:py-10 lg:px-0 lg:bg-transparent lg:w-[calc(100%-140px)] lg:gap-10'>
      {collections?.map((collection, index) => (
        <SubCard
          key={index}
          theme={theme}
          title={
            <div className='flex gap-[10px]'>
              <div className='text-sm leading-6 truncate lg:text-xl lg:leading-6'>{collection.name}</div>
              <Link
                target='_blank'
                title={t('View more on SEEKHYPE')}
                href={`${seekhypeBaseUrl}/collection/${collection.address}`}
                className='cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  className={theme == 'dark' ? `[&_path]:stroke-primary-color` : `[&_path]:stroke-second-color`}>
                  <path
                    d='M10.8342 18.3328C14.2134 18.3267 15.9829 18.2438 17.1138 17.1129C18.3342 15.8925 18.3342 13.9283 18.3342 9.99996C18.3342 6.07159 18.3342 4.1074 17.1138 2.88701C15.8934 1.66663 13.9292 1.66663 10.0008 1.66663C6.07245 1.66663 4.10826 1.66663 2.88788 2.88701C1.75702 4.01787 1.67405 5.7874 1.66797 9.16663'
                    strokeLinecap='round'
                  />
                  <path
                    d='M2.5 17.5L9.16667 10.8334M9.16667 10.8334H4.16667M9.16667 10.8334V15.8334'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
            </div>
          }>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(max(160px,calc(100%/5)),1fr))] grid-rows-[auto_auto] lg:grid-rows-1 auto-rows-[0px] overflow-hidden -m-[5px] lg:-m-5'>
            {collection.tokens.map((token, index) => (
              <Link
                target='_blank'
                href={`${seekhypeBaseUrl}/nft/${collection.address}/${token.id}`}
                key={index}
                className='p-[5px] lg:p-5 [&:hover_.view-on-seekhype]:translate-y-0'>
                <div className={`${theme == 'dark' ? 'bg-[#414141]' : 'bg-white'} rounded-[20px] p-[10px]`}>
                  <div className='w-full aspect-square rounded-[15px] overflow-hidden relative'>
                    <Image
                      src={token.image || NoImage}
                      width={160}
                      height={160}
                      className='w-full object-cover aspect-square'
                      alt=''
                    />
                    <div className='view-on-seekhype transition-all translate-y-full absolute bottom-0 bg-primary-color py-2 w-full text-xl leading-[25px] font-bold text-center'>
                      {t('View on SEEKHYPE')}
                    </div>
                  </div>
                  <div
                    className={`mt-[10px] ${
                      theme == 'dark' ? 'text-white' : 'text-subtle-dark'
                    } text-sm font-bold leading-[18px] text-center truncate lg:text-xl lg:leading-[25px]`}>
                    {token.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SubCard>
      ))}
    </div>
  )
}
