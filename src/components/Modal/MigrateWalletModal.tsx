import Mascot from 'assets/images/Mascot_5_1.png'
import Button from 'components/core/Button/Button'
import Modal from 'components/core/Modal'
import Spinner from 'components/Spinner'
import getConfig from 'next/config'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { SiweMessage, generateNonce } from 'siwe'
import WCIcon from 'src/assets/images/wallet-connect.png'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import useLocalStorage from 'src/hooks/useLocalStorage'
import { getRequestLog, linkWallet } from 'src/services'
import { Connector, useAccount, useChainId, useConnect, useDisconnect, useSignMessage } from 'wagmi'
export default function MigrateWalletModal() {
  const { getProfile } = useContext(Context)
  const { migrateWalletOpen: open, setMigrateWalletOpen: setOpen } = useContext(ModalContext)
  const { t } = useTranslation()
  const [success, setSuccess] = useState(undefined)
  const [requestId, setRequestId] = useLocalStorage('request_id', undefined)
  const [step, setStep] = useState(1)
  const { connectors, connectAsync: wagmiConnect } = useConnect()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessage } = useSignMessage()
  const { disconnect: wagmiDisconnect, disconnectAsync } = useDisconnect()
  const [installed, setInstalled] = useState<Connector[]>([])
  const [otherWallet, setOtherWallet] = useState<Connector[]>([])
  const chainId = useChainId()
  //QRCode
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrError, setQRError] = useState('')

  useEffect(() => {
    const setConnector = async () => {
      const installedWallet = [] as Connector[]
      const otherWallet = [] as Connector[]
      const mobile = [] as Connector[]

      for (let i = 0; i < connectors.length; i++) {
        const connector = connectors[i]

        if (connector.type === 'injected') {
          if (connector.id === 'injected') {
            mobile.push(connector)
          }
          if (connector.id == 'app.subwallet') {
            connector.icon && installedWallet.unshift(connector)
          } else {
            connector.icon && installedWallet.push(connector)
          }
        } else if (connector.type === 'walletConnect') {
          otherWallet.push(connector)
        }
      }
      setInstalled(installedWallet)
      setOtherWallet(otherWallet)
    }

    setConnector()
  }, [connectors])
  useEffect(() => {
    let id
    if (!open) {
      id = setTimeout(() => setStep(1), 400)
    }
    return () => (id ? clearTimeout(id) : undefined)
  }, [open])
  const linkWalletHandler = async () => {
    try {
      const domain = window.location.host
      const origin = window.location.origin
      const statement = 'Migrate wallet with Aura Network to the app.'
      const siweMessage = new SiweMessage({
        scheme: undefined,
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId,
        nonce: generateNonce(),
      })
      const message = siweMessage.prepareMessage()
      signMessage(
        { message, account: address },
        {
          onSuccess: async (data) => {
            const res = await linkWallet(message, data)
            if (res?.data?.requestId) {
              getProfile()
              setRequestId(res?.data?.requestId)
              setSuccess(true)
            } else {
              getProfile()
              setSuccess(false)
            }
          },
        }
      )
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
      // toast('Migration failed', { type: 'error' })
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
            <Button size='sm' className='w-fit mx-auto' onClick={() => setOpen(false)}>
              {t('Done')}
            </Button>
          </div>
        ) : success === false ? (
          <div className='flex flex-col gap-2 max-w-[452px]'>
            <p className='text-center text-base leading-6 font-semibold md:text-lg md:leading-[23px]'>
              {t('Wallet connection failed')}
            </p>
            <p className='text-center text-sm leading-[18px] my-4'>
              {t('This wallet has been linked to another account.')}
            </p>
            <Button
              className='w-fit mx-auto'
              size='sm'
              variant='outlined'
              onClick={() => {
                setOpen(false)
                setTimeout(() => setSuccess(undefined), 300)
                setStep(1)
                wagmiDisconnect()
              }}>
              {t('Close')}
            </Button>
          </div>
        ) : address ? (
          <div className='flex flex-col gap-3'>
            <p className='text-center text-base leading-6 font-semibold md:text-lg md:leading-[23px]'>
              {t('Confirm to migrate assets')}
            </p>
            <p className='text-center text-sm leading-[18px] -mt-1'>
              {t('All of your assets on Punkga will be transferred to your wallet')}
            </p>
            <div className='my-3 p-3 rounded-md bg-gray-900 text-[#1FAB5E] text-sm leading-[18px] w-fit mx-auto'>
              {address}
            </div>
            <div className='flex justify-center gap-6 items-center'>
              <Button
                variant='outlined'
                size='sm'
                onClick={() => {
                  setOpen(false)
                  setTimeout(disconnect, 400)
                  wagmiDisconnect()
                }}>
                {t('Cancel')}
              </Button>
              <Button size='sm' onClick={linkWalletHandler}>
                {t('Confirm')}
              </Button>
            </div>
          </div>
        ) : step == 1 ? (
          <div className='max-w-[354px] flex flex-col gap-3'>
            <p className='text-center text-base leading-6 font-semibold md:text-lg md:leading-[23px]'>
              {t('Migrate your wallet')}
            </p>
            <div className='p-4 text-xs leading-[15px] text-white bg-gray-900 rounded-2xl'>
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
            <Button size='sm' className='w-fit mx-auto' onClick={() => setStep(2)}>
              {t('Connect Wallet')}
            </Button>
          </div>
        ) : step == 2 ? (
          <div className='max-w-[354px] flex flex-col gap-3'>
            <p className='text-center text-base leading-6 font-semibold'>{t('Migrate your wallet')}</p>
            <div className='text-xs leading-[15px] text-center'>
              {t('If you don’t have a wallet yet, you can select a provider and create one now.')}
            </div>
            <div>
              <>
                {!showQRCode ? (
                  <div>
                    {
                      installed.map((connector) => (
                        <div key={connector.id}>
                          <div
                            className='flex gap-2 w-full items-center hover:bg-gray-900 cursor-pointer py-3 px-4 rounded-[4px]'
                            onClick={async () => {
                              try {
                                setShowQRCode(false)
                                await wagmiConnect({ connector, chainId: getConfig().DEFAULT_CHAIN_ID })
                              } catch (error: any) {
                                console.error(error)
                                wagmiDisconnect()
                              }
                            }}>
                            <Image
                              src={connector.icon}
                              alt={`${connector.name}-Icon`}
                              className=''
                              height={32}
                              width={32}
                            />
                            <div className=' font-semibold'>{connector.name}</div>
                          </div>
                        </div>
                      ))
                    }
                    {
                      otherWallet.map((connector) => (
                        <div key={connector.id}>
                          <div
                            className='flex gap-2 w-full items-center hover:bg-gray-900 cursor-pointer py-3 px-4 rounded-[4px]'
                            onClick={async () => {
                              try {
                                setShowQRCode(!showQRCode)
                                setLoading(true)
                                setQRError('')
                                wagmiConnect(
                                  { connector, chainId: getConfig().DEFAULT_CHAIN_ID },
                                  {
                                    onSuccess: (data) => {
                                      setLoading(false)
                                    },

                                    onError: (props) => {
                                      setQRError(props.message)
                                    },
                                  }
                                )
                                const provider = (await connector.getProvider()) as any
                                const deepLink = await new Promise<string>((resolve) => {
                                  provider.on('display_uri', (uri: string) => {
                                    resolve(uri)
                                  })
                                })
                                setLoading(false)
                                setQrCode(deepLink)
                              } catch (error: any) {
                                wagmiDisconnect()
                              }
                            }}>
                            <Image src={WCIcon} alt={`${connector.name}-Icon`} height={30} width={30} />
                            <div className='font-semibold'>{connector.name}</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className='flex flex-col gap-6'>
                    <div
                      className='font-semibold text-[#414141] flex items-center cursor-pointer'
                      onClick={() => setShowQRCode(false)}>
                      <span className='mr-1'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                          <path
                            d='M15 5L9 12L15 19'
                            stroke='#1C274C'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                      {t('Scan with your wallet')}
                    </div>
                    <div className='flex flex-col items-center'>
                      {loading ? (
                        <div className='w-[290px] bg-[#f0f0f0] rounded-lg aspect-square flex justify-center items-center'>
                          <Spinner className='w-8 h-8' />
                        </div>
                      ) : (
                        <>
                          {qrError && (
                            <div className='expired'>
                              {/* <Icon name='danger' size='xl' /> */}
                              {qrError}
                            </div>
                          )}
                          <QRCodeSVG value={qrCode} size={290} level='H' bgColor='#FFFFFF' fgColor='#000000' />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  )
}
