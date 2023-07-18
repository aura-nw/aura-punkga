import { ArrowRightIcon, BellAlertIcon } from "@heroicons/react/20/solid"
import {
  ArrowsUpDownIcon,
  BellAlertIcon as BellAlertIconOutline,
  DocumentTextIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import FlashAnimation from "components/AnimationIconHOC/Flash"
import FilledButton from "components/Button/FilledButton"
import OutlineButton from "components/Button/OutlineButton"
import TextField from "components/Input/TextField"
import StatusLabel from "components/Label/Status"
import Tag from "components/Label/Tag"
import HeartFillIcon from "images/icons/heart_fill.svg"
import HeartOutlineIcon from "images/icons/heart_outline.svg"
import moment from "moment"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"
import mockBanner from "src/assets/images/mockup3.png"
import mockAvar from "src/assets/images/mockup4.png"
import m6 from "src/assets/images/mockup6.png"
import { LanguageType } from "src/constants/global.types"
import { Context } from "src/context"
import { IComicDetail } from "src/models/comic"

export default function ComicDetail({
  data,
  language,
  setLanguage,
  isSubscribe,
  setIsSubscribe,
  subscribe,
  unsubscribe,
  like,
  unlike,
}: {
  data: IComicDetail
  language: LanguageType
  setLanguage: any
  isSubscribe: boolean
  setIsSubscribe: any
  subscribe: () => void
  unsubscribe: () => void
  like: () => void
  unlike: () => void
}) {
  const [expandDetail, setExpandDetail] = useState(false)
  const [isDesc, setIsDesc] = useState(true)
  const { t } = useTranslation()
  const { account } = useContext(Context)
  const [searchChapter, setSearchChapter] = useState("")

  const subscribeHandler = (isSub: boolean) => {
    if (account?.verified && account?.name) {
      if (isSub) {
        subscribe()
      } else {
        unsubscribe()
      }
      setIsSubscribe(isSub)
    } else {
      ;(document.querySelector("#open-sign-in-btn") as any)?.click()
    }
  }

  if (typeof data == "undefined") {
    return <></>
  }

  if (!data) {
    return <div>Không có dữ liệu</div>
  }

  const selectedLanguage =
    data.languages.find((l) => l.shortLang == language) || data.languages.find((l) => l.isMainLanguage)
  return (
    <div
      className={`${
        expandDetail ? " z-10" : "z-[1] delay-500 transition-all"
      } absolute top-0 bottom-0 left-0 right-0 flex justify-end`}>
      <div
        className={`relative flex-auto h-full duration-500 transition-all bg-white ${
          expandDetail ? "pk-width__ml-opposite opacity-1 z-10" : "z-0 opacity-0 w-2/3"
        }`}>
        <div
          onClick={() => setExpandDetail(false)}
          className="absolute bg-green-600 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <ArrowRightIcon className="w-9 h-9 text-white" />
        </div>
      </div>
      <div
        className={`relative flex-auto bg-light-gray h-full overflow-auto duration-500 transition-all ${
          expandDetail ? "pk-width__ml" : "w-1/3"
        }`}>
        <Image
          src={mockBanner}
          className={`${expandDetail ? "h-[280px]" : "h-[160px]"} duration-500 transition-all object-cover w-full`}
          alt=""
        />
        <div className="px-[60px] flex flex-col gap-[10px]">
          <div className={`${expandDetail ? " mt-[-180px]" : " mt-[-44px]"} duration-500 transition-all flex gap-5`}>
            <Image
              src={mockAvar}
              className={`${
                expandDetail ? " w-[240px] h-[320px]" : " w-[120px] h-[160px]"
              } duration-500 transition-all object-cover rounded-[15px] overflow-hidden `}
              alt=""
            />
            <div className="flex-1 flex flex-col justify-end gap-[10px]">
              <p className="font-bold text-second-color text-2xl leading-6">
                {data[selectedLanguage.shortLang]?.title}
              </p>
              <p
                className={`${
                  expandDetail ? "opacity-100 h-6" : "opacity-0 h-0 mt-[-10px]"
                } font-semibold text-xl duration-500 transition-all text-second-color`}>
                Hanz
              </p>
              <p className="">
                {" "}
                <strong>{data.views}</strong> views • <strong>{data.likes}</strong> likes
              </p>
              <div
                className={`${
                  !expandDetail ? "opacity-100 h-[34px]" : "opacity-0 h-0  mt-[-10px]"
                } duration-500 transition-all flex gap-[10px]`}>
                {isSubscribe ? (
                  <FilledButton>
                    <div onClick={() => subscribeHandler(false)} className="h-5 flex items-center">
                      <BellAlertIcon className="w-6 h-6 mr-2 inline-block animate-[bell-ring_1s_ease-in-out]" />
                      Subscribed
                    </div>
                  </FilledButton>
                ) : (
                  <OutlineButton>
                    <div onClick={() => subscribeHandler(true)} className="h-5 flex items-center">
                      <BellAlertIconOutline className="w-6 h-6 mr-2 inline-block " />
                      Subscribe
                    </div>
                  </OutlineButton>
                )}
                <OutlineButton onClick={() => setExpandDetail(true)}>See Detail</OutlineButton>
              </div>
              <div
                className={`${
                  expandDetail ? "opacity-100 h-6" : "opacity-0 h-0  mt-[-10px]"
                } duration-500 transition-all flex gap-2 flex-wrap`}>
                <Tag>Low-Life</Tag>
                <Tag>Shonen 18+</Tag>
                <Tag>Hi-tech</Tag>
              </div>
            </div>
          </div>
          {!account && (
            <p className="italic text-subtle-dark ">
              <a className="text-second-color underline font-semibold">Sign in</a> to unlock special chapters!
            </p>
          )}
          <div
            className={`${
              !expandDetail ? "opacity-100 h-6" : "opacity-0 h-0  mt-[-10px]"
            } duration-500 transition-all flex-wrap gap-2 flex`}>
            <Tag>Low-Life</Tag>
            <Tag>Shonen 18+</Tag>
            <Tag>Hi-tech</Tag>
          </div>
          <p className={`line-clamp-3 min-h-[72px]`}>{data[selectedLanguage.shortLang]?.description}</p>
          <div className="flex gap-2 flex-wrap">
            {data.languages.map((language, index) => {
              return (
                <Tag
                  selected={selectedLanguage.id == language.id}
                  key={index}
                  onClick={() => setLanguage(language.shortLang)}>
                  {t(language.shortLang)}
                </Tag>
              )
            })}
          </div>
        </div>
        <div className="flex gap-1">
          <div className={`flex-auto ${expandDetail ? " w-1/2" : " w-full -mr-1"} duration-500 transition-all`}>
            <div className="w-full bg-medium-gray px-[60px] py-[16px] flex items-center justify-between mt-[13px]">
              <div className="flex gap-5 items-center whitespace-nowrap">
                <strong className="text-[16px]">{`${data.chapters.length} chapter${
                  data.chapters.length > 1 ? "s" : ""
                }`}</strong>
                <TextField
                  onChange={setSearchChapter}
                  value={searchChapter}
                  size="sm"
                  placeholder="Enter chapter number"
                  leadingComponent={<DocumentTextIcon className="w-[18px] h-[18px] text-medium-gray" />}
                />
              </div>
              <div>
                <ArrowsUpDownIcon onClick={() => setIsDesc(!isDesc)} className="cursor-pointer w-5 h-w-5 text-light-gray" />
              </div>
            </div>
            <div className="px-[60px] py-[20px] flex flex-col gap-5">
              {data.chapters
                .filter((chapter) => {
                  return searchChapter ? chapter?.number?.toString()?.includes(searchChapter) : true
                })
                .sort(() => (isDesc ? 1 : -1))
                .map((chapter, index) => (
                  <Chapter
                    expandDetail={expandDetail}
                    data={data}
                    chapter={chapter}
                    key={index}
                    account={account}
                    like={like}
                    unlike={unlike}
                  />
                ))}
            </div>
          </div>
          <div
            className={`flex-auto ${
              expandDetail ? " w-1/2 opacity-100" : "opacity-0 w-0"
            } duration-500 transition-all overflow-hidden whitespace-nowrap`}>
            <div className={`px-[60px] py-[16px] bg-medium-gray font-bold mt-[13px] leading-[30px] text-center `}>
              Hero Cyberpunk’s NFTs
            </div>
            <div className="flex justify-center p-10 opacity-10">
              <strong>Artist Composing</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Chapter = ({ expandDetail, data, chapter, account, like, unlike }) => {
  const [isLiked, setIsLiked] = useState(chapter.isLiked || false)
  const [likes, setLikes] = useState(chapter.likes || 0)
  const likeHandler = (isLike: boolean) => {
    if (account?.verified && account?.name) {
      if (isLike) {
        setLikes((like) => like + 1)
        like(chapter.id)
      } else {
        setLikes((like) => like - 1)
        unlike(chapter.id)
      }
      setIsLiked(isLike)
    } else {
      ;(document.querySelector("#open-sign-in-btn") as any)?.click()
    }
  }
  return (
    <>
      <div
        className={`w-full h-[1px] bg-light-medium-gray first:hidden transition-all duration-500 ${
          expandDetail ? "my-[0px] opacity-100" : "-my-[10px] opacity-0"
        }`}></div>
      <Link href={`/comic/${data.id}/chapter/${chapter.number}`} className="flex gap-4">
        <Image
          src={chapter.thumbnail || m6}
          alt=""
          className={`transition-all duration-500 object-cover rounded-xl ${
            expandDetail ? "w-[120px] h-[120px]" : "w-[60px] h-[60px]"
          }`}
          width={60}
          height={60}
        />
        <div className="flex flex-col justify-center flex-1">
          <div>
            <div className="flex items-center gap-5">
              <p>{`Chapter ${chapter.number}`}</p>
              {(function () {
                switch (chapter.type) {
                  case "Free":
                    return (
                      <StatusLabel status="success">
                        <>Free</>
                      </StatusLabel>
                    )
                  default:
                    return <div></div>
                }
              })()}
            </div>
            <div className="font-[600]">{chapter.name}</div>
          </div>
          <div
            className={`flex justify-between items-end transition-all w-full duration-500 ${
              expandDetail ? "h-full opacity-100  max-h-[100px]" : "h-[0%] max-h-0 opacity-0"
            }`}>
            <div className="text-sm flex gap-10">
              <div className="mr-3">{moment(chapter.date).format("DD/MM/yyyy")}</div>
              <div className="flex gap-2">
                <EyeIcon className="w-5 h-5 text-gray-600" />
                <span>{chapter.views}</span>
              </div>
            </div>
            <div className="flex items-center">
              <FlashAnimation
                InactiveComponent={(props: any) => (
                  <Image
                    className="cursor-pointer w-5 h-5"
                    onClick={() => likeHandler(true)}
                    src={HeartOutlineIcon}
                    alt=""
                    {...props}
                  />
                )}
                ActiveComponent={(props: any) => (
                  <Image
                    className="cursor-pointer w-5 h-5"
                    onClick={() => likeHandler(false)}
                    src={HeartFillIcon}
                    alt=""
                    {...props}
                  />
                )}
                active={isLiked}
              />
              <span className="ml-2">{likes}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
