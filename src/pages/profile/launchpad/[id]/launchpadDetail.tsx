import { Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import BigNumber from 'bignumber.js';
import CopySvg from 'images/icons/copy.svg';
import _ from 'lodash';
import moment from 'moment';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import ic_question_circle from "src/assets/images/icons/ic_question_circle.svg";
import ic_trash from "src/assets/images/icons/ic_trash.svg";
import { useAccount, useConnect, useWriteContract } from 'wagmi';
import MainButton from '../../../../components/Button/MainButton';
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import Modal from '../../../../components/Modal';
import UploadImage from '../../../../components/pages/launchpad/uploadImage';
import { LaunchpadStatus } from '../../../../constants/constants';
import useApi from '../../../../hooks/useApi';
import { shorten } from "../../../../utils";
import { abi } from './abi';
import { getLaunchpad } from './with-api';

export function getFileNameFromURL(url: string) {
    let parts = url.split('/');
    let fileName = parts[parts.length - 1];
    fileName = fileName.replace(/%20/g, ' ');
    if (fileName.startsWith('nft_images-')) {
        fileName = fileName.substring('nft_images-'.length);
    }
    return fileName;
}

function LaunchpadDetail({ preDeploy, postDeploy, publish, unpublish }:
    {
        preDeploy: (id: string) => any,
        postDeploy: (id: string, txHash: string) => any,
        publish: (id: string) => any,
        unpublish: (id: string) => any,
    }) {
    const router = useRouter()
    const { id } = router.query
    const { address } = useAccount()
    const { connectors, connectAsync } = useConnect()
    const launchpad = useApi<any>(() => getLaunchpad(id as string), true, [])

    const { t } = useTranslation()
    const { writeContractAsync, isPending } = useWriteContract()
    const [isCopied, setIsCopied] = useState(false)
    const [openDeploy, setOpenDeploy] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openPublish, setOpenPublish] = useState(false)
    const [openUnpublish, setOpenUnpublish] = useState(false)

    const handleDeploy = async (id: string) => {
        console.log(address);
        if (!address) {
            await connectAsync({ connector: connectors.find((c) => c.id == 'io.metamask') })
        }
        const data = await preDeploy(id)
        try {
            const hash = await writeContractAsync({
                abi,
                address: '0x2f6646dad93454f681f7c0edc2df82931473ddb5',
                functionName: 'createNFTSale',
                args: [
                    [
                        address,
                        launchpad.data?.license_token_address, // licenseAddress
                        launchpad.data?.license_token_id, // license token id
                        launchpad.data?.name,
                        moment(launchpad.data?.start_date).unix(),
                        moment(launchpad.data?.end_date).unix(),
                        BigInt(+launchpad.data?.max_supply),
                        BigInt(+launchpad.data?.max_mint_per_address)
                    ],
                    [
                        '0x0000000000000000000000000000000000000000',
                        '0x3C93715FdCd6E0B043BD1ae7e1e437cA6dc391C6', // usdt address
                        +launchpad.data?.mint_price,
                        `${data?.metadataContractURI}/`,
                        `${data?.metadataURIBase}/`,
                        0,
                        address
                    ]
                ],
            })
            if (hash) {
                await postDeploy(id, hash)
                setOpenDeploy(false)
                toast('Deployed', { type: 'success' })
                router.push('/profile/launchpad')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePublish = async (id: string) => {
        await publish(id)
        setOpenPublish(false)
        toast('Published', { type: 'success' })
        router.push('/profile/launchpad')
    }

    const handleUnpublish = async (id: string) => {
        unpublish(id)
        setOpenUnpublish(false)
        toast('Unpublished', { type: 'success' })
        router.push('/profile/launchpad')
    }

    const genButtons = (status: string) => {
        switch (LaunchpadStatus[status]) {
            case LaunchpadStatus.DRAFT:
                return (
                    <>
                        <MainButton className='flex-1' onClick={() => setOpenDeploy(true)}>{t('Deploy')}</MainButton>
                        <MainButton className='flex-1' onClick={() => router.push(`/profile/launchpad/${launchpad.data?.id}/edit`)}>{t('Edit')}</MainButton>
                        <MainButton
                            style='secondary'
                            className='flex-1 px-0'
                            onClick={() => setOpenDelete(true)}>
                            <Image src={ic_trash} alt={'ic_trash'} />
                        </MainButton>
                        <Modal open={openDeploy} setOpen={() => setOpenDeploy(false)}>
                            <div className='p-6 flex flex-col items-center gap-6'>
                                <p className='text-xl font-bold text-[#414141]'>Deploy launchpad</p>
                                <div className='flex flex-col items-center'>
                                    <div className='inline-block'>
                                        <p className='text-sm font-normal inline'>Please confirm to deploy</p>{' '}
                                        <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}.</p>
                                    </div>
                                    <p className='text-sm font-normal'>After deploying, only the description and images can be edited</p>
                                </div>
                                <MainButton className='px-8' onClick={() => handleDeploy(id as string)}>{t('Confirm')}</MainButton>
                            </div>
                        </Modal>
                        <Modal open={openDelete} setOpen={() => setOpenDelete(false)}>
                            <div className='py-6 px-10 flex flex-col items-center gap-6'>
                                <p className='text-xl font-bold text-[#414141]'>Delete launchpad</p>
                                <div className='flex flex-col items-center'>
                                    <div className='inline-block text-sm font-normal'>
                                        <p className='inline'>Are you sure to delete</p>{' '}
                                        <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}</p>?
                                    </div>
                                    <p className='text-sm font-normal'>This process is irreversible.</p>
                                </div>
                                <MainButton className='px-8' onClick={() => { console.log(123) }}>{t('Confirm')}</MainButton>
                            </div>
                        </Modal>
                    </>
                )
            case LaunchpadStatus.READY_TO_MINT:
                return (
                    <>
                        <MainButton
                            style='secondary'
                            className='flex-1'
                            onClick={() => router.push(`/profile/launchpad/${launchpad.data?.id}/edit`)}>
                            {t('Edit')}
                        </MainButton>
                        <MainButton className='flex-1' onClick={() => setOpenPublish(true)}>{t('Publish')}</MainButton>
                        <Modal open={openPublish} setOpen={() => setOpenPublish(false)}>
                            <div className='p-6 flex flex-col items-center gap-6'>
                                <p className='text-xl font-bold text-[#414141]'>Publish launchpad</p>
                                <div className='flex flex-col items-center'>
                                    <div className='inline-block text-sm font-normal'>
                                        <p className='inline'>Sure to publish</p>{' '}
                                        <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}</p>?
                                    </div>
                                    <p className='text-sm font-normal'>This launchpad will be shown on the mainsite once you confirm.</p>
                                </div>
                                <MainButton className='px-8' onClick={() => handlePublish(id as string)}>{t('Confirm')}</MainButton>
                            </div>
                        </Modal>
                    </>
                )
            case LaunchpadStatus.PUBLISHED:
                return (
                    <>
                        <MainButton
                            style='secondary'
                            onClick={() => setOpenUnpublish(true)}>
                            {t('Unpublish')}
                        </MainButton>
                        <Modal open={openUnpublish} setOpen={() => setOpenUnpublish(false)}>
                            <div className='p-6 flex flex-col items-center gap-6'>
                                <p className='text-xl font-bold text-[#414141]'>Unpublish launchpad</p>
                                <div className='flex flex-col items-center'>
                                    <div className='inline-block text-sm font-normal'>
                                        <p className='inline'>Sure to unpublish</p>{' '}
                                        <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}</p>{' '}
                                        <p className='inline'>from Mainsite?</p>
                                    </div>
                                    <p className='text-sm font-normal'>You can edit the launchpad when it’s unpublished.</p>
                                </div>
                                <MainButton className='px-8' onClick={() => handleUnpublish(id as string)}>{t('Confirm')}</MainButton>
                            </div>
                        </Modal>
                    </>
                )
        }

    }

    const copyAddress = async () => {
        navigator.clipboard.writeText(launchpad.data?.creator_address)
        setIsCopied(true)
        _.debounce(() => {
            _.delay(() => setIsCopied(false), 3000)
        }, 1000)()
    }

    return (
        <>
            <Header />
            <div className='pk-container'>
                <div className='flex flex-col gap-6'>
                    <div className='sticky top-8 bg-white pt-16 pb-6 flex flex-col gap-3'>
                        <div className='text-base leading-5 font-bold md:text-2xl md:leading-[18px] md:font-extrabold whitespace-nowrap'>
                            {launchpad.data?.name}
                        </div>
                        {launchpad.data?.contract_address && (<div className="flex gap-2">
                            <p className="text-[#414141] text-sm">Launchpad contract address:</p>
                            <div
                                className='flex gap-2 cursor-pointer justify-between items-center text-second-color text-sm font-medium  relative'
                                onClick={copyAddress}
                            >
                                <div>{`${shorten(launchpad.data?.contract_address, 8, 8)}`}</div>
                                <span
                                    className={`transition-all w-fit mr-2 absolute -top-full right-[20px] text-xs bg-light-gray py-1 px-2 border rounded-md ${isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                    {t('Copied')}
                                </span>
                                <Image src={CopySvg} alt='' />
                            </div>
                        </div>)}

                    </div>
                    <div className='border rounded-2xl border-[#DEDEDE] p-6 flex flex-col gap-6'>
                        <div className='text-sm text-[#61646B]'>
                            {launchpad.data?.description}
                        </div>
                        <Divider />
                        <div className='grid grid-cols-7 divide-x'>
                            <div className='flex flex-col'>
                                <p className='text-xs text-[#61646B]'>{t('Status')}</p>
                                <p className='text-sm text-[#414141] font-semibold'>{LaunchpadStatus[launchpad.data?.status]}</p>
                            </div>
                            <div className='flex flex-col pl-6'>
                                <p className='text-xs text-[#61646B]'>{t('Start')}</p>
                                <p className='text-sm text-[#414141] font-semibold'>{moment(launchpad.data?.start_date).format('HH:mm yyyy-MM-DD')}</p>
                            </div>
                            <div className='flex flex-col pl-6'>
                                <p className='text-xs text-[#61646B]'>{t('End')}</p>
                                <p className='text-sm text-[#414141] font-semibold'>{moment(launchpad.data?.end_date).format('HH:mm yyyy-MM-DD')}</p>
                            </div>
                            <div className='flex flex-col pl-6'>
                                <p className='text-xs text-[#61646B]'>{t('Max supply:')}</p>
                                <p className='text-sm text-[#414141] font-semibold'>{launchpad.data?.max_supply}</p>
                            </div>
                            <div className='flex flex-col pl-6'>
                                <p className='text-xs text-[#61646B]'>{t('License Token ID')}</p>
                                <p className='text-sm text-[#414141] font-semibold'>{launchpad.data?.license_token_id}</p>
                            </div>
                            <div className='flex flex-col pl-6'>
                                <p className='text-xs text-[#61646B]'>{t('Max NFT minted per address:')}</p>
                                <p className='text-sm text-[#414141] font-semibold'>{launchpad.data?.max_mint_per_address}</p>
                            </div>
                            <div className='flex flex-col pl-6'>
                                <p className='text-xs text-[#61646B]'>{t('Price')}:</p>
                                <p className='text-sm text-[#414141] font-semibold'>{`${BigNumber(launchpad.data?.mint_price || 0).div(BigNumber(10).pow(18))}`} USDT</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#F0F0F0] p-6 flex gap-32'>
                        <div className='bg-white rounded-[16px] p-6 min-w-[400px]'>
                            <div className='flex gap-2 items-center border-b border-[#F0F0F0] pb-3'>
                                <span className='text-[#1C1C1C] font-semibold text-sm'>NFTs image</span>
                                <Tooltip title="The name given to the image file will be the name of the NFT." placement="top-start">
                                    <Image src={ic_question_circle} alt='ic_question_circle' className='cursor-pointer' />
                                </Tooltip>
                            </div>
                            <div className='py-3 flex flex-col gap-3'>
                                <div className='h-[184px] overflow-y-scroll'>
                                    <div className="grid grid-cols-1 gap-3 pr-2">
                                        {launchpad.data?.nft_images.map((nftUrl: string, idx: number) => {
                                            return (
                                                <div key={idx} className="py-2 px-4 bg-[#F2F2F2] rounded-[10px] flex justify-between items-center">
                                                    <p className='text-[#61646B] font-normal text-sm'>{getFileNameFromURL(nftUrl)}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex gap-32 flex-1'>
                                <div className='flex flex-col gap-2'>
                                    <p className="text-[#414141] text-sm font-semibold">Thumbnail image (4:3)</p>
                                    <UploadImage id='thumbnail' height='104px' width='158px' disabled={true} imgUrl={launchpad.data?.thumbnail_url} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className="text-[#414141] text-sm font-semibold">Featured images (1:1)</p>
                                    <div className='flex gap-14'>
                                        {launchpad.data?.featured_images.map((imgUrl: string, idx: number) => <UploadImage key={idx} disabled={true} imgUrl={imgUrl} />)}
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-6 mt-14 w-1/3'>
                                {genButtons(launchpad.data?.status)}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LaunchpadDetail;