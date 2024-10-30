import Button from 'components/Button'
import ArtkeeperAngry from 'components/pages/event/ava-2024/assets/Artkeeper-angry.png'
import ArtkeeperClover from 'components/pages/event/ava-2024/assets/Artkeeper-clover.png'
import ArtkeeperNormal from 'components/pages/event/ava-2024/assets/Artkeeper-normal.png'
import ArtkeeperSad from 'components/pages/event/ava-2024/assets/Artkeeper-sad.png'
import ArtkeeperSmile from 'components/pages/event/ava-2024/assets/Artkeeper-smile.png'
import GuideBox from 'components/pages/event/ava-2024/assets/guide-box.png'
import Background from 'components/pages/event/ava-2024/assets/Main_Map.png'
import Map from 'components/pages/event/ava-2024/assets/map-0.svg'
import Artkeeper from 'components/pages/event/ava-2024/assets/mascot-head.svg'
import MobileMap from 'components/pages/event/ava-2024/assets/mobile-map.png'
import Phai from 'components/pages/event/ava-2024/assets/phai.png'
import Room1 from 'components/pages/event/ava-2024/assets/room1.png'
import Room2 from 'components/pages/event/ava-2024/assets/room2.png'
import Room3 from 'components/pages/event/ava-2024/assets/room3.png'
import Room4 from 'components/pages/event/ava-2024/assets/room4.png'
import Room5 from 'components/pages/event/ava-2024/assets/room5.png'
import Trai from 'components/pages/event/ava-2024/assets/trai.png'
import Award from 'components/pages/event/ava-2024/Award'
import { BackgroundAudioController } from 'components/pages/event/ava-2024/BackgroundAudio'
import Modal from 'components/pages/event/ava-2024/Modal'
import Rules from 'components/pages/event/ava-2024/Rules'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'usehooks-ts'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Event {...props} />
}
function Event() {
  const { locale, push } = useRouter()
  const { t } = useTranslation()
  const router = useRouter()
  const [seeMore, setSeeMore] = useState(true)
  const [openRules, setOpenRules] = useState(false)
  const [openAward, setOpenAward] = useState(false)
  const currentSetStep = useRef<any>()
  const timeoutId = useRef<any>()
  const [active, setActive] = useState(0)
  const [characterRoomStep, setCharacterRoomStep] = useState<number>(-1)
  const [characterDone, setCharacterDone, removeCharacterDone] = useLocalStorage<boolean>('character-done', false)
  const [mangaDone, setMangaDone, removeMangaDone] = useLocalStorage<boolean>('manga-done', false)
  const [mangaRoomStep, setMangaRoomStep] = useState<number>(-1)
  const [artRoomStep, setArtRoomStep] = useState<number>(-1)
  const [artDone, setArtDone, removeArtDone] = useLocalStorage<boolean>('art-done', false)
  const [campainRoomStep, setCampainRoomStep] = useState<number>(-1)
  const [campainDone, setCampainDone, removeCampainDone] = useLocalStorage<boolean>('campain-done', false)
  const [artkeeper, setArtkeeper] = useState('')
  const [showGuide, setShowGuide] = useState(false)
  const guideContentRef = useRef<any>()
  const contentRef = useRef<any>()
  useEffect(() => {
    if (characterRoomStep == 0) {
      displayGuide(
        locale == 'en'
          ? `You enter the identification area, where Keeper opens a profile containing information and a fragment of the characters’ ideas.`
          : `Bạn bước vào khu vực định danh, Keeper mở một hồ sơ các nhân vật, chứa thông tin và một mảnh ý tưởng của họ.`
      )
      setArtkeeper('')
    }
    if (characterRoomStep == 1) {
      displayGuide(
        locale == 'en'
          ? `Identification and confirmation are essential steps in the plan. A fragment of your idea will become Story Clover—here it is! Though incomplete, you can finish it by combining fragments from others.`
          : `Định danh và xác nhận là bước thiết yếu của kế hoạch, một mảnh ý tưởng của cậu sẽ trở thành Story Clover-nó đây! Dù chưa hoàn chỉnh nhưng cậu có thể hoàn thiện Story Clover bằng cách kết hợp các mảnh của người khác`
      )
      setArtkeeper('clover')
    }
    if (characterRoomStep == 2) {
      displayGuide(
        locale == 'en'
          ? `By merging fragments into a full Story Clover, a completed one will emerge. The machine storing the Story Clover will launch into orbit, enlightening the AI machines and saving them from going mad.`
          : `Kết hợp các mảnh Story Clover thành một câu chuyện thì một  Story Clover hoàn thiện sẽ xuất hiện. Cỗ máy lưu trữ Story Clover khi đầy sẽ phóng lên quỹ đạo để soi sáng cho các cỗ máy AI, cứu chúng khỏi việc phát điên.`
      )
      setArtkeeper('clover')
    }
    if (characterRoomStep == 3) {
      displayGuide(
        locale == 'en'
          ? `Use these 3 Story Clover fragments to select characters. You can make them appear in your story—even just briefly, as long as you remember them. Now, let's get creative!`
          : `Dùng 3 mảnh Story Clover này để chọn các nhân vật, có thể cho họ xuất hiện trong câu chuyện câu chuyện của cậu. Ừ! Có thể cho họ thoáng qua đâu đó thôi cũng được, miễn rằng cậu nhớ đến họ. Sáng tạo nào!`
      )
      setArtkeeper('normal')
    }
    if (characterRoomStep == 4) {
      setShowGuide(false)
      setCharacterDone(true)
      router.push(`/events/ava-2024/map/character`)
    }
  }, [characterRoomStep])
  useEffect(() => {
    if (mangaRoomStep == 0) {
      displayGuide(
        locale == 'en'
          ? `You enter an area filled with comic books and graphic novels.`
          : `Bạn tiến vào một khu vực với hàng loạt truyện tranh và sách truyện.`
      )
      setArtkeeper('')
    }
    if (mangaRoomStep == 1) {
      displayGuide(
        locale == 'en'
          ? `Humans are strange, they can talk and watch, but understanding—that’s another matter. I’m fascinated by stories; they contain spirit, emotion, and characters. No matter how many times I’ve read them, the feeling is always the same.`
          : `Loài người kỳ lạ, họ có thể nói có thể xem, nhưng để hiểu thì chưa chắc. Tôi tò mò với những câu chuyện, chúng chứa đựng những thứ tinh thần, cảm xúc, nhân vật, dù đã đọc đi đọc lại rất nhiều lần nhưng cảm xúc vẫn như lúc đầu.`
      )
      setArtkeeper('sad')
    }
    if (mangaRoomStep == 2) {
      displayGuide(
        locale == 'en'
          ? `Long ago, AI was also used to create stories, but those words had no soul, and readers couldn’t fully grasp them. The world needs depth, and thus, it needs stories.`
          : `Ở thời điểm rất lâu về trước, AI cũng đã được sử dụng để tạo nên những câu chuyện nhưng những con chữ đó không có linh hồn và người đọc không thể cảm nhận chúng trọn vẹn. Thế giới cần sự sâu sắc và vì thế họ cần những câu chuyện.`
      )
      setArtkeeper('sad')
    }
    if (mangaRoomStep == 3) {
      displayGuide(
        locale == 'en'
          ? `You—the chosen one. Punka and Min must’ve picked the right person. You have the gift of storytelling! So, use Story Clover wisely. Collaborate with others to craft our tale`
          : `Cậu-người được chọn, hẳn là hai tên Punka và Min đã nhìn đúng người, cậu có khả năng kể chuyện! Vậy thì hãy dùng Story Slover thật tốt. Cùng những người khác sáng tạo, tạo nên câu chuyện của chúng ta.`
      )
      setArtkeeper('normal')
    }
    if (mangaRoomStep == 4) {
      setShowGuide(false)
      setMangaDone(true)
      router.push(`/events/ava-2024/map/manga-room`)
    }
  }, [mangaRoomStep])
  useEffect(() => {
    if (artRoomStep == 0) {
      displayGuide(
        locale == 'en'
          ? `Artkeeper leads you into a room filled with artworks: paintings, sculptures, and other crafts. Keeper gazes quietly, then speaks:`
          : `Artkeeper dẫn bạn đến một phòng đầy các tác phẩm nghệ thuật: tranh, tượng, và các tác phẩm thủ công khác. Keeper lặng nhìn rồi nói:`
      )
      setArtkeeper('')
    }
    if (artRoomStep == 1) {
      displayGuide(
        locale == 'en'
          ? `These paintings, tiny souls, I’ve been taught to understand how beautiful they are. Unfortunately, I can’t create beautiful things. All the paintings I can protect are here.`
          : `Những bức tranh, tâm hồn thu nhỏ, tôi đã được dạy để hiểu chúng đẹp như thế nào, tiếc rằng tôi không thể vẽ lên những thứ đẹp đẽ. Tất cả những bức tranh mà tôi có thể bảo vệ đều ở đây`
      )
      setArtkeeper('normal')
    }
    if (artRoomStep == 2) {
      displayGuide(
        locale == 'en'
          ? `My life’s goal is to preserve art. You creators can make paintings, sculptures, or many other things, and the commonality is their meaning. The robots out there can’t, and they don’t understand.`
          : `Mục tiêu cả đời của tôi là gìn giữ nghệ thuật. Các cậu là những người sáng tạo, các cậu có thể tạo ra tranh, tượng hay nhiều thứ khác và điểm chung là chúng có ý nghĩa, bọn robot ngoài kia không thể và cũng không hiểu được`
      )
      setArtkeeper('angry')
    }
    if (artRoomStep == 3) {
      displayGuide(
        locale == 'en'
          ? `Sigh, that’s enough for now. You seem to have looked enough. How about picking up a brush and painting? When you do, a Story Clover will also be created, but whatever, paint because you love it! Let’s create something beautiful together...`
          : `Haizz, vậy là đủ rồi, cậu có vẻ đã ngắm đủ. Cầm cọ lên và vẽ chứ? Khi cậu vẽ thì Story Clover cũng sẽ được tạo ra đấy, mà mặc kệ đi, hãy vẽ vì cậu yêu nó! Chúng ta sẽ cùng vẽ thứ gì đó thật đẹp…`
      )
      setArtkeeper('normal')
    }
    if (artRoomStep == 4) {
      setShowGuide(false)
      setArtDone(true)
      router.push(`/events/ava-2024/map/artwork-room`)
    }
  }, [artRoomStep])
  useEffect(() => {
    if (campainRoomStep == 0) {
      displayGuide(
        locale == 'en'
          ? `The largest door you’ve ever seen slowly opens, and Keeper leads you into a massive research space, like something out of a sci-fi movie…`
          : `Cánh cửa lớn nhất bạn từng thấy chậm rãi mở ra, Keeper dẫn bạn tiến vào một không gian nghiên cứu đồ sộ, tưởng như trong một bộ phim khoa học viễn tưởng…`
      )
      setArtkeeper('')
    }
    if (campainRoomStep == 1) {
      displayGuide(
        locale == 'en'
          ? `Watch out for those wires and don’t fiddle with them! This is the campaign area, where I plan everything. I used to tinker with it all alone until I lost track of time`
          : `Cẩn thận mấy cái dây điện và đừng táy máy nhé! Đây là khu chiến dịch, nơi tôi lên kế hoạch cho mọi thứ, tôi đã từng một mình mày mò đến mức quên mất thời gian`
      )
      setArtkeeper('sad')
    }
    if (campainRoomStep == 2) {
      displayGuide(
        locale == 'en'
          ? `But now that you’re here, let’s solve these puzzles together and try to score some points! Who knows, I might have a different view of you once you finish these tasks. The base system will record the scores`
          : `Nhưng giờ có cậu ở đây rồi, cùng nhau giải những câu hỏi và cố gắng ghi điểm nhé! Biết đâu tôi sẽ có cái nhìn khác về cậu, khi hoàn thành các tiến trình nhiệm vụ này, hệ thống căn cứ sẽ ghi lại số điểm`
      )
      setArtkeeper('normal')
    }
    if (campainRoomStep == 3) {
      displayGuide(
        locale == 'en'
          ? `I’ll personally thank you. After all, I’ve spent time making gifts—plenty of them—for those who truly deserve it. I’m very grateful to everyone who helps keep this machine running...`
          : `Tôi sẽ đích thân cảm ơn cậu, dù sao thì tôi cũng dành thời gian để làm cả quà, rất nhiều là đằng khác, dành cho những người xứng đáng. Tôi rất biết ơn mọi người đã góp sức chạy cỗ máy này…`
      )
      setArtkeeper('smile')
    }
    if (campainRoomStep == 4) {
      setShowGuide(false)
      setCampainDone(true)
    }
  }, [campainRoomStep])

  const displayGuide = (text: string) => {
    if (!guideContentRef.current) return null
    guideContentRef.current.innerHTML = ''
    let i = 0
    setShowGuide(true)
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
      currentSetStep.current((prev) => prev + 1)
    }
  }

  return (
    <>
      <div
        className='bg-no-repeat h-screen w-full -mt-20 relative bg-cover'
        style={{ backgroundImage: `url(${Background.src})` }}>
        <Image src={Trai} alt='' className='absolute bottom-0 left-0 w-[30vw]' />
        <Image src={Phai} alt='' className='absolute bottom-0 right-0 w-[30vw]' />

        <div
          className='absolute h-[90vh] top-28 aspect-[394/800] left-1/2 -translate-x-1/2 bg-no-repeat bg-contain lg:hidden'
          style={{ backgroundImage: `url(${MobileMap.src})` }}>
          <div className='absolute top-0 right-0 z-10'>
            <BackgroundAudioController />
          </div>
          <div
            className={`absolute top-[24.8%] left-[2%] w-[32.8%] cursor-pointer ${
              active == 1 ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => (active == 1 ? push(`/events/ava-2024/`) : setActive(1))}>
            <Image src={Room1} alt='' className='w-full h-full' />
            <div className='font-jaro absolute whitespace-nowrap top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
              <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
              </svg>
              {t('Lobby')}
            </div>
          </div>
          <Button
            onClick={() => {
              if (active == 2) {
                currentSetStep.current = setArtRoomStep
                if (!artDone) {
                  setArtRoomStep(0)
                  setMangaRoomStep(-1)
                  setCampainRoomStep(-1)
                  setCharacterRoomStep(-1)
                } else {
                  router.push(`/events/ava-2024/map/artwork-room`)
                }
              } else {
                setActive(2)
              }
            }}
            className={`absolute top-0 left-[36.6%] w-[48%]`}>
            <>
              <div className={active == 2 ? 'opacity-100' : 'opacity-0'}>
                <Image src={Room2} alt='' className='w-full h-full' />
                <div className='font-jaro absolute whitespace-nowrap top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Artwork room')}
                </div>
              </div>
              <HelpBubble
                className='absolute -right-[7%] top-[5%] cursor-help w-[20%]'
                onClick={(e) => {
                  currentSetStep.current = setArtRoomStep
                  setArtRoomStep(0)
                  setMangaRoomStep(-1)
                  setCampainRoomStep(-1)
                  setCharacterRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <Button
            onClick={() => {
              if (active == 3) {
                currentSetStep.current = setMangaRoomStep
                if (!characterDone) {
                  setMangaRoomStep(0)
                  setArtRoomStep(-1)
                  setCampainRoomStep(-1)
                  setCharacterRoomStep(-1)
                } else {
                  router.push(`/events/ava-2024/map/manga-room`)
                }
              } else {
                setActive(3)
              }
            }}
            className={`absolute top-[26%] right-[6.4%] w-[37.45%]`}>
            <>
              <div className={active == 3 ? 'opacity-100' : 'opacity-0'}>
                <Image src={Room3} alt='' className='w-full h-full' />
                <div className='font-jaro absolute whitespace-nowrap top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Manga room')}
                </div>
              </div>
              <HelpBubble
                className='absolute -right-[7%] top-[5%] cursor-help w-[20%]'
                onClick={(e) => {
                  currentSetStep.current = setMangaRoomStep
                  setMangaRoomStep(0)
                  setArtRoomStep(-1)
                  setCampainRoomStep(-1)
                  setCharacterRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <Button
            onClick={() => {
              if (active == 4) {
                currentSetStep.current = setCampainRoomStep
                if (!campainDone) {
                  setCampainRoomStep(0)
                  setMangaRoomStep(-1)
                  setArtRoomStep(-1)
                  setCharacterRoomStep(-1)
                } else {
                  router.push(`/campaign`)
                }
              } else {
                setActive(4)
              }
            }}
            className={`absolute bottom-[18.3%] right-[17.25%] w-[46.9%]`}>
            <>
              <div className={active == 4 ? 'opacity-100' : 'opacity-0'}>
                <Image src={Room4} alt='' className='h-full w-full' />
                <div className='font-jaro absolute whitespace-nowrap top-2/3 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Campaign')}
                </div>
              </div>
              <HelpBubble
                className='absolute -right-[7%] top-[5%] cursor-help w-[20%]'
                onClick={(e) => {
                  currentSetStep.current = setCampainRoomStep
                  setCampainRoomStep(0)
                  setMangaRoomStep(-1)
                  setArtRoomStep(-1)
                  setCharacterRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <Button
            onClick={() => {
              if (active == 5) {
                currentSetStep.current = setCharacterRoomStep
                if (!characterDone) {
                  setCharacterRoomStep(0)
                  setCampainRoomStep(-1)
                  setMangaRoomStep(-1)
                  setArtRoomStep(-1)
                } else {
                  router.push(`/events/ava-2024/map/character`)
                }
              } else {
                setActive(5)
              }
            }}
            className='absolute bottom-[33.7%] left-[.8%] w-[52.7%]'>
            <>
              <div className={active == 5 ? 'opacity-100' : 'opacity-0'}>
                <Image src={Room5} alt='' className='w-full h-full' />
                <div className='font-jaro absolute whitespace-nowrap top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Character')}
                </div>
              </div>
              <HelpBubble
                className='absolute -right-[7%] top-[5%] cursor-help w-[20%]'
                onClick={(e) => {
                  currentSetStep.current = setCharacterRoomStep
                  setCharacterRoomStep(0)
                  setCampainRoomStep(-1)
                  setMangaRoomStep(-1)
                  setArtRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='57'
            height='47'
            viewBox='0 0 57 47'
            fill='none'
            className='absolute top-[0%] scale-x-[-1] right-[47.8%]'>
            <path
              d='M19.4519 1H19.0949L18.8186 1.22604L2.36676 14.6867L1.76563 15.1785L2.09342 15.8826L12.1889 37.5692L12.3968 38.0159L12.8778 38.1232L18.4519 39.3663V43.7882V45.3971L19.8945 44.6849L26.6929 41.3288L47.772 43.3772L48.5356 43.4514L48.805 42.733L55.5353 24.7855L55.6537 24.4699L55.5568 24.147L48.8265 1.71265L48.6127 1H47.8687H19.4519Z'
              fill='white'
              stroke='black'
              strokeWidth='2'
            />
            <path
              d='M28.6635 23.9834C28.3518 23.9834 28.1748 23.8143 28.1323 23.4762L27.0062 6.54943C26.9637 6.18314 27.1407 6 27.5374 6H35.4626C35.8593 6 36.0363 6.18314 35.9938 6.54943L34.8677 23.4762C34.8252 23.8143 34.6482 23.9834 34.3365 23.9834H28.6635ZM28.2385 34C27.8844 34 27.7073 33.8169 27.7073 33.4506V26.8151C27.7073 26.4488 27.8844 26.2657 28.2385 26.2657H34.9315C35.2856 26.2657 35.4626 26.4488 35.4626 26.8151V33.4506C35.4626 33.8169 35.2856 34 34.9315 34H28.2385Z'
              fill='black'
            />
          </svg>
        </div>
        <div
          className='absolute inset-x-[19%] bottom-[3%] translate-y-[15%] w-[60%] aspect-[1227/966] bg-no-repeat bg-contain hidden lg:block'
          style={{ backgroundImage: `url(${Map.src})` }}>
          <div className='absolute -top-4 -right-4 z-10'>
            <BackgroundAudioController />
          </div>
          <Link
            href={`/events/ava-2024/`}
            className='absolute -top-[0.2%] left-[1.3%] w-[20.3%] opacity-0 hover:opacity-100'>
            <Image src={Room1} alt='' className='w-full h-full' />
            <div className='font-jaro absolute whitespace-nowrap top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
              <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
              </svg>
              {t('Lobby')}
            </div>
          </Link>
          <Button
            onClick={() => {
              if (!artDone) {
                currentSetStep.current = setArtRoomStep
                setArtRoomStep(0)
                setMangaRoomStep(-1)
                setCampainRoomStep(-1)
                setCharacterRoomStep(-1)
              } else {
                router.push(`/events/ava-2024/map/artwork-room`)
              }
            }}
            className='absolute top-[.7%] left-[34.6%] w-[33.75%]'>
            <>
              <div className='opacity-0 hover:opacity-100'>
                <Image src={Room2} alt='' className='w-full h-full' />
                <div className='font-jaro absolute whitespace-nowrap top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Artwork room')}
                </div>
              </div>
              <HelpBubble
                className='absolute -right-[5%] top-[15%] cursor-help'
                onClick={(e) => {
                  currentSetStep.current = setArtRoomStep
                  setArtRoomStep(0)
                  setMangaRoomStep(-1)
                  setCampainRoomStep(-1)
                  setCharacterRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <Button
            onClick={() => {
              if (!mangaDone) {
                currentSetStep.current = setMangaRoomStep
                setMangaRoomStep(0)
                setArtRoomStep(-1)
                setCampainRoomStep(-1)
                setCharacterRoomStep(-1)
              } else {
                router.push(`/events/ava-2024/map/manga-room`)
              }
            }}
            className='absolute top-[.77%] -right-[.2%] w-[30.45%]'>
            <>
              <div className='opacity-0 hover:opacity-100'>
                <Image src={Room3} alt='' className='w-full h-full' />
                <div className='font-jaro absolute whitespace-nowrap top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Manga room')}
                </div>
              </div>
              <HelpBubble
                className='absolute -right-[5%] top-[5%] cursor-help'
                onClick={(e) => {
                  currentSetStep.current = setMangaRoomStep
                  setMangaRoomStep(0)
                  setArtRoomStep(-1)
                  setCampainRoomStep(-1)
                  setCharacterRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <Button
            onClick={() => {
              if (!campainDone) {
                currentSetStep.current = setCampainRoomStep
                setCampainRoomStep(0)
                setMangaRoomStep(-1)
                setArtRoomStep(-1)
                setCharacterRoomStep(-1)
              } else {
                router.push(`/campaign`)
              }
            }}
            className='absolute bottom-[14.3%] right-[32.25%] w-[38.9%]'>
            <>
              <div className='opacity-0 hover:opacity-100'>
                <Image src={Room4} alt='' className='w-full h-full' />
                <div className='font-jaro absolute whitespace-nowrap top-2/3 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Campaign')}
                </div>
              </div>
              <HelpBubble
                className='absolute right-[0%] top-[15%] cursor-help'
                onClick={(e) => {
                  currentSetStep.current = setCampainRoomStep
                  setCampainRoomStep(0)
                  setMangaRoomStep(-1)
                  setArtRoomStep(-1)
                  setCharacterRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <Button
            onClick={() => {
              if (!characterDone) {
                currentSetStep.current = setCharacterRoomStep
                setCharacterRoomStep(0)
                setCampainRoomStep(-1)
                setMangaRoomStep(-1)
                setArtRoomStep(-1)
              } else {
                router.push(`/events/ava-2024/map/character`)
              }
            }}
            className='absolute bottom-[46%] -left-[.2%] w-[29.7%]'>
            <>
              <div className='opacity-0 hover:opacity-100'>
                <Image src={Room5} alt='' className='w-full h-full' />
                <div className='font-jaro absolute whitespace-nowrap top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-white bg-black px-2 rounded-md text-white flex items-center gap-1 lg:gap-2 text-sm lg:text-2xl'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='12' viewBox='0 0 10 12' fill='none'>
                    <path d='M10 6L0.25 11.6292L0.250001 0.370834L10 6Z' fill='white' />
                  </svg>
                  {t('Character')}
                </div>
              </div>
              <HelpBubble
                className='absolute right-[0%] top-[15%] cursor-help'
                onClick={(e) => {
                  currentSetStep.current = setCharacterRoomStep
                  setCharacterRoomStep(0)
                  setCampainRoomStep(-1)
                  setMangaRoomStep(-1)
                  setArtRoomStep(-1)
                  e.stopPropagation()
                }}
              />
            </>
          </Button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='57'
            height='47'
            viewBox='0 0 57 47'
            fill='none'
            className='absolute top-[1%] right-[33%] animate-blink'>
            <path
              d='M19.4519 1H19.0949L18.8186 1.22604L2.36676 14.6867L1.76563 15.1785L2.09342 15.8826L12.1889 37.5692L12.3968 38.0159L12.8778 38.1232L18.4519 39.3663V43.7882V45.3971L19.8945 44.6849L26.6929 41.3288L47.772 43.3772L48.5356 43.4514L48.805 42.733L55.5353 24.7855L55.6537 24.4699L55.5568 24.147L48.8265 1.71265L48.6127 1H47.8687H19.4519Z'
              fill='white'
              stroke='black'
              strokeWidth='2'
            />
            <path
              d='M28.6635 23.9834C28.3518 23.9834 28.1748 23.8143 28.1323 23.4762L27.0062 6.54943C26.9637 6.18314 27.1407 6 27.5374 6H35.4626C35.8593 6 36.0363 6.18314 35.9938 6.54943L34.8677 23.4762C34.8252 23.8143 34.6482 23.9834 34.3365 23.9834H28.6635ZM28.2385 34C27.8844 34 27.7073 33.8169 27.7073 33.4506V26.8151C27.7073 26.4488 27.8844 26.2657 28.2385 26.2657H34.9315C35.2856 26.2657 35.4626 26.4488 35.4626 26.8151V33.4506C35.4626 33.8169 35.2856 34 34.9315 34H28.2385Z'
              fill='black'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='57'
            height='47'
            viewBox='0 0 57 47'
            fill='none'
            className='absolute bottom-[41%] right-[32%] animate-blink'>
            <path
              d='M19.4519 1H19.0949L18.8186 1.22604L2.36676 14.6867L1.76563 15.1785L2.09342 15.8826L12.1889 37.5692L12.3968 38.0159L12.8778 38.1232L18.4519 39.3663V43.7882V45.3971L19.8945 44.6849L26.6929 41.3288L47.772 43.3772L48.5356 43.4514L48.805 42.733L55.5353 24.7855L55.6537 24.4699L55.5568 24.147L48.8265 1.71265L48.6127 1H47.8687H19.4519Z'
              fill='white'
              stroke='black'
              strokeWidth='2'
            />
            <path
              d='M28.6635 23.9834C28.3518 23.9834 28.1748 23.8143 28.1323 23.4762L27.0062 6.54943C26.9637 6.18314 27.1407 6 27.5374 6H35.4626C35.8593 6 36.0363 6.18314 35.9938 6.54943L34.8677 23.4762C34.8252 23.8143 34.6482 23.9834 34.3365 23.9834H28.6635ZM28.2385 34C27.8844 34 27.7073 33.8169 27.7073 33.4506V26.8151C27.7073 26.4488 27.8844 26.2657 28.2385 26.2657H34.9315C35.2856 26.2657 35.4626 26.4488 35.4626 26.8151V33.4506C35.4626 33.8169 35.2856 34 34.9315 34H28.2385Z'
              fill='black'
            />
          </svg>
        </div>

        <div className='bottom-[5%] left-[5%] lg:left-[20%] absolute items-end gap-5 flex'>
          <div
            className='relative w-[6.5vw] min-w-[100px] h-auto mb-2 mr-[10vw] cursor-pointer'
            onClick={() => setSeeMore(!seeMore)}>
            <Image src={Artkeeper} alt='' className='w-full h-full' />
            <svg
              width='57'
              height='48'
              viewBox='0 0 57 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute w-[40%] top-[15%] -right-[10%] animate-blink'>
              <path
                d='M19.0642 1.89453H18.7072L18.4309 2.12057L1.97907 15.5812L1.37793 16.073L1.70572 16.7772L11.8012 38.4637L12.0091 38.9105L12.4901 39.0177L18.0642 40.2608V44.6828V46.2917L19.5068 45.5795L26.3052 42.2233L47.3843 44.2717L48.1479 44.3459L48.4173 43.6275L55.1476 25.68L55.266 25.3644L55.1691 25.0415L48.4388 2.60718L48.225 1.89453H47.481H19.0642Z'
                fill='white'
                stroke='black'
                strokeWidth='2'
              />
              <path
                d='M10.5969 24C10.4636 24 10.3969 23.9333 10.3969 23.8V15.128C10.3969 15.0053 10.4423 14.8987 10.5329 14.808L11.8689 13.464C11.9596 13.3787 12.0663 13.336 12.1889 13.336H14.0209C14.1436 13.336 14.2503 13.3787 14.3409 13.464L15.6849 14.816H16.0609L17.4049 13.464C17.4956 13.3787 17.6023 13.336 17.7249 13.336H19.5489C19.6769 13.336 19.7836 13.3787 19.8689 13.464L21.2129 14.808C21.3036 14.8987 21.3489 15.0053 21.3489 15.128V23.8C21.3489 23.9333 21.2823 24 21.1489 24H18.8529C18.7196 24 18.6529 23.9333 18.6529 23.8V15.52H17.2209V23.8C17.2209 23.9333 17.1543 24 17.0209 24H14.7329C14.5996 24 14.5329 23.9333 14.5329 23.8V15.52H13.0849V23.8C13.0849 23.9333 13.0183 24 12.8849 24H10.5969ZM25.2811 24C25.1584 24 25.0517 23.9547 24.9611 23.864L23.3611 22.264C23.2704 22.1787 23.2251 22.072 23.2251 21.944V15.384C23.2251 15.2613 23.2704 15.1547 23.3611 15.064L24.9611 13.464C25.0517 13.3787 25.1584 13.336 25.2811 13.336H28.4331C28.5611 13.336 28.6677 13.3787 28.7531 13.464L30.3531 15.064C30.4437 15.1547 30.4891 15.2613 30.4891 15.384V21.944C30.4891 22.072 30.4437 22.1787 30.3531 22.264L28.7531 23.864C28.6677 23.9547 28.5611 24 28.4331 24H25.2811ZM26.2491 21.824H27.4651C27.6891 21.824 27.8011 21.6747 27.8011 21.376V15.96C27.8011 15.656 27.6891 15.504 27.4651 15.504H26.2491C26.0304 15.504 25.9211 15.656 25.9211 15.96V21.376C25.9211 21.6747 26.0304 21.824 26.2491 21.824ZM32.5657 24C32.4324 24 32.3657 23.9333 32.3657 23.8V13.536C32.3657 13.4027 32.4324 13.336 32.5657 13.336H36.9257C37.0537 13.336 37.1604 13.3707 37.2457 13.44L39.0857 15.264C39.1444 15.3173 39.179 15.3627 39.1897 15.4C39.2057 15.4373 39.2137 15.4987 39.2137 15.584V17.776C39.2137 17.8453 39.1844 17.9067 39.1257 17.96L38.2457 18.824L37.5177 19.448L38.3817 20.6L39.2937 22.536C39.315 22.584 39.331 22.632 39.3417 22.68C39.3577 22.7227 39.3657 22.776 39.3657 22.84V23.8C39.3657 23.9333 39.299 24 39.1657 24H37.0377C36.9204 24 36.8404 23.9467 36.7977 23.84L35.5177 20.128H34.9337V23.8C34.9337 23.9333 34.867 24 34.7337 24H32.5657ZM35.7897 18.12C36.227 18.12 36.5257 18.0293 36.6857 17.848C36.8457 17.6667 36.9257 17.328 36.9257 16.832C36.9257 16.3253 36.8457 15.9813 36.6857 15.8C36.5257 15.6187 36.227 15.528 35.7897 15.528C35.363 15.528 35.067 15.6187 34.9017 15.8C34.7364 15.9813 34.6537 16.3253 34.6537 16.832C34.6537 17.328 34.7364 17.6667 34.9017 17.848C35.067 18.0293 35.363 18.12 35.7897 18.12ZM40.8157 24C40.6824 24 40.6157 23.9333 40.6157 23.8V13.536C40.6157 13.4027 40.6824 13.336 40.8157 13.336H46.3917C46.525 13.336 46.5917 13.4027 46.5917 13.536V15.304C46.5917 15.4373 46.525 15.504 46.3917 15.504H43.3037V17.72H46.1277C46.261 17.72 46.3277 17.7867 46.3277 17.92V19.416C46.3277 19.5493 46.261 19.616 46.1277 19.616H43.3037V21.824H46.3917C46.525 21.824 46.5917 21.8907 46.5917 22.024V23.8C46.5917 23.9333 46.525 24 46.3917 24H40.8157ZM23.0193 30.936C22.886 30.936 22.8193 30.864 22.8193 30.72V28.184C22.8193 28.04 22.886 27.968 23.0193 27.968H25.5793C25.7126 27.968 25.7793 28.04 25.7793 28.184V30.72C25.7793 30.864 25.7126 30.936 25.5793 30.936H23.0193ZM27.2224 30.936C27.0891 30.936 27.0224 30.864 27.0224 30.72V28.184C27.0224 28.04 27.0891 27.968 27.2224 27.968H29.7824C29.9158 27.968 29.9824 28.04 29.9824 28.184V30.72C29.9824 30.864 29.9158 30.936 29.7824 30.936H27.2224ZM31.4256 30.936C31.2922 30.936 31.2256 30.864 31.2256 30.72V28.184C31.2256 28.04 31.2922 27.968 31.4256 27.968H33.9856C34.1189 27.968 34.1856 28.04 34.1856 28.184V30.72C34.1856 30.864 34.1189 30.936 33.9856 30.936H31.4256Z'
                fill='#0B0B0B'
              />
            </svg>
            <div className={`active space-y-2 absolute left-[115%] bottom-0 ${seeMore ? '' : 'hidden'}`}>
              <div
                onClick={() => setOpenRules(true)}
                className='bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
                {t('View Rule')}
              </div>
              <Link
                href={`/events/ava-2024/map/submit-portal`}
                className='block bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
                {t('submit2')}
              </Link>
              <div
                onClick={() => setOpenAward(true)}
                className='bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
                {t('Award')}
              </div>
            </div>
          </div>

          <div
            className={`absolute flex-1 w-[90vw] lg:w-[60vw] flex flex-col gap-2 items-end ${
              !showGuide && 'hidden pointer-events-none'
            }`}>
            <div className='flex items-end gap-10 justify-end w-full'>
              <div
                className='cursor-pointer opacity-80 hover:opacity-100 text-white font-jaro border border-white py-1 px-5 text-2xl uppercase rounded-md bg-black'
                onClick={() => currentSetStep.current(4)}>
                {t('Skip')}
              </div>
              {artkeeper != '' && (
                <Image
                  src={
                    artkeeper == 'clover'
                      ? ArtkeeperClover
                      : artkeeper == 'sad'
                      ? ArtkeeperSad
                      : artkeeper == 'smile'
                      ? ArtkeeperSmile
                      : artkeeper == 'angry'
                      ? ArtkeeperAngry
                      : ArtkeeperNormal
                  }
                  alt=''
                  className='w-[20%] h-auto translate-y-[10%]'
                />
              )}
            </div>
            <div
              className='relative w-full h-auto min-h-[170px] cursor-pointer bg-no-repeat'
              style={{ backgroundImage: `url(${GuideBox.src})`, backgroundSize: '100% 100%' }}
              onClick={handler}>
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
        </div>
      </div>
      <Modal open={openAward} setOpen={setOpenAward} title={locale == 'vn' ? 'GIẢI THƯỞNG' : 'AWARD'}>
        <Award />
      </Modal>
      <Modal open={openRules} setOpen={setOpenRules}>
        <Rules />
      </Modal>
    </>
  )
}
const HelpBubble = ({ className, onClick }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='57'
      height='47'
      viewBox='0 0 57 47'
      fill='none'
      className={className}
      onClick={onClick}>
      <path
        d='M19.4519 1H19.0949L18.8186 1.22604L2.36676 14.6867L1.76563 15.1785L2.09342 15.8826L12.1889 37.5692L12.3968 38.0159L12.8778 38.1232L18.4519 39.3663V43.7882V45.3971L19.8945 44.6849L26.6929 41.3288L47.772 43.3772L48.5356 43.4514L48.805 42.733L55.5353 24.7855L55.6537 24.4699L55.5568 24.147L48.8265 1.71265L48.6127 1H47.8687H19.4519Z'
        fill='white'
        stroke='#009640'
        strokeWidth='2'
      />
      <path
        d='M27.0812 16.4327L27.5315 16.4991L27.6398 16.057C28.1247 14.0777 29.9016 12.6938 31.9087 12.6938C32.1217 12.6938 32.3369 12.7092 32.5539 12.7413L32.5542 12.7413C34.9593 13.096 36.6262 15.3429 36.2727 17.7633C35.951 19.965 34.0686 21.5457 31.9212 21.5457C31.7606 21.5457 31.5984 21.5368 31.435 21.5186L28.331 21.0611L27.8357 20.9882L27.7633 21.4835L26.6022 29.4283L26.53 29.9224L27.0241 29.9953L30.1699 30.4589L30.6652 30.5319L30.7376 30.0365L31.3684 25.719C31.555 25.7312 31.7408 25.7372 31.9254 25.7372C36.1166 25.7372 39.7814 22.6565 40.4073 18.3716C41.096 13.664 37.8537 9.28413 33.1617 8.59245L33.1616 8.59243C32.7395 8.53031 32.3198 8.5 31.9049 8.5C27.8773 8.5 24.3371 11.3483 23.5102 15.3722L23.4038 15.8903L23.9271 15.9675L27.0812 16.4327ZM33.0888 9.08709L33.0888 9.0871L33.0888 9.08709Z'
        fill='#00C04D'
        stroke='#009640'
      />
      <path
        d='M28.3837 32.3868L28.383 32.3867C28.2576 32.3684 28.1327 32.3594 28.0089 32.3594C26.757 32.3594 25.6641 33.2795 25.4775 34.5565L25.4775 34.5566C25.2729 35.9587 26.2383 37.2658 27.6396 37.4721L27.6401 37.4722C27.7655 37.4905 27.8904 37.4995 28.0142 37.4995C29.2662 37.4995 30.3591 36.5789 30.5456 35.3024L30.5456 35.3023C30.7503 33.9001 29.7847 32.5936 28.3837 32.3868Z'
        fill='#00C04D'
        stroke='#009640'
      />
    </svg>
  )
}
