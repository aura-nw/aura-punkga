import Image from 'next/image'
import { useState } from 'react'

export default function LazyImage(props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const { className, ...rest } = props
  return (
    <div className={`relative ${props.className}`}>
      <Image
        {...rest}
        style={{ objectFit: 'inherit' }}
        className='h-full w-full relative'
        onLoadingComplete={() => {
          setIsImageLoaded(true)
        }}
      />
      {!isImageLoaded ? (
        <div className='absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] bg-left hover:bg-right transition-all animate-imageslide'></div>
      ) : null}
    </div>
  )
}
