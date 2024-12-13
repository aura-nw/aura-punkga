import Image from 'next/image'

export default function Character({ data }) {
  return (
    <>
      <div className='w-full'>
        <div className='relative cursor-pointer lg:[&:hover_.info]:block rounded-lg overflow-hidden'>
          <Image src={data.avatar_url} alt='' width={600} height={600} className='w-full aspect-square  object-cover' />
          {data.is_default_character && (
            <div className='text-xs font-bold py-1 px-2 rounded-full bg-white text-black absolute md:top-5 md:right-4 top-2 right-2'>
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
      </div>
    </>
  )
}
