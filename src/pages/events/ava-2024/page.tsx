import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Background from 'components/pages/event/ava-2024/assets/onboarding-bg.png'
import Door from 'components/pages/event/ava-2024/assets/door.svg'
import Ban from 'components/pages/event/ava-2024/assets/table.png'
import Ghe from 'components/pages/event/ava-2024/assets/chair.png'
import ActiveMap from 'components/pages/event/ava-2024/assets/active-map.png'
import Map from 'components/pages/event/ava-2024/assets/Map.svg'
import ActiveSketch from 'components/pages/event/ava-2024/assets/active-sketch.png'
import Sketch from 'components/pages/event/ava-2024/assets/sketch.svg'
import ActiveLamp from 'components/pages/event/ava-2024/assets/active-lamp.png'
import Lamp from 'components/pages/event/ava-2024/assets/lamp.svg'
import ArtkeeperNormal from 'components/pages/event/ava-2024/assets/Artkeeper-normal.png'
import ArtkeeperSad from 'components/pages/event/ava-2024/assets/Artkeeper-sad.png'
import ArtkeeperAngry from 'components/pages/event/ava-2024/assets/Artkeeper-angry.png'
import GuideBox from 'components/pages/event/ava-2024/assets/guide-box.png'
import Image from 'next/image'
import Logo from 'components/pages/event/ava-2024/assets/logo.svg'
import Button from 'components/Button'
import { useLocalStorage } from 'usehooks-ts'
export default function Event() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const router = useRouter()
  const [step, setStep] = useState<number>(-1)
  const [isDone, setIsDone, remove] = useLocalStorage<boolean>('onboarding-done', false)
  const timeoutId = useRef<any>()
  const guideContentRef = useRef<any>()
  const contentRef = useRef<any>()
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
    console.log(isDone)
    if (!isDone) setStep(0)
  }, [isDone])
  const displayGuide = (text: string) => {
    if (!guideContentRef.current) return null
    guideContentRef.current.innerHTML = ''
    let i = 0
    if (timeoutId.current) clearTimeout(timeoutId.current)
    function typeWriter() {
      if (guideContentRef.current) {
        if (i < text.length) {
          guideContentRef.current.innerHTML += text.charAt(i)
          i++
          timeoutId.current = setTimeout(typeWriter, 20)
          contentRef.current = text
        } else {
          contentRef.current = ''
          timeoutId.current = undefined
        }
      } else {
        timeoutId.current = setTimeout(typeWriter, 200)
      }
    }
    typeWriter()
  }
  const handler = () => {
    if (contentRef.current) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
      guideContentRef.current.innerHTML = contentRef.current
      contentRef.current = ''
      timeoutId.current = undefined
    } else {
      if (step >= 0 && step <= 7) {
        setStep(step + 1)
      } else {
        setStep(0)
      }
    }
  }

  return (
    <div
      className='bg-no-repeat h-screen w-full -mt-20 relative bg-cover'
      style={{ backgroundImage: `url(${Background.src})` }}>
      <div className='lg:hidden h-full w-full relative'>
        <Image priority src={Logo} alt='' className='absolute top-[100px] right-4 w-[150px]' />
        <Button
          onClick={() => {
            router.push('/events/ava-2024/map')
          }}
          className='[&:hover>.active]:visible [&:hover>:not(.active)]:invisible cursor-pointer absolute top-[100px] left-4 w-[200px] z-10'>
          <>
            <Image priority src={Map} alt='' className='w-full h-auto' />
            <Image src={ActiveMap} alt='' className='active w-full h-auto invisible absolute inset-0' />
            <div className='font-jaro absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md active invisible text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
              <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
              </svg>
              {t('Go to map')}
            </div>
          </>
        </Button>
        <div className='[&:hover>.active]:visible [&:hover>:not(.active)]:invisible cursor-pointer absolute top-[260px] right-[16px] w-[240px] z-10'>
          <Image priority src={Sketch} alt='' className='w-full h-auto' />
          <Image src={ActiveSketch} alt='' className='active absolute inset-0 w-full h-auto invisible' />
          <div className='font-jaro absolute whitespace-nowrap top-1/2 left-[38%] -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md active invisible text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
            <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
              <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
            </svg>
            {t('Coming soon')}
          </div>
        </div>
        <Image priority src={Ban} alt='' className='absolute bottom-[0px] left-[0px] w-[180px]' />
        <Image priority src={Ghe} alt='' className='absolute bottom-[0px] right-[0px] w-[310px]' />
        <div className='[&:hover>.active]:visible [&:hover>:not(.active)]:invisible cursor-pointer absolute bottom-[310px] right-[30px] w-[100px] z-10'>
          <Image priority src={Lamp} alt='' className=' w-full h-auto' />
          <Image src={ActiveLamp} alt='' className='active absolute inset-0 w-full h-auto invisible' />
          <div className='font-jaro absolute whitespace-nowrap top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md active invisible text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
            <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
              <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
            </svg>
            {t('Coming soon')}
          </div>
        </div>
      </div>
      <div
        className='hidden lg:block absolute inset-x-[19%] bottom-0 translate-y-[15%] w-[62%] aspect-[1227/966] bg-no-repeat bg-contain'
        style={{ backgroundImage: `url(${Door.src})` }}>
        <Image priority src={Logo} alt='' className='absolute top-[10%] right-[22%] w-[18%]' />
        <Button
          onClick={() => {
            router.push('/events/ava-2024/map')
          }}
          className='[&:hover>.active]:visible [&:hover>:not(.active)]:invisible cursor-pointer absolute top-[4%] left-[15%] w-[39%] z-10'>
          <>
            <Image priority src={Map} alt='' className='w-full h-auto' />
            <Image src={ActiveMap} alt='' className='active w-full h-auto invisible absolute inset-0' />
            <div className='font-jaro absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md active invisible text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
              <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
              </svg>
              {t('Go to map')}
            </div>
          </>
        </Button>
        <div className='[&:hover>.active]:visible [&:hover>:not(.active)]:invisible cursor-pointer absolute top-[35%] right-[15%] w-[26%] z-10'>
          <Image priority src={Sketch} alt='' className='w-full h-auto' />
          <Image src={ActiveSketch} alt='' className='active absolute inset-0 w-full h-auto invisible' />
          <div className='font-jaro absolute whitespace-nowrap top-1/2 left-[38%] -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md active invisible text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='22' viewBox='0 0 20 22' fill='none'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M3.25 9.33501V7.15663C3.25 3.20413 6.27208 0 10 0C13.7279 0 16.75 3.20413 16.75 7.15663V9.33501C17.8648 9.42328 18.5907 9.64612 19.1213 10.2087C20 11.1403 20 12.6397 20 15.6386C20 18.6374 20 20.1368 19.1213 21.0684C18.2426 22 16.8284 22 14 22H6C3.17157 22 1.75736 22 0.87868 21.0684C0 20.1368 0 18.6374 0 15.6386C0 12.6397 0 11.1403 0.87868 10.2087C1.40931 9.64612 2.13525 9.42328 3.25 9.33501ZM4.75 7.15663C4.75 4.08246 7.10051 1.59036 10 1.59036C12.8995 1.59036 15.25 4.08246 15.25 7.15663V9.2809C14.867 9.27711 14.4515 9.27711 14 9.27711H6C5.54849 9.27711 5.13301 9.27711 4.75 9.2809V7.15663ZM12 15.6386C12 16.8097 11.1046 17.759 10 17.759C8.89543 17.759 8 16.8097 8 15.6386C8 14.4674 8.89543 13.5181 10 13.5181C11.1046 13.5181 12 14.4674 12 15.6386Z'
                fill='white'
              />
            </svg>
            {t('Coming soon')}
          </div>
        </div>
        <div className='[&:hover>.active]:visible [&:hover>:not(.active)]:invisible cursor-pointer absolute bottom-[44%] left-[33%] w-[12%] z-10'>
          <Image priority src={Lamp} alt='' className=' w-full h-auto' />
          <Image src={ActiveLamp} alt='' className='active absolute inset-0 w-full h-auto invisible' />
          <div className='font-jaro absolute whitespace-nowrap top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md active invisible text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='22' viewBox='0 0 20 22' fill='none'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M3.25 9.33501V7.15663C3.25 3.20413 6.27208 0 10 0C13.7279 0 16.75 3.20413 16.75 7.15663V9.33501C17.8648 9.42328 18.5907 9.64612 19.1213 10.2087C20 11.1403 20 12.6397 20 15.6386C20 18.6374 20 20.1368 19.1213 21.0684C18.2426 22 16.8284 22 14 22H6C3.17157 22 1.75736 22 0.87868 21.0684C0 20.1368 0 18.6374 0 15.6386C0 12.6397 0 11.1403 0.87868 10.2087C1.40931 9.64612 2.13525 9.42328 3.25 9.33501ZM4.75 7.15663C4.75 4.08246 7.10051 1.59036 10 1.59036C12.8995 1.59036 15.25 4.08246 15.25 7.15663V9.2809C14.867 9.27711 14.4515 9.27711 14 9.27711H6C5.54849 9.27711 5.13301 9.27711 4.75 9.2809V7.15663ZM12 15.6386C12 16.8097 11.1046 17.759 10 17.759C8.89543 17.759 8 16.8097 8 15.6386C8 14.4674 8.89543 13.5181 10 13.5181C11.1046 13.5181 12 14.4674 12 15.6386Z'
                fill='white'
              />
            </svg>
            {t('Coming soon')}
          </div>
        </div>
      </div>
      <Image
        priority
        src={[5, 6].includes(step) ? ArtkeeperSad : [7].includes(step) ? ArtkeeperAngry : ArtkeeperNormal}
        alt=''
        className={`w-[30%] absolute bottom-[300px] lg:-bottom-3 max-w-[150px] lg:max-w-[234px] lg:left-[18%] cursor-pointer`}
        onClick={() => (step == 8 ? setStep(0) : handler())}
      />
      {step >= 0 && step <= 7 && (
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 flex-1 lg:w-[50%] lg:translate-x-0 lg:left-[calc(18%+280px)] my-[32px] w-[90%] flex flex-col gap-2 items-end'>
          <div
            className='cursor-pointer opacity-80 hover:opacity-100 text-white font-jaro border border-white py-1 px-5 text-2xl uppercase rounded-md bg-black'
            onClick={() => setStep(8)}>
            {t('Skip')}
          </div>
          <div
            className='relative w-full h-auto min-h-[160px] cursor-pointer bg-no-repeat'
            onClick={handler}
            style={{ backgroundImage: `url(${GuideBox.src})`, backgroundSize: '100% 100%' }}>
            <div className='absolute left-[3%] top-[10%] bottom-[20%] w-[94%]'>
              <div className='h-full bg-[#111] rounded-md text-white p-5'>
                <div ref={guideContentRef} className='h-full overflow-auto'></div>
              </div>
            </div>
            <div className='text-text-brand-hover flex items-center gap-2 text-sm cursor-pointer justify-end w-full mt-2 absolute bottom-[5%] right-[2%]'>
              {t('Next')}
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
      )}
    </div>
  )
}
