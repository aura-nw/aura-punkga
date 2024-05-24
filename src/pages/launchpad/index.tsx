import { useRouter } from 'next/router'
import Layout from './components/layout'
import useSWR from 'swr'
import { getAllLaunchPad } from 'src/services'
import Image from 'next/image'
import Link from 'next/link'
export default function LaunchPad(props) {
  const { data } = useSWR('get_all_launchpad', () => getAllLaunchPad())
  if (props.justHead) return <></>
  return (
    <>
      <div className='text-[#23FF81] text-5xl uppercase'>All launchpad</div>
      <div className='grid grid-cols-3 gap-4 overflow-y-auto overflow-x-hidden'>
        {data?.launchpad?.map((item, index) => {
          return (
            <Link
              key={index}
              href={`/launchpad/${item.id}`}
              className='w-[274px] h-[326px] bg-[#0E131F] border-2 border-[#2F639F] p-[17px] rounded-lg cursor-pointer'>
              <div className='relative'>
                <Image
                  src={item.thumbnail_url}
                  alt=''
                  className='w-[240px] object-cover h-[180px]'
                  width={240}
                  height={180}
                />
                <div className='border-2 border-[#2F639F] rounded overflow-hidden shadow-[4px_-4px_0px_0px_#FFF_inset] w-[240px] absolute inset-0 h-[180px]'></div>
              </div>
              <div className='text-[32px] text-primary-color leading-[14px] mt-3'>{item.name}</div>
              <div className='text-[24px] leading-[22px] mt-1'>
                By: <span className='text-primary-color'>{item.creator || ''}</span>
              </div>
              <div className='mt-3 flex justify-between text-[24px] leading-[22px]'>
                <div>Item</div>
                <div className='text-[#00FFFF]'>{item.max_supply}</div>
              </div>
              <div className='mt-1 flex justify-between text-[24px] leading-[22px]'>
                <div>Price</div>
                <div className='text-[#00FFFF]'>{item.mint_price} USDT</div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
LaunchPad.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
