import Button from 'components/core/Button/Button'
import moment from 'moment'
import { useRouter } from 'next/router'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { Quest } from 'src/models/campaign'
export default function FreeQuest({
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
    <div className='mt-5 w-full'>
      {quest.reward_status == 'CAN_CLAIM' ? (
        <Button loading={loading} onClick={claimQuestHandler} className='w-full'>
          {t('Claim Reward')}
        </Button>
      ) : quest.reward_status == 'OUT_OF_SLOT' ? (
        <Button disabled className='w-full'>
          {t('Out of reward')}
        </Button>
      ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
        <Button disabled className='w-full'>
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
      ) : null}
    </div>
  )
}
