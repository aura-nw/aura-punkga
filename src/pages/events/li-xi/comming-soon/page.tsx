import BannerMobile from "components/pages/event/kaia-island/assets/mobile-banner.png";
import BannerMobileVN from "components/pages/event/kaia-island/assets/mobile-banner-vn.png";
import LIXI from "../assets/LIXI.png";
import Year from "../assets/2025.png";
import Mai from "../assets/mai.png";
import lixi1 from "../assets/lixi1.png";
import podium from "../assets/podium.png";
import star_bg from "../assets/star_bg.png";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import CountdownTimer from "../components/CountdownTimer";
export default function Lixi() {
  const { locale } = useRouter();
  const { t } = useTranslation();

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
        <div className="relative z-10">
          <CountdownTimer targetDate={"2025-02-10T00:00:00"} />
        </div>{" "}
        <div className="relative z-10 text-[#FABA77] text-center">
          Unwrap your blessings at 00:00 UTC+7, February 10th, 2025
        </div>
      </div>
    </div>
  );
}
