import HeadComponent from 'components/Head'
import Layout from 'components/Layout'
import Button from 'components/pages/event/literature-infinity/Button'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Mascot4 from 'components/pages/event/literature-infinity/assets/mascot-4.png'
import Image from 'next/image'
import Link from 'next/link'
import { useWindowSize } from 'usehooks-ts'
import useSWR from 'swr'
import { contentService } from 'src/services/contentService'
import { useContext, useEffect, useState } from 'react'
import { Context } from 'src/context'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import Modal from 'components/pages/characters/Modal'
import CharacterDetail from 'components/pages/characters/CharacterDetail'
import Rule from 'components/pages/event/literature-infinity/Rule'
export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <PageContent />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

const PageContent = () => {
  const router = useRouter()
  const { width } = useWindowSize()
  const { account } = useContext(Context)
  const [characterList, setCharacterList] = useState([])
  const [offset, setOffset] = useState(0)
  const [remaining, setRemaining] = useState(true)
  useEffect(() => {
    fetchCharacter()
  }, [])
  const fetchCharacter = async () => {
    try {
      const data = await contentService.character.getCharacters({
        userId: account?.id,
        offset,
        contestId: '6',
      })
      if (data.data.story_character.length) {
        setCharacterList([...characterList, ...data.data.story_character])
        setOffset(offset + 20)
        setRemaining(true)
      } else {
        setRemaining(false)
      }
    } catch (error) {
      toast(error.message, {
        type: 'error',
      })
    }
  }

  return (
    <div className={`min-h-screen bg-background-bg-primary ${width >= 1280 ? 'pk-container py-10' : ''}`}>
      <div className='sticky xl:relative top-14 xl:top-0 z-50 bg-background-bg-primary p-4 flex items-center gap-3'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={() => router.push('/events/literature-infinity')}>
          <path d='M15 17L10 12L15 7' stroke='#6D6D6D' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <div className='text-[#3d3d3d] text-lg font-medium leading-relaxed'>Round 1 - Submit a character</div>
      </div>
      <div className='p-4'>
        <Button className='w-full xl:max-w-80 xl:mx-auto'>
          <Link href={'/events/literature-infinity/round-1/submit'}>Submit character</Link>
        </Button>
        <Rule>
          <div className='text-center xl:max-w-80 xl:mx-auto text-[#5c9efe] text-xs font-medium underline leading-[18px] mt-3'>
            View rules and reward
          </div>
        </Rule>
        <div className='mt-8'>
          <div className='text-[#3d3d3d] text-lg font-medium leading-relaxed'>Submission</div>
          {characterList.length ? (
            <>
              <InfiniteScroll
                dataLength={characterList.length}
                next={fetchCharacter}
                hasMore={remaining}
                loader={<h4>Loading...</h4>}
                className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-5'>
                {characterList.map((character, index) => (
                  <Character key={index} data={character} />
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <div className='flex flex-col items-center gap-4'>
              <Image src={Mascot4} alt='' className='w-40 h-auto mt-12' />
              <div className='text-center text-[#4f4f4f] text-sm font-normal leading-tight'>
                Be the first to submit a character
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
const Character = ({ data }) => {
  const [open, setOpen] = useState(false)
  const { width } = useWindowSize()
  return (
    <>
      <div className='w-full aspect-square rounded-md overflow-hidden' onClick={() => setOpen(true)}>
        <Image src={data.avatar_url} width={400} height={400} alt='' className='w-full h-full object-cover' />
      </div>
      {width >= 768 ? (
        <Modal open={open} setOpen={setOpen}>
          <div className='w-screen max-w-screen-2xl relative mx-auto flex items-center gap-4'>
            <div className='absolute top-3 right-3 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                onClick={() => setOpen(false)}>
                <path d='M16 8L8 16M16 16L8 8' stroke='#fff' stroke-width='1.5' stroke-linecap='round' />
              </svg>
            </div>
            <div className='bg-[#1C1C1C] text-white p-8 h-full w-full'>
              <CharacterDetail id={data.id} />
            </div>
          </div>
        </Modal>
      ) : (
        open && (
          <Modal open={open} setOpen={setOpen}>
            <div className='fixed bg-[#1C1C1C] text-white top-14 left-0 w-screen h-[calc(100dvh-56px)] flex flex-col'>
              <div className='flex-1 overflow-auto p-4'>
                <div className='flex justify-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    onClick={() => setOpen(false)}>
                    <path d='M16 8L8 16M16 16L8 8' stroke='#fff' stroke-width='1.5' stroke-linecap='round' />
                  </svg>
                </div>
                <CharacterDetail id={data.id} />
              </div>
            </div>
          </Modal>
        )
      )}
    </>
  )
}
export const getServerSideProps = async (context) => {
  const props = {
    title: 'Literature Infinity Contest| Win 20M VND with Creative Comics',
    description: 'Join the Literature Infinity Contest to celebrate Vietnamese literature and the Year of the Snake!',
    image: '/assets/images/literature-infinity-thumb.png',
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
