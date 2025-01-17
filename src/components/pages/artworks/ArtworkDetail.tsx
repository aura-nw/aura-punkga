import Copy2Clipboard from 'components/Copy2Clipboard'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import DOMPurify from 'dompurify'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import ReactShowMoreText from 'react-show-more-text'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { eventService } from 'src/services/eventService'
import { formatNumber, shorten } from 'src/utils'

export default function ArtworkDetail({ data }) {
  const { setSignInOpen } = useContext(ModalContext)
  const { account } = useContext(Context)
  const [likeCount, setLikeCount] = useState(data?.artwork?.likes_aggregate?.aggregate?.count || 0)
  const [isLiked, setIsLiked] = useState(data?.artwork?.likes?.length > 0)
  const likeHandler = async () => {
    try {
      if (!account) {
        setSignInOpen(true)
        return
      }
      if (isLiked) {
        setLikeCount((prev) => prev - 1)
        setIsLiked(false)
        await eventService.story.unlikeArtwork(data?.artwork?.id)
      } else {
        const newLikeCount = likeCount + 1
        setLikeCount(newLikeCount)
        setIsLiked(true)
        await eventService.story.likeArtwork(data?.artwork?.id)
      }
    } catch (error) {
      toast(error.message, {
        type: 'error',
      })
    }
  }
  return (
    <div>
      <Image src={data.artwork.url} alt='' className='w-full aspect-square object-cover' width={500} height={500} />
      <div className='mt-4'>
        <div className='h-8 flex items-center justify-between'>
          <div onClick={likeHandler} className='cursor-pointer flex items-center gap-1 text-sm font-semibold'>
            {isLiked ? (
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='red'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3.17115 5.17232C3.92126 4.42244 4.93849 4.00118 5.99915 4.00118C7.0598 4.00118 8.07703 4.42244 8.82714 5.17232L9.99914 6.34332L11.1711 5.17232C11.5401 4.79028 11.9815 4.48555 12.4695 4.27592C12.9575 4.06628 13.4824 3.95594 14.0135 3.95132C14.5447 3.94671 15.0714 4.04791 15.563 4.24904C16.0545 4.45016 16.5012 4.74717 16.8767 5.12274C17.2523 5.49832 17.5493 5.94492 17.7504 6.43651C17.9516 6.92809 18.0528 7.45481 18.0481 7.98593C18.0435 8.51705 17.9332 9.04193 17.7235 9.52994C17.5139 10.018 17.2092 10.4593 16.8271 10.8283L9.99914 17.6573L3.17115 10.8283C2.42126 10.0782 2 9.06098 2 8.00032C2 6.93967 2.42126 5.92244 3.17115 5.17232V5.17232Z'
                  stroke='red'
                  strokeWidth='1.5'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
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
            )}
            {formatNumber(likeCount)}
          </div>
          <Dropdown>
            <DropdownToggle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className='cursor-pointer'>
                <path
                  d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </DropdownToggle>
            <DropdownMenu customClass='right-0'>
              <div className='p-4 rounded-lg bg-gray-900 text-white space-y-4 text-sm'>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    navigator.share({
                      url: location.href,
                    })
                  }}>
                  Share
                </div>
                {data.story_ip_asset.ip_asset_id && (
                  <Link
                    className='block'
                    target='_blank'
                    href={`${getConfig().STORY_EXPLORER_URL}/ipa/${data.story_ip_asset.ip_asset_id}`}>
                    View on Story Protocol
                  </Link>
                )}
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className='mt-4 space-y-1.5'>
          <div className='text-lg font-medium'>{data.artwork.name}</div>
          <div className='w-fit text-sm'>
            by{' '}
            <Link target='_blank' href={`/artist/${data?.artwork?.creator?.slug}`} className='text-text-brand-defaul'>
              {data?.artwork?.creator?.pen_name || data?.artwork?.authorizer_user?.nickname || 'Unknown creator'}
            </Link>
          </div>
          <div className='h-[18px] flex items-center gap-1.5 leading-tight'>
            IP ID:{' '}
            <Link
              target='_blank'
              href={`${getConfig().STORY_EXPLORER_URL}/ipa/${data.story_ip_asset.ip_asset_id}`}
              className='text-text-brand-defaul'>
              {shorten(data?.story_ip_asset?.ip_asset_id)}
            </Link>{' '}
            <Copy2Clipboard text={data?.story_ip_asset?.ip_asset_id} />
          </div>
        </div>
        <div className='mt-4'>
          <ReactShowMoreText
            lines={2}
            more='View more'
            less='View less'
            className='text-sm'
            anchorClass='text-text-info-primary text-sm font-medium'
            expanded={false}
            truncatedEndingComponent={'... '}>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.artwork.description) }}></div>
          </ReactShowMoreText>
        </div>
      </div>
    </div>
  )
}
