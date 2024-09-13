import Button from 'components/core/Button/Button'
import Modal from 'components/Modal'
import Spinner from 'components/Spinner'
import CopySvg from 'images/icons/copy.svg'
import Warning from 'images/icons/warning.svg'
import getConfig from 'next/config'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WCIcon from 'src/assets/images/wallet-connect.png'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { isMetamaskInstalled, shorten } from 'src/utils'
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'

export default function ConnectModal() {
  const { account, connectHandler } = useContext(Context)

  const { connectWalletOpen: open, setWalletConnectOpen: setOpen } = useContext(ModalContext)
  const { t } = useTranslation()
  const { connectors, connectAsync: wagmiConnect } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect, disconnectAsync } = useDisconnect()
  const { disconnect: wagmiDisconnect } = useDisconnect()
  const [installed, setInstalled] = useState<Connector[]>([])
  const [otherWallet, setOtherWallet] = useState<Connector[]>([])
  //QRCode
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrError, setQRError] = useState('')
  const [isWrongWallet, setIsWrongWallet] = useState(false)
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
          connector.icon && installedWallet.push(connector)
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
    if (account?.activeWalletAddress && address && account.activeWalletAddress.toLowerCase() == address.toLowerCase()) {
      setIsWrongWallet(false)
    } else {
      setIsWrongWallet(true)
    }
  }, [address, account?.activeWalletAddress])
  useEffect(() => {
    if (isConnected && !isWrongWallet) {
      setOpen(false)
    }
  }, [isConnected, isWrongWallet])
  const copyAddress = async () => {
    navigator.clipboard.writeText(account?.custodialWalletAddress)
  }
  return (
    <Modal open={open} setOpen={setOpen} hideClose>
      <div className={` pt-4 px-8 pb-8 w-full max-w-[528px]`}>
        {isConnected ? (
          isWrongWallet ? (
            <div className='flex flex-col gap-2 max-w-[528px] w-full'>
              <div
                className='cursor-pointer text-gray-600 flex justify-end'
                onClick={() => {
                  setOpen(false)
                  disconnect()
                }}>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M18 6.00005L6 18M5.99995 6L17.9999 18'
                    stroke='#000000'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <div className='flex gap-3 mt-3 bg-[#F1E0DE] p-3'>
                <Image src={Warning} alt='warning' width={24} height={24} />
                <div className='text-[#D04046] text-xs font-semibold'>
                  {t('Your account have already linked with another wallet address and could not be changed.')}
                </div>
              </div>
              <div className='flex flex-col gap-3 mt-8'>
                <p className='text-[#414141] text-sm leading-[18px]'>
                  {t('To continue, connect to your linked wallet')}
                </p>
                <div className='w-full flex items-center justify-between px-2 py-3 border-[#DEDEDE] border-[1px] rounded-[4px]'>
                  <div className='flex md:hidden text-[#ABABAB] text-sm font-semibold'>{`${shorten(
                    account?.activeWalletAddress,
                    8,
                    8
                  )}`}</div>
                  <div className='md:flex hidden text-[#ABABAB] text-sm font-semibold'>
                    {account?.activeWalletAddress}
                  </div>

                  <Image className='cursor-pointer' onClick={copyAddress} width={18} height={18} src={CopySvg} alt='' />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                {installed.map((connector) => (
                  <div key={connector.id}>
                    <div
                      className='flex gap-2 w-full items-center hover:bg-[#f0f0f0] bg-[#f0f0f0] md:bg-white cursor-pointer p-2 md:py-3 md:px-4 rounded-lg border-[1px] border-[#DEDEDE]'
                      onClick={async () => {
                        try {
                          await wagmiConnect(
                            { connector, chainId: getConfig().CHAIN_INFO.evmChainId },
                            {
                              onSuccess: connectHandler,
                              onError: (error) => console.log(error)
                            }
                          )
                          if (!isMetamaskInstalled()) {
                            window.open(`https://metamask.app.link/dapp/${location.hostname}/`)
                          }
                        } catch (error: any) {
                          console.error(error.message)
                          wagmiDisconnect()
                        }
                      }}>
                      <Image src={connector.icon} alt={`${connector.name}-Icon`} className='' height={32} width={32} />
                      <div className=''>{connector.name}</div>
                    </div>
                  </div>
                ))}
                {otherWallet.map((connector) => (
                  <div key={connector.id}>
                    <div
                      className='flex gap-2 w-full items-center hover:bg-[#f0f0f0] bg-[#f0f0f0] md:bg-white cursor-pointer p-2 md:py-3 md:px-4 rounded-lg border-[1px] border-[#DEDEDE]'
                      onClick={async () => {
                        try {
                          setShowQRCode(!showQRCode)
                          setLoading(true)
                          setQRError('')
                          wagmiConnect(
                            { connector, chainId: getConfig().CHAIN_INFO.evmChainId },
                            {
                              onSuccess: (data) => {
                                setLoading(false)
                                connectHandler(data)
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
                      <Image src={WCIcon} alt={`${connector.name}-Icon`} height={32} width={32} />
                      <div className=''>{connector.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          <div className='max-w-[354px] flex flex-col gap-3'>
            <p className='text-center text-base leading-6 font-semibold'>{t('Connect wallet')}</p>
            <div className='text-xs leading-[15px] text-center'>
              {t('If you don’t have a wallet yet, you can select a provider and create one now.')}
            </div>
            <div>
              <>
                {!showQRCode ? (
                  <div>
                    {installed.map((connector) => (
                      <div key={connector.id}>
                        <div
                          className='flex gap-2 w-full items-center hover:bg-[#f0f0f0] cursor-pointer py-3 px-4 rounded-[4px]'
                          onClick={async () => {
                            try {
                              setShowQRCode(false)
                              await wagmiConnect(
                                { connector, chainId: getConfig().CHAIN_INFO.evmChainId },
                                {
                                  onSuccess: connectHandler,
                                }
                              )
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
                    ))}
                    {otherWallet.map((connector) => (
                      <div key={connector.id}>
                        <div
                          className='flex gap-2 w-full items-center hover:bg-[#f0f0f0] cursor-pointer py-3 px-4 rounded-[4px]'
                          onClick={async () => {
                            try {
                              setShowQRCode(!showQRCode)
                              setLoading(true)
                              setQRError('')
                              wagmiConnect(
                                { connector, chainId: getConfig().CHAIN_INFO.evmChainId },
                                {
                                  onSuccess: (data) => {
                                    setLoading(false)
                                    connectHandler(data)
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
                    ))}
                    <Button
                      size='md'
                      className='w-fit mx-auto mt-3'
                      onClick={() => {
                        setOpen(false)
                      }}>
                      {t('Close')}
                    </Button>
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
        )}
      </div>
    </Modal>
  )
}
