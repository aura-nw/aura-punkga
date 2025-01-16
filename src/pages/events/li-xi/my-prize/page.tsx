import BannerMobile from "components/pages/event/kaia-island/assets/mobile-banner.png";
import BannerMobileVN from "components/pages/event/kaia-island/assets/mobile-banner-vn.png";
import LIXI from "../assets/LIXI.png";
import Year from "../assets/2025.png";
import Snake from "../assets/snake1.png";
import podium from "../assets/podium.png";
import lixi_do from "../assets/lixi_do.png";
import lixi_xanh from "../assets/lixi_xanh.png";
import lixi_vang from "../assets/lixi_vang.png";
import info from "../assets/svg/info.svg";
import gold_medal from "../assets/svg/gold_medal.svg";
import silver_medal from "../assets/svg/silver_medal.svg";
import bronze_medal from "../assets/svg/bronze_medal.svg";
import star_bg from "../assets/star_bg.png";
import den_long from "../assets/den_long.png";
import cane from "../assets/cane.png";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { Context } from "src/context";
import { ModalContext } from "src/context/modals";
import EventButton from "../components/EventButton";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TextField from "components/Input/TextField";
import Copy2Clipboard from "components/Copy2Clipboard";

import ic_check from "../assets/svg/checked.svg";
import ic_copy from "../assets/svg/copy.svg";

import VND from "../assets/svg/vnd.svg";
import AURA from "../assets/svg/aura.svg";
import DP from "../assets/svg/dp.svg";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { eventService } from "src/services/eventService";
import ClaimDialogs from "../components/ClaimDialog";

