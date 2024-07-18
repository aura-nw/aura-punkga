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
import { Box, styled, Tab, Tabs } from '@mui/material'
import Comic2 from 'components/pages/homepage/comic2'
import RewardHistory from 'components/pages/profile/rewardHistory'
import NewNFTList from 'components/pages/profile/newNfts'
import MascotEmpty from 'assets/images/mascot-empty.png'
import Image from 'next/image'

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
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ChipTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minHeight: 'auto',
  minWidth: 'auto',
  marginRight: '16px',
  padding: theme.spacing(0.5, 1),
  borderRadius: '8px',
  color: '#6D6D6D',
  fontWeight: 600,
  '&.Mui-selected': {
    color: '#009640',
    backgroundColor: '#D5FFE7',
  },
}));

const ChipTabs = styled(Tabs)({
  marginBottom: 32,
  minHeight: '28px',
  height: '28px',

  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

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
  console.log('account', account)
  if (!account) return <></>
  return (
    <>
      <div className='pk-container py-5 px-5 lg:px-0 lg:py-10'>
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
            <div className='gap-10 flex flex-col lg:flex-row items-center lg:items-start'>
              <div className='w-full lg:w-[340px]'>
                <NewInfo updateProfile={updateProfile} />

              </div>
              <div className='w-full lg:w-[calc(100%_-_340px)] p-8 rounded-[10px] bg-white'>
                <NewQuest />
                {/* <Quest /> */}
                <div className='w-full mt-[28px]'>
                  <Box >
                    <ChipTabs value={valueTab} onChange={handleChangeTab}>
                      <ChipTab label="Currently reading" {...a11yProps(0)} />
                      <ChipTab label="Subscribed mangas " {...a11yProps(1)} />
                      <ChipTab label="NFTs" {...a11yProps(2)} />
                      <ChipTab label="Reward history" {...a11yProps(3)} />
                    </ChipTabs>
                  </Box>
                  <CustomTabPanel value={valueTab} index={0}>
                    <>
                      {!curentlyReading.data || curentlyReading.data.length === 0 ?
                        <div className='w-full py-8 flex flex-col items-center gap-4'>
                          <Image
                            src={MascotEmpty}
                            alt=''
                            width={160}
                            height={160}
                          />
                          <div className='text-text-primary font-medium'>{t('No manga found')}</div>
                        </div>
                        :
                        <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5 mt-4 md:mt-10 md:pb-7'>
                          {isSettingUp || curentlyReading.loading ? (
                            <>
                              <DummyComic />
                              <DummyComic />
                              <DummyComic />
                            </>
                          ) : (
                            <>
                              {curentlyReading.data?.map((data, index) => (
                                <Fragment key={index}>
                                  <div className='block'>
                                    <Comic2 key={index} {...data} />
                                  </div>
                                </Fragment>
                              ))}
                            </>
                          )}
                        </div>
                      }</>
                  </CustomTabPanel>
                  <CustomTabPanel value={valueTab} index={1}>
                    <>
                      {!subscribeList.data || subscribeList.data.length === 0 ?
                        <div className='w-full py-8 flex flex-col items-center gap-4'>
                          <Image
                            src={MascotEmpty}
                            alt=''
                            width={160}
                            height={160}
                          />
                          <div className='text-text-primary font-medium'>{t('No manga found')}</div>
                        </div>
                        :
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
                                    <Comic2 key={index} {...data} />
                                  </div>
                                  <div className='md:hidden'>
                                    <Comic2 key={index} {...data} />
                                  </div>
                                </Fragment>
                              ))}
                            </>
                          )}
                        </div>
                      }</>


                  </CustomTabPanel>
                  <CustomTabPanel value={valueTab} index={2}>
                    <NewNFTList />
                  </CustomTabPanel>
                  <CustomTabPanel value={valueTab} index={3}>
                    {!account.completedQuests || account.completedQuests.length === 0 ?
                      <div className='w-full py-8 flex flex-col items-center gap-4'>
                        <Image 
                          src={MascotEmpty}
                          alt=''
                          width={160}
                          height={160}
                        />
                        <div className='text-text-primary font-medium'>{t('Your reward history is empty')}</div>
                      </div>
                      :
                      <RewardHistory data={account.completedQuests} />
                    }
                  </CustomTabPanel>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
