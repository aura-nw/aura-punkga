import TextField from 'components/Input/TextField'
import Image from 'next/image'
import { useContext, useState } from 'react'
import Frame from 'components/pages/event/ava-2024/assets/frame.svg'
import Placeholder from 'components/pages/event/ava-2024/assets/placeholder.png'
import { toast } from 'react-toastify'
import { eventService } from 'src/services/event.service'
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

export default function Round2Submission() {
  const { account } = useContext(Context)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [hasSecondaryLanguage, setHasSecondaryLanguage] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data, mutate } = useSWR('get-submissions', eventService.story.getSubmissions, {
    revalidateOnFocus: false,
  })
  const form = useForm({
    defaultValues: {
      creator: {
        avatar: undefined,
        pen_name: '',
        bio: '',
      },
      manga: {
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
    },
  })
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

  const submissions = data?.data?.data?.story_event_submission
  if (!account) return <div className='w-full text-center'>{t('Login to continue')}</div>
  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <div className='grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8'>
        <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
          <div className='text-lg font-semibold w-full'>{t('Creator’s information')}</div>
          <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6 md:flex-row md:items-start gap-5 md:gap-3'>
            <Controller
              name='creator.avatar'
              control={form.control}
              render={({ field }) => (
                <div className='min-w-[209px]'>
                  <div className='flex flex-col items-center md:items-start'>
                    <div className='text-sm font-medium'>
                      {t('Upload your avatar')} (1:1) <span className='text-error-default'>*</span>
                    </div>
                    <div className='text-[10px] text-text-quatenary'>
                      {locale == 'vn' ? 'Khuyến khích 480px x 480px' : '480px x 480px recommended'}
                    </div>
                  </div>
                  <div className='mt-4 relative rounded-xl border-[3px] border-black overflow-hidden'>
                    <label htmlFor='character-avatar'>
                      <div className='absolute bottom-0 inset-x-0 w-full'>
                        {field.value ? (
                          <Image
                            src={URL.createObjectURL(field.value)}
                            width={500}
                            height={500}
                            alt=''
                            className='w-full object-cover aspect-square'
                          />
                        ) : (
                          <Image
                            src={Placeholder}
                            width={500}
                            height={500}
                            alt=''
                            className='w-full object-cover aspect-square'
                          />
                        )}
                      </div>
                      <Image src={Frame} alt='' className='w-full  relative' />
                      <input
                        id='character-avatar'
                        type='file'
                        className='hidden'
                        accept='image/*'
                        onChange={(e) => field.onChange(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
              )}
            />

            <div className='w-full'>
              <Controller
                name='creator.pen_name'
                control={form.control}
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
                name='creator.bio'
                control={form.control}
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
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 mt-8'>
        <div className='space-y-8'>
          <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
            <div className='text-lg font-semibold w-full'>{t('Information')}</div>
            <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6'>
              <Controller
                name='manga.cover'
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
                name='manga.banner'
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
          <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
            <div className='text-lg font-semibold w-full'>{t('Main language')}</div>
            <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6'>
              <Controller
                name='manga.mainLanguage.language_id'
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
                name='manga.mainLanguage.title'
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
                name='manga.mainLanguage.description'
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
            </div>
            {!hasSecondaryLanguage && (
              <div className='mt-4 w-full'>
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
                <XMarkIcon className='text-error-default h-5 w-5 cursor-pointer' onClick={() => setHasSecondaryLanguage(false)}/>
              </div>
              <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6'>
                <Controller
                  name='manga.secondaryLanguage.language_id'
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
                  name='manga.secondaryLanguage.title'
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
                  name='manga.secondaryLanguage.description'
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
              </div>
            </div>
          )}
          <button
            type='submit'
            className={`w-[217px] block rounded-md font-jaro text-2xl border border-white bg-black p-2.5 text-center mx-auto cursor-pointer mt-6 ${
              loading && 'opacity-70 pointer-events-none'
            }`}
            onClick={submitHandler}>
            {t(loading ? 'Submitting' : 'submit2')}
          </button>
        </div>
        <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-6 h-fit'>
          <div className='text-lg font-semibold'>{t('My submission')}</div>
          <div className='text-feedback-info-link-defaul text-xs mt-2'>
            {t(
              'Submitted artworks/mangas need to be approved by admin. This process may take upto 24 hours after you submitted'
            )}
            .{' '}
          </div>
          <div className='mt-6 p-6 rounded-[10px] bg-black'>
            {submissions?.length ? (
              <>
                <div className='grid grid-cols-[12%_1fr_25%_25%] text-sm font-semibold border-b border-white'>
                  <div className='px-2 py-4'>{t('No')}</div>
                  <div className='p-4'>{t('Name')}</div>
                  <div className='p-4'>{t('Type')}</div>
                  <div className='p-4'>{t('Submitted at')}</div>
                </div>
                <div className='h-[260px] overflow-auto'>
                  {submissions?.map((submission, index) => (
                    <div
                      className='grid grid-cols-[12%_1fr_25%_25%] text-sm font-medium text-text-quatenary'
                      key={submission.id}>
                      <div className='px-2 py-4'>#{index + 1}</div>
                      <div className='p-4 truncate'>{submission.name}</div>
                      <div className='p-4 capitalize'>{submission.type}</div>
                      <div className='p-4'>{moment(submission.created_at).format('HH:mm DD/MM/yyyy')}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className='text-center w-full h-full grid place-items-center'>{t('No submission found')}!</div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
