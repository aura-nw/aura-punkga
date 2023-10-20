import { useContext, useEffect, useState } from 'react'
import Quest from './quest'
import { getCampaigns } from 'src/services'
import { Campaign } from 'src/models/campaign'
import { Context } from 'src/context'
import HeaderImage from './assets/campaign-filter-header.svg'
import Image from 'next/image'
export default function Campaign() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const { account } = useContext(Context)
  useEffect(() => {
    fetchAllCampaign()
  }, [])
  const fetchAllCampaign = async () => {
    try {
      const data = await getCampaigns(account?.id)
      setCampaigns(data)
    } catch (error) {}
  }
  return (
    <>
      <div className='mb-20'>
        <Image src={HeaderImage} alt='' />
        <div className='border-r-2 border-[#ABABAB] border-l-2 px-10 flex gap-[10px]'>
          {campaigns.map((campaign, index) => (
            <div
              className={`p-[10px] bg-[#F2F2F2] border-[#DEDEDE] hover:border-[#C6FFDE] cursor-pointer border-[length:1px] rounded-lg text-[#ababab] leading-5 ${
                selectedCampaigns.includes(campaign.id) ? '!border-primary-color !bg-black !text-primary-color' : ''
              }`}
              key={index}
              onClick={() =>
                selectedCampaigns.includes(campaign.id)
                  ? setSelectedCampaigns((prev) => prev.filter((c) => c != campaign.id))
                  : setSelectedCampaigns([...selectedCampaigns, campaign.id])
              }>
              {campaign.name}
            </div>
          ))}
        </div>
        <div className='-mt-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1642'
            height='17'
            viewBox='0 0 1642 17'
            fill='none'
            className='w-full'>
            <path
              d='M0.999023 0.000938416V0.000938416C0.999023 1.18476 1.46768 2.32045 2.30254 3.15976L12.0512 12.9602C13.9279 14.8469 16.4793 15.9078 19.1404 15.908L1622.85 16.0012C1625.52 16.0014 1628.07 14.9405 1629.94 13.0535L1639.63 3.3196C1640.5 2.43796 1641 1.245 1641 0.00146484V0.00146484'
              stroke='#ABABAB'
              stroke-width='2'
            />
          </svg>
        </div>
      </div>
      <div className='flex flex-col gap-20'>
        {campaigns
          .filter((campaign) => !selectedCampaigns.length || selectedCampaigns.includes(campaign.id))
          .map((campaign, index) => (
            <div key={index}>
              <div className='flex gap-2 mb-10'>
                <svg xmlns='http://www.w3.org/2000/svg' width='95' height='23' viewBox='0 0 95 23' fill='none'>
                  <path
                    d='M72.1036 22.0001H45.2414H41L53.3708 9.62929H61.5001L69.9829 1.14648H92.9572L72.1036 22.0001Z'
                    stroke='#292929'
                  />
                  <path
                    d='M31.1036 22.0001H4.2414H0L12.3708 9.62929H20.5001L28.9829 1.14648H51.9572L31.1036 22.0001Z'
                    fill='#292929'
                  />
                </svg>
                <span className='uppercase text-[32px] font-bold text-[#414141] font-orbitron leading-6'>
                  {campaign.name}
                </span>
              </div>
              <div className='grid grid-cols-4 gap-9'>
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
    </>
  )
}
