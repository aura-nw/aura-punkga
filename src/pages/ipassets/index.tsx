import { Stack, Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import SearchIcon from 'assets/images/icons/search.svg'
import Mascot from 'assets/images/mascot.png'
import MainButton from 'components/Button/MainButton'
import Button from 'components/core/Button/Button'
import Footer from 'components/Footer'
import Header from 'components/Header'
import TextField from 'components/Input/TextField'
import Popover from 'components/Popover'
import moment from 'moment'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { shorten } from 'src/utils'

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <IPAssets />
}
function IPAssets() {
  const { account, getIPAsset } = useContext(Context)
  const [assets, setAssets] = useState([])
  const router = useRouter()
  const mref = useRef<any>()
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    if (!account) {
      router.push('/')
    }
  }, [account])

  useEffect(() => {
    const userId = account?.id
    if (userId) {
      getIPAsset(userId).then((data) => {
        setAssets(data.data.ip_asset)
        if (searchValue) {
          const filteredAssets = data.data.ip_asset.filter((asset) =>
            asset.ip_asset_id.toString().includes(searchValue)
          )
          setAssets(filteredAssets)
        }
      })
    }
  }, [account, searchValue])
  const r = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <div className='page-content'>
        <div className='pk-container '>
          <div className='sticky md:top-12 top-[95px]  pb-10 pt-5 md:pt-16'>
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
                      <Image src={SearchIcon} className='w-[22px] h-[22px]' alt='' onClick={() => {}} />
                      // )
                    }
                  />
                </div>
                {assets && (
                  <Button size='sm' color='dark' className='' onClick={() => router.push('/register_ip_asset')}>
                    {t('New IPAsset')}
                  </Button>
                )}
              </div>
              <TableContainer component={Paper} sx={{ padding: '16px', background: '#F0F0F0' }}>
                <Table sx={{ minWidth: 650, borderSpacing: '0 10px' }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>IPAsset ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>NFT token ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>NFT Contract</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align='right'>
                        Created at
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!!assets ? (
                      assets?.map((row) => (
                        <TableRow
                          key={row.ip_asset_id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            background: 'white',
                            borderRadius: '6px',
                            '&:hover': {
                              background: '#f7f7f7',
                            },
                          }}>
                          <TableCell style={{ width: '25%' }} component='th' scope='row'>
                            <Tooltip title={row.ip_asset_id} placement='top'>
                              <div className='flex items-center gap-1'>
                                <div className='truncate'>{shorten(row.ip_asset_id)}</div>
                                <svg
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='cursor-pointer'
                                  onClick={() => navigator.clipboard.writeText(row.ip_asset_id)}>
                                  <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M14.5005 4H9.07189C8.24347 4 7.57189 4.67157 7.57189 5.5V6.07143H10.9286C12.5854 6.07143 13.9286 7.41457 13.9286 9.07143V14.5C13.9286 16.1569 12.5854 17.5 10.9286 17.5H5.5C3.84315 17.5 2.5 16.1569 2.5 14.5V9.07143C2.5 7.41458 3.84315 6.07143 5.5 6.07143H6.07189V5.5C6.07189 3.84315 7.41504 2.5 9.07189 2.5H14.5005C16.1573 2.5 17.5005 3.84315 17.5005 5.5V10.9286C17.5005 12.5854 16.1573 13.9286 14.5005 13.9286H13.929V12.4286H14.5005C15.3289 12.4286 16.0005 11.757 16.0005 10.9286V5.5C16.0005 4.67158 15.3289 4 14.5005 4ZM5.5 7.57143H10.9286C11.757 7.57143 12.4286 8.243 12.4286 9.07143V14.5C12.4286 15.3284 11.757 16 10.9286 16H5.5C4.67157 16 4 15.3284 4 14.5V9.07143C4 8.243 4.67158 7.57143 5.5 7.57143Z'
                                    fill='#ABABAB'
                                  />
                                </svg>
                              </div>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ width: '25%' }}>
                            <div className='flex items-center gap-1'>
                              <div className='truncate'>{row.nft_token_id}</div>
                              <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='cursor-pointer'
                                onClick={() => navigator.clipboard.writeText(row.nft_token_id)}>
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M14.5005 4H9.07189C8.24347 4 7.57189 4.67157 7.57189 5.5V6.07143H10.9286C12.5854 6.07143 13.9286 7.41457 13.9286 9.07143V14.5C13.9286 16.1569 12.5854 17.5 10.9286 17.5H5.5C3.84315 17.5 2.5 16.1569 2.5 14.5V9.07143C2.5 7.41458 3.84315 6.07143 5.5 6.07143H6.07189V5.5C6.07189 3.84315 7.41504 2.5 9.07189 2.5H14.5005C16.1573 2.5 17.5005 3.84315 17.5005 5.5V10.9286C17.5005 12.5854 16.1573 13.9286 14.5005 13.9286H13.929V12.4286H14.5005C15.3289 12.4286 16.0005 11.757 16.0005 10.9286V5.5C16.0005 4.67158 15.3289 4 14.5005 4ZM5.5 7.57143H10.9286C11.757 7.57143 12.4286 8.243 12.4286 9.07143V14.5C12.4286 15.3284 11.757 16 10.9286 16H5.5C4.67157 16 4 15.3284 4 14.5V9.07143C4 8.243 4.67158 7.57143 5.5 7.57143Z'
                                  fill='#ABABAB'
                                />
                              </svg>
                            </div>
                          </TableCell>
                          <TableCell style={{ width: '25%' }}>
                            <Tooltip title={row.nft_contract_address} placement='top'>
                              <div className='flex items-center gap-1'>
                                <div className='truncate'>{shorten(row.nft_contract_address)}</div>
                                <svg
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='cursor-pointer'
                                  onClick={() => navigator.clipboard.writeText(row.nft_contract_address)}>
                                  <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M14.5005 4H9.07189C8.24347 4 7.57189 4.67157 7.57189 5.5V6.07143H10.9286C12.5854 6.07143 13.9286 7.41457 13.9286 9.07143V14.5C13.9286 16.1569 12.5854 17.5 10.9286 17.5H5.5C3.84315 17.5 2.5 16.1569 2.5 14.5V9.07143C2.5 7.41458 3.84315 6.07143 5.5 6.07143H6.07189V5.5C6.07189 3.84315 7.41504 2.5 9.07189 2.5H14.5005C16.1573 2.5 17.5005 3.84315 17.5005 5.5V10.9286C17.5005 12.5854 16.1573 13.9286 14.5005 13.9286H13.929V12.4286H14.5005C15.3289 12.4286 16.0005 11.757 16.0005 10.9286V5.5C16.0005 4.67158 15.3289 4 14.5005 4ZM5.5 7.57143H10.9286C11.757 7.57143 12.4286 8.243 12.4286 9.07143V14.5C12.4286 15.3284 11.757 16 10.9286 16H5.5C4.67157 16 4 15.3284 4 14.5V9.07143C4 8.243 4.67158 7.57143 5.5 7.57143Z'
                                    fill='#ABABAB'
                                  />
                                </svg>
                              </div>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ width: '25%' }} align='right'>
                            {moment(row.created_at).format('HH:mm - DD/MM/YYYY')}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Stack sx={{ width: '100%' }} spacing={2}>
                            <div className='flex flex-col items-center justify-center gap-2 py-3 w-full'>
                              <Image src={Mascot} alt='mascot' />
                              <span className='font-bold text-[20px]'>{t('You do not have any IPAsset')}</span>
                              <Button color='dark' size='sm' onClick={() => router.push('/register_ip_asset')}>
                                {t('Create New IPAsset')}
                              </Button>
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
