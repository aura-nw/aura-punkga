import { Tab } from '@headlessui/react'
import { BellAlertIcon, BellIcon, EyeIcon, HeartIcon } from '@heroicons/react/20/solid'
import { BellAlertIcon as BellAlertIconOutline } from '@heroicons/react/24/outline'
import FilledButton from 'components/Button/FilledButton'
import OutlineButton from 'components/Button/OutlineButton'
import { HEADER_HEIGHT } from 'components/Header'
import Tag from 'components/Label/Tag'
import ChapterList from 'components/pages/comic/ChapterList'
import Introduction from 'components/pages/comic/Introduction'
import NFTsList from 'components/pages/comic/NFTsList'
import Ninja from 'images/ninja-2.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import mockAvar from 'src/assets/images/mockup4.png'
import { LanguageType } from 'src/constants/global.types'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { subscribe, unsubscribe } from 'src/services'
import { useWindowSize } from 'usehooks-ts'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Comic {...props} />
}
function Comic({ comicDetails, like, unlike }) {
  const { setSignInOpen } = useContext(ModalContext)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { width } = useWindowSize()
  const [language, setLanguage] = useState<LanguageType>(locale as LanguageType)
  const [isSubscribe, setIsSubscribe] = useState(comicDetails.data?.isSubscribe)
  const [comicLikes, setComicLikes] = useState(0)
  const { account } = useContext(Context)
  const router = useRouter()
  useEffect(() => {
    setIsSubscribe(comicDetails.data?.isSubscribe)
  }, [comicDetails.data?.isSubscribe])
  useEffect(() => {
    if (comicDetails.data) {
      if (width > 1280) {
        router.push(`/comic/${comicDetails.data.slug}/chapter/1`)
        return
      }
      setComicLikes(comicDetails.data.likes)
    }
  }, [comicDetails.data])
  if (comicDetails.loading) {
    return <></>
  }
  const data = comicDetails.data
  if (!data) return <></>

  const selectedLanguage =
    data.languages.find((l) => l.shortLang == language) || data.languages.find((l) => l.isMainLanguage)

  const subscribeHandler = (isSub: boolean) => {
    if (account?.verified && account?.name) {
      if (isSub) {
        subscribe(data.id)
      } else {
        unsubscribe(data.id)
      }
      setIsSubscribe(isSub)
    } else {
      setSignInOpen(true)
    }
  }
  return (
    <>
      <div className={`bg-black fixed  left-0 right-0 bottom-0`} style={{ top: HEADER_HEIGHT.MOBILE }}>
        <div style={{ top: HEADER_HEIGHT.MOBILE }} className={`fixed left-0 right-0`}>
          <Image
            src={data.image || mockAvar}
            height={221}
            width={240}
            className='h-[265px] w-full object-cover'
            alt=''
          />
          <div className='absolute inset-0 bg-gradient-to-r from-[28%] from-[#000]/80 to-[#00000000]'></div>
        </div>
      </div>
      <div className={`flex flex-col -mb-[8vh]`} style={{ minHeight: `calc(100dvh - ${HEADER_HEIGHT.MOBILE})` }}>
        <div className='min-h-[228px] w-full relative'>
          <div className='w-full h-full z-10 relative flex'>
            <div className='w-full h-full z-10 flex flex-col p-6 gap-6'>
              <div className='flex gap-2 flex-wrap'>
                {data.languages.map((language, index) => {
                  return (
                    <Tag
                      selected={selectedLanguage.id == language.id}
                      key={index}
                      onClick={() => setLanguage(language.shortLang)}>
                      {t(language.shortLang)}
                    </Tag>
                  )
                })}
              </div>
              <div className='text-white'>
                <div className='text-base font-semibold leading-6'>{data[selectedLanguage.shortLang]?.title}</div>
                <div className='text-xs font-semibold leading-6'>
                  {data.authors.map((author, index) => (
                    <Fragment key={index}>
                      <span className='text-primary-color font-[600] first:hidden'>, </span>
                      <span className='text-primary-color font-[600]'>
                        {author.slug ? (
                          <Link className='author' href={`/artist/${author.slug}`}>
                            {t(author.name)}
                          </Link>
                        ) : (
                          t(author.name)
                        )}
                      </span>
                    </Fragment>
                  ))}
                </div>
                {/* <div className="text-xs mt-2 line-clamp-3 max-w-[250px]">
                  {data[selectedLanguage.shortLang]?.description}
                </div>
                <div className="flex gap-1 mt-2 flex-wrap [&>button]:text-[#f2f2f2] [&>button]:border-[#f2f2f2]">
                  {data.tags.map((tag, index) => {
                    return (
                      <Tag key={index}>{tag[selectedLanguage.shortLang]}</Tag>
                    );
                  })}
                </div> */}
                <div className='flex gap-3 items-center text-xs mt-3 font-semibold'>
                  <div className='flex items-center gap-1'>
                    <BellIcon className='w-4 h-4' />
                    <span>{data.subscriptions.toLocaleString('en-US')}</span>
                  </div>
                  •
                  <div className='flex items-center gap-1'>
                    <EyeIcon className='w-4 h-4' />
                    <span>{data.views.toLocaleString('en-US')}</span>
                  </div>
                  •
                  <div className='flex items-center gap-1'>
                    <HeartIcon className='w-4 h-4' />
                    <span>{comicLikes.toLocaleString('en-US')}</span>
                  </div>
                </div>
              </div>
              <div className='mb-4'>
                {isSubscribe ? (
                  <FilledButton size='xs'>
                    <div onClick={() => subscribeHandler(false)} className='flex items-center'>
                      <BellAlertIcon className='w-[14px] h-[14px] mr-2 inline-block animate-[bell-ring_1s_ease-in-out]' />
                      {t('Subscribed')}
                    </div>
                  </FilledButton>
                ) : (
                  <OutlineButton size='sm'>
                    <div onClick={() => subscribeHandler(true)} className='flex items-center'>
                      <BellAlertIconOutline className='w-[14px] h-[14px] mr-2 inline-block ' />
                      {t('Subscribe')}
                    </div>
                  </OutlineButton>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='h-full flex-auto z-10 flex flex-col border-t-[1px] border-[#61646B]'>
          <Tab.Group>
            <Tab.List className='w-full flex justify-between bg-black/60 text-white text-sm'>
              <Tab className='w-1/3 flex-auto ui-selected:text-primary-color ui-selected:font-semibold xl:ui-selected:underline'>
                <div className='my-[8px]'>{t('Chapters')}</div>
              </Tab>
              <Tab className='w-1/3 flex-auto ui-selected:text-primary-color ui-selected:font-semibold xl:ui-selected:underline'>
                <div className='my-[8px]'>NFTs</div>
              </Tab>
              <Tab className='w-1/3 flex-auto ui-selected:text-primary-color ui-selected:font-semibold xl:ui-selected:underline'>
                <div className='my-[8px]'>{t('Introduction')}</div>
              </Tab>
            </Tab.List>
            <Tab.Panels className='h-full flex-1 flex flex-col'>
              <Tab.Panel>
                <ChapterList
                  list={data.chapters}
                  hasAccess={data.hasAccess}
                  like={like}
                  unlike={unlike}
                  setComicLikes={setComicLikes}
                />
              </Tab.Panel>
              <Tab.Panel className='h-full flex-1 flex flex-col'>
                {!!comicDetails.data.collections.length ? (
                  <NFTsList collections={comicDetails.data.collections} />
                ) : (
                  <div className='flex-1 w-full flex flex-col items-center justify-center'>
                    <Image src={Ninja} alt='' className='h-[260px] aspect-square mx-auto opacity-60' />
                    <div className='font-extrabold text-2xl leading-6 text-subtle-dark mt-[10px]'>
                      {t('Artist Composing')}
                    </div>
                  </div>
                )}
              </Tab.Panel>
              <Tab.Panel className='h-full flex-1 flex flex-col'>
                <div className='flex-1 w-full flex'>
                  <Introduction data={data} language={language} />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}
