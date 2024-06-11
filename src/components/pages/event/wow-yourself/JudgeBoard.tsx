import Image from 'next/image'
import A7 from '../assets/artist/Ruzatori.jpg'
import A8 from '../assets/artist/do-dinh-cuong.png'
import A1 from '../assets/artist/luong-minh-quang.jpg'
import A2 from '../assets/artist/tuong-pham.jpg'
import A3 from '../assets/artist/manh-ho.png'
import A4 from '../assets/artist/miroles.jpg'
import A5 from '../assets/artist/Phyllocactus.png'
import A6 from '../assets/artist/that-long-gia.jpg'
import A9 from '../assets/artist/linh-rab-nguyen.jpg'
import A10 from '../assets/artist/punkga.jpg'
import { useTranslation } from 'react-i18next'
const artistData = [
  {
    image: A10,
    name: 'Brand Spokesperson Punkga',
    des: 'A good story is defined by how we tell it',
  },
  {
    image: A8,
    name: 'Do Dinh Cuong',
    des: 'The author is the first reader who needs to be satisfied',
  },
  {
    image: A7,
    name: 'Hoang Trong Thien',
    des: 'To pursue dreams, go to sleep',
  },
  {
    image: A9,
    name: 'Linh Rab Nguyen',
    des: 'A wandering comic artist, an urban poor, and occasionally a teacher',
  },
  {
    image: A1,
    name: 'Luong Minh Quang',
    des: 'Enjoys part-time drawing',
  },
  {
    image: A3,
    name: 'Manh Ho',
    des: 'Happiness is simply cat memes and having people read my comics',
  },
  {
    image: A4,
    name: 'Miroles Wilson',
    des: 'Speed is the key to opening doors, balance keeps the lock steady, and optimization makes everything run smoothly',
  },
  {
    image: A5,
    name: 'Phyllocactus',
    des: 'The most persistent comic artist in Vietnam',
  },
  {
    image: A2,
    name: 'Tuong Pham',
    des: 'A storyteller who became an artist because of poor writing skills',
  },
  {
    image: A6,
    name: 'That Long Gia',
    des: 'Living and working to bring beauty to the world',
  },
]
export default function JudgeBoard() {
  const { t } = useTranslation()
  return (
    <div className='mt-9 lg:mt-16'>
      <h1 className='font-bold lg:text-xl'>{t('Judge board')}</h1>
      <div className='mt-4 grid gap-4 lg:gap-5 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]'>
        {artistData.map((data, i) => {
          return (
            <div key={i} className='p-2 bg-[#F0F0F0] rounded-xl'>
              <Image src={data.image} alt='' className='w-full aspect-square object-cover rounded-lg' />
              <div className='mt-[10px] '>
                <div className='w-full font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[18px] lg:text-base lg:leading-5'>
                  {t(data.name)}
                </div>
                <div className='w-full leading-[15px] text-xs lg:text-sm lg:leading-[18px]'>{t(data.des)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
