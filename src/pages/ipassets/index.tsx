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
import { useRef, useState } from 'react'
import MainButton from 'components/Button/MainButton'
import { Stack } from '@mui/material'

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <IPAssets />
}
function IPAssets() {
    const router = useRouter()
    const mref = useRef<any>()
    const r = useRouter()
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState('')
    const error = searchParams.get('error')
    const { t } = useTranslation()
    return (
        <>
            <Header />
            <div className='page-content'>
                <div className='pk-container '>
                    <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16'>
                        <div className='flex flex-col gap-6'>
                            <span className='font-bold text-[20px]'>IP Asset ({rows.length})</span>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='max-w-[300px]'>
                                    <TextField
                                        inputref={mref}
                                        onChange={() => { }}
                                        onFocus={() => { }}
                                        className={`transition-[width] bg-light-gray duration-500 text-sm leading-6 py-1 rounded-lg`}
                                        placeholder={t('Search by title')}
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
                                {rows && <MainButton className='' onClick={() => router.push('/register_ip_asset')}>
                                    {t('New IPAsset')}
                                </MainButton>}

                            </div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small">
                                    <TableHead>
                                        <TableRow className='font-semibold'>
                                            <TableCell>IPAsset ID</TableCell>
                                            <TableCell >IPAsset</TableCell>
                                            <TableCell >NFT token ID</TableCell>
                                            <TableCell >NFT Contract</TableCell>
                                            <TableCell align="right">Created at</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows ?
                                            <> {rows.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell >{row.calories}</TableCell>
                                                    <TableCell >{row.fat}</TableCell>
                                                    <TableCell >{row.carbs}</TableCell>
                                                    <TableCell align="right">{row.protein}</TableCell>
                                                </TableRow>
                                            ))}
                                            </>
                                            : <TableRow>
                                                <TableCell colSpan={5}>
                                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                                        <div className='flex flex-col items-center justify-center gap-2 py-3 w-full'>
                                                            <Image src={Mascot} alt='mascot' />
                                                            <span className='font-bold text-[20px]'>{t('You do not have any IPAsset')}</span>
                                                            <MainButton onClick={() => router.push('/register_ip_asset')}>{t('Create New IPAsset')}</MainButton>
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
