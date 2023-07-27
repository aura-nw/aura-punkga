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

export default function Profile({ profile, subscribeList, unsubscribe, subscribe, curentlyReading, updateProfile }) {
  const { account, isSettingUp } = useContext(Context)
  const [birthdate, setBirthdate] = useState(null)
  const profilePicture = useRef()
  const [gender, setGender] = useState<{ key: string | number; value: string }>(null)
  const [open, setOpen] = useState(false)
  const [bio, setBio] = useState(null)
  const router = useRouter()
  const [settingPasswordModalOpen, setSettingPasswordModalOpen] = useState(false)
  const [changingPasswordModalOpen, setChangingPasswordModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isSettingUp) {
      if (!account?.verified) {
        router.push('/')
      }
    }
  }, [isSettingUp, account?.verified])

  useEffect(() => {
    if (profile.data) {
      setGender({ key: profile.data.gender, value: profile.data.gender })
      setBirthdate(profile.data.birthdate ? new Date(profile.data.birthdate).getTime() : undefined)
      setBio(profile.data.bio)
    }
  }, [profile.data])

  const updateProfileHandler = async () => {
    const form = new FormData()
    form.append('zc', 'ác')
    if (gender.key && gender.key != profile.data.gender) {
      form.append('gender', gender.key as string)
    }
    if (birthdate && new Date(profile.data.birthdate).getTime() != new Date(birthdate).getTime()) {
      form.append('birthdate', moment(birthdate).format('yyyy-MM-DD') as string)
    }
    if (bio && profile.data.bio != bio) {
      form.append('bio', bio)
    }
    if ((profilePicture.current as any).files[0]) {
      form.append('picture', (profilePicture.current as any).files[0])
    }
    if (Object.keys(Object.fromEntries(form)).length) {
      setLoading(true)
      const res = await updateProfile(form)
      await profile.callApi(true)
    }
    setLoading(false)
    setOpen(false)
  }

  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
    return (
      <button
        className='relative w-full cursor-default rounded-[12px] bg-white py-[3px] pl-[13px] pr-[57px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-medium-gray focus:outline-none focus:ring-2 sm:text-sm sm:leading-6 lg:h-10 font-bold'
        onClick={onClick}
        ref={ref}>
        {value ? moment(value).format('DD/MM/yyyy') : <span className='text-medium-gray'>Click to change</span>}
        <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
          <ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />
        </span>
      </button>
    )
  })

  if (!profile.data) return <></>

  return (
    <>
      <Header />
      <div className='pk-container py-5 px-2 md:px-0'>
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
          <div className='flex gap-5 md:gap-[60px]'>
            <div className='w-2/5 md:w-[320px] relative self-baseline'>
              <div className=' aspect-square rounded-full md:rounded-xl object-contain bg-light-gray  overflow-hidden '>
                <div
                  className={`aspect-square transition-all bg-medium-gray duration-300 absolute inset-0 opacity-0 flex flex-col justify-center items-center cursor-pointer ${
                    open ? 'hover:opacity-40' : 'hidden'
                  }`}>
                  <CloudArrowUpIcon className='w-10 h-10' />
                  <div className='text-xl font-semibold'>Upload profile picture</div>
                  <input ref={profilePicture} type='file' className='bg-black absolute inset-0 opacity-0' />
                </div>
                <Image
                  src={profile.data.picture || NoImg}
                  height={360}
                  width={360}
                  alt=''
                  className='h-full w-full object-cover'
                />
              </div>
              <FilledButton
                className={`md:hidden mt-3 w-full ${open ? 'opacity-100' : 'opacity-0'}`}
                size='xs'
                onClick={updateProfileHandler}>
                Save
              </FilledButton>
            </div>
            <div className='flex flex-col md:justify-between w-full md:w-1/2'>
              <div>
                <div className='flex'>
                  <div
                    className={`inline-block text-medium-gray transition-all  ${
                      open ? 'w-[88px] md:w-[100px] opacity-100 font-bold text-sm md:text-base' : 'w-[0px] opacity-0'
                    }`}>
                    Username:
                  </div>
                  <p
                    className={` text-second-color transition-all ${
                      open
                        ? 'text-sm md:text-base font-bold mb-0'
                        : 'text-sm md:text-[32px] md:leading-10 font-extrabold  mb-1 md:mb-4 '
                    }`}>
                    {profile.data.nickname}
                  </p>
                </div>
                <div className='flex'>
                  <div
                    className={`inline-block text-medium-gray transition-all  ${
                      open ? 'w-[88px] md:w-[100px] opacity-100 font-bold text-sm md:text-base' : 'w-[0px] opacity-0'
                    }`}>
                    Email:
                  </div>
                  <p
                    className={` text-second-color transition-all ${
                      open
                        ? 'text-sm md:text-base font-bold mb-0'
                        : 'text-sm md:text-[32px] md:leading-10 font-extrabold  mb-1 md:mb-4 '
                    }`}>
                    {profile.data.email}
                  </p>
                </div>
                <div
                  className={`flex flex-col gap-2 md:gap-4 font-medium transition-all ${
                    !open ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100 h-[76px] md:h-24 md:mb-2 mt-1 md:mt-2'
                  }`}>
                  <div className='flex items-center'>
                    <div
                      className={`inline-block text-medium-gray transition-all  ${
                        open ? 'w-[88px] md:w-[100px] opacity-100 font-bold text-sm md:text-base' : 'w-[0px] opacity-0'
                      }`}>
                      DOB:
                    </div>
                    <div>
                      <DatePicker
                        selected={birthdate}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        onChange={(date) => setBirthdate(date)}
                        customInput={<CustomInput />}
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div
                      className={`inline-block text-medium-gray transition-all  ${
                        open ? 'w-[88px] md:w-[100px] opacity-100 font-bold text-sm md:text-base' : 'w-[0px] opacity-0'
                      }`}>
                      Gender:
                    </div>
                    <div>
                      <Select
                        selected={gender}
                        onChange={setGender}
                        className='font-bold'
                        placeholder='Select a gender'
                        icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                        options={[
                          {
                            key: 'Male',
                            value: 'Male',
                          },
                          {
                            key: 'Female',
                            value: 'Female',
                          },
                          {
                            key: 'Undisclosed',
                            value: 'Undisclosed',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                {(!!profile.data.birthdate || profile.data.gender) && (
                  <div
                    className={`flex gap-[30px] font-medium  transition-all ${
                      open ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100 h-6 md:mb-2'
                    }`}>
                    {profile.data.birthdate && (
                      <div className='text-xs md:text-base'>{moment(profile.data.birthdate).format('DD/MM/yyyy')}</div>
                    )}
                    {profile.data.gender && (
                      <div className='text-xs md:text-base capitalize'>{profile.data.gender}</div>
                    )}
                  </div>
                )}
                {profile.data.bio && (
                  <div
                    className={`font-medium transition-all overflow-hidden ${
                      open ? 'opacity-0 h-0' : 'opacity-100 h-[80px] text-sm md:text-base'
                    }`}>
                    <label className='text-medium-gray text-sm md:text-base'>Bio:</label>
                    <p>{profile.data.bio}</p>
                  </div>
                )}
                <div
                  className={`flex transition-all md:mt-2 overflow-hidden ${
                    !open ? 'opacity-0 h-0 ' : 'opacity-100 h-[80px]'
                  }`}>
                  <label className='text-medium-gray font-bold min-w-[88px] md:min-w-[100px] flex-auto pt-[7px] text-sm md:text-base'>
                    Bio:
                  </label>
                  <AutoGrowingTextField
                    value={bio}
                    onChange={setBio}
                    placeholder='Write something about yourself '
                    className='text-sm font-bold leading-6'
                  />
                </div>
              </div>
              <div className='relative mt-5 md:mt-0'>
                <div
                  className={`flex gap-2 md:gap-6 absolute bottom-0 transition-all ${
                    open ? 'left-1/2 -translate-x-1/2 opacity-0 pointer-events-none' : 'left-[0%] opacity-100 '
                  }`}>
                  <>
                    <OutlineButton className='md:hidden' size='sm' onClick={() => setOpen(!open)}>
                      Edit profile
                    </OutlineButton>
                    <OutlineButton className='hidden md:flex' size='lg' onClick={() => setOpen(!open)}>
                      Edit profile
                    </OutlineButton>
                  </>
                  {profile.data?.signup_methods?.includes('basic_auth') ? (
                    <>
                      <OutlineButton className='md:hidden' onClick={() => setChangingPasswordModalOpen(true)} size='sm'>
                        Change password
                      </OutlineButton>
                      <OutlineButton
                        className='hidden md:flex'
                        onClick={() => setChangingPasswordModalOpen(true)}
                        size='lg'>
                        Change password
                      </OutlineButton>
                    </>
                  ) : (
                    <>
                      <OutlineButton className='md:hidden' onClick={() => setSettingPasswordModalOpen(true)} size='sm'>
                        Set password
                      </OutlineButton>
                      <OutlineButton
                        className='hidden md:flex'
                        onClick={() => setSettingPasswordModalOpen(true)}
                        size='lg'>
                        Set password
                      </OutlineButton>
                    </>
                  )}
                </div>
                <div
                  className={`gap-6 absolute bottom-0 transition-all hidden md:flex ${
                    open ? 'right-[0%]  opacity-100' : 'right-1/2 opacity-0 translate-x-1/2 pointer-events-none'
                  }`}>
                  <OutlineButton loading={loading} size='lg' onClick={updateProfileHandler}>
                    Save
                  </OutlineButton>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='mt-5 md:mt-[100px]'>
          {!!(isSettingUp || curentlyReading.loading || curentlyReading.data?.length) && (
            <p className='text-sm md:text-2xl leading-6 font-extrabold mb-2 md:mb-10'>Currently reading</p>
          )}
          <div className='grid gap-x-3 md:gap-x-24 gap-y-5 md:gap-y-10 grid-cols-3 md:grid-cols-2 xl:grid-cols-3'>
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
            <p className='text-sm md:text-2xl leading-6 font-extrabold mb-2 md:mb-10'>Subscribe list</p>
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
