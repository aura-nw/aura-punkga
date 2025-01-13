import UploadUpIcon from 'assets/images/icons/upload-up.svg'
import Button from 'components/core/Button'
import TextField from 'components/Input/TextField'
import Character from 'components/pages/characters/Character'
import CharacterDetail from 'components/pages/characters/CharacterDetail'
import Modal from 'components/pages/characters/Modal'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { ListContext } from 'src/context/characterList'
import { eventService } from 'src/services/eventService'
import { useWindowSize } from 'usehooks-ts'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <PageContent {...props} />
}
function PageContent() {
  const searchParams = new URLSearchParams(window.location.search)
  const { characterData, setCharacterData } = useContext(ListContext)
  const [showSearch, setShowSearch] = useState(false)
  const { account } = useContext(Context)
  const [type, setType] = useState('all')
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [openCharacterDetail, setOpenCharacterDetail] = useState(searchParams.has('character_id'))
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const router = useRouter()
  const fetchCharacters = async (isRefresh?: boolean) => {
    try {
      const response = await eventService.story.getCharacters(
        account?.id,
        isRefresh ? 1 : characterData.page,
        'Created_At_Desc',
        type,
        characterData.search
      )
      const newCharacters = response.data.data.story_character
      const newPage = isRefresh ? 2 : characterData.page + 1
      const newRemaining = response.data.data.story_character_aggregate.aggregate.count > newCharacters.length
      setCharacterData({
        list: isRefresh ? newCharacters : [...characterData.list, ...newCharacters],
        page: newPage,
        remaining: newRemaining,
      })
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }
  useEffect(() => {
    if (characterData.list.length === 0) {
      fetchCharacters()
    }
    setIsFirstRender(false)
  }, [])
  useEffect(() => {
    if (!isFirstRender) {
      fetchCharacters(true)
    }
  }, [characterData.search, type])
  useEffect(() => {
    if (!isFirstRender) {
      if (selectedCharacter?.id && openCharacterDetail) {
        searchParams.set('character_id', selectedCharacter.id)
        router.replace(`/characters?${searchParams.toString()}`, undefined, { shallow: true })
      } else {
        router.replace('/characters', undefined, { shallow: true })
      }
    }
  }, [selectedCharacter, openCharacterDetail])
  return (
    <div className='p-4 bg-background min-h-screen text-white lg:px-[84px] xl:pt-10'>
      <div className='justify-center mb-14 items-center w-full hidden lg:flex'>
        <TextField
          defaultValue={characterData.search}
          onChange={debounce((v) => setCharacterData({ search: v.trim() }), 1000)}
          className='bg-neutral-100 text-black max-w-lg [&_input::placeholder]:!text-text-quatenary '
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
              onChange={debounce((v) => setCharacterData({ search: v.trim() }), 1000)}
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
          next={fetchCharacters}
          dataLength={characterData.list.length}
          className='lg:gap-8 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          hasMore={characterData.remaining}>
          {characterData.list.map((character) => (
            <div
              key={character.id}
              onClick={() => {
                setSelectedCharacter(character)
                setOpenCharacterDetail(true)
              }}>
              <Character data={character} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
      {width >= 768 ? (
        <Modal open={openCharacterDetail} setOpen={setOpenCharacterDetail}>
          <div className='w-screen max-w-screen-2xl relative mx-auto flex items-center gap-4'>
<div className='absolute top-0 right-5 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                onClick={() => setOpenCharacterDetail(false)}>
                <path d='M16 8L8 16M16 16L8 8' stroke='#fff' stroke-width='1.5' stroke-linecap='round' />
              </svg>
            </div>
            <div className='bg-[#1C1C1C] text-white p-8 h-full w-full'>
              <CharacterDetail id={selectedCharacter?.id || searchParams.get('character_id')} />
            </div>
          </div>
        </Modal>
      ) : (
        openCharacterDetail && (
          <Modal open={openCharacterDetail} setOpen={setOpenCharacterDetail}>
            <div className='fixed bg-[#1C1C1C] text-white top-14 left-0 w-screen h-[calc(100dvh-56px)] flex flex-col'>
              <div className='flex-1 overflow-auto p-4'>
                <div className='flex justify-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    onClick={() => setOpenCharacterDetail(false)}>
                    <path d='M16 8L8 16M16 16L8 8' stroke='#fff' stroke-width='1.5' stroke-linecap='round' />
                  </svg>
                </div>
                <CharacterDetail id={selectedCharacter?.id || searchParams.get('character_id')} />
              </div>
            </div>
          </Modal>
        )
      )}
    </div>
  )
}
