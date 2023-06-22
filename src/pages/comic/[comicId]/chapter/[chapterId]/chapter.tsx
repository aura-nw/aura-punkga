import ChapterDetail from "components/pages/chapter/chapterDetail"
import ReadingSection from "components/pages/chapter/readingSection"
import React from "react"

const Chapter: React.FC = ({ data, onUpdate, styles, classes }: any) => {
  return (
    <div className="flex h-[calc(100vh-80px)]">
      <div className="flex-auto w-2/3 h-full overflow-auto">
        <ReadingSection/>
      </div>
      <div className="flex-auto w-1/3 bg-light-gray h-full overflow-auto">
        <ChapterDetail/>
      </div>
    </div>
  )
}
export default Chapter
