import Image from 'next/image'
import Frame from './assets/frame.svg'
import AvataBackground from './assets/avatar-background.svg'
import SaveButtonBg from './assets/save-button-bg.svg'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import NoImg from 'images/avatar.svg'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import vi from 'date-fns/locale/vi'
import moment from 'moment'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Select from 'components/Select'
import EditIcon from 'images/icons/edit-circle.svg'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import OtherIcon from 'images/icons/other-gender.svg'
import Bg2 from './assets/bg2.svg'
import AutoGrowingTextField from 'components/Input/TextField/AutoGrowing'
import SettingPasswordModal from 'components/pages/profile/settingPasswordModal'
import ChangingPasswordModal from 'components/pages/profile/changingPasswordModal'
export default function Info({ updateProfile }) {
  const { account, getProfile } = useContext(Context)
  const { t } = useTranslation()
  const [preview, setPreview] = useState()
  const { locale } = useRouter()
  const [birthdate, setBirthdate] = useState(null)
  const profilePicture = useRef()
  const [gender, setGender] = useState<{ key: string | number; value: string }>(null)
  const [open, setOpen] = useState(false)
  const [bio, setBio] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [settingPasswordModalOpen, setSettingPasswordModalOpen] = useState(false)
  const [changingPasswordModalOpen, setChangingPasswordModalOpen] = useState(false)
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
        className='relative w-full cursor-default bg-white py-[1px] md:py-[4px] pl-[10px] pr-[57px] text-left text-[#61646B] 
        focus:outline-none md:font-bold text-sm rounded-lg 
        border-[1px] border-medium-gray'
        onClick={onClick}
        ref={ref}>
        {value ? (
          moment(value).format('DD/MM/yyyy')
        ) : (
          <span className='text-medium-gray text-sm leading-[18px] font-normal'>{t('dd/mm/yyyy')}</span>
        )}
        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center h-full mr-[10px]'>
          <ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />
        </span>
      </button>
    )
  })
  return (
    <>
      <div className='relative w-[32%] aspect-[519/595]'>
        <Image src={Frame} alt='' className='absolute inset-0 w-full h-full' />
        <div className='top-[5.5%] left-[9.25%] right-[4.5%] absolute grid grid-cols-2 items-end gap-[7px]'>
          <div className='w-full aspect-square'>
            <div className='h-full w-full p-2 relative'>
              <Image src={AvataBackground} alt='' className='absolute inset-0' />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                width='220'
                height='220'
                viewBox='0 0 220 220'
                className='relative z-10 w-full h-full'
                fill='none'>
                <path
                  d='M2.92893 15.9552L15.9552 2.92893C17.8306 1.05357 20.3741 0 23.0262 0H196.974C199.626 0 202.169 1.05357 204.045 2.92893L217.071 15.9552C218.946 17.8306 220 20.3741 220 23.0262V196.974C220 199.626 218.946 202.169 217.071 204.045L204.045 217.071C202.169 218.946 199.626 220 196.974 220H23.0263C20.3741 220 17.8306 218.946 15.9552 217.071L2.92893 204.045C1.05357 202.169 0 199.626 0 196.974V23.0263C0 20.3741 1.05357 17.8306 2.92893 15.9552Z'
                  fill='url(#pattern0)'
                />
                <defs>
                  <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
                    <use xlinkHref='#image0_3971_11276' transform='scale(0.000488281)' />
                  </pattern>
                  <image
                    id='image0_3971_11276'
                    width='2048'
                    height='2048'
                    xlinkHref={preview || account.image || NoImg}
                  />
                </defs>
              </svg>
            </div>
          </div>
          <div className='flex justify-between flex-col w-full h-full'>
            <div className='mt-[10%] flex flex-col gap-[5px]'>
              {account.email && (
                <div className='flex items-center gap-[5px]'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M3.63251 5.17157C2.46094 6.34315 2.46094 8.22876 2.46094 12C2.46094 15.7712 2.46094 17.6569 3.63251 18.8284C4.80408 20 6.6897 20 10.4609 20H14.4609C18.2322 20 20.1178 20 21.2894 18.8284C22.4609 17.6569 22.4609 15.7712 22.4609 12C22.4609 8.22876 22.4609 6.34315 21.2894 5.17157C20.1178 4 18.2322 4 14.4609 4H10.4609C6.6897 4 4.80408 4 3.63251 5.17157ZM19.0371 7.51986C19.3023 7.83807 19.2593 8.31099 18.9411 8.57617L16.7446 10.4066C15.8582 11.1452 15.1398 11.7439 14.5058 12.1517C13.8453 12.5765 13.202 12.8449 12.4609 12.8449C11.7199 12.8449 11.0766 12.5765 10.4161 12.1517C9.78205 11.7439 9.06365 11.1452 8.17729 10.4066L5.9808 8.57617C5.66259 8.31099 5.6196 7.83807 5.88477 7.51986C6.14994 7.20165 6.62287 7.15866 6.94108 7.42383L9.09997 9.22291C10.0329 10.0004 10.6807 10.5384 11.2275 10.8901C11.7569 11.2306 12.1159 11.3449 12.4609 11.3449C12.806 11.3449 13.165 11.2306 13.6944 10.8901C14.2412 10.5384 14.8889 10.0004 15.8219 9.22291L17.9808 7.42383C18.299 7.15866 18.7719 7.20165 19.0371 7.51986Z'
                      fill='#414141'
                    />
                  </svg>
                  <div className='text-[#2684FC] font-medium text-ellipsis max-w-[50%] overflow-hidden'>
                    {account.email}
                  </div>
                </div>
              )}
              <div className='flex gap-[5px] items-center'>
                <div className='p-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='20' viewBox='0 0 18 20' fill='none'>
                    <path
                      d='M9.46094 5.49951C10.5659 5.49951 11.4609 4.60452 11.4609 3.49949C11.4609 3.12449 11.3559 2.76951 11.1759 2.46951L10.3269 0.999208C9.94201 0.332621 8.97986 0.332621 8.59495 0.999208L7.74594 2.46951C7.56594 2.76951 7.46094 3.12449 7.46094 3.49949C7.46094 4.60452 8.35596 5.49951 9.46094 5.49951Z'
                      fill='#414141'
                    />
                    <path
                      d='M15.1198 8.38262H11.3413C10.8215 8.38262 10.4001 7.96123 10.4001 7.44143C10.4001 6.92163 9.97601 6.50024 9.4562 6.50024C8.9364 6.50024 8.51227 6.92163 8.51227 7.44143C8.51227 7.96123 8.09089 8.38262 7.57109 8.38262H3.7927C2.2305 8.38262 0.960938 9.64849 0.960938 11.2062V12.6556C0.960938 13.672 1.79157 14.5002 2.81101 14.5002C3.30657 14.5002 3.76907 14.3073 4.11835 13.9591L5.43308 12.6512C5.82318 12.2631 6.45348 12.2631 6.84358 12.6512L8.15361 13.9543C8.85213 14.6508 10.0698 14.6508 10.7683 13.9543L12.083 12.6495C12.4732 12.2623 13.1029 12.2626 13.4927 12.6504L14.8035 13.9543C15.1528 14.3026 15.6153 14.4955 16.1109 14.4955C17.1303 14.4955 17.9609 13.6673 17.9609 12.6508V11.2062C17.9515 9.64849 16.682 8.38262 15.1198 8.38262Z'
                      fill='#414141'
                    />
                    <path
                      d='M13.8007 14.4105L12.7854 13.5007L11.7654 14.4105C10.5329 15.5148 8.3796 15.5148 7.1471 14.4105L6.13178 13.5007L5.11178 14.4105C4.50261 14.9647 3.68568 15.2694 2.81204 15.2694C2.1273 15.2694 1.4898 15.0747 0.960938 14.7489V18.6545C0.960938 19.1199 1.38594 19.5007 1.90537 19.5007H17.0165C17.5359 19.5007 17.9609 19.1199 17.9609 18.6545V14.749C17.432 15.0748 16.7993 15.2694 16.1098 15.2694C15.2362 15.2694 14.4193 14.9648 13.8007 14.4105Z'
                      fill='#414141'
                    />
                  </svg>
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
                  <div className='text-xs text-[#19191B] font-medium leading-[15px] md:text-sm md:leading-[18px]'>
                    {moment(account.birthdate).format('DD/MM/yyyy')}
                  </div>
                )}
              </div>
              <div className='flex gap-[5px] items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M15.2824 10.2152V11.5661C13.1076 12.0076 11.4707 13.9304 11.4707 16.2355C11.4707 18.8669 13.6039 21.0002 16.2354 21.0002C18.8668 21.0002 21.0001 18.8669 21.0001 16.2355C21.0001 14.0058 19.4685 12.1339 17.4001 11.6142V10.2152L17.922 10.7371C18.3355 11.1505 19.0059 11.1505 19.4193 10.7371C19.8329 10.3235 19.8329 9.65315 19.4193 9.23966L17.5392 7.35947C16.8776 6.69788 15.8049 6.69788 15.1433 7.35947L13.2632 9.23966C12.8497 9.65315 12.8497 10.3235 13.2632 10.7371C13.6767 11.1505 14.3471 11.1505 14.7606 10.7371L15.2824 10.2152ZM16.3413 13.6021C16.2846 13.6021 16.229 13.5977 16.1748 13.5891C14.7408 13.6213 13.5883 14.7938 13.5883 16.2355C13.5883 17.6974 14.7735 18.8825 16.2354 18.8825C17.6973 18.8825 18.8824 17.6974 18.8824 16.2355C18.8824 14.8451 17.8104 13.705 16.4478 13.5968C16.4128 13.6003 16.3772 13.6021 16.3413 13.6021Z'
                    fill='#414141'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M12.5294 7.76468C12.5294 10.0524 10.9171 11.9635 8.76683 12.4238V14.0685H9.6629C10.2477 14.0685 10.7217 14.5425 10.7217 15.1273C10.7217 15.7121 10.2477 16.1861 9.6629 16.1861H8.76683V16.9045C8.76683 17.4893 8.29277 17.9634 7.70801 17.9634C7.12325 17.9634 6.64919 17.4893 6.64919 16.9045V16.1861H5.75284C5.16808 16.1861 4.69402 15.7121 4.69402 15.1273C4.69402 14.5425 5.16808 14.0685 5.75284 14.0685H6.64919V12.3981C4.55587 11.8959 3 10.012 3 7.76468C3 5.13322 5.13322 3 7.76468 3C10.3961 3 12.5294 5.13322 12.5294 7.76468ZM7.76468 10.4117C9.22661 10.4117 10.4117 9.22661 10.4117 7.76468C10.4117 6.30275 9.22661 5.11763 7.76468 5.11763C6.30275 5.11763 5.11763 6.30275 5.11763 7.76468C5.11763 9.22661 6.30275 10.4117 7.76468 10.4117Z'
                    fill='#414141'
                  />
                </svg>
                <div>
                  {open ? (
                    <div className='[&_button]:!py-0 [&_button]:!h-[30px]'>
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
              </div>
            </div>
            <div className='relative'>
              <Image src={SaveButtonBg} alt='' className='w-full' />
              <div
                className='absolute inset-0 grid place-items-center text-second-color font-semibold cursor-pointer'
                onClick={() => (!open ? setOpen(true) : updateProfileHandler())}>
                {open ? 'Save' : 'Edit profile'}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[5.5%] w-[41.6%] aspect-square'></div>
        <div className='ml-[9.25%] relative'>
          <Image src={Bg2} alt='' className='w-[94.75%]' />
          <div className='absolute top-[45%] left-[4.5%] font-orbitron font-extrabold text-2xl'>{account.name}</div>
        </div>
        <div className='mt-[6%] ml-[7%] w-[78%] relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='406'
            height='167'
            viewBox='0 0 406 167'
            fill='none'
            className='w-full h-full absolute inset-0'>
            <path
              d='M31.4609 1H11.532C10.2059 1 8.93415 1.52678 7.99647 2.46447L2.9254 7.53554C1.98772 8.47322 1.46094 9.74499 1.46094 11.0711V146.429C1.46094 147.755 1.98772 149.027 2.9254 149.964L17.4965 164.536C18.4342 165.473 19.7059 166 21.032 166H368.39C369.716 166 370.988 165.473 371.925 164.536L403.996 132.464C404.934 131.527 405.461 130.255 405.461 128.929V6C405.461 3.23858 403.222 1 400.461 1H65.4609'
              stroke='#ABABAB'
            />
          </svg>
          <div className='absolute -top-[6%] left-[9.5%] text-sm'>{t('Bio')}</div>
          <div className='relative z-10'>
            {open ? (
              <AutoGrowingTextField
                value={bio}
                onChange={setBio}
                placeholder={t('Write something about yourself')}
                className='text-sm text-[#61646B] font-normal md:font-bold leading-6 !py-3 !px-5 w-full aspect-[15/6] border-none'
              />
            ) : (
              <div className='text-sm text-[#61646B] font-normal md:font-bold leading-6 !py-3 !px-5 w-full aspect-[15/6] border-none overflow-auto'>
                {account.bio}
              </div>
            )}
          </div>
        </div>
        <div className='relative cursor-pointer ml-[7%] mt-[3.5%] w-[35%]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='192'
            height='58'
            viewBox='0 0 192 58'
            fill='none'
            className='w-full aspect-[192/58] h-full'>
            <path
              d='M1.46094 23.8579V11C1.46094 5.47715 5.93809 1 11.4609 1H172.319C174.971 1 177.515 2.05357 179.39 3.92893L188.39 12.9289C192.295 16.8342 192.295 23.1658 188.39 27.0711L161.39 54.0711C159.515 55.9464 156.971 57 154.319 57H34.6031C31.9509 57 29.4074 55.9464 27.532 54.0711L4.38987 30.9289C2.51451 29.0536 1.46094 26.51 1.46094 23.8579Z'
              stroke='#1FAB5E'
            />
          </svg>
          <div
            className='absolute inset-0 grid place-items-center text-second-color font-semibold whitespace-nowrap'
            onClick={() =>
              account?.signupMethods?.includes('basic_auth')
                ? setChangingPasswordModalOpen(true)
                : setSettingPasswordModalOpen(true)
            }>
            {account?.signupMethods?.includes('basic_auth') ? 'Change password' : 'Set password'}
          </div>
        </div>
        <div className='font-orbitron absolute bottom-[11%] right-[23%]'>Level:</div>
        <div className='p-[10px] items-center justify-center font-orbitron absolute bottom-[1.2%] right-[1%] text-lg font-black flex w-[20%] aspect-square rounded-full bg-[conic-gradient(#1fab5e_267deg,white_0deg)]'>
          <div className='bg-white p-1 rounded-full w-full h-full'>
            <div className='border-[length:2px] border-black aspect-square w-fit h-full rounded-full grid place-items-center'>
              <div className='flex flex-col justify-center items-center'>
                <div className='text-second-color font-bold text-[32px]'>12</div>
                <div className='text-xs'>222 xp</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SettingPasswordModal open={settingPasswordModalOpen} setOpen={setSettingPasswordModalOpen} profile={account} />
      <ChangingPasswordModal open={changingPasswordModalOpen} setOpen={setChangingPasswordModalOpen} />
    </>
  )
}
