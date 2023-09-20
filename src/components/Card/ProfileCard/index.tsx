import DOMPurify from 'dompurify'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import OtherIcon from 'images/icons/other-gender.svg'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ProfileCard({ data }) {
  const { t } = useTranslation()
  if (!data)
    return (
      <div className='bg-white rounded-[20px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] px-5 py-[10px] w-[400px]'>
        <div className='flex gap-5'>
          <figure>
            <div className='h-[50px] aspect-square bg-light-gray animate-pulse'></div>
          </figure>
          <div className='text-second-color'>
            <div className='h-[30px] w-16 animate-pulse bg-light-gray'></div>
            <div className='h-[24px] w-20 animate-pulse bg-light-gray'></div>
          </div>
        </div>
      </div>
    )
  return (
    <div className='bg-white rounded-[20px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] px-5 py-[10px] w-[400px]'>
      <div className='flex gap-5'>
        <figure>
          {data.picture && (
            <Image src={data.picture} alt='' width={50} height={50} className='h-[50px] aspect-square rounded-full' />
          )}
        </figure>
        <div className='text-second-color'>
          <p className='font-extrabold text-2xl leading-[30px]'>{data.nickname}</p>
          <div className='flex gap-[5px] items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <g clip-path='url(#clip0_2764_24691)'>
                <path
                  d='M10.4857 2.58939C11.4419 1.62946 12.8406 1.6093 13.6149 2.38662C14.3907 3.1654 14.3698 4.57289 13.4129 5.53348L11.7971 7.15564C11.6022 7.35128 11.6028 7.66786 11.7984 7.86274C11.9941 8.05763 12.3106 8.05701 12.5055 7.86137L14.1214 6.23921C15.3956 4.96007 15.5556 2.91785 14.3234 1.68088C13.0898 0.442449 11.0521 0.603857 9.77722 1.88366L6.54545 5.12796C5.27125 6.4071 5.11128 8.44934 6.34346 9.68631C6.53834 9.88195 6.85492 9.88256 7.05056 9.68768C7.2462 9.4928 7.24682 9.17621 7.05193 8.98057C6.27616 8.20179 6.29706 6.79428 7.25392 5.8337L10.4857 2.58939Z'
                  fill='#1FAB5E'
                />
                <path
                  d='M9.65673 6.31391C9.46185 6.11827 9.14526 6.11765 8.94963 6.31254C8.75398 6.50742 8.75337 6.824 8.94826 7.01964C9.72403 7.79843 9.70314 9.20591 8.74627 10.1665L5.51452 13.4108C4.5583 14.3708 3.15958 14.3909 2.38527 13.6136C1.6095 12.8348 1.63039 11.4273 2.58726 10.4667L4.20315 8.84454C4.39804 8.6489 4.39742 8.33232 4.20178 8.13743C4.00614 7.94255 3.68956 7.94316 3.49468 8.1388L1.87878 9.76097C0.604584 11.0401 0.444611 13.0824 1.6768 14.3193C2.91044 15.5578 4.94814 15.3964 6.22299 14.1166L9.45474 10.8722C10.7289 9.59308 10.8889 7.55088 9.65673 6.31391Z'
                  fill='#1FAB5E'
                />
              </g>
              <defs>
                <clipPath id='clip0_2764_24691'>
                  <rect width='16' height='16' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <Link href={`mailto:${data.email}`}>{data.email}</Link>
          </div>
        </div>
      </div>
      {(data.birthdate || data.gender || data.bio) && (
        <div className='grid grid-cols-[fit-content(30%)_auto] mt-8 gap-x-5 gap-y-[10px] font-medium leading-5 text-[#19191B]'>
          {data.birthdate && (
            <>
              <div className='text-[#AFB1B6]'>{t('DoB')}:</div>
              <div>{moment(data.birthdate).format('DD/MM/yyyy')}</div>
            </>
          )}
          {data.gender && (
            <>
              <div className='text-[#AFB1B6]'>{t('Gender')}:</div>
              <div>
                {t(data.gender == 'Undisclosed' ? 'Other' : data.gender)}{' '}
                <Image
                  className='h-[14px] w-[14px] md:h-[20px] md:w-[20px]'
                  src={
                    data.gender.toLowerCase() == 'male'
                      ? MaleIcon
                      : data.gender.toLowerCase() == 'female'
                      ? FemaleIcon
                      : OtherIcon
                  }
                  alt=''
                />
              </div>
            </>
          )}
          {data.bio && (
            <>
              <div className='text-[#AFB1B6]'>{t('Bio')}:</div>
              <div
                className={` whitespace-pre-wrap line-clamp-3`}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.bio) }}></div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
