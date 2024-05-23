import Footer from 'components/Footer'
import Header from 'components/Header'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useContext, useEffect, useRef, useState } from 'react'
import MainButton from 'components/Button/MainButton'
import OutlineTextField from 'components/Input/TextField/Outline'
import { custom, Address } from 'viem'
import { StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { useStory } from 'src/context/story'
import { Context } from 'src/context'

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <RegisterIPAssets />
}
function RegisterIPAssets() {
    const { account, registerIPAsset } = useContext(Context)
    const router = useRouter()
    const mref = useRef<any>()
    const r = useRouter()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const { t } = useTranslation()
    const [assetName, setAssetName] = useState('')
    const [nftContract, setNftContract] = useState('')
    const [nftToken, setNftToken] = useState('')
    const { client, walletAddress, txLoading, mintNFT, setTxHash, setTxLoading, setTxName, addTransaction } = useStory()

    const registerExistingNFT = async (tokenId: string, nftContract: Address) => {
        if (!client) return
        setTxLoading(true)
        setTxName('Registering an NFT as an IP Asset...')
        try {
        const response = await (client.ipAsset as any).register({
            nftContract,
            tokenId,
            txOptions: { waitForTransaction: true },
        })
        if (response.error) {
            setTxLoading(false)
            return
        }

        console.log(`Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`)
        setTxLoading(false)
        setTxHash(response.txHash as string)
        addTransaction(response.txHash as string, 'Register IPA', {
            ipId: response.ipId,
        })

        await registerIPAsset(account.id,tokenId, nftContract, response.ipId)
      
          router.push('/ipassets')
        } catch (error) {
          setTxLoading(false)
          console.error('Error registering NFT as IP asset:', error)
        }
        router.push('/ipassets')
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
                                <MainButton disabled={txLoading} style='outline' className='w-32' onClick={() => router.push('/ipassets')}>
                                    {t('Cancel')}
                                </MainButton>

                                <MainButton
                                    loading={txLoading}
                                    disabled={!nftToken || !nftContract}
                                    onClick={() => registerExistingNFT(nftToken, nftContract as Address)}
                                    className='w-32'>
                                    {t('Register')}
                                </MainButton>
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
