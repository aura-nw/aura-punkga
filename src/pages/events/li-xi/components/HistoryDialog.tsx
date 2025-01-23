import React, { useContext, useState } from "react";
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
import InfiniteScrollTable, {
  ColumnType,
  RowData,
} from "./InfiniteScrollTable";

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
  const [open, setOpen] = useState(false);
  const { account } = useContext(Context);
  const [offset, setOffset] = useState<number>(0);

  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    data: fortuneNumbers,
    mutate,
    isLoading,
  } = useSWR<RowData[]>(
    {
      key: "fetch-lixi-history",
      id: account?.id,
      limit: 20,
      offset,
    },
    async (params) => {
      try {
        const { limit, offset } = params;
        const { data } = await eventService.liXi.getHistory(limit, offset);

        if (data?.referrals) {
          return data.referrals.map((record: HistoryRecord) => ({
            fortune_number: record.fortune_number.code,
            referree: record.referree.nickname || record.referree.id,
            created_at: record.created_at,
          }));
        }
        return [];
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    { revalidateOnFocus: false }
  );

  const columns = [
    {
      id: "fortune_number",
      label: t("Code"),
      minWidth: 100,
      align: "left",
      format: (value: any) => (
        <div className="text-[#3A3A3A] font-roboto text-sm font-semibold">
          {value || ""}
        </div>
      ),
    },
    {
      id: "referree",
      label: t("Used by"),
      minWidth: 100,
      format: (value: any) => (
        <div className="text-sm text-[#B93139] font-normal">{value || ""}</div>
      ),
    },
    {
      id: "created_at",
      label: t("Time"),
      minWidth: 60,
    },
  ] as ColumnType[];

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
          <InfiniteScrollTable
            columns={columns}
            fetchData={async ({ limit, offset }) => {
              setOffset(offset);
              await mutate();
              return fortuneNumbers;
            }}
          />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
