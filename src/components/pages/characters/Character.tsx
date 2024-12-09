import Copy2Clipboard from 'components/Copy2Clipboard'
import Modal from 'components/core/Modal'
import Dropdown, { DropdownToggle, DropdownMenu } from 'components/Dropdown'
import { id } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { eventService } from 'src/services/eventService'
import { formatNumber, shorten } from 'src/utils'
import { useWindowSize } from 'usehooks-ts'
import ReactHtmlParser from 'react-html-parser'

export default function Character({ data }) {
  const [isLiked, setIsLiked] = useState(data.likes.length > 0)
  const [likeCount, setLikeCount] = useState(data.likes_aggregate.aggregate.count)
  const { setSignInOpen } = useContext(ModalContext)
  const { width } = useWindowSize()
  const { account } = useContext(Context)
  const [openDetail, setOpenDetail] = useState(false)
  const likeHandler = async () => {
    try {
      if (!account) {
        setSignInOpen(true)
        return
      }
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
      setIsLiked((prevState) => !prevState)
      if (isLiked) {
        await eventService.story.unlikeCharacter(data.id)
      } else {
        await eventService.story.likeCharacter(data.id)
      }
    } catch (error) {
      toast(error.message, {
        type: 'error',
      })
    }
  }
  return (
    <>
      <div className='w-full' onClick={() => (width >= 1024 ? setOpenDetail(true) : null)}>
        <div className='relative cursor-pointer lg:[&:hover_.info]:block rounded-lg overflow-hidden'>
          <Image src={data.avatar_url} alt='' width={600} height={600} className='w-full aspect-square  object-cover' />
          {data.is_default_character && (
            <div className='text-xs font-bold py-1 px-2 rounded-full bg-white text-black absolute top-5 right-4'>
              Sponsored
            </div>
          )}
          <div className='info absolute hidden w-full bottom-0 p-2 lg:pt-10 lg:p-4 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_6.71%,#000_76.24%)]'>
            <div className='text-sm font-bold text-white'>{data?.name || 'Unknown artwork title'}</div>
            <div className='text-sm font-medium text-white'>
              by{' '}
              <span className='text-text-brand-hover'>
                {data?.creator?.pen_name || data?.authorizer_user?.nickname || 'Unknown creator'}
              </span>
            </div>
          </div>
        </div>
        <div className='lg:hidden'>
          <div className='mt-4 flex justify-between items-center'>
            <div className='flex items-center gap-1 cursor-pointer w-fit' onClick={likeHandler}>
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3.17115 5.17428C3.92126 4.42439 4.93849 4.00313 5.99915 4.00313C7.0598 4.00313 8.07703 4.42439 8.82714 5.17428L9.99914 6.34528L11.1711 5.17428C11.5401 4.79224 11.9815 4.48751 12.4695 4.27787C12.9575 4.06824 13.4824 3.95789 14.0135 3.95328C14.5447 3.94866 15.0714 4.04987 15.563 4.25099C16.0545 4.45211 16.5012 4.74913 16.8767 5.1247C17.2523 5.50027 17.5493 5.94688 17.7504 6.43846C17.9516 6.93005 18.0528 7.45676 18.0481 7.98788C18.0435 8.519 17.9332 9.04388 17.7235 9.5319C17.5139 10.0199 17.2092 10.4613 16.8271 10.8303L9.99914 17.6593L3.17115 10.8303C2.42126 10.0802 2 9.06293 2 8.00228C2 6.94162 2.42126 5.92439 3.17115 5.17428V5.17428Z'
                  stroke='#fff'
                  fill={isLiked ? 'red' : 'none'}
                  strokeWidth='1.5'
                  strokeLinejoin='round'
                />
              </svg>
              <span className='text-sm font-semibold'>{formatNumber(likeCount)}</span>
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
                <div className='p-4 rounded-lg bg-white text-black space-y-4 text-xs'>
                  <Link
                    className='block'
                    target='_blank'
                    href={`https://odyssey.explorer.story.foundation/ipa/${data?.story_ip_asset?.ip_asset_id}`}>
                    View on Story Protocol
                  </Link>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className='mt-4 space-y-1.5'>
            <div className='text-lg font-medium'>{data.name}</div>
            <div className='w-fit text-xs'>
              by{' '}
              {data?.creator?.pen_name ? (
                <Link target='_blank' href={`/artist/${data?.creator?.slug}`} className='text-text-brand-defaul'>
                  {data?.creator?.pen_name}
                </Link>
              ) : (
                <span className='text-text-brand-defaul'>{data?.authorizer_user?.nickname}</span>
              )}
            </div>
            <div className='h-[18px] text-xs flex items-center gap-1.5 leading-tight'>
              IP ID:{' '}
              <Link
                target='_blank'
                href={`https://odyssey.explorer.story.foundation/ipa/${data?.story_ip_asset?.ip_asset_id}`}
                className='text-text-brand-defaul'>
                {shorten(data?.story_ip_asset?.ip_asset_id)}
              </Link>{' '}
              <Copy2Clipboard text={data?.story_ip_asset?.ip_asset_id}>
                {' '}
                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                  <path
                    d='M8.98537 5.24688V7.27188C8.98537 7.64467 9.28758 7.94688 9.66037 7.94688H11.6854M13.0354 2.54688H8.31021C7.56463 2.54688 6.96021 3.15129 6.96021 3.89687V5.24688M13.0354 2.54688H13.4119C13.602 2.54688 13.783 2.62694 13.9139 2.76472C14.1107 2.97178 14.4225 3.29058 14.7229 3.55938C14.9583 3.77004 15.3282 4.14811 15.5497 4.37789C15.6695 4.50215 15.7354 4.66806 15.7354 4.84066L15.7354 5.24688M13.0354 2.54688V4.57188C13.0354 4.94467 13.3376 5.24688 13.7104 5.24688H15.7354M15.7354 5.24688L15.7352 11.9969C15.7352 12.7425 15.1308 13.3469 14.3852 13.3469H11.6852M10.6729 6.25938C10.3725 5.99058 10.0607 5.67178 9.86391 5.46472C9.73295 5.32694 9.55201 5.24688 9.36192 5.24688H4.26021C3.51463 5.24688 2.91021 5.85129 2.91021 6.59687L2.91016 14.6968C2.91015 15.4424 3.51457 16.0468 4.26015 16.0469L10.3352 16.0469C11.0808 16.0469 11.6852 15.4425 11.6852 14.6969L11.6854 7.54066C11.6854 7.36806 11.6195 7.20215 11.4997 7.07789C11.2782 6.84812 10.9083 6.47004 10.6729 6.25938Z'
                    stroke='#fff'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Copy2Clipboard>
            </div>
          </div>
          <div className='mt-5'></div>
        </div>
      </div>
      <Modal open={openDetail} setOpen={setOpenDetail}>
        <div className='p-8 max-w-screen-xl'>
          <div className='mt-3 md:mt-0 text-start'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-9'>
              <Image
                src={data?.avatar_url}
                alt=''
                width={446}
                height={446}
                className='rounded-lg w-full aspect-square border-[3px] border-neutral-black object-cover'
              />
              <div className='relative'>
                <div className='text-xs font-medium space-y-1.5'>
                  <div className='flex items-start gap-8'>
                    <div className='text-lg font-medium w-full'>{data?.name}</div>
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
                        <div className='p-4 rounded-lg bg-white text-black space-y-4 text-xs'>
                          <Link
                            className='block'
                            target='_blank'
                            href={`https://odyssey.explorer.story.foundation/ipa/${data?.story_ip_asset?.ip_asset_id}`}>
                            View on Story Protocol
                          </Link>
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className='w-fit'>
                    by{' '}
                    {data?.creator?.pen_name ? (
                      <Link target='_blank' href={`/artist/${data?.creator?.slug}`} className='text-text-brand-defaul'>
                        {data?.creator?.pen_name}
                      </Link>
                    ) : (
                      <span className='text-text-brand-defaul'>{data?.authorizer_user?.nickname}</span>
                    )}
                  </div>
                  <div className='h-[18px] flex items-center gap-1.5 leading-tight'>
                    IP ID:{' '}
                    <Link
                      target='_blank'
                      href={`https://odyssey.explorer.story.foundation/ipa/${data?.story_ip_asset?.ip_asset_id}`}
                      className='text-text-brand-defaul'>
                      {shorten(data?.story_ip_asset?.ip_asset_id)}
                    </Link>{' '}
                    <Copy2Clipboard text={data?.story_ip_asset?.ip_asset_id}>
                      {' '}
                      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                        <path
                          d='M8.98537 5.24688V7.27188C8.98537 7.64467 9.28758 7.94688 9.66037 7.94688H11.6854M13.0354 2.54688H8.31021C7.56463 2.54688 6.96021 3.15129 6.96021 3.89687V5.24688M13.0354 2.54688H13.4119C13.602 2.54688 13.783 2.62694 13.9139 2.76472C14.1107 2.97178 14.4225 3.29058 14.7229 3.55938C14.9583 3.77004 15.3282 4.14811 15.5497 4.37789C15.6695 4.50215 15.7354 4.66806 15.7354 4.84066L15.7354 5.24688M13.0354 2.54688V4.57188C13.0354 4.94467 13.3376 5.24688 13.7104 5.24688H15.7354M15.7354 5.24688L15.7352 11.9969C15.7352 12.7425 15.1308 13.3469 14.3852 13.3469H11.6852M10.6729 6.25938C10.3725 5.99058 10.0607 5.67178 9.86391 5.46472C9.73295 5.32694 9.55201 5.24688 9.36192 5.24688H4.26021C3.51463 5.24688 2.91021 5.85129 2.91021 6.59687L2.91016 14.6968C2.91015 15.4424 3.51457 16.0468 4.26015 16.0469L10.3352 16.0469C11.0808 16.0469 11.6852 15.4425 11.6852 14.6969L11.6854 7.54066C11.6854 7.36806 11.6195 7.20215 11.4997 7.07789C11.2782 6.84812 10.9083 6.47004 10.6729 6.25938Z'
                          stroke='#fff'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Copy2Clipboard>
                  </div>
                </div>
                <p className='text-sm w-full mt-4 whitespace-pre-wrap'>{ReactHtmlParser(data?.description)}</p>
                <div className='flex items-center gap-1 mt-3 cursor-pointer w-fit' onClick={likeHandler}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M3.17115 5.17428C3.92126 4.42439 4.93849 4.00313 5.99915 4.00313C7.0598 4.00313 8.07703 4.42439 8.82714 5.17428L9.99914 6.34528L11.1711 5.17428C11.5401 4.79224 11.9815 4.48751 12.4695 4.27787C12.9575 4.06824 13.4824 3.95789 14.0135 3.95328C14.5447 3.94866 15.0714 4.04987 15.563 4.25099C16.0545 4.45211 16.5012 4.74913 16.8767 5.1247C17.2523 5.50027 17.5493 5.94688 17.7504 6.43846C17.9516 6.93005 18.0528 7.45676 18.0481 7.98788C18.0435 8.519 17.9332 9.04388 17.7235 9.5319C17.5139 10.0199 17.2092 10.4613 16.8271 10.8303L9.99914 17.6593L3.17115 10.8303C2.42126 10.0802 2 9.06293 2 8.00228C2 6.94162 2.42126 5.92439 3.17115 5.17428V5.17428Z'
                      stroke='#fff'
                      fill={isLiked ? 'red' : 'none'}
                      strokeWidth='1.5'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span className='text-sm font-semibold'>{formatNumber(likeCount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
