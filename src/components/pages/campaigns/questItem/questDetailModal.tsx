import Chip from 'components/core/Chip'
import Modal from 'components/core/Modal'
import KPImage from 'components/pages/campaigns/assets/ic_Kp.svg'
import XPImage from 'components/pages/campaigns/assets/illus.svg'
import SFImage from 'components/pages/campaigns/assets/sf.png'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'react-i18next'
import { Quest } from 'src/models/campaign'
import FreeQuest from './freeQuest'
import MintBadgeSuccessModal from './mintBadgeSuccessModal'
import MintQuest from './mintQuest'
import QuizQuest from './quizQuest'
import RefQuest from './refQuest'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { toast } from 'react-toastify'
import { checkQuestStatus } from 'src/services'
import { mutate } from 'swr'
import { Context } from 'src/context'
export default function QuestDetailModal({
  quest,
  open,
  setOpen,
  claimQuestHandler,
  loading,
}: {
  quest: Quest
  open: boolean
  loading: boolean
  setOpen: (v: boolean) => void
  claimQuestHandler: any
}) {
  const [openNFTPreview, setOpenNFTPreview] = useState(false)
  const { t } = useTranslation()
  const { account } = useContext(Context)
  const [hash, setHash] = useState('')
  const xpImageSrc = quest.pointText == 'KP' ? KPImage : quest.pointText == 'SF' ? SFImage : XPImage
  const xpText = quest.pointText
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState(quest.status)
  const [checking, setChecking] = useState(false)
  const { query, locale } = useRouter()
  const slug = query.campaignSlug as string
  const checkQuestHandler = useCallback(async () => {
    try {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available')
        return
      }
      const token = await executeRecaptcha('check_status')
      if (!token) {
        toast('Verify failed by reCAPCHA. Please reload and try again!', {
          type: 'error',
        })
        return
      }
      if (checking) return
      setChecking(true)
      const res = await checkQuestStatus(quest.id, token)
      if (res.data.reward_status) {
        setStatus(res.data.reward_status)
        mutate({ key: 'fetch_campaign_auth_data', slug, account: account?.id })
      } else {
        if (res.data?.errors?.message == 'check Captcha Error')
          throw new Error(t('Verify failed by reCAPCHA. Please reload and try again!'))
        else throw new Error()
      }
      setChecking(false)
    } catch (error) {
      setChecking(false)
      toast(error?.message || 'Check quest status failed. Please try again later.', {
        type: 'error',
      })
      console.error(error)
    }
  }, [executeRecaptcha])
  return (
    <>
      <MintBadgeSuccessModal hash={hash} setHash={setHash} />
      <Modal open={open} setOpen={setOpen}>
        <Modal open={openNFTPreview} setOpen={() => setOpenNFTPreview(false)}>
          <div className='p-10 flex flex-col items-center'>
            <Image
              src={quest?.reward?.nft?.img_url}
              width={600}
              height={600}
              alt=''
              className='max-w-[800px] w-[80vw] aspect-square rounded-lg object-contain bg-white'
            />
          </div>
        </Modal>
        <div className='p-5 pt-10 w-[90vw] max-w-[800px] lg:w-[644px] lg:grid-cols-[1fr_130px] lg:grid lg:gap-x-8 lg:grid-rows-[auto_1fr]'>
          <div>
            {quest.repeat == 'Daily' && (
              <Chip color='process' hasLeading variant='skew'>
                {t('Daily')}
              </Chip>
            )}
            <div className='mt-1.5 text-lg leading-[26px] font-semibold'>{quest[locale].name}</div>
            <div className='mt-3 flex flex-col items-center md:hidden'>
              <div
                className={`${
                  quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
                } w-full max-w-[130px] aspect-square rounded-mlg overflow-hidden relative bg-[#191919] flex flex-col items-center`}>
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
                  <Image src={xpImageSrc} width={80} height={80} alt='' className='w-[96px] h-[96px] rounded-lg mt-1' />
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
              {!!quest.reward.slots && (
                <>
                  <div className='flex flex-col items-center text-[10px] text-text-quatenary leading-[13px] lg:text-xs lg:leading-[18px] mt-1.5'>
                    <div>{`${
                      quest.repeat_quests?.[0]?.repeat_quest_reward_claimed == undefined
                        ? quest.quest_reward_claimed
                        : quest.repeat_quests?.[0]?.repeat_quest_reward_claimed
                    }/${quest.reward.slots}`}</div>
                    <div>{t('rewards claimed')}</div>
                  </div>
                </>
              )}
            </div>
            {!!quest[locale].description && (
              <div className={`mt-3 text-text-quatenary text-sm max-h-[120px] overflow-auto`}>
                {ReactHtmlParser(quest[locale].description)}
              </div>
            )}
          </div>
          <div className='mt-5 lg:mt-0 md:flex flex-col items-center row-span-2 hidden'>
            <div
              className={`${
                quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
              } w-full aspect-square rounded-mlg overflow-hidden relative bg-[#191919] flex flex-col items-center`}>
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
                <Image src={xpImageSrc} width={80} height={80} alt='' className='w-[96px] h-[96px] rounded-lg mt-1' />
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
            {!!quest.reward.slots && (
              <>
                <div className='flex flex-col items-center text-[10px] text-text-quatenary leading-[13px] lg:text-xs lg:leading-[18px] mt-1.5'>
                  <div>{`${
                    quest.repeat_quests?.[0]?.repeat_quest_reward_claimed == undefined
                      ? quest.quest_reward_claimed
                      : quest.repeat_quests?.[0]?.repeat_quest_reward_claimed
                  }/${quest.reward.slots}`}</div>
                  <div>{t('rewards claimed')}</div>
                </div>
              </>
            )}
          </div>
          {[
            'Comment',
            'Like',
            'Subscribe',
            'Read',
            'FollowX',
            'RepostX',
            'JoinDiscord',
            'EngagesEventManga',
            'LikeEventArtwork',
            'CollectIP',
            'StakeIP',
          ].includes(quest.type) && (
            <RefQuest
              quest={quest}
              loading={loading}
              claimQuestHandler={claimQuestHandler}
              setOpen={setOpen}
              checkQuestHandler={checkQuestHandler}
              checking={checking}
              status={status}
            />
          )}
          {quest.type == 'Empty' && (
            <FreeQuest
              quest={quest}
              loading={loading}
              claimQuestHandler={claimQuestHandler}
              checkQuestHandler={checkQuestHandler}
              checking={checking}
              status={status}
            />
          )}
          {quest.type == 'MintBadge' && (
            <MintQuest
              quest={quest}
              setHash={setHash}
              loading={loading}
              setOpen={setOpen}
              claimQuestHandler={claimQuestHandler}
              checkQuestHandler={checkQuestHandler}
              checking={checking}
              status={status}
            />
          )}
          {quest.type == 'Quiz' && (
            <QuizQuest
              quest={quest}
              loading={loading}
              claimQuestHandler={claimQuestHandler}
              open={open}
              setOpen={setOpen}
            />
          )}
        </div>
      </Modal>
    </>
  )
}
