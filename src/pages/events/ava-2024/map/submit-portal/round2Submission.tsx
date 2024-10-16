import TextField from 'components/Input/TextField'
import Image from 'next/image'
import { useContext, useState } from 'react'
import Frame from 'components/pages/event/ava-2024/assets/frame.svg'
import Placeholder from 'components/pages/event/ava-2024/assets/placeholder.png'
import { toast } from 'react-toastify'
import { eventService } from 'src/services/eventService'
import useSWR from 'swr'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { useRouter } from 'next/router'
import AutoGrowingTextField from 'components/Input/TextField/AutoGrowing'
import { Controller, useForm } from 'react-hook-form'
import Select from 'components/Select'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/core/Button/Button'
import { userService } from 'src/services/userService'
import SubmissionTable from './submissionTable'

export default function Round2Submission() {
  const { account, getProfile } = useContext(Context)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [hasSecondaryLanguage, setHasSecondaryLanguage] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data } = useSWR('/story-event/character/available', eventService.story.getAvailableCharacter, {
    revalidateOnFocus: false,
  })
  const form = useForm({
    defaultValues: {
      cover: '',
      banner: '',
      mainLanguage: {
        language_id: 2,
        title: '',
        description: '',
        link: '',
      },
      secondaryLanguage: {
        language_id: 1,
        title: '',
        description: '',
        link: '',
      },
    },
  })
  const creatorForm = useForm({
    defaultValues: {
      avatar: undefined,
      pen_name: '',
      bio: '',
    },
  })

  const availableCharacters = data?.data?.data
  console.log(availableCharacters)

  const submitHandler = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      setLoading(false)
      toast(error.message, {
        type: 'error',
      })
    }
  }
  const submitCreatorInformationHandler = async (data) => {
    try {
      if (!data.avatar || !data.pen_name || !data.bio) {
        toast('Please fill your information', {
          type: 'error',
        })
      } else {
        setLoading(true)
        const formData = new FormData()
        formData.append('avatar', data.avatar)
        formData.append('pen_name', data.pen_name)
        formData.append('bio', data.bio)
        const res = await userService.updateArtistProfile(formData)
        if (res.data.errors?.[0]?.message) {
          toast(
            res.data.errors?.[0]?.message.includes('creators_pen_name_key')
              ? 'Your pen name has been already taken.'
              : res.data.errors?.[0]?.message,
            {
              type: 'error',
            }
          )
          setLoading(false)
        } else {
          await getProfile()
          toast('Update successfully, you are a Punkga Creator now', {
            type: 'success',
          })
          setLoading(false)
        }
      }
    } catch (error) {
      setLoading(false)
      toast(error.message, {
        type: 'error',
      })
    }
  }

  const languageOptions = [
    {
      key: 2,
      value: 'Tiếng việt',
    },
    {
      key: 1,
      value: t('English'),
    },
  ]

  if (!account) return <div className='w-full text-center'>{t('Login to continue')}</div>
  if (!account.creator) {
    return (
      <form onSubmit={creatorForm.handleSubmit(submitCreatorInformationHandler)} className=''>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8'>
          <div>
            <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
              <div className='text-lg font-semibold w-full'>{t('Creator’s information')}</div>
              <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6 md:flex-row md:items-start gap-5 md:gap-3'>
                <Controller
                  name='avatar'
                  control={creatorForm.control}
                  render={({ field }) => (
                    <div className='min-w-[209px] flex flex-col items-center'>
                      <div className='flex flex-col items-center'>
                        <div className='text-sm font-medium'>
                          {t('Profile picture')} (1:1) <span className='text-error-default'>*</span>
                        </div>
                        <div className='text-[10px] text-text-quatenary'>
                          {locale == 'vn' ? 'Khuyến khích 480px x 480px' : '480px x 480px recommended'}
                        </div>
                      </div>
                      <div className='mt-4 relative overflow-hidden w-full'>
                        <label htmlFor='character-avatar'>
                          <div
                            className={`w-full cursor-pointer overflow-hidden mx-auto max-w-[190px] aspect-square grid place-items-center  border-white rounded-full ${
                              field.value ? '' : 'border border-dashed'
                            }`}>
                            {field.value ? (
                              <Image
                                src={URL.createObjectURL(field.value)}
                                width={500}
                                height={500}
                                alt=''
                                className='w-full object-cover aspect-square'
                              />
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='47'
                                height='45'
                                viewBox='0 0 47 45'
                                fill='none'>
                                <path
                                  d='M8.79349 43.081L29.9302 23.1877L39.8768 33.1344M8.79349 43.081H33.6602C37.7802 43.081 41.1201 39.7411 41.1201 35.621V23.1877M8.79349 43.081C4.67345 43.081 1.3335 39.7411 1.3335 35.621V10.7544C1.3335 6.63435 4.67345 3.2944 8.79349 3.2944H24.9568M38.6335 15.3011L38.6335 8.26772M38.6335 8.26772L38.6335 1.23438M38.6335 8.26772L31.6001 8.26773M38.6335 8.26772L45.6668 8.26773M16.2535 14.4844C16.2535 16.5444 14.5835 18.2144 12.5235 18.2144C10.4635 18.2144 8.79349 16.5444 8.79349 14.4844C8.79349 12.4244 10.4635 10.7544 12.5235 10.7544C14.5835 10.7544 16.2535 12.4244 16.2535 14.4844Z'
                                  stroke='#E7E7E7'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                />
                              </svg>
                            )}
                            <input
                              id='character-avatar'
                              type='file'
                              className='hidden'
                              accept='image/*'
                              onChange={(e) => field.onChange(e.target.files[0])}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                />

                <div className='w-full'>
                  <Controller
                    name='pen_name'
                    control={creatorForm.control}
                    render={({ field }) => (
                      <div className='w-full'>
                        <label className='text-sm font-medium' htmlFor='pen-name'>
                          {t('Pen name')} <span className='text-error-default'>*</span>
                        </label>
                        <TextField
                          placeholder='Enter your artist name'
                          id='pen-name'
                          className='mt-2 bg-transparent !border-white'
                          {...field}
                        />
                        <div className='mt-2 flex justify-between text-xs'>
                          <div className='text-text-error-primary-3'></div>
                          <div
                            className={
                              field.value.length > 25 ? 'text-text-error-primary-3' : 'text-text-teriary'
                            }>{`${field.value.length}/25`}</div>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name='bio'
                    control={creatorForm.control}
                    render={({ field }) => (
                      <div className='w-full mt-2'>
                        <div className='flex flex-col gap-1'>
                          <label className='text-sm font-medium' htmlFor='bio'>
                            {t('Bio')} <span className='text-error-default'>*</span>
                          </label>
                          <textarea
                            id='bio'
                            className='mt-2 bg-transparent !border-white rounded-lg border text-sm p-2 min-h-20'
                            placeholder='Tell something about yourself'
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </div>
                        <div className='mt-2 flex justify-between text-xs'>
                          <div className='text-text-error-primary-3'></div>
                          <div
                            className={
                              field.value.length > 150 ? 'text-text-error-primary-3' : 'text-text-teriary'
                            }>{`${field.value.length}/150`}</div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <button
              type='submit'
              className={`w-[217px] block rounded-md font-jaro text-2xl border border-white bg-black p-2.5 text-center mx-auto cursor-pointer mt-6 ${
                loading && 'opacity-70 pointer-events-none'
              }`}>
              {t(loading ? 'Submitting' : 'submit2')}
            </button>
          </div>
        </div>
      </form>
    )
  }
  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mt-8'>
        <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
          <div className='grid grid-cols-[70px_1fr] gap-4'>
            <Image
              src={account.creator.avatar_url}
              alt='creator avatar'
              width={70}
              height={70}
              className='rounded-full aspect-square'
            />
            <div>
              <div className='text-sm font-medium'>{account.creator.pen_name}</div>
              <div className='text-xs text-text-quatenary line-clamp-2'>{account.creator.bio}</div>
            </div>
          </div>
          <div className='text-lg font-semibold w-full mt-6'>{t('Information')}</div>
          <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6'>
            <Controller
              name='cover'
              control={form.control}
              render={({ field }) => (
                <div className='w-full'>
                  <label className='text-sm font-medium' htmlFor='cover'>
                    {t('Manga cover picture (Driver link)')} <span className='text-error-default'>*</span>
                  </label>
                  <div className='text-[10px] text-text-quatenary'>
                    {locale == 'vn' ? 'Khuyến khích 1240px x 1780px' : '1240px x 1780px recommended'}
                  </div>
                  <TextField
                    placeholder='Enter a driver link '
                    id='cover'
                    className='mt-2 bg-transparent !border-white'
                    {...field}
                  />
                </div>
              )}
            />
            <Controller
              name='banner'
              control={form.control}
              render={({ field }) => (
                <div className='w-full mt-4'>
                  <label className='text-sm font-medium' htmlFor='banner'>
                    {t('Manga banner picture (Driver link)')} <span className='text-error-default'>*</span>
                  </label>
                  <div className='text-[10px] text-text-quatenary'>
                    {locale == 'vn' ? 'Khuyến khích 480px x 180px' : '480px x 180px recommended'}
                  </div>
                  <TextField
                    placeholder='Enter a driver link '
                    id='banner'
                    className='mt-2 bg-transparent !border-white'
                    {...field}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mt-8'>
        <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
          <div className='text-lg font-semibold w-full'>{t('Main language')}</div>
          <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6'>
            <Controller
              name='mainLanguage.language_id'
              control={form.control}
              render={({ field }) => (
                <div className='w-full space-y-2'>
                  <label className='text-sm font-medium'>
                    {t('Language')} <span className='text-error-default'>*</span>
                  </label>
                  <Select
                    theme='dark'
                    selected={languageOptions.find((s) => s.key == field.value)}
                    onChange={(s) => field.onChange(s.key)}
                    placeholder={t('Select manga’s language')}
                    icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                    options={languageOptions}
                  />
                </div>
              )}
            />
            <Controller
              name='mainLanguage.title'
              control={form.control}
              render={({ field }) => (
                <div className='w-full mt-4'>
                  <label className='text-sm font-medium' htmlFor='main-manga-title'>
                    {t('Manga title')} <span className='text-error-default'>*</span>
                  </label>
                  <TextField
                    placeholder='Your manga name'
                    id='main-manga-title'
                    className='mt-2 bg-transparent !border-white'
                    {...field}
                  />
                </div>
              )}
            />
            <Controller
              name='mainLanguage.description'
              control={form.control}
              render={({ field }) => (
                <div className='w-full mt-4'>
                  <label className='text-sm font-medium' htmlFor='main-manga-description'>
                    {t('Manga description')} <span className='text-error-default'>*</span>
                  </label>
                  <textarea
                    id='main-manga-description'
                    className='mt-2 bg-transparent !border-white rounded-lg border text-sm p-2 min-h-20 w-full'
                    placeholder='Enter description'
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              )}
            />
            <Controller
              name='mainLanguage.link'
              control={form.control}
              render={({ field }) => (
                <div className='w-full mt-4'>
                  <label className='text-sm font-medium' htmlFor='main-manga-link'>
                    {t('Manga page images (URL)')} <span className='text-error-default'>*</span>
                  </label>
                  <TextField
                    placeholder='Enter a link'
                    id='main-manga-link'
                    className='mt-2 bg-transparent !border-white'
                    {...field}
                  />
                </div>
              )}
            />
          </div>
          {!hasSecondaryLanguage && (
            <div className='mt-4 w-full flex justify-end'>
              <Button color='neautral' size='xs' onClick={() => setHasSecondaryLanguage(true)}>
                {t('+ Add second language')}
              </Button>
            </div>
          )}
        </div>
        {hasSecondaryLanguage && (
          <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
            <div className='flex justify-between items-center'>
              <div className='text-lg font-semibold w-full'>{t('Secondary language')}</div>
              <XMarkIcon
                className='text-error-default h-5 w-5 cursor-pointer'
                onClick={() => setHasSecondaryLanguage(false)}
              />
            </div>
            <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6'>
              <Controller
                name='secondaryLanguage.language_id'
                control={form.control}
                render={({ field }) => (
                  <div className='w-full space-y-2'>
                    <label className='text-sm font-medium'>
                      {t('Language')} <span className='text-error-default'>*</span>
                    </label>
                    <Select
                      theme='dark'
                      selected={languageOptions.find((s) => s.key == field.value)}
                      onChange={(s) => field.onChange(s.key)}
                      placeholder={t('Select manga’s language')}
                      icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                      options={languageOptions}
                    />
                  </div>
                )}
              />
              <Controller
                name='secondaryLanguage.title'
                control={form.control}
                render={({ field }) => (
                  <div className='w-full mt-4'>
                    <label className='text-sm font-medium' htmlFor='secondary-manga-title'>
                      {t('Manga title')} <span className='text-error-default'>*</span>
                    </label>
                    <TextField
                      placeholder='Your manga name'
                      id='secondary-manga-title'
                      className='mt-2 bg-transparent !border-white'
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name='secondaryLanguage.description'
                control={form.control}
                render={({ field }) => (
                  <div className='w-full mt-4'>
                    <label className='text-sm font-medium' htmlFor='secondary-manga-description'>
                      {t('Manga description')} <span className='text-error-default'>*</span>
                    </label>
                    <textarea
                      id='secondary-manga-description'
                      className='mt-2 bg-transparent !border-white rounded-lg border text-sm p-2 min-h-20 w-full'
                      placeholder='Enter description'
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <Controller
                name='secondaryLanguage.link'
                control={form.control}
                render={({ field }) => (
                  <div className='w-full mt-4'>
                    <label className='text-sm font-medium' htmlFor='secondary-manga-link'>
                      {t('Manga page images (URL)')} <span className='text-error-default'>*</span>
                    </label>
                    <TextField
                      placeholder='Enter a link'
                      id='secondary-manga-link'
                      className='mt-2 bg-transparent !border-white'
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </div>
      <div className='mb-8'>
        <button
          type='submit'
          className={`w-[217px] block rounded-md font-jaro text-2xl border border-white bg-black p-2.5 text-center cursor-pointer mt-6 ${
            loading && 'opacity-70 pointer-events-none'
          }`}>
          {t(loading ? 'Submitting' : 'submit2')}
        </button>
      </div>
      <SubmissionTable />
    </form>
  )
}
