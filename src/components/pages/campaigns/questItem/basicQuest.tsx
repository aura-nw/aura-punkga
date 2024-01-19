import FilledButton from 'components/core/Button/FilledButton'
import SubFilledButton from 'components/core/Button/SubFilledButton'
import moment from 'moment'
import Countdown, { zeroPad } from 'react-countdown'
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
  return (
    <div className='mt-5 w-full lg:mt-10'>
      {quest.reward_status == 'CAN_CLAIM' ? (
        <FilledButton loading={loading} onClick={claimQuestHandler} className='w-full'>
          Claim Reward
        </FilledButton>
      ) : quest.reward_status == 'OUT_OF_SLOT' ? (
        <div className='text-center bg-medium-gray leading-5 font-bold text-light-medium-gray px-6 pt-2 pb-[10px] rounded-[20px]'>
          Out of reward
        </div>
      ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
        <div className='text-center bg-medium-gray leading-5 font-bold text-light-medium-gray px-6 pt-2 pb-[10px] rounded-[20px]'>
          <Countdown
            date={moment().add(1, 'd').startOf('day').toISOString()}
            renderer={({ hours, minutes, seconds }) => {
              return (
                <span>
                  Reset in {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
                </span>
              )
            }}
          />
        </div>
      ) : (
        <SubFilledButton
          target='_blank'
          href={`/comic/${quest.requirement[quest.type.toLowerCase()].manga.slug}${
            quest.requirement[quest.type.toLowerCase()]?.chapter?.number
              ? `/chapter/${quest.requirement[quest.type.toLowerCase()].chapter.number}`
              : ''
          }`}>
          Go to page
        </SubFilledButton>
      )}
    </div>
  )
}
