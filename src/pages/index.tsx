import Carousel from "components/Carousel"

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Mock from "assets/images/mokup1.png"
import Mock2 from "assets/images/mokup2.png"
import SubFilledButton from "components/Button/FilledButton/SubFilledButton"
import FilledSelect from "components/Select/FilledSelect"
import Comic from "components/pages/homepage/comic"
import Image from "next/image"
import MockupImage from "src/assets/images/mockup4.png"
import MockupImage2 from "src/assets/images/mockup5.png"
import TrendingComic from "components/pages/homepage/trendingComic"
import Link from "next/link"
import { useRouter } from "next/router"
const mockupData = [
  {
    image: MockupImage,
    name: "Hero Cyberpunk",
    status: "ongoing",
    author: "Hanz",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "Hero Cyberpunk",
    status: "ongoing",
    author: "Hanz",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "Hero Cyberpunk",
    status: "ongoing",
    author: "Hanz",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "Hero Cyberpunk",
    status: "ongoing",
    author: "Hanz",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "Hero Cyberpunk",
    status: "ongoing",
    author: "Hanz",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "Hero Cyberpunk",
    status: "ongoing",
    author: "Hanz",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "Hero Cyberpunk",
    status: "ongoing",
    author: "Hanz",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
]

export default function Home() {
  const router = useRouter()
  return (
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
      <div className="mt-[50px] flex">
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
            {mockupData.map((data, index) => {
              return (
                <div onClick={() => router.push('/')} key={index}>
                  <Comic {...data} />
                </div>
              )
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
            {mockupData.map((data, index) => {
              return <TrendingComic key={index} {...data} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
