import { ChevronDownIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import AutoGrowingTextField from 'components/Input/TextField/AutoGrowing'
import Select from 'components/Select'
import ChangingPasswordModal from 'components/pages/profile/changingPasswordModal'
import SettingPasswordModal from 'components/pages/profile/settingPasswordModal'
import vi from 'date-fns/locale/vi'
import NoImg from 'images/avatar.svg'
import EditIcon from 'images/icons/edit-circle.svg'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import OtherIcon from 'images/icons/other-gender.svg'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
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
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile) as any
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

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

  const onSelectFile = (e) => {
    if (!e.target?.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
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
      <div className='w-full'>
        <div className=''>
          <div className='px-[30px] md:px-10 pt-[10px] pb-[10px] md:pb-[30px] bg-[#F2F2F2] rounded-2xl flex gap-[10px] md:gap-5 relative items-center flex-col md:flex-row md:items-start mt-[70px] md:mt-0'>
            {open ? (
              <div
                className='flex items-center gap-[3px] absolute top-3 right-3 cursor-pointer bg-primary-color rounded-[10px] px-[10px] py-[5px]'
                onClick={updateProfileHandler}>
                <svg xmlns='http://www.w3.org/2000/svg' width='14' height='13' viewBox='0 0 14 13' fill='none'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M13.6382 0.905544C14.1206 1.44627 14.1206 2.32296 13.6382 2.86368L5.4029 12.0945C4.92049 12.6352 4.13834 12.6352 3.65593 12.0945L0.361809 8.40215C-0.120603 7.86142 -0.120603 6.98473 0.361809 6.444C0.844222 5.90328 1.62637 5.90328 2.10878 6.444L4.52941 9.15724L11.8912 0.905544C12.3736 0.364819 13.1558 0.364819 13.6382 0.905544Z'
                    fill='#414141'
                  />
                </svg>
                <div className='font-semibold text-lg leading-[23px] text-[#414141]'>Save</div>
              </div>
            ) : (
              <div className='absolute top-3 right-3 cursor-pointer flex gap-2 [&>.buttons]:hover:block z-10'>
                <div className='border bg-white border-[#ABABAB] rounded-[10px] hidden buttons overflow-hidden'>
                  <div
                    onClick={() => setOpen(true)}
                    className='py-[5px] px-[10px] text-center font-semibold leading-5 border-b border-[#ABABAB] text-[#ABABAB] hover:bg-primary-color hover:text-[#414141]'>
                    Edit profile
                  </div>
                  <div
                    className='py-[5px] px-[10px] text-center font-semibold leading-5 text-[#ABABAB] hover:bg-primary-color hover:text-[#414141]'
                    onClick={() =>
                      account?.signupMethods?.includes('basic_auth')
                        ? setChangingPasswordModalOpen(true)
                        : setSettingPasswordModalOpen(true)
                    }>
                    {account?.signupMethods?.includes('basic_auth') ? 'Change password' : 'Set password'}
                  </div>
                </div>
                <svg xmlns='http://www.w3.org/2000/svg' width='33' height='34' viewBox='0 0 33 34' fill='none'>
                  <path
                    d='M12 17C12 17.8284 11.3284 18.5 10.5 18.5C9.67157 18.5 9 17.8284 9 17C9 16.1716 9.67157 15.5 10.5 15.5C11.3284 15.5 12 16.1716 12 17Z'
                    fill='#ABABAB'
                  />
                  <path
                    d='M18 17C18 17.8284 17.3284 18.5 16.5 18.5C15.6716 18.5 15 17.8284 15 17C15 16.1716 15.6716 15.5 16.5 15.5C17.3284 15.5 18 16.1716 18 17Z'
                    fill='#ABABAB'
                  />
                  <path
                    d='M22.5 18.5C23.3284 18.5 24 17.8284 24 17C24 16.1716 23.3284 15.5 22.5 15.5C21.6716 15.5 21 16.1716 21 17C21 17.8284 21.6716 18.5 22.5 18.5Z'
                    fill='#ABABAB'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.5861 0.875H16.4139C12.9514 0.874982 10.2378 0.874967 8.12056 1.15962C5.95345 1.45098 4.24342 2.05899 2.90121 3.40121C1.55899 4.74342 0.95098 6.45345 0.659621 8.62056C0.374967 10.7378 0.374982 13.4513 0.375 16.9139V17.0861C0.374982 20.5486 0.374967 23.2622 0.659621 25.3794C0.95098 27.5465 1.55899 29.2566 2.90121 30.5988C4.24342 31.941 5.95345 32.549 8.12056 32.8404C10.2378 33.125 12.9513 33.125 16.4139 33.125H16.5861C20.0487 33.125 22.7622 33.125 24.8794 32.8404C27.0465 32.549 28.7566 31.941 30.0988 30.5988C31.441 29.2566 32.049 27.5465 32.3404 25.3794C32.625 23.2622 32.625 20.5487 32.625 17.0861V16.9139C32.625 13.4513 32.625 10.7378 32.3404 8.62056C32.049 6.45345 31.441 4.74342 30.0988 3.40121C28.7566 2.05899 27.0465 1.45098 24.8794 1.15962C22.7622 0.874967 20.0486 0.874982 16.5861 0.875ZM4.4922 4.9922C5.34668 4.13771 6.50276 3.64737 8.42037 3.38956C10.3703 3.12739 12.9327 3.125 16.5 3.125C20.0673 3.125 22.6297 3.12739 24.5796 3.38956C26.4972 3.64737 27.6533 4.13771 28.5078 4.9922C29.3623 5.84668 29.8526 7.00276 30.1104 8.92037C30.3726 10.8703 30.375 13.4327 30.375 17C30.375 20.5673 30.3726 23.1297 30.1104 25.0796C29.8526 26.9972 29.3623 28.1533 28.5078 29.0078C27.6533 29.8623 26.4972 30.3526 24.5796 30.6104C22.6297 30.8726 20.0673 30.875 16.5 30.875C12.9327 30.875 10.3703 30.8726 8.42037 30.6104C6.50276 30.3526 5.34668 29.8623 4.4922 29.0078C3.63771 28.1533 3.14737 26.9972 2.88956 25.0796C2.62739 23.1297 2.625 20.5673 2.625 17C2.625 13.4327 2.62739 10.8703 2.88956 8.92037C3.14737 7.00276 3.63771 5.84668 4.4922 4.9922Z'
                    fill='#ABABAB'
                  />
                </svg>
              </div>
            )}
            <div className='relative w-[140px] shrink-0 h-[140px] -mt-[70px] md:mt-0'>
              <Image
                src={preview || account.image || NoImg.src}
                alt=''
                width={140}
                height={140}
                className='w-full h-full rounded-full'
              />
              {open && (
                <>
                  <Image src={EditIcon} alt='' className='absolute bottom-3 right-3' />
                  <div
                    className={`aspect-square rounded-full w-full transition-all bg-medium-gray duration-300 absolute top-0 right-[1.5px] opacity-0 flex flex-col justify-center items-center cursor-pointer hover:opacity-40`}>
                    <CloudArrowUpIcon className='w-10 h-10' />
                    <input
                      ref={profilePicture}
                      onChange={onSelectFile}
                      type='file'
                      className='bg-black absolute inset-0 opacity-0'
                      id='change-profile-picture-input'
                    />
                  </div>
                </>
              )}
            </div>
            <div className='md:w-[calc(100%_-_160px)] w-full flex flex-col items-center md:block'>
              <div className='text-2xl md:text-[40px] text-[#1C1C1C] font-bold leading-[30px] md:leading-[50px]'>
                {account.name}
              </div>
              <div className='flex items-center gap-[2px] md:gap-[10px] flex-wrap mt-[10px] md:mt-0 flex-col md:flex-row min-w-[290px]'>
                <div className='flex items-center gap-[5px] w-full md:w-auto'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M3.67157 5.17157C2.5 6.34315 2.5 8.22876 2.5 12C2.5 15.7712 2.5 17.6569 3.67157 18.8284C4.84315 20 6.72876 20 10.5 20H14.5C18.2712 20 20.1569 20 21.3284 18.8284C22.5 17.6569 22.5 15.7712 22.5 12C22.5 8.22876 22.5 6.34315 21.3284 5.17157C20.1569 4 18.2712 4 14.5 4H10.5C6.72876 4 4.84315 4 3.67157 5.17157ZM19.0762 7.51986C19.3413 7.83807 19.2983 8.31099 18.9801 8.57617L16.7837 10.4066C15.8973 11.1452 15.1789 11.7439 14.5448 12.1517C13.8843 12.5765 13.2411 12.8449 12.5 12.8449C11.7589 12.8449 11.1157 12.5765 10.4552 12.1517C9.82112 11.7439 9.10271 11.1452 8.21636 10.4066L6.01986 8.57617C5.70165 8.31099 5.65866 7.83807 5.92383 7.51986C6.18901 7.20165 6.66193 7.15866 6.98014 7.42383L9.13903 9.22291C10.072 10.0004 10.7197 10.5384 11.2666 10.8901C11.7959 11.2306 12.1549 11.3449 12.5 11.3449C12.8451 11.3449 13.2041 11.2306 13.7334 10.8901C14.2803 10.5384 14.928 10.0004 15.861 9.22291L18.0199 7.42383C18.3381 7.15866 18.811 7.20165 19.0762 7.51986Z'
                      fill='#414141'
                    />
                  </svg>
                  <div className='text-[#2684FC] text-sm font-medium leading-4'>{account.email}</div>
                </div>
                {open ? (
                  <>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='5'
                      height='4'
                      viewBox='0 0 5 4'
                      fill='none'
                      className='hidden md:block'>
                      <circle cx='2.5' cy='2' r='2' fill='#D9D9D9' />
                    </svg>
                    <div className='flex items-center gap-[5px] w-full md:w-auto'>
                      <div className='w-6 h-6 grid place-items-center'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='17' height='20' viewBox='0 0 17 20' fill='none'>
                          <path
                            d='M8.5 5.49926C9.60498 5.49926 10.5 4.60428 10.5 3.49925C10.5 3.12425 10.395 2.76926 10.215 2.46926L9.36599 0.998964C8.98108 0.332377 8.01892 0.332377 7.63401 0.998964L6.785 2.46926C6.605 2.76926 6.5 3.12425 6.5 3.49925C6.5 4.60428 7.39502 5.49926 8.5 5.49926Z'
                            fill='#414141'
                          />
                          <path
                            d='M14.1588 8.38237H10.3804C9.86058 8.38237 9.43919 7.96099 9.43919 7.44119C9.43919 6.92138 9.01507 6.5 8.49527 6.5C7.97546 6.5 7.55134 6.92138 7.55134 7.44119C7.55134 7.96099 7.12995 8.38237 6.61015 8.38237H2.83176C1.26956 8.38237 0 9.64824 0 11.2059V12.6553C0 13.6718 0.830636 14.5 1.85007 14.5C2.34563 14.5 2.80814 14.3071 3.15742 13.9588L4.47215 12.6509C4.86224 12.2629 5.49255 12.2629 5.88264 12.6509L7.19268 13.9541C7.89119 14.6506 9.10885 14.6506 9.80732 13.9541L11.1221 12.6493C11.5123 12.262 12.142 12.2624 12.5317 12.6501L13.8426 13.9541C14.1918 14.3023 14.6544 14.4953 15.1499 14.4953C16.1694 14.4953 17 13.6671 17 12.6506V11.2059C16.9906 9.64824 15.721 8.38237 14.1588 8.38237Z'
                            fill='#414141'
                          />
                          <path
                            d='M12.8398 14.4107L11.8245 13.501L10.8045 14.4107C9.572 15.5151 7.41866 15.5151 6.18616 14.4107L5.17085 13.501L4.15085 14.4107C3.54168 14.965 2.72474 15.2696 1.8511 15.2696C1.16636 15.2696 0.528861 15.075 0 14.7492V18.6547C0 19.1202 0.425001 19.501 0.944432 19.501H16.0556C16.575 19.501 17 19.1202 17 18.6547V14.7492C16.4711 15.075 15.8383 15.2697 15.1489 15.2697C14.2753 15.2697 13.4584 14.965 12.8398 14.4107Z'
                            fill='#414141'
                          />
                        </svg>
                      </div>
                      <div className='[&_button]:!h-[28px] md:[&_button]:!h-[30px] [&_button]:min-w-[261px] md:[&_button]:min-w-0'>
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
                  </>
                ) : (
                  account.birthdate && (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='5'
                        height='4'
                        viewBox='0 0 5 4'
                        fill='none'
                        className='hidden md:block'>
                        <circle cx='2.5' cy='2' r='2' fill='#D9D9D9' />
                      </svg>
                      <div className='flex items-center gap-[5px] w-full md:w-auto'>
                        <div className='w-6 h-6 grid place-items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='17'
                            height='20'
                            viewBox='0 0 17 20'
                            fill='none'>
                            <path
                              d='M8.5 5.49926C9.60498 5.49926 10.5 4.60428 10.5 3.49925C10.5 3.12425 10.395 2.76926 10.215 2.46926L9.36599 0.998964C8.98108 0.332377 8.01892 0.332377 7.63401 0.998964L6.785 2.46926C6.605 2.76926 6.5 3.12425 6.5 3.49925C6.5 4.60428 7.39502 5.49926 8.5 5.49926Z'
                              fill='#414141'
                            />
                            <path
                              d='M14.1588 8.38237H10.3804C9.86058 8.38237 9.43919 7.96099 9.43919 7.44119C9.43919 6.92138 9.01507 6.5 8.49527 6.5C7.97546 6.5 7.55134 6.92138 7.55134 7.44119C7.55134 7.96099 7.12995 8.38237 6.61015 8.38237H2.83176C1.26956 8.38237 0 9.64824 0 11.2059V12.6553C0 13.6718 0.830636 14.5 1.85007 14.5C2.34563 14.5 2.80814 14.3071 3.15742 13.9588L4.47215 12.6509C4.86224 12.2629 5.49255 12.2629 5.88264 12.6509L7.19268 13.9541C7.89119 14.6506 9.10885 14.6506 9.80732 13.9541L11.1221 12.6493C11.5123 12.262 12.142 12.2624 12.5317 12.6501L13.8426 13.9541C14.1918 14.3023 14.6544 14.4953 15.1499 14.4953C16.1694 14.4953 17 13.6671 17 12.6506V11.2059C16.9906 9.64824 15.721 8.38237 14.1588 8.38237Z'
                              fill='#414141'
                            />
                            <path
                              d='M12.8398 14.4107L11.8245 13.501L10.8045 14.4107C9.572 15.5151 7.41866 15.5151 6.18616 14.4107L5.17085 13.501L4.15085 14.4107C3.54168 14.965 2.72474 15.2696 1.8511 15.2696C1.16636 15.2696 0.528861 15.075 0 14.7492V18.6547C0 19.1202 0.425001 19.501 0.944432 19.501H16.0556C16.575 19.501 17 19.1202 17 18.6547V14.7492C16.4711 15.075 15.8383 15.2697 15.1489 15.2697C14.2753 15.2697 13.4584 14.965 12.8398 14.4107Z'
                              fill='#414141'
                            />
                          </svg>
                        </div>
                        <div className='text-[#414141] text-sm leading-4 font-medium'>
                          {moment(account.birthdate).format('DD/MM/yyyy')}
                        </div>
                      </div>
                    </>
                  )
                )}
                {open ? (
                  <>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='5'
                      height='4'
                      viewBox='0 0 5 4'
                      fill='none'
                      className='hidden md:block'>
                      <circle cx='2.5' cy='2' r='2' fill='#D9D9D9' />
                    </svg>
                    <div className='flex items-center gap-[5px] w-full md:w-auto'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M15.2824 10.2152V11.5661C13.1076 12.0076 11.4707 13.9304 11.4707 16.2355C11.4707 18.8669 13.6039 21.0002 16.2354 21.0002C18.8668 21.0002 21.0001 18.8669 21.0001 16.2355C21.0001 14.0058 19.4685 12.1339 17.4001 11.6142V10.2152L17.922 10.7371C18.3355 11.1505 19.0059 11.1505 19.4193 10.7371C19.8329 10.3235 19.8329 9.65315 19.4193 9.23966L17.5392 7.35947C16.8776 6.69788 15.8049 6.69788 15.1433 7.35947L13.2632 9.23966C12.8497 9.65315 12.8497 10.3235 13.2632 10.7371C13.6767 11.1505 14.3471 11.1505 14.7606 10.7371L15.2824 10.2152ZM16.3413 13.6021C16.2846 13.6021 16.229 13.5977 16.1748 13.5891C14.7408 13.6213 13.5883 14.7938 13.5883 16.2355C13.5883 17.6974 14.7735 18.8825 16.2354 18.8825C17.6973 18.8825 18.8824 17.6974 18.8824 16.2355C18.8824 14.8451 17.8104 13.705 16.4478 13.5968C16.4128 13.6003 16.3772 13.6021 16.3413 13.6021Z'
                          fill='#414141'
                        />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M12.5294 7.76468C12.5294 10.0524 10.9171 11.9635 8.76683 12.4238V14.0685H9.6629C10.2477 14.0685 10.7217 14.5425 10.7217 15.1273C10.7217 15.7121 10.2477 16.1861 9.6629 16.1861H8.76683V16.9045C8.76683 17.4893 8.29277 17.9634 7.70801 17.9634C7.12325 17.9634 6.64919 17.4893 6.64919 16.9045V16.1861H5.75284C5.16808 16.1861 4.69402 15.7121 4.69402 15.1273C4.69402 14.5425 5.16808 14.0685 5.75284 14.0685H6.64919V12.3981C4.55587 11.8959 3 10.012 3 7.76468C3 5.13322 5.13322 3 7.76468 3C10.3961 3 12.5294 5.13322 12.5294 7.76468ZM7.76468 10.4117C9.22661 10.4117 10.4117 9.22661 10.4117 7.76468C10.4117 6.30275 9.22661 5.11763 7.76468 5.11763C6.30275 5.11763 5.11763 6.30275 5.11763 7.76468C5.11763 9.22661 6.30275 10.4117 7.76468 10.4117Z'
                          fill='#414141'
                        />
                      </svg>
                      <div className='[&_button]:!py-0 [&_button]:!h-[28px] md:[&_button]:!h-[30px] [&_button]:min-w-[261px] md:[&_button]:min-w-0'>
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
                    </div>
                  </>
                ) : (
                  account.gender && (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='5'
                        height='4'
                        viewBox='0 0 5 4'
                        fill='none'
                        className='hidden md:block'>
                        <circle cx='2.5' cy='2' r='2' fill='#D9D9D9' />
                      </svg>
                      <div className='text-sm text-[#19191B] font-medium leading-[18px] capitalize flex items-center  w-full md:w-auto'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' className='md:hidden mr-[5px]'>
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M15.2824 10.2152V11.5661C13.1076 12.0076 11.4707 13.9304 11.4707 16.2355C11.4707 18.8669 13.6039 21.0002 16.2354 21.0002C18.8668 21.0002 21.0001 18.8669 21.0001 16.2355C21.0001 14.0058 19.4685 12.1339 17.4001 11.6142V10.2152L17.922 10.7371C18.3355 11.1505 19.0059 11.1505 19.4193 10.7371C19.8329 10.3235 19.8329 9.65315 19.4193 9.23966L17.5392 7.35947C16.8776 6.69788 15.8049 6.69788 15.1433 7.35947L13.2632 9.23966C12.8497 9.65315 12.8497 10.3235 13.2632 10.7371C13.6767 11.1505 14.3471 11.1505 14.7606 10.7371L15.2824 10.2152ZM16.3413 13.6021C16.2846 13.6021 16.229 13.5977 16.1748 13.5891C14.7408 13.6213 13.5883 14.7938 13.5883 16.2355C13.5883 17.6974 14.7735 18.8825 16.2354 18.8825C17.6973 18.8825 18.8824 17.6974 18.8824 16.2355C18.8824 14.8451 17.8104 13.705 16.4478 13.5968C16.4128 13.6003 16.3772 13.6021 16.3413 13.6021Z'
                            fill='#414141'
                          />
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M12.5294 7.76468C12.5294 10.0524 10.9171 11.9635 8.76683 12.4238V14.0685H9.6629C10.2477 14.0685 10.7217 14.5425 10.7217 15.1273C10.7217 15.7121 10.2477 16.1861 9.6629 16.1861H8.76683V16.9045C8.76683 17.4893 8.29277 17.9634 7.70801 17.9634C7.12325 17.9634 6.64919 17.4893 6.64919 16.9045V16.1861H5.75284C5.16808 16.1861 4.69402 15.7121 4.69402 15.1273C4.69402 14.5425 5.16808 14.0685 5.75284 14.0685H6.64919V12.3981C4.55587 11.8959 3 10.012 3 7.76468C3 5.13322 5.13322 3 7.76468 3C10.3961 3 12.5294 5.13322 12.5294 7.76468ZM7.76468 10.4117C9.22661 10.4117 10.4117 9.22661 10.4117 7.76468C10.4117 6.30275 9.22661 5.11763 7.76468 5.11763C6.30275 5.11763 5.11763 6.30275 5.11763 7.76468C5.11763 9.22661 6.30275 10.4117 7.76468 10.4117Z'
                            fill='#414141'
                          />
                        </svg>
                        {t(account.gender == 'Undisclosed' ? 'Other' : account.gender)}{' '}
                        <Image
                          className='h-[24px] w-[24px] md:h-[20px] md:w-[20px]'
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
                    </>
                  )
                )}
              </div>
              {open ? (
                <div className='mt-[10px]'>
                  <div className='font-bold mb-0 md:mb-[5px] leading-5 text-[#414141]'>bio:</div>
                  <AutoGrowingTextField
                    value={bio}
                    onChange={setBio}
                    placeholder={t('Write something about yourself')}
                    className='text-sm text-[#61646B] font-normal md:font-bold leading-6 !py-[5px] !px-[10px] md:w-full md:aspect-[84/12] w-[330px] min-h-[82px]'
                  />
                </div>
              ) : (
                account.bio && (
                  <div className='mt-[10px]'>
                    <div className='font-bold leading-5 text-[#414141]'>bio:</div>
                    <div className='text-sm leading-[18px] text-[#414141] line-clamp-4 mb-[18px]'>{account.bio}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <SettingPasswordModal open={settingPasswordModalOpen} setOpen={setSettingPasswordModalOpen} profile={account} />
      <ChangingPasswordModal open={changingPasswordModalOpen} setOpen={setChangingPasswordModalOpen} />
    </>
  )
}
