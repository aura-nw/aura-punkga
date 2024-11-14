import Button from 'components/core/Button/Button'
import moment from 'moment'
import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { checkQuestStatus } from 'src/services'
import { mutate } from 'swr'
export default function BasicQuest({
  quest,
  loading,
  claimQuestHandler,
}: {
  quest: Quest
  loading: boolean
  claimQuestHandler: () => void
}) {
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const { account } = useContext(Context)
  const config = getConfig()
  const [status, setStatus] = useState(quest.reward_status)
  const [checking, setChecking] = useState(false)
  const slug = query.campaignSlug as string
  const checkQuestHandler = async () => {
    try {
      if (checking) return
      setChecking(true)
      const res = await checkQuestStatus(quest.id)
      if (res.data) {
        setStatus(res.data.reward_status)
        mutate({ key: 'fetch_campaign_auth_data', slug, account: account?.id })
      }
      setChecking(false)
      console.log(res)
    } catch (error) {
      setChecking(false)
      toast(error?.message || 'Claim failed. Please try again later.', {
        type: 'error',
      })
      console.error(error)
    }
  }
  const RefButton = () => {
    switch (quest.type) {
      case 'EngagesEventManga':
      case 'CollectIP':
      case 'LikeEventArtwork':
      case 'StakeIP':
        return (
          <Link
            className='w-full grid place-items-center'
            target='_blank'
            href={`${
              quest.requirement['engages_event_manga']?.href ||
              quest.requirement['like_event_artwork']?.href ||
              quest.requirement['collect_ip']?.href ||
              quest.requirement['stake_ip']?.href
            }`}>
            <Button className='w-full' size='sm'>
              {t('Go to page')}
            </Button>
          </Link>
        )
      case 'FollowX':
        if (!account.socialAccount.twitter) {
          return (
            <Link
              className='w-full grid place-items-center'
              href={`${config.REST_API_URL}/twitter/connect/${encodeURIComponent(
                location.origin + location.pathname
              )}`}>
              <Button className='w-full' size='sm'>
                <div className='w-full flex items-center gap-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <path
                      d='M2.53466 3.33203L8.03482 10.6861L2.5 16.6654H3.74576L8.5916 11.4303L12.5068 16.6654H16.7458L10.9361 8.89769L16.0879 3.33203H14.8422L10.3796 8.15324L6.77375 3.33203H2.53466ZM4.36661 4.24956H6.31403L14.9137 15.7478H12.9662L4.36661 4.24956Z'
                      fill='#222222'
                    />
                  </svg>
                  {t('Connect X')}
                </div>
              </Button>
            </Link>
          )
        }
        return (
          <Link
            className='w-full grid place-items-center'
            target='_blank'
            href={`https://twitter.com/intent/follow?screen_name=${quest.requirement['xfollow'].target_name}`}>
            <Button className='w-full' size='sm'>
              <div className='w-full flex items-center gap-1'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                  <path
                    d='M2.53466 3.33203L8.03482 10.6861L2.5 16.6654H3.74576L8.5916 11.4303L12.5068 16.6654H16.7458L10.9361 8.89769L16.0879 3.33203H14.8422L10.3796 8.15324L6.77375 3.33203H2.53466ZM4.36661 4.24956H6.31403L14.9137 15.7478H12.9662L4.36661 4.24956Z'
                    fill='#222222'
                  />
                </svg>
                {t('Go to X')}
              </div>
            </Button>
          </Link>
        )

      case 'RepostX':
        if (!account.socialAccount.twitter) {
          return (
            <Link
              className='w-full grid place-items-center'
              href={`${config.REST_API_URL}/twitter/connect/${encodeURIComponent(
                location.origin + location.pathname
              )}`}>
              <Button className='w-full' size='sm'>
                <div className='w-full flex items-center gap-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <path
                      d='M2.53466 3.33203L8.03482 10.6861L2.5 16.6654H3.74576L8.5916 11.4303L12.5068 16.6654H16.7458L10.9361 8.89769L16.0879 3.33203H14.8422L10.3796 8.15324L6.77375 3.33203H2.53466ZM4.36661 4.24956H6.31403L14.9137 15.7478H12.9662L4.36661 4.24956Z'
                      fill='#222222'
                    />
                  </svg>
                  {t('Connect X')}
                </div>
              </Button>
            </Link>
          )
        }
        return (
          <Link
            className='w-full grid place-items-center'
            target='_blank'
            href={`https://twitter.com/intent/retweet?tweet_id=${quest.requirement['xrepost'].post_id}`}>
            <Button className='w-full' size='sm'>
              <div className='w-full flex items-center gap-1'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                  <path
                    d='M2.53466 3.33203L8.03482 10.6861L2.5 16.6654H3.74576L8.5916 11.4303L12.5068 16.6654H16.7458L10.9361 8.89769L16.0879 3.33203H14.8422L10.3796 8.15324L6.77375 3.33203H2.53466ZM4.36661 4.24956H6.31403L14.9137 15.7478H12.9662L4.36661 4.24956Z'
                    fill='#222222'
                  />
                </svg>
                {t('Go to X')}
              </div>
            </Button>
          </Link>
        )
      case 'JoinDiscord':
        if (!account.socialAccount.discord) {
          return (
            <Link
              className='w-full grid place-items-center'
              href={`${config.REST_API_URL}/discord/connect/${encodeURIComponent(
                location.origin + location.pathname
              )}`}>
              <Button className='w-full' size='sm'>
                <div className='w-full flex items-center gap-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <path
                      d='M16.9569 4.25403C19.2028 7.5361 20.3257 11.22 19.9173 15.4733C19.9173 15.4733 19.9173 15.5068 19.8833 15.5068C18.3861 16.612 16.6847 17.4493 14.8812 17.9851C14.8472 18.0186 14.8472 17.9851 14.8132 17.9851C14.4389 17.4493 14.0986 16.9134 13.7924 16.3441C13.7924 16.3106 13.7924 16.3106 13.7924 16.2771L13.8264 16.2436C14.3708 16.0427 14.8812 15.8082 15.3917 15.5068C15.3917 15.5068 15.4257 15.5068 15.4257 15.4733C15.4257 15.4398 15.4257 15.4398 15.3917 15.4064C15.2896 15.3394 15.1875 15.2724 15.0854 15.1719C15.0514 15.1719 15.0514 15.1719 15.0173 15.1719C11.7847 16.6455 8.24584 16.6455 4.97917 15.1719C4.94515 15.1719 4.91112 15.1719 4.91112 15.1719C4.80904 15.2724 4.70695 15.3394 4.60487 15.4064C4.57084 15.4398 4.57084 15.4398 4.57084 15.4733C4.57084 15.5068 4.57084 15.5068 4.60487 15.5068C5.08126 15.8082 5.6257 16.0427 6.17014 16.2436C6.17014 16.2436 6.17014 16.2771 6.20417 16.2771C6.20417 16.3106 6.20417 16.3106 6.20417 16.3441C5.89792 16.9134 5.55765 17.4493 5.18334 17.9851C5.14931 17.9851 5.11529 18.0186 5.11529 17.9851C3.31182 17.4493 1.61043 16.612 0.113212 15.5068C0.0791843 15.5068 0.0791843 15.4733 0.0791843 15.4733C-0.261093 11.7894 0.453489 8.07194 3.0396 4.25403C3.0396 4.25403 3.0396 4.25403 3.07362 4.25403C4.36668 3.6512 5.72778 3.24932 7.12292 3.01488C7.15695 2.98139 7.19098 3.01488 7.19098 3.01488C7.39514 3.34979 7.56528 3.71818 7.70139 4.05309C9.23264 3.81866 10.7639 3.81866 12.2951 4.05309C12.4312 3.71818 12.6014 3.34979 12.8055 3.01488C12.8055 3.01488 12.8396 2.98139 12.8736 3.01488C14.2687 3.24932 15.6298 3.6512 16.9229 4.25403C16.9569 4.25403 16.9569 4.25403 16.9569 4.25403ZM6.68056 13.2295C7.66736 13.2295 8.48403 12.3252 8.48403 11.2535C8.48403 10.1484 7.70139 9.2776 6.68056 9.2776C5.69376 9.2776 4.87709 10.1484 4.87709 11.2535C4.87709 12.3252 5.69376 13.2295 6.68056 13.2295ZM13.316 13.2295C14.3368 13.2295 15.1194 12.3252 15.1194 11.2535C15.1535 10.1484 14.3368 9.2776 13.316 9.2776C12.3292 9.2776 11.5465 10.1484 11.5465 11.2535C11.5465 12.3252 12.3292 13.2295 13.316 13.2295Z'
                      fill='#222222'
                    />
                  </svg>
                  {t('Connect Discord')}
                </div>
              </Button>
            </Link>
          )
        }
        return (
          <Link
            className='w-full grid place-items-center'
            target='_blank'
            href={`${quest.requirement['dc_join'].invite_link}`}>
            <Button className='w-full' size='sm'>
              <div className='w-full flex items-center gap-1'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                  <path
                    d='M16.9569 4.25403C19.2028 7.5361 20.3257 11.22 19.9173 15.4733C19.9173 15.4733 19.9173 15.5068 19.8833 15.5068C18.3861 16.612 16.6847 17.4493 14.8812 17.9851C14.8472 18.0186 14.8472 17.9851 14.8132 17.9851C14.4389 17.4493 14.0986 16.9134 13.7924 16.3441C13.7924 16.3106 13.7924 16.3106 13.7924 16.2771L13.8264 16.2436C14.3708 16.0427 14.8812 15.8082 15.3917 15.5068C15.3917 15.5068 15.4257 15.5068 15.4257 15.4733C15.4257 15.4398 15.4257 15.4398 15.3917 15.4064C15.2896 15.3394 15.1875 15.2724 15.0854 15.1719C15.0514 15.1719 15.0514 15.1719 15.0173 15.1719C11.7847 16.6455 8.24584 16.6455 4.97917 15.1719C4.94515 15.1719 4.91112 15.1719 4.91112 15.1719C4.80904 15.2724 4.70695 15.3394 4.60487 15.4064C4.57084 15.4398 4.57084 15.4398 4.57084 15.4733C4.57084 15.5068 4.57084 15.5068 4.60487 15.5068C5.08126 15.8082 5.6257 16.0427 6.17014 16.2436C6.17014 16.2436 6.17014 16.2771 6.20417 16.2771C6.20417 16.3106 6.20417 16.3106 6.20417 16.3441C5.89792 16.9134 5.55765 17.4493 5.18334 17.9851C5.14931 17.9851 5.11529 18.0186 5.11529 17.9851C3.31182 17.4493 1.61043 16.612 0.113212 15.5068C0.0791843 15.5068 0.0791843 15.4733 0.0791843 15.4733C-0.261093 11.7894 0.453489 8.07194 3.0396 4.25403C3.0396 4.25403 3.0396 4.25403 3.07362 4.25403C4.36668 3.6512 5.72778 3.24932 7.12292 3.01488C7.15695 2.98139 7.19098 3.01488 7.19098 3.01488C7.39514 3.34979 7.56528 3.71818 7.70139 4.05309C9.23264 3.81866 10.7639 3.81866 12.2951 4.05309C12.4312 3.71818 12.6014 3.34979 12.8055 3.01488C12.8055 3.01488 12.8396 2.98139 12.8736 3.01488C14.2687 3.24932 15.6298 3.6512 16.9229 4.25403C16.9569 4.25403 16.9569 4.25403 16.9569 4.25403ZM6.68056 13.2295C7.66736 13.2295 8.48403 12.3252 8.48403 11.2535C8.48403 10.1484 7.70139 9.2776 6.68056 9.2776C5.69376 9.2776 4.87709 10.1484 4.87709 11.2535C4.87709 12.3252 5.69376 13.2295 6.68056 13.2295ZM13.316 13.2295C14.3368 13.2295 15.1194 12.3252 15.1194 11.2535C15.1535 10.1484 14.3368 9.2776 13.316 9.2776C12.3292 9.2776 11.5465 10.1484 11.5465 11.2535C11.5465 12.3252 12.3292 13.2295 13.316 13.2295Z'
                    fill='#222222'
                  />
                </svg>
                {t('Go to Discord')}
              </div>
            </Button>
          </Link>
        )

      default:
        return (
          <Link
            className='w-full grid place-items-center'
            target='_blank'
            href={`/comic/${quest.requirement[quest.type.toLowerCase()].manga.slug}${
              quest.requirement[quest.type.toLowerCase()]?.chapter?.number
                ? `/chapter/${quest.requirement[quest.type.toLowerCase()].chapter.number}`
                : ''
            }`}>
            <Button className='w-full' size='sm'>
              {t('Go to page')}
            </Button>
          </Link>
        )
    }
  }
  return (
    <div className='mt-5 w-full lg:mt-10'>
      {status == 'CAN_CLAIM' ? (
        <Button size='sm' loading={loading} onClick={claimQuestHandler} className='w-full'>
          {t('Claim Reward')}
        </Button>
      ) : status == 'OUT_OF_SLOT' ? (
        <Button size='sm' disabled className='w-full'>
          {t('Out of reward')}
        </Button>
      ) : status == 'CLAIMED' && quest.repeat == 'Daily' ? (
        <Button size='sm' disabled className='w-full'>
          <Countdown
            date={moment().add(1, 'd').startOf('day').toISOString()}
            renderer={({ hours, minutes, seconds }) => {
              if (locale == 'vn')
                return (
                  <span>
                    Làm mới sau {zeroPad(hours)} giờ : {zeroPad(minutes)} phút : {zeroPad(seconds)} giây
                  </span>
                )
              return (
                <span>
                  Reset in {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
                </span>
              )
            }}
          />
        </Button>
      ) : (
        <div className='grid grid-cols-[60%_1fr] gap-5'>
          <RefButton />
          <Button size='sm' className='w-full' variant='outlined' onClick={checkQuestHandler} loading={checking}>
            {t('Check')}
          </Button>
        </div>
      )}
    </div>
  )
}
