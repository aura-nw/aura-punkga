import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import UserGreen from 'assets/images/userGreen.svg'
import { useState } from 'react'
import ReactShowMoreText from 'react-show-more-text'
import pluralize from 'pluralize'
export default function Post({ data }) {
  const languageData = data.manga_languages.find((e) => e.is_main_language)
  const chapterImages = data.chapters[0]?.chapter_languages?.find((e) => e.language.is_main)?.detail || []
  const [likeCount, setLikeCount] = useState(data.manga_total_likes?.likes || 0)
  if (chapterImages.length == 0) return null
  return (
    <div className='space-y-4'>
      {data.manga_creators.length > 1 ? (
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 relative'>
            <Image
              src={data.manga_creators[1].creator.avatar_url || UserGreen}
              alt=''
              width={40}
              height={40}
              className='w-7 h-7 rounded-full object-cover absolute top-0 right-0'
            />
            <Image
              src={data.manga_creators[0].creator.avatar_url || UserGreen}
              alt=''
              width={40}
              height={40}
              className='w-7 h-7 rounded-full object-cover absolute bottom-0 left-0 bg-black'
            />
          </div>
          <div className='space-y-1'>
            <div className='text-sm font-semibold text-text-brand-focus'>
              {data.manga_creators.map((e) => e.creator.name || e.creator.pen_name).join(', ')}
            </div>
            <div className='text-xxs text-neutral-400'>{moment(data.latest_published).fromNow()}</div>
          </div>
        </div>
      ) : (
        <Link href={`/artist/${data.manga_creators[0].creator.slug}`} className='flex items-center gap-4'>
          <Image
            src={data.manga_creators[0].creator.avatar_url || UserGreen}
            alt=''
            width={40}
            height={40}
            className='w-10 h-10 rounded-full object-cover'
          />
          <div className='space-y-1'>
            <div className='text-sm font-semibold text-text-brand-focus'>
              {data.manga_creators[0].creator.pen_name || data.manga_creators[0].creator.name}
            </div>
            <div className='text-xxs text-neutral-400'>{moment(data.latest_published).fromNow()}</div>
          </div>
        </Link>
      )}
      <Link href={`/comic/${data.slug}`} className='block'>
        <div className='text-lg font-medium'>{languageData?.title}</div>
        <div className='space-y-1.5'>
          <ReactShowMoreText
            lines={2}
            more='View more'
            less='View less'
            className='text-sm'
            anchorClass='text-text-info-primary text-sm font-medium'
            expanded={false}
            truncatedEndingComponent={'... '}>
            {languageData.description}
          </ReactShowMoreText>
        </div>
      </Link>
      <div className='space-y-2'>
        <Link href={`/comic/${data.slug}`} className='w-full h-full block aspect-square'>
          {chapterImages.length == 1 ? (
            <Image
              width={300}
              height={300}
              src={chapterImages[0].image_path}
              alt=''
              className='w-full h-full object-cover'
            />
          ) : chapterImages.length == 2 ? (
            <div className='w-full h-full grid grid-cols-2 gap-2'>
              <Image
                width={300}
                height={300}
                src={chapterImages[0].image_path}
                alt=''
                className='w-full h-full object-cover'
              />
              <Image
                width={300}
                height={300}
                src={chapterImages[1].image_path}
                alt=''
                className='w-full h-full object-cover'
              />
            </div>
          ) : (
            <div className='w-full h-full grid grid-cols-2 gap-2'>
              <Image
                width={300}
                height={300}
                src={chapterImages[0].image_path}
                alt=''
                className='w-full h-full object-cover min-h-0'
              />
              <div className='grid grid-cols-1 gap-2 h-full min-h-0'>
                <Image
                  width={300}
                  height={300}
                  src={chapterImages[1].image_path}
                  alt=''
                  className='w-full h-full object-cover min-h-0'
                />
                <div className='w-full h-full relative min-h-0'>
                  <Image
                    width={300}
                    height={300}
                    src={chapterImages[2].image_path}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                  {chapterImages.length > 3 && (
                    <div className='absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center text-lg font-medium'>
                      +{chapterImages.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Link>
        <div className='text-xs font-semibold text-neutral-400 leading-8'>
          {likeCount} {pluralize('likes', likeCount)}
        </div>
        <div className='h-8 flex items-center justify-between'>
          <div className='flex items-center gap-1 text-sm font-semibold'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.17115 5.17232C3.92126 4.42244 4.93849 4.00118 5.99915 4.00118C7.0598 4.00118 8.07703 4.42244 8.82714 5.17232L9.99914 6.34332L11.1711 5.17232C11.5401 4.79028 11.9815 4.48555 12.4695 4.27592C12.9575 4.06628 13.4824 3.95594 14.0135 3.95132C14.5447 3.94671 15.0714 4.04791 15.563 4.24904C16.0545 4.45016 16.5012 4.74717 16.8767 5.12274C17.2523 5.49832 17.5493 5.94492 17.7504 6.43651C17.9516 6.92809 18.0528 7.45481 18.0481 7.98593C18.0435 8.51705 17.9332 9.04193 17.7235 9.52994C17.5139 10.018 17.2092 10.4593 16.8271 10.8283L9.99914 17.6573L3.17115 10.8283C2.42126 10.0782 2 9.06098 2 8.00032C2 6.93967 2.42126 5.92244 3.17115 5.17232V5.17232Z'
                stroke='#F6F6F6'
                strokeWidth='1.5'
                strokeLinejoin='round'
              />
            </svg>
            Like
          </div>
          <div className='flex items-center gap-1 text-sm font-semibold'>
            View all chapters
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10 7L15 12L10 17'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
