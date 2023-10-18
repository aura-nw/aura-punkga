import Image from 'next/image'
import Background from './assets/task-background.svg'
export default function TaskSlider() {
  return (
    <div className='relative'>
      <Image src={Background} alt='' className='relative z-10' />
      <div className='absolute inset-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='1060'
          height='577'
          viewBox='0 0 1060 577'
          fill='none'
          className='w-full h-full'>
          <g filter='url(#filter0_b_3747_60813)'>
            <path
              d='M39.2522 75.8933V32.662V10.6624C39.2522 5.13951 43.7294 0.662354 49.2522 0.662354H436.114C438.765 0.662354 441.307 1.71462 443.182 3.58792L457.708 18.1002C459.583 19.9735 462.125 21.0258 464.776 21.0258H978.073C980.724 21.0258 983.266 22.0781 985.141 23.9514L1003.41 42.2039C1005.29 44.0772 1007.83 45.1295 1010.48 45.1295H1050C1055.52 45.1295 1060 49.6066 1060 55.1294V566.5C1060 572.023 1055.52 576.5 1050 576.5H267.603C264.952 576.5 262.41 575.448 260.535 573.574L246.841 559.893C244.966 558.02 242.424 556.968 239.773 556.968H54.207C51.5565 556.968 49.0144 555.915 47.1393 554.042L12.2342 519.17C10.3568 517.295 9.30195 514.75 9.30195 512.096V495.451C9.30195 492.797 8.24707 490.252 6.36964 488.376L3.91473 485.924C2.0373 484.048 0.982422 481.503 0.982422 478.849V330.207C0.982422 327.553 2.0373 325.008 3.91472 323.132L15.5211 311.537C17.3986 309.661 18.4534 307.116 18.4534 304.463V104.962C18.4534 102.308 19.5083 99.7634 21.3857 97.8877L36.3199 82.9677C38.1974 81.0921 39.2522 78.5471 39.2522 75.8933Z'
              fill='url(#pattern0)'
            />
          </g>
          <defs>
            <filter
              id='filter0_b_3747_60813'
              x='-19.0176'
              y='-19.3376'
              width='1099.02'
              height='615.838'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'>
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feGaussianBlur in='BackgroundImageFix' stdDeviation='10' />
              <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_3747_60813' />
              <feBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_3747_60813' result='shape' />
            </filter>
            <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
              <use xlinkHref='#image0_3747_60813' transform='matrix(0.000414441 0 0 0.000762195 -0.0313138 0)' />
            </pattern>
            <image id='image0_3747_60813' width='2564' height='1312' xlinkHref='\assets\images\mockup.png' />
          </defs>
        </svg>
      </div>
    </div>
  )
}
