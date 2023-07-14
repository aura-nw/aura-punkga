import Carousel from "components/Carousel"

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Mock from "assets/images/mokup1.png"
import Mock2 from "assets/images/mokup2.png"
import SubFilledButton from "components/Button/FilledButton/SubFilledButton"
import DummyComic from "components/DummyComponent/comic"
import Header from "components/Header"
import FilledSelect from "components/Select/FilledSelect"
import Comic from "components/pages/homepage/comic"
import TrendingComic from "components/pages/homepage/trendingComic"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import MockupImage2 from "src/assets/images/mockup5.png"
import { IComic } from "src/models/comic"
import { getLatestComic, getTrendingComic } from "src/services"
import { Context } from "src/context"

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    keplr: any
    getOfflineSigner: any
    coin98: any
    logoutTimeoutId: any
    config: any
  }
}

export default function Home() {
  const [latestList, setLatestList] = useState<IComic[]>([])
  const [isLatestLoading, setIsLatestLoading] = useState(true)
  const [trendingList, setTrendingList] = useState<IComic[]>([])
  const [isTrendingLoading, setIsTrendingLoading] = useState(true)
  const { isSettingUp } = useContext(Context)

  const fetchLatestList = async () => {
    try {
      setIsLatestLoading(true)
      const data = await getLatestComic()
      setLatestList(data)
      setIsLatestLoading(false)
    } catch (error) {
      console.error("fetchLatestList", error)
      setIsLatestLoading(false)
    }
  }

  const fetchTrendingList = async () => {
    try {
      setIsTrendingLoading(true)
      const data = await getTrendingComic()
      setTrendingList(data)
      setIsTrendingLoading(false)
    } catch (error) {
      console.error("fetchTrendingList", error)
      setIsTrendingLoading(false)
    }
  }

  useEffect(() => {
    if (!isSettingUp) {
      fetchLatestList()
      fetchTrendingList()
    }
  }, [isSettingUp])

  return (
    <>
      <Header />
      <div className="pk-container">
        <div className="mt-[40px] grid grid-cols-2 gap-[40px]">
          <div>
            <Carousel>
              <div>
                <Image className="w-full" src={Mock} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
            </Carousel>
          </div>
          <div>
            <Carousel>
              <div>
                <Image className="w-full" src={Mock} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
              <div>
                <Image className="w-full" src={Mock2} alt="" />
              </div>
            </Carousel>
          </div>
        </div>
        <div className="my-[50px] flex">
          <div className="flex-auto w-[70%]">
            <div className="flex justify-between items-center">
              <div className="text-[24px] font-[800]">Latest Update</div>
              <div className="flex gap-[20px] items-center">
                <FilledSelect
                  icon={<ChevronDownIcon className="h-5 w-5 text-medium-gray" aria-hidden="true" />}
                  options={[
                    {
                      key: 1,
                      value: "Wade Cooper",
                    },
                    {
                      key: 2,
                      value: "Arlene Mccoy",
                    },
                    {
                      key: 3,
                      value: "Devon Webb",
                    },
                  ]}
                  placeholder="All gernes"
                />
                <FilledSelect
                  icon={<ChevronDownIcon className="h-5 w-5 text-medium-gray" aria-hidden="true" />}
                  options={[
                    {
                      key: 1,
                      value: "Wade Cooper",
                    },
                    {
                      key: 2,
                      value: "Arlene Mccoy",
                    },
                    {
                      key: 3,
                      value: "Devon Webb",
                    },
                  ]}
                  placeholder="Status"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[80px] mt-[76px]">
              {isLatestLoading
                ? Array.apply(null, Array(2)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                : latestList.map((data, index) => {
                    return <Comic key={index} {...data} />
                  })}
            </div>
          </div>
          <div className="flex-auto w-[10%]"></div>
          <div className="flex-auto w-[24%]">
            <div className="relative w-full rounded-[30px] overflow-hidden">
              <div className="absolute inset-0">
                <Image src={MockupImage2} alt="" fill className="object-cover" />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full py-[50px]">
                <div className="font-bold text-xl text-white mb-[10px]">Share your work to us</div>
                <SubFilledButton size="lg">Publish manga to Punkga</SubFilledButton>
              </div>
            </div>
            <div className="text-[24px] font-[800] mt-5">Trending</div>
            <div className="flex flex-col gap-10 mt-10">
              {isTrendingLoading
                ? Array.apply(null, Array(2)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                : trendingList.map((data, index) => {
                    return <TrendingComic key={index} {...data} />
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
})
