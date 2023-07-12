import { useAuthorizer } from "@authorizerdev/authorizer-react"
import { useRouter } from "next/router"
import { useContext } from "react"
import { COMIC_STATUS, LANGUAGE } from "src/constants"
import { Context } from "src/context"
import useApi from "src/hooks/useApi"
import { IComic } from "src/models/comic"
import api from "src/services/axiosInterceptor"
import { getItem } from "src/utils/localStorage"
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { query } = useRouter()
  const { account } = useContext(Context)
  const { authorizerRef } = useAuthorizer()
  const getProfile = async () => {
    const token = getItem("token")
    const res = await authorizerRef.getProfile({
      Authorization: `Bearer ${token}`,
    })
    if (res) {
      return res
    }
  }
  const getSubscribeList = async () => {
    const res: any = await api.get(`api/rest/public/profiles/${account?.id}/subscribe`)
    return res.data?.subscribers?.map(({ subscribers_manga: m }: any) => {
      const response = {
        id: m.id,
        image: m.banner,
        status: {
          type: COMIC_STATUS[m.status],
          text: m.status,
        },
        authors: m.manga_creators?.map((c: any) => c.creator?.name),
        views: m.chapters_aggregate?.aggregate?.sum?.views || 0,
        likes: m.chapters_aggregate?.aggregate?.sum?.likes || 0,
        latestChap: {
          number: m.chapters?.[0]?.chapter_number,
          id: m.chapters?.[0]?.id,
          pushlishDate: m.chapters?.[0]?.pushlish_date,
        },
        tags: m.manga_tags.map(({ tag }: any) => {
          const r = {}
          tag.tag_languages.forEach((tl: any) => {
            r[LANGUAGE.find((l) => l.id == tl.language_id).shortLang] = tl.value
          })
          return r
        }),
      }
      LANGUAGE.forEach((language) => {
        const l =
          m.manga_languages.find((ml) => ml.language_id == language.id) ||
          m.manga_languages.find((ml) => ml.is_main_language)
        response[language.shortLang] = {
          title: l ? l?.title : "Unknown title",
          description: l ? l?.description : "Unknown description",
        }
      })
      return response
    })
  }

  const subscribe = async (comicId) => {
    await api.post(`/api/rest/user/manga/${comicId}/subscribe`)
  }
  const unsubscribe = async (comicId) => {
    await api.delete(`/api/rest/user/manga/${comicId}/subscribe`)
  }

  const profile = useApi<any>(getProfile, !!account, [account])
  const subscribeList = useApi<IComic[]>(getSubscribeList, !!account?.id, [account?.id])
  return (
    <Component
      {...props}
      profile={profile}
      subscribeList={subscribeList}
      unsubscribe={unsubscribe}
      subscribe={subscribe}
    />
  )
}

export default withApi
