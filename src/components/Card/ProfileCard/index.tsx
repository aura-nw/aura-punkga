import DOMPurify from 'dompurify'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import OtherIcon from 'images/icons/other-gender.svg'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ProfileCard({ data, hideEmail }: { data: any; hideEmail?: boolean }) {
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
        </div>
      </div>
      {(data.birthdate || data.gender || data.bio) && (
        <div className='grid grid-cols-[fit-content(30%)_auto] mt-5 gap-x-5 gap-y-[10px] font-medium leading-5 text-[#19191B]'>
          {data.birthdate && (
            <>
              <div className='text-[#AFB1B6]'>{t('DoB')}:</div>
              <div>{moment(data.birthdate).format('DD/MM/yyyy')}</div>
            </>
          )}
          {data.gender && (
            <>
              <div className='text-[#AFB1B6]'>{t('Gender')}:</div>
              <div className='flex items-center'>
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
