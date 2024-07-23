import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  Box,
  Pagination,
  PaginationItem,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import OpenLink from 'assets/images/icons/open-link.svg'
import getConfig from 'next/config';
import { useRouter } from 'next/router';

const columns = [
  { id: 'campaign', label: 'Campaign', minWidth: 170 },
  { id: 'claimedAt', label: 'Claimed at', minWidth: 100 },
  { id: 'points', label: 'Points', minWidth: 100, align: 'right' },
  { id: 'nfts', label: 'NFTs', minWidth: 100, align: 'right' },
];

function transformData(data, locale) {
  return data.map(item => {
    const txHash = item.user_quest_rewards && item.user_quest_rewards[0]
      ? JSON.parse(item.user_quest_rewards[0].tx_hash)[0]
      : '#';

    const nftHash = item.user_quest_rewards && item.user_quest_rewards[1]
      ? JSON.parse(item.user_quest_rewards[1].tx_hash)[0]
      : '#';

    return {
      campaign: item.quest[locale]?.name || item.quest.name,
      claimedAt: new Date(item.created_at).toLocaleString(),
      points: item.quest.reward.xp,
      nfts: item.quest.reward.nft ? item.quest.reward.nft.nft_name : '-',
      txHash: txHash,
      nftHash: nftHash
    };
  });
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: 'transparent',
    color: '#3D3D3D !important',
    borderBottom: '1px solid #B0B0B0 !important',
    fontWeight: '600 !important',
    fontSize: 16,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
    borderBottom: 'none',
    fontWeight: '500 !important',
    color: '#3D3D3D !important',
  },
}));

export default function RewardHistory({ data }) {
  const { t } = useTranslation()
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const { locale } = useRouter();

  const rows = transformData(data, locale);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className='w-full overflow-hidden bg-[#F6F6F6] p-[32px] flex flex-col gap-4 rounded-[10px]'>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  style={{ fontWeight: 'semibold' }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} >
                          <>
                            {column.id === 'points' ? (
                              <div className='flex items-center justify-between'>
                                <div>{value}</div>
                                {row.txHash !== '#' && (
                                  <Link target='_blank' href={`${getConfig()['CHAIN_INFO'].explorer}/tx/${row.txHash}`}>
                                    <Image
                                      src={OpenLink}
                                      alt="Points icon"
                                      width={20}
                                      height={20}
                                    />
                                  </Link>
                                )}
                              </div>
                            ) : column.id === 'nfts' ? (
                              <div className='flex items-center justify-between'>
                                <div>{value}</div>
                                {row.nftHash !== '#' && (
                                  <Link target='_blank' href={`${getConfig()['CHAIN_INFO'].explorer}/tx/${row.nftHash}`}>
                                    <Image
                                      src={OpenLink}
                                      alt="NFT icon"
                                      width={20}
                                      height={20}
                                    />
                                  </Link>
                                )}
                              </div>
                            ) : (
                              <div>{value}</div>
                            )}
                          </>
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          size="large"
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
                '&.MuiPaginationItem-previousNext': {
                  color: '#6D6D6D',
                },
                '&.MuiPaginationItem-previousNext:hover': {
                  backgroundColor: '#E7E7E7',
                },
              }}
            />
          )}
        />
      </Box>
    </div>
  )
}