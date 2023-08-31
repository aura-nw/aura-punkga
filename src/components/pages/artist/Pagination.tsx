import { useState } from 'react'
import ArrowIcon from 'images/icons/Alt Arrow Left.svg'
import Image from 'next/image'
export default function Pagination({
  length,
  currentPage,
  setCurrentPage,
}: {
  length: number
  currentPage: number
  setCurrentPage: any
}) {
  return (
    <div className='mx-auto flex gap-5 [&>div]:text-sm lg:[&>div]:text-xl [&>div.active]:font-extrabold [&>div]:cursor-pointer [&>div.active]:text-second-color [&>div]:leading-6 items-center text-medium-gray'>
      <div onClick={() => (currentPage > 1 ? setCurrentPage(currentPage - 1) : null)}>
        <Image src={ArrowIcon} alt='' className='w-[18px] aspect-square' />
      </div>
      {[...(Array(length).keys() as any)].map((i) => {
        const index = i + 1
        let shouldDisplay =
          index == currentPage ||
          length <= 5 ||
          index == 1 ||
          index == length ||
          (currentPage <= 3 && index <= 5) ||
          (currentPage >= length - 2 && index >= length - 4) ||
          index == currentPage - 1 ||
          index == currentPage + 1
        if (!shouldDisplay) {
          if (index == 2) {
            return <span>...</span>
          }
          if (index == length - 1) {
            return <span>...</span>
          }
          return <></>
        }
        return (
          <div
            key={i}
            className={currentPage == index && 'active'}
            onClick={() => {
              setCurrentPage(index)
            }}>
            {i + 1}
          </div>
        )
      })}
      <div onClick={() => (currentPage < length ? setCurrentPage(currentPage + 1) : null)}>
        <Image src={ArrowIcon} alt='' className='w-[18px] aspect-square rotate-180' />
      </div>
    </div>
  )
}
