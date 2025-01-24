import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";

export interface ColumnType {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => any;
}

export interface RowData {
  [key: string]: any;
}

interface FetchDataParams {
  limit: number;
  offset: number;
}

interface InfiniteScrollTableProps {
  columns: ColumnType[];
  fetchData: (params: FetchDataParams) => Promise<RowData[]>;
  limit?: number;
  maxHeight?: number | string;
}
const StyledTableContainer = styled(TableContainer)({
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#E1C8AB",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(90deg, #AE2525, #EE3838, #B80000)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#AE2525",
  },
});

const InfiniteScrollTable: React.FC<InfiniteScrollTableProps> = ({
  columns,
  fetchData,
  limit = 20,
  maxHeight = 400,
}) => {
  const [items, setItems] = useState<RowData[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const newData = await fetchData({ limit, offset });
      if (newData.length === 0 || newData.length < limit) {
        setHasMore(false);
      }

      if (newData.length > 0) {
        setItems((prevItems) => [...prevItems, ...newData]);
        setOffset((prevOffset) => prevOffset + newData.length);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetchData, limit, offset, loading, hasMore]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      const { scrollTop, clientHeight, scrollHeight } = target;

      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMoreItems();
      }
    },
    [loadMoreItems]
  );

  useEffect(() => {
    loadMoreItems();
  }, []);

  const formatCellValue = (column: ColumnType, value: any): string => {
    return column.format ? column.format(value) : value?.toString() || "";
  };

  const renderMobileView = () => (
    <Box sx={{ maxHeight, overflow: "auto" }} onScroll={handleScroll}>
      {items.length === 0 && <div className="text-center">No data</div>}
      {items?.map((row, index) => (
        <Card
          key={`${index}-${offset}`}
          sx={{
            mx: 2,
          }}
        >
          <CardContent
            sx={{
              backgroundColor: index % 2 === 0 ? "#F5E3BC" : "#FFF8D5",
            }}
          >
            {columns?.map((column) => (
              <Box
                key={column.id}
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {column.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: column.align || "left",
                    fontWeight: "medium",
                  }}
                >
                  {formatCellValue(column, row[column.id])}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );

  const renderDesktopView = () => (
    <StyledTableContainer
      //@ts-ignore
      component={Paper}
      onScroll={handleScroll}
      sx={{ maxHeight, overflow: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || "left"}
                sx={{ backgroundColor: "#FFF8D5" }}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="text-center">No data</div>
            </TableCell>
          </TableRow>

          {items?.map((row, index) => (
            <TableRow
              hover
              role="checkbox"
              key={`${index}-${offset}`}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: index % 2 === 0 ? "#F5E3BC" : "#FFF8D5",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              {columns?.map((column) => (
                <TableCell key={column.id} align={column.align || "left"}>
                  {formatCellValue(column, row[column.id])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </StyledTableContainer>
  );

  return isMobile ? renderMobileView() : renderDesktopView();
};

export default InfiniteScrollTable;
