import Header from 'components/Header'
import { i18n, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MonoLogo from 'images/mono-logo.svg'
import Img1 from 'images/about-us-img.png'
import Img2 from 'images/about-us-img-2.png'
import ImgNFT from 'images/about-us-nft.png'
import Image from 'next/image'
import Carousel from 'components/Carousel'
import XVector from 'images/XVector.svg'
import FbIcon from 'images/Facebook.svg'
import BeIcon from 'images/behance.svg'
import IgIcon from 'images/instagram.svg'
import MaleIcon from 'images/icons/male.svg'
import FemaleIcon from 'images/icons/female.svg'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import OutlineTextField from 'components/Input/TextField/Outline'
import AutoGrowingTextField from 'components/Input/TextField/AutoGrowing'
import FilledButton from 'components/Button/FilledButton'
const authorData = [
  {
    name: 'Nguyễn Duy Hải',
    nickname: 'Hanz',
    gender: 'Male',
    age: 29,
    socialLink: {
      fb: 'https://www.facebook.com/duyhai.nguyen.336333/',
      be: 'https://www.behance.net/hanznguyen',
      ig: '',
    },
    bio: [
      'Sở thích: Xem phim, bóng đá, du lịch, ẩm thực',
      'Kinh nghiệm vẽ truyện tranh: Hơn 10 năm',
      'Các đầu truyện/ one-shot từng sáng tác nổi bật: The Stag and the Huntsman ( 3rd prize SMA 4 ), I’m always here ( Honourable mention SMA Extra 1 ), Time Travel ( 2 chapter, monthly winner of Dream’s World contest ) ',
      'Thể loại truyện tranh yêu thích: Shonen, Seinen, Sci-fi, Fantasy, Zombie',
      'Phương châm sáng tác truyện tranh: Manga is Freedom',
    ],
  },
  {
    name: 'Nguyễn Hòa Minh',
    nickname: 'Howater',
    gender: 'Male',
    age: 21,
    socialLink: {
      fb: 'https://www.facebook.com/Howaterr',
      be: '',
      ig: '',
    },
    bio: [
      'Sở thích: Làm người già?',
      'Kinh nghiệm vẽ truyện tranh: chấp vá qua từng năm, sớm nhất là 7 tuổi',
      'Các đầu truyện/ chap truyện từng sáng tác: 3 truyện nhưng dang dở và bị xếp vô kho',
      'Thể loại truyện tranh yêu thích: Sennen, shounen, adventure,philosophy,psychology, comedy.',
      'Phương châm sáng tác truyện tranh: Chưa nghĩ ra gì nghiêm túc lắm, chỉ là có cảm giác câu chuyện đó cần được ',
    ],
  },
  {
    name: 'Bùi Thanh Hương',
    nickname: 'UMA',
    gender: 'Female',
    age: 33,
    socialLink: {
      fb: 'https://www.facebook.com/profile.php?id=100034749499116',
      be: 'https://www.behance.net/buithanhhuong2811',
      ig: 'https://www.instagram.com/littleluciferinart/',
    },
    bio: [
      'Sở thích : xem phim, đọc sách, thể thao',
      'Kinh nghiệm vẽ truyện tranh: 19 năm ( lớp 7)',
      'Thể loại truyện tranh yêu thích: adventure, shonen, horror, detect',
      'Phương châm sáng tác truyện tranh: vẽ vì tiền thì không vẽ đẹp ',
    ],
  },
  {
    name: 'Huỳnh Ngọc Cường',
    nickname: 'MOFFI',
    gender: 'Male',
    age: 22,
    socialLink: {
      fb: 'https://www.facebook.com/profile.php?id=100091931892797&show_switched_tooltip=false',
      be: '',
      ig: 'https://www.instagram.com/moffingoccuong/',
    },
    bio: [
      'Sở thích: nghe nhạc, ngủ',
      'Kinh nghiệm vẽ truyện tranh: 1 năm',
      'Các đầu truyện/ chap truyện từng sáng tác: ultraV',
      'Thể loại truyện tranh yêu thích: comic phương tây',
      'Phương châm sáng tác truyện tranh: Thỏa mãn việc giải phóng hình ảnh bị mắc kẹt trong đầu',
    ],
  },
  {
    name: 'Nguyễn Đức Phát',
    nickname: 'PHAT BEAR',
    gender: 'Male',
    age: 25,
    socialLink: {
      fb: 'https://www.facebook.com/Nguyen.Duc.Phat.1998',
      be: '',
      ig: '',
    },
    bio: [
      'Sở thích: sáng tác sơn dầu, truyện tranh, đạo diễn phim, biên kịch .',
      'Kinh nghiệm vẽ truyện tranh: 8 năm kể từ truyện đầu tay',
      'Các đầu truyệ/ chap truyện từng sáng tác: người báo ',
      'Thể loại truyện tranh yêu thích: Dark fantsy , horror .',
      'Phương châm sáng tác truyện tranh: kịch bản tốt là cốt lõi, hình ảnh tốt là bắt buộc, chậm chắc.',
    ],
  },
  {
    name: 'Trần Thị Cẩm Tiên',
    nickname: 'TIÊN TRẦN RB',
    gender: 'Female',
    age: 17,
    socialLink: {
      fb: 'https://www.facebook.com/profile.php?id=100085164150318',
      be: '',
      ig: '',
    },
    bio: [
      'Sở thích: vẽ, nhảy, bóng chuyền, nghe nhạc, đi phượt.',
      'Kinh nghiệm vẽ truyện tranh: hơn 10 năm',
      'Các đầu truyện/ chap truyện từng sáng tác: Ghi nhớ',
      'Thể loại truyện tranh yêu thích: psychological, shoujo, Adventure, one shot',
      'Phương châm sáng tác truyện tranh: Làm vì đam mê, vì nghệ thuật',
    ],
  },
]

export default function AboutUs() {
  const { t } = useTranslation()
  const [isSayHi, setIsSayHi] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const sendMsgHandler = async () => {}
  return (
    <>
      <Header />
      <div className='pk-container py-3'>
        <div className='w-full'>
          <div className='flex justify-center gap-3 w-[90%] overflow-hidden ml-auto'>
            <Image src={MonoLogo} alt='' className='w-full max-w-[115px] md:max-w-[235px] lg:max-w-[305px]' />
            <Image src={Img1} alt='' className='w-full max-w-[234px] md:max-w-[405px] lg:max-w-[605px]' />
          </div>
          <p className='text-center mt-3 text-xs leading-[150%] max-w-[90vw] mx-auto md:max-w-[700px]'>
            PUNKGA is a project aimed at building a professional comic platform for comic artists with a Cyberpunk
            theme. The project aims at commercialization through the trading of NFTs created by Manga Artists. Users not
            only own NFTs but can also contribute to becoming part of the story in many ways.
          </p>
        </div>
        <div className='mt-8 md:mt-14 lg:hidden'>
          <Carousel
            setting={{
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: false,
              centerMode: true,
              appendDots: () => <></>,
              customPaging: () => <></>,
            }}>
            <div className='px-3'>
              <Image src={ImgNFT} alt='' className='mx-auto' />
              <p className='text-center'>
                giao dịch những NFT được chính các Manga Creator tạo ra với số lượng giới hạn.
              </p>
            </div>
            <div className='px-3'>
              <Image src={ImgNFT} alt='' className='mx-auto' />
              <p className='text-center'>
                giao dịch những NFT được chính các Manga Creator tạo ra với số lượng giới hạn.
              </p>
            </div>
            <div className='px-3'>
              <Image src={ImgNFT} alt='' className='mx-auto' />
              <p className='text-center'>
                giao dịch những NFT được chính các Manga Creator tạo ra với số lượng giới hạn.
              </p>
            </div>
          </Carousel>
        </div>
        <div className='hidden lg:flex justify-between mt-16'>
          <div className='px-3'>
            <Image src={ImgNFT} alt='' className='mx-auto' />
            <p className='text-center'>
              giao dịch những NFT được chính các Manga Creator tạo ra với số lượng giới hạn.
            </p>
          </div>
          <div className='px-3'>
            <Image src={ImgNFT} alt='' className='mx-auto' />
            <p className='text-center'>
              giao dịch những NFT được chính các Manga Creator tạo ra với số lượng giới hạn.
            </p>
          </div>
          <div className='px-3'>
            <Image src={ImgNFT} alt='' className='mx-auto' />
            <p className='text-center'>
              giao dịch những NFT được chính các Manga Creator tạo ra với số lượng giới hạn.
            </p>
          </div>
        </div>
        <div className='px-3 md:mt-10'>
          <div className='lg:flex justify-start items-center lg:mb-10'>
            <div className='px-2 bg-[#23FF81] rounded-md w-fit mx-auto mt-8 lg:mt-0 lg:mx-0'>
              <h1 className='text-[40px] font-medium'>Authors</h1>
            </div>
            <p className='text-xs max-w-[270px] text-center mx-auto mt-3 lg:mt-0 lg:mx-10 lg:text-left'>
              Meet the skilled and experienced team behind our successful artwork strategies
            </p>
          </div>
          <div className='mt-5 flex flex-col gap-5 lg:flex-row'>
            <div className='lg:w-[calc(50%-10px)] lg:flex-auto flex flex-col gap-5'>
              {authorData.slice(0, Math.ceil(authorData.length / 2)).map((d, i) => (
                <Author key={i} data={d} />
              ))}
            </div>
            <div className='lg:w-[calc(50%-10px)] lg:flex-auto flex flex-col gap-5'>
              {authorData.slice(Math.ceil(authorData.length / 2), authorData.length).map((d, i) => (
                <Author key={i} data={d} />
              ))}
            </div>
          </div>
        </div>
        <div className='lg:flex justify-start items-center lg:mb-10 mt-16'>
          <div className='px-2 bg-[#23FF81] rounded-md w-fit mx-auto mt-8 lg:mt-0 lg:mx-0'>
            <h1 className='text-[40px] font-medium'>Contact Us</h1>
          </div>
          <p className='text-xs max-w-[270px] text-center mx-auto mt-3 lg:mt-0 lg:mx-10 lg:text-left'>
            Connect with Us: Let's Discuss Your Digital Marketing Needs
          </p>
        </div>
        <div className='m-2 p-5 bg-[#f3f3f3] rounded-2xl lg:flex lg:gap-10 lg:py-[80px] lg:justify-center lg:px-[100px] xl:px-[160px]'>
          <div className='lg:w-1/2 lg:h-full'>
            <div className='flex gap-4'>
              <div className='flex gap-2 items-center' onClick={() => setIsSayHi(true)}>
                <div className='border border-black bg-white w-7 h-7 flex justify-center items-center rounded-full'>
                  <span
                    className={` rounded-full h-4 w-4 ${
                      isSayHi ? 'bg-second-color' : 'bg-slate-300'
                    } transition-all`}></span>
                </div>
                <div className='text-lg'>Say Hi</div>
              </div>
              <div className='flex gap-2 items-center' onClick={() => setIsSayHi(false)}>
                <div className='border border-black bg-white w-7 h-7 flex justify-center items-center rounded-full'>
                  <span
                    className={` rounded-full h-4 w-4 ${
                      !isSayHi ? 'bg-second-color' : 'bg-slate-300'
                    } transition-all`}></span>
                </div>
                <div className='text-lg'>Get a Quote</div>
              </div>
            </div>
            <div className='mt-5'>
              <OutlineTextField label={t('Name')} value={name} onChange={setName} placeholder={t('Name')} />
            </div>
            <div className='mt-3'>
              <OutlineTextField label={t('Email')} value={email} onChange={setEmail} placeholder={t('Email')} />
            </div>
            <div className='mt-3'>
              <p>{t('Message')}</p>
              <AutoGrowingTextField
                value={msg}
                onChange={setMsg}
                className='!min-h-[150px] bg-white text-base'
                placeholder={t('Message')}
              />
            </div>
            <FilledButton className='w-full mt-7' size='lg' onClick={sendMsgHandler}>
              {t('Send Message')}
            </FilledButton>
          </div>
          <div className='hidden lg:block max-w-[650px] w-1/2'>
            <Image src={Img2} alt='' />
          </div>
        </div>
      </div>
    </>
  )
}

const Author = ({ data }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='rounded-[45px] border-solid border border-[#191A23] py-5 px-9 shadow-[0px_5px_0px_0px_#191A23] '>
      <div className='flex gap-5'>
        <div className='w-1/3 max-w-[120px]'>
          <Image src={XVector} alt='' />
        </div>
        <div className='w-2/3 flex-auto'>
          <div className='font-medium'>{data.name}</div>
          <div className='flex items-center flex-wrap'>
            <div className='text-second-color text-lg mr-4'>{data.nickname}</div>
            <div className='flex'>
              {data.gender}
              <span>
                <Image src={data.gender.toLowerCase() == 'male' ? MaleIcon : FemaleIcon} alt='' className='w-5' />
              </span>
            </div>
          </div>
          <div>Age: {data.age}</div>
          <div className='flex gap-5 justify-end items-center mt-1'>
            {data.socialLink.fb && <Image src={FbIcon} alt='' onClick={() => window.open(data.socialLink.fb)} />}
            {data.socialLink.be && <Image src={BeIcon} alt='' onClick={() => window.open(data.socialLink.be)} />}
            {data.socialLink.ig && <Image src={IgIcon} alt='' onClick={() => window.open(data.socialLink.ig)} />}
          </div>
        </div>
      </div>
      <div className='w-full my-5 flex items-center gap-1'>
        <div className='flex-auto h-[2px] bg-black'></div>
        <div
          className='w-fit flex gap-3 items-center justify-center px-5 py-1 rounded-full bg-primary-color cursor-pointer'
          onClick={() => setOpen(!open)}>
          <ChevronDownIcon className={`w-5 ${open ? 'rotate-180' : 'rotate-0'} transition-all`} />
          <p className='text-sm leading-[125%] font-semibold'>{open ? 'Hide info' : 'Show info'}</p>
        </div>
      </div>
      <ul className={`list-disc list-inside transition-all overflow-hidden ${open ? 'max-h-[500px]' : 'max-h-[0px]'}`}>
        {data.bio.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
