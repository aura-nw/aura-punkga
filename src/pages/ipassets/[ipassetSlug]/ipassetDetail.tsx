import { Tooltip } from '@mui/material'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Image from 'next/image'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/Dropdown'
import Mascot from 'assets/images/mascot.png'
import MainButton from 'components/Button/MainButton'
import { Stack } from '@mui/material'
import OutlineTextField from 'components/Input/TextField/Outline'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { convertIPFStoHTTP, shorten } from 'src/utils'
import moment from 'moment'
import { Context } from 'src/context'
import { useStory } from 'src/context/story'
import { Address } from 'viem/accounts'
import { http} from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core'
import { sepolia, mainnet } from 'viem/chains'
import { createConfig } from '@wagmi/core'

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <IPAssetDetail {...props} />
}

const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

interface Option {
    value: string;
    label: string;
    termId: string;
}
const options: Option[] = [
    { value: 'CommercialUse', label: 'Commercial Use', termId: '1' },
    { value: 'NonComSocialRemixing', label: 'Non-Commercial Social Remixing', termId: '2' },
    { value: 'CommercialRemix', label: 'Commercial Remix', termId: '3' },
]
const CurrencyAddress: Address = '0xB132A6B7AE652c974EE1557A3521D53d18F6739f'

function IPAssetDetail({ }) {
    // const publicClient = createPublicClient({
    //     chain: 'sepolia',
    //     transport: http('https://sepolia.infura.io/v3/')
    // })
    const { account, getIPAsset, mintLicense, getLicense } = useContext(Context)
    const { query } = useRouter()
    const slug = query.ipassetSlug as string
    const router = useRouter()
    const { t } = useTranslation()
    const { client, walletAddress, txLoading, mintNFT, setTxHash, setTxLoading, setTxName, addTransaction, initializeStoryClient } = useStory()
    const [isViewLicense, setIsViewLicense] = useState(true)
    const [ipAssetImage, setIPAssetImage] = useState<string>('');
    const [processText, setProcessText] = useState<string>('');
    const [licenseList, setLicenseList] = useState([]);
    const [nftInfo, setNftInfo] = useState<any>({});
    const [selectedOption, setSelectedOption] = useState<Option>(options[1]);
    const handleOptionSelect = (option: Option) => {
        setSelectedOption(option);
    };
    const [uriLicenseTerms, setUriLicenseTerms] = useState('')
    const [licenseAmount, setLicenseAmount] = useState<number>(0)
    const [commercialRevenueShare, setCommercialRevenueShare] = useState<number>()
    const [tokenIds, setTokenIds] = useState<any>()

    const fetchIPAsset = async () => {
        try {
            const res = await fetch(`https://edge.stg.storyprotocol.net/api/v1/assets/${slug}`, {
                headers: {
                    'X-API-Key': 'j_OF1r8CZbm28VJFzhlJf7RvU3Y=',
                    'X-CHAIN': 'sepolia',
                    'accept': 'application/json',
                },
            });
            const data = await res.json();
            const nftImg = data.data.nftMetadata.imageUrl ? JSON.parse(data.data.nftMetadata.imageUrl) : data.data.nftMetadata.tokenUri;
            const nftImgUrl = convertIPFStoHTTP(nftImg)
            setIPAssetImage(nftImgUrl)
        } catch (error) {
            console.error('Error fetching IP Asset:', error);
        }
    };
    useEffect(() => {
        const userId = account?.id;
        if (userId) {
            getIPAsset(userId).then((data) => {
                const filteredAssets = data.data.ip_asset.filter((asset) =>
                    asset.ip_asset_id.toString().toLowerCase().includes(slug?.toLowerCase())
                );
                setNftInfo(filteredAssets[0])
            });
        }
        getLicense(slug).then((data) => {
            setLicenseList(data.data.license_tokens)
        });
    }, [account, isViewLicense]);

    const handleMintLicense = async () => {
        if (!client) return;

        try {
            // Register PIL term
            setTxLoading(true);
            setTxName("Register PIL Terms");
            setProcessText("Register IP Asset in process...");
            let registerTermResponse;
            switch (selectedOption.value) {
                case 'CommercialUse':
                    const commercialUseParams = {
                        currency: CurrencyAddress,
                        mintingFee: '0',
                    };
                    registerTermResponse = await client.license.registerCommercialUsePIL({
                        ...commercialUseParams,
                        txOptions: { waitForTransaction: true },
                    });
                    console.log(
                        `PIL Terms registered at transaction hash ${registerTermResponse.txHash}, License Terms ID: ${registerTermResponse.licenseTermsId}`
                    );
                    break;
                case 'NonComSocialRemixing':
                    const nonComSocialRemixingParams = {};
                    registerTermResponse = await client.license.registerNonComSocialRemixingPIL({
                        ...nonComSocialRemixingParams,
                        txOptions: { waitForTransaction: true },
                    });
                    console.log(
                        `PIL Terms registered at transaction hash ${registerTermResponse.txHash}, License Terms ID: ${registerTermResponse.licenseTermsId}`
                    );
                    break;
                case 'CommercialRemix':
                    const commercialRemixParams = {
                        currency: CurrencyAddress,
                        mintingFee: '0',
                        commercialRevShare: licenseAmount,
                    };
                    registerTermResponse = await client.license.registerCommercialRemixPIL({
                        ...commercialRemixParams,
                        txOptions: { waitForTransaction: true },
                    });
                    console.log(
                        `PIL Terms registered at transaction hash ${registerTermResponse.txHash}, License Terms ID: ${registerTermResponse.licenseTermsId}`
                    );
                    break;
            }
            // Attach License Terms to IP
            if (licenseList.every(item => item.term_id !== registerTermResponse.licenseTermsId.toString())) {
                setTxLoading(true);
                setTxName("Attaching terms to an IP Asset...");
                setProcessText("Attaching terms to IP Asset...");
                const attachLicenseresponse = await client.license.attachLicenseTerms({
                    licenseTermsId: registerTermResponse.licenseTermsId,
                    ipId: slug as Address,
                    txOptions: { waitForTransaction: true },
                });
                console.log(`Attached License Terms to IP at tx hash ${attachLicenseresponse.txHash}`);
                setTxLoading(false);
                setTxHash(attachLicenseresponse.txHash);
                addTransaction(attachLicenseresponse.txHash, "Attach Terms", {});
            }


            // Mint License
            setTxLoading(true);
            setTxName("Minting a License Token from an IP Asset...");
            setProcessText("Minting a License Token from IP Asset...");
            const mintLicenseresponse = await client.license.mintLicenseTokens({
                licensorIpId: slug as Address,
                licenseTermsId: registerTermResponse.licenseTermsId,
                amount: licenseAmount,
                receiver: walletAddress as Address,
                txOptions: { waitForTransaction: true },
            });
            console.log(
                `License minted at tx hash ${mintLicenseresponse.txHash}, License ID: ${mintLicenseresponse.licenseTokenId}`
            );
            setTxLoading(false);
            setTxHash(mintLicenseresponse.txHash as string);
            addTransaction(mintLicenseresponse.txHash as string, "Mint License", {
                licenseTokenId: mintLicenseresponse.licenseTokenId,
            });
            if (mintLicenseresponse.txHash) {
                try {
                    // Wait for the transaction receipt
                    const receipt = await waitForTransactionReceipt(config, {
                        chainId: sepolia.id,
                        hash: mintLicenseresponse.txHash as `0x${string}`,
                    });

                    // Extract the token IDs from the logs
                    const tokenIds = receipt?.logs
                        ?.filter(
                            (log) =>
                                log.topics[0] ===
                                '0x14fc68fa3d99c92bb4159f5ae1ddd4bbf7b874931534c08ac40467d7ece273d6'
                        )
                        .map((log) => Number(log.topics[3]?.toString()));

                    const outputArray = tokenIds.map((num) => ({ term_id: num }));
                    setTokenIds(outputArray);

                    // Set the process text
                    setProcessText("Minted License Successfully ✔️");

                    // Prepare the licenseInfo object
                    const licenseInfo = [
                        {
                            ip_asset_id: slug,
                            license_template_address: '0x260B6CB6284c89dbE660c0004233f7bB99B5edE7',
                            owner: account.id,
                            term_id: registerTermResponse.licenseTermsId.toString(),
                        },
                    ];

                    // Prepare the mintLicenseParam array
                    const mintLicenseParam = [];
                    for (const termIdObj of tokenIds) {
                        mintLicenseParam.push({
                            ip_asset_id: licenseInfo[0].ip_asset_id,
                            license_id: termIdObj.toString(),
                            license_template_address: licenseInfo[0].license_template_address,
                            owner: licenseInfo[0].owner,
                            term_id: licenseInfo[0].term_id,
                        });
                    }

                    // Wait for 5 seconds before calling mintLicense
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    await mintLicense(mintLicenseParam)
                    setProcessText("");
                    // Set the isViewLicense flag
                    setIsViewLicense(true);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        } catch (error) {
            console.error('Error minting license:', error);
            setTxLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchIPAsset();
        }
    }, [slug]);
    return (
        <>
            <Header />
            <div className='page-content'>
                <div className='pk-container '>
                    <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16 gap-6 flex flex-col'>
                        <span className='font-bold text-xl'>IP Asset</span>
                        <div className='flex gap-10'>
                            <div className='w-[290px] flex flex-col gap-6'>
                                <Image className='rounded-2xl bg-light-gray object-cover'
                                    src={!!ipAssetImage ? ipAssetImage : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                                    alt=""
                                    width={290}
                                    height={290}
                                />
                                {!isViewLicense &&
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

                                    </div>}

                            </div>
                            <div className='w-[calc(100%_-_290px)] '>
                                <div className='flex gap-10'>
                                    <div className='rounded-2xl p-6 border-[#DEDEDE] border-[1px] flex flex-col gap-5 w-[calc(100%/8*5)] h-fit'>
                                        <div className='font-bold text-[#1C1C1C]'>
                                            Minted Licenses
                                        </div>
                                        <span className='w-full block border-[1px] border-solid border-[#F0F0F0] '></span>
                                        <div className='grid grid-cols-3'>
                                            <div className='border-r-[1px] border-[#F0F0F0]'>
                                                <div className='text-xs'>IPAccount address:</div>
                                                <Tooltip title={slug} placement="top">
                                                    <div className='text-sm text-[#2684FC]'>{shorten(slug)}</div>
                                                </Tooltip>
                                            </div>
                                            <div className='border-r-[1px] border-[#F0F0F0] pl-[15px]'>
                                                <div className='text-xs'>IPAsset ID:</div>
                                                <div className='text-sm text-[#2684FC]'>
                                                    <Tooltip title={slug} placement="top">
                                                        <div className='text-sm text-[#2684FC]'>{shorten(slug)}</div>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className='pl-[15px]'>
                                                <div className='text-xs'>Number of Licenses Token:</div>
                                                <div className='text-sm font-bold'>{licenseList ? licenseList.length : '0'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-2xl p-6 border-[#DEDEDE] border-[1px] flex flex-col gap-5 w-[calc(100%/8*3)] h-fit'>
                                        <Tooltip title={"NFT:  Bolar Bear #84"} placement="top">
                                            <div className='font-bold text-[#1C1C1C] truncate'>
                                                NFT
                                            </div>
                                        </Tooltip>
                                        <span className='w-full block border-[1px] border-solid border-[#F0F0F0] '></span>

                                        <div className='grid grid-cols-2'>
                                            <div className='border-r-[1px] border-[#F0F0F0]'>
                                                <div className='text-xs'>NFT address:</div>
                                                <Tooltip title={nftInfo?.nft_contract_address} placement="top">
                                                    <div className='text-sm text-[#2684FC]'>
                                                        {shorten(nftInfo?.nft_contract_address)}
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            <div className='pl-[15px]'>
                                                <div className='text-xs'>NFT Token ID:</div>
                                                <div className='text-sm text-[#2684FC]'>{nftInfo?.nft_token_id}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <>
                                    {isViewLicense ? <div className='flex flex-col gap-6 mt-16'>
                                        <span className='font-bold text-[20px]'>Minted Licenses {licenseList ? `(${licenseList.length})` : ''}</span>
                                        <div className='flex justify-start items-center gap-4'>

                                            {licenseList && <MainButton className='' onClick={() => setIsViewLicense(false)}>
                                                {t('Create License')}
                                            </MainButton>}

                                        </div>
                                        <TableContainer component={Paper} sx={{ padding: '16px', background: '#F0F0F0' }}>
                                            <Table sx={{ minWidth: 650, borderSpacing: '0 10px' }} size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>License ID</TableCell>
                                                        <TableCell sx={{ fontWeight: 600 }}>Licence Template address</TableCell>
                                                        <TableCell sx={{ fontWeight: 600 }}>Licence Term ID</TableCell>
                                                        <TableCell sx={{ fontWeight: 600 }} align="right">Mint date</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {licenseList ?
                                                        <> {licenseList.map((license) => (
                                                            <TableRow
                                                                key={license.licenseID}
                                                                sx={{
                                                                    '&:last-child td, &:last-child th': { border: 0 }, background: 'white', margin: '12px', borderRadius: '6px', "&:hover": {
                                                                        background: "#f7f7f7"
                                                                    },
                                                                }}
                                                            >
                                                                <TableCell style={{ width: '25%', color: '#2684FC' }} component="th" scope="row">
                                                                    {license.license_id}
                                                                </TableCell>
                                                                <TableCell style={{ width: '25%', color: '#2684FC' }}>
                                                                    <Tooltip title={license.license_template_address} placement="top">
                                                                        <div className='truncate'>

                                                                            {shorten(license.license_template_address)}
                                                                        </div>
                                                                    </Tooltip></TableCell>
                                                                <TableCell style={{ width: '25%', color: '#2684FC' }}>{license.term_id}</TableCell>
                                                                <TableCell style={{ width: '25%' }} align="right">{moment(license.created_at).format('HH:mm - DD/MM/YYYY')}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                        </>
                                                        : <TableRow>
                                                            <TableCell colSpan={5}>
                                                                <Stack sx={{ width: '100%' }} spacing={2}>
                                                                    <div className='flex flex-col items-center justify-center gap-2 py-3 w-full'>
                                                                        <Image src={Mascot} alt='mascot' />
                                                                        <span className='font-bold text-[20px]'>{t('No License Yet')}</span>
                                                                        <MainButton onClick={() => setIsViewLicense(false)}>{t('Create License')}</MainButton>
                                                                    </div>
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div> : <div className='flex flex-col gap-6 mt-16 '>
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
                                                                {selectedOption.label}
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
                                                    <div className='w-[300px] bg-[#F2F2F2] cursor-pointer'>
                                                        <div className='p-[15px] text-xs font-semibold' onClick={() => setSelectedOption(options[0])}>
                                                            {options[0]?.value}
                                                        </div>
                                                        <div className='p-[15px] text-xs font-semibold' onClick={() => setSelectedOption(options[1])}>
                                                            {options[1]?.value}
                                                        </div>
                                                        <div className='p-[15px] text-xs font-semibold' onClick={() => setSelectedOption(options[2])}>
                                                            {options[2]?.value}
                                                        </div>
                                                    </div>
                                                </DropdownMenu>
                                                <DropdownMenu customClass='rounded-[8px]' closeOnClick>
                                                    <React.Fragment>
                                                        {options.map((option) => (
                                                            <div
                                                                key={option.value}
                                                                className="w-[300px] bg-[#F2F2F2] cursor-pointer"
                                                                onClick={() => handleOptionSelect(option)}
                                                            >
                                                                <div className="p-[15px] text-sm font-semibold">
                                                                    {option.label}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </React.Fragment>
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
                                                {selectedOption.termId === '3' && (
                                                    <OutlineTextField
                                                        label={t('Commercial Revenue Share (%)')}
                                                        value={commercialRevenueShare ? commercialRevenueShare.toString() : ''}
                                                        onChange={(e) => setCommercialRevenueShare(Number(e))}
                                                        type='text'
                                                        placeholder={t('Enter an amountD')}
                                                    />)}
                                            </div>
                                            <div className='text-[#1FAB5E] font-semibold w-full justify-center text-center mt-2 mb-3'>
                                                {processText}
                                            </div>
                                            <div className='flex justify-center gap-6 items-center w-full'>
                                                <MainButton disabled={txLoading} style='outline' className='w-[129px]' onClick={() => setIsViewLicense(true)}>
                                                    {t('Cancel')}
                                                </MainButton>

                                                <MainButton
                                                    loading={txLoading}
                                                    disabled={!licenseAmount}
                                                    onClick={() => handleMintLicense()}
                                                    className='w-[129px]'>
                                                    {t('Mint License')}
                                                </MainButton>
                                            </div>
                                        </div>

                                    </div>}
                                </>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
