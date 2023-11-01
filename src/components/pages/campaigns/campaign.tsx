import { useContext, useState } from 'react'
import { Context } from 'src/context'
import { getCampaigns } from 'src/services'
import useSWR from 'swr'
import Quest from './quest'
import { Quest as QuestType } from 'src/models/campaign'
export default function Campaign() {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const { account } = useContext(Context)
  const { data: campaigns } = useSWR(
    { key: 'get_all_campaigns', accountId: account?.id },
    ({ accountId }) => getCampaigns(accountId),
    { refreshInterval: 10000 }
  )
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-10'>
        <div className='flex-1 flex flex-col gap-4 sticky top-[100px] h-fit'>
          <div className='flex gap-[15px] items-end mb-4'>
            <div className='font-extrabold text-2xl leading-6'>Campaigns</div>
          </div>
          <div className='flex flex-col gap-4 max-h-[80vh] overflow-auto'>
            <div
              className={`w-full py-4 px-12 font-bold text-lg cursor-pointer flex items-center ${
                !selectedCampaigns.length ? 'text-second-color' : ''
              }`}
              onClick={() => setSelectedCampaigns([])}>
              <div
                className={`${
                  !selectedCampaigns.length ? 'bg-second-color' : 'bg-[#1C375A]/20'
                } inline-block rounded mr-3 w-5 h-5 shrink-0`}>
                {!selectedCampaigns.length && (
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <path
                      d='M6.28033 9.77562C5.98744 9.48272 5.51256 9.48272 5.21967 9.77562C4.92678 10.0685 4.92678 10.5434 5.21967 10.8363L7.94202 13.5586C8.23492 13.8515 8.70979 13.8515 9.00268 13.5586L15.447 7.11431C15.7399 6.82142 15.7399 6.34655 15.447 6.05365C15.1541 5.76076 14.6792 5.76076 14.3863 6.05365L8.47235 11.9676L6.28033 9.77562Z'
                      fill='white'
                    />
                  </svg>
                )}
              </div>
              {`All (${campaigns?.reduce((total, campaign) => total + campaign.campaign_quests.length, 0) || '0'})`}
            </div>
            {campaigns?.map((campaign, index) => (
              <div
                className={`w-full py-4 px-12 font-bold text-lg cursor-pointer flex items-center  ${
                  selectedCampaigns.includes(campaign.id) ? 'text-second-color' : ''
                }`}
                key={index}
                onClick={() =>
                  selectedCampaigns.includes(campaign.id)
                    ? setSelectedCampaigns((prev) => prev.filter((c) => c != campaign.id))
                    : setSelectedCampaigns([...selectedCampaigns, campaign.id])
                }>
                <div
                  className={`${
                    selectedCampaigns.includes(campaign.id) ? 'bg-second-color' : 'bg-[#1C375A]/20'
                  } inline-block rounded mr-3 w-5 h-5 shrink-0`}>
                  {selectedCampaigns.includes(campaign.id) && (
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path
                        d='M6.28033 9.77562C5.98744 9.48272 5.51256 9.48272 5.21967 9.77562C4.92678 10.0685 4.92678 10.5434 5.21967 10.8363L7.94202 13.5586C8.23492 13.8515 8.70979 13.8515 9.00268 13.5586L15.447 7.11431C15.7399 6.82142 15.7399 6.34655 15.447 6.05365C15.1541 5.76076 14.6792 5.76076 14.3863 6.05365L8.47235 11.9676L6.28033 9.77562Z'
                        fill='white'
                      />
                    </svg>
                  )}
                </div>
                {`${campaign.name} (${campaign.campaign_quests.length})`}
              </div>
            ))}
          </div>
        </div>
        <div className='flex-[3] pt-[50px]'>
          <div className='flex flex-col'>
            {campaigns
              ?.filter((campaign) => !selectedCampaigns.length || selectedCampaigns.includes(campaign.id))
              ?.map((campaign, index) => (
                <div key={index}>
                  <div className='text-2xl font-bold text-[#414141] mb-5'>#{campaign.name}</div>
                  <div className='grid grid-cols-3 gap-y-9 gap-x-10'>
                    {campaign.campaign_quests.map((quest: QuestType) => (
                      <Quest data={quest} key={quest.id} />
                    ))}
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
