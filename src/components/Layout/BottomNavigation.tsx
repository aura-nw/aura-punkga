import Link from 'next/link'

export default function BottomNavigation() {
  return (
    <div className='fixed bottom-0 w-screen px-2 py-4 bg-black grid grid-cols-4 text-xxs font-semibold text-white'>
      <Link
        href='/'
        className={`flex flex-col items-center gap-2 ${location.pathname == '/' ? 'text-text-brand-hover' : ''}`}>
        <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
          <path
            d='M3.875 9.91605C3.875 9.54666 4.06302 9.2001 4.37957 8.98603L12.1796 3.71117C12.5959 3.42961 13.1541 3.42961 13.5704 3.71117L21.3704 8.98603C21.687 9.2001 21.875 9.54665 21.875 9.91605V19.7882C21.875 20.7336 21.0691 21.5 20.075 21.5H5.675C4.68089 21.5 3.875 20.7336 3.875 19.7882V9.91605Z'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M15.125 13.625C15.125 14.8676 14.1176 15.875 12.875 15.875C11.6324 15.875 10.625 14.8676 10.625 13.625C10.625 12.3824 11.6324 11.375 12.875 11.375C14.1176 11.375 15.125 12.3824 15.125 13.625Z'
            stroke='currentColor'
            strokeWidth='2'
          />
        </svg>
        Home
      </Link>
      <Link
        href='/available-quests'
        className={`flex flex-col items-center gap-2 ${
          location.pathname.includes('/available-quests') ? 'text-text-brand-hover' : ''
        }`}>
        <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
          <path
            d='M20.6499 11.9766H4.55469C4.0024 11.9766 3.55469 12.4243 3.55469 12.9766V20.5004C3.55469 21.0527 4.0024 21.5004 4.55469 21.5004H20.6499C21.2022 21.5004 21.6499 21.0527 21.6499 20.5004V12.9766C21.6499 12.4243 21.2022 11.9766 20.6499 11.9766Z'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M4.03125 9.5L4.98363 11.4048'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.1731 9.5L20.2207 11.4048'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <mask id='path-4-inside-1_8560_53814' fill='currentColor'>
            <rect x='8.625' y='11.5' width='8' height='7' rx='1' />
          </mask>
          <rect
            x='8.625'
            y='11.5'
            width='8'
            height='7'
            rx='1'
            stroke='currentColor'
            strokeWidth='3'
            mask='url(#path-4-inside-1_8560_53814)'
          />
          <circle cx='12.5099' cy='14.3849' r='0.884921' fill='currentColor' />
          <path
            d='M12.0452 16.1546C12.0452 16.4112 12.2532 16.6192 12.5098 16.6192C12.7663 16.6192 12.9743 16.4112 12.9743 16.1546L12.0452 16.1546ZM12.0452 14.3848L12.0452 16.1546L12.9743 16.1546L12.9743 14.3848L12.0452 14.3848Z'
            fill='currentColor'
          />
          <path
            d='M4 8C4.15789 7 4.94737 5 6.84211 5H18.3227C18.878 5 19.444 5.03605 19.9397 5.28648C20.7502 5.69605 21.7224 6.53506 22 8'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path d='M3 8.5L23 8.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
        </svg>
        Quest
      </Link>
      <Link
        href='/events/literature-infinity'
        className={`flex flex-col items-center gap-2 ${
          location.pathname.includes('/events/literature-infinity') ? 'text-text-brand-hover' : ''
        }`}>
        <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
          <path
            d='M17.625 1.25H1.125V23.75H23.625V16.25H17.625V1.25ZM13.875 16.25V19.25H3.75L2.625 20.75V4.25L3.75 5.75H15L16.125 4.25V16.25H13.875ZM3.375 2.75H15.375L14.25 4.25H4.5L3.375 2.75ZM3.375 22.25L4.5 20.75H13.875V22.25H3.375ZM22.125 22.25H15.375V20.75H22.125V22.25ZM22.125 19.25H15.375V17.75H22.125V19.25Z'
            fill='currentColor'
          />
          <path
            d='M6.43945 12.5L9.37495 15.4355L12.3105 12.5L9.37495 9.56445L6.43945 12.5ZM9.37495 13.3145L8.56045 12.5L9.37495 11.6855L10.1895 12.5L9.37495 13.3145Z'
            fill='currentColor'
          />
          <path
            d='M5.6625 8.78704C4.92833 9.52129 4.42837 10.4568 4.22584 11.4751C4.02331 12.4935 4.12731 13.5491 4.52469 14.5084C4.92206 15.4677 5.59497 16.2876 6.45831 16.8644C7.32166 17.4413 8.33667 17.7492 9.375 17.7492C10.4133 17.7492 11.4283 17.4413 12.2917 16.8644C13.155 16.2876 13.8279 15.4677 14.2253 14.5084C14.6227 13.5491 14.7267 12.4935 14.5242 11.4751C14.3216 10.4568 13.8217 9.52129 13.0875 8.78704C12.102 7.80401 10.7669 7.25195 9.375 7.25195C7.98307 7.25195 6.64796 7.80401 5.6625 8.78704ZM12.027 15.1515C11.5025 15.6759 10.8343 16.0329 10.1069 16.1776C9.37952 16.3222 8.62558 16.2479 7.94041 15.964C7.25524 15.6801 6.66963 15.1995 6.25762 14.5828C5.84561 13.9662 5.6257 13.2412 5.6257 12.4995C5.6257 11.7579 5.84561 11.0329 6.25762 10.4163C6.66963 9.79959 7.25524 9.31895 7.94041 9.03509C8.62558 8.75123 9.37952 8.67691 10.1069 8.82152C10.8343 8.96614 11.5025 9.32319 12.027 9.84754C12.729 10.5516 13.1232 11.5053 13.1232 12.4995C13.1232 13.4938 12.729 14.4475 12.027 15.1515Z'
            fill='currentColor'
          />
          <path
            d='M22.5 12.125V11H21V12.125H19.875V13.625H21V14.75H22.5V13.625H23.625V12.125H22.5Z'
            fill='currentColor'
          />
          <path
            d='M19.875 8.75H21.375V7.625H22.5V6.125H21.375V5H19.875V6.125H18.75V7.625H19.875V8.75Z'
            fill='currentColor'
          />
        </svg>
        Lunar New Year
      </Link>
      {/* <Link
        href='/subscriptions'
        className={`flex flex-col items-center gap-2 ${
          location.pathname.includes('/subscriptions') ? 'text-text-brand-hover' : ''
        }`}>
        <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
          <path
            d='M12.1011 20.7286V5.9172M12.1011 20.7286L10.6436 19.2712C9.82061 18.4481 8.70486 17.9858 7.54094 17.9858H3.87158C3.26564 17.9858 2.77539 17.4946 2.77539 16.8886V5.36863C2.77539 4.76269 3.2666 4.27148 3.87253 4.27148H8.08901C9.25293 4.27148 10.3692 4.73385 11.1922 5.55687L12.1011 6.46577L13.01 5.55687C13.833 4.73385 14.9493 4.27148 16.1132 4.27148H20.8782C21.4842 4.27148 21.9754 4.76269 21.9754 5.36863V16.8886C21.9754 17.4946 21.4842 17.9858 20.8782 17.9858H16.6618C15.4978 17.9858 14.3816 18.4481 13.5586 19.2712L12.1011 20.7286Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        Subscription
      </Link> */}
      <Link
        href='/explore'
        className={`flex flex-col items-center gap-2 ${
          location.pathname.includes('/explore') ? 'text-text-brand-hover' : ''
        }`}>
        <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
          <path
            d='M12.1252 12.5905V12.5003M21.0879 21.4629C19.1922 23.3586 13.6428 20.8827 8.69288 15.9328C3.74299 10.9829 1.26708 5.43349 3.16278 3.53778C5.05849 1.64208 10.6079 4.11799 15.5578 9.06788C20.5077 14.0178 22.9836 19.5672 21.0879 21.4629ZM3.16297 21.463C1.26727 19.5673 3.74318 14.0178 8.69308 9.06794C13.643 4.11805 19.1924 1.64213 21.0881 3.53784C22.9838 5.43354 20.5079 10.983 15.558 15.9329C10.6081 20.8828 5.05868 23.3587 3.16297 21.463Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
        Explore
      </Link>
    </div>
  )
}
