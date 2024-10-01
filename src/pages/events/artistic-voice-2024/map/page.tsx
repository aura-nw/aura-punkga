import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Background from 'components/pages/event/artistic-voice-2024/assets/Main-Map.svg'
import Room1 from 'components/pages/event/artistic-voice-2024/assets/room1.svg'
import Room2 from 'components/pages/event/artistic-voice-2024/assets/room2.svg'
import Room3 from 'components/pages/event/artistic-voice-2024/assets/room3.svg'
import Room4 from 'components/pages/event/artistic-voice-2024/assets/room4.svg'
import Room5 from 'components/pages/event/artistic-voice-2024/assets/room5.svg'
import Lamp from 'components/pages/event/artistic-voice-2024/assets/lamp.svg'
import Artkeeper from 'components/pages/event/artistic-voice-2024/assets/Artkeeper.svg'
import GuideBox from 'components/pages/event/artistic-voice-2024/assets/guide-box.svg'
import Phai from 'components/pages/event/artistic-voice-2024/assets/phai.svg'
import Trai from 'components/pages/event/artistic-voice-2024/assets/trai.svg'
import Map from 'components/pages/event/artistic-voice-2024/assets/map-0.svg'
import Image from 'next/image'
import Link from 'next/link'
export default function Event() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [seeMore, setSeeMore] = useState(false)
  const guideContentRef = useRef<any>()
  useEffect(() => {
    displayGuide(
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    )
  }, [])
  const displayGuide = (text: string) => {
    let i = 0
    function typeWriter() {
      if (guideContentRef.current) {
        if (i < text.length) {
          guideContentRef.current.innerHTML += text.charAt(i)
          i++
          setTimeout(typeWriter, 20)
        }
      } else {
        setTimeout(typeWriter, 200)
      }
    }
    typeWriter()
  }
  return (
    <div className='bg-no-repeat h-screen w-full -mt-20 relative' style={{ backgroundImage: `url(${Background.src})` }}>
      <Image src={Trai} alt='' className='absolute bottom-0 left-0' />
      <Image src={Phai} alt='' className='absolute bottom-0 right-0' />
      <div
        className='absolute inset-x-[19%] bottom-[3%] translate-y-[15%] w-[60%] aspect-[1227/966] bg-no-repeat bg-contain'
        style={{ backgroundImage: `url(${Map.src})` }}>
        <Image src={Room1} alt='' className='absolute -top-[0.2%] left-[1.3%] w-[20.3%] opacity-0 hover:opacity-100' />
        <Image src={Room2} alt='' className='absolute top-[.7%] left-[34.6%] w-[33.75%] opacity-0 hover:opacity-100' />
        <Image src={Room3} alt='' className='absolute top-[.77%] -right-[.2%] w-[30.45%] opacity-0 hover:opacity-100' />
        <Image src={Room4} alt='' className='absolute bottom-[14.3%] right-[32.25%] w-[38.9%] opacity-0 hover:opacity-100' />
        <Image src={Room5} alt='' className='absolute bottom-[46%] -left-[.2%] w-[29.7%] opacity-0 hover:opacity-100' />
        <div className='bottom-[10%] left-[2%] absolute flex items-end w-[90%] gap-5'>
          <Image src={Artkeeper} alt='' className='w-[30%] h-auto' />
          <div className='relative flex-1 my-[5%] w-fit flex flex-col gap-2 items-end'>
            <svg
              width='109'
              height='38'
              viewBox='0 0 109 38'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='cursor-pointer opacity-80 hover:opacity-100'>
              <path
                d='M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H103C106.038 0.5 108.5 2.96243 108.5 6V32C108.5 35.0376 106.038 37.5 103 37.5H6C2.96243 37.5 0.5 35.0376 0.5 32V6Z'
                fill='#0E0E0F'
              />
              <path
                d='M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H103C106.038 0.5 108.5 2.96243 108.5 6V32C108.5 35.0376 106.038 37.5 103 37.5H6C2.96243 37.5 0.5 35.0376 0.5 32V6Z'
                stroke='white'
              />
              <path
                d='M39.6172 15.7812H37.2734V18.125H44.3047V27.5H32.5859V22.8125H37.2734V23.9844H39.6172V21.6406H32.5859V12.2656H44.3047V16.9531H39.6172V15.7812ZM52.5078 12.2656H57.1953V20.4688L54.8516 22.8125L57.1953 25.1562V27.5H52.5078V26.3281L50.1641 23.9844V27.5H45.4766V12.2656H50.1641V19.2969L52.5078 21.6406V12.2656ZM63.0547 12.2656V27.5H58.3672V12.2656H63.0547ZM68.9141 15.7812V18.125L71.2578 20.4688V15.7812H68.9141ZM71.2578 25.1562L68.9141 22.8125V27.5H64.2266V12.2656H75.9453V20.4688L71.2578 25.1562Z'
                fill='white'
              />
            </svg>
            <div className='relative w-full h-auto min-h-[140px]'>
              <Image src={GuideBox} alt='' className='relative w-full h-auto min-h-[140px] object-cover' />
              <div className='absolute left-[3%] top-[10%] bottom-[20%] w-[94%]'>
                <div className='h-full bg-[#111] rounded-md text-white p-5'>
                  <div ref={guideContentRef} className='h-[60%] overflow-auto'></div>
                  <div className='text-text-brand-hover flex items-center gap-2 cursor-pointer justify-end w-full mt-2'>
                    Next
                    <svg width='37' height='23' viewBox='0 0 37 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M37 11.5009L21.0085 20.7336L21.0085 2.26815L37 11.5009Z' fill='#00E160' />
                      <path d='M21.3223 11.5009L5.33074 20.7336L5.33074 2.26815L21.3223 11.5009Z' fill='#00E160' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
