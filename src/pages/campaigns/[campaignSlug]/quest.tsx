import Modal from 'components/Modal'
import Image from 'next/image'
import { useState } from 'react'
import { Quest } from 'src/models/campaign'
import NoImage from 'images/no_img.png'
import IllusImage from 'components/pages/campaigns/assets/illus.svg'
import FilledButton from 'components/Button/FilledButton'
import Countdown, { zeroPad } from 'react-countdown'
import moment from 'moment'

export default function QuestItem({ quest }: { quest: Quest }) {
  if (quest.type == 'Read') {
    return <ReadingQuest data={quest} />
  }
  return <div></div>
}
function ReadingQuest({ data }: { data: Quest }) {
  const [open, setOpen] = useState(false)
  console.log(data)
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        abc
      </Modal>
      <div className='bg-[#F2F2F2] rounded-[10px] p-4 flex gap-[10px] h-[160px]' onClick={() => setOpen(true)}>
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

          {data.reward_status == 'CAN_CLAIM' ? (
            <FilledButton className='w-fit'>Claim Reward</FilledButton>
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
        <div className='w-[140px] shrink-0 bg-white rounded-lg px-[10px] pt-[6px] pb-2'>
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
