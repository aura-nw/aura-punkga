import Modal from 'components/Modal'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { Quest } from 'src/models/campaign'
import NoImage from 'images/no_img.png'
import IllusImage from 'components/pages/campaigns/assets/illus.svg'
import FilledButton from 'components/Button/FilledButton'
import Countdown, { zeroPad } from 'react-countdown'
import moment from 'moment'
import { isMobile } from 'react-device-detect'
import DOMPurify from 'dompurify'
import { answerQuest, claimQuest } from 'src/services'
import { Context } from 'src/context'
import { toast } from 'react-toastify'
import Link from 'next/link'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import BasicQuest from './basicQuest'

export default function QuizQuest({ data }: { data: Quest }) {
  const [open, setOpen] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(-1)
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1)
  const [seeMore, setSeeMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [answerList, setAnswerList] = useState([])
  const { query } = useRouter()
  const slug = query.campaignSlug as string
  const { mutate } = useSWRConfig()
  const limitChar = isMobile ? 20 : 30
  useEffect(() => {
    if (open) {
      if (correctAnswerIndex == -1) {
        setSelectedAnswer(-1)
        setAnswerList(
          _.shuffle([
            ...data.requirement.quiz.multiple_choice[0].wrong_answer,
            data.requirement.quiz.multiple_choice[0].correct_answer,
          ])
        )
      }
      if (data.reward_status == 'CAN_CLAIM') {
        const correctIndex = [
          ...data.requirement.quiz.multiple_choice[0].wrong_answer,
          data.requirement.quiz.multiple_choice[0].correct_answer,
        ].findIndex((ans) => ans == data.requirement.quiz.multiple_choice[0].correct_answer)
        setCorrectAnswerIndex(correctIndex)
        setSelectedAnswer(correctIndex)
      }
    }
  }, [open])
  const claimQuestHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      const res = await claimQuest(data.id)
      mutate({ key: 'fetch_campaign_auth_data', slug })
      if (res) {
        if (data.reward.xp) {
          toast(`${data.reward.xp} XP claimed`, {
            type: 'success',
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
          })
        }
        setOpen(false)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      mutate({ key: 'fetch_campaign_auth_data', slug })
      toast(`Claim failed`, {
        type: 'error',
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      console.error(error)
    }
  }
  const answerQuestHandler = async () => {
    try {
      if (submitLoading) return
      if (data.requirement.quiz.multiple_choice[0].correct_answer == answerList[selectedAnswer]) {
        setSubmitLoading(true)
        await answerQuest(data.id, answerList[selectedAnswer])
        const correctIndex = answerList.findIndex(
          (ans) => ans == data.requirement.quiz.multiple_choice[0].correct_answer
        )
        setCorrectAnswerIndex(correctIndex)
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
    <>
      <Modal open={open} setOpen={setOpen}>
        <div className='p-5 pt-10 min-w-[360px]'>
          <div className='text-xs leading-[15px] font-semibold'>
            {data.repeat == 'Daily' && (
              <span className='bg-[#E2D8FF] text-[#A247FF] font-bold rounded-[3px] px-2 pb-[1px] text-[10px] leading-[13px] mr-[5px]'>
                Daily
              </span>
            )}
            {data.name}
          </div>
          <div className='mt-[15px] leading-5 font-bold'>Answer a quiz</div>
          {data.description && (
            <>
              <div
                className={`mt-[15px] text-[#777777] text-xs leading-[15px] ${seeMore ? '' : 'line-clamp-3'}`}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}></div>
              <div className='font-semibold text-xs text-second-color' onClick={() => setSeeMore(!seeMore)}>
                {seeMore ? 'See less' : 'See more'}
              </div>
            </>
          )}
          <div className='mt-5 flex flex-col items-center'>
            <div className='text-sm leading-[18px] font-semibold mb-[10px]'>👑 Reward</div>
            {data.reward.nft.img_url ? (
              <>
                <div className='flex flex-col items-center gap-[10px]'>
                  <Image
                    src={data.reward.nft.img_url}
                    alt=''
                    width={180}
                    height={180}
                    className='w-[160px] h-[160px] rounded-lg'
                  />
                  <div className='text-sm leading-[18px] text-subtle-dark'>{data.reward.nft.nft_name}</div>
                  <div className='w-[160px] h-[1px] bg-light-medium-gray'></div>
                  <div className='flex gap-2 items-center'>
                    <div className='text-second-color text-sm leading-[18px] font-bold'>{`+ ${data.reward.xp} XP`}</div>
                    <div className='w-[1px] h-[26px] bg-light-medium-gray'></div>
                    <div className='flex flex-col items-center text-[10px] leading-[13px]'>
                      <div>{`${data.quest_reward_claimed}/${data.reward.slots}`}</div>
                      <div>rewards claimed</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='bg-[#F0F0F0] w-[160px] h-[160px] rounded-lg flex flex-col items-center gap-[10px] p-[10px]'>
                  <Image src={IllusImage} alt='' className='w-[100px] h-[100px]' />
                  <div className='text-second-color text-2xl leading-[30px] font-bold text-center'>
                    {`+ ${data.reward.xp} XP`}
                  </div>
                </div>
                <div className='w-[160px] h-[1px] bg-light-medium-gray my-[10px]'></div>
                <div className='flex flex-col items-center text-[10px] leading-[13px]'>
                  <div>{`${data.quest_reward_claimed}/${data.reward.slots}`}</div>
                  <div>rewards claimed</div>
                </div>
              </>
            )}
            <div className='mt-5 w-full'>
              <div className='bg-[#F0F0F0] rounded-lg p-4 flex flex-col gap-[10px]'>
                <div className='text-sm leading-[18px] text-[#414141] font-semibold'>
                  {data.requirement.quiz.multiple_choice[0].question}
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
                {data.reward_status == 'CAN_CLAIM' || correctAnswerIndex != -1 ? (
                  <FilledButton onClick={claimQuestHandler} className='w-full'>
                    Claim Reward
                  </FilledButton>
                ) : data.reward_status == 'OUT_OF_SLOT' ? (
                  <div className='text-center bg-medium-gray leading-5 font-bold text-light-medium-gray px-6 pt-2 pb-[10px] rounded-[20px]'>
                    Out of reward
                  </div>
                ) : data.reward_status == 'CLAIMED' && data.repeat == 'Daily' ? (
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
                  <div className='text-center bg-medium-gray leading-5 font-bold text-light-medium-gray px-6 pt-2 pb-[10px] rounded-[20px]'>
                    Submit
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div
        className='bg-[#F2F2F2] rounded-[10px] p-4 flex gap-[10px] min-h-[160px]'
        onClick={() => (data.reward_status != 'OUT_OF_SLOT' ? setOpen(true) : null)}>
        <div className='flex-1 flex flex-col justify-between'>
          <div className='flex flex-col justify-between h-[68px]'>
            <div className='text-xs leading-[15px] font-bold min-h-[32px] line-clamp-2'>
              {data.repeat == 'Daily' && (
                <span className='bg-[#E2D8FF] text-[#A247FF] font-bold rounded-[3px] px-2 pb-[1px] text-[10px] leading-[13px] mr-[5px]'>
                  Daily
                </span>
              )}
              {data.name}
            </div>
            <div className='text-xs leading-[15px] font-semibold text-[#646464] flex items-center gap-[10px]'>
              <span>{`${data.reward.xp} XP`}</span>
              {data.reward.nft.img_url && (
                <>
                  <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                  <span>NFT</span>
                </>
              )}
              <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
              <span>{`${data.reward.slots} slots`}</span>
            </div>
          </div>

          {!data.unlock ? (
            <div className='flex gap-[10px] items-center text-xs leading-[15px] text-medium-gray'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='none'
                className='w-6 h-6 shrink-0'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.25 10.5546V8.5C5.25 4.77208 8.27208 1.75 12 1.75C15.7279 1.75 18.75 4.77208 18.75 8.5V10.5546C19.8648 10.6379 20.5907 10.848 21.1213 11.3787C22 12.2574 22 13.6716 22 16.5C22 19.3284 22 20.7426 21.1213 21.6213C20.2426 22.5 18.8284 22.5 16 22.5H8C5.17157 22.5 3.75736 22.5 2.87868 21.6213C2 20.7426 2 19.3284 2 16.5C2 13.6716 2 12.2574 2.87868 11.3787C3.40931 10.848 4.13525 10.6379 5.25 10.5546ZM6.75 8.5C6.75 5.60051 9.10051 3.25 12 3.25C14.8995 3.25 17.25 5.60051 17.25 8.5V10.5036C16.867 10.5 16.4515 10.5 16 10.5H8C7.54849 10.5 7.13301 10.5 6.75 10.5036V8.5ZM14 16.5C14 17.6046 13.1046 18.5 12 18.5C10.8954 18.5 10 17.6046 10 16.5C10 15.3954 10.8954 14.5 12 14.5C13.1046 14.5 14 15.3954 14 16.5Z'
                  fill='#ABABAB'
                />
              </svg>
              <div>
                {!!data.condition.level && <span>{`Reach level ${data.condition.level}`}</span>}
                {!!data.condition.level && !!data.condition.quest_id && <span> and </span>}
                {!!data.condition.quest_id && (
                  <span>
                    Complete quest{' '}
                    <span className='text-second-color'>
                      {data.condition.requiredQuest?.name.length > limitChar
                        ? data.condition.requiredQuest?.name.slice(0, limitChar) + '...'
                        : data.condition.requiredQuest?.name}
                    </span>
                  </span>
                )}
                <span> to unlock</span>
              </div>
            </div>
          ) : data.reward_status == 'CAN_CLAIM' ? (
            <FilledButton className='w-fit' onClick={claimQuestHandler}>
              Claim Reward
            </FilledButton>
          ) : data.reward_status == 'OUT_OF_SLOT' ? (
            <div className='text-xs w-fit bg-[#DEDEDE] leading-[15px] font-bold text-medium-gray px-6 pt-1 pb-[5px] rounded-[20px]'>
              Out of reward
            </div>
          ) : data.reward_status == 'CLAIMED' && data.repeat == 'Daily' ? (
            <div className='text-xs w-fit bg-[#DEDEDE] leading-[15px] font-bold text-medium-gray px-6 pt-1 pb-[5px] rounded-[20px]'>
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
          ) : null}
        </div>
        <div className='w-[140px] max-h-[130px] shrink-0 bg-white rounded-lg px-[10px] pt-[6px] pb-2'>
          {data?.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image
                  src={data?.reward.nft.img_url || NoImage}
                  width={80}
                  height={80}
                  alt=''
                  className='w-[80px] h-[80px] rounded-lg'
                />
              </div>
              <div className='text-xs leading-[15px] text-[#61646B] max-w-[120px] truncate'>
                {data?.reward.nft?.nft_name}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px]' />
              </div>
              <div className='w-full bg-[#61646B] rounded font-bold text-[#23FF81] text-xs leading-[15px] pt-[2px] pb-1 text-center'>{`+ ${data.reward.xp} XP`}</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
