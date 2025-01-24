import Chip from 'components/core/Chip'
import KPImage from 'components/pages/campaigns/assets/ic_Kp.svg'
import XPImage from 'components/pages/campaigns/assets/illus.svg'
import SFImage from 'components/pages/campaigns/assets/sf.png'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import pluralize from 'pluralize'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { claimQuest, getRequestLog } from 'src/services'
import QuestDetailModal from '../campaigns/questItem/questDetailModal'
export default function QuestItem({
  quest,
  refreshCallback,
}: {
  quest: Quest
  refreshCallback?: (status: string) => void
}) {
  const { getProfile } = useContext(Context)
  const [open, setOpen] = useState(false)
  const [seeMore, setSeeMore] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const revealResult = async (id: string) => {
    const data = await getRequestLog(id)
    if (data?.status == 'SUCCEEDED') {
      await getProfile(data?.status)
      refreshCallback(data?.status)
      setOpen(false)
      setLoading(false)
      return
    }
    if (data?.status == 'FAILED') {
      setOpen(false)
      setLoading(false)
      refreshCallback(data?.status)
      await getProfile()
      toast('Claim failed. Please try again later.', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    setTimeout(() => revealResult(id), 4000)
  }

  const claimQuestHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      const res = await claimQuest(quest.id)
      if (res?.requestId) {
        revealResult(res?.requestId)
      } else {
        toast(res?.errors?.message || 'Claim failed. Please try again later.', {
          type: 'error',
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        })
        console.error(res?.errors?.message)
        setOpen(false)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (open) setSeeMore(undefined)
  }, [open])
  const xpImageSrc = quest.pointText == 'KP' ? KPImage : quest.pointText == 'SF' ? SFImage : XPImage
  const xpText = quest.pointText
  return (
    <>
      <QuestDetailModal
        quest={quest}
        open={open}
        setOpen={setOpen}
        claimQuestHandler={claimQuestHandler}
        loading={loading}
      />
      <div
        className={`bg-[#292B2F] border border-neutral-900 rounded-lg relative p-3 flex gap-4 ${
          quest.unlock &&
          (quest.reward_status == 'CAN_CLAIM' ||
            quest.reward_status == 'NOT_SATISFY' ||
            (quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily'))
            ? 'cursor-pointer '
            : null
        }`}
        onClick={() =>
          quest.unlock &&
          (quest.reward_status == 'CAN_CLAIM' ||
            quest.reward_status == 'NOT_SATISFY' ||
            (quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily'))
            ? setOpen(true)
            : null
        }>
        {' '}
        <div className='bg-neutral-950 rounded-md w-12 h-12 shrink-0 overflow-hidden'>
          {quest?.reward?.nft?.nft_name ? (
            <Image
              src={quest?.reward?.nft.img_url || NoImage}
              alt=''
              width={300}
              height={300}
              objectFit='cover'
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='p-1.5 w-full h-full'>
              <Image src={xpImageSrc} width={80} height={80} alt='' className='w-full h-full' />
            </div>
          )}
        </div>
        <div className='flex-1 space-y-2'>
          <div className='flex items-center gap-1.5'>
            {quest.repeat == 'Daily' && <Chip color='process'>{t('Daily')}</Chip>}
            <span className='text-sm font-semibold line-clamp-1 min-h-0'>{quest[locale].name}</span>
          </div>
          <div className='text-text-quatenary font-medium text-xs flex items-center gap-2.5'>
            <span>{`${quest.reward.xp} ${xpText}`}</span>
            {quest.reward.nft?.img_url && (
              <>
                <span className='w-1 h-1 rounded-full bg-text-quatenary'></span>
                <span>NFT</span>
              </>
            )}
            {!!quest.reward.slots && (
              <>
                <span className='w-1 h-1 rounded-full bg-text-quatenary'></span>
                <span>
                  {locale == 'vn'
                    ? `${quest.reward.slots} phần thưởng`
                    : `${quest.reward.slots} ${pluralize('slot', quest.reward.slots)}`}
                </span>
              </>
            )}
          </div>
        </div>
        <div>
          {quest.reward_status == 'CAN_CLAIM' ? (
            <div
              className={`w-12 h-12 rounded-md bg-neutral-black flex items-center justify-center gap-1.5 flex-col ${
                loading ? 'opacity-70 pointer-events-none' : ''
              }`}
              onClick={(e) => {
                claimQuestHandler()
                e.stopPropagation()
              }}>
              <div className='w-4 h-4 rounded-full bg-brand-default grid place-items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M7.25 5.375L10.375 8.5L7.25 11.625'
                    stroke='black'
                    strokeWidth='0.9375'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <span className='text-xxs text-brand-default'>Claim</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  )
}
