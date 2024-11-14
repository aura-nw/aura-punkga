import axios from 'axios'
import getConfig from 'next/config'
import { COMIC_STATUS, LANGUAGE } from 'src/constants'
import { IComic } from 'src/models/comic'
import { privateAxios } from 'src/context'
import { formatStatus } from 'src/utils'
import { getItem } from 'src/utils/localStorage'
import { Campaign } from 'src/models/campaign'
import { Launchpad } from 'src/models/launchpad'
export const getEnvKey = () => (getConfig().CHAIN_ID.includes('6322') ? 'xstaxy' : 'euphoria')
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
        subscriptions: m.manga_subscribers_aggregate?.aggregate?.count || 0,
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
        subscriptions: m.manga_subscribers_aggregate?.aggregate?.count || 0,
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
export const getTeleQrCode = async () => {
  const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/telegram/gen-telegram-qr`)
  return data
}

export const getProfile = async () => {
  const res: any = await privateAxios.get(`${getConfig().API_URL}/api/rest/user/profile`)
  const rank: any = await privateAxios.get(`${getConfig().API_URL}/api/rest/user/rank`)
  if (res) {
    return {
      ...res?.data?.authorizer_users?.[0],
      rank: rank?.data?.user_xp_rank?.[0]?.rank || 99999,
      user_quests: res?.data?.authorizer_users?.[0]?.user_quests?.map((userQuest: any) => {
        const quest = userQuest.quest
        LANGUAGE.forEach((l) => {
          const questLanguages =
            quest.quests_i18n.find((ml) => ml.i18n_language.id == l.id) ||
            quest.quests_i18n.find((ml) => ml.i18n_language.is_main)
          quest[l.shortLang] = questLanguages?.data
        })
        return {
          ...userQuest,
        }
      }),
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
      subscriptions: m.manga_subscribers_aggregate?.aggregate?.count || 0,
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

  const collectionsData = data?.manga_collections?.map((collection) => {
    const name = {}
    LANGUAGE.forEach((l) => {
      const launchpadLanguage =
        collection.manga_collection.launchpad_i18ns.find((tl) => tl.language_id == l.id) ||
        collection.manga_collection.launchpad_i18ns[0]
      name[l.shortLang] = launchpadLanguage.data
    })
    return {
      name: name,
      slug: collection?.manga_collection?.slug,
      images: collection?.manga_collection?.featured_images,
    }
  })
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
    subscriptions: data.manga_subscribers_aggregate?.aggregate?.count || 0,
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
  try {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign`, {
      params: {
        user_id: accountId,
      },
    })
    const campaigns = data.data.campaign
    const res = {
      data: {
        campaign: campaigns.map((cam: any) => {
          const c = cam
          LANGUAGE.forEach((l) => {
            const campaignLanguages =
              cam.campaign_i18n.find((ml) => ml.i18n_language.id == l.id) ||
              cam.campaign_i18n.find((ml) => ml.i18n_language.is_main)
            c[l.shortLang] = campaignLanguages.data
          })
          return c
        }),
      },
    }
    return res
  } catch (error) {
    console.log(error)
  }
}
export const getQuestDetail = async (questId: string, accountId?: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/quest/${questId}`, {
    params: {
      user_id: accountId,
    },
  })
  return data
}
export const claimQuest = async (questId: string, token: string) => {
  const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/quest/${questId}/claim`, {
    token
  })
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
  const res = data.map((quest: any) => {
    const q = quest
    LANGUAGE.forEach((l) => {
      const questLanguages =
        quest.quests_i18n.find((ml) => ml.i18n_language.id == l.id) ||
        quest.quests_i18n.find((ml) => ml.i18n_language.is_main)
      q[l.shortLang] = questLanguages?.data || {
        name: quest?.name,
        description: quest?.description,
      }
    })
    q.pointText = q.quests_campaign?.campaign_chain?.punkga_config?.reward_point_name || 'XP'
    return q
  })
  return res
}
export const getLeaderboard = async () => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/pubic/leaderboard`)
  return data
}
export const getUserNfts = async (address: string) => {
  const { data } = await axios.post(`${getConfig().CHAIN_INFO.indexerV2}`, {
    query: `query queryAssetERC721(
      $contract_address: String
      $limit: Int = 10
      $tokenId: String = null
      $owner: String = null
      $offset: Int = 0
    ) {
      ${getEnvKey()} {
        cw721_token: erc721_token(
          limit: $limit
          offset: $offset
          where: {
            erc721_contract: {
              evm_smart_contract: { address: { _eq: $contract_address } }
            }
            token_id: { _eq: $tokenId }
            owner: { _eq: $owner }
          }
          order_by: [{ last_updated_height: desc }, { id: desc }]
        ) {
          id
          token_id
          owner
          media_info
          last_updated_height
          created_at
          cw721_contract: erc721_contract {
            name
            symbol
            smart_contract: evm_smart_contract {
              address
            }
          }
        }
      }
    }`,
    variables: {
      owner: address.toLowerCase(),
      contract_address: null,
      offset: 0,
      limit: 100,
    },
    operationName: 'queryAssetERC721',
  })
  return data?.data?.[getEnvKey()]?.cw721_token || []
}
export const getCampaignDetail = async (slug: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign/${slug}`)
  const campaigns = data.data.campaign
  const res = {
    data: {
      campaign: campaigns.map((cam: any) => {
        const c = cam
        LANGUAGE.forEach((l) => {
          const campaignLanguages =
            cam.campaign_i18n.find((ml) => ml.i18n_language.id == l.id) ||
            cam.campaign_i18n.find((ml) => ml.i18n_language.is_main)
          c[l.shortLang] = campaignLanguages.data
        })
        return c
      }),
    },
  }
  return res
}
export const getUserRankInCampaign = async (id: string) => {
  const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign/${id}/user-rank`)
  return data
}
export const getCampaignAuthorizedData = async (slug: string) => {
  try {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/campaign/${slug}/authorized`)
    const campaignData = data.data.campaign[0]
    const quests = campaignData.campaign_quests?.map((quest: any) => {
      const q = quest
      LANGUAGE.forEach((l) => {
        const questLanguages =
          quest.quests_i18n.find((ml) => ml.i18n_language.id == l.id) ||
          quest.quests_i18n.find((ml) => ml.i18n_language.is_main)
        q[l.shortLang] = questLanguages?.data || {
          name: quest.name,
          description: quest.description,
        }
      })
      q.pointText = campaignData?.campaign_chain?.punkga_config?.reward_point_name || 'XP'
      return q
    })
    campaignData.campaignQuests = quests?.map((quest) => {
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
    return campaignData as Campaign
  } catch (error) {
    console.error(error)
  }
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
export const getBalances = async (address: string) => {
  const { data } = await axios.post(`${getConfig().CHAIN_INFO.indexerV2}`, {
    query: `query getBalance($address: String!, $denom: String) {
      ${getEnvKey()} {
        account_balance(
          where: {account: {address: {_eq: $address}}, denom: {_eq: $denom}}
        ) {
          amount
          denom
        }
      }
    }`,
    variables: {
      address: address,
      denom: getEnvKey() == 'euphoria' ? 'ueaura' : 'uaura',
    },
    operationName: 'getBalance',
  })
  return data?.data?.[getEnvKey()]?.account_balance?.[0]?.amount
}
export const linkWallet = async (message: any, signature: any) => {
  try {
    const res = await privateAxios.post(`${getConfig().REST_API_URL}/user/connect`, {
      message,
      signature,
    })
    return res
  } catch (error: any) {
    return error
  }
}

export const getAllLaunchPad = async (offset: number, limit: number) => {
  try {
    const { data } = await axios.get(
      `${getConfig().REST_API_URL}/launchpad?status=PUBLISHED&offset=${offset}&limit=${limit}`
    )
    const launchpadData = data.data.launchpad
    const count = data.data.launchpad_aggregate.aggregate.count
    const launchpads = launchpadData?.map((launchpad: any) => {
      LANGUAGE.forEach((l) => {
        const launchpadLanguages =
          launchpad.launchpad_i18ns.find((ml) => ml.language_id == l.id) ||
          launchpad.launchpad_i18ns.find((ml) => ml.language_id == 1)
        launchpad[l.shortLang] = {
          seo: {
            title: launchpadLanguages?.data?.name,
            description: launchpadLanguages?.data?.description,
            thumbnail_url: launchpadLanguages?.data?.thumbnail_url,
          },
          name: launchpadLanguages?.data?.name,
          description: launchpadLanguages?.data?.description,
        }
      })
      return launchpad
    })
    return { launchpads: launchpads as Launchpad[], count }
  } catch (error) {
    console.error(error)
  }
}
export const getLaunchPadDetail = async (slug: string) => {
  try {
    const { data } = await axios.get(`${getConfig().REST_API_URL}/launchpad/slug/${slug}`)
    const res = data?.data?.launchpad?.[0]
    LANGUAGE.forEach((l) => {
      const launchpadLanguages =
        res.launchpad_i18ns.find((ml) => ml.language_id == l.id) ||
        res.launchpad_i18ns.find((ml) => ml.language_id == 1)
      res[l.shortLang] = {
        seo: {
          title: launchpadLanguages?.data?.name,
          description: launchpadLanguages?.data?.description,
          thumbnail_url: launchpadLanguages?.data?.thumbnail_url,
        },
        name: launchpadLanguages?.data?.name,
        description: launchpadLanguages?.data?.description,
      }
    })
    return res
  } catch (error) {
    console.log(error)
  }
}
export const mintNfts = async (launchpad_id: string, amount: number) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/launchpad/${launchpad_id}/${amount}/mint`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getArtistMangas = async (id: string): Promise<IComic[]> => {
  return await axios.get(`${getConfig().API_URL}/api/rest/public/creators/${id}/manga`).then((res) =>
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
        subscriptions: m.manga_subscribers_aggregate?.aggregate?.count || 0,
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
export const getArtistArtworks = async (id: string) => {
  return await axios
    .get(`${getConfig().API_URL}/api/rest/public/creators/${id}/artworks?limit=99999&offset=0`)
    .then((res) => res.data)
}
export const getArtistArtworkAlbums = async (id: string) => {
  return await axios
    .get(`${getConfig().REST_API_URL}/album/public?creator_id=${id}&limit=1000&offset=0`)
    .then((res) => res.data)
}
export const getArtworkAlbums = async (id: string, artistId: string) => {
  return await axios
    .get(`${getConfig().API_URL}/api/rest/public/albums/${id}?creator_id=${artistId}&limit=99999&offset=0`)
    .then((res) => res.data)
}
export const getArtistCollections = async (id: string) => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/creators/${id}/launchpad`)
  const launchpadData = data.launchpad
  const count = data.launchpad.length
  const launchpads = launchpadData?.map((launchpad: any) => {
    LANGUAGE.forEach((l) => {
      const launchpadLanguages =
        launchpad.launchpad_i18ns.find((ml) => ml.i18n_language.id == l.id) ||
        launchpad.launchpad_i18ns.find((ml) => ml.i18n_language.is_main)
      launchpad[l.shortLang] = {
        seo: {
          title: launchpadLanguages?.data?.name,
          description: launchpadLanguages?.data?.description,
          thumbnail_url: launchpadLanguages?.data?.thumbnail_url,
        },
        name: launchpadLanguages?.data?.name,
        description: launchpadLanguages?.data?.description,
      }
    })
    return launchpad
  })
  return { launchpads: launchpads as Launchpad[], count }
}
export const getContests = async (id: string) => {
  const { data } = await axios.get(`${getConfig().API_URL}/api/rest/public/creators/${id}/contests`)
  const contestData = data.contest
  const count = data.contest_aggregate.aggregate.count
  const contests = contestData?.map((contest: any) => {
    LANGUAGE.forEach((l) => {
      const contestLanguage =
        contest.contest_i18ns.find((ml) => ml.i18n_language.id == l.id) ||
        contest.contest_i18ns.find((ml) => ml.i18n_language.is_main)
      contest[l.shortLang] = {
        title: contestLanguage?.data?.title,
        image: contestLanguage?.data?.image,
      }
    })
    return contest
  })
  return { contests: contests, count }
}
export const getContestMangaAndArtwork = async (id: string, contestId: string) => {
  try {
    const { data: mangaData } = await axios.get(
      `${getConfig().API_URL}/api/rest/public/creators/${id}/contests/${contestId}/manga`
    )
    const { data: artworksData } = await axios.get(
      `${getConfig().API_URL}/api/rest/public/creators/${id}/contests/${contestId}/artworks`
    )
    const result = {
      mangas: mangaData.manga?.map((m: any) => {
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
          subscriptions: m.manga_subscribers_aggregate?.aggregate?.count || 0,
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
      }),
      artworks: artworksData,
    }
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}
export const updateProfile = async (data) => {
  try {
    return await privateAxios.put(`${getConfig().REST_API_URL}/user/update-profile`, data)
  } catch (error) {
    console.error('Error in updateProfile:', error)
    throw error // Re-throw the error so it can be caught in the component
  }
}
export const checkQuestStatus = async (id: string) => {
  try {
    return await privateAxios.post(`${getConfig().REST_API_URL}/quest/${id}/check-status`)
  } catch (error) {
    throw error
  }
}
export const getMintNftSignature = async (id: string) => {
  try {
    return await privateAxios.post(`${getConfig().REST_API_URL}/quest/${id}/mint-badge`)
  } catch (error) {
    throw error
  }
}
