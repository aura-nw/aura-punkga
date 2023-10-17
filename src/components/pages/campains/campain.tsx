import Quest from './quest'
export default function Campain() {
  return (
    <div>
      <div className='flex gap-2 mb-10'>
        <svg xmlns='http://www.w3.org/2000/svg' width='95' height='23' viewBox='0 0 95 23' fill='none'>
          <path
            d='M72.1036 22.0001H45.2414H41L53.3708 9.62929H61.5001L69.9829 1.14648H92.9572L72.1036 22.0001Z'
            stroke='#292929'
          />
          <path
            d='M31.1036 22.0001H4.2414H0L12.3708 9.62929H20.5001L28.9829 1.14648H51.9572L31.1036 22.0001Z'
            fill='#292929'
          />
        </svg>
        <span className='uppercase text-[32px] font-bold text-[#414141] font-orbitron leading-6'>Onboarding</span>
      </div>
      <div className='grid grid-cols-4 gap-9'>
        <Quest isLocked />
        <Quest isLocked={false} />
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
