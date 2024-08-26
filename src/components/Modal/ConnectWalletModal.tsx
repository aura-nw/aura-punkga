import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { useContext, useEffect, useState } from 'react'
import WCIcon from 'src/assets/images/wallet-connect.png'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { sepolia } from 'viem/chains'
import { Connector, useConnect, useDisconnect } from 'wagmi'
export default function ConnectWalletModal() {
  const { connectWalletOpen: show } = useContext(ModalContext)
  const { connectHandler, account } = useContext(Context)
  const { connectors, connectAsync: wagmiConnect } = useConnect()
  const { disconnect: wagmiDisconnect, disconnectAsync } = useDisconnect()
  const [installed, setInstalled] = useState<Connector[]>([])
  const [otherWallet, setOtherWallet] = useState<Connector[]>([])

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

  return (
    <Transition
      show={show}
      enter='transition-all duration-500 delay-200'
      enterFrom='max-h-[0vh] opacity-0'
      enterTo='max-h-screen opacity-100'
      leave='transition-all duration-500'
      leaveFrom='max-h-screen opacity-100'
      leaveTo='max-h-[0vh] opacity-0'>
      <div className='p-5 flex gap-10 max-w-3xl min-w-[768px]'>
        <div className='w-1/2'>
          <div className=''>
            <div className='font-semibold text-lg'>Installed Wallets</div>
            <div className='mt-3 flex flex-col gap-2'>
              {installed.map((connector) => (
                <div key={connector.id}>
                  <div
                    className='flex gap-2 ml-3 items-center hover:bg-[#ebeaea] cursor-pointer w-fit py-2 px-5 rounded-lg'
                    onClick={async () => {
                      try {
                        setShowQRCode(false)
                        await wagmiConnect({ connector, chainId: sepolia.id }, { onSuccess: connectHandler })
                      } catch (error: any) {
                        wagmiDisconnect()
                      }
                    }}>
                    <Image src={connector.icon} alt={`${connector.name}-Icon`} className='' height={30} width={30} />
                    <div className=' font-semibold'>{connector.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className='font-semibold text-lg mt-10'>Other Wallets</div>
            <div className='other-wallet mt-3'>
              <div key='wallet-connect'>
                {otherWallet.map((connector) => (
                  <div key={connector.id}>
                    <div
                      className='flex gap-2 ml-3 items-center hover:bg-[#ebeaea] cursor-pointer w-fit py-2 px-5 rounded-lg'
                      onClick={async () => {
                        try {
                          setShowQRCode(!showQRCode)
                          setLoading(true)
                          setQRError('')
                          wagmiConnect(
                            { connector, chainId: sepolia.id },
                            {
                              onSuccess: (data) => {
                                setLoading(false)
                                if (data?.accounts[0] == account?.activeWalletAddress) {
                                  connectHandler(data)
                                }
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
              </div>
            </div>
          </div>

          <div className='text-xs max-w-[270px] mx-auto text-center mt-20'>
            By connecting your wallet, you agree to our{' '}
            <Link href='/policy' target='_blank' rel='noreferrer'>
              <span className='text-[#2684FC] cursor-pointer'>Terms of Service</span>
            </Link>{' '}
            and{' '}
            <Link href='/policy' target='_blank' rel='noreferrer'>
              <span className='text-[#2684FC] cursor-pointer'>Privacy Policy</span>
            </Link>
            .
          </div>
        </div>

        <div className='w-1/2'>
          {showQRCode ? (
            !loading ? (
              <div>
                <div className=''>
                  <div className='font-semibold text-lg'>
                    {/* <Icon name='mobile' /> */}
                    Scan with your wallet
                  </div>
                </div>
                <div className='mt-5 flex flex-col items-center'>
                  {qrError && (
                    <div className='expired'>
                      {/* <Icon name='danger' size='xl' /> */}
                      {qrError}
                    </div>
                  )}
                  <QRCodeSVG value={qrCode} size={290} level='H' bgColor='#FFFFFF' fgColor='#000000' />
                </div>
              </div>
            ) : (
              <div className='grid place-items-center p-10 w-full h-full bg-neutral-200 rounded-lg'></div>
            )
          ) : (
            <div className='grid place-items-center p-10 w-full h-full bg-neutral-200 rounded-lg'>
              <p className='text-center text-sm font-medium'>
                Wallets are used to send, receive, store digital assets like Aura and NFTs.
              </p>
            </div>
          )}
        </div>
      </div>
    </Transition>
  )
}
