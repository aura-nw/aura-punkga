import Card, { SubCard } from 'components/Card'
import Pagination from 'components/pages/artist/Pagination'
import Comic from 'components/pages/homepage/comic'
import MobileComic from 'components/pages/homepage/trendingComic'
import DOMPurify from 'dompurify'
import NoImg from 'images/avatar.svg'
import BeIcon from 'images/behance.svg'
import WebsiteIcon from 'images/icons/Website.svg'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import OtherIcon from 'images/icons/other-gender.svg'
import ShareIcon from 'images/icons/share.svg'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IArtist } from 'src/models/artist'
import { appendHttps } from 'src/utils'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Artist {...props} />
}
function Artist({ artistDetail, data }) {
  const artist = artistDetail.data as IArtist
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [showMore, setShowMore] = useState(false)
  const seekhypeBaseUrl = new URL(getConfig().SEEKHYPE_URL).origin
  if (!artist) return <></>
  return (
    <>
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
                  <Link target='_blank' href={appendHttps(artist.link.behance)}>
                    <Image src={BeIcon} alt='' className='w-8 aspect-square' />
                  </Link>
                )}
                {artist.link.website && (
                  <Link target='_blank' href={appendHttps(artist.link.website)}>
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
                      <div className='h-0 invisible hidden w-max lg:block'>{t('Total subscribers')}:</div>
                      <div className='h-0 w-max invisible lg:hidden'>{t('Gender')}:</div>
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
                    <div className='text-medium-gray'>
                      <div>{t('Gender')}:</div>
                      <div className='h-0 invisible hidden w-max lg:block'>{t('Total subscribers')}:</div>
                    </div>
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
                <div className='h-0 w-max invisible hidden lg:block'>{t('Total subscribers')}:</div>
                <div className='h-0 w-max invisible lg:hidden'>{t('Gender')}:</div>
              </div>
              <div
                className={`font-medium whitespace-pre-wrap ${showMore ? '' : 'line-clamp-3'}`}
                onClick={() => setShowMore(!showMore)}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(locale == 'vn' ? artist?.bio : data?.description || artist?.bio),
                }}></div>
            </div>
          </div>
        </div>
        {!!artist.comics.length && (
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
        )}
        {!!artist.collections.length && (
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
        )}
      </div>
    </>
  )
}
