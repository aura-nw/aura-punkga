import DummyComic from 'components/DummyComponent/comic'
import Manga from "components/pages/homepage/manga"
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { getLatestComic } from 'src/services'

export default function ComicList() {
  const { t } = useTranslation()
  const latestComic = useApi<IComic[]>(getLatestComic, true, [])
  const [useableComic, setUseableComic] = useState<any>()
  useEffect(() => {
    const comic = latestComic.data?.filter((data: any) =>
      data.tags.some((lang: any) => lang.en.toLowerCase() === 'invent contest')
    )
    setUseableComic(comic)
  }, [latestComic.data])
  return (
    <div className='mt-9 lg:mt-16'>
      <h1 className='font-bold lg:text-xl'>{t('Mangas')}</h1>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[18px] lg:gap-6 mt-4 lg:mt-6'>
        {latestComic.loading
          ? Array.apply(null, Array(20)).map((d, index) => <DummyComic key={index} />)
          : latestComic.data?.length
          ? useableComic.map((data, index) => <Manga key={index} {...data} />)
          : null}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
