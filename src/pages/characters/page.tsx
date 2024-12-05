import UploadUpIcon from 'assets/images/icons/upload-up.svg'
import Button from 'components/core/Button/Button'
import TextField from 'components/Input/TextField'
import Character from 'components/pages/characters/Character'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { eventService } from 'src/services/eventService'
import { useWindowSize } from 'usehooks-ts'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <PageContent {...props} />
}
function PageContent() {
  const [showSearch, setShowSearch] = useState(false)
  const { account } = useContext(Context)
  const [searchValue, setSearchValue] = useState('')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const { width } = useWindowSize()
  const [characters, setCharacters] = useState([])
  const [remaining, setRemaining] = useState(true)
  const { t } = useTranslation()
  const fetchData = async (isRefresh?: boolean) => {
    try {
      const data = await eventService.story.getCharacters(account?.id, isRefresh ? 1 : page, 'Created_At_Desc', type)
      if (data?.data?.data?.story_character.length) {
        const newList = isRefresh
          ? data?.data?.data?.story_character
          : [...characters, ...data?.data?.data?.story_character]
        setCharacters(newList)
        setPage(isRefresh ? 2 : page + 1)
        if (data?.data?.data?.story_character_aggregate?.aggregate?.count <= newList.length) {
          setRemaining(false)
        } else {
          setRemaining(true)
        }
      } else {
        setRemaining(false)
      }
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }
  useEffect(() => {
    fetchData(true)
  }, [searchValue, type])
  return (
    <div className='p-4 bg-background min-h-screen text-white lg:px-[84px] xl:pt-10'>
      <div className='flex justify-center mb-14 items-center w-full'>
        <TextField
          onChange={debounce(setSearchValue, 1000)}
          className='bg-neutral-100 max-w-lg [&_input::placeholder]:!text-text-quatenary '
          placeholder={t('Search by character name, creator, IP')}
        />
      </div>
      <div className='flex flex-col lg:flex-row-reverse lg:justify-between lg:items-center'>
        <div className='flex justify-between items-center bg-ne'>
          <Link href='/characters/submit'>
            <Button color='neutral' size={width < 1024 ? 'xs' : 'sm'} leadingIcon={UploadUpIcon}>
              Submit character
            </Button>
          </Link>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
            className='mr-4 lg:hidden'
            onClick={() => setShowSearch(!showSearch)}>
            <path
              d='M14.1057 14.7L17 17.5M16.0667 10.0333C16.0667 13.6416 13.1416 16.5667 9.53333 16.5667C5.92507 16.5667 3 13.6416 3 10.0333C3 6.42507 5.92507 3.5 9.53333 3.5C13.1416 3.5 16.0667 6.42507 16.0667 10.0333Z'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
        </div>
        {showSearch && (
          <div className='mt-4 w-full'>
            <TextField
              onChange={debounce(setSearchValue, 1000)}
              className='!border-x-0 !border-t-0 !rounded-none !border-b !border-border-primary text-neutral-white [&_input::placeholder]:!text-text-quatenary '
              placeholder={t('Search by character name, creator, IP')}
            />
          </div>
        )}
        <div className='mt-8 flex gap-2 -skew-x-12 lg:mt-0'>
          <div className='h-9 w-3 rounded bg-white'></div>
          <div
            className={`h-9 grid place-items-center rounded ${
              type == 'all' ? 'bg-white text-black' : 'bg-gray-500 text-white'
            } text-sm font-semibold px-3.5 cursor-pointer`}
            onClick={() => {
              setType('all')
            }}>
            <span className='skew-x-12'>{t('All')}</span>
          </div>
          <div
            className={`h-9 grid place-items-center rounded ${
              type == 'sponsored' ? 'bg-white text-black' : 'bg-gray-500 text-white'
            } text-sm font-semibold px-3.5 cursor-pointer`}
            onClick={() => {
              setType('sponsored')
            }}>
            <span className='skew-x-12'>{t('Sponsored')}</span>
          </div>
          <div
            className={`h-9 grid place-items-center rounded ${
              type == 'user' ? 'bg-white text-black' : 'bg-gray-500 text-white'
            } text-sm font-semibold px-3.5 cursor-pointer`}
            onClick={() => {
              setType('user')
            }}>
            <span className='skew-x-12'>{t('From community')}</span>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <InfiniteScroll
          loader={<h4>Loading...</h4>}
          next={fetchData}
          dataLength={characters.length}
          className='gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          hasMore={remaining}>
          {characters.map((character) => (
            <Character data={character} key={character.id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
