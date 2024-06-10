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
const artistData = [
  {
    image: A7,
    name: 'Ruzatori',
    des: 'This is the artist of the X famous manga.',
  },
  {
    image: A1,
    name: 'Lương Minh Quang',
    des: 'This is the artist of the X famous manga.',
  },
  {
    image: A8,
    name: 'Đỗ Đình Cương',
    des: 'This is the artist of the X famous manga. This is the artist of the X famous manga.',
  },
  {
    image: A2,
    name: 'Tuong Pham',
    des: 'This is the artist of the X famous manga. This is the artist of the X famous manga.',
  },
  {
    image: A3,
    name: 'Manh Ho',
    des: 'This is the artist of the X famous manga.',
  },
  {
    image: A4,
    name: 'Miroles Wilson',
    des: 'This is the artist of the X famous manga.',
  },
  {
    image: A5,
    name: 'Phyllocactus',
    des: 'This is the artist of the X famous manga.',
  },
  {
    image: A6,
    name: 'Thất Long Gia',
    des: 'This is the artist of the X famous manga.',
  },
  {
    image: A9,
    name: 'Linh Rab Nguyen',
    des: 'This is the artist of the X famous manga.',
  },
]
export default function JudgeBoard() {
  return (
    <div className='mt-10 lg:mt-16'>
      <h1 className='font-bold lg:text-xl'>Judge board</h1>
      <div className='mt-4 grid gap-4 lg:gap-5 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]'>
        {artistData.map((data, i) => {
          return (
            <div key={i} className='p-2 bg-[#F0F0F0] rounded-xl'>
              <Image src={data.image} alt='' className='w-full aspect-square object-cover rounded-lg' />
              <div className='mt-[10px] '>
                <div className='w-full text-center font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[18px] lg:text-base lg:leading-5'>
                  {data.name}
                </div>
                <div className='w-full leading-[15px] text-xs lg:text-sm lg:leading-[18px]'>{data.des}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
