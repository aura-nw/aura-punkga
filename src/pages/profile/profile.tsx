import DummyComic from 'components/DummyComponent/comic'
import Footer from 'components/Footer'
import Header from 'components/Header'
import MComic from 'components/pages/homepage/comic'
import Comic from 'components/pages/profile/comic'
import { Fragment, useContext, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { subscribe, unsubscribe } from 'src/services'
import Info from '../../components/pages/profile/info'
import LeaderBoard from '../../components/pages/profile/leaderboard'
import Quest from '../../components/pages/profile/quests'
import NFTList from 'components/pages/profile/nfts'
import Analytic from 'components/pages/profile/analytic'
import { useRouter } from 'next/router'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Profile {...props} />
}
function Profile({ subscribeList, curentlyReading, updateProfile }) {
  const { account, isSettingUp } = useContext(Context)
  const { t } = useTranslation()
  const router = useRouter()
  useEffect(() => {
    if (!account) router.push('/')
  }, [account])

  if (!account) return <></>
  return (
    <>
      <Header />
      <div className='pk-container py-5 px-5 md:px-0 md:py-10'>
        {isSettingUp ? (
          <div className='flex gap-[60px]'>
            <div className='w-[280px] h-[280px] rounded-xl object-cover bg-light-gray animate-pulse'></div>
            <div className='flex flex-col justify-between'>
              <div>
                <p className='h-10 animate-pulse bg-light-gray text-second-color mb-1 md:mb-4 w-2/3'></p>
                <p className='h-4 animate-pulse bg-light-gray text-second-color mb-1 md:mb-4 w-3/4'></p>
                <div className='flex gap-[30px] font-medium mb-5'>
                  <p className='h-4 animate-pulse bg-light-gray text-second-color mb-1 md:mb-4 w-1/2'></p>
                  <p className='h-4 animate-pulse bg-light-gray text-second-color mb-1 md:mb-4 w-1/2'></p>
                </div>
                <div className='w-[20vw] animate-pulse h-24 bg-light-gray'></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className='gap-10 hidden xl:flex'>
              <div className='w-[calc(100%_-_560px)]'>
                <Info updateProfile={updateProfile} />
                <Quest />
                <NFTList />
              </div>
              <div className='w-[520px]'>
                <Analytic />
                <LeaderBoard />
              </div>
            </div>
            <div className='flex flex-col gap-5 xl:hidden'>
              <Info updateProfile={updateProfile} />
              <Analytic />
              <Quest />
              <NFTList />
            </div>
          </>
        )}
        <div className=''>
          {!!(isSettingUp || curentlyReading.loading || curentlyReading.data?.length) && (
            <p className='text-sm md:text-2xl leading-6 font-extrabold mb-2 md:mb-10 mt-5 md:mt-10'>
              {t('Currently reading')}
            </p>
          )}
          <div className='grid gap-x-3 md:gap-x-24 gap-y-5 md:gap-y-10 grid-cols-2 xl:grid-cols-3'>
            {isSettingUp || curentlyReading.loading ? (
              <>
                <DummyComic />
                <DummyComic />
                <DummyComic />
              </>
            ) : (
              curentlyReading.data?.map((data, index) => (
                <Fragment key={index}>
                  <div className='hidden md:block'>
                    <Comic {...data} />
                  </div>
                  <div className='md:hidden'>
                    <MComic {...data} />
                  </div>
                </Fragment>
              ))
            )}
          </div>
        </div>
        <div className=''>
          {!!(isSettingUp || subscribeList.loading || subscribeList.data?.length) && (
            <p className='text-sm md:text-2xl leading-6 font-extrabold mb-2 md:mb-10 mt-5 md:mt-10'>
              {t('Subscribe list')}
            </p>
          )}
          <div className='grid gap-x-3 md:gap-x-24 gap-y-5 md:gap-y-10 grid-cols-2 xl:grid-cols-3'>
            {isSettingUp || subscribeList.loading ? (
              <>
                <DummyComic />
                <DummyComic />
                <DummyComic />
              </>
            ) : (
              <>
                {subscribeList.data?.map((data, index) => (
                  <Fragment key={index}>
                    <div className='hidden md:block'>
                      <Comic
                        key={index}
                        {...data}
                        unsubscribe={() => unsubscribe(data.id)}
                        subscribe={() => subscribe(data.id)}
                      />
                    </div>
                    <div className='md:hidden'>
                      <MComic key={index} {...data} />
                    </div>
                  </Fragment>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className='pk-container xl:hidden'>
        <LeaderBoard />
      </div>
      <Footer />
    </>
  )
}
