import { Tooltip } from '@mui/material'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Image from 'next/image'
import TextField from 'components/Input/TextField'
import Mascot from 'assets/images/mascot.png'
import MainButton from 'components/Button/MainButton'
import { Stack } from '@mui/material'
import useSWR, { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shorten } from 'src/utils'
import moment from 'moment'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import { useStory } from 'src/context/story'
import OutlineTextField from 'components/Input/TextField/Outline'

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <MintLicense {...props} />
}

function createData(
    licenseID: string,
    licenseTemplateAddress: string,
    licenseTermId: number,
    mintDate: number,
) {
    return { licenseID, licenseTemplateAddress, licenseTermId, mintDate };
}

const rows = [
    createData('ABC123', '0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7', 12, 1620000000),
    createData('ABC123', '0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7', 12, 1620000000),
    createData('ABC123', '0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7', 12, 1620000000),
    createData('ABC123', '0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7', 12, 1620000000),
    createData('ABC123', '0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7', 12, 1620000000),
];
function MintLicense({ }) {
    const router = useRouter()
    const mref = useRef<any>()
    const { t } = useTranslation()
    const [uriLicenseTerms, setUriLicenseTerms] = useState('')
    const [licenseAmount, setLicenseAmount] = useState<number>()
    const [attributionLink, setAttributionLink] = useState('')
    const [commercialRevenueShare, setCommercialRevenueShare] = useState<number>()
    const { client, walletAddress, txLoading, mintNFT, setTxHash, setTxLoading, setTxName, addTransaction } = useStory()
    const [selectedOption, setSelectedOption] = useState('non-commercial');

    return (
        <>
            <Header />
            <div className='page-content'>
                <div className='pk-container '>
                    <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16 gap-6 flex flex-col'>
                        <span className='font-bold text-xl'>Mint License</span>
                        <div className='flex gap-10 h-fit'>
                            <div className='w-[290px] flex flex-col gap-6'>
                                <Image className='rounded-2xl bg-light-gray object-cover'
                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                    alt="Blank Image"
                                    width={290}
                                    height={290}
                                />
                                <div className='rounded-2xl bg-[#F0F0F0] py-4'>
                                    <span className='font-semibold mb-2 flex justify-center'>Commercial Use</span>
                                    <div className='px-2 text-xs'>
                                        <ul className='list-disc list-outside pl-4 flex flex-col gap-2'>
                                            <li>The license is transferable</li>
                                            <li>Free Minting License</li>
                                            <li>Pepertual expiration</li>
                                            <li>Everyone can commercialize the derivative</li>
                                            <li>Commercial use must refer to the original creator</li>
                                            <li>Everyone can remix this work and commercial derivative work </li>
                                            <li>Derivative must refer to the licensor </li>
                                            <li>Users mustn’t obtain permission from licensor before registering derivative work</li>
                                            <li>Derivatives of derivatives can’t be created</li>
                                            <li>All payments paid by USDT</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[calc(100%_-_290px)] flex flex-col'>
                                <div className='flex gap-10'>
                                    <div className='rounded-2xl p-6 border-[#DEDEDE] border-[1px] flex flex-col gap-5 w-[calc(100%/3*2)] h-fit'>
                                        <div className='font-bold text-[#1C1C1C]'>
                                            IPAsset: Bolar Bear #02
                                        </div>
                                        <span className='w-full block border-[1px] border-solid border-[#F0F0F0] '></span>
                                        <div className='grid grid-cols-3'>
                                            <div className='border-r-[1px] border-[#F0F0F0]'>
                                                <div className='text-xs'>IPAccount address:</div>
                                                <div className='text-sm text-[#2684FC]'>{shorten('0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7')}</div>
                                            </div>
                                            <div className='border-r-[1px] border-[#F0F0F0] pl-[15px]'>
                                                <div className='text-xs'>IPAsset ID:</div>
                                                <div className='text-sm text-[#2684FC]'>02</div>
                                            </div>
                                            <div className='pl-[15px]'>
                                                <div className='text-xs'>Number of Licenses Token:</div>
                                                <div className='text-sm font-bold'>02</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-2xl p-6 border-[#DEDEDE] border-[1px] flex flex-col gap-5 w-[calc(100%/3)] h-fit'>

                                        <Tooltip title={"NFT:  Bolar Bear #84"} placement="top">
                                            <div className='font-bold text-[#1C1C1C] truncate'>
                                                NFT:  Bolar Bear #84
                                            </div>
                                        </Tooltip>
                                        <span className='w-full block border-[1px] border-solid border-[#F0F0F0] '></span>
                                        <div className='grid grid-cols-2'>
                                            <div className='border-r-[1px] border-[#F0F0F0]'>
                                                <div className='text-xs'>IPAccount address:</div>
                                                <div className='text-sm text-[#2684FC]'>{shorten('0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7')}</div>
                                            </div>
                                            <div className='pl-[15px]'>
                                                <div className='text-xs'>NFT Token ID:</div>
                                                <div className='text-sm text-[#2684FC]'>02</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6 mt-16 '>
                                    <span className='font-bold text-[20px]'>Choose a License Term preset</span>
                                    <div className='flex justify-start'>
                                        <Dropdown>
                                            <DropdownToggle>
                                                {(open) => (
                                                    <div
                                                        className={`p-[10px] rounded-lg bg-[#F2F2F2] flex hover:bg-white justify-between cursor-pointer items-center w-[390px] ${open
                                                            ? 'border-primary-color border bg-white p-[9px]'
                                                            : 'hover:border hover:border-[#DEDEDE] hover:p-[9px]'
                                                            }`}>
                                                        <div className='px-[5px] text-sm leading-[18px] font-semibold'>
                                                            {selectedOption}
                                                        </div>
                                                        <div
                                                            className={`rounded-full p-[5px] aspect-square bg-[#C6FFDE] grid place-items-center ${open ? 'rotate-180' : ''
                                                                }`}>
                                                            <svg xmlns='http://www.w3.org/2000/svg' width='8' height='4' viewBox='0 0 8 4' fill='none'>
                                                                <path
                                                                    d='M1.4513 0L4.0013 2.47467L6.5513 0L7.33463 0.765333L4.0013 4L0.667969 0.765333L1.4513 0Z'
                                                                    fill='#1FAB5E'
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </DropdownToggle>
                                            <DropdownMenu customClass='rounded-[8px]' closeOnClick>
                                                <div className='w-[233px] bg-[#F2F2F2] cursor-pointer'>
                                                    <div className='p-[15px] text-sm font-semibold' onClick={() => setSelectedOption('Non-commercial social remix')}>
                                                        {`Non-commercial social remix`}
                                                    </div>
                                                    <div className='p-[15px] text-sm font-semibold' onClick={() => setSelectedOption('Commercial use')}>
                                                        {`Commercial use`}
                                                    </div>
                                                </div>
                                            </DropdownMenu>
                                        </Dropdown>

                                    </div>


                                    <div className=' w-full p-6 rounded-xl bg-[#F0F0F0] justify-between h-max'>

                                        <div className='grid grid-cols-2 gap-6'>
                                            <OutlineTextField
                                                label={t('URI License Terms')}
                                                value={uriLicenseTerms}
                                                onChange={setUriLicenseTerms}
                                                type='text'
                                                placeholder={t('Enter a link')}
                                            />
                                            <OutlineTextField
                                                label={t('License amount')}
                                                value={licenseAmount ? licenseAmount.toString() : ''}
                                                onChange={(e) => setLicenseAmount(Number(e))}
                                                type='text'
                                                placeholder={t('Enter an amountD')}
                                            />
                                        </div>
                                        <div className='grid grid-cols-2 gap-6'>
                                            <OutlineTextField
                                                label={t('URI License Terms')}
                                                value={attributionLink}
                                                onChange={setAttributionLink}
                                                type='text'
                                                placeholder={t('Enter a link')}
                                            />
                                            {selectedOption === 'Commercial use' && (
                                                <OutlineTextField
                                                    label={t('License amount')}
                                                    value={commercialRevenueShare ? commercialRevenueShare.toString() : ''}
                                                    onChange={(e) => setCommercialRevenueShare(Number(e))}
                                                    type='text'
                                                    placeholder={t('Enter an amountD')}
                                                />)}
                                        </div>
                                        <div className='flex justify-center gap-6 items-center w-full'>
                                            <MainButton disabled={txLoading} style='outline' className='w-[129px]' onClick={() => router.push('/ipassets')}>
                                                {t('Cancel')}
                                            </MainButton>

                                            <MainButton
                                                loading={txLoading}
                                                disabled={!licenseAmount || !attributionLink}
                                                onClick={() => { }}
                                                className='w-[129px]'>
                                                {t('Mint License')}
                                            </MainButton>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
