import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'
import NoImage from 'images/no_img.png'

export default function ComicCard({ variant, data }: { variant?: string; data: IComic }) {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <div className='w-full flex gap-[7px] relative'>
      <div>
        <Image
          src={data.image || NoImage}
          alt=''
          width={150}
          height={200}
          className='w-[150px] aspect-[15/20] rounded-[5px]'
        />
      </div>
      <div className='flex-1 pl-[5px]'>
        <div className='text-second-color text-sm leading-[18px] font-extrabold'>{data[locale].title}</div>
      </div>
    </div>
  )
}
