import ChupButton from 'components/core/Button/ChupButton'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { Quest } from 'src/models/campaign'
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
  const { locale } = useRouter()
  return (
    <div className='mt-5 w-full lg:mt-10'>
      {quest.reward_status == 'CAN_CLAIM' ? (
        <ChupButton loading={loading} onClick={claimQuestHandler} className='w-full'>
          {t('Claim Reward')}
        </ChupButton>
      ) : quest.reward_status == 'OUT_OF_SLOT' ? (
        <ChupButton disabled className='w-full'>
          {t('Out of reward')}
        </ChupButton>
      ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
        <ChupButton disabled className='w-full'>
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
        </ChupButton>
      ) : (
        <ChupButton className='w-full'>
          <Link
            target='_blank'
            href={`/comic/${quest.requirement[quest.type.toLowerCase()].manga.slug}${
              quest.requirement[quest.type.toLowerCase()]?.chapter?.number
                ? `/chapter/${quest.requirement[quest.type.toLowerCase()].chapter.number}`
                : ''
            }`}>
            {t('Go to page')}
          </Link>
        </ChupButton>
      )}
    </div>
  )
}
