import Image from 'next/image'
import Scenery from './assets/scenery.svg'
import moment from 'moment'
import Sun from './assets/Sun.svg'
import Moon from './assets/Moon.svg'
import Plane from './assets/plane.svg'
import Bus1 from './assets/Bus 1.svg'
import Bus2 from './assets/Bus 2.svg'
import Car from './assets/Car.svg'
import Taxi from './assets/Taxi.svg'
import { motion } from 'framer-motion'
export default function FooterAnimationSection() {
  const hours = moment().hours()
  const isDay = hours > 6 && hours <= 18
  const yPosition = Math.cos((Math.PI * hours) / 6) + 1
  const xPosition = ((hours + 6) % 12 || 12) / 12
  return (
    <div
      className={`pt-[10%] relative ${
        isDay ? '' : 'bg-[linear-gradient(180deg,#020321_0%,#011030_38.4%,#001F3E_100%)]'
      }`}>
      <Image
        src={isDay ? Sun : Moon}
        alt=''
        className={`absolute top-0 left-1/2 z-10 -translate-x-1/2 w-[7%]`}
        style={{
          top: `${10 + 20 * (1 - yPosition / 2)}%`,
          left: `${xPosition * 100}%`,
        }}
      />
      <Image src={Scenery} alt='' className={`w-full relative z-20 ${isDay ? '' : 'opacity-60'}`} />
      <motion.div
        className='absolute z-[15] w-[10%]'
        initial={{ right: '-50%', top: '100%' }}
        animate={{ right: '150%', top: '-50%' }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}>
        <Image src={Plane} alt='' />
      </motion.div>
      <motion.div
        className='absolute z-30 bottom-[14%] w-[14%]'
        initial={{ right: '-50%' }}
        animate={{ right: ['-50%','78%', '78%', '150%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', times: [0, 0.6, 0.68, 1] }}>
        <Image src={Bus1} alt='' />
      </motion.div>
      <motion.div
        className='absolute z-30 bottom-[10%] w-[8%]'
        initial={{ right: '-50%' }}
        animate={{ right: '150%' }}
        transition={{ duration: 17, repeat: Infinity, ease: 'linear' }}>
        <Image src={Car} alt='' />
      </motion.div>
      <motion.div
        className='absolute z-30 bottom-[4%] w-[12%]'
        initial={{ left: '-50%' }}
        animate={{ left: '150%' }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        <Image src={Bus2} alt='' />
      </motion.div>
      <motion.div
        className='absolute z-30 bottom-[1%] w-[9%]'
        initial={{ left: '-50%' }}
        animate={{ left: '150%' }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
        <Image src={Taxi} alt='' />
      </motion.div>
    </div>
  )
}
