import Header from 'components/Header'
import { useRouter } from 'next/router'
import { Fragment, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import NoImg from 'images/no_img.png'
import Image from 'next/image'
import OutlineButton from 'components/Button/OutlineButton'
import DummyComic from 'components/DummyComponent/comic'
import Comic from 'components/pages/profile/comic'
import Select from 'components/Select'
import { ChevronDownIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AutoGrowingTextField from 'components/Input/TextField/AutoGrowing'
import moment from 'moment'
import SettingPasswordModal from 'components/pages/profile/settingPasswordModal'
import ChangingPasswordModal from 'components/pages/profile/changingPasswordModal'
import MComic from 'components/pages/homepage/comic'
import FilledButton from 'components/Button/FilledButton'
import MaleIcon from 'images/icons/male.svg'
import FemaleIcon from 'images/icons/female.svg'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import vi from 'date-fns/locale/vi'
import HeadComponent from 'components/Head'
export default function Profile({ profile, subscribeList, unsubscribe, subscribe, curentlyReading, updateProfile }) {
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
    if (profile.data) {
      setGender({ key: profile.data.gender, value: t(profile.data.gender) })
      setBirthdate(profile.data.birthdate ? new Date(profile.data.birthdate).getTime() : undefined)
      setBio(profile.data.bio)
    }
  }, [profile.data])

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
    if (gender.key && gender.key != profile.data.gender) {
      form.append('gender', gender.key as string)
    }
    if (birthdate && new Date(profile.data.birthdate).getTime() != new Date(birthdate).getTime()) {
      form.append('birthdate', moment(birthdate).format('yyyy-MM-DD') as string)
    }
    if (profile.data.bio != bio) {
      form.append('bio', bio || '')
    }
    if ((profilePicture.current as any)?.files[0]) {
      form.append('picture', (profilePicture.current as any).files[0])
    }
    if (Object.keys(Object.fromEntries(form)).length) {
      setLoading(true)
      const res = await updateProfile(form)
      await profile.callApi(true)
      await getProfile()
    }
    setSelectedFile(undefined)
    setLoading(false)
    setOpen(false)
  }

  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
    return (
      <button
        className='relative w-full cursor-default bg-white py-[1px] md:py-[7px] pl-[10px] pr-[57px] text-left text-gray-900 
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

  if (!profile.data) return <></>

  return (
    <>
      <HeadComponent title={`${profile.data.nickname} | Punkga.me`} />
      <Header />
      <div className='pk-container py-5 px-5 md:px-0'>
        {isSettingUp || profile.loading ? (
          <div className='flex gap-[60px]'>
            <div className='w-[320px] h-[320px] rounded-xl object-cover bg-light-gray animate-pulse'></div>
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
            <div className={`flex gap-[10px] md:gap-[60px] flex-wrap`}>
              <div
                className={`flex transition-all justify-center md:max-w-[320px] ${
                  open ? 'w-full md:w-2/5' : 'w-[130px] md:w-2/5'
                }`}>
                <div className='max-w-[130px] md:max-w-[320px] relative flex-1'>
                  <div className='border-[3px] md:border-none border-second-color p-[2px] aspect-square rounded-full md:rounded-xl object-contain bg-light-gray overflow-hidden'>
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
                      />
                    </div>
                    <Image
                      src={preview || profile.data.picture || NoImg}
                      height={360}
                      width={360}
                      alt=''
                      className='h-full w-full object-cover rounded-full md:rounded-xl'
                    />
                  </div>
                </div>
              </div>
              <div className='flex-[1_0_180px] flex flex-col justify-between'>
                <div>
                  <div className='flex'>
                    <div
                      className={`inline-block text-medium-gray transition-all md:font-bold text-sm md:text-base leading-[18px] md:leading-10 ${
                        open ? 'w-[88px] md:w-[130px] opacity-100 md:leading-6' : 'w-0 h-0 opacity-0'
                      }`}>
                      {t('Username')}:
                    </div>
                    <div
                      className={`text-black md:text-second-color transition-all leading-[18px] md:leading-10 ${
                        open
                          ? 'text-sm md:text-base font-extrabold mb-0 md:leading-6'
                          : 'text-sm md:text-[32px] font-semibold md:font-extrabold md:mb-4 '
                      }`}>
                      {profile.data.nickname}
                    </div>
                  </div>
                  <div className={`flex ${open ? 'mt-[10px] md:mt-2' : ''}`}>
                    <div
                      className={`inline-block text-medium-gray transition-all md:font-bold text-sm md:text-base leading-[18px] md:leading-10 ${
                        open ? 'w-[88px] md:w-[130px] opacity-100 md:leading-6' : 'w-0 h-0 opacity-0'
                      }`}>
                      {t('Email')}:
                    </div>
                    <div
                      className={`transition-all text-sm md:text-base leading-[18px] md:leading-5 ${
                        open
                          ? 'mb-0 text-[#0F4072] md:text-black md:leading-6'
                          : 'mb-[2px] md:mb-[8px] text-[#0F4072] md:text-second-color'
                      }`}>
                      {profile.data.email}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col gap-[10px] md:gap-4 font-medium transition-all ${
                      !open ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100 md:h-24 mt-[10px] md:my-4'
                    }`}>
                    <div className='flex items-center'>
                      <div
                        className={`inline-block text-medium-gray transition-all md:font-bold text-sm md:text-base leading-[18px] md:leading-10 ${
                          open ? 'w-[88px] md:w-[130px] opacity-100' : 'w-[0px] opacity-0'
                        }`}>
                        {t('DOB')}:
                      </div>
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
                    </div>
                    <div className='flex items-center'>
                      <div
                        className={`inline-block text-medium-gray transition-all md:font-bold text-sm md:text-base leading-[18px] md:leading-10 ${
                          open ? 'w-[88px] md:w-[130px] opacity-100' : 'w-[0px] opacity-0'
                        }`}>
                        {t('Gender')}:
                      </div>
                      <div>
                        <Select
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
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  {(!!profile.data.birthdate || profile.data.gender) && (
                    <div
                      className={`flex gap-[30px] font-medium  transition-all ${
                        open ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100 md:mb-4'
                      }`}>
                      {profile.data.birthdate && (
                        <div className='text-xs md:text-base md:leading-5'>
                          {moment(profile.data.birthdate).format('DD/MM/yyyy')}
                        </div>
                      )}
                      {profile.data.gender && (
                        <div className='text-xs md:text-base md:leading-5 capitalize flex'>
                          {t(profile.data.gender)}{' '}
                          <Image
                            className='h-[14px] w-[14px] md:h-[20px] md:w-[20px]'
                            src={profile.data.gender.toLowerCase() == 'male' ? MaleIcon : FemaleIcon}
                            alt=''
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {profile.data.bio && (
                    <div
                      className={`font-medium transition-all overflow-hidden flex flex-col ${
                        open ? 'opacity-0 h-0' : 'opacity-100 text-sm md:text-base mt-[6px]'
                      }`}>
                      <label className='text-medium-gray text-xs leading-[15px] md:text-base'>{t('Bio')}:</label>
                      <p
                        className={`${showMore ? '' : 'line-clamp-3 cursor-pointer'}`}
                        onClick={() => setShowMore(!showMore)}>
                        {profile.data.bio}
                      </p>
                    </div>
                  )}
                  <div
                    className={`flex transition-all overflow-hidden items-center ${
                      !open ? 'opacity-0 h-0' : 'opacity-100 mt-[10px] md:mt-0'
                    }`}>
                    <div className='text-medium-gray min-w-[88px] md:min-w-[130px] text-sm md:text-base md:font-bold md:self-start'>
                      {t('Bio')}:
                    </div>
                    <AutoGrowingTextField
                      value={bio}
                      onChange={setBio}
                      placeholder={t('Write something about yourself')}
                      className='text-sm font-normal md:font-bold leading-6 min-h-[52px] flex-1 max-w-[calc(100vw-128px)] max-h-[150px] md:min-h-[72px] rounded-lg'
                    />
                  </div>
                </div>
                <div className='relative mt-[10px] md:mt-4 h-[19px] md:h-[48px]'>
                  <div
                    className={`flex gap-2 md:gap-6 absolute top-0 transition-all ${
                      open ? 'left-1/2 -translate-x-1/2 opacity-0 pointer-events-none' : 'left-[0%] opacity-100 '
                    }`}>
                    <>
                      <OutlineButton className='md:hidden' size='xs' onClick={() => setOpen(!open)}>
                        {t('Edit profile')}
                      </OutlineButton>
                      <OutlineButton className='hidden md:flex' size='lg' onClick={() => setOpen(!open)}>
                        {t('Edit profile')}
                      </OutlineButton>
                    </>
                    {profile.data?.signup_methods?.includes('basic_auth') ? (
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
                    className={`gap-6 absolute top-0 transition-all ${
                      open
                        ? 'right-1/2 translate-x-1/2 opacity-100 md:right-0 md:translate-x-0'
                        : 'right-1/2 opacity-0 translate-x-1/2 pointer-events-none'
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
          <div className='grid gap-x-3 md:gap-x-24 gap-y-5 md:gap-y-10 grid-cols-3 md:grid-cols-2 xl:grid-cols-3'>
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
      <SettingPasswordModal open={settingPasswordModalOpen} setOpen={setSettingPasswordModalOpen} profile={profile} />
      <ChangingPasswordModal open={changingPasswordModalOpen} setOpen={setChangingPasswordModalOpen} />
    </>
  )
}
