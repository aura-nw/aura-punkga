import HeadComponent from 'components/Head'
import Layout from 'components/Layout'
import Button from 'components/pages/event/literature-infinity/Button'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Mascot4 from 'components/pages/event/literature-infinity/assets/mascot-4.png'
import Image from 'next/image'
import Link from 'next/link'
import { useWindowSize } from 'usehooks-ts'
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
  return (
    <div className={`min-h-screen bg-background-bg-primary ${width >= 1280 ? 'pk-container py-10' : ''}`}>
      <div className='sticky xl:relative top-14 xl:top-0 z-50 bg-background-bg-primary p-4 flex items-center gap-3'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={() => router.back()}>
          <path d='M15 17L10 12L15 7' stroke='#6D6D6D' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <div className='text-[#3d3d3d] text-lg font-medium leading-relaxed'>Round 1 - Submit a character</div>
      </div>
      <div className='p-4'>
        <Button className='w-full xl:max-w-80 xl:mx-auto'>
          <Link href={'/events/literature-infinity/round-1/submit'}>Submit character</Link>
        </Button>
        <div className='text-center xl:max-w-80 xl:mx-auto text-[#5c9efe] text-xs font-medium underline leading-[18px] mt-3'>
          View rules and reward
        </div>
        <div className='mt-8'>
          <div className='text-[#3d3d3d] text-lg font-medium leading-relaxed'>Submission</div>
          <div className='flex flex-col items-center gap-4'>
            <Image src={Mascot4} alt='' className='w-40 h-auto mt-12' />
            <div className='text-center text-[#4f4f4f] text-sm font-normal leading-tight'>
              Be the first to submit a character
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const props = {
    title: 'Literature Infinity Contest| Win 20M VND with Creative Comics',
    description: 'Join the Literature Infinity Contest to celebrate Vietnamese literature and the Year of the Snake!',
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
