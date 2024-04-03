import { useChain, useWallet } from '@cosmos-kit/react'
import Modal from 'components/Modal'
import FilledButton from 'components/core/Button/FilledButton'
import Mail from 'images/Mail.svg'
import getConfig from 'next/config'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import KeplrWalletImage from 'assets/images/keplr.png'
import C98WalletImage from 'assets/images/c98.png'
import OutlineButton from 'components/core/Button/OutlinedButton'
import { makeSignDoc } from '@cosmjs/amino'
import { toast } from 'react-toastify'
import { getRequestLog, linkWallet } from 'src/services'
import useLocalStorage from 'src/hooks/useLocalStorage'
import Mascot from 'assets/images/Mascot_5_1.png'
export default function MigrateWalletModal({ open, setOpen }) {
  const { account, getProfile } = useContext(Context)
  const { t } = useTranslation()
  const chainName = getConfig().CHAIN_ID.includes('xstaxy') ? 'aura' : 'auratestnet'
  const { connect, walletRepo, address, disconnect, chain } = useChain(chainName)
  const { status: globalStatus, mainWallet } = useWallet()
  const [success, setSuccess] = useState(false)
  const [requestId, setRequestId] = useLocalStorage('request_id', undefined)
  const [step, setStep] = useState(1)
  useEffect(() => {
    let id
    if (!open) {
      id = setTimeout(() => setStep(1), 400)
    }
    return () => (id ? clearTimeout(id) : undefined)
  }, [open])
  const linkWalletHandler = async () => {
    try {
      if (mainWallet?.client?.signArbitrary && address) {
        const msg = `Welcome to Punkga.me!

This message is only to authenticate yourself. Please sign to proceed with using Punkga.me.

Signing this message will not trigger a blockchain transaction or cost any gas fees.

To ensure your security, your authentication status will reset after you close the browser.

By continuing, you will link your wallet address to your Punkga account. This process won't be irreversible.

Wallet address:
${address}

Timestamp:
${Date.now()}`
        const signDoc = makeSignDoc(
          [
            {
              type: 'sign/MsgSignData',
              value: {
                signer: address,
                data: btoa(msg),
              },
            },
          ],
          {
            gas: '0',
            amount: [],
          },
          '',
          undefined,
          '0',
          '0'
        )
        const signResult = await mainWallet.client.signArbitrary(chain.chain_id, address, msg)
        const res = await linkWallet(signDoc, signResult)
        if (res?.data?.requestId) {
          getProfile()
          setRequestId(res?.data?.requestId)
          setSuccess(true)
        }
      }
    } catch (error: any) {
      toast(error.message || t('Migration failed'), {
        type: 'error',
      })
    }
  }

  useEffect(() => {
    if (requestId) {
      revealResult(requestId)
    }
  }, [requestId])

  const revealResult = async (id: string) => {
    const data = await getRequestLog(id)
    if (data?.status == 'SUCCEEDED') {
      toast('Migration successfull', { type: 'success' })
      setRequestId(undefined)
      return
    }
    if (data?.status == 'FAILED') {
      toast('Migration failed', { type: 'success' })
      setRequestId(undefined)
      return
    }
    setTimeout(() => revealResult(id), 5000)
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className={` py-6 px-[18px] w-full max-w-[670px]`}>
        {success ? (
          <div className='flex flex-col gap-2 max-w-[452px]'>
            <p className='text-center text-base leading-6 font-semibold md:text-lg md:leading-[23px]'>
              {t('Wallet migration successful!')}
            </p>
            <p className='text-center text-sm leading-[18px] -mt-1'>
              {t('Transferring asset may takes a few minutes. Now you can explore Punkga using your wallet.')}
            </p>
            <div className='my-4 grid place-items-center w-full'>
              <Image src={Mascot} alt='' />
            </div>
            <FilledButton className='w-fit mx-auto' onClick={() => setOpen(false)}>
              Done
            </FilledButton>
          </div>
        ) : address ? (
          <div className='flex flex-col gap-3'>
            <p className='text-center text-base leading-6 font-semibold md:text-lg md:leading-[23px]'>
              {t('Confirm to migrate assets')}
            </p>
            <p className='text-center text-sm leading-[18px] -mt-1'>
              {t('All of your assets on Punkga will be transferred to your wallet')}
            </p>
            <div className='my-3 p-3 rounded-md bg-[#F2F2F2] text-[#1FAB5E] text-sm leading-[18px] w-fit mx-auto'>
              {address}
            </div>
            <div className='flex justify-center gap-6 items-center'>
              <OutlineButton
                onClick={() => {
                  setOpen(false)
                  setTimeout(disconnect, 400)
                }}>
                {t('Cancel')}
              </OutlineButton>
              <FilledButton onClick={linkWalletHandler}>{t('Confirm')}</FilledButton>
            </div>
          </div>
        ) : step == 1 ? (
          <div className='max-w-[354px] flex flex-col gap-3'>
            <p className='text-center text-base leading-6 font-semibold md:text-lg md:leading-[23px]'>
              {t('Migrate your wallet')}
            </p>
            <div className='p-6 text-xs leading-[15px] text-subtle-dark bg-light-gray rounded-2xl'>
              <span>
                {t(
                  'You currently use a custodial wallet which only valid on Punkga. Migrating your own wallet allows you to:'
                )}
              </span>
              <ul className='list-outside list-disc pl-6 mt-5'>
                <li>{t('Using your wallet to log in')}</li>
                <li>{t('Access special content without transferring NFTs to the Punkga wallet')}</li>
                <li>{t('Trade NFTs on marketplaces')}</li>
              </ul>
            </div>
            <FilledButton className='w-fit mx-auto' onClick={() => setStep(2)}>
              {t('Connect Wallet')}
            </FilledButton>
          </div>
        ) : step == 2 ? (
          <div className='max-w-[354px] flex flex-col gap-3'>
            <p className='text-center text-base leading-6 font-semibold'>{t('Migrate your wallet')}</p>
            <div className='text-xs leading-[15px] text-center'>
              {t('If you don’t have a wallet yet, you can select a provider and create one now.')}
            </div>
            <div>
              {walletRepo?.wallets.map((wallet, index) => {
                return wallet.walletName.includes('keplr') ? (
                  <div
                    key={index}
                    className={`py-3 flex gap-2 items-center ${
                      wallet.walletStatus == 'NotExist'
                        ? 'cursor-not-allowed opacity-60 pointer-events-none'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => wallet.connect()}>
                    {wallet.walletStatus == 'Connecting' ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='32'
                        height='32'
                        viewBox='0 0 32 32'
                        fill='none'
                        className='animate-pulse'>
                        <circle cx='16' cy='16' r='4' fill='#1FAB5E' />
                      </svg>
                    ) : (
                      <Image src={KeplrWalletImage} alt='' className='w-8 h-8' />
                    )}
                    <div className='text-sm font-semibold'>Keplr</div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className={`py-3 flex gap-2 items-center ${
                      wallet.walletStatus == 'NotExist'
                        ? 'cursor-not-allowed opacity-60 pointer-events-none'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => wallet.connect()}>
                    {wallet.walletStatus == 'Connecting' ? (
                      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
                        <circle cx='16' cy='16' r='4' fill='#1FAB5E' />
                      </svg>
                    ) : (
                      <Image src={C98WalletImage} alt='' className='w-8 h-8' />
                    )}
                    <div className='text-sm font-semibold'>Coin98</div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  )
}
