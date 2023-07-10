import DummyComicDetail from "components/DummyComponent/comicDetail"
import Header from "components/Header"
import ComicDetail from "components/pages/chapter/comicDetail"
import CommentSection from "components/pages/chapter/commentSection"
import ReadingSection from "components/pages/chapter/readingSection"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { LanguageType } from "src/constants/global.types"
import { IChapter } from "src/models/chapter"
import { IComicDetail } from "src/models/comic"
import { IComment } from "src/models/comment"

const Chapter: React.FC = ({
  comicDetails,
  chapterDetails,
  chapterComments,
  postComment,
}: {
  comicDetails: {
    data: IComicDetail
    loading: boolean
  }
  chapterDetails: {
    data: IChapter
    loading: boolean
  }
  chapterComments: {
    data: IComment[]
    loading: boolean
    callApi: (skipLoading: boolean) => void
  }
  postComment: (content: string) => void
}) => {
  const [tab, setTab] = useState("detail")
  const { locale } = useRouter()
  const [language, setLanguage] = useState<LanguageType>(locale as LanguageType)
  const commentIntervalId = useRef<any>()

  useEffect(() => {
    setLanguage(locale as LanguageType)
  }, [locale])

  useEffect(() => {
    if (tab == "comment") {
      commentIntervalId.current = setInterval(() => chapterComments.callApi(true), 5000)
    } else {
      if (commentIntervalId.current) clearInterval(commentIntervalId.current)
    }
    return () => clearInterval(commentIntervalId.current)
  }, [tab])

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-80px)] relative">
        <div className="flex-auto w-2/3 h-full z-[5]">
          {!chapterDetails || chapterDetails.loading ? (
            <div className="w-full h-full pt-5">
              <div className="w-[70%] mx-auto mb-[60px] h-full bg-light-medium-gray animate-pulse"></div>
            </div>
          ) : (
            <ReadingSection
              data={comicDetails.data}
              chapterData={chapterDetails.data}
              setTab={setTab}
              tab={tab}
              language={language}
            />
          )}
        </div>
        <div className="flex-auto w-1/3 h-full">
          {tab == "detail" ? (
            !comicDetails || comicDetails.loading ? (
              <DummyComicDetail />
            ) : (
              <ComicDetail data={comicDetails.data} language={language} setLanguage={setLanguage} />
            )
          ) : !chapterDetails ? (
            <></>
          ) : (
            <CommentSection
              reload={() => chapterComments.callApi(true)}
              postComment={postComment}
              comments={chapterComments.data}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default Chapter
