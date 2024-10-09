import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import Background from 'components/pages/event/ava-2024/assets/Main-Map.svg'
import Room1 from 'components/pages/event/ava-2024/assets/room1.svg'
import Room2 from 'components/pages/event/ava-2024/assets/room2.svg'
import Room3 from 'components/pages/event/ava-2024/assets/room3.svg'
import Room4 from 'components/pages/event/ava-2024/assets/room4.svg'
import Room5 from 'components/pages/event/ava-2024/assets/room5.svg'
import Ava from 'components/pages/event/ava-2024/assets/ava.svg'
import Flame from 'components/pages/event/ava-2024/assets/flame.svg'
import Artkeeper from 'components/pages/event/ava-2024/assets/mascot-head.svg'
import ArtkeeperClover from 'components/pages/event/ava-2024/assets/Artkeeper-clover.png'
import ArtkeeperSad from 'components/pages/event/ava-2024/assets/Artkeeper-sad.png'
import ArtkeeperSmile from 'components/pages/event/ava-2024/assets/Artkeeper-smile.png'
import ArtkeeperAngry from 'components/pages/event/ava-2024/assets/Artkeeper-angry.png'
import ArtkeeperNormal from 'components/pages/event/ava-2024/assets/Artkeeper-normal.png'
import GuideBox from 'components/pages/event/ava-2024/assets/guide-box.svg'
import Phai from 'components/pages/event/ava-2024/assets/phai.svg'
import Trai from 'components/pages/event/ava-2024/assets/trai.svg'
import Map from 'components/pages/event/ava-2024/assets/map-0.svg'
import FourLeafClover from 'components/pages/event/ava-2024/assets/fourleafclover.svg'
import Image from 'next/image'
import Link from 'next/link'
import Modal from 'components/pages/event/ava-2024/Modal'
import useLocalStorage from 'src/hooks/useLocalStorage'
import Button from 'components/Button'
export default function Event() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const router = useRouter()
  const [seeMore, setSeeMore] = useState(false)
  const [openRules, setOpenRules] = useState(false)
  const [openAward, setOpenAward] = useState(false)
  const currentSetStep = useRef<any>()
  const timeoutId = useRef<any>()

  const [characterRoomStep, setCharacterRoomStep] = useState<number>(-1)
  const [characterDone, setCharacterDone] = useLocalStorage<boolean>('character-done', false)
  const [mangaRoomStep, setMangaRoomStep] = useState<number>(-1)
  const [mangaDone, setMangaDone] = useLocalStorage<boolean>('manga-done', false)
  const [artRoomStep, setArtRoomStep] = useState<number>(-1)
  const [artDone, setArtDone] = useLocalStorage<boolean>('art-done', false)
  const [campainRoomStep, setCampainRoomStep] = useState<number>(-1)
  const [campainDone, setCampainDone] = useLocalStorage<boolean>('campain-done', false)
  const [artkeeper, setArtkeeper] = useState('')
  const [showGuide, setShowGuide] = useState(false)
  const guideContentRef = useRef<any>()
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
    let i = 0
    setShowGuide(true)
    if (!guideContentRef.current) {
      return null
    }
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
    <>
      <div
        className='bg-no-repeat h-screen w-full -mt-20 relative'
        style={{ backgroundImage: `url(${Background.src})` }}>
        <Image src={Trai} alt='' className='absolute bottom-0 left-0' />
        <Image src={Phai} alt='' className='absolute bottom-0 right-0' />
        <div
          className='absolute inset-x-[19%] bottom-[3%] translate-y-[15%] w-[60%] aspect-[1227/966] bg-no-repeat bg-contain'
          style={{ backgroundImage: `url(${Map.src})` }}>
          <Link href={`/events/ava-2024/`}>
            <Image
              src={Room1}
              alt=''
              className='absolute -top-[0.2%] left-[1.3%] w-[20.3%] opacity-0 hover:opacity-100'
            />
          </Link>
          <Button
            onClick={() => {
              currentSetStep.current = setArtRoomStep
              setArtRoomStep(0)
              setMangaRoomStep(-1)
              setCampainRoomStep(-1)
              setCharacterRoomStep(-1)
            }}>
            <Image
              src={Room2}
              alt=''
              className='absolute top-[.7%] left-[34.6%] w-[33.75%] opacity-0 hover:opacity-100'
            />
          </Button>
          <Button
            onClick={() => {
              currentSetStep.current = setMangaRoomStep
              setMangaRoomStep(0)
              setArtRoomStep(-1)
              setCampainRoomStep(-1)
              setCharacterRoomStep(-1)
            }}>
            <Image
              src={Room3}
              alt=''
              className='absolute top-[.77%] -right-[.2%] w-[30.45%] opacity-0 hover:opacity-100'
            />
          </Button>
          <Button
            onClick={() => {
              currentSetStep.current = setCampainRoomStep
              setCampainRoomStep(0)
              setMangaRoomStep(-1)
              setArtRoomStep(-1)
              setCharacterRoomStep(-1)
            }}>
            <Image
              src={Room4}
              alt=''
              className='absolute bottom-[14.3%] right-[32.25%] w-[38.9%] opacity-0 hover:opacity-100'
            />
          </Button>
          <Button
            onClick={() => {
              currentSetStep.current = setCharacterRoomStep
              if (!characterDone) {
                setCharacterRoomStep(0)
                setCampainRoomStep(-1)
                setMangaRoomStep(-1)
                setArtRoomStep(-1)
              } else {
                router.push(`/events/ava-2024/map/character`)
              }
            }}>
            <Image
              src={Room5}
              alt=''
              className='absolute bottom-[46%] -left-[.2%] w-[29.7%] opacity-0 hover:opacity-100'
            />
          </Button>
          <div className='bottom-[10%] -left-[2%] absolute flex items-end gap-5'>
            <div
              className='relative w-[6.5vw] h-auto mb-[5vh] mr-[10vw] cursor-pointer'
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
                  stroke-width='2'
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
                  View Rule
                </div>
                <Link
                  href={`/events/ava-2024/map/submit-portal`}
                  className='block bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
                  Submit
                </Link>
                <div
                  onClick={() => setOpenAward(true)}
                  className='bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
                  Award
                </div>
              </div>
            </div>

            <div
              className={`relative flex-1 my-[5vh] w-[40vw] flex flex-col gap-2 items-end ${
                !showGuide && 'hidden pointer-events-none'
              }`}>
              <div className='flex items-end gap-10 justify-end w-full'>
                <svg
                  width='109'
                  height='38'
                  viewBox='0 0 109 38'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='cursor-pointer opacity-80 hover:opacity-100'
                  onClick={() => currentSetStep.current(4)}>
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
                className='relative w-full h-auto min-h-[150px] cursor-pointer'
                onClick={() => currentSetStep.current((prev) => prev + 1)}>
                <Image src={GuideBox} alt='' className='relative w-full h-auto min-h-[150px] object-cover' />
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
        </div>
      </div>
      <Modal open={openAward} setOpen={setOpenAward} title='AWARD'>
        <div className='w-[80vw] max-w-[500px]'>
          <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black'>
            <div className='text-lg font-bold rounded-md bg-[#A967FF] px-2 py-0.5'>Prize pool</div>
            <Image src={Ava} alt='' className='w-[138px] h-auto' />
            <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>6000 USD</div>
            <div className='font-medium mt-2'>53 prizes</div>
          </div>
          <div className='w-full border-t border-dashed border-white my-4'></div>
          <div className='text-lg font-medium w-full text-center'>Grand Final Prizes</div>
          <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black mt-4'>
            <div className='text-lg font-bold rounded-md bg-[#1EBB61] px-2 py-0.5'>Special Prize</div>
            <Image src={Flame} alt='' className='w-[138px] h-auto' />
            <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>1200 USD</div>
          </div>
          <div className='mt-4 bg-neutral-950 p-4 text-sm space-y-1.5'>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 01 1st Prize: 600 USD
            </div>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 02 2nd Prize: 400 USD
            </div>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 03 3rd Prize: 200 USD
            </div>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 10 Encouragement Prizes: 40 USD
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={openRules} setOpen={setOpenRules} title='CONTEST RULES'>
        {locale == 'vn' ? (
          <div className='bg-neutral-950 rounded-md p-4 relative max-h-[68vh] overflow-auto'>
            <div>
              {/* Vòng 1 Section */}
              <section className='mb-8'>
                <h2 className='text-[#cc0000] font-bold mb-4'>
                  Vòng 1: Your Artistic Voice - Tiếng nói nghệ thuật của bạn
                </h2>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>1/ Nội dung:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Sau khi nhân vật bí ẩn tìm đến Thỏ Punka và Thỏ Min, họ cần thêm sự giúp đỡ để thành lập đội quân
                      nghệ sĩ chống lại trí tuệ nhân tạo xấu trong tương lai. Người đó chính là bạn.
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>2/ Yêu cầu bài dự thi:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Nộp 01 trang A4 theo Template của BTC, giới thiệu nhân vật full body góc chính diện hoặc 3/4 và 01
                      avatar nhân vật đó theo tỷ lệ 1:1 (1500x1500px) để tạo IP độc quyền trong IP room.
                    </li>
                    <li>
                      Ở bài dự thi trang A4, ghi chú thêm một vài thông tin: tên, nghề nghiệp, quan điểm sáng tạo nghệ
                      thuật và phong cách nghệ thuật của nhân vật.
                    </li>
                    <li>Tác phẩm bắt buộc có màu.</li>
                    <li>Bắt buộc nộp 2 bản ENG và VIE.</li>
                    <li>Sử dụng font tùy thích (số lượng thoại và kích thước cần dễ đọc).</li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>3/ Lưu ý:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Avatar của bạn trong Vòng 1 sẽ được lưu trữ tại IP room, khi click vào Avatar bạn cũng có thể xem
                      được bài dự thi full Vòng 1 của mình.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Vòng 2 Section */}
              <section className='mb-8'>
                <h2 className='text-[#cc0000] font-bold mb-4'>
                  Vòng 2: The Art of Storytelling - Nghệ thuật kể chuyện
                </h2>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>1/ Nội dung:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Hãy chia sẻ về câu chuyện sáng tạo nghệ thuật hoặc những trải nghiệm của bạn trong quá trình sáng
                      tạo nghệ thuật. Câu chuyện nên có sự trọn vẹn và truyền tải thông điệp mang tinh thần tích cực,
                      thể hiện được quan điểm của cá nhân bạn về giá trị thuần túy mà nghệ thuật đem lại cho cuộc sống.
                      Đây chính là chìa khóa để tạo ra những vũ khí mạnh mẽ.
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>2/ Yêu cầu bài dự thi:</h3>
                  <ul className='list-disc pl-5'>
                    <li>Bài dự thi từ 3-10 trang (không tính trang bìa).</li>
                    <li className='text-[#ff6d01] italic'>
                      Bài thi không có thoại (Silent manga) và chỉ được sử dụng hình ảnh để kể câu chuyện của mình.
                    </li>
                    <li>Kích thước khổ A4, tối đa 1 trang đôi.</li>
                    <li>Không nhất thiết có màu.</li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>3/ Lưu ý:</h3>
                  <ul className='list-disc pl-5'>
                    <li>Bài thi không có thoại và chỉ được sử dụng hình ảnh để kể câu chuyện của mình.</li>
                    <li>
                      Mỗi thí sinh tham gia vòng 2 sẽ có luôn 3 Aura point, bạn có thể dùng Aura Point đổi lấy nhân vật
                      của thí sinh khác để cameo, mỗi nhân vật tương ứng 1 Aura Point. Vậy tối đa mỗi thí sinh được đổi
                      lấy 3 nhân vật khác trong IP room để dùng cho bài dự thi của mình.
                    </li>
                    <li>
                      Bên cạnh đó trong IP room cũng có một vài IP miễn phí khác đến từ ban tổ chức và các đơn vị đồng
                      hành, bạn đều có thể sử dụng chúng một cách miễn phí.
                    </li>
                    <li>
                      Mỗi IP xuất hiện trong truyện của bạn tại vòng 2 đều sẽ được tính thêm 1 điểm cộng vào tổng điểm
                      Vòng 2 (bao gồm cả các IP miễn phí).
                    </li>
                    <li>
                      Bạn không cần tham gia Vòng 1 để được tham gia Vòng 2. Tuy nhiên, để có cơ hội tham gia tranh giải
                      chung cuộc, bạn buộc phải nộp bài Vòng 1.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Vòng 3 Section */}
              <section>
                <h2 className='text-[#cc0000] font-bold mb-4'>
                  Vòng 3: The Meaning of Pure Art - Ý nghĩa của nghệ thuật thuần túy
                </h2>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>1/ Nội dung:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Khi kẻ địch đã suy yếu, một đòn dứt điểm là cần thiết. Đây chính là vũ khí mạnh nhất của những
                      nghệ sĩ. Ở vòng này, hãy đúc kết những giá trị và thông điệp bạn muốn truyền tải xuyên suốt câu
                      chuyện bạn đã kể ở vòng 2.
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>2/ Yêu cầu bài dự thi:</h3>
                  <ul className='list-disc pl-5'>
                    <li>Bài dự thi chỉ nộp 01 trang kích thước khổ A3 ngang.</li>
                    <li>Trong bài dự thi có xuất hiện vật phẩm của BTC - "Lồng đèn đặc biệt".</li>
                    <li>Khuyến khích có màu.</li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className=' font-semibold'>3/ Lưu ý:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Bạn không cần tham gia Vòng 2 để được tham gia Vòng 3. Tuy nhiên, để có cơ hội tham gia tranh giải
                      chung cuộc, bạn buộc phải nộp bài Vòng 2.
                    </li>
                    <li>Những thí sinh tham gia đủ 3 Vòng sẽ dành được cơ hội tranh giải chung cuộc.</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className='bg-neutral-950 rounded-md p-4 relative mt-4 max-h-[68vh] overflow-auto'>
            <div>
              {/* Round 1 Section */}
              <section className='mb-8'>
                <h2 className='text-[#cc0000] font-bold mb-4'>Round 1: Your Artistic Voice</h2>

                <div className='mb-4'>
                  <h3 className='font-semibold'>1/ Theme:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      After a mysterious figure reaches out to Punka and Min Rabbit for help, they need your assistance
                      to form an army of artists to fight against evil AI in the future. You are the chosen one.
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className='font-semibold'>2/ Submission Requirements:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Submit one A4 page following the organizer’s template, introducing your character in full body
                      (front or 3/4 view) along with a 1:1 avatar (1500x1500px) to create exclusive IP for the IP room.
                    </li>
                    <li>
                      Include character details such as name, occupation, artistic philosophy, and style on the A4 page.
                    </li>
                    <li>The artwork must be in color.</li>
                    <li>You can use any font (dialogue size must be easy to read).</li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className='font-semibold'>3/ Note:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Your avatar will be stored in the IP room. By clicking on it, you can view your full Round 1
                      submission.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Round 2 Section */}
              <section className='mb-8'>
                <h2 className='text-[#cc0000] font-bold mb-4'>Round 2: The Art of Storytelling</h2>

                <div className='mb-4'>
                  <h3 className='font-semibold'>1/ Theme:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      Share your artistic journey or creative process. The story should convey a positive message,
                      reflecting your personal perspective on the pure value of art and its impact on life. This is the
                      key to creating powerful weapons.
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className='font-semibold'>2/ Submission Requirements:</h3>
                  <ul className='list-disc pl-5'>
                    <li>The submission should be 3-10 pages (excluding cover).</li>
                    <li className='text-[#ff6d01] italic'>
                      No dialogue (Silent manga), the story should be told purely through visuals.
                    </li>
                    <li>Format: A4, up to one double-page spread.</li>
                    <li>Color is optional.</li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className='font-semibold'>3/ Note:</h3>
                  <ul className='list-disc pl-5'>
                    <li>No dialogue, visuals only.</li>
                    <li>
                      Each participant gets 3 Aura Points, which can be used to feature characters from other
                      participants in your story (1 character = 1 point, max 3 characters).
                    </li>
                    <li>There are also free IPs provided by the organizers for you to use.</li>
                    <li>Each cameo will earn you an extra point for Round 2 (including free IPs).</li>
                    <li>
                      You don’t need to participate in Round 1 to enter Round 2, but submitting for Round 1 is required
                      to compete in the final round.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Round 3 Section */}
              <section>
                <h2 className='text-[#cc0000] font-bold mb-4'>Round 3: The Meaning of Pure Art</h2>

                <div className='mb-4'>
                  <h3 className='font-semibold'>1/ Theme:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      When the enemy is weakened, a final strike is needed. This is the artist’s ultimate weapon. In
                      this round, reflect on the values and messages from your story in Round 2.
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className='font-semibold'>2/ Submission Requirements:</h3>
                  <ul className='list-disc pl-5'>
                    <li>Submit one A3 horizontal page.</li>
                    <li>The artwork must include the special lantern provided by the organizers.</li>
                    <li>Color is encouraged.</li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <h3 className='font-semibold'>3/ Note:</h3>
                  <ul className='list-disc pl-5'>
                    <li>
                      You don’t need to participate in Round 2 to enter Round 3, but submitting for Round 2 is required
                      to compete in the final round.
                    </li>
                    <li>Only those who complete all 3 rounds are eligible to compete for the grand prize.</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
