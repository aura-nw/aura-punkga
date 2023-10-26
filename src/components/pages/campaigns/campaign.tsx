import { useContext, useEffect, useState } from 'react'
import Quest from './quest'
import { getCampaigns } from 'src/services'
import { Campaign } from 'src/models/campaign'
import { Context } from 'src/context'
import HeaderImage from './assets/campaign-filter-header.svg'
import Image from 'next/image'
import useSWR from 'swr'
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
            <svg xmlns='http://www.w3.org/2000/svg' width='60' height='15' viewBox='0 0 60 15' fill='none'>
              <path
                d='M44.9889 13.9997H28.2284H25.582L33.3007 6.28107H38.3729L43.6657 0.988281H58.0004L44.9889 13.9997Z'
                stroke='#292929'
                stroke-width='1.15114'
              />
              <path
                d='M19.4069 13.9997H2.64639H0L7.71865 6.28107H12.7909L18.0837 0.988281H32.4183L19.4069 13.9997Z'
                fill='#292929'
              />
            </svg>
            <div className='font-extrabold text-2xl leading-6'>Campaigns</div>
          </div>
          <div className='flex flex-col gap-4 max-h-[80vh] overflow-auto'>
            <div
              className={`w-full py-4 px-12 font-bold text-lg cursor-pointer rounded-md ${
                !selectedCampaigns.length ? 'bg-second-color text-white' : 'hover:bg-light-gray'
              }`}
              onClick={() => setSelectedCampaigns([])}>
              {`All (${campaigns?.reduce((total, campaign) => total + campaign.campaign_quests.length, 0)})`}
            </div>
            {campaigns?.map((campaign, index) => (
              <div
                className={`w-full py-4 px-12 font-bold text-lg cursor-pointer rounded-md ${
                  selectedCampaigns.includes(campaign.id) ? 'bg-second-color text-white' : 'hover:bg-light-gray'
                }`}
                key={index}
                onClick={() =>
                  selectedCampaigns.includes(campaign.id)
                    ? setSelectedCampaigns((prev) => prev.filter((c) => c != campaign.id))
                    : setSelectedCampaigns([...selectedCampaigns, campaign.id])
                }>
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
                    {campaign.campaign_quests.map((quest, index) => (
                      <Quest data={quest} key={index} />
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
