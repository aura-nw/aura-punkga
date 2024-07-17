import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import _ from 'lodash'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
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
      nfts: item.quest.reward.nft ? item.quest.reward.nft.nft_name : 'N/A'
    }));
  }

export default function RewardHistory({data}) {
    const { account, getProfile } = useContext(Context)
    const { t } = useTranslation()
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = transformData(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    )
}
