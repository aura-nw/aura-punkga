import LIXI from "../assets/LIXI.png";
import Year from "../assets/2025.png";
import Mai from "../assets/mai.png";
import lixi1 from "../assets/lixi1.png";
import podium from "../assets/podium.png";
import lixi_xanh from "../assets/lixi_xanh.png";
import star_bg from "../assets/star_bg.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "src/context";
import { ModalContext } from "src/context/modals";
import EventButton from "../components/EventButton";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TextField from "components/Input/TextField";
import useSWR from "swr";
import { eventService } from "src/services/eventService";
import { toast } from "react-toastify";

export default function Enroll() {
  const { account } = useContext(Context);
  const { setSignInOpen } = useContext(ModalContext);
  const [fortuneNumber, setFortuneNumber] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const { data, mutate, isLoading } = useSWR(
    { key: "apply-fortune-number" },
    async () => {
      try {
        if (!fortuneNumber) return null;
        const { data } = await eventService.liXi.applyFortuneNumbers({
          code: fortuneNumber,
        });
        if (data.insert_referrals_one) {
          toast("Collet fortune number success", {
            type: "error",
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
          });
          router.push("/events/li-xi");
          return data;
        }
        toast("User already applied fortune number", {
          type: "error",
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        });
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
  const { data: referralStatus, isLoading: fetchingStatus } = useSWR(
    {
      key: "get-referral-status",
      account,
    },
    async () => {
      try {
        const { ref } = await eventService.liXi.getReferralStatus();
        if (ref) router.push("/events/li-xi");
        return ref;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  );

  return (
    <div
      style={{
        backgroundImage: `url(${star_bg.src})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#860204] h-screen w-screen flex flex-col justify-center items-center"
    >
      <div className="first-section relative">
        <Image
          src={Year}
          className="relative w-[calc(100vw-20px)] md:w-[384px] z-10"
          alt=""
        />
        <Image
          src={LIXI}
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-[120px]"
          alt=""
        />
        <Image
          src={Mai}
          className="absolute bottom-14 -right-2 md:bottom-10  md:-right-16 z-[1] w-[100px] md:w-[168px]"
          alt=""
        />
        <Image
          src={lixi1}
          className="absolute bottom-2 left-0  z-[1] w-[70px]"
          alt=""
        />
      </div>
      <div className="second-section relative md:w-[500px] flex flex-col justify-center items-center">
        <Image
          src={podium}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 z-[1] w-[calc(100vw-40px)] md:w-[384px]"
          alt=""
        />
        {!account ? (
          <>
            <div className="relative z-10  mb-[42px]">
              <EventButton
                onClick={() => setSignInOpen(true)}
                className="w-[150px]"
              >
                Sign in
              </EventButton>
            </div>
            <div className="relative z-10 text-[#FABA77] text-center">
              *Please Sign in Punkgame account to continue
            </div>
          </>
        ) : (
          <div>
            <div className="relative z-10 flex flex-col items-center mb-[42px]">
              <div className="text-[#FABA77]">Fortune Number</div>
              <div className="flex items-center justify-between w-full gap-4 px-6 md:px-4">
                <TextField
                  onChange={setFortuneNumber}
                  value={fortuneNumber}
                  size="md"
                  placeholder={t("")}
                />
                <EventButton
                  onClick={() => {
                    // console.log("lvh", fortuneNumber);
                    mutate(fortuneNumber);
                  }}
                  className="w-[40px] h-[40px]"
                  disabled={!fortuneNumber}
                >
                  <ArrowRightIcon className="text-[#6D3A0A] w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </EventButton>
              </div>
            </div>
            <div className="relative z-10 text-[#FABA77] text-start md:text-center flex gap-[10px] justify-center items-center">
              <Image src={lixi_xanh} className="w-8 h-8" alt="" />
              Collect a Fortune Number to receive a Blue Li Xi
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
