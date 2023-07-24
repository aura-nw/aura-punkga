import Header from "components/Header"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import Ninja from "images/ninja.svg"
import FilledButton from "components/Button/FilledButton"
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"
import useApi from "src/hooks/useApi"
import { search } from "src/services"
import { Fragment } from "react"
import NoImage from "images/no_img.png"
import DummyComic from "components/DummyComponent/comic"
import Comic from "components/pages/homepage/comic"

export default function Search() {
  const r = useRouter()
  const params = useSearchParams()
  const keyword = params.get("keyword")
  const router = useRouter()
  const searchComic = useApi<any[]>(async () => await search(keyword), !!keyword, [keyword])
  return (
    <>
      <Header />
      <div className='pk-container px-2 md:px-0'>
        <p className='md:text-2xl font-extrabold leading-6 mt-2 md:mt-10'>{`${searchComic.data?.length} results for "${keyword}"`}</p>
        <div className='mt-2 md:mt-10 grid grid-cols-3 gap-10'>
          {searchComic.loading
            ? Array.apply(null, Array(6)).map((d, index) => {
                return <DummyComic key={index} />
              })
            : searchComic.data?.map((data, index) => {
                return <Comic key={index} {...data} />
              })}
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
