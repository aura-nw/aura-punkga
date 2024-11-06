import Button from 'components/core/Button/Button'
import moment from 'moment'
import getConfig from 'next/config'

import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { Quest } from 'src/models/campaign'
import { checkQuestStatus, getMintNftSignature } from 'src/services'
import { storyBadgeAbi } from 'src/services/abi/storyBadgeAbi'
import { storyChain } from 'src/services/wagmi/config'
import { mutate } from 'swr'
import { useAccount, useChainId, useSwitchChain, useWriteContract } from 'wagmi'
export default function MintQuest({
  quest,
  loading,
  claimQuestHandler,
  setOpen,
  setHash,
}: {
  quest: Quest
  loading: boolean
  claimQuestHandler: () => void
  setOpen: (v: boolean) => void
  setHash: (v: string) => void
}) {
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const { account } = useContext(Context)
  const { setMigrateWalletOpen, setWalletConnectOpen } = useContext(ModalContext)
  const config = getConfig()
  const [status, setStatus] = useState(quest.reward_status)
  const [checking, setChecking] = useState(false)
  const [minting, setMinting] = useState(false)
  const chainId = useChainId()
  const { writeContractAsync } = useWriteContract()
  const { switchChainAsync } = useSwitchChain()
  const { isConnected } = useAccount()
  const slug = query.campaignSlug as string
  const checkQuestHandler = async () => {
    try {
      if (checking) return
      setChecking(true)
      const res = await checkQuestStatus(quest.id)
      if (res.data) {
        setStatus(res.data.reward_status)
        mutate({ key: 'fetch_campaign_auth_data', slug, account: account?.id })
      }
      setChecking(false)
      console.log(res)
    } catch (error) {
      setChecking(false)
      toast(error?.message || 'Claim failed. Please try again later.', {
        type: 'error',
      })
      console.error(error)
    }
  }
  const mintHandler = async () => {
    try {
      if (minting) return
      setMinting(true)
      if (!account.noncustodialWalletAddress) {
        setOpen(false)
        setMigrateWalletOpen(true)
      } else {
        if (chainId != storyChain.id) {
          await switchChainAsync({
            chainId: storyChain.id,
          })
        }
        if (!isConnected) {
          setWalletConnectOpen(true)
        } else {
          const signature = await getMintNftSignature(quest.id)
          const hash = await writeContractAsync({
            address: '0xdc96b7965c9CbE067359A1562D7E1F73b9809937',
            abi: storyBadgeAbi,
            functionName: 'mint',
            args: [account.noncustodialWalletAddress, signature.data.signature],
          })
          setHash(hash)
        }
      }
      setMinting(false)
    } catch (error) {
      setMinting(false)
      toast(error?.message || 'Claim failed. Please try again later.', {
        type: 'error',
      })
      console.error(error)
    }
  }
  return (
    <div className='mt-5 w-full lg:mt-10'>
      {status == 'CAN_CLAIM' ? (
        <Button size='sm' loading={loading} onClick={claimQuestHandler} className='w-full'>
          {t('Claim Reward')}
        </Button>
      ) : status == 'OUT_OF_SLOT' ? (
        <Button size='sm' disabled className='w-full'>
          {t('Out of reward')}
        </Button>
      ) : status == 'CLAIMED' && quest.repeat == 'Daily' ? (
        <Button size='sm' disabled className='w-full'>
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
        </Button>
      ) : (
        <div className='grid grid-cols-[60%_1fr] gap-5'>
          <Button className='w-full' size='sm' onClick={mintHandler} loading={minting}>
            {t('Mint NFT')}
          </Button>
          <Button size='sm' className='w-full' variant='outlined' onClick={checkQuestHandler} loading={checking}>
            {t('Check')}
          </Button>
        </div>
      )}
    </div>
  )
}
