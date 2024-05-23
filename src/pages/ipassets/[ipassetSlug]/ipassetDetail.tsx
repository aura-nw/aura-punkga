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
import TextField from 'components/Input/TextField'
import Mascot from 'assets/images/mascot.png'
import MainButton from 'components/Button/MainButton'
import { Stack } from '@mui/material'
import useSWR, { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shorten } from 'src/utils'
import moment from 'moment'

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <IPAssetDetail {...props} />
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
function IPAssetDetail({ }) {
    const { query } = useRouter()
    const slug = query.ipassetSlug as string
    const router = useRouter()
    const { t } = useTranslation()
    const [ipAssetData, setIPAssetData] = useState<any>({});
    const [ipAssetImage, setIPAssetImage] = useState<any>({});

    const fetchIPAsset = async () => {
        try {
            console.log('Fetching IP Asset with slug:', slug);
            const res = await fetch(`https://edge.stg.storyprotocol.net/api/v1/assets/${slug}`, {
                headers: {
                    'X-API-Key': 'j_OF1r8CZbm28VJFzhlJf7RvU3Y=',
                    'X-CHAIN': 'sepolia',
                    'accept': 'application/json',
                },
            });
            console.log('res',res)
            const data = await res.json();
            setIPAssetData(data.data.nftMetadata);
            const tokenUriData = JSON.parse(data.data.nftMetadata.tokenUri);
            setIPAssetImage(tokenUriData.image)
        } catch (error) {
            console.error('Error fetching IP Asset:', error);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchIPAsset();
        }
    }, [slug]);

    console.log('ipAssetData:', ipAssetData, ipAssetImage);

    return (
        <>
            <Header />
            <div className='page-content'>
                <div className='pk-container '>
                    <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16 gap-6 flex flex-col'>
                        <span className='font-bold text-xl'>IP Asset</span>
                        <div className='flex gap-10'>
                            <div className='w-[290px]'>
                                <Image className='rounded-2xl bg-light-gray object-cover'
                                    src={ipAssetImage}
                                    alt=""
                                    width={290}
                                    height={290}
                                />
                            </div>
                            <div className='w-[calc(100%_-_290px)] '>
                                <div className='flex gap-10'>
                                    <div className='rounded-2xl p-6 border-[#DEDEDE] border-[1px] flex flex-col gap-5 w-[calc(100%/4*3)] h-fit'>
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
                                    <div className='rounded-2xl p-6 border-[#DEDEDE] border-[1px] flex flex-col gap-5 w-[calc(100%/4)] h-fit'>
                                        <Tooltip title={"NFT:  Bolar Bear #84"} placement="top">
                                            <div className='font-bold text-[#1C1C1C] truncate'>
                                                NFT:  Bolar Bear #84
                                            </div>
                                        </Tooltip>
                                        <span className='w-full block border-[1px] border-solid border-[#F0F0F0] '></span>

                                        <div>
                                            <div className='text-xs'>IPAccount address:</div>
                                            <div className='text-sm text-[#2684FC]'>{shorten('0x9bf13fc917BE1fB3220beb5Bb2a0dc58B7a787C7')}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className='flex flex-col gap-6 mt-16'>
                                    <span className='font-bold text-[20px]'>IP Asset ({rows.length})</span>
                                    <div className='flex justify-start items-center gap-4'>

                                        {rows && <MainButton className='' onClick={() => router.push('/mint_license')}>
                                            {t('Create License')}
                                        </MainButton>}

                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} size="small">
                                            <TableHead>
                                                <TableRow className='font-semibold'>
                                                    <TableCell>License ID</TableCell>
                                                    <TableCell >Licence Template address</TableCell>
                                                    <TableCell >Licence Term ID</TableCell>
                                                    <TableCell align="right">Mint date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows ?
                                                    <> {rows.map((row) => (
                                                        <TableRow
                                                            key={row.licenseID}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.licenseID}
                                                            </TableCell>
                                                            <TableCell >{shorten(row.licenseTemplateAddress)}</TableCell>
                                                            <TableCell >{row.licenseTermId}</TableCell>
                                                            <TableCell align="right">{moment(row.mintDate).format('HH:mm - DD/MM/YYYY')}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    </>
                                                    : <TableRow>
                                                        <TableCell colSpan={5}>
                                                            <Stack sx={{ width: '100%' }} spacing={2}>
                                                                <div className='flex flex-col items-center justify-center gap-2 py-3 w-full'>
                                                                    <Image src={Mascot} alt='mascot' />
                                                                    <span className='font-bold text-[20px]'>{t('No License Yet')}</span>
                                                                    <MainButton onClick={() => router.push('/mint_license')}>{t('Create License')}</MainButton>
                                                                </div>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
