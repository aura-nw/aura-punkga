import axios from "axios"
import getConfig from "next/config"
import { useContext } from "react"
import { COMIC_STATUS, LANGUAGE } from "src/constants"
import { Context, privateAxios } from 'src/context'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { formatStatus } from 'src/utils'
import { getItem } from 'src/utils/localStorage'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { account } = useContext(Context)
  const config = getConfig()
  const getProfile = async () => {
    const res: any = await privateAxios.get(`${config.API_URL}/api/rest/user/profile`)
    if (res) {
      return {
        id: res.data.authorizer_users[0].id,
        email: res.data.authorizer_users[0].email,
        gender: res.data.authorizer_users[0].gender,
        nickname: res.data.authorizer_users[0].nickname,
        picture: res.data.authorizer_users[0].picture,
        birthdate: res.data.authorizer_users[0].birthdate,
        bio: res.data.authorizer_users[0].bio,
        signup_methods: res.data.authorizer_users[0].signup_methods,
      }
    }
  }
  const getSubscribeList = async () => {
    const res: any = await axios.get(`${config.API_URL}/api/rest/public/profiles/${account?.id}/subscribe`)
    return res.data?.subscribers?.map(({ subscribers_manga: m }: any) => {
      const response = {
        id: m.id,
        image: m.poster,
        status: {
          type: COMIC_STATUS[formatStatus(m.status)],
          text: formatStatus(m.status),
        },
        authors: m.manga_creators?.map((c: any) => (c.creator?.isActive ? c.creator?.name : 'Unknown creator')),
        views: m.chapters_aggregate?.aggregate?.sum?.views || 0,
        likes: m.chapters_aggregate?.aggregate?.sum?.likes || 0,
        latestChap: {
          number: m.chapters?.[0]?.chapter_number,
          id: m.chapters?.[0]?.id,
          pushlishDate: m.chapters?.[0]?.pushlish_date,
        },
        tags: m.manga_tags.map(({ tag }: any) => {
          const r = {}
          LANGUAGE.forEach((l) => {
            const mainLanguagesId = m.manga_languages.find((ml) => ml.is_main_language).language_id
            const tagLanguage =
              tag.tag_languages.find((tl) => tl.language_id == l.id) ||
              tag.tag_languages.find((tl) => tl.language_id == mainLanguagesId)
            r[l.shortLang] = tagLanguage.value
          })
          return r
        }),
      }
      LANGUAGE.forEach((language) => {
        const l =
          m.manga_languages.find((ml) => ml.language_id == language.id) ||
          m.manga_languages.find((ml) => ml.is_main_language)
        response[language.shortLang] = {
          title: l ? l?.title : 'Unknown title',
          description: l ? l?.description : 'Unknown description',
        }
      })
      return response
    })
  }
  const getCurentlyReading = async () => {
    const ids = getItem('current_reading_manga')
    if (ids?.length) {
      const res: any = await axios.post(`${config.API_URL}/v1/graphql`, {
        query: `query GetListMangaById ($id: [Int!]=${ids}) {
  manga(where: {_and:{id:{_in:$id},status:{_neq:"Removed"}}}) {
    id
    banner
    poster
    status
    manga_languages {
      is_main_language
      language_id
      title
    }
    manga_creators {
      creator {
        id
        name
        isActive
      }
    }
    chapters(order_by: {pushlish_date:desc_nulls_last}, limit: 1, where: {status:{_eq:"Published"}}) {
      chapter_number
      id
      pushlish_date
    }
    chapters_aggregate {
      aggregate {
        sum {
          likes
          views
        }
      }
    }
    manga_tags(limit: 5) {
      tag {
        id
        tag_languages {
          language_id
          value
        }
      }
    }
  }
}`,
        variables: null,
        operationName: 'GetListMangaById',
      })
      return res.data.data?.manga?.map((m) => {
        const response = {
          id: m.id,
          image: m.poster,
          status: {
            type: COMIC_STATUS[formatStatus(m.status)],
            text: formatStatus(m.status),
          },
          authors: m.manga_creators?.map((c: any) => (c.creator?.isActive ? c.creator?.name : 'Unknown creator')),
          views: m.chapters_aggregate?.aggregate?.sum?.views || 0,
          likes: m.chapters_aggregate?.aggregate?.sum?.likes || 0,
          latestChap: {
            number: m.chapters?.[0]?.chapter_number,
            id: m.chapters?.[0]?.id,
            pushlishDate: m.chapters?.[0]?.pushlish_date,
          },
          tags: m.manga_tags.map(({ tag }: any) => {
            const r = {}
            LANGUAGE.forEach((l) => {
              const mainLanguagesId = m.manga_languages.find((ml) => ml.is_main_language).language_id
              const tagLanguage =
                tag.tag_languages.find((tl) => tl.language_id == l.id) ||
                tag.tag_languages.find((tl) => tl.language_id == mainLanguagesId)
              r[l.shortLang] = tagLanguage.value
            })
            return r
          }),
        }
        LANGUAGE.forEach((language) => {
          const l =
            m.manga_languages.find((ml) => ml.language_id == language.id) ||
            m.manga_languages.find((ml) => ml.is_main_language)
          response[language.shortLang] = {
            title: l ? l?.title : 'Unknown title',
            description: l ? l?.description : 'Unknown description',
          }
        })
        return response
      })
    }
    return null
  }

  const subscribe = async (comicId) => {
    await privateAxios.post(`${config.API_URL}/api/rest/user/manga/${comicId}/subscribe`)
  }
  const unsubscribe = async (comicId) => {
    await privateAxios.delete(`${config.API_URL}/api/rest/user/manga/${comicId}/subscribe`)
  }

  const updateProfile = async (data) => {
    await privateAxios.put(`${config.REST_API_URL}/user/update-profile`, data)
  }

  const profile = useApi<any>(getProfile, !!account?.verified, [account?.verified])
  const subscribeList = useApi<IComic[]>(getSubscribeList, !!account?.id && !!account?.verified, [
    account?.id,
    account?.verified,
  ])
  const curentlyReading = useApi<IComic[]>(getCurentlyReading, !!account?.id && !!account?.verified, [
    account?.id,
    account?.verified,
  ])
  return (
    <Component
      {...props}
      profile={profile}
      subscribeList={subscribeList}
      curentlyReading={curentlyReading}
      unsubscribe={unsubscribe}
      subscribe={subscribe}
      updateProfile={updateProfile}
    />
  )
}

export default withApi
