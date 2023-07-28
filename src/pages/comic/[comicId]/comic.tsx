import { Tab } from '@headlessui/react'
import { BellAlertIcon, EyeIcon, HeartIcon } from '@heroicons/react/20/solid'
import { BellAlertIcon as BellAlertIconOutline } from '@heroicons/react/24/outline'
import FilledButton from 'components/Button/FilledButton'
import OutlineButton from 'components/Button/OutlineButton'
import Header from 'components/Header'
import Tag from 'components/Label/Tag'
import ChapterList from 'components/pages/comic/ChapterList'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import mockAvar from 'src/assets/images/mockup4.png'
import { LanguageType } from 'src/constants/global.types'
import { Context } from 'src/context'
export default function Comic({ comicDetails, subscribe, unsubscribe }) {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [language, setLanguage] = useState<LanguageType>(locale as LanguageType)
  const [isSubscribe, setIsSubscribe] = useState(comicDetails.data?.isSubscribe)
  const { account } = useContext(Context)
  useEffect(() => {
    setIsSubscribe(comicDetails.data?.isSubscribe)
  }, [comicDetails.data?.isSubscribe])
  if (comicDetails.loading) {
    return null
  }
  const data = comicDetails.data
  if (!data) return null

  const selectedLanguage =
    data.languages.find((l) => l.shortLang == language) || data.languages.find((l) => l.isMainLanguage)

  const subscribeHandler = (isSub: boolean) => {
    if (account?.verified && account?.name) {
      if (isSub) {
        subscribe()
      } else {
        unsubscribe()
      }
      setIsSubscribe(isSub)
    } else {
      ;(document.querySelector('#open-sign-in-btn') as any)?.click()
    }
  }

  return (
    <>
      <Header />
      <div className='flex flex-col min-h-[100vh] bg-black'>
        <div className='max-h-[350px] min-h-[220px] h-[40vh] w-full relative'>
          <div className='absolute inset-0 '>
            <Image
              src={data.image || mockAvar}
              height={320}
              width={240}
              className='h-full w-full object-cover'
              alt=''
            />
          </div>
          <div className='w-full bg-gradient-to-r from-[#000000cc] to-[#00000034] h-full z-10 relative px-5 py-3 flex flex-col justify-between'>
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
                    <span className='text-second-color font-[600] first:hidden'>, </span>
                    <span className='text-second-color font-[600]'>{author}</span>
                  </Fragment>
                ))}
              </div>
              <div className='text-xs mt-2 line-clamp-5'>{data[selectedLanguage.shortLang]?.description}</div>
              <div className='flex gap-1 mt-2 flex-wrap'>
                {data.tags.map((tag, index) => {
                  return <Tag key={index}>{tag[selectedLanguage.shortLang]}</Tag>
                })}
              </div>
              <div className='flex gap-5 items-center text-xs mt-3'>
                <div className='flex items-center gap-1'>
                  <EyeIcon className='w-4 h-4' />
                  <strong>{data.views.toLocaleString('en-US')}</strong>
                </div>
                <div className='flex items-center gap-1'>
                  <HeartIcon className='w-4 h-4' />
                  <strong>{data.likes.toLocaleString('en-US')}</strong>
                </div>
              </div>
            </div>
            <div className='mb-4'>
              {isSubscribe ? (
                <FilledButton size='xs'>
                  <div onClick={() => subscribeHandler(false)} className='flex items-center'>
                    <BellAlertIcon className='w-[14px] h-[14px] mr-2 inline-block animate-[bell-ring_1s_ease-in-out]' />
                    Subscribed
                  </div>
                </FilledButton>
              ) : (
                <OutlineButton size='xs'>
                  <div onClick={() => subscribeHandler(true)} className='flex items-center'>
                    <BellAlertIconOutline className='w-[14px] h-[14px] mr-2 inline-block ' />
                    Subscribe
                  </div>
                </OutlineButton>
              )}
            </div>
          </div>
        </div>
        <div className='h-full flex-auto'>
          <Tab.Group>
            <Tab.List className='w-full flex justify-between bg-black text-white text-sm'>
              <Tab className='w-1/3 flex-auto ui-selected:text-second-color ui-selected:font-bold ui-selected:underline'>
                <div className='my-3'>Chapter</div>
              </Tab>
              <Tab className='w-1/3 flex-auto ui-selected:text-second-color ui-selected:font-bold ui-selected:underline'>
                <div className='my-3'>NFTs</div>
              </Tab>
            </Tab.List>
            <Tab.Panels className='bg-black h-full'>
              <Tab.Panel>
                <ChapterList list={data.chapters} />
              </Tab.Panel>
              <Tab.Panel>NFTs</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}
