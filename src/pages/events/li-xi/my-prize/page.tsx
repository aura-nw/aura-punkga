import info from "../assets/svg/info.svg";
import star_bg from "../assets/star_bg.png";
import den_long from "../assets/den_long.png";
import cane from "../assets/cane.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "src/context";
import { ModalContext } from "src/context/modals";
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
import ClaimDialogs from "../components/ClaimDialog";
import TextField from "components/Input/TextField";
import EventButton from "../components/EventButton";
import { eventService } from "src/services/eventService";
import useSWR from "swr";
import FullScreenLoader from "../components/Loading";
import { toast } from "react-toastify";
import Link from "next/link";
import getConfig from "next/config";
import moment from "moment";
import { formatNumber } from "src/utils";

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

function ellipseAddress(address, width = 10) {
  if (!address) {
    return "";
  }
  const start = address.slice(0, width + 2); // Include the '0x' prefix
  const end = address.slice(-width);
  return `${start}...${end}`;
}
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

export default function MyPrize() {
  const { account } = useContext(Context);
  const config = getConfig();
  const { setSignInOpen } = useContext(ModalContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [vnd, setVND] = useState("");
  const [aura, setAura] = useState("");
  const [dp, setDp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (config && config.EVENT_START) {
      router.push("/events/li-xi/coming-soon");
      return;
    }
    if (!account) {
      router.push("/events/li-xi/enroll");
      return;
    }
  }, []);

  const {
    data: UnclaimedPrize,
    mutate: fetchUnclaimedPrize,
    isLoading: fetchingUnclaimedPrize,
  } = useSWR(
    {
      key: "get-unclaimed-prize",
      account,
    },
    async () => {
      try {
        const data = await eventService.liXi.getUnclaimedPrize();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    {
      revalidateOnFocus: false,
    }
  );
  const {
    data: claimedTx,
    mutate: fetchClaimedTx,
    isLoading: fetchingClaimedTx,
  } = useSWR(
    {
      key: "get-claimed-tx",
      account,
    },
    async () => {
      try {
        const { data } = await eventService.liXi.getClaimedTx();
        if (data && data?.lixi_reward_claim) {
          return data.lixi_reward_claim;
        }
        return [];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    {
      revalidateOnFocus: false,
    }
  );
  const { mutate: fetchBankAccount, isLoading: fetchingBankAccount } = useSWR(
    {
      key: "get-bank-account",
      account,
    },
    async () => {
      try {
        const { data } = await eventService.liXi.getBankAccount();
        if (data?.user_bank_account && data.user_bank_account.length > 0) {
          setWalletAddress(data.user_bank_account[0].bank);
          return data.user_bank_account;
        }
      } catch (error) {
        console.error(error);
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  const handleSaveBankAccount = async () => {
    setLoading(true);
    try {
      const { data } = await eventService.liXi.setBankAccount(walletAddress);
      if (data.insert_user_bank_account_one) {
        toast("Save bank account successfully", {
          type: "success",
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }
      toast(data?.errors || "Unexpected errors. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    } catch (error) {
      toast(error?.message || "Unexpected errors. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };

  const TransactionsColumns = [
    {
      id: "tx_hash",
      label: t("Transaction Hash"),
      minWidth: 120,
      align: "left",
    },
    { id: "created_at", label: t("Time"), minWidth: 30, align: "center" },
  ];
  const PrizeColumns = [
    { id: "prize", label: t("Prize"), minWidth: 120, align: "left" },
    { id: "amount", label: t("Amount"), minWidth: 30, align: "right" },
  ];
  const isLoading =
    fetchingUnclaimedPrize ||
    fetchingClaimedTx ||
    loading ||
    fetchingBankAccount;

  return (
    <div
      style={{
        backgroundImage: `url(${star_bg.src})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#860204] md:h-screen w-screen flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-20 "
    >
      {isLoading && <FullScreenLoader />}
      <div
        className="absolute top-0 left-0 z-50  p-4 flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/events/li-xi")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 17L10 12L15 7"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-white text-lg font-medium leading-relaxed">
          Back
        </div>
      </div>
      <div className="relative w-[calc(100vw-40px)] md:w-[750px] flex flex-col items-center mt-20 md:mt-40 h-full gap-4">
        <div className="relative text-center px-6 py-4 w-[calc(100vw-40px)] md:w-[750px] rounded-b-[6px] border border-[#D52121] bg-gradient-to-b from-[rgba(117,20,20,0.50)] via-[rgba(133,7,7,0.50)] to-[rgba(244,63,63,0.50)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6.45px]">
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
          <StyledTableContainer>
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
                {[
                  {
                    prize: (
                      <div className="flex items-center gap-2">
                        <Image src={AURA} className="w-6 h-6" alt="" />
                        <div>{t("AURA")}</div>
                      </div>
                    ),
                    amount: formatNumber(UnclaimedPrize?.AURA) || 0,
                  },
                  {
                    prize: (
                      <div className="flex items-center gap-2">
                        <Image src={DP} className="w-6 h-6" alt="" />
                        <div>{t("DP")}</div>
                      </div>
                    ),
                    amount: formatNumber(UnclaimedPrize?.DP) || 0,
                  },
                ].map((row, index) => {
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
          <ClaimDialogs cb={fetchClaimedTx} />
          <div className="relative z-10 text-[#FABA77] text-start md:text-center flex gap-[10px] justify-center items-center italic text-sm mt-2">
            AURA rewards are claimed instantly upon pressing "Claim," while DP
            will be sent after the event ends.
          </div>
        </div>
        <div className="relative text-center px-6 py-4 w-[calc(100vw-40px)] md:w-[750px] rounded-b-[6px] border border-[#D52121] bg-gradient-to-b from-[rgba(117,20,20,0.50)] via-[rgba(133,7,7,0.50)] to-[rgba(244,63,63,0.50)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6.45px]">
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
          <StyledTableContainer>
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
                {[
                  {
                    prize: (
                      <div className="flex items-center gap-2">
                        <Image src={VND} className="w-6 h-6" alt="" />
                        <div>{t("VND")}</div>
                      </div>
                    ),
                    amount: formatNumber(UnclaimedPrize?.VND) || 0,
                  },
                ].map((row, index) => {
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
          <textarea
            id="walletAddress"
            className="bg-white !border-white rounded-lg border text-sm p-2 h-[150px] w-full mt-4"
            placeholder={t(
              `Fill in the required bank account details to receive rewards:\n• Account Holder Name\n• Bank Name\n• Account Number\n• Bank Branch (if applicable)\n• SWIFT Code (for international transfers)`
            )}
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <EventButton onClick={handleSaveBankAccount}>{t("Save")}</EventButton>
          <div className="relative z-10 text-[#FABA77] text-start md:text-center flex gap-[10px] justify-center items-center italic text-sm mt-2">
            VND will be sent after the event ends.
          </div>
        </div>
      </div>

      <div className="relative w-[calc(100vw-40px)] md:w-[750px] flex flex-col items-center md:mt-[140px] h-full mb-32 lg:mb-0">
        <div className="px-6 py-4 w-full text-[#8E0B09] font-normal font-black-han-sans text-2xl md:col-span-7 rounded-[6px] border-[0.5px] border-[#FFD66B] bg-gradient-to-b from-[#FDF5CB] via-[#FDF5CB] to-[#FFF9DB] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <div className="text-center">{"Claim transaction"}</div>
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
                {claimedTx &&
                  claimedTx.map((row, index) => {
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
                              {column.id === "tx_hash" ? (
                                <Link
                                  href={`${config.CHAIN_INFO.explorer}/tx/${value}`}
                                  target="_blank"
                                  className="text-[#B93139] font-roboto text-sm font-semibold cursor-pointer"
                                >
                                  {ellipseAddress(value)}
                                </Link>
                              ) : (
                                <div className="text-sm text-[#292929] font-normal">
                                  {moment(value).format("DD/MM/yyyy")}
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
