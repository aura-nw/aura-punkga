import { Pagination } from '@mui/material'
import Manga from '../homepage/manga'
import { useState } from 'react'
import Mc from 'assets/images/mascot-empty.png'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
export default function CollectionList({ list }) {
  const [page, setPage] = useState(1)
  console.log(list)
  const { t } = useTranslation()
  return (
    <div>
      {list?.length ? (
        <div className='grid grid-cols-2 gap-y-8 gap-x-[22px]'>
          {list?.slice((page - 1) * 20, page * 20)?.map((comic, index) => (
            <div key={index}>
              <Manga {...comic} />
            </div>
          ))}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 py-8'>
          <Image src={Mc} alt='' className='w-[160px] h-[160px]' />
          <div className='font-medium'>{t('No collection found')}</div>
        </div>
      )}
      {!!list.length && (
        <div className='w-full flex justify-center -mt-8'>
          <Pagination
            shape='rounded'
            count={Math.ceil(list?.length / 20)}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value)
            }}
          />
        </div>
      )}
    </div>
  )
}
