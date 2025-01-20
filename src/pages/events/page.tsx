import HeroBanner from "components/pages/event/assets/allEvents/hero-banner.png";
import HeroBannerVN from "components/pages/event/assets/allEvents/hero-banner-vn.png";
import HeroBannerMobile from "components/pages/event/assets/allEvents/hero-banner-mobile.png";
import HeroBannerMobileVN from "components/pages/event/assets/allEvents/hero-banner-mobile-vn.png";
import WowYourselfImage from "components/pages/event/assets/allEvents/wow-yourself.png";
import KaiaEventImage from "components/pages/event/assets/allEvents/Kaia.png";
import KaiaEventImageVN from "components/pages/event/assets/allEvents/Kaia-vn.png";
import PudgyEventImage from "components/pages/event/assets/allEvents/Pudgy.png";
import AvaEventImage from "components/pages/event/assets/allEvents/ava.png";
import PunktoberEventImage from "components/pages/event/assets/allEvents/punktober.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import star_bg from "./li-xi/assets/star_bg.png";

const events = [
  {
    url: "/events/li-xi",
    isLive: false,
    en: {
      image: star_bg,
      title: `Li Xi`,
      subtitle: `31 Jun 2025 - Feb 2025`,
    },
    vn: {
      image: star_bg,
      title: `Lì Xì`,
      subtitle: `31 Jun 2025 - Feb 2025`,
    },
  },
  {
    url: "/events/your-city",
    isLive: true,
    en: {
      image: PunktoberEventImage,
      title: `Your City`,
      subtitle: `14 Dec 2024 - 13 Jan 2025`,
    },
    vn: {
      image: AvaEventImage,
      title: `AVA Grand Contest 2024`,
      subtitle: `14/12/2024 - 13/01/2025`,
    },
  },
  {
    url: "/events/ava-2024",
    isLive: false,
    en: {
      image: AvaEventImage,
      title: `AVA Grand Contest 2024`,
      subtitle: `12 Oct 2024 - 17 Nov 2024`,
    },
    vn: {
      image: AvaEventImage,
      title: `AVA Grand Contest 2024`,
      subtitle: `12/10/2024 - 12/11/2024`,
    },
  },
  {
    url: "/events/pudgy-asia-tour",
    isLive: false,
    en: {
      image: PudgyEventImage,
      title: `Pudgy Asia Tour`,
      subtitle: `01 Aug 2024 - 4 Sep 2024`,
    },
    vn: {
      image: PudgyEventImage,
      title: `Pudgy Asia Tour`,
      subtitle: `01/08/2024 - 04/09/2024`,
    },
  },
  {
    url: "/events/kaia-island",
    isLive: false,
    en: {
      image: KaiaEventImage,
      title: `Kaia's Island Mythology Record`,
      subtitle: `17 Jul 2024 - 13 Aug 2024`,
    },
    vn: {
      image: KaiaEventImageVN,
      title: `Ghi chép về truyền thuyết đảo Kaia`,
      subtitle: `17/07/2024 - 13/08/2024`,
    },
  },
  {
    url: "/events/wow-yourself",
    isLive: false,
    en: {
      image: WowYourselfImage,
      title: `WOW yourself`,
      subtitle: `03 Jun 2024 - 30 Jun 2024`,
    },
    vn: {
      image: WowYourselfImage,
      title: `WOW yourself`,
      subtitle: `03/06/2024 - 30/06/2024`,
    },
  },
];
export default function EventPage() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <div className="pk-container">
      <div className="mt-8">
        <Image
          src={locale == "vn" ? HeroBannerMobileVN : HeroBannerMobile}
          alt=""
          className="w-full h-auto object-cover rounded-mlg overflow-hidden md:hidden"
        />
        <Image
          src={locale == "vn" ? HeroBannerVN : HeroBanner}
          alt=""
          className="w-full h-auto object-cover overflow-hidden hidden md:block"
        />
      </div>
      <div>
        <div className="text-lg font-medium mt-4 md:mt-8">{t("Events")}</div>
        <div className="mt-4 grid grid-cols-1 md:gap-8 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.url}
              href={event.url}
              className="rounded-mlg p-4 bg-white relative"
            >
              <div className="relative">
                <Image
                  src={event[locale].image}
                  alt=""
                  className="w-full aspect-[310/166] object-cover rounded-md overflow-hidden"
                />
                {event.isLive && (
                  <div className="absolute top-2.5 right-2.5 text-xxs font-semibold leading-[15px] bg-error-100 text-text-error-primary-3 flex items-center gap-1 rounded px-2.5 py-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="4"
                      viewBox="0 0 4 4"
                      fill="none"
                    >
                      <circle cx="2" cy="2" r="2" fill="#F73B3B" />
                    </svg>
                    Live
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium">{event[locale].title}</div>
                <div className="mt-1 text-xs text-text-teriary font-medium">
                  {event[locale].subtitle}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
