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

const columns = [
  { id: 'campaign', label: 'Campaign', minWidth: 170 },
  { id: 'claimedAt', label: 'Claimed at', minWidth: 100 },
  { id: 'points', label: 'Points', minWidth: 100, align: 'right' },
  { id: 'nfts', label: 'NFTs', minWidth: 100, align: 'right' },
];

// Function to transform the data into the format needed for the table
function transformData(data) {
  return data.map(item => ({
    campaign: item.quest.name,
    claimedAt: new Date(item.created_at).toLocaleString(),
    points: item.quest.reward.xp,
    nfts: item.quest.reward.nft ? item.quest.reward.nft.nft_name : '-'
  }));
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

  const rows = transformData(data);
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
                          {value}
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