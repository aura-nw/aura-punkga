import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import CollectionList from 'components/pages/artist/Collections'
import MangaList from 'components/pages/artist/Mangas'
import Manga from 'components/pages/homepage/manga'
import DOMPurify from 'dompurify'
import NoImg from 'images/avatar.svg'
import moment from 'moment'
import getConfig from 'next/config'
import Image from 'next/image'
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
    <div className='pk-container pt-8 flex flex-col gap-8'>
      <div className='bg-white px-4 rounded-mlg p-8 flex flex-col gap-8 items-center'>
        <div className='flex flex-col items-center gap-3'>
          <Image
            src={artist?.avatar || NoImg}
            height={360}
            width={360}
            alt=''
            className='w-[146px] rounded-full object-cover aspect-square'
          />
          <div className='space-y-1.5 text-center'>
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
            className={`font-medium text-sm`}
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
      <div>
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
          <div>
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
                <div className='p-3 space-y-2'>
                  <div
                    onClick={() => setTab('collections')}
                    className={`${tab == 'collections' ? 'text-text-brand-defaul' : ''}`}>
                    NFT Collections
                  </div>
                  <div
                    onClick={() => setTab('contests')}
                    className={`${tab == 'contests' ? 'text-text-brand-defaul' : ''}`}>
                    Contests
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='mt-8'>
          {tab == 'mangas' && <MangaList list={artist.comics} />}
          {tab == 'artworks' && <div></div>}
          {tab == 'collections' && <CollectionList list={artist.collections} />}
          {tab == 'contests' && <div></div>}
        </div>
      </div>
    </div>
  )
}
