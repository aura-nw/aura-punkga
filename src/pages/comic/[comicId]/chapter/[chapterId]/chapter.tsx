import Header from "components/Header"
import ChapterDetail from "components/pages/chapter/chapterDetail"
import CommentSection from "components/pages/chapter/commentSection"
import ReadingSection from "components/pages/chapter/readingSection"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { useState } from "react"

const Chapter: React.FC = ({ data, onUpdate, styles, classes }: any) => {
  const [tab, setTab] = useState("detail")
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-80px)] relative">
        <div className="flex-auto w-2/3 h-full z-[5]">
          <ReadingSection setTab={setTab} tab={tab} />
        </div>
        <div className="flex-auto w-1/3 h-full">{tab == "detail" ? <ChapterDetail /> : <CommentSection />}</div>
      </div>
    </>
  )
}
export default Chapter
