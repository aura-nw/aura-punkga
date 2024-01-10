import FilledButton from 'components/core/Button/FilledButton'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
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
  const { query } = useRouter()
  const {account} = useContext(Context)
  const slug = query.campaignSlug as string
  const { mutate } = useSWRConfig()
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
        console.log(correctIndex)
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
        toast(`Your answer is incorrect, please try again after a few seconds`, {
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
      <div className='bg-[#F0F0F0] rounded-lg p-4 flex flex-col gap-[10px]'>
        <div className='text-sm leading-[18px] text-[#414141] font-semibold'>
          {quest.requirement.quiz.multiple_choice[0].question}
        </div>
        {answerList.map((answer, index) => {
          return (
            <div
              className={`px-[10px] py-[7px] rounded-lg border border-light-medium-gray text-xs leading-[15px] cursor-pointer relative ${
                selectedAnswer == index ? '!border-primary-color bg-[#C6FFDE]' : ''
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
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  className='absolute right-[10px] inset-y-[6px]'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9 15.7559C9.88642 15.7559 10.7642 15.5813 11.5831 15.242C12.4021 14.9028 13.1462 14.4056 13.773 13.7788C14.3998 13.152 14.897 12.4079 15.2362 11.589C15.5754 10.77 15.75 9.89228 15.75 9.00586C15.75 8.11944 15.5754 7.24169 15.2362 6.42275C14.897 5.6038 14.3998 4.85968 13.773 4.23289C13.1462 3.60609 12.4021 3.10889 11.5831 2.76967C10.7642 2.43045 9.88642 2.25586 9 2.25586C7.20979 2.25586 5.4929 2.96702 4.22703 4.23289C2.96116 5.49876 2.25 7.21565 2.25 9.00586C2.25 10.7961 2.96116 12.513 4.22703 13.7788C5.4929 15.0447 7.20979 15.7559 9 15.7559ZM8.826 11.7359L12.576 7.23586L11.424 6.27586L8.199 10.1451L6.53025 8.47561L5.46975 9.53611L7.71975 11.7861L8.30025 12.3666L8.826 11.7359Z'
                    fill='#2FB101'
                  />
                </svg>
              )}
            </div>
          )
        })}
        {quest.reward_status == 'CAN_CLAIM' || correctAnswerIndex != -1 ? (
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
        ) : selectedAnswer != -1 ? (
          <FilledButton loading={submitLoading} onClick={answerQuestHandler} className='w-full'>
            Submit
          </FilledButton>
        ) : (
          <FilledButton disabled className='w-full'>
            Submit
          </FilledButton>
        )}
      </div>
    </div>
  )
}
