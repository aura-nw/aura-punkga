export default function DummyComic() {
  return (
    <div className='md:flex gap-[20px] animate-pulse bg-light-gray rounded-2xl p-3'>
      <div className='flex-auto md:w-1/3'>
        <div className='rounded-[15px] w-full h-[180px] md:h-[240px] bg-light-medium-gray' />
      </div>
      <div className='flex-auto w-2/3 mt-2 md:mt-0'>
        <div className='rounded-full bg-light-medium-gray w-full h-5'></div>
        <div className='hidden md:block rounded-full bg-light-medium-gray mt-3 w-[40%] h-4'></div>
        <div className='rounded-full bg-light-medium-gray mt-3 w-full h-4'></div>
        <div className='mt-[10px] flex gap-[24px] '>
          <div className='rounded-full bg-light-medium-gray mt-3 w-full h-4'></div>
          <div className='rounded-full bg-light-medium-gray mt-3 w-full h-4'></div>
        </div>
        <div className='hidden md:block rounded-full bg-light-medium-gray mt-3 w-full h-4'></div>
      </div>
    </div>
  )
}
