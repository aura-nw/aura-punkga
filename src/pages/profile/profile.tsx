import DummyComic from 'components/DummyComponent/comic'
import MComic from 'components/pages/homepage/comic'
import Analytic from 'components/pages/profile/analytic'
import Comic from 'components/pages/profile/comic'
import NFTList from 'components/pages/profile/nfts'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { subscribe, unsubscribe } from 'src/services'
import Info from '../../components/pages/profile/info'
import LeaderBoard from '../../components/pages/profile/leaderboard'
import Quest from '../../components/pages/profile/quests'
import NewQuest from '../../components/pages/profile/newQuests'
import NewInfo from 'components/pages/profile/newInfo'
import { Box, Tab, Tabs } from '@mui/material'
import Comic2 from 'components/pages/homepage/comic2'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Profile {...props} />
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Profile({ subscribeList, curentlyReading, updateProfile }) {
  const { account, isSettingUp } = useContext(Context)
  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };
  const { t } = useTranslation()
  const router = useRouter()
  useEffect(() => {
    if (!account) router.push('/')
  }, [account])

  if (!account) return <></>
  return (
    <>
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
              <div className='w-[340px]'>
                <Info updateProfile={updateProfile} />
                <NewInfo updateProfile={updateProfile} />

              </div>
              <div className='w-[calc(100%_-_340px)] p-8 rounded-[10px] bg-white'>
                <NewQuest />
                {/* <Quest /> */}
                <Box sx={{ width: '100%', marginTop: '28px' }}>
                  <Box >
                    <Tabs value={valueTab} onChange={handleChangeTab}>
                      <Tab label="Currently reading" {...a11yProps(0)} />
                      <Tab label="Subscribed mangas " {...a11yProps(1)} />
                      <Tab label="NFTs" {...a11yProps(2)} />
                      <Tab label="Reward history" {...a11yProps(3)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={valueTab} index={0}>
                    <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5 mt-4 md:mt-10 md:pb-7'>
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
                              <div className='block'>
                                <Comic2 key={index} {...data} />
                              </div>
                            </Fragment>
                          ))}
                        </>
                      )}
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel value={valueTab} index={1}>
                    <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5 mt-4 md:mt-10 md:pb-7'>
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
                  </CustomTabPanel>
                  <CustomTabPanel value={valueTab} index={2}>
                    <NFTList />
                  </CustomTabPanel>
                  <CustomTabPanel value={valueTab} index={3}>
                    Item Four
                  </CustomTabPanel>
                </Box>
                <NFTList />
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
            <p className='text-base md:text-xl leading-5 md:leading-[25px] font-extrabold mb-2 md:mb-10 mt-5 md:mt-10'>
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
            <p className='text-base md:text-xl leading-5 md:leading-[25px] font-extrabold mb-2 md:mb-10 mt-5 md:mt-10'>
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
    </>
  )
}
