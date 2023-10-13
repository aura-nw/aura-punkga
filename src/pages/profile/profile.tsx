import { ChevronDownIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import FilledButton from 'components/Button/FilledButton'
import OutlineButton from 'components/Button/OutlineButton'
import DummyComic from 'components/DummyComponent/comic'
import Footer from 'components/Footer'
import Header from 'components/Header'
import AutoGrowingTextField from 'components/Input/TextField/AutoGrowing'
import Select from 'components/Select'
import MComic from 'components/pages/homepage/comic'
import ChangingPasswordModal from 'components/pages/profile/changingPasswordModal'
import Comic from 'components/pages/profile/comic'
import SettingPasswordModal from 'components/pages/profile/settingPasswordModal'
import vi from 'date-fns/locale/vi'
import NoImg from 'images/avatar.svg'
import LinkSvg from 'images/icons/Link.svg'
import EditIcon from 'images/icons/edit-circle.svg'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import OtherIcon from 'images/icons/other-gender.svg'
import _ from 'lodash'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { subscribe, unsubscribe } from 'src/services'
import Info from './info'
import Quest from './quests'
import LeaderBoard from './leaderboard'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Profile {...props} />
}
function Profile({ subscribeList, curentlyReading, updateProfile }) {
  const { account, isSettingUp, getProfile } = useContext(Context)
  const { t } = useTranslation()
  const [birthdate, setBirthdate] = useState(null)
  const profilePicture = useRef()
  const [gender, setGender] = useState<{ key: string | number; value: string }>(null)
  const [open, setOpen] = useState(false)
  const [bio, setBio] = useState(null)
  const router = useRouter()
  const [settingPasswordModalOpen, setSettingPasswordModalOpen] = useState(false)
  const [changingPasswordModalOpen, setChangingPasswordModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const { locale } = useRouter()
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile) as any
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e) => {
    if (!e.target?.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  useEffect(() => {
    if (!isSettingUp) {
      if (!account?.verified) {
        router.push('/')
      }
    }
  }, [isSettingUp, account?.verified])

  useEffect(() => {
    if (account) {
      setGender(
        account.gender == 'Undisclosed'
          ? { key: 'Other', value: t('Other') }
          : { key: account.gender, value: t(account.gender) }
      )
      setBirthdate(account.birthdate ? new Date(account.birthdate).getTime() : undefined)
      setBio(account.bio)
    }
  }, [account])

  useEffect(() => {
    setGender((prev) => {
      if (prev)
        return _.cloneDeep({
          key: prev.key,
          value: t(prev.key?.toString()),
        })
    })
  }, [t('Male')])

  const updateProfileHandler = async () => {
    const form = new FormData()
    if (gender.key && gender.key != account.gender) {
      form.append('gender', gender.key == 'Other' ? 'Undisclosed' : (gender.key as string))
    }
    if (birthdate && new Date(account.birthdate).getTime() != new Date(birthdate).getTime()) {
      form.append('birthdate', moment(birthdate).format('yyyy-MM-DD') as string)
    }
    if (account.bio != bio) {
      form.append('bio', bio || '')
    }
    if ((profilePicture.current as any)?.files[0]) {
      form.append('picture', (profilePicture.current as any).files[0])
    }
    if (Object.keys(Object.fromEntries(form)).length) {
      setLoading(true)
      await updateProfile(form)
      await getProfile()
    }
    setSelectedFile(undefined)
    setLoading(false)
    setOpen(false)
  }

  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
    return (
      <button
        className='relative w-full cursor-default bg-white py-[1px] md:py-[7px] pl-[10px] pr-[57px] text-left text-[#61646B] 
        focus:outline-none lg:h-10 md:font-bold text-sm rounded-lg 
        border-[1px] border-medium-gray leading-6'
        onClick={onClick}
        ref={ref}>
        {value ? (
          moment(value).format('DD/MM/yyyy')
        ) : (
          <span className='text-medium-gray text-sm leading-6 font-normal'>{t('dd/mm/yyyy')}</span>
        )}
        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center h-full mr-[10px]'>
          <ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />
        </span>
      </button>
    )
  })

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
            <div className='flex'>
              <Info updateProfile={updateProfile} />
              <Quest />
              <LeaderBoard />
            </div>
            <div className={`flex gap-[10px] md:gap-[60px] ${open ? 'flex-wrap' : ''}`}>
              <div
                className={`flex transition-all justify-center md:max-w-[280px] p-[5px] md:p-0 ${
                  open ? 'w-full md:w-2/5' : 'w-[120px] h-[120px] md:w-2/5 md:h-auto'
                }`}>
                <div className='max-w-[120px] md:max-w-[280px] relative flex-1 '>
                  <div className='border-[4px] md:border-none border-second-color aspect-square rounded-full md:rounded-xl object-contain bg-light-gray overflow-hidden'>
                    <div
                      className={`aspect-square rounded-full md:rounded-xl w-full transition-all bg-medium-gray duration-300 absolute top-0 right-[1.5px] opacity-0 flex flex-col justify-center items-center cursor-pointer ${
                        open ? 'hover:opacity-40' : 'hidden'
                      }`}>
                      <CloudArrowUpIcon className='w-10 h-10' />
                      <div className='hidden md:block text-xl font-semibold'>{t('Upload profile picture')}</div>
                      <input
                        ref={profilePicture}
                        onChange={onSelectFile}
                        type='file'
                        className='bg-black absolute inset-0 opacity-0'
                        id='change-profile-picture-input'
                      />
                    </div>
                    <Image
                      src={EditIcon}
                      height={360}
                      width={360}
                      alt=''
                      className={`h-[18px] w-[18px] md:hidden absolute bottom-[10px] right-[10px] transition-all ${
                        open ? 'opacity-100' : 'opacity-0'
                      }`}
                      onClick={() => (document.querySelector('#change-profile-picture-input') as any)?.click()}
                    />
                    <Image
                      src={preview || account.image || NoImg}
                      height={360}
                      width={360}
                      alt=''
                      className='h-full w-full object-cover rounded-full md:rounded-xl'
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex-[1_0_80px] flex flex-col relative ${
                  open ? 'gap-[10px]' : 'gap-[5px] md:gap-[10px] md:justify-between'
                }`}>
                <div className={`flex flex-col ${open ? 'gap-[10px]' : 'gap-[5px]'}`}>
                  <div className='flex'>
                    <div
                      className={`shrink-0 text-medium-gray transition-all md:font-bold text-sm md:text-base leading-[18px] md:leading-10 ${
                        open ? 'w-[88px] md:w-[130px] opacity-100 md:leading-6' : 'w-0 h-0 opacity-0'
                      }`}>
                      {t('Username')}:
                    </div>
                    <div
                      className={`text-black md:text-second-color transition-all leading-[18px] md:leading-10 ${
                        open
                          ? 'text-sm md:text-base font-extrabold mb-0 md:leading-6'
                          : 'text-sm md:text-[32px] font-semibold md:font-extrabold'
                      }`}>
                      {account.name}
                    </div>
                  </div>
                  <div className={`flex`}>
                    <div
                      className={`shrink-0 text-medium-gray transition-all md:font-bold text-sm md:text-base leading-[18px] md:leading-10 ${
                        open ? 'w-[88px] md:w-[130px] opacity-100 md:leading-6' : 'w-0 h-0 opacity-0'
                      }`}>
                      {t('Email')}:
                    </div>
                    <div
                      className={`transition-all text-sm md:text-base leading-[18px] md:leading-5 flex gap-1 items-center ${
                        open
                          ? 'mb-0 text-[#0F4072] md:text-[#61646B] md:leading-6 md:font-bold'
                          : 'text-[#0F4072] md:text-second-color text-xs'
                      }`}>
                      <span className={open ? 'hidden' : 'shrink-0'}>
                        <Image src={LinkSvg} alt='' className='md:w-4 md:h-4' />
                      </span>
                      <p className='break-all'>{account.email}</p>
                    </div>
                  </div>
                </div>
                {(account.birthdate || account.gender || open) && (
                  <div className={`flex flex-col ${open ? 'gap-[10px]' : 'gap-[5px] md:gap-[10px]'}`}>
                    {(account.birthdate || open) && (
                      <div className={`flex items-center`}>
                        <div
                          className={`shrink-0 text-medium-gray transition-all md:text-base md:leading-5 ${
                            open
                              ? 'text-sm leading-[18px] w-[88px] md:font-bold md:w-[130px]'
                              : 'text-xs leading-[15px] w-[63px] md:w-[84px] md:font-medium'
                          }`}>
                          {t('DOB')}:
                        </div>
                        {open ? (
                          <div>
                            <DatePicker
                              selected={birthdate}
                              showMonthDropdown
                              showYearDropdown
                              locale={locale == 'vn' ? vi : ''}
                              dropdownMode='select'
                              onChange={(date) => setBirthdate(date)}
                              customInput={<CustomInput />}
                              maxDate={new Date()}
                            />
                          </div>
                        ) : (
                          <div className='text-xs text-[#19191B] font-medium leading-[15px] md:text-base md:leading-5'>
                            {moment(account.birthdate).format('DD/MM/yyyy')}
                          </div>
                        )}
                      </div>
                    )}
                    {(account.gender || open) && (
                      <div className={`flex items-center`}>
                        <div
                          className={`shrink-0 text-medium-gray transition-all md:text-base md:leading-5 ${
                            open
                              ? 'text-sm leading-[18px] w-[88px] md:font-bold md:w-[130px]'
                              : 'text-xs leading-[15px] w-[63px] md:w-[84px] md:font-medium'
                          }`}>
                          {t('Gender')}:
                        </div>
                        {open ? (
                          <div>
                            <Select
                              className='text-[#61646B]'
                              selected={gender}
                              onChange={setGender}
                              placeholder={t('Select a gender')}
                              icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                              options={[
                                {
                                  key: 'Male',
                                  value: t('Male'),
                                },
                                {
                                  key: 'Female',
                                  value: t('Female'),
                                },
                                {
                                  key: 'Other',
                                  value: t('Other'),
                                },
                              ]}
                            />
                          </div>
                        ) : (
                          <div className='text-xs text-[#19191B] font-medium leading-[15px] md:text-base md:leading-5 capitalize flex items-center'>
                            {t(account.gender == 'Undisclosed' ? 'Other' : account.gender)}{' '}
                            <Image
                              className='h-[14px] w-[14px] md:h-[20px] md:w-[20px]'
                              src={
                                account.gender.toLowerCase() == 'male'
                                  ? MaleIcon
                                  : account.gender.toLowerCase() == 'female'
                                  ? FemaleIcon
                                  : OtherIcon
                              }
                              alt=''
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {(account.bio || open) && (
                      <div className={`flex ${open ? 'items-center' : 'items-start'}`}>
                        <div
                          className={`shrink-0 text-medium-gray transition-all md:text-base md:leading-5 ${
                            open
                              ? 'text-sm leading-[18px] w-[88px] md:font-bold md:w-[130px]'
                              : 'text-xs leading-[15px] w-[63px] md:w-[84px] md:font-medium'
                          }`}>
                          {t('Bio')}:
                        </div>
                        {open ? (
                          <AutoGrowingTextField
                            value={bio}
                            onChange={setBio}
                            placeholder={t('Write something about yourself')}
                            className='text-sm text-[#61646B] font-normal md:font-bold leading-6 min-h-[52px] flex-1 max-w-[calc(100vw-128px)] max-h-[150px] md:min-h-[72px] rounded-lg'
                          />
                        ) : (
                          <div className='text-xs text-[#19191B] font-medium leading-[15px] md:font-medium md:text-base md:leading-5'>
                            <p
                              className={`text-[#19191B] ${
                                showMore ? '' : 'md:line-clamp-3 line-clamp-5 cursor-pointer'
                              }`}
                              onClick={() => setShowMore(!showMore)}>
                              {account.bio}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className='relative'>
                  <div
                    className={`flex gap-2 mt-[15px] md:mt-0 md:gap-6 transition-all left-0 ${
                      open ? ' opacity-0 pointer-events-none' : 'opacity-100 '
                    }`}>
                    <>
                      <OutlineButton className='md:hidden' size='xs' onClick={() => setOpen(!open)}>
                        {t('Edit profile')}
                      </OutlineButton>
                      <OutlineButton className='hidden md:flex' size='lg' onClick={() => setOpen(!open)}>
                        {t('Edit profile')}
                      </OutlineButton>
                    </>
                    {account?.signupMethods?.includes('basic_auth') ? (
                      <>
                        <OutlineButton
                          className='md:hidden'
                          onClick={() => setChangingPasswordModalOpen(true)}
                          size='xs'>
                          {t('Change password')}
                        </OutlineButton>
                        <OutlineButton
                          className='hidden md:flex'
                          onClick={() => setChangingPasswordModalOpen(true)}
                          size='lg'>
                          {t('Change password')}
                        </OutlineButton>
                      </>
                    ) : (
                      <>
                        <OutlineButton
                          className='md:hidden'
                          onClick={() => setSettingPasswordModalOpen(true)}
                          size='xs'>
                          {t('Set password')}
                        </OutlineButton>
                        <OutlineButton
                          className='hidden md:flex'
                          onClick={() => setSettingPasswordModalOpen(true)}
                          size='lg'>
                          {t('Set password')}
                        </OutlineButton>
                      </>
                    )}
                  </div>
                  <div
                    className={`gap-6 transition-all absolute top-0 ${
                      open
                        ? 'opacity-100 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0'
                        : 'opacity-0 pointer-events-none'
                    }`}>
                    <OutlineButton
                      loading={loading}
                      size='lg'
                      className='hidden md:block'
                      onClick={updateProfileHandler}>
                      {t('Save')}
                    </OutlineButton>
                    <FilledButton
                      loading={loading}
                      size='xs'
                      className='md:hidden w-[80px]'
                      onClick={updateProfileHandler}>
                      {t('Save')}
                    </FilledButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className='mt-5 md:mt-[100px]'>
          {!!(isSettingUp || curentlyReading.loading || curentlyReading.data?.length) && (
            <p className='text-sm md:text-2xl leading-6 font-extrabold mb-2 md:mb-10'>{t('Currently reading')}</p>
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
        <div className='mt-5 md:mt-[100px]'>
          {!!(isSettingUp || subscribeList.loading || subscribeList.data?.length) && (
            <p className='text-sm md:text-2xl leading-6 font-extrabold mb-2 md:mb-10'>{t('Subscribe list')}</p>
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
      <Footer />
      <SettingPasswordModal open={settingPasswordModalOpen} setOpen={setSettingPasswordModalOpen} profile={account} />
      <ChangingPasswordModal open={changingPasswordModalOpen} setOpen={setChangingPasswordModalOpen} />
    </>
  )
}
