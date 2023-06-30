import DummyComicDetail from "components/DummyComponent/comicDetail"
import Header from "components/Header"
import ComicDetail from "components/pages/chapter/comicDetail"
import CommentSection from "components/pages/chapter/commentSection"
import ReadingSection from "components/pages/chapter/readingSection"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { LanguageType } from "src/constants/global.types"
import { IChapter } from "src/models/chapter"
import { IComicDetail } from "src/models/comic"

const Chapter: React.FC = ({
  data,
  loading,
  chapterData,
  chapterLoading,
}: {
  data: IComicDetail
  loading: boolean
  chapterData: IChapter
  chapterLoading: boolean
}) => {
  const [tab, setTab] = useState("detail")
  const { locale } = useRouter()
  const [language, setLanguage] = useState<LanguageType>(locale as LanguageType)
  useEffect(() => {
    setLanguage(locale as LanguageType)
  }, [locale])
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-80px)] relative">
        <div className="flex-auto w-2/3 h-full z-[5]">
          {chapterLoading ? (
            <div className="w-full h-full pt-5">
              <div className="w-[70%] mx-auto mb-[60px] h-full bg-light-medium-gray animate-pulse"></div>
            </div>
          ) : (
            <ReadingSection data={data} chapterData={chapterData} setTab={setTab} tab={tab} language={language} />
          )}
        </div>
        <div className="flex-auto w-1/3 h-full">
          {tab == "detail" ? (
            loading ? (
              <DummyComicDetail />
            ) : (
                <ComicDetail data={data} language={language} setLanguage={setLanguage} />
            )
          ) : (
            <CommentSection />
          )}
        </div>
      </div>
    </>
  )
}
export default Chapter
