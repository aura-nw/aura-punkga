import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Background from 'components/pages/event/artistic-voice-2024/assets/onboarding-bg.svg'
import Door from 'components/pages/event/artistic-voice-2024/assets/door.svg'
import ActiveMap from 'components/pages/event/artistic-voice-2024/assets/active-map.svg'
import Map from 'components/pages/event/artistic-voice-2024/assets/map.svg'
import ActiveSketch from 'components/pages/event/artistic-voice-2024/assets/active-sketch.svg'
import Sketch from 'components/pages/event/artistic-voice-2024/assets/sketch.svg'
import ActiveLamp from 'components/pages/event/artistic-voice-2024/assets/active-lamp.svg'
import Lamp from 'components/pages/event/artistic-voice-2024/assets/lamp.svg'
import Artkeeper from 'components/pages/event/artistic-voice-2024/assets/Artkeeper.svg'
import GuideBox from 'components/pages/event/artistic-voice-2024/assets/guide-box.svg'
import Image from 'next/image'
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
      if (i < text.length) {
        guideContentRef.current.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 20)
      }
    }
    typeWriter()
  }
  return (
    <div
      className='bg-no-repeat h-screen w-full -mt-20 -mb-14 relative'
      style={{ backgroundImage: `url(${Background.src})` }}>
      <div
        className='absolute inset-x-[19%] bottom-0 translate-y-[15%] w-[62%] aspect-[1227/966] bg-no-repeat bg-contain'
        style={{ backgroundImage: `url(${Door.src})` }}>
        <div className='[&:hover_.active]:visible [&:hover_:not(.active)]:invisible cursor-pointer absolute top-[4%] left-[15%] w-[39%] z-10'>
          <Image src={Map} alt='' className='w-full h-auto' />
          <Image src={ActiveMap} alt='' className='active w-full h-auto invisible absolute inset-0' />
        </div>
        <div className='[&:hover_.active]:visible [&:hover_:not(.active)]:invisible cursor-pointer absolute top-[35%] right-[15%] w-[26%] z-10'>
          <Image src={Sketch} alt='' className='w-full h-auto' />
          <Image src={ActiveSketch} alt='' className='active absolute inset-0 w-full h-auto invisible' />
        </div>
        <div className='[&:hover_.active]:visible [&:hover_:not(.active)]:invisible cursor-pointer absolute bottom-[44%] left-[33%] w-[12%] z-10'>
          <Image src={Lamp} alt='' className=' w-full h-auto' />
          <Image src={ActiveLamp} alt='' className='active absolute inset-0 w-full h-auto invisible' />
        </div>
        <div className='bottom-[14%] left-[2%] absolute flex items-end w-[90%] gap-5'>
          <Image src={Artkeeper} alt='' className='' />
          <div className='relative flex-1 my-[5%] w-fit'>
            <Image src={GuideBox} alt='' className='' />
            <div className='absolute left-[3%] top-[10%] bottom-[20%] w-[94%]'>
              <div
                className='h-full max-h-[90%] overflow-auto bg-[#111] rounded-md text-white p-5'
                ref={guideContentRef}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