const BulletPoint = ({ className }: { className?: string }) => (
  <div
    className={`${className} w-[10px] h-[10px]  rotate-45 rounded-sm bg-[#F0C865]`}
  ></div>
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "transparent",
    color: "#3D3D3D !important",
    borderBottom: "none",
    fontWeight: "600 !important",
    fontSize: 16,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
    borderBottom: "none",
    fontWeight: "500 !important",
    color: "#3D3D3D !important",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
}));
const StyledTableContainer = styled(TableContainer)({
  // maxHeight: "none",
  // overflow: "auto",
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

const StyledTable = styled(Table)({
  width: "100%",
});

const data = [
  { rank: 1, participant: "John Doe", points: 100 },
  { rank: 2, participant: "Jane Doe", points: 90 },
  { rank: 3, participant: "Alice Smith", points: 80 },
  { rank: 4, participant: "Bob Johnson", points: 70 },
  { rank: 5, participant: "Charlie Brown", points: 60 },
  { rank: 6, participant: "David Wilson", points: 50 },
  { rank: 7, participant: "Eva Davis", points: 40 },
  { rank: 8, participant: "Frank Miller", points: 30 },
  { rank: 9, participant: "Grace Lee", points: 20 },
  { rank: 10, participant: "Hannah White", points: 10 },
];

export interface FortuneNumber {
  id: number;
  code: string;
  status: string;
  used: boolean;
  is_special: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
}
export interface UserLixi {
  red: {
    aggregate: {
      count: number;
    };
  };
  blue: {
    aggregate: {
      count: number;
    };
  };
  yellow: {
    aggregate: {
      count: number;
    };
  };
}

export default function Lixi() {
  const { account } = useContext(Context);
  const { setSignInOpen } = useContext(ModalContext);
  const { locale } = useRouter();
  const { t } = useTranslation();

  const columns = [
    { id: "rank", label: t("Rank"), minWidth: 60 },
    { id: "participant", label: t("Participant"), minWidth: 100 },
    {
      id: "points",
      label: (
        <div className="flex items-center justify-center gap-2">
          {t("Points")}
          <Tooltip title={t("1 point = 1 successful referral")}>
            <Image src={info} className="w-4 h-4 cursor-pointer" alt="" />
          </Tooltip>
        </div>
      ),
      minWidth: 60,
      align: "right",
    },
  ];
  const transactions = [
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
    { txHash: "BD201384...938AA6E9", time: "23/10/2023 9:00" },
  ];
  const TransactionsColumns = [
    {
      id: "txHash",
      label: t("Transaction Hash"),
      minWidth: 120,
      align: "left",
    },
    { id: "time", label: t("Time"), minWidth: 30, align: "center" },
  ];
  const PrizeColumns = [
    { id: "prize", label: t("Prize"), minWidth: 120, align: "left" },
    { id: "amount", label: t("Amount"), minWidth: 30, align: "right" },
  ];

  const PrizeData = [
    {
      prize: (
        <div className="flex items-center gap-2">
          <Image src={VND} className="w-6 h-6" alt="" />
          <div>{t("VND")}</div>
        </div>
      ),
      amount: 100,
    },
    {
      prize: (
        <div className="flex items-center gap-2">
          <Image src={AURA} className="w-6 h-6" alt="" />
          <div>{t("AURA")}</div>
        </div>
      ),
      amount: 90,
    },
    {
      prize: (
        <div className="flex items-center gap-2">
          <Image src={DP} className="w-6 h-6" alt="" />
          <div>{t("DP")}</div>
        </div>
      ),
      amount: 80,
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${star_bg.src})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#860204] md:h-screen w-screen flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-20 "
    >
      <div className="relative w-[calc(100vw-40px)] md:w-[750px] flex flex-col items-center mt-32 md:mt-40 h-full gap-4">
        <div className="relative px-6 py-4 w-[calc(100vw-40px)] md:w-[750px] rounded-b-[6px] border border-[#D52121] bg-gradient-to-b from-[rgba(117,20,20,0.50)] via-[rgba(133,7,7,0.50)] to-[rgba(244,63,63,0.50)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6.45px]">
          <Image
            src={den_long}
            className="absolute lg:block hidden lg:-top-4 lg:-left-[60px] lg:max-w-[850px] lg:w-[850px]"
            alt="den_long"
          />
          <Image
            src={cane}
            className="absolute lg:hidden -top-2 -left-4 max-w-[calc(100vw-10px)]"
            alt="cane"
          />
          <div className="text-[#FEF368] font-black-han-sans text-2xl text-center">
            {t("Unclaimed prize")}
          </div>
          <StyledTableContainer className="h-[300px]">
            <StyledTable stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {PrizeColumns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      style={{
                        fontWeight: "semibold",
                        minWidth: column.minWidth,
                        color: "#FEF368",
                      }}
                      align={column.align as any}
                    >
                      <div className="text-[#FEF368] ">{column.label}</div>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {PrizeData.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {PrizeColumns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                            align={column.align as any}
                          >
                            <div className="text-sm text-white font-semibold">
                              {value}
                            </div>
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        </div>
        <ClaimDialogs />
      </div>

      <div className="relative w-[calc(100vw-40px)] md:w-[750px] flex flex-col items-center md:mt-[140px] h-full mb-32 lg:mb-0">
        <div className="px-6 py-4 w-full text-[#8E0B09] font-normal font-black-han-sans text-2xl md:col-span-7 rounded-[6px] border-[0.5px] border-[#FFD66B] bg-gradient-to-b from-[#FDF5CB] via-[#FDF5CB] to-[#FFF9DB] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <div className="text-center">{t("Leaderboard")}</div>
          <StyledTableContainer className="h-[300px]">
            <StyledTable stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {TransactionsColumns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      style={{
                        fontWeight: "semibold",
                        minWidth: column.minWidth,
                      }}
                      className="bg-gradient-to-b from-[#FDF5CB] via-[#FDF5CB] to-[#FFF9DB]"
                      align={column.align as any}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((row, index) => {
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
                      {TransactionsColumns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                            align={column.align as any}
                          >
                            {column.id === "txHash" ? (
                              <div className="text-[#B93139] font-roboto text-sm font-semibold">
                                {value}
                              </div>
                            ) : (
                              <div className="text-sm text-[#292929] font-normal">
                                {value}
                              </div>
                            )}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        </div>
      </div>
    </div>
  );
}
