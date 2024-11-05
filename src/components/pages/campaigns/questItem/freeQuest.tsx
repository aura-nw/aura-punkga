import Button from 'components/core/Button/Button'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { checkQuestStatus } from 'src/services'
import { mutate } from 'swr'
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
  const { locale, query } = useRouter()
  const [status, setStatus] = useState(quest.reward_status)
  const [checking, setChecking] = useState(false)
  const { account } = useContext(Context)
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
