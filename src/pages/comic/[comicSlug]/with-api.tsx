import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Context, privateAxios } from 'src/context'
import useApi from 'src/hooks/useApi'
import { IComicDetail } from 'src/models/comic'
import { getComicDetail } from 'src/services'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { account } = useContext(Context)
  const { query } = useRouter()
  const config = getConfig()
  const subscribe = async () => {
    await privateAxios.post(`${config.API_URL}/api/rest/user/manga/${query.comicSlug}/subscribe`)
  }
  const unsubscribe = async () => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/manga/${query.comicSlug}/subscribe`)
  }

  const like = async (id) => {
    await privateAxios.post(`${config.API_URL}/api/rest/user/chapters/${id}/likes`)
  }
  const unlike = async (id) => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/chapters/${id}/likes`)
  }

  const comicDetails = useApi<IComicDetail>(
    async () => await getComicDetail(query.comicSlug as string, account?.id),
    !!query.comicSlug,
    [query.comicSlug, account?.id]
  )
  return (
    <Component
      {...props}
      comicDetails={comicDetails}
      subscribe={subscribe}
      unsubscribe={unsubscribe}
      like={like}
      unlike={unlike}
    />
  )
}

export default withApi
