import axios from 'axios'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { COMIC_STATUS, LANGUAGE } from 'src/constants'
import { Context } from 'src/context'
import useApi from 'src/hooks/useApi'
import { IArtist } from 'src/models/artist'
import { formatStatus } from 'src/utils'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { account } = useContext(Context)
  const config = getConfig()
  const { query } = useRouter()
  const artist = query.artist
  const getDetail = async () => {
    try {
      const env = config.CHAIN_ID.includes('xstaxy') ? 'xstaxy' : 'euphoria'
      const { data } = await axios.get(`${config.REST_API_URL}/creator/${artist}`)
      const detail = data.data.creators[0]
      if (detail) {
        const collections = []
        let collectionsData = []
        detail.manga_creators.forEach(({ manga }) =>
          manga.contract_addresses?.forEach((address) =>
            collections.includes(address) ? null : collections.push(address)
          )
        )
        if (collections.length) {
          const { data } = await axios.post(`${config.CHAIN_INFO.indexerV2}`, {
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
        return {
          id: detail.id,
          name: detail.name,
          penName: detail.pen_name,
          bio: detail.bio,
          dob: detail.dob,
          gender: detail.gender,
          joinDate: detail.created_at,
          totalSubscribers: detail.total_subscribers,
          avatar: detail.avatar_url,
          link: {
            website: detail.socials.web,
            behance: detail.socials.behance,
          },
          collections: collectionsData.sort((a, b) => collections.indexOf(a.address) - collections.indexOf(b.address)),
          comics: detail.manga_creators?.map(({ manga }: any) => {
            const response = {
              id: manga.id,
              slug: manga.slug,
              image: manga.poster,
              status: {
                type: COMIC_STATUS[formatStatus(manga.status)],
                text: formatStatus(manga.status),
              },
              authors: manga.manga_creators?.map((c: any) => ({
                id: c.creator?.id,
                slug: c.creator?.slug,
                name: c.creator?.pen_name || c.creator?.name,
              })),
              views: manga.manga_total_views?.views || 0,
              likes: manga.manga_total_likes?.likes || 0,
              latestChap: {
                number: manga.chapters?.[0]?.chapter_number,
                id: manga.chapters?.[0]?.id,
              },
              tags: manga.manga_tags.map(({ tag }: any) => {
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
                manga.manga_languages.find((ml) => ml.language_id == language.id) ||
                manga.manga_languages.find((ml) => ml.is_main_language)
              response[language.shortLang] = {
                title: l ? l?.title : 'Unknown title',
                description: l ? l?.description : 'Unknown description',
              }
            })
            return response
          }),
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const artistDetail = useApi<IArtist>(getDetail, !!artist, [artist])

  return <Component {...props} artistDetail={artistDetail} />
}

export default withApi
