import DummyComic from 'components/DummyComponent/comic'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Comic from 'components/pages/homepage/comic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { search } from 'src/services'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Search />
}
function Search() {
  const r = useRouter()
  const params = useSearchParams()
  const keyword = params.get('keyword')
  const { t } = useTranslation()
  const searchComic = useApi<any[]>(async () => await search(keyword), !!keyword, [keyword])
  return (
    <>
      <Header />
      <div className='pk-container px-5 md:px-0'>
        <p className='md:text-2xl font-extrabold leading-6 mt-2 md:mt-10'>{`${searchComic.data?.length} ${t(
          'results for'
        )} "${keyword}"`}</p>
        <div className='mt-2 md:mt-10 grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-y-20'>
          {searchComic.loading
            ? Array.apply(null, Array(6)).map((d, index) => {
                return <DummyComic key={index} />
              })
            : searchComic.data?.map((data, index) => {
                return <Comic key={index} {...data} />
              })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
