import Modal from 'components/Modal'
import { useState } from 'react'
import { Quest } from 'src/models/campaign'

export default function QuestItem({ quest }: { quest: Quest }) {
  if (quest.type == 'Read') {
    return <ReadingQuest data={quest} />
  }
  return <div></div>
}
function ReadingQuest({ data }: { data: Quest }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        abc
      </Modal>
      <div className='bg-[#F2F2F2] rounded-[10px] p-4 flex gap-[10px]'>
        <div className='flex-1'>
          <div className='text-xs leading-[15px] font-bold min-h-[32px]'>
            {data.repeat == 'Daily' && (
              <span className='bg-[#E2D8FF] text-[#A247FF] font-bold rounded-[3px] px-2 pb-[1px] text-[10px] leading-[13px] mr-[5px]'>
                Daily
              </span>
            )}
            {data.name}
          </div>
        </div>
        <div className='w-[140px] shrink-0'></div>
      </div>
    </>
  )
}
