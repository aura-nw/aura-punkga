import Avatar from 'assets/images/avatar.svg'
import ProfileCard from 'components/Card/ProfileCard'
import Popover from 'components/Popover'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
export default function LeaderBoard({ data, userData, xpText }: { data: any[]; userData?: any; xpText?: string }) {
  const { t } = useTranslation()
  return (
    <div className='overflow-auto'>
      <div className='bg-neutral-white rounded-mlg mt-8 min-w-[300px] md:min-w-[400px]'>
        <div className='py-3 md:py-4 px-4 md:px-[32px] w-full h-full flex flex-col'>
          <div className={`font-semibold w-full text-center text-xl`}>{t('Campaign Leaderboard')}</div>
          <div className='mt-8 flex px-4 pb-4 border-b border-border-primary font-semibold text-base'>
            <div className='w-9 mr-[10px] shrink-0'></div>
            <div className='w-full'>{t('User')}</div>
            <div className='w-12 shrink-0'>{xpText || 'XP'}</div>
          </div>
          <div className={`h-[420px] flex flex-col relative overflow-y-auto overflow-x-hidden`}>
            <div className={`absolute inset-0 flex flex-col h-full py-2 md:py-3`}>
              {data?.map((item, index) => (
                <div key={index} className='cursor-pointer bg-white rounded-[10px]'>
                  <Popover
                    freeMode
                    popoverRender={() => <ProfileCard hideEmail data={item.user_campaign_authorizer_user} />}>
                    <div className='flex px-4 text-sm font-medium items-center border-b border-border-secondary h-[60px]'>
                      <div className='w-9 mr-[10px] shrink-0'>#{index + 1}</div>
                      <div className='flex items-center gap-1.5 md:gap-[10px] justify-self-start w-full'>
                        <Image
                          className='w-7 h-7 rounded-full'
                          width={28}
                          height={28}
                          src={item.user_campaign_authorizer_user.picture || Avatar}
                          alt=''
                        />
                        <div className='truncate'>{item.user_campaign_authorizer_user.nickname}</div>
                      </div>
                      <div className='w-12 shrink-0 pl-1'>{item.total_reward_xp}</div>
                    </div>
                  </Popover>
                </div>
              ))}
            </div>
          </div>
          {userData && (
            <div className='flex justify-between py-2 md:py-0 md:pt-5 px-3 md:px-[10px] border-t font-medium border-border-primary text-sm'>
              <div>
                {t('Your rank')}:{' '}
                <strong className='text-text-brand-defaul'>
                  {userData?.user_campaign_rank ? '#' + userData?.user_campaign_rank : '--'}
                </strong>
              </div>

              <div>
                {xpText || 'XP'}:{' '}
                <strong className='text-text-brand-defaul'>
                  {userData.total_reward_xp ? userData.total_reward_xp : '--'}
                </strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
