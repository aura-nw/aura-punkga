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
        {/* <div className='p-3'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              {(quest.repeat == 'Daily' || !quest.unlock) && (
                <div className='flex items-center gap-1.5 mb-2.5'>
                  {quest.repeat == 'Daily' && (
                    <Chip variant='skew' hasLeading color='process'>
                      {t('Daily')}
                    </Chip>
                  )}
                </div>
              )}
              <div className='text-sm lg:text-base font-semibold line-clamp-2 lg:leading-[23px]'>
                {quest[locale].name}
              </div>
            </div>
            <div className='text-xs leading-[18px] lg:text-sm lg:leading-5 font-medium text-text-quatenary flex items-center gap-1.5'>
              <span>{`${quest.reward.xp} ${xpText}`}</span>
              {quest.reward.nft?.img_url && (
                <>
                  <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                  <span>NFT</span>
                </>
              )}
              {!!quest.reward.slots && (
                <>
                  <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                  <span>
                    {locale == 'vn'
                      ? `${quest.reward.slots} phần thưởng`
                      : `${quest.reward.slots} slot${quest.reward.slots > 1 ? 's' : ''}`}
                  </span>
                </>
              )}
            </div>
          </div>
          <div
            className={`${
              quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
            } w-full aspect-square rounded-mlg overflow-hidden relative bg-[#2b2b2b] flex flex-col items-center`}>
            {quest?.reward?.nft?.nft_name ? (
              <>
                <div className='relative aspect-square w-full rounded-lg'>
                  <Image
                    src={quest?.reward?.nft.img_url || NoImage}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                </div>
              </>
            ) : (
              <Image src={xpImageSrc} width={80} height={80} alt='' className='w-[69px] h-[69px] rounded-lg mt-1' />
            )}
            <div className='absolute bg-neutral-950 bottom-0 inset-x-0 w-full py-1.5 text-xs h-6 text-[#00E160] flex justify-center items-end gap-1'>
              <div className=' font-bold leading-3'>{`+ ${quest?.reward?.xp} ${xpText}`}</div>
              {!!quest?.reward?.xp && quest?.reward?.nft?.nft_name && (
                <Image
                  src={xpImageSrc}
                  width={28}
                  height={28}
                  alt=''
                  className='w-[28px] h-[28px] rounded-lg translate-y-1'
                />
              )}
            </div>
          </div>
        </div>
        <div className='mt-2.5 px-2 pb-2 w-full'>
          {quest.reward_status == 'CLAIMED' && quest.repeat == 'Once' ? (
            <div className='rounded-b-md py-1.5 px-3 bg-[#2b2b2b]'>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase w-full text-end'>
                {t('completed!')}
              </div>
            </div>
          ) : quest.reward_status == 'OUT_OF_SLOT' ? (
            <div className='rounded-b-md py-1.5 px-3 bg-[#2b2b2b]'>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase w-full text-end'>
                {t('Out of reward!')}
              </div>
            </div>
          ) : !quest.unlock ? (
            <div className='rounded-b-md flex justify-between items-center w-full py-1.5 px-3 gap-4 bg-[#2b2b2b]'>
              <Popover
                popoverRender={() => {
                  return (
                    <div className='text-xs text-black bg-white py-2 px-3 rounded-lg font-medium w-[]'>
                      {!!quest.condition.level && <span>{`${t('Reach level')} ${quest.condition.level}`}</span>}
                      {!!quest.condition.level && !!quest.condition.quest_id && <span> {t('and')} </span>}
                      {!!quest.condition.quest_id && (
                        <span>
                          {t('Complete quest')}{' '}
                          <span className='text-second-color'>{quest.condition.requiredQuest?.[locale]?.name}</span>
                        </span>
                      )}
                      <span> {t('to unlock')}</span>
                    </div>
                  )
                }}>
                <div className='text-text-quatenary text-xs font-medium line-clamp-1'>
                  {!!quest.condition.level && <span>{`${t('Reach level')} ${quest.condition.level}`}</span>}
                  {!!quest.condition.level && !!quest.condition.quest_id && <span> {t('and')} </span>}
                  {!!quest.condition.quest_id && (
                    <span>
                      {t('Complete quest')}{' '}
                      <span className='text-second-color'>{quest.condition.requiredQuest?.[locale]?.name}</span>
                    </span>
                  )}
                  <span> {t('to unlock')}</span>
                </div>
              </Popover>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase'>{t('Lock')}</div>
            </div>
          ) : quest.reward_status == 'CAN_CLAIM' ? (
            <div className='rounded-b-md py-1.5 px-3 animate-claim-quest bg-[#00E160]'>
              <div
                className='font-jaro text-[26px] leading-[26px] text-black uppercase w-full text-end'
                onClick={(e) => {
                  claimQuestHandler()
                  e.stopPropagation()
                }}>
                {t(loading ? 'Loading' : 'Claim Reward')}
              </div>
            </div>
          ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
            <div className='rounded-b-md flex justify-between items-center w-full py-1.5 px-3 gap-4 bg-[#2b2b2b]'>
              <div className='text-text-quatenary text-xs font-medium line-clamp-1'>
                <span>
                  <Countdown
                    date={moment().add(1, 'd').startOf('day').toISOString()}
                    renderer={({ hours, minutes, seconds }) => {
                      if (locale == 'vn')
                        return (
                          <span>
                            Làm mới sau {zeroPad(hours)} giờ : {zeroPad(minutes)} phút : {zeroPad(seconds)} giây
                          </span>
                        )
                      return (
                        <span>
                          Reset in {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
                        </span>
                      )
                    }}
                  />
                </span>
                <span> {t('to unlock')}</span>
              </div>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase'>{t('completed!')}</div>
            </div>
          ) : (
            <div className='rounded-b-md py-1.5 px-3 bg-[#2b2b2b] animate-claim-quest'>
              <div className='font-jaro text-[26px] text-white leading-[26px] uppercase w-full flex items-start gap-2.5 justify-end'>
                <div>{t('accept quest')}</div>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='23' viewBox='0 0 20 23' fill='none'>
                  <path
                    d='M11.7624 4.5625H1.375L8.60022 13.1839L1.375 21.8054H11.7624L18.9876 13.1839L11.7624 4.5625Z'
                    fill='white'
                  />
                  <path
                    d='M11.7624 4.5625H1.375L8.60022 13.1839L1.375 21.8054H11.7624L18.9876 13.1839L11.7624 4.5625Z'
                    fill='white'
                  />
                </svg>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </>
  )
}
