import { useRouter } from 'next/router'
import Layout from './components/layout'
export default function LaunchPad(props) {
  if (props.justHead) return <></>
  return (
    <>
      <div className='text-[#23FF81] text-5xl uppercase'>All launchpad</div>
      <div className='grid grid-cols-3 gap-4 overflow-y-auto overflow-x-hidden'>
        <div className='w-[274px] h-[326px] bg-[#cecece]'></div>
        <div className='w-[274px] h-[326px] bg-[#cecece]'></div>
        <div className='w-[274px] h-[326px] bg-[#cecece]'></div>
        <div className='w-[274px] h-[326px] bg-[#cecece]'></div>
        <div className='w-[274px] h-[326px] bg-[#cecece]'></div>
        <div className='w-[274px] h-[326px] bg-[#cecece]'></div>
        <div className='w-[274px] h-[326px] bg-[#cecece]'></div>
      </div>
    </>
  )
}
LaunchPad.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
