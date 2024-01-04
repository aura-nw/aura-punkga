import { Quest } from 'src/models/campaign'
import BasicQuest from './basicQuest'
import QuizQuest from './quizQuest'

export default function QuestItem({ quest }: { quest: Quest }) {
  if (quest.type == 'Read' || quest.type == 'Comment' || quest.type == 'Subscribe' || quest.type == 'Like') {
    return <BasicQuest data={quest} />
  }
  if (quest.type == 'Quiz') return <QuizQuest data={quest} />
  // if (quest.type == 'Poll') return <PollQuest data={quest} />
  return <div></div>
}
