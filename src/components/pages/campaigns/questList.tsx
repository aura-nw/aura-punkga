import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import Checkbox from 'components/Input/Checkbox'
import Mascot2 from 'components/pages/campaigns/assets/Mascot2.svg'
import Mascot3 from 'components/pages/campaigns/assets/Mascot3.svg'
import Image from 'next/image'
import { useState } from 'react'
import { Quest } from 'src/models/campaign'
import QuestItem from './questItem'
import { useTranslation } from 'react-i18next'
import CheckboxDropdown from 'components/CheckBox/CheckBoxDropDown'
export default function QuestList({
  quests,
  isEnded,
  refreshCallback,
}: {
  quests: undefined | Quest[]
  isEnded: boolean
  refreshCallback?: () => void
}) {
  const [rewardNFTChecked, setRewardNFTChecked] = useState<boolean>(false)
  const [filter, setFilter] = useState<string[]>(['All quests'])
  const { t } = useTranslation()
  const questList = quests?.map((quest) => {
    if (quest.reward_status == 'OUT_OF_SLOT') {
      return {
        ...quest,
        weight: 4,
      }
    }
    if (quest.reward_status == 'CLAIMED') {
      return {
        ...quest,
        weight: 3,
      }
    }
    if (!quest.unlock) {
      return {
        ...quest,
        weight: 2,
      }
    }
    if (quest.unlock) {
      return {
        ...quest,
        weight: 1,
      }
    }
  })
  return (
    <div className='mt-8'>
      <div className='lg:flex lg:items-center lg:flex-wrap lg:justify-between'>
        <p className='text-lg leading-[23px] lg:text-xl lg:leading-[25px] font-medium'>
          {quests && !isEnded
            ? `${t('Quests')} (${
                quests.filter(
                  (quest) =>
                    (filter?.[0] != 'All quests' ? quest.repeat == filter?.[0] : true) &&
                    (rewardNFTChecked ? !!quest.reward.nft?.nft_name : true)
                ).length
              })`
            : t('Quests')}
        </p>
        {quests && !isEnded && (
          <div className='mt-[10px] flex justify-between items-center lg:mt-0 lg:gap-4'>
            <div className='p-1'>
              <Checkbox
                label={t('Reward NFT')}
                checked={rewardNFTChecked}
                onClick={() => setRewardNFTChecked(!rewardNFTChecked)}
              />
            </div>
            <span className='h-4 w-[1px] bg-border-primary'></span>
            <div>
              <CheckboxDropdown
                selected={filter}
                onChange={setFilter}
                allKey='All quests'
                label='All quests'
                options={[
                  {
                    key: 'All quests',
                    value: t('All quests'),
                  },
                  {
                    key: 'Once',
                    value: `${t('Once')} (${questList.filter((quest) => quest.repeat == 'Once').length})`,
                  },
                  {
                    key: 'Daily',
                    value: `${t('Daily')} (${questList.filter((quest) => quest.repeat == 'Daily').length})`,
                  },
                ]}
                placeholder={t('All quests')}
              />
            </div>
          </div>
        )}
      </div>
      {isEnded ? (
        <div className='mt-5 p-6 lg:mt-9 lg:p-6 flex flex-col items-center w-full'>
          <Image src={Mascot3} alt='' className='w-[160px] h-[160px]' />
          <div className='text-sm leading-[18px] lg:text-base lg:leading-5 font-medium mt-5 text-center'>
            {t('Campaign Ended')}
          </div>
        </div>
      ) : !quests ? (
        <div className='mt-5 p-6 lg:mt-9 lg:p-6 flex flex-col items-center w-full'>
          <Image src={Mascot2} alt='' className='w-[160px] h-[160px]' />
          <div className='text-sm leading-[18px] lg:text-base lg:leading-5 font-medium mt-5 text-center'>
            {t('Enroll to view quests and leaderboard')}
          </div>
        </div>
      ) : !quests.length ? (
        <div className='mt-5 p-6 lg:mt-9 lg:p-6 flex flex-col items-center w-full'>
          <Image src={Mascot2} alt='' className='w-[160px] h-[160px]' />
          <div className='text-sm leading-[18px] lg:text-base lg:leading-5 font-medium mt-5 text-center'>
            {t('No quests to show')}
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 2xl:grid-cols-2 gap-5 mt-5'>
          {questList
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .sort((a, b) => a.weight - b.weight)
            .filter(
              (quest) =>
                (filter?.[0] != 'All quests' ? quest.repeat == filter?.[0] : true) &&
                (rewardNFTChecked ? !!quest.reward.nft?.nft_name : true)
            )
            .map((quest: Quest, index) => (
              <QuestItem quest={quest} key={quest.id} refreshCallback={refreshCallback} />
            ))}
        </div>
      )}
    </div>
  )
}
