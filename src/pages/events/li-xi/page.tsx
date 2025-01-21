import Snake from "./assets/snake1.png";
import podium from "./assets/podium.png";
import lixi_do from "./assets/lixi_do.png";
import lixi_xanh from "./assets/lixi_xanh.png";
import lixi_vang from "./assets/lixi_vang.png";
import info from "./assets/svg/info.svg";
import gold_medal from "./assets/svg/gold_medal.svg";
import silver_medal from "./assets/svg/silver_medal.svg";
import bronze_medal from "./assets/svg/bronze_medal.svg";
import star_bg from "./assets/star_bg.png";
import den_long from "./assets/den_long.png";
import cane from "./assets/cane.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { Context } from "src/context";
import { ModalContext } from "src/context/modals";
import EventButton from "./components/EventButton";
import Copy2Clipboard from "components/Copy2Clipboard";

import ic_check from "./assets/svg/checked.svg";
import ic_copy from "./assets/svg/copy.svg";
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
import RuleDialogs from "./components/RuleDialog";
import HistoryDialogs from "./components/HistoryDialog";
import RewardDialogs from "./components/RewardDialog";

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
  const router = useRouter();

  const { t } = useTranslation();
  const [selectedLixi, setSelectedLixi] = useState<string | undefined>();

  const { data: fortuneNumbers, isLoading } = useSWR(
    {
      key: "fetch-fortune-numbers",
      id: account?.id,
    },
    async () => {
      try {
        const { data } = await eventService.liXi.getFortuneNumbers();
        return data.fortune_numbers as FortuneNumber[];
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    { revalidateOnFocus: false }
  );
  const { data: userLixi, isLoading: fetchingLixi } = useSWR(
    {
      key: "fetch-user-lixi",
      id: account?.id,
    },
    async () => {
      try {
        const { data } = await eventService.liXi.getUserLixi();

        return data as UserLixi;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    { revalidateOnFocus: false }
  );
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
  const { data: referralStatus, isLoading: fetchingStatus } = useSWR(
    {
      key: "get-referral-status",
      account,
    },
    async () => {
      try {
        const { ref } = await eventService.liXi.getReferralStatus();
        if (!ref) router.push("/events/li-xi/enroll");
        return ref;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  );

  useEffect(() => {
    if (!account) {
      router.push("/events/li-xi/enroll");
      return;
    }
  }, [account]);
  return (
    <div
      style={{
        backgroundImage: `url(${star_bg.src})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#860204] md:h-screen w-screen flex flex-col md:flex-row justify-center items-center gap-20 "
    >
      <div className="first-section relative h-full flex flex-col justify-center items-center">
        <Image
          src={Snake}
          className="absolute top-0 md:-top-24 md:left-1/2 md:-translate-x-1/2 w-[200px] md:w-[290px] z-1"
          alt=""
        />
        {selectedLixi === "yellow" ? (
          <Image
            src={lixi_vang}
            className="absolute top-36 md:top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-[142px] z-10"
            alt=""
          />
        ) : selectedLixi === "blue" ? (
          <Image
            src={lixi_xanh}
            className="absolute top-36 md:top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-[142px] z-10"
            alt=""
          />
        ) : (
          <Image
            src={lixi_do}
            className="absolute top-36 md:top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-[142px] z-10"
            alt=""
          />
        )}

        <div className="relative  mt-[300px] md:mt-0">
          <Image
            src={podium}
            className="relative z-10 w-[calc(100vw-40px)] md:w-[384px]"
            alt=""
          />
          <div className="absolute top-[90px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[150px]">
            {selectedLixi && userLixi?.[selectedLixi]?.aggregate.count ? (
              <EventButton onClick={() => {}} className="w-[150px]">
                <RewardDialogs />
              </EventButton>
            ) : (
              <div className="text-[#FABA77] text-center">
                {t(
                  "You don’t have any Li Xi, refer your friends to earn more."
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex border-[2px] border-[#EDB48D] rounded-xl p-2 gap-2 bg-[#B43325] w-[calc(100vw-40px)] md:w-full justify-center">
          <div className="relative">
            <Image
              src={lixi_xanh}
              className="absolute -top-24 md:-top-20 left-0 md:w-[100px] z-30 cursor-pointer"
              alt=""
              onClick={() => setSelectedLixi("blue")}
            />
            <div className="text-white font-black-han-sans mt-4 md:mt-8 bg-[#860204] rounded-3xl w-[100px] text-center px-2 py-1">
              {userLixi?.blue?.aggregate.count ?? 0}
            </div>
          </div>
          <div className="relative">
            <Image
              src={lixi_vang}
              className="absolute -top-24 md:-top-20 left-0 md:w-[100px] z-30 cursor-pointer"
              alt=""
              onClick={() => setSelectedLixi("yellow")}
            />
            <div className="text-white font-black-han-sans mt-4 md:mt-8 bg-[#860204] rounded-3xl  w-[100px] text-center px-2 py-1">
              {userLixi?.yellow?.aggregate.count ?? 0}
            </div>
          </div>
          <div className="relative">
            <Image
              src={lixi_do}
              className="absolute -top-24 md:-top-20 left-0 md:w-[100px] z-30 cursor-pointer"
              alt=""
              onClick={() => setSelectedLixi("red")}
            />
            <div className="text-white font-black-han-sans mt-4 md:mt-8 bg-[#860204] rounded-3xl  w-[100px] text-center px-2 py-1">
              {userLixi?.red?.aggregate.count ?? 0}
            </div>
          </div>
        </div>
      </div>
      <div className="second-section relative w-[calc(100vw-40px)] md:w-[750px] flex flex-col items-center md:mt-40 h-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="relative px-6 py-4 rounded-b-[6px] border border-[#D52121] bg-gradient-to-b from-[rgba(117,20,20,0.50)] via-[rgba(133,7,7,0.50)] to-[rgba(244,63,63,0.50)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6.45px]">
            <Image
              src={den_long}
              className="absolute lg:block hidden  lg:-top-4 lg:-left-[60px] lg:max-w-[850px] lg:w-[850px]"
              alt="den_long"
            />
            <Image
              src={cane}
              className="absolute lg:hidden -top-2 -left-4 max-w-[calc(100vw-10px)]"
              alt="cane"
            />
            <div className="flex justify-between items-center">
              <span className="text-[#FEF368] font-black-han-sans text-2xl max-w-[200px] md:max-w-full">
                {t("The Year of Snake’s Li Xi")}
              </span>
              <EventButton
                onClick={() => {
                  router.push(`/events/li-xi/my-prize`);
                }}
              >
                {t("View my prize")}
              </EventButton>
            </div>
            <div className="text-white">
              {t("Complete missions to earn 3 types of LiXi")}
            </div>
            <div className="flex justify-start  gap-4 items-center text-white text-sm font-medium">
              <BulletPoint />{" "}
              {t("Red: Submit a character of Literature Infinity event.")}
            </div>
            <div className="flex justify-start gap-4 items-center text-white text-sm font-medium">
              <BulletPoint />{" "}
              {t("Gold: Collect a fortune number & sign in Punkgame account.")}
            </div>
            <div className="flex justify-start  gap-4 items-center text-white text-sm font-medium">
              <div className="w-[10px]">
                <BulletPoint />
              </div>
              {t(
                `Blue: Share your fortune numbers to your friends. For every successfully registered account, you and your friend will receive 1 Blue Li Xi each.`
              )}
            </div>
            <RuleDialogs />
          </div>
          <div className="grid grid-cols-12 justify-between items-start gap-4 mb-32 md:mb-0">
            <div className="relative px-6 py-4 flex flex-col gap-4 col-span-12 md:col-span-5 rounded-[6px] border-[0.5px] border-[#FFD66B] bg-gradient-to-b from-[#FDF5CB] via-[#FDF5CB] to-[#FFF9DB] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
              <div
                className="absolute -top-[20px] left-4 w-2 h-[28px] rounded-[3px]"
                style={{
                  background:
                    "linear-gradient(98deg, #FA7519 -2.01%, #FFCB7E 109.77%)",
                }}
              />
              <div
                className="absolute -top-[20px] right-4 w-2 h-[28px] rounded-[3px] hidden md:block"
                style={{
                  background:
                    "linear-gradient(98deg, #FA7519 -2.01%, #FFCB7E 109.77%)",
                }}
              />
              <div className="text-[#8E0B09] font-normal font-black-han-sans text-2xl">
                {t("Fortune Number")}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-[#F4741B] cursor-pointer">
                  {t("Copy all")}
                </div>
                <HistoryDialogs />
              </div>
              <div className="flex flex-col justify-start items-center">
                {fortuneNumbers?.map((ele, index) => (
                  <div className="flex justify-between items-center w-full gap-4">
                    <BulletPoint className="" />
                    <div
                      className={
                        ele.status === "ACTIVE" ? "" : "text-[#6D6D6D]"
                      }
                    >
                      {ele.code}
                    </div>
                    {ele.used ? (
                      <Image
                        src={ic_check}
                        className="w-4 h-4"
                        alt="ic_check"
                      />
                    ) : (
                      <Copy2Clipboard text={ele.code}>
                        <Image
                          src={ic_copy}
                          className="w-4 h-4 cursor-pointer"
                          alt="ic_copy"
                        />
                      </Copy2Clipboard>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-[#F4741B]">
                {t(
                  "Both referrer and referree receives a Blue LiXi when a code being used"
                )}
              </div>
            </div>{" "}
            <div className="relative px-6 py-4 text-[#8E0B09] font-normal font-black-han-sans text-2xl col-span-12 md:col-span-7 rounded-[6px] border-[0.5px] border-[#FFD66B] bg-gradient-to-b from-[#FDF5CB] via-[#FDF5CB] to-[#FFF9DB] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
              <div
                className="absolute -top-[20px] left-4 w-2 h-[28px] rounded-[3px]"
                style={{
                  background:
                    "linear-gradient(98deg, #FA7519 -2.01%, #FFCB7E 109.77%)",
                }}
              />
              <div
                className="absolute -top-[20px] right-4 w-2 h-[28px] rounded-[3px] hidden md:block"
                style={{
                  background:
                    "linear-gradient(98deg, #FA7519 -2.01%, #FFCB7E 109.77%)",
                }}
              />
              <div className="text-center">{t("Leaderboard")}</div>
              <StyledTableContainer className="h-[250px]">
                <StyledTable stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <StyledTableCell
                          key={column.id}
                          style={{
                            fontWeight: "semibold",
                            minWidth: column.minWidth,
                          }}
                          className="bg-gradient-to-b from-[#FDF5CB] via-[#FDF5CB] to-[#FFF9DB]"
                        >
                          {column.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => {
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
                              <StyledTableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.id === "rank" ? (
                                  <div className="flex items-center justify-between">
                                    {value === 1 ? (
                                      <Image
                                        src={gold_medal}
                                        className="w-5 h-6"
                                        alt="gold_medal"
                                      />
                                    ) : value === 2 ? (
                                      <Image
                                        src={silver_medal}
                                        className="w-5 h-6"
                                        alt="silver_medal"
                                      />
                                    ) : value === 3 ? (
                                      <Image
                                        src={bronze_medal}
                                        className="w-5 h-6"
                                        alt="bronze_medal"
                                      />
                                    ) : (
                                      <div className="text-[#3A3A3A] font-roboto text-sm font-semibold text-center">
                                        {value}
                                      </div>
                                    )}
                                  </div>
                                ) : column.id === "participant" ? (
                                  <div className="flex items-center justify-between text-sm text-[#B93139] font-normal">
                                    {value}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-end text-sm text-[#292929] font-normal">
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
              <div className="flex justify-between items-center">
                <div className="text-[#6D3A0A] text-sm font-medium">
                  {t("Your point")}: 12
                </div>{" "}
                <div className="text-[#6D3A0A] text-sm font-medium">
                  1234 pts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
