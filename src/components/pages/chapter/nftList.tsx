import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import NoImage from 'images/no_img.png'
import { useTranslation } from 'react-i18next'
import { SubCard } from 'components/Card'
import ShareIcon from 'images/icons/share.svg'

export default function NFTList({ collections }) {
  const { t } = useTranslation()
  const seekhypeBaseUrl = new URL(getConfig().SEEKHYPE_URL).origin
  console.log(collections)
  return (
    <>
      {collections?.map((collection, index) => (
        <SubCard
          key={index}
          title={
            <div className='flex gap-[10px]'>
              <div className='text-sm leading-6 truncate lg:text-xl lg:leading-6'>{collection.name}</div>
              <Link
                target='_blank'
                title={t('View more on SEEKHYPE')}
                href={`${seekhypeBaseUrl}/collection/${collection.address}`}
                className='cursor-pointer'>
                <Image src={ShareIcon} alt='' className='w-5 h-5' />
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
                <div className='bg-white rounded-[20px] p-[10px]'>
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
                  <div className='mt-[10px] text-subtle-dark text-sm font-bold leading-[18px] text-center truncate lg:text-xl lg:leading-[25px]'>
                    {token.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SubCard>
      ))}
    </>
  )
}
