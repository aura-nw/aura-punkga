import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Background from 'components/pages/event/ava-2024/assets/onboarding-bg.svg'
import Door from 'components/pages/event/ava-2024/assets/door.svg'
import ActiveMap from 'components/pages/event/ava-2024/assets/active-map.svg'
import Map from 'components/pages/event/ava-2024/assets/Map.svg'
import ActiveSketch from 'components/pages/event/ava-2024/assets/active-sketch.svg'
import Sketch from 'components/pages/event/ava-2024/assets/sketch.svg'
import ActiveLamp from 'components/pages/event/ava-2024/assets/active-lamp.svg'
import Lamp from 'components/pages/event/ava-2024/assets/lamp.svg'
import ArtkeeperNormal from 'components/pages/event/ava-2024/assets/Artkeeper-normal.png'
import ArtkeeperSad from 'components/pages/event/ava-2024/assets/Artkeeper-sad.png'
import ArtkeeperAngry from 'components/pages/event/ava-2024/assets/Artkeeper-angry.png'
import GuideBox from 'components/pages/event/ava-2024/assets/guide-box.svg'
import Image from 'next/image'
import Link from 'next/link'
import useLocalStorage from 'src/hooks/useLocalStorage'
import Button from 'components/Button'
export default function Event() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const router = useRouter()
  const [step, setStep] = useState<number>(-1)
  const [isDone, setIsDone] = useLocalStorage<boolean>('onboarding-done', false)
  const guideContentRef = useRef<any>()
  const timeoutId = useRef<any>()
  useEffect(() => {
    if (step == 0) {
      displayGuide(
        locale == 'en'
          ? `You wake up in a desolate area, the last thing lingering in your mind is touching the lamp in your room. Standing up and looking around, you see a strange structure unfolding before your eyes.`
          : `Bạn tỉnh dậy ở một khu vực trống trải, điều cuối cùng còn tồn tại trong tâm trí là bạn đã chạm vào cây đèn trong phòng mình. Đứng dậy, nhìn quanh, bạn thấy một công trình kỳ lạ đang mở ra ngay trước mắt.`
      )
    }
    if (step == 1) {
      displayGuide(
        locale == 'en'
          ? `Before you can decide whether to enter, you are startled by some "pip pip" sounds, like metal clanging together. Unconsciously, you move toward the warm light ahead.`
          : `Trước khi đưa ra quyết định nên tiến vào đó không, bạn giật mình bởi một vài tiếng “pip pip” như tiếng kim loại va vào nhau. Trong vô thức, bạn bước đến nguồn ánh sáng ấm áp trước mặt.`
      )
    }
    if (step == 2) {
      displayGuide(locale == 'en' ? `A strange voice echoes:` : `Một giọng nói xa lạ vang lên:`)
    }
    if (step == 3) {
      displayGuide(
        locale == 'en'
          ? `Well... another one, huh. Hello, are you okay? Relax, I won’t harm you. I’m the Artkeeper... but just calling me Keeper is fine.`
          : `Chà... lại một người nữa sao. Xin chào, cậu có sao không? Bình tĩnh, tôi không làm hại cậu. Tôi là Artkeeper... mà gọi tôi là Keeper là đủ.`
      )
    }
    if (step == 4) {
      displayGuide(
        locale == 'en'
          ? `You look confused, don't you? This is the future, the year 3440. Artificial Intelligence has learned the wrong behaviors from humans, aiding in humanity’s downfall by taking over media, commerce, and people’s lives.`
          : `Trông hoang mang quá nhỉ? Đây là tương lai năm 3440, Trí tuệ nhân tạo đã học theo những hành vi sai trái của con người và tiếp tay cho quá trình suy thoái của nhân loại, chiếm hữu truyền thông, thương mại và cuộc sống của con người.`
      )
    }
    if (step == 5) {
      displayGuide(
        locale == 'en'
          ? `Now, outside this wall, machines have replaced humans. These machines and dozens of faulty robots are still trying to complete the tasks they were once assigned.`
          : `Giờ đây, bên ngoài bức tường này, thay thế sự hiện diện của con người là các cỗ máy do thám và hàng tá robot lỗi đang tìm cách hoàn thành nhiệm vụ chúng đã từng được giao`
      )
    }
    if (step == 6) {
      displayGuide(
        locale == 'en'
          ? `They are smart and perfect, but they lack what you possess: the creativity of the soul and the ability to listen. That’s why those two invited you here!`
          : `Chúng thông minh và hoàn hảo, nhưng thiếu đi thứ cậu đang sở hữu, khả năng sáng tạo từ tâm hồn và lắng nghe mọi thứ. Đó chính là lý do tại sao hai tên kia lại mời cậu đến đây!`
      )
    }
    if (step == 7) {
      displayGuide(
        locale == 'en'
          ? `Who are they, you ask? Punka and a brown-clad rabbit! Damn, did I make a mistake letting them out...? Sigh, anyway, you’re here now, so you must be able to help this world. Create genuine works of art to save it, let's go!`
          : `Hai tên nào á… Punka và một con thỏ mặc áo nâu! Trời ạ, tôi có sai lầm khi thả họ ra không nhỉ… Haizz, dù sao thì cậu đã ở đây rồi, hẳn cậu sẽ giúp được thế giới này. Hãy sáng tạo nên những tác phẩm nghệ thuật chân chính để cứu lấy thế giới, đi thôi nào!`
      )
    }
    if (step == 8) {
      setIsDone(true)
    }
  }, [step])
  useEffect(() => {
    if (!isDone) setStep(0)
  }, [isDone])
  const displayGuide = (text: string) => {
    let i = 0
    if (!guideContentRef.current) return null
    guideContentRef.current.innerHTML = ''
    if (timeoutId.current) clearTimeout(timeoutId.current)
    function typeWriter() {
      if (guideContentRef.current) {
        if (i < text.length) {
          guideContentRef.current.innerHTML += text.charAt(i)
          i++
          timeoutId.current = setTimeout(typeWriter, 20)
        }
      } else {
        timeoutId.current = setTimeout(typeWriter, 200)
      }
    }
    typeWriter()
  }
  return (
    <div className='bg-no-repeat h-screen w-full -mt-20 relative' style={{ backgroundImage: `url(${Background.src})` }}>
      <div
        className='absolute inset-x-[19%] bottom-0 translate-y-[15%] w-[62%] aspect-[1227/966] bg-no-repeat bg-contain'
        style={{ backgroundImage: `url(${Door.src})` }}>
        <Button
          onClick={() => {
            router.push('/events/ava-2024/map')
          }}
          className='[&:hover_.active]:visible [&:hover_:not(.active)]:invisible cursor-pointer absolute top-[4%] left-[15%] w-[39%] z-10'>
          <>
            <Image priority src={Map} alt='' className='w-full h-auto' />
            <Image src={ActiveMap} alt='' className='active w-full h-auto invisible absolute inset-0' />
          </>
        </Button>
        <div className='[&:hover_.active]:visible [&:hover_:not(.active)]:invisible cursor-pointer absolute top-[35%] right-[15%] w-[26%] z-10'>
          <Image priority src={Sketch} alt='' className='w-full h-auto' />
          <Image src={ActiveSketch} alt='' className='active absolute inset-0 w-full h-auto invisible' />
        </div>
        <div className='[&:hover_.active]:visible [&:hover_:not(.active)]:invisible cursor-pointer absolute bottom-[44%] left-[33%] w-[12%] z-10'>
          <Image priority src={Lamp} alt='' className=' w-full h-auto' />
          <Image src={ActiveLamp} alt='' className='active absolute inset-0 w-full h-auto invisible' />
        </div>
        {!isDone && (
          <div className='bottom-[14%] left-[2%] absolute flex items-end w-[90%] gap-5'>
            <Image
              priority
              src={[3, 4].includes(step) ? ArtkeeperNormal : [5, 6].includes(step) ? ArtkeeperSad : ArtkeeperAngry}
              alt=''
              className={`w-[30%] ${[0, 1, 2].includes(step) ? 'invisible' : ''}`}
            />
            <div className='relative flex-1 my-[5%] w-fit flex flex-col gap-2 items-end'>
              <svg
                width='109'
                height='38'
                viewBox='0 0 109 38'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='cursor-pointer opacity-80 hover:opacity-100'
                onClick={() => setStep(8)}>
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
              <div className='relative cursor-pointer' onClick={() => setStep(step + 1)}>
                <Image priority src={GuideBox} alt='' className='min-h-[140px]' />
                <div className='absolute left-[3%] top-[10%] bottom-[20%] w-[94%]'>
                  <div className='h-full bg-[#111] rounded-md text-white p-5'>
                    <div ref={guideContentRef} className='h-full overflow-auto'></div>
                  </div>
                </div>
                <div className='text-text-brand-hover flex items-center gap-2 text-sm cursor-pointer justify-end w-full mt-2 absolute bottom-[5%] right-[2%]'>
                  Next
                  <svg
                    width='37'
                    height='23'
                    viewBox='0 0 37 23'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-auto'>
                    <path d='M37 11.5009L21.0085 20.7336L21.0085 2.26815L37 11.5009Z' fill='#00E160' />
                    <path d='M21.3223 11.5009L5.33074 20.7336L5.33074 2.26815L21.3223 11.5009Z' fill='#00E160' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
