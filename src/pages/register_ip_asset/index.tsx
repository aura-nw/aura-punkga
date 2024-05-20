import Footer from 'components/Footer'
import Header from 'components/Header'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react'
import MainButton from 'components/Button/MainButton'
import OutlineTextField from 'components/Input/TextField/Outline'

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <RegisterIPAssets />
}
function RegisterIPAssets() {
    const router = useRouter()
    const mref = useRef<any>()
    const r = useRouter()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const { t } = useTranslation()
    const [assetName, setAssetName] = useState('')
    const [nftContract, setNftContract] = useState('')
    const [nftToken, setNftToken] = useState('')
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
                                    label={t('IPAsset name')}
                                    value={assetName}
                                    onChange={setAssetName}
                                    type='text'
                                    placeholder={t('IPAsset name')}
                                />
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
                                <MainButton style='outline' className='w-32' onClick={() => router.push('/ipassets')}>
                                    {t('Cancel')}
                                </MainButton>

                                <MainButton className='w-32'>
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
