import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import ArtworkList from 'components/pages/artist/Artworks'
import CollectionList from 'components/pages/artist/Collections'
import Contests from 'components/pages/artist/Contests'
import MangaList from 'components/pages/artist/Mangas'
import Manga from 'components/pages/homepage/manga'
import DOMPurify from 'dompurify'
import NoImg from 'images/avatar.svg'
import moment from 'moment'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IArtist } from 'src/models/artist'
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
  const [tab, setTab] = useState('mangas')
  const seekhypeBaseUrl = new URL(getConfig().SEEKHYPE_URL).origin
  if (!artist) return <></>
  return (
    <div className='pk-container pt-8 flex flex-col gap-8 lg:flex-row'>
      <div className='bg-white px-4 rounded-mlg p-8 flex flex-col gap-8 items-center lg:w-[343px] lg:shrink-0 relative'>
        <div className='absolute top-5 right-5 flex gap-3'>
          {artist.link?.behance && (
            <Link href={artist.link?.behance} target='_blank'>
              <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='16' cy='16' r='16' fill='#105DFB' />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6.875 21.9597V9.74365H12.5223C14.3362 9.74365 15.8066 11.2141 15.8066 13.028C15.8066 14.1807 15.4522 14.8947 14.1526 15.6272C15.7078 16.3358 16.1397 17.3178 16.1397 18.6877C16.1397 20.5408 14.4935 21.9597 12.6404 21.9597H6.875ZM9.26468 11.7658V14.7033H12.0616C12.0616 14.7033 13.4209 14.7033 13.4209 13.2346C13.4209 11.7658 12.0616 11.7658 12.0616 11.7658H9.26468ZM9.26468 19.8908V16.7189H12.2647C12.7491 16.7189 13.7647 16.9689 13.7647 18.4689C13.7647 19.5814 12.7647 19.8804 12.2647 19.8908H9.26468Z'
                  fill='white'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M21.2491 13.1096C19.5303 13.1096 16.9834 14.3439 16.9834 17.6252C16.9834 19.6232 18.0772 22.1877 21.3584 22.1877C23.9834 22.1877 25.1918 20.2606 25.4678 19.2971H22.9991C22.8741 19.7346 22.3897 20.2189 21.3584 20.2189C19.8584 20.2189 19.3272 18.9377 19.2491 18.2971H25.4678V17.6252C25.4678 14.3439 22.9678 13.1096 21.2491 13.1096ZM21.2491 14.9846C19.8491 14.9846 19.3324 16.1408 19.2491 16.7189H22.9991C22.9991 16.1408 22.6491 14.9846 21.2491 14.9846Z'
                  fill='white'
                />
                <path d='M18.2647 10.4377V11.9533H24.1553V10.4377H18.2647Z' fill='white' />
              </svg>
            </Link>
          )}
          {artist.link?.website && (
            <Link href={artist.link.website} target='_blank'>
              <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5C24.5604 0.5 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16Z'
                  fill='white'
                />
                <path
                  d='M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5C24.5604 0.5 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16Z'
                  stroke='#B0B0B0'
                />
                <path
                  d='M12.1495 14.4921L10.2883 16.3533C9.59317 17.0485 9.19343 17.9943 9.20074 18.9883C9.20804 19.9823 9.59903 20.9338 10.3271 21.6395C11.0327 22.3676 11.9845 22.7585 12.9783 22.7658C13.9948 22.7733 14.9183 22.3961 15.6134 21.701L17.4746 19.8398M19.852 17.5079L21.7132 15.6467C22.4083 14.9516 22.808 14.0058 22.8007 13.0118C22.7934 12.0177 22.4024 11.0662 21.6743 10.3606C20.9689 9.65516 20.0173 9.26415 19.0233 9.25684C18.0293 9.24954 17.0834 9.62658 16.3882 10.3217L14.527 12.1829M13.1783 18.7726L18.762 13.189'
                  stroke='#6D6D6D'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Link>
          )}
        </div>
        <div className='flex flex-col items-center gap-3'>
          <Image
            src={artist?.avatar || NoImg}
            height={360}
            width={360}
            alt=''
            className='w-[146px] rounded-full object-cover aspect-square'
          />
          <div className='space-y-1.5 text-center flex-col flex items-center'>
            <div className='text-xl font-semibold'>{artist.penName}</div>
            {artist.name && <div className='text-text-teriary font-medium text-sm'>{artist.name}</div>}
            <div className='flex gap-3 items-center text-sm font-medium'>
              {artist.gender && artist.gender != 'Do not display' && (
                <div className=''>{t(artist.gender == 'Undisclosed' ? 'Other' : artist.gender)}</div>
              )}
              {artist.gender && artist.gender != 'Do not display' && artist.dob && (
                <div className='w-1 h-1 rounded-full bg-text-primary'></div>
              )}
              {artist.dob && (
                <div>
                  {locale == 'vn' ? moment(artist.dob).format('DD/MM/yyyy') : moment(artist.dob).format('MM/DD/yyyy')}
                </div>
              )}
            </div>
          </div>
          <div
            className={`font-medium text-sm max-w-80 break-words`}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(locale == 'vn' ? artist?.bio : data?.description || artist?.bio),
            }}></div>
        </div>
        <div className='w-full rounded-mlg border border-border-primary p-3 '>
          <div className='rounded-mlg bg-background-bg-primary px-3 py-4 text-sm space-y-3'>
            <div className='flex justify-between'>
              <div className='text-text-teriary font-medium'>{t('Joined date')}</div>
              <div className='font-semibold'>
                {locale == 'vn'
                  ? moment(artist.joinDate).format('DD/MM/yyyy')
                  : moment(artist.joinDate).format('MM/DD/yyyy')}
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='text-text-teriary font-medium'>{t('Total subscribers')}</div>
              <div className='font-semibold'>{new Intl.NumberFormat().format(artist.totalSubscribers || 0)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:flex-1 lg:p-8 lg:bg-white lg:rounded-mlg'>
        <div className='flex gap-4 text-sm text-text-teriary font-semibold w-full'>
          <div
            className={`py-1 px-2 rounded-lg cursor-pointer ${
              tab == 'mangas' ? 'bg-brand-100 text-text-brand-defaul' : ''
            }`}
            onClick={() => setTab('mangas')}>
            {t('Mangas')}
          </div>
          <div
            className={`py-1 px-2 rounded-lg cursor-pointer ${
              tab == 'artworks' ? 'bg-brand-100 text-text-brand-defaul' : ''
            }`}
            onClick={() => setTab('artworks')}>
            {t('Artworks')}
          </div>
          <div
            className={`py-1 px-2 hidden lg:block rounded-lg cursor-pointer ${
              tab == 'collections' ? 'bg-brand-100 text-text-brand-defaul' : ''
            }`}
            onClick={() => setTab('collections')}>
            {t('NFT Collections')}
          </div>
          <div
            className={`py-1 px-2 hidden lg:block rounded-lg cursor-pointer ${
              tab == 'contests' ? 'bg-brand-100 text-text-brand-defaul' : ''
            }`}
            onClick={() => setTab('contests')}>
            {t('Contests')}
          </div>
          <div className='lg:hidden'>
            <Dropdown>
              <DropdownToggle>
                <div className='flex items-center'>
                  {tab == 'collections' || tab == 'contests' ? (
                    <div className='py-1 px-2 rounded-lg cursor-pointer bg-brand-100 text-text-brand-defaul'>
                      {tab == 'collections' ? t('NFT Collections') : t('Contests')}
                    </div>
                  ) : (
                    <div className='py-1 px-2 rounded-lg cursor-pointer'>{t('More')}</div>
                  )}
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M7 10L12.0008 14.58L17 10'
                      stroke='#6D6D6D'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </DropdownToggle>
              <DropdownMenu closeOnClick>
                <div className='p-2.5'>
                  <div
                    onClick={() => setTab('collections')}
                    className={`py-3 font-semibold border-b border-border-teriary cursor-pointer ${
                      tab == 'collections' ? 'text-text-brand-defaul' : 'text-text-primary'
                    }`}>
                    {t('NFT Collections')}
                  </div>
                  <div
                    onClick={() => setTab('contests')}
                    className={`py-3 font-semibold cursor-pointer ${
                      tab == 'contests' ? 'text-text-brand-defaul' : 'text-text-primary'
                    }`}>
                    {t('Contests')}
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='mt-8'>
          {tab == 'mangas' && <MangaList id={artist.id} />}
          {tab == 'artworks' && <ArtworkList id={artist.id} />}
          {tab == 'collections' && <CollectionList id={artist.id} />}
          {tab == 'contests' && <Contests id={artist.id} />}
        </div>
      </div>
    </div>
  )
}
