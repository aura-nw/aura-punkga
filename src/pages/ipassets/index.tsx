import Footer from 'components/Footer'
import Header from 'components/Header'
import SearchIcon from 'assets/images/icons/search.svg'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from 'components/Input/TextField'
import Mascot from 'assets/images/mascot.png'
import Spinner from 'components/Spinner'
import { useContext, useEffect, useRef, useState } from 'react'
import MainButton from 'components/Button/MainButton'
import { Stack, Tooltip } from '@mui/material'
import axios from 'axios'
import { Context } from 'src/context'
import moment from 'moment'
import { shorten } from 'src/utils'

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <IPAssets />
}
function IPAssets() {
    const { account, getIPAsset } = useContext(Context)
    const [assets, setAssets] = useState([]);
    const router = useRouter()
    const mref = useRef<any>()
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        const userId = account?.id;
        if (userId) {
            getIPAsset(userId).then((data) => {
                setAssets(data.data.ip_asset);
                if (searchValue) {
                    const filteredAssets = data.data.ip_asset.filter((asset) =>
                        asset.ip_asset_id.toString().includes(searchValue)
                    );
                    setAssets(filteredAssets)
                }
            });
        }
    }, [account, searchValue]);
    const r = useRouter()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const { t } = useTranslation()

    return (
        <>
            <Header />
            <div className='page-content'>
                <div className='pk-container '>
                    <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16'>
                        <div className='flex flex-col gap-6'>
                            <span className='font-bold text-[20px]'>{assets ? `IP Asset (${assets.length})` : `IP Asset`}</span>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='max-w-[300px]'>
                                    <TextField
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e)}
                                        inputref={mref}
                                        className={`transition-[width] bg-light-gray duration-500 text-sm leading-6 py-1 rounded-lg`}
                                        placeholder={t('Search by IPAssetID')}
                                        leadingComponent={
                                            // loading ? (
                                            //     <Spinner className='w-[22px] h-[22px]' />
                                            // ) : (
                                            <Image
                                                src={SearchIcon}
                                                className='w-[22px] h-[22px]'
                                                alt=''
                                                onClick={() => { }}
                                            />
                                            // )
                                        }
                                    />
                                </div>
                                {assets && <MainButton className='' onClick={() => router.push('/register_ip_asset')}>
                                    {t('New IPAsset')}
                                </MainButton>}

                            </div>
                            <TableContainer component={Paper} sx={{ padding: '16px', background: '#F0F0F0' }}>
                                <Table sx={{ minWidth: 650, borderSpacing: '0 10px' }} size="small">
                                    <TableHead>
                                        <TableRow >
                                            <TableCell sx={{ fontWeight: 600 }}>IPAsset ID</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>NFT token ID</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>NFT Contract</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }} align="right">Created at</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!!assets ? (
                                            assets?.map((row) => (
                                                <TableRow className='cursor-pointer' onClick={() => router.push(`/ipassets/${row.ip_asset_id}`)} key={row.ip_asset_id} sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }, background: 'white', borderRadius: '6px', "&:hover": {
                                                        background: "#f7f7f7"
                                                    },
                                                }}>
                                                    <TableCell style={{ width: '25%' }} component="th" scope="row">
                                                        <Tooltip title={row.ip_asset_id} placement="top">
                                                            <div className='truncate'>
                                                                {shorten(row.ip_asset_id)}
                                                            </div>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell style={{ width: '25%' }} >{row.nft_token_id}</TableCell>
                                                    <TableCell style={{ width: '25%' }} >
                                                        <Tooltip title={row.nft_contract_address} placement="top">
                                                            <div className='truncate'>
                                                                {shorten(row.nft_contract_address)}
                                                            </div>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell style={{ width: '25%' }} align="right">{moment(row.created_at).format('HH:mm - DD/MM/YYYY')}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                                        <div className="flex flex-col items-center justify-center gap-2 py-3 w-full">
                                                            <Image src={Mascot} alt="mascot" />
                                                            <span className="font-bold text-[20px]">{t('You do not have any IPAsset')}</span>
                                                            <MainButton onClick={() => router.push('/register_ip_asset')}>{t('Create New IPAsset')}</MainButton>
                                                        </div>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div >
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
