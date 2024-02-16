import axios from 'axios'
import getConfig from 'next/config'
import { COMIC_STATUS, LANGUAGE } from 'src/constants'
import { IComic } from 'src/models/comic'
import { privateAxios } from 'src/context'
import { formatStatus } from 'src/utils'
import { getItem } from 'src/utils/localStorage'

export const getLatestComic = async (): Promise<IComic[]> => {
  return await axios.get(`${getConfig().API_URL}/api/rest/public/latest`).then((res) =>
    res.data?.manga?.map((m: any) => {
      const response = {
        id: m.id,
        slug: m.slug,
        image: m.poster,
        status: {
          type: COMIC_STATUS[formatStatus(m.status)],
          text: formatStatus(m.status),
        },
        authors: m.manga_creators?.map((c: any) => ({
          id: c.creator?.isActive ? c.creator?.id : undefined,
          slug: c.creator?.isActive ? c.creator?.slug : undefined,
          name: c.creator?.isActive ? c.creator?.pen_name || c.creator?.name : 'Unknown creator',
        })),
        views: m.manga_total_views?.views || 0,
        likes: m.manga_total_likes?.likes || 0,
        latestChap: {
          number: m.chapters?.[0]?.chapter_number,
          id: m.chapters?.[0]?.id,
        },
        tags: m.manga_tags.map(({ tag }: any) => {
          const r = {}
          LANGUAGE.forEach((l) => {
            const tagLanguage = tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages[0]
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
  )
}

export const getTrendingComic = async (): Promise<IComic[]> => {
  return await axios.get(`${getConfig().API_URL}/api/rest/public/trending`).then((res) =>
    res.data?.manga?.map((m: any) => {
      const response = {
        id: m.id,
        slug: m.slug,
        image: m.poster,
        status: {
          type: COMIC_STATUS[formatStatus(m.status)],
          text: formatStatus(m.status),
        },
        authors: m.manga_creators?.map((c: any) => ({
          id: c.creator?.isActive ? c.creator?.id : undefined,
          slug: c.creator?.isActive ? c.creator?.slug : undefined,
          name: c.creator?.isActive ? c.creator?.pen_name || c.creator?.name : 'Unknown creator',
        })),
        views: m.manga_total_views?.views || 0,
        likes: m.manga_total_likes?.likes || 0,
        latestChap: {
          number: m.chapters?.[0]?.chapter_number,
          id: m.chapters?.[0]?.id,
        },
        tags: m.manga_tags.map(({ tag }: any) => {
          const r = {}
          LANGUAGE.forEach((l) => {
            const tagLanguage = tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages[0]
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
  )
}

export const replyComment = async (content: string, ref: string, chapterId: string) => {
  const { data } = await privateAxios.post(`${getConfig().API_URL}/api/rest/user/chapters/${chapterId}/comments`, {
    content: content,
    ref_activity: ref,
  })
  return data
}

export const setAddress = async (address: string) => {
  const { data } = await privateAxios.post(`${getConfig().API_URL}/api/rest/user/address`, {
    wallet_address: address,
  })
  return data
}

export const getProfile = async () => {
  const res: any = await privateAxios.get(`${getConfig().API_URL}/api/rest/user/profile`)
  const rank: any = await privateAxios.get(`${getConfig().API_URL}/api/rest/user/rank`)
  if (res) {
    return {
      ...res?.data?.authorizer_users?.[0],
      rank: rank?.data?.user_xp_rank?.[0]?.rank || 99999,
    }
  }
}

export const getAllTags = async () => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/tags`)
  return data?.tags?.map((tag: any) => {
    const r = {}
    LANGUAGE.forEach((l) => {
      const tagLanguage =
        tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages.find((tl) => tl.language_id == 1)
      r[l.shortLang] = tagLanguage.value
    })
    return r
  })
}

export const search = async (content: string) => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/search_manga`, {
    params: {
      text: `%${content}%`,
    },
  })
  return data?.manga?.map((m: any) => {
    const response = {
      id: m.id,
      slug: m.slug,
      image: m.poster,
      status: {
        type: COMIC_STATUS[formatStatus(m.status)],
        text: formatStatus(m.status),
      },
      authors: m.manga_creators?.map((c: any) => ({
        id: c.creator?.isActive ? c.creator?.id : undefined,
        slug: c.creator?.isActive ? c.creator?.slug : undefined,
        name: c.creator?.isActive ? c.creator?.pen_name || c.creator?.name : 'Unknown creator',
      })),
      views: m.manga_total_views?.views || 0,
      likes: m.manga_total_likes?.likes || 0,
      latestChap: {
        number: m.chapters?.[0]?.chapter_number,
        id: m.chapters?.[0]?.id,
      },
      tags: m.manga_tags.map(({ tag }: any) => {
        const r = {}
        LANGUAGE.forEach((l) => {
          const tagLanguage = tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages[0]
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
export const getComicDetail = async (comicSlug: string, accountId: string) => {
  const d: any = await axios.get(`${getConfig().REST_API_URL}/manga/${comicSlug}`, {
    params: {
      user_id: accountId,
    },
  })
  const data = d?.data?.data?.manga[0]
  const hasAccess = await getAccess(data.id)
  const env = getConfig().CHAIN_ID.includes('xstaxy') ? 'xstaxy' : 'euphoria'
  const collections = []
  let collectionsData = []
  data?.contract_addresses?.forEach((address) => (collections.includes(address) ? null : collections.push(address)))
  if (collections.length) {
    const { data } = await axios.post(`${getConfig().CHAIN_INFO.indexerV2}`, {
      query: `query QueryCw721Tokens($contract_addresses: [String!]) {
                    ${env} {
                      smart_contract(where: {address: {_in: $contract_addresses}}) {
                        cw721_contract {
                          name
                          smart_contract{
                            address
                          }
                          cw721_tokens(where: {burned: {_eq: false}}) {
                            token_id
                            name: media_info(path: "onchain.metadata.name")
                            image_url: media_info(path: "offchain.image.url")
                            content_type: media_info(path: "offchain.image.content_type")
                          }
                        }
                      }
                    }
                  }`,
      variables: {
        contract_addresses: collections,
      },
      operationName: 'QueryCw721Tokens',
    })
    collectionsData = data.data[env].smart_contract.map(({ cw721_contract }) => ({
      name: cw721_contract.name,
      address: cw721_contract.smart_contract.address,
      tokens: cw721_contract.cw721_tokens.slice(0, 10).map((token) => ({
        image: token.image_url,
        name: token.name,
        id: token.token_id,
      })),
    }))
  }
  const res = {
    id: data.id,
    slug: data.slug,
    languages: data.manga_languages.map((ml) => ({
      ...LANGUAGE.find((l) => l.id == ml.language_id),
      isMainLanguage: ml.is_main_language,
    })),
    hasAccess: hasAccess,
    chapters: data.chapters.map((chapter) => ({
      id: chapter.id,
      name: chapter.chapter_name,
      number: chapter.chapter_number,
      type: chapter.chapter_type,
      status: formatStatus(chapter.status),
      thumbnail: chapter.thumbnail_url,
      date: chapter.pushlish_date,
      likes: chapter.chapter_total_likes?.likes || 0,
      views: chapter.views || 0,
      isLiked: !!chapter.chapters_likes?.length,
    })),
    status: {
      type: COMIC_STATUS[formatStatus(data.status)],
      text: formatStatus(data.status),
    },
    views: data.manga_total_views?.views || 0,
    likes: data.manga_total_likes?.likes || 0,
    isSubscribe: !!data.manga_subscribers.length,
    image: data.poster,
    cover: data.banner,
    tags: data.manga_tags.map(({ tag }: any) => {
      const r = {}
      LANGUAGE.forEach((l) => {
        const tagLanguage = tag.tag_languages.find((tl) => tl.language_id == l.id) || tag.tag_languages[0]
        r[l.shortLang] = tagLanguage.value
      })
      return r
    }),
    authors: data.manga_creators?.map((c: any) => ({
      id: c.creator?.isActive ? c.creator?.id : undefined,
      slug: c.creator?.isActive ? c.creator?.slug : undefined,
      name: c.creator?.isActive ? c.creator?.pen_name || c.creator?.name : 'Unknown creator',
    })),
    releaseDate: data.release_date,
    collections: collectionsData,
  }

  LANGUAGE.forEach((l) => {
    const mangaLanguages =
      data.manga_languages.find((ml) => ml.language_id == l.id) ||
      data.manga_languages.find((ml) => ml.is_main_language)
    res[l.shortLang] = {
      title: mangaLanguages?.title,
      description: mangaLanguages?.description,
    }
  })
  return res
}
export const getAccess = async (id: number) => {
  try {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/manga/${id}/get-access`)
    return data?.nft
  } catch (error) {
    // console.log(error)
    return false
  }
}
export const getUserData = async (id: string) => {
  try {
    const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/users/${id}`)
    return data?.authorizer_users?.[0]
  } catch (error) {
    // console.log(error)
    return false
  }
}
export const postSubscribeEmail = async (email: string) => {
  try {
    const { data } = await axios.post(`${getConfig().API_URL}/api/rest/public/subscribe`, {
      email,
    })
    return data
  } catch (error) {
    // console.log(error)
    return false
  }
}

export const subscribe = async (id) => {
  await privateAxios.post(`${getConfig().API_URL}/api/rest/user/manga/${id}/subscribe`)
}
export const unsubscribe = async (id) => {
  await privateAxios.delete(`${getConfig().API_URL}/api/rest/user/manga/${id}/subscribe`)
}
export const getCampaigns = async (accountId?: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign`, {
    params: {
      user_id: accountId,
    },
  })
  return data
}
export const getQuestDetail = async (questId: string, accountId?: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/quest/${questId}`, {
    params: {
      user_id: accountId,
    },
  })
  return data
}
export const claimQuest = async (questId: string) => {
  const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/quest/${questId}/claim`)
  return data
}
export const readChapter = async (chapterId: string) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/user/read-chapter/${chapterId}`)
    return data
  } catch (error) {
    return undefined
  }
}
export const getAvailableQuests = async () => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/user/available-quests`)
  return data
}
export const getLeaderboard = async () => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/pubic/leaderboard`)
  return data
}
export const getUserNfts = async (address: string) => {
  const env = getConfig().CHAIN_ID.includes('xstaxy') ? 'xstaxy' : 'euphoria'
  const { data } = await axios.post(`${getConfig().CHAIN_INFO.indexerV2}`, {
    query: `query Query721ByOwner($owner_address: String!) {
  ${env} {
    cw721_token(where: {owner: {_eq: $owner_address}}, order_by: {created_at: desc}) {
      id
      token_id
      name: media_info(path: "onchain.metadata.name")
      image_url: media_info(path: "offchain.image.url")
      cw721_contract {
        smart_contract {
          address
        }
      }
    }
  }
}`,
    variables: {
      owner_address: address,
    },
    operationName: 'Query721ByOwner',
  })
  return data?.data?.[env]?.cw721_token || []
}
export const getCampaignDetail = async (slug: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign/${slug}`)
  return data
}
export const getUserRankInCampaign = async (id: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign/${id}/user-rank`)
  return data
}
export const getCampaignAuthorizedData = async (slug: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign/${slug}/authorized`)
  const campaignData = data.data.campaign[0]
  const quests = data.data.campaign[0].campaign_quests
  campaignData.campaign_quests = campaignData.campaign_quests?.map((quest) => {
    if (quest.condition?.quest_id) {
      const mappedQuest = quest
      mappedQuest.condition = {
        ...quest.condition,
        requiredQuest: quests.find((q) => q.id == quest.condition.quest_id),
      }
      return mappedQuest
    } else {
      return quest
    }
  })
  return campaignData
}
export const enrollCampaign = async (id: string) => {
  const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/campaign/${id}/enroll`)
  return data
}
export const claimCampaignReward = async (id: string) => {
  const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/campaign/${id}/claim`)
  return data
}
export const getRequestLog = async (id: string) => {
  const { data } = await axios.get(`${getConfig().REST_API_URL}/request-log`, {
    params: {
      request_id: id,
    },
  })
  return data
}
export const answerQuest = async (questId: string, answer: string) => {
  const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/quest/${questId}/answer`, {
    answer,
  })
  return data
}
export const getCampaignLeaderboard = async (campaignId: string) => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/campaign/${campaignId}/leaderboard`)
  return data
}
