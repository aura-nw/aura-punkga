import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { levelToXp } from 'src/utils'
export default function Analytic() {
  const { account, getProfile } = useContext(Context)
  const percentage =
    (Math.round(account.xp - levelToXp(account.level)) /
      Math.round(levelToXp(account.level + 1) - levelToXp(account.level))) *
    100
  const { t } = useTranslation()
  return (
    <div className='bg-[#F2F2F2] px-10 py-5 rounded-2xl h-[180px] flex flex-col justify-between'>
      <div className='text-xl leading-6 font-bold text-[#1C1C1C]'>Quests Analytic</div>
      <div className='flex'>
        <div className='mr-auto'>
          <div className='text-sm leading-[18px] text-[#1C1C1C]'>Level</div>
          <div className='mt-1 text-[#1C1C1C] font-bold text-lg leading-[24px]'>{account.level}</div>
        </div>
        <span className='w-[1px] h-full bg-[#1c1c1c]/10'></span>
        <div className='mx-auto'>
          <div className='text-sm leading-[18px] text-[#1C1C1C]'>Completed Quests</div>
          <div className='mt-1 text-[#1C1C1C] font-bold text-lg leading-[24px]'>{account.quests}</div>
        </div>
        <span className='w-[1px] h-full bg-[#1c1c1c]/10'></span>
        <div className='ml-auto'>
          <div className='text-sm leading-[18px] text-[#1C1C1C]'>Current XP</div>
          <div className='mt-1 text-[#1C1C1C] font-bold text-lg leading-[24px]'>{account.xp}</div>
        </div>
      </div>
      <div>
        <div className='mb-1 text-sm'>Progress</div>
        <div className='relative h-5 w-full rounded-lg overflow-hidden bg-[#1C1C1C]/5'>
          <div className={`absolute top-0 left-0 bg-primary-color bottom-0`} style={{ width: `${percentage}%` }}></div>
          <div className='absolute top-0 left-[10px] text-sm leading-[18px] font-bold'>{`${Math.round(
            account.xp - levelToXp(account.level)
          )} / ${Math.round(levelToXp(account.level + 1) - levelToXp(account.level))} xp to level ${
            account.level + 1
          }`}</div>
        </div>
      </div>
    </div>
  )
}
