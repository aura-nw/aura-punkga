import MainButton from 'components/Button/MainButton'
import Button from 'components/core/Button/Button'
import Footer from 'components/Footer'
import Header from 'components/Header'
import OutlineTextField from 'components/Input/TextField/Outline'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { useStory } from 'src/context/story'
import { Address, http } from 'viem'
import { waitForTransactionReceipt, readContract, createConfig } from '@wagmi/core'
import { getWagmiConfig } from 'src/services/wagmi/config'
import { mainnet, sepolia } from 'viem/chains'
import { abi } from './abi'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <RegisterIPAssets />
}

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
function RegisterIPAssets() {
  const { account, registerIPAsset } = useContext(Context)
  const router = useRouter()
  const idRef = useRef<any>()
  const r = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { t } = useTranslation()
  const [assetName, setAssetName] = useState('')
  const [nftContract, setNftContract] = useState('')
  const [nftToken, setNftToken] = useState('')
  const { client, walletAddress, txLoading, mintNFT, setTxHash, setTxLoading, setTxName, addTransaction } = useStory()

  useEffect(() => {
    if (!account) router.push('/')
  }, [account])

  const registerExistingNFT = async (tokenId: string, nftContract: Address) => {
    console.log(client)
    if (!client) return

    idRef.current && clearTimeout(idRef.current)
    idRef.current = setTimeout(() => registerExistingNFT(tokenId, nftContract), 60000)
    try {
      setTxLoading(true)
      let ipId = await client.ipAsset.ipAssetRegistryClient.ipId({
        chainId: BigInt(11155111),
        tokenContract: nftContract,
        tokenId: BigInt(tokenId),
      })
      let isReg = await client.ipAsset.ipAssetRegistryClient.isRegistered({
        id: ipId,
      })
      if (!isReg) {
        await client.ipAsset.register({
          nftContract,
          tokenId,
          txOptions: { waitForTransaction: true },
        })
        checking(ipId, tokenId, nftContract)
      } else {
        setTxLoading(false)
      }
      idRef.current && clearTimeout(idRef.current)
    } catch (error) {
      setTxLoading(false)
      console.error('Error registering NFT as IP asset:', error)
    }
  }
  const checking = async (ipId, tokenId, nftContract) => {
    try {
      let isReg = await client.ipAsset.ipAssetRegistryClient.isRegistered({
        id: ipId,
      })
      if (isReg) {
        console.log(`Root IPA created. IPA ID: ${ipId}`)

        await registerIPAsset(account.id, tokenId, nftContract, ipId)

        router.push('/ipassets')
        setTxLoading(false)
      } else {
        setTimeout(() => checking(ipId, tokenId, nftContract), 15000)
      }
    } catch (error) {
      setTxLoading(false)
      console.error('Error registering NFT as IP asset:', error)
    }
  }

  return (
    <>
      <Header />
      <div className='page-content'>
        <div className='pk-container '>
          <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16 flex justify-center w-full'>
            <div className='flex flex-col gap-6 w-[440px]'>
              <p className='text-center text-xl leading-6 font-bold'>{t('Register IPAsset')}</p>
              <div>
                <OutlineTextField
                  label={t('NFT contract address')}
                  value={nftContract}
                  onChange={setNftContract}
                  type='text'
                  placeholder={t('Enter NFT contract address')}
                />
                <OutlineTextField
                  label={t('NFT Token ID')}
                  value={nftToken}
                  onChange={setNftToken}
                  type='text'
                  placeholder={t('Enter NFT token ID')}
                />
              </div>
              <div className='flex justify-center gap-6 items-center w-full'>
                <Button
                  disabled={txLoading}
                  variant='outlined'
                  size='sm'
                  className='w-32'
                  onClick={() => router.push('/ipassets')}>
                  {t('Cancel')}
                </Button>

                <Button
                  size='sm'
                  color='dark'
                  loading={txLoading}
                  disabled={!nftToken || !nftContract}
                  onClick={() => registerExistingNFT(nftToken, nftContract as Address)}
                  className='w-32'>
                  {t('Register')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
