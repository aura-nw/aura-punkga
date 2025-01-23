import NoImage from 'images/no_img.png'
import OpenLink from 'assets/images/icons/open-link.svg'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { getUserNfts } from 'src/services'
import useSWR from 'swr'
import { Box, Grid, Pagination, PaginationItem, styled } from '@mui/material'
import { useRouter } from 'next/router'
import MascotEmpty from 'assets/images/mascot-empty.png'
import { isMobile } from 'react-device-detect'

export default function NewNFTList() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const { account } = useContext(Context)
  const { data } = useSWR(
    {
      key: 'pooling nfts',
      wallet: account.activeWalletAddress,
    },
    ({ wallet }) => (wallet ? getUserNfts(wallet) : null),
    { refreshInterval: 10000 }
  )
  const [page, setPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(data?.length / itemsPerPage)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedNFTs = data?.slice(startIndex, endIndex)
  // if (!data || !data.length) {
  //   return (
  //     <div className='w-full py-8 flex flex-col items-center gap-4'>
  //       <Image src={MascotEmpty} alt='' width={160} height={160} />
  //       <div className='text-text-primary font-medium'>{t('No NFT found')}</div>
  //     </div>
  //   )
  // }
  return (
    <>
      {!displayedNFTs || displayedNFTs.length === 0 ? (
        <div className='w-full py-8 flex flex-col items-center gap-4'>
          <Image src={MascotEmpty} alt='' width={160} height={160} />
          <div className='text-white font-medium'>{t('No NFT found')}</div>
        </div>
      ) : (
        <div className='w-full md:p-5 rounded-2xl'>
          <Box>
            <Grid container spacing={0} gap={isMobile ? 2 : 3}>
              {displayedNFTs?.map((nft) => (
                <Grid item xs={6} sm={6} md={4} key={nft.id} className='bg-black rounded-md'>
                  <div>
                    <Image
                      src={nft?.media_info?.offchain?.image?.url || NoImage}
                      width={260}
                      height={260}
                      className='w-full object-cover aspect-square rounded-tl-md rounded-tr-md'
                      alt=''
                    />
                  </div>
                  <div className='p-3 flex gap-2 items-center'>
                    <div className='font-medium text-white leading-5 text-sm'>{nft.cw721_contract.name}</div>
                    <Link
                      target='_blank'
                      href={`${getConfig()['CHAIN_INFO'].explorer}/token/evm/erc721/${
                        nft.cw721_contract.smart_contract.address
                      }/${nft.token_id}`}>
                      <Image src={OpenLink} alt='' />
                    </Link>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color='primary'
                size='large'
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    sx={{
                      display:
                        item.type === 'page' &&
                        (item.page === 1 ||
                          item.page === totalPages ||
                          (item.page >= page - 1 && item.page <= page + 1))
                          ? 'inline-flex'
                          : item.type === 'page'
                          ? 'none'
                          : 'inline-flex',
                      color: '#B0B0B0',
                      borderRadius: '4px',
                      '&.Mui-selected': {
                        borderRadius: '4px',
                        backgroundColor: '#E7E7E7',
                        color: '#3D3D3D',
                        '&:hover': {
                          borderRadius: '4px',
                          backgroundColor: '#E7E7E7',
                        },
                      },
                      '&:hover': {
                        backgroundColor: '#E7E7E7',
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        </div>
      )}
    </>
  )
}
