import DummyComic from 'components/DummyComponent/comic'
import Comic2 from 'components/pages/homepage/comic2'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { getLatestComic } from 'src/services'

export default function ComicList() {
  const latestComic = useApi<IComic[]>(getLatestComic, true, [])
  return (
    <div className='mt-9 lg:mt-16'>
      <h1 className='font-bold lg:text-xl'>Artworks</h1>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[18px] lg:gap-6 mt-4 lg:mt-6'>
        {latestComic.loading
          ? Array.apply(null, Array(20)).map((d, index) => {
              return <DummyComic key={index} />
            })
          : latestComic.data?.length
          ? latestComic.data
              .filter((data: any) => data.tags.some((lang: any) => lang.en.toLowerCase() == 'invent contest'))
              .map((data, index) => {
                return <Comic2 key={index} {...data} />
              })
          : null}
      </div>
    </div>
  )
}
