import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import VND from "../assets/svg/vnd.svg";
import AURA from "../assets/svg/aura.svg";
import DP from "../assets/svg/dp.svg";
import EventButton from "./EventButton";
import clock from "../assets/svg/clock.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import useSWR from "swr";
import { eventService } from "src/services/eventService";
import { Context } from "src/context";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    background: "#FFF8D5;",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    background: "#FFF8D5;",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

interface HistoryRecord {
  id: number;
  referree: {
    id: string;
    nickname: string | null;
  };
  created_at: string;
  fortune_number: {
    id: number;
    code: string;
    used: boolean;
    is_special: boolean;
  };
}

export default function HistoryDialogs() {
  const [open, setOpen] = React.useState(false);
  const { account } = React.useContext(Context);

  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { data: fortuneNumbers, isLoading } = useSWR(
    {
      key: "fetch-lixi-history",
      id: account?.id,
    },
    async () => {
      try {
        const { data } = await eventService.liXi.getHistory();
        return [
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
          {
            id: 1,
            referree: {
              id: "7ca9a060-0ef5-4dd2-b282-4dac333a6aa2",
              nickname: null,
            },
            created_at: "2025-01-17T17:40:52.426101+07:00",
            fortune_number: {
              id: 5,
              code: "Y8BU3WHMSG",
              used: true,
              is_special: false,
            },
          },
        ];
        return data.referrals as HistoryRecord[];
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    { revalidateOnFocus: false }
  );

  const columns = [
    { id: "fortune_number", label: t("Code"), minWidth: 100, align: "left" },
    { id: "referree", label: t("Used by"), minWidth: 100 },
    {
      id: "created_at",
      label: t("Time"),
      minWidth: 60,
    },
  ];

  return (
    <React.Fragment>
      <EventButton
        onClick={handleClickOpen}
        className="flex items-center gap-2"
      >
        {t("History")}
        <Image src={clock} className="w-4 h-4" alt="den_long" />
      </EventButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="text-center text-[#9F1515] text-2xl font-black-han-sans">
            {t("History")}
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <StyledTableContainer className="h-[300px]">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        fontWeight: "semibold",
                        minWidth: column.minWidth,
                      }}
                      align={column.align as any}
                      className="bg-gradient-to-b from-[#FDF5CB] via-[#FDF5CB] to-[#FFF9DB]"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fortuneNumbers?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      className={`rounded-md ${
                        index % 2 === 0 ? "bg-[#F5E3BC]" : ""
                      }`}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                            align={column.align as any}
                          >
                            {column.id === "referree" ? (
                              <div className="text-[#3A3A3A] font-roboto text-sm font-semibold">
                                {value?.nickname
                                  ? value?.nickname
                                  : value?.id || ""}
                              </div>
                            ) : column.id === "fortune_number" ? (
                              <div className="text-sm text-[#B93139] font-normal">
                                {value.code || ""}
                              </div>
                            ) : (
                              <div className="text-sm text-[#292929] font-normal">
                                {value}
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
