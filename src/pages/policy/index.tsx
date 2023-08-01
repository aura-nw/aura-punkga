import DummyComic from 'components/DummyComponent/comic'
import Header from 'components/Header'
import Comic from 'components/pages/homepage/comic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { search } from 'src/services'

export default function Policy() {
  const r = useRouter()
  const params = useSearchParams()
  const keyword = params.get('keyword')
  const { t } = useTranslation()
  const searchComic = useApi<any[]>(async () => await search(keyword), !!keyword, [keyword])
  return (
    <>
      <Header />
      <h1 className='h1'>Privacy Policy</h1>
      <p>Last updated: April 06, 2023</p>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
