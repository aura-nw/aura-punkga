import Modal from 'components/Modal';
import { useState } from 'react';
import { Quest } from 'src/models/campaign';

export default function QuestItem({ quest }: { quest: Quest }) {
  console.log(quest)
  return <div></div>
}
function ReadingQuest({ data }: { data: Quest }) {
  const [open, setOpen] = useState(false)
  return <>
    <Modal open={open} setOpen={setOpen} >
      abc
    </Modal>
    <div>
      abnc
    </div>
  </>
}