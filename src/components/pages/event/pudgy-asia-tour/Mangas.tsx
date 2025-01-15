import { Pagination } from '@mui/material'
import DummyComic from 'components/DummyComponent/comic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { getLatestComic } from 'src/services'

export default function Mangas() {
  const { t } = useTranslation()
  const latestComic = useApi<IComic[]>(getLatestComic, true, [])
  const [page, setPage] = useState(1)
  const [useableComic, setUseableComic] = useState<any>()
  useEffect(() => {
    const comic = latestComic.data?.filter((data: any) =>
      data.tags.some((lang: any) => lang.en.toLowerCase() === 'pudgy asia tour')
    )
    setUseableComic(comic)
  }, [latestComic.data])
  if (!useableComic?.length) return null
  return (
    <div className='pt-20 pk-container'>
      <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[36px] md:text-[64px] leading-[47px] md:leading-[84px] font-black text-stroke'>
        {t('Mangas')}
      </div>
      <div className='flex gap-8 md:gap-16 mt-8 md:mt-16 flex-col items-center'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 md:gap-8 w-full'>
          {latestComic.loading
            ? null
            : useableComic?.length
            ? useableComic.slice((page - 1) * 12, page * 12).map((data, index) => <Manga key={index} {...data} />)
            : null}
        </div>
        {!!useableComic?.length && (
          <Pagination
            shape='rounded'
            page={page}
            className='[&_.Mui-selected]:!bg-[#FABA77] [&_.Mui-selected]:!text-text-primary [&_.MuiPaginationItem-root:not(.Mui-selected)]:!text-text-quatenary'
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value)
            }}
            count={Math.ceil(useableComic?.length / 12)}
          />
        )}
      </div>
    </div>
  )
}
const Manga = (props) => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <Link
      target='_blank'
      href={isMobile ? `/comic/${props.slug}` : `/comic/${props.slug}/chapter/1`}
      className='[&:hover_.shadow]:visible relative'>
      <div className='relative'>
        <div className='absolute w-full h-full -bottom-1.5 -right-1.5 bg-black rounded-xl invisible shadow'></div>
        <Image
          width={400}
          height={600}
          src={props.image}
          alt=''
          className=' relative w-full aspect-[164/230] object-cover rounded-xl border border-black'
        />
      </div>
      <div className='hidden lg:block mt-4'>
        <div className='trailer-font font-black text-[32px] leading-[47px]'>{props['en'].title}</div>
        <div className='estedad-font text-[24px] leading-[35px] font-semibold flex gap-1'>
          by{' '}
          <span>
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span className=' first:hidden'>, </span>
                <span className=''>
                  {author.slug ? (
                    <div
                      className='author'
                      onClick={(e) => {
                        router.push(`/artist/${author.slug}`)
                        e.stopPropagation()
                        e.preventDefault()
                      }}>
                      {t(author.name)}
                    </div>
                  ) : (
                    t(author.name)
                  )}
                </span>
              </Fragment>
            ))}
          </span>
        </div>
      </div>
    </Link>
  )
}
