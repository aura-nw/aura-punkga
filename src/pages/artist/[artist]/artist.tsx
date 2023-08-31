import HeadComponent from 'components/Head'
import Header from 'components/Header'
import Image from 'next/image'
import NoImg from 'images/avatar.svg'
import BeIcon from 'images/behance.svg'
import WebsiteIcon from 'images/icons/Website.svg'
import MaleIcon from 'images/icons/male.svg'
import ShareIcon from 'images/icons/share.svg'
import FemaleIcon from 'images/icons/female.svg'
import Card, { SubCard } from 'components/Card'
import { IArtist } from 'src/models/artist'
import { useRouter } from 'next/router'
import moment from 'moment'
import OtherIcon from 'images/icons/other-gender.svg'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { appendHttps } from 'src/utils'
import getConfig from 'next/config'
import MobileComic from 'components/pages/homepage/trendingComic'
import Comic from 'components/pages/homepage/comic'
import Pagination from 'components/pages/artist/Pagination'
import { Fragment, useState } from 'react'

export default function Artist({ artistDetail }) {
  const artist = artistDetail.data as IArtist
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  if (!artist) return <></>
  return (
    <>
      <HeadComponent title={`Sunday | Punkga.me`} />
      <Header />
      <div className='px-[10px] lg:px-0 lg:py-[47px] py-[17px] pk-container'>
        <div className='flex gap-[10px] lg:gap-[60px] px-[10px] lg:px-0'>
          <div className='p-[5px] lg:px-0'>
            <div className='border-[4px] border-second-color lg:border-none rounded-full lg:rounded-2xl overflow-hidden'>
              <Image
                src={artist?.avatar || NoImg}
                height={360}
                width={360}
                alt=''
                className='w-[112px] lg:w-[280px] object-cover aspect-square'
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-between lg:justify-normal lg:gap-5'>
            <div className='flex justify-between items-start lg:flex-col lg:gap-5'>
              <div>
                <div className='font-extrabold text-base leading-5 lg:text-[32px] lg:leading-10'>{artist.penName}</div>
                {artist.name && (
                  <div className='text-sm leading-[15px] text-second-color lg:mt-[5px] lg:text-base lg:font-medium lg:leading-5'>
                    {artist.name}
                  </div>
                )}
              </div>
              <div className='flex gap-4'>
                {artist.link.behance && (
                  <Link href={appendHttps(artist.link.behance)}>
                    <Image src={BeIcon} alt='' className='w-8 aspect-square' />
                  </Link>
                )}
                {artist.link.website && (
                  <Link href={appendHttps(artist.link.website)}>
                    <Image src={WebsiteIcon} alt='' className='w-8 aspect-square' />
                  </Link>
                )}
              </div>
            </div>
            {(artist.dob || (artist.gender && artist.gender != 'Do not display')) && (
              <div className='grid grid-cols-[max-content_auto] gap-y-[5px] gap-x-[15px] lg:gap-x-5 text-xs lg:text-base leading-[15px] lg:leading-5 lg:font-medium'>
                {artist.dob && (
                  <>
                    <div className='text-medium-gray'>
                      <div>{t('DoB')}:</div>
                      <div className='h-0 invisible'>{t('Total subscribers')}:</div>
                    </div>
                    <div className='font-medium'>
                      {locale == 'vn'
                        ? moment(artist.dob).format('DD/MM/yyyy')
                        : moment(artist.dob).format('MM/DD/yyyy')}
                    </div>
                  </>
                )}
                {artist.gender && artist.gender != 'Do not display' && (
                  <>
                    <div className='text-medium-gray'>{t('Gender')}:</div>
                    <div className='flex items-center font-medium'>
                      {t(artist.gender == 'Undisclosed' ? 'Other' : artist.gender)}{' '}
                      <Image
                        className='h-[14px] w-[14px] lg:h-6 lg:w-6'
                        src={
                          artist.gender.toLowerCase() == 'male'
                            ? MaleIcon
                            : artist.gender.toLowerCase() == 'female'
                            ? FemaleIcon
                            : OtherIcon
                        }
                        alt=''
                      />
                    </div>
                  </>
                )}
              </div>
            )}
            <div className='hidden lg:grid grid-cols-[max-content_auto] gap-y-[5px] gap-x-[15px] lg:gap-x-5 text-xs lg:text-base leading-[15px] lg:leading-5 lg:font-medium'>
              <>
                <div className='text-medium-gray'>{t('Joined date')}:</div>
                <div className='font-medium'>
                  {locale == 'vn'
                    ? moment(artist.joinDate).format('DD/MM/yyyy')
                    : moment(artist.joinDate).format('MM/DD/yyyy')}
                </div>
              </>
              <>
                <div className='text-medium-gray'>{t('Total subscribers')}:</div>
                <div className='flex items-center font-medium'>
                  {new Intl.NumberFormat().format(artist.totalSubscribers || 0)}
                </div>
              </>
            </div>
            <div className='flex gap-[15px] text-xs leading-[15px] lg:text-base lg:leading-5 lg:font-medium lg:gap-5'>
              <div className='text-medium-gray'>
                <div>{t('Bio')}:</div>
                <div className='h-0 invisible'>{t('Total subscribers')}:</div>
              </div>
              <div className='font-medium line-clamp-3'>{artist?.bio}</div>
            </div>
          </div>
        </div>
        <div className='mt-10 lg:-mx-[35px]'>
          <Card title={t('Mangas')}>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10'>
              {artist.comics?.slice(0, 2)?.map((comic, index) => (
                <Fragment key={index}>
                  <div className='bg-white p-[10px] rounded-[10px] md:hidden'>
                    <MobileComic {...comic} />
                  </div>
                  <div className='bg-white p-[10px] rounded-[10px] hidden md:block'>
                    <Comic {...comic} />
                  </div>
                </Fragment>
              ))}
            </div>
          </Card>
        </div>
        <div className='mt-10 lg:-mx-[35px]'>
          <Card title={t('NFT Collections')}>
            <div className='my-[10px] lg:my-0 flex flex-col gap-5 lg:gap-10'>
              {artist.collections.slice(currentPage * 2 - 2, currentPage * 2).map((collection, index) => (
                <SubCard
                  key={index}
                  title={
                    <div className='flex gap-[10px]'>
                      <div className='text-sm leading-6 truncate lg:text-xl lg:leading-6'>{collection.name}</div>
                      <Link
                        title={t('View more on Seekhype')}
                        href={`${getConfig().SEEKHYPE_URL}/collection/${collection.address}`}
                        className='cursor-pointer'>
                        <Image src={ShareIcon} alt='' className='w-5 h-5' />
                      </Link>
                    </div>
                  }>
                  <div className='grid grid-cols-[repeat(auto-fill,minmax(max(160px,calc(100%/5)),1fr))] grid-rows-[auto_auto] lg:grid-rows-1 auto-rows-[0px] overflow-hidden -m-[5px] lg:-m-5'>
                    {collection.tokens.map((token, index) => (
                      <Link
                        href={`${getConfig().SEEKHYPE_URL}/nft/${collection.address}/${token.id}`}
                        key={index}
                        className='p-[5px] lg:p-5 [&:hover_.view-on-seekhype]:translate-y-0'>
                        <div className='bg-white rounded-[20px] p-[10px]'>
                          <div className='w-full aspect-square rounded-[15px] overflow-hidden relative'>
                            <Image
                              src={token.image}
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
              {!!artist.collections.length && (
                <Pagination
                  length={Math.ceil(artist.collections.length / 2)}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
