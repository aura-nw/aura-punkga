import ComicCard from 'components/Comic/ComicCard'
import Layout from 'components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useContext } from 'react'
import { Context } from 'src/context'
import { userService } from 'src/services/userService'
import useSWR from 'swr'
import Banner from 'components/pages/explore/assets/Banner.png'
import MangaImage from 'components/pages/explore/assets/manga.png'
import ArtworkImage from 'components/pages/explore/assets/artwork.png'
import EventImage from 'components/pages/explore/assets/event.png'
import CampaignImage from 'components/pages/explore/assets/camp.png'
import CharacterImage from 'components/pages/explore/assets/character.png'
import Link from 'next/link'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Explore />
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
function Explore() {
  const { account } = useContext(Context)
  const { data: subscriptionList } = useSWR({ key: 'get-subscriptions', id: account?.id }, ({ id }) =>
    id ? userService.getSubscriptionList(id) : null
  )
  return (
    <div className='bg-background p-4 min-h-screen text-white space-y-4'>
      <Image src={Banner} alt='' className='w-full rounded-md aspect-[343/80] object-cover' />
      <Link
        href={'/explore/manga'}
        className='flex gap-4 h-[90px] w-full px-[18px] bg-neutral-black rounded-lg items-center'>
        <Image src={MangaImage} alt='' className='h-full w-[70px] object-cover' />
        <div className='flex items-center justify-between w-full'>
          <div className='space-y-1'>
            <div className='text-sm font-semibold text-neutral-50'>Manga</div>
            <div className='flex items-center gap-1 text-neutral-300 text-xs'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path
                  d='M5 11H11M5 8.75H11M14 11.75V4.25C14 3.00736 12.9926 2 11.75 2L4.25 2C3.00736 2 2 3.00736 2 4.25L2 11.75C2 12.9926 3.00736 14 4.25 14H11.75C12.9926 14 14 12.9926 14 11.75Z'
                  stroke='#B0B0B0'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>56453</span>
            </div>
          </div>
          <div className='w-6 h-6 rounded-full bg-white'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M10 7L15 12L10 17'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        href={'/explore/artwork'}
        className='flex gap-4 h-[90px] w-full px-[18px] bg-neutral-black rounded-lg items-center'>
        <Image src={ArtworkImage} alt='' className='h-full w-[70px] object-cover' />
        <div className='flex items-center justify-between w-full'>
          <div className='space-y-1'>
            <div className='text-sm font-semibold text-neutral-50'>Artwork</div>
            <div className='flex items-center gap-1 text-neutral-300 text-xs'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path
                  d='M5 11H11M5 8.75H11M14 11.75V4.25C14 3.00736 12.9926 2 11.75 2L4.25 2C3.00736 2 2 3.00736 2 4.25L2 11.75C2 12.9926 3.00736 14 4.25 14H11.75C12.9926 14 14 12.9926 14 11.75Z'
                  stroke='#B0B0B0'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>56453</span>
            </div>
          </div>
          <div className='w-6 h-6 rounded-full bg-white'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M10 7L15 12L10 17'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        href={'/explore/event'}
        className='flex gap-4 h-[90px] w-full px-[18px] bg-neutral-black rounded-lg items-center'>
        <Image src={EventImage} alt='' className='h-full w-[70px] object-cover' />
        <div className='flex items-center justify-between w-full'>
          <div className='space-y-1'>
            <div className='text-sm font-semibold text-neutral-50'>Event</div>
            <div className='flex items-center gap-1 text-neutral-300 text-xs'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path
                  d='M5.16667 11.4801V11.4286M8.16667 11.4801V11.4286M8.16667 8.68571V8.63415M10.8333 8.68571V8.63415M3.16667 5.94284H12.5M4.37302 2V3.02869M11.1667 2V3.02857M11.1667 3.02857H4.5C3.39543 3.02857 2.5 3.94958 2.5 5.0857V11.9429C2.5 13.079 3.39543 14 4.5 14H11.1667C12.2712 14 13.1667 13.079 13.1667 11.9429L13.1667 5.0857C13.1667 3.94958 12.2712 3.02857 11.1667 3.02857Z'
                  stroke='#B0B0B0'
                  strokeWidth='1.52'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>56453</span>
            </div>
          </div>
          <div className='w-6 h-6 rounded-full bg-white'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M10 7L15 12L10 17'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        href={'/explore/campaign'}
        className='flex gap-4 h-[90px] w-full px-[18px] bg-neutral-black rounded-lg items-center'>
        <Image src={CampaignImage} alt='' className='h-full w-[70px] object-cover' />
        <div className='flex items-center justify-between w-full'>
          <div className='space-y-1'>
            <div className='text-sm font-semibold text-neutral-50'>Campaign</div>
            <div className='flex items-center gap-1 text-neutral-300 text-xs'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path
                  d='M8.11597 14.436V5.12691M7.03264 4.56845C7.14789 4.59431 7.26933 4.56262 7.35231 4.47964C7.43528 4.39667 7.46693 4.27518 7.44112 4.15998C7.33768 3.73746 6.95666 2.32263 6.56541 1.93139C6.07797 1.44395 5.28464 1.44192 4.79961 1.92695C4.31461 2.41194 4.31658 3.20527 4.80405 3.69275C5.2017 4.09039 6.61013 4.46503 7.03264 4.56845ZM8.21569 4.15995C8.18983 4.2752 8.22153 4.39664 8.3045 4.47961C8.38748 4.56258 8.50896 4.59423 8.62417 4.56842C9.04669 4.46498 10.4615 4.08396 10.8528 3.69271C11.3402 3.20527 11.3422 2.41194 10.8572 1.92691C10.3722 1.44192 9.57887 1.44388 9.0914 1.93135C8.69375 2.329 8.31912 3.73744 8.21569 4.15995ZM2.06506 8.38509H13.9342C14.1912 8.38509 14.3996 8.1767 14.3996 7.91964V5.59237C14.3996 5.3353 14.1912 5.12691 13.9342 5.12691H2.06506C1.808 5.12691 1.59961 5.3353 1.59961 5.59237V7.91964C1.59961 8.1767 1.808 8.38509 2.06506 8.38509ZM13.236 8.38509V13.9705C13.236 14.2276 13.0276 14.436 12.7705 14.436H3.2287C2.97164 14.436 2.76325 14.2276 2.76325 13.9705V8.38509H13.236Z'
                  stroke='#B0B0B0'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>56453</span>
            </div>
          </div>
          <div className='w-6 h-6 rounded-full bg-white'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M10 7L15 12L10 17'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </Link>
      <Link
        href={'/explore/character'}
        className='flex gap-4 h-[90px] w-full px-[18px] bg-neutral-black rounded-lg items-center'>
        <Image src={CharacterImage} alt='' className='h-full w-[70px] object-cover' />
        <div className='flex items-center justify-between w-full'>
          <div className='space-y-1'>
            <div className='text-sm font-semibold text-neutral-50'>Character</div>
            <div className='flex items-center gap-1 text-neutral-300 text-xs'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path
                  d='M5.86628 1.59961H3.02183C2.23636 1.59961 1.59961 2.23636 1.59961 3.02183V10.1329V12.9774C1.59961 13.7629 2.23636 14.3996 3.02183 14.3996H10.1329H12.9774C13.7629 14.3996 14.3996 13.7629 14.3996 12.9774V5.86628V3.02183C14.3996 2.23636 13.7629 1.59961 12.9774 1.59961H5.99961M5.19961 6.10976V5.32977M10.7996 6.10976V5.32977M5.76805 10.3997C6.68015 11.1064 8.72552 11.1064 10 10.3997M7.59961 8.44976L7.76529 8.28822C7.91532 8.14194 7.99961 7.94354 7.99961 7.73667V5.71976'
                  stroke='#B0B0B0'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
              <span>56453</span>
            </div>
          </div>
          <div className='w-6 h-6 rounded-full bg-white'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M10 7L15 12L10 17'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
