import Button from 'components/core/Button'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { answerQuest } from 'src/services'
import { useSWRConfig } from 'swr'

export default function QuizQuest({
  quest,
  loading,
  claimQuestHandler,
  open,
  setOpen,
}: {
  quest: Quest
  loading: boolean
  claimQuestHandler: () => void
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const { query, locale } = useRouter()
  const { account } = useContext(Context)
  const slug = query.campaignSlug as string
  const { mutate } = useSWRConfig()
  const { t } = useTranslation()
  const [selectedAnswer, setSelectedAnswer] = useState(-1)
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [answerList, setAnswerList] = useState([])
  useEffect(() => {
    if (open) {
      const list = _.shuffle([
        ...quest.requirement.quiz.multiple_choice[0].wrong_answer,
        quest.requirement.quiz.multiple_choice[0].correct_answer,
      ])
      setAnswerList(list)
      if (quest.reward_status == 'CAN_CLAIM') {
        const correctIndex = list.findIndex((ans) => ans == quest.requirement.quiz.multiple_choice[0].correct_answer)
        setCorrectAnswerIndex(correctIndex)
        setSelectedAnswer(correctIndex)
      }
    }
  }, [open])
  const answerQuestHandler = async () => {
    try {
      if (submitLoading) return
      if (quest.requirement.quiz.multiple_choice[0].correct_answer == answerList[selectedAnswer]) {
        setSubmitLoading(true)
        await answerQuest(quest.id, answerList[selectedAnswer])
        const correctIndex = answerList.findIndex(
          (ans) => ans == quest.requirement.quiz.multiple_choice[0].correct_answer
        )
        setCorrectAnswerIndex(correctIndex)
        mutate({ key: 'fetch_campaign_auth_data', slug, account: account?.id })
        setSubmitLoading(false)
      } else {
        setOpen(false)
        toast(t(`Your answer is incorrect, please try again after a few seconds`), {
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        })
      }
    } catch (error) {
      toast(`Submit answer failed`, {
        type: 'error',
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      setSubmitLoading(false)
      console.error(error)
    }
  }
  return (
    <div className='mt-5 w-full'>
      <div className='bg-[#191919] rounded-mlg p-4 flex flex-col gap-4'>
        <div className='text-base font-medium'>{quest.requirement.quiz.multiple_choice[0].question}</div>
        {answerList.map((answer, index) => {
          return (
            <div
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer relative flex items-center justify-between bg-neutral-900 gap-1 ${
                correctAnswerIndex == index
                  ? 'outline outline-[2px] outline-brand-500'
                  : selectedAnswer == index
                  ? ' outline outline-[2px] outline-info-500'
                  : ''
              }`}
              onClick={() => (correctAnswerIndex == -1 ? setSelectedAnswer(index) : null)}
              key={index}>
              {`${(function () {
                switch (index) {
                  case 0:
                    return 'A:'
                  case 1:
                    return 'B:'
                  case 2:
                    return 'C:'
                  case 3:
                    return 'D:'
                }
              })()} ${answer}`}
              {correctAnswerIndex == index && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  className='shrink-0 w-5'>
                  <path
                    d='M12.6183 8.31916L9.0625 11.875L7.85041 10.6629M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5Z'
                    stroke='#00e160'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </div>
          )
        })}
        {quest.reward_status == 'CAN_CLAIM' || correctAnswerIndex != -1 ? (
          <Button size='sm' loading={loading} onClick={claimQuestHandler} className='w-full'>
            {t('Claim Reward')}
          </Button>
        ) : quest.reward_status == 'OUT_OF_SLOT' ? (
          <Button size='sm' disabled className='w-full'>
            {t('Out of reward')}
          </Button>
        ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
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
        ) : selectedAnswer != -1 ? (
          <Button size='sm' loading={submitLoading} onClick={answerQuestHandler} className='w-full'>
            {t('Submit')}
          </Button>
        ) : (
          <Button size='sm' disabled className='w-full'>
            {t('Submit')}
          </Button>
        )}
      </div>
    </div>
  )
}
