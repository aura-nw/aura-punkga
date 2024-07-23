import { ChevronDownIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import AutoGrowingTextField from 'components/Input/TextField/AutoGrowing'
import vi from 'date-fns/locale/vi'
import NoImg from 'images/avatar.svg'
import EditIcon from 'images/icons/edit-circle.svg'
import CopySvg from 'images/icons/copy.svg'
import Camera from 'images/icons/camera.svg'
import Info from 'images/icons/info.svg'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import {
  LinearProgress,
  Popover,
  styled,
  linearProgressClasses,
  TextField as MuiTextField,
  Select as MuiSelect,
  MenuItem,
  FormControl,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import _ from 'lodash'
import ChupButton from 'components/core/Button/ChupButton'
import TextField from 'components/Input/TextField'
import { toast } from 'react-toastify'

const StyledTextField = styled(MuiTextField)({
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid #E0E0E0',
    fontSize: '14px',
    '&:hover': {
      borderColor: '#B0B0B0',
    },
    '&.Mui-focused': {
      borderColor: '#1976d2',
      boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '5px 10px',
  },
})

const StyledSelect = styled(MuiSelect)({
  maxHeight: '40px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  fontSize: '12px',
  '&:hover': {
    border: 'none !important',
  },
  '& .MuiSelect-select': {
    padding: '5px 10px',
  },
})

const StyledDatePicker = styled(DatePicker)({
  '& .MuiInputBase-root': {
    maxHeight: '40px !important',
    borderRadius: '8px',
    fontSize: '12px !important',
  },
  '& .MuiInputBase-input': {
    padding: '5px 0px 5px 10px !important',
    height: '40px !important',
    fontSize: '12px !important',
  },
})

export default function EditProfile({ updateProfile }) {
  const { account, getProfile } = useContext(Context)
  const { t } = useTranslation()
  const [preview, setPreview] = useState()
  const { locale } = useRouter()
  const [birthdate, setBirthdate] = useState(null)
  const profilePicture = useRef()
  const [gender, setGender] = useState<{ key: string | number; value: string }>(null)
  const [bio, setBio] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (account) {
      setGender(
        account.gender == 'Undisclosed'
          ? { key: 'Other', value: t('Other') }
          : { key: account.gender, value: t(account.gender) }
      )
      setBirthdate(account.birthdate ? new Date(account.birthdate).getTime() : undefined)
      setBio(account.bio)
      setUsername(account.name)
    }
  }, [account])

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile) as any
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  const updateProfileHandler = async () => {
    try {
      setLoading(true)
      setErrorMessage('')
      const form = new FormData()
      if (gender.key && gender.key != account.gender) {
        form.append('gender', gender.key == 'Other' ? 'Other' : (gender.key as string))
      }
      if (birthdate && !moment(account.birthdate).isSame(moment(birthdate), 'day')) {
        form.append('birthdate', moment(birthdate).format('YYYY-MM-DD'))
      }
      if (bio !== account.bio) {
        form.append('bio', bio || '')
      }
      if (account.name !== username) {
        form.append('nickname', username)
      }
      if ((profilePicture.current as any)?.files[0]) {
        form.append('picture', (profilePicture.current as any).files[0])
      }
      if (form.entries().next().done === false) {
        const res = await updateProfile(form)
        if (res?.data?.data?.update_authorizer_users) {
          await getProfile()
        } else {
          if (res?.data?.errors?.[0]?.message?.includes('authorizer_users_nickname_key')) {
            setErrorMessage(t('Name already taken'))
          } else {
            setErrorMessage(res?.data?.errors?.[0]?.message)
          }
          return
        }
      }
      setSelectedFile(undefined)
      router.push('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      setErrorMessage(
        error.response?.data?.message || t('An error occurred while updating your profile. Please try again.')
      )
    } finally {
      setLoading(false)
    }
  }

  const onSelectFile = (e) => {
    if (!e.target?.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  return (
    <div className='pk-container pt-5 px-5 lg:px-0 lg:pt-10 flex justify-center'>
      <div className='w-[624px] p-8 bg-white rounded-[10px] relative'>
        <div className='text-text-primary font-medium text-xl leading-7'>{t('Edit profile')}</div>
        <div className='flex flex-col justify-center items-center gap-[14px] mt-8'>
          <div className='text-[#161618] font-semibold text-sm leading-5'>{t('Profile picture')}</div>
          <div className='relative w-[146px] shrink-0 h-[146px]'>
            <Image
              src={preview || account?.image || NoImg.src}
              alt=''
              width={146}
              height={146}
              className='w-full h-full rounded-full'
            />
            <div className='absolute top-0 right-0 cursor-pointer shadow-md z-10 w-8 h-8 bg-white hover:bg-slate-100 rounded-full p-2'>
              <input
                ref={profilePicture}
                onChange={onSelectFile}
                type='file'
                className='bg-black absolute inset-0 opacity-0'
                id='change-profile-picture-input'
              />
              <Image src={Camera} alt='' width={16} height={14.6} />
            </div>
          </div>
          <div className='text-[#706D77] text-xs leading-[18px]'>{t('Format: JPG, PNG, SVG. 500x500 recommended')}</div>
          {/* <div className='bg-[#F0F8FF] rounded flex gap-1 p-3 text-text-info-primary text-xs leading-[18px] items-start md:items-center'><Image className='ml-[3px]' src={Info} alt='info' width={12} height={12} />{t('Other users can only see your username and profile picture')}</div> */}

          <div className='w-full flex flex-col gap-4 mt-8'>
            <div className=''>
              <div className='font-medium text-sm mb-2 leading-5 text-text-primary'>{t('Username')}</div>
              <TextField
                value={username}
                onChange={setUsername}
                placeholder={t('Enter your username')}
                className='text-sm text-[#61646B] font-normal md:font-bold leading-6 !py-[5px] !px-[10px] w-full md:aspect-[84/12]'
              />
            </div>
            <div className=''>
              <div className='font-medium text-sm mb-2 leading-5 text-text-primary'>{t('Gender')}</div>
              <FormControl fullWidth>
                <StyledSelect
                  value={gender ? gender.key : ''}
                  onChange={(e) => setGender({ key: e.target.value as any, value: t(e.target.value as any) })}
                  displayEmpty
                  className='text-sm text-[#61646B] font-normal md:font-bold leading-6 w-full md:aspect-[84/12]'>
                  <MenuItem value='' disabled>
                    <div className='text-text-quatenary text-sm'>{t('Select a gender')}</div>
                  </MenuItem>
                  <MenuItem value='Male'>{t('Male')}</MenuItem>
                  <MenuItem value='Female'>{t('Female')}</MenuItem>
                  <MenuItem value='Other'>{t('Other')}</MenuItem>
                </StyledSelect>
              </FormControl>
            </div>
            <div className=''>
              <div className='font-medium text-sm mb-2 leading-5 text-text-primary'>{t('Date of birth')}</div>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale === 'vn' ? vi : undefined}>
                <StyledDatePicker
                  value={birthdate}
                  onChange={(newValue) => setBirthdate(newValue)}
                  className='text-sm text-[#61646B] font-normal md:font-bold leading-6 md:w-full md:aspect-[84/12] w-[330px] max-h-10'
                />
              </LocalizationProvider>
            </div>

            <div className=''>
              <div className='flex justify-between items-center'>
                <div className='font-medium text-sm mb-2 leading-5 text-text-primary'>{t('Short bio')}</div>
                <div className='text-[#888888] text-xs'>{bio ? bio.length : 0}/100</div>
              </div>
              <AutoGrowingTextField
                maxLength={100}
                value={bio}
                onChange={setBio}
                placeholder={t('Write something about yourself')}
                className='text-sm text-[#61646B] font-normal md:font-bold leading-6 !py-[5px] !px-[10px] w-full md:aspect-[84/12] min-h-[82px]'
              />
            </div>
            <div className=''>
              <div className='font-medium text-sm mb-2 leading-5 text-text-primary'>{t('Email')}</div>
              <TextField
                value={account?.email}
                disabled
                placeholder={account?.email}
                className='text-sm text-[#61646B] font-normal md:font-bold leading-6 !py-[5px] !px-[10px] md:w-full md:aspect-[84/12] w-[330px]'
              />
            </div>
            {errorMessage && <div className='text-red-500 text-sm mt-2'>{errorMessage}</div>}
          </div>
        </div>

        <div className='mt-8 flex justify-end'>
          <ChupButton className='px-[50px] md:px-[54px]' onClick={updateProfileHandler} disabled={loading}>
            {loading ? t('Saving...') : t('Save')}
          </ChupButton>
        </div>
      </div>
    </div>
  )
}
