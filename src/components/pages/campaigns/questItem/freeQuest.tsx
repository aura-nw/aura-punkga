import Button from 'components/core/Button'
import moment from 'moment'
import { useRouter } from 'next/router'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { Quest } from 'src/models/campaign'
export default function FreeQuest({
  quest,
  loading,
  claimQuestHandler,
  checkQuestHandler,
  checking,
  status,
}: {
  quest: Quest
  loading: boolean
  checking: boolean
  status: any
  checkQuestHandler: () => void
  claimQuestHandler: () => void
}) {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <div className='mt-5 w-full'>
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
        <Button size='sm' className='w-full' variant='outlined' onClick={checkQuestHandler} loading={checking}>
          {t('Check')}
        </Button>
      )}
    </div>
  )
}
