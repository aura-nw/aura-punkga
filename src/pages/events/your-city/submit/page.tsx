import TextField from 'components/Input/TextField'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { userService } from 'src/services/userService'
import Image1 from 'components/pages/event/your-city/assets/image718.png'
import Image2 from 'components/pages/event/your-city/assets/image719.png'
import Countdown, { zeroPad } from 'react-countdown'
import moment from 'moment-timezone'
import DOMPurify from 'dompurify'
import useSWR, { mutate } from 'swr'
import { eventService } from 'src/services/eventService'
import SubmissionTable from './submissionTable'
import Checkbox from 'components/core/Checkbox'
import UserGreen from 'assets/images/userGreen.svg'
import { debounce, set } from 'lodash'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useOnClickOutside } from 'usehooks-ts'
import Modal from 'components/pages/event/your-city/Modal'
import Congrats from 'components/pages/event/your-city/assets/congrats.png'
import Button from 'components/core/Button/Button'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <PageContent {...props} />
}
function PageContent() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { account, getProfile } = useContext(Context)
  const { locale, replace } = useRouter()
  const searchRef = useRef()
  const [showSearch, setShowSearch] = useState(false)
  const [milestone, setMilestone] = useState(0)
  useOnClickOutside([searchRef], () => {
    setShowSearch(false)
  })
  const [IPList, setIPList] = useState([])
  useEffect(() => {
    if (moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz('2025-01-15', 'Asia/Ho_Chi_Minh'))) {
      replace('/events/your-city')
    }
  }, [])
  const { data: submissionData } = useSWR('get-submissions', () => eventService.story.getSubmissions(4), {
    revalidateOnFocus: false,
  })
  const submissions = (submissionData?.data?.data?.story_event_submission as any[]) || []
  const creatorForm = useForm({
    defaultValues: {
      avatar: undefined,
      pen_name: '',
      bio: '',
    },
  })
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      artwork: undefined,
      selectedIP: [],
      terms_agreed: true,
    },
  })
  const { data } = useSWR('get-all-topic', () => eventService.punktober.getAllTopic(), {
    revalidateOnFocus: false,
  })
  const topics = data?.data?.data?.artwork_topics
  const currentTopic = topics?.find((topic) => topic?.date == moment().format('YYYY-MM-DD'))
  const submitCreatorInformationHandler = async (data) => {
    try {
      if (!data.avatar || !data.pen_name || !data.bio) {
        toast(t('Please fill your information'), {
          type: 'error',
        })
      } else {
        if (data.pen_name && data.pen_name.length <= 25 && data.bio && data.bio.length <= 150 && !loading) {
          setLoading(true)
          const formData = new FormData()
          formData.append('avatar', data.avatar)
          formData.append('pen_name', data.pen_name)
          formData.append('bio', data.bio)
          const res = await userService.updateArtistProfile(formData)
          if (res.data.errors?.[0]?.message) {
            toast(
              res.data.errors?.[0]?.message.includes('creators_pen_name_key')
                ? t('Your pen name has been already taken')
                : res.data.errors?.[0]?.message,
              {
                type: 'error',
              }
            )
            setLoading(false)
          } else {
            await getProfile()
            window.scrollTo(0, 0)
            toast(t('Update successfully, you are a Punkga Creator now'), {
              type: 'success',
            })
            setLoading(false)
          }
        }
      }
    } catch (error) {
      setLoading(false)
      toast(error.message, {
        type: 'error',
      })
    }
  }
  const submitHandler = async (data) => {
    try {
      if (!data.name || !data.artwork || !data.description) {
        toast(t('Some field is missing. Please check again'), {
          type: 'error',
        })
        return
      }
      if (data.description.length > 150) {
        toast(t('The description is too long'), {
          type: 'error',
        })
        return
      }
      if (data.name.length > 25) {
        toast(t('The artwork name is too long'), {
          type: 'error',
        })
        return
      }
      if (data.selectedIP.length > 4) {
        toast(t('You can only select a maximum of 4 characters. Please remove some characters.'), {
          type: 'error',
        })
        return
      }
      setLoading(true)
      const payload = new FormData()
      payload.append('name', data.name)
      payload.append('artwork', data.artwork)
      payload.append('description', data.description)
      payload.append('contest_id', '4')
      payload.append('artwork_topic_id', currentTopic.id)
      payload.append('terms_agreed', data.terms_agreed ? '1' : '0')
      payload.append(
        'artwork_characters',
        JSON.stringify([
          ...(data.selectedIP?.map((ip) => ({
            story_character_id: ip.id,
          })) || []),
        ])
      )
      const res = await eventService.story.submitArtwork(payload)
      if (res.data.errors?.[0]?.message) {
        toast(res.data.errors?.[0]?.message, {
          type: 'error',
        })
        setLoading(false)
      } else {
        await mutate('get-submissions')
        const { data } = await eventService.punktober.getUserArtworks(account.id)
        const artworks = data?.data?.user_artwork_topic
        if (artworks.length == 7 || artworks.length == 15 || artworks.length == 20 || artworks.length == 31) {
          setMilestone(artworks.length)
        } else {
          toast(
            t(
              'Submit artwork successfully. Your artwork need to be approved by admin. This process may take upto 24 hours after you submitted'
            ),
            {
              type: 'success',
            }
          )
        }
        form.reset()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      toast(error.message, {
        type: 'error',
      })
    }
  }
  const fetchSearch = async (search) => {
    try {
      if (search) {
        const res = await eventService.story.searchCharacter(search)
        if (res.data.errors?.[0]?.message) {
          toast(res.data.errors?.[0]?.message, {
            type: 'error',
          })
        } else {
          setIPList(res?.data?.data?.story_character || [])
        }
      } else {
        setIPList([])
      }
    } catch (error) {
      toast(error.message, {
        type: 'error',
      })
    }
  }

  if (!account) return <div className='w-full text-center py-12'>{t('Login to continue')}</div>
  if (!account.creator) {
    return (
      <div className='bg-[#ffffff]'>
        <div className=' min-h-screen relative py-12'>
          <Link href='/events/your-city' className='absolute top-12 left-[4%] flex items-center font-medium text-sm'>
            <svg width='33' height='32' viewBox='0 0 33 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M20.3996 22.7969L13.5996 15.9969L20.3996 9.19688'
                stroke='#222222'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {t('Back')}
          </Link>
          <form
            onSubmit={creatorForm.handleSubmit(submitCreatorInformationHandler)}
            className='flex flex-col items-center gap-14'>
            <div className='mx-auto w-full max-w-[860px] border border-border-primary p-6 rounded-md'>
              <div className='text-lg font-semibold w-full'>{t('Creator’s information')}</div>
              <div className='text-sm font-medium mt-2 w-full'>
                {t(
                  'We found that you have not registered as a Punkga Creator, please provide some information before submitting your works.'
                )}
              </div>
              <div className='  rounded-md px-4 py-6 flex flex-col items-center mt-6 md:flex-row md:items-start gap-5 md:gap-3'>
                <Controller
                  name='avatar'
                  control={creatorForm.control}
                  render={({ field }) => (
                    <div className='min-w-[209px] flex flex-col items-center'>
                      <div className='flex flex-col items-center'>
                        <div className='text-sm font-medium'>
                          {t('Profile picture')} (1:1) <span className='text-error-default'>*</span>
                        </div>
                        <div className='text-[10px] text-text-secondary'>
                          {locale == 'vn' ? 'Khuyến khích 480px x 480px' : '480px x 480px recommended'}
                        </div>
                      </div>
                      <div className='mt-4 relative overflow-hidden w-full'>
                        <label htmlFor='image'>
                          <div
                            className={`w-full cursor-pointer overflow-hidden mx-auto max-w-[180px] aspect-square grid place-items-center  border-border-primary rounded-full ${
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
                                  stroke='#0B0B0B'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            )}
                            <input
                              id='image'
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

                <div className='w-full -mt-0.5'>
                  <Controller
                    name='pen_name'
                    control={creatorForm.control}
                    render={({ field }) => (
                      <div className='w-full'>
                        <label className='text-sm font-medium' htmlFor='pen-name'>
                          {t('Pen name')} <span className='text-error-default'>*</span>
                        </label>
                        <TextField
                          placeholder={t('Enter your artist name')}
                          id='pen-name'
                          className='mt-2 bg-transparent !border-border-primary [&_input]:!placeholder-neutral-950 [&_input::placeholder]:font-medium'
                          {...field}
                        />
                        <div className='mt-2 flex justify-between text-xs'>
                          <div className='text-text-error-primary-3'></div>
                          <div
                            className={
                              field.value.length > 25 ? 'text-text-error-primary-3' : 'text-text-secondary'
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
                            className='mt-2 bg-transparent !border-border-primary rounded-lg border text-sm py-2 px-3 min-h-20 placeholder:!text-neutral-950 placeholder:font-medium'
                            placeholder={t('Tell something about yourself')}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </div>
                        <div className='mt-2 flex justify-between text-xs'>
                          <div className='text-text-error-primary-3'></div>
                          <div
                            className={
                              field.value.length > 150 ? 'text-text-error-primary-3' : 'text-text-secondary'
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
              className='p-2.5 text-center font-roboto text-[22px] uppercase font-bold bg-neutral-black text-white w-64'>
              {t(loading ? 'Loading' : 'Confirm & Next Step')}
            </button>
          </form>
        </div>
        <div className='relative w-full mt-20'>
          <Image src={Image2} alt='' className='absolute bottom-full -mb-3 right-0 w-[512px]' />
          <Image src={Image1} alt='' className='w-full relative' />
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='bg-[#ffffff]'>
        <div className=' min-h-screen relative pt-12 pb-40 px-4'>
          <Link
            href='/events/your-city'
            className='fixed top-16 lg:top-32 left-[4%] flex items-center font-medium text-sm'>
            <svg width='33' height='32' viewBox='0 0 33 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M20.3996 22.7969L13.5996 15.9969L20.3996 9.19688'
                stroke='#222222'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {t('Back')}
          </Link>
          <div className='w-full flex flex-col items-center gap-1.5'>
            <div className='text-sm font-medium text-neutral-default'>{t('Topic of the day')}</div>
            <div className='uppercase  font-roboto text-[40px] font-bold'>{currentTopic?.title || 'No topic'}</div>
            <div className='flex items-center gap-1.5 font-medium text-xl text-gray-950'>
              <span>{moment().tz('Asia/Ho_Chi_Minh').format('ddd, DD MMMM')} GMT +7</span>
            </div>
            <div className='w-full max-w-[1129px] rounded-lg md:p-6 md:border border-border-primary mt-9'>
              <div className='grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-4'>
                <div className='rounded-3xl w-full max-w-32 border-[2px] border-neutral-500 outline outline-2 outline-neutral-black'>
                  <div className='aspect-square rounded-[22px] border-[2px] border-neutral-800 overflow-hidden'>
                    <Image
                      src={account.creator.avatar_url || UserGreen}
                      alt='creator avatar'
                      width={120}
                      height={120}
                    />
                  </div>
                </div>
                <div>
                  <div className='text-base font-bold text-green-500'>{account.creator.pen_name}</div>
                  <div
                    className='text-sm  whitespace-pre-wrap line-clamp-4 mt-2'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(account.creator?.bio) }}></div>
                </div>
              </div>
              <div className='mt-8 md:mt-12'>
                <div className=' font-semibold text-lg'>{t('Submit artwork')}</div>
                <div className='flex items-center gap-1.5 text-feedback-warning-500 bg-carot-100 p-2.5 rounded text-xs mt-4 font-semibold'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='21'
                    viewBox='0 0 20 21'
                    fill='none'
                    className='shrink-0'>
                    <path
                      d='M17.542 15.9895L10.8845 3.62617C10.4127 2.74961 9.15564 2.74961 8.68337 3.62617L2.02634 15.9895C1.92388 16.1797 1.87252 16.3934 1.87725 16.6094C1.88199 16.8255 1.94267 17.0366 2.05336 17.2223C2.16406 17.4079 2.32099 17.5616 2.50884 17.6685C2.69669 17.7754 2.90904 17.8317 3.12517 17.832H16.4412C16.6575 17.8321 16.8701 17.776 17.0582 17.6692C17.2463 17.5625 17.4035 17.4088 17.5144 17.2231C17.6254 17.0374 17.6862 16.8261 17.691 16.6099C17.6959 16.3937 17.6445 16.1799 17.542 15.9895ZM9.78415 15.918C9.62963 15.918 9.47859 15.8721 9.35011 15.7863C9.22164 15.7005 9.1215 15.5784 9.06237 15.4357C9.00324 15.2929 8.98777 15.1359 9.01791 14.9843C9.04806 14.8328 9.12246 14.6936 9.23172 14.5843C9.34098 14.475 9.48019 14.4006 9.63174 14.3705C9.78328 14.3403 9.94037 14.3558 10.0831 14.4149C10.2259 14.4741 10.3479 14.5742 10.4337 14.7027C10.5196 14.8312 10.5654 14.9822 10.5654 15.1367C10.5654 15.3439 10.4831 15.5426 10.3366 15.6891C10.1901 15.8357 9.99135 15.918 9.78415 15.918ZM10.6326 8.06055L10.4084 12.8262C10.4084 12.9919 10.3425 13.1509 10.2253 13.2681C10.1081 13.3853 9.94913 13.4512 9.78337 13.4512C9.61761 13.4512 9.45864 13.3853 9.34143 13.2681C9.22422 13.1509 9.15837 12.9919 9.15837 12.8262L8.93415 8.0625C8.92911 7.94867 8.94704 7.83499 8.98688 7.72823C9.02671 7.62148 9.08763 7.52383 9.166 7.44112C9.24437 7.35841 9.33859 7.29233 9.44305 7.24681C9.5475 7.20129 9.66006 7.17727 9.774 7.17617H9.7822C9.89691 7.17611 10.0105 7.1993 10.116 7.24432C10.2215 7.28935 10.3168 7.35528 10.3961 7.43815C10.4754 7.52102 10.5371 7.6191 10.5775 7.72647C10.6179 7.83385 10.6361 7.94829 10.631 8.06289L10.6326 8.06055Z'
                      fill='#f4741b'
                    />
                  </svg>
                  {t(
                    'Please note that only ONE submission is allowed per day. Please double-check your submission before submitting.'
                  )}
                </div>
              </div>
              <form
                onSubmit={form.handleSubmit(submitHandler)}
                className='flex flex-col items-center gap-8 md:gap-14 mt-4'>
                <div className='w-full mt-8 rounded-md  grid gap-11 grid-cols-1 md:grid-cols-[auto_1fr]'>
                  <Controller
                    name='artwork'
                    control={form.control}
                    render={({ field }) => (
                      <div className='min-w-[209px] flex flex-col items-center'>
                        <div className='flex flex-col items-center'>
                          <div className='text-sm font-medium'>
                            {t('Image')} (1:1) <span className='text-error-default'>*</span>
                          </div>
                          <div className='text-[10px] text-text-secondary mt-1'>
                            {locale == 'vn' ? 'Khuyến khích 480px x 480px' : '480px x 480px recommended'}
                          </div>
                        </div>
                        <div className='mt-4 relative overflow-hidden w-full'>
                          <label htmlFor='image'>
                            <div
                              className={`w-full cursor-pointer overflow-hidden mx-auto max-w-[180px] aspect-square grid place-items-center  border-border-primary rounded-2xl ${
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
                                    stroke='#0B0B0B'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                              )}
                              <input
                                id='image'
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
                  <div className='w-full -mt-0.5'>
                    <Controller
                      name='name'
                      control={form.control}
                      render={({ field }) => (
                        <div className='w-full'>
                          <label className='text-sm font-medium' htmlFor='pen-name'>
                            {t('Artwork')} <span className='text-error-default'>*</span>
                          </label>
                          <TextField
                            placeholder={t('Enter artwork name')}
                            id='pen-name'
                            className='mt-2 bg-transparent !border-border-primary [&_input]:!placeholder-neutral-950 [&_input::placeholder]:font-medium'
                            {...field}
                          />
                          <div className='mt-2 flex justify-between text-xs'>
                            <div className='text-text-error-primary-3'></div>
                            <div
                              className={
                                field.value.length > 25 ? 'text-text-error-primary-3' : 'text-text-secondary'
                              }>{`${field.value.length}/25`}</div>
                          </div>
                        </div>
                      )}
                    />
                    <Controller
                      name='description'
                      control={form.control}
                      render={({ field }) => (
                        <div className='w-full mt-2'>
                          <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium' htmlFor='bio'>
                              {t('Description')} <span className='text-error-default'>*</span>
                            </label>
                            <textarea
                              id='bio'
                              className='mt-2 bg-transparent !border-border-primary rounded-lg border text-sm py-2 px-3 min-h-20 placeholder:!text-neutral-950 placeholder:font-medium'
                              placeholder={t('Enter description')}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                          <div className='mt-2 flex justify-between text-xs'>
                            <div className='text-text-error-primary-3'></div>
                            <div
                              className={
                                field.value.length > 150 ? 'text-text-error-primary-3' : 'text-text-secondary'
                              }>{`${field.value.length}/150`}</div>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className='w-full space-y-8'>
                  <Controller
                    name='selectedIP'
                    control={form.control}
                    render={({ field }) => (
                      <div className='w-full space-y-8'>
                        <div className='space-y-4 relative z-10'>
                          <div className='flex flex-col gap-1.5 relative z-10 lg:flex-row lg:justify-between lg:items-center'>
                            <div>
                              <div className='text-lg font-semibold'>{t('Attach character')}</div>
                              <div className='text-sm'>
                                {t('Select maximum 4 characters, minimum 1 sponsored character.')}
                              </div>
                            </div>
                            <Link
                              href='/characters'
                              target='_blank'
                              className='font-semibold flex items-center gap-1 text-feedback-info-link-defaul'>
                              {t('View Character list')}
                              <svg
                                width='23'
                                height='24'
                                viewBox='0 0 23 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  d='M10 7.39844L15 12.3984L10 17.3984'
                                  stroke='#2D72FB'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </Link>
                          </div>
                          <div className='relative w-full lg:max-w-[500px]' ref={searchRef}>
                            <TextField
                              onChange={debounce((v) => fetchSearch(v.trim()), 1000)}
                              onFocus={() => setShowSearch(true)}
                              className='border border-border-primary [&_input::placeholder]:!text-text-secondary-on-brand '
                              placeholder={t('Search by character name, creator, IP')}
                              trailingComponent={
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'>
                                  <path
                                    d='M14.1057 14.2L17 17M16.0667 9.53333C16.0667 13.1416 13.1416 16.0667 9.53333 16.0667C5.92507 16.0667 3 13.1416 3 9.53333C3 5.92507 5.92507 3 9.53333 3C13.1416 3 16.0667 5.92507 16.0667 9.53333Z'
                                    stroke='#6D6D6D'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                  />
                                </svg>
                              }
                            />
                            {!!IPList.length && showSearch && (
                              <div className='absolute top-full mt-3 w-full rounded-lg p-4 border border-border-primary space-y-4 bg-white'>
                                {IPList.map((ip, index) => (
                                  <div
                                    key={index}
                                    className='flex gap-4 rounded-lg w-full cursor-pointer relative'
                                    onClick={() => {
                                      if (field.value.findIndex((i) => i.id === ip.id) === -1) {
                                        field.onChange([...field.value, ip])
                                      }
                                    }}>
                                    <Image
                                      src={ip.avatar_url}
                                      width={300}
                                      height={300}
                                      alt=''
                                      className='w-20 aspect-square object-cover border border-black'
                                    />
                                    <div className='text-sm'>
                                      {ip.is_default_character && (
                                        <div className='bg-neutral-black text-white w-fit rounded-sm px-1 text-[8px] leading-none py-1 font-medium'>
                                          Sponsor
                                        </div>
                                      )}
                                      <div className='font-bold'>{ip.name}</div>
                                      <div className='mt-0.5'>
                                        by <span className='text-text-brand-defaul'>{ip.authorizer_user.nickname}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='w-full rounded-lg bg-neutral-50 p-4'>
                          {field.value?.length > 0 ? (
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
                              {field.value.map((ip, index) => (
                                <div key={index}>
                                  <div className='relative'>
                                    <Image
                                      src={ip.avatar_url}
                                      width={500}
                                      height={500}
                                      alt=''
                                      className='rounded-lg border-[3px] border-black w-full aspect-square object-cover'
                                    />
                                    {ip.is_default_character && (
                                      <div className='bg-neutral-black text-white w-fit rounded-sm px-1 text-[8px] leading-none py-1 font-medium absolute top-2 left-2'>
                                        Sponsor
                                      </div>
                                    )}
                                    <div
                                      className='absolute top-2 right-2 w-[18px] h-[18px] bg-white grid place-items-center rounded cursor-pointer'
                                      onClick={() => {
                                        field.onChange(field.value.filter((i) => i.id !== ip.id))
                                      }}>
                                      <XMarkIcon width={14} height={14} />
                                    </div>
                                  </div>
                                  <div className='text-sm mt-4'>
                                    <div className='font-bold'>{ip.name}</div>
                                    <div className='mt-0.5'>
                                      by <span className='text-text-brand-defaul'>{ip.authorizer_user.nickname}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className='text-sm w-full flex items-center justify-center flex-col font-medium h-64'>
                              <span>{t('No characters attached.')}</span>
                              <span>{t('Please search and select.')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name='terms_agreed'
                    control={form.control}
                    render={({ field }) => (
                      <div className='flex gap-2 items-start w-full' onClick={() => field.onChange(!field.value)}>
                        <Checkbox checked={field.value} />
                        <div className='text-sm font-medium'>
                          {locale == 'en'
                            ? 'I agree to PunkgaMe minting this artwork as an NFT on Access Protocol and distributing it as a reward for subscribers. '
                            : 'Tôi cho phép PunkgaMe sử dung nội dung này để tạo NFT trên Access Protocol và sử dụng làm phần thưởng cho người đăng ký kênh. '}
                          <Link
                            href='https://www.accessprotocol.co/en'
                            target='_blank'
                            className='text-feedback-info-link-defaul'>
                            {t('Learn more')}
                          </Link>
                        </div>
                      </div>
                    )}
                  />
                  {submissions.findIndex(
                    (sub) => moment(sub.created_at).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')
                  ) != -1 ? (
                    <div className='flex items-center gap-1.5 text-feedback-warning-500 bg-carot-100 p-2.5 rounded text-xs mt-4 font-semibold w-full'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='21'
                        viewBox='0 0 20 21'
                        fill='none'
                        className='shrink-0'>
                        <path
                          d='M17.542 15.9895L10.8845 3.62617C10.4127 2.74961 9.15564 2.74961 8.68337 3.62617L2.02634 15.9895C1.92388 16.1797 1.87252 16.3934 1.87725 16.6094C1.88199 16.8255 1.94267 17.0366 2.05336 17.2223C2.16406 17.4079 2.32099 17.5616 2.50884 17.6685C2.69669 17.7754 2.90904 17.8317 3.12517 17.832H16.4412C16.6575 17.8321 16.8701 17.776 17.0582 17.6692C17.2463 17.5625 17.4035 17.4088 17.5144 17.2231C17.6254 17.0374 17.6862 16.8261 17.691 16.6099C17.6959 16.3937 17.6445 16.1799 17.542 15.9895ZM9.78415 15.918C9.62963 15.918 9.47859 15.8721 9.35011 15.7863C9.22164 15.7005 9.1215 15.5784 9.06237 15.4357C9.00324 15.2929 8.98777 15.1359 9.01791 14.9843C9.04806 14.8328 9.12246 14.6936 9.23172 14.5843C9.34098 14.475 9.48019 14.4006 9.63174 14.3705C9.78328 14.3403 9.94037 14.3558 10.0831 14.4149C10.2259 14.4741 10.3479 14.5742 10.4337 14.7027C10.5196 14.8312 10.5654 14.9822 10.5654 15.1367C10.5654 15.3439 10.4831 15.5426 10.3366 15.6891C10.1901 15.8357 9.99135 15.918 9.78415 15.918ZM10.6326 8.06055L10.4084 12.8262C10.4084 12.9919 10.3425 13.1509 10.2253 13.2681C10.1081 13.3853 9.94913 13.4512 9.78337 13.4512C9.61761 13.4512 9.45864 13.3853 9.34143 13.2681C9.22422 13.1509 9.15837 12.9919 9.15837 12.8262L8.93415 8.0625C8.92911 7.94867 8.94704 7.83499 8.98688 7.72823C9.02671 7.62148 9.08763 7.52383 9.166 7.44112C9.24437 7.35841 9.33859 7.29233 9.44305 7.24681C9.5475 7.20129 9.66006 7.17727 9.774 7.17617H9.7822C9.89691 7.17611 10.0105 7.1993 10.116 7.24432C10.2215 7.28935 10.3168 7.35528 10.3961 7.43815C10.4754 7.52102 10.5371 7.6191 10.5775 7.72647C10.6179 7.83385 10.6361 7.94829 10.631 8.06289L10.6326 8.06055Z'
                          fill='#f4741b'
                        />
                      </svg>
                      {t('You’ve already submitted your artwork for today. Please comeback tomorrow.')}
                    </div>
                  ) : (
                    <div className='flex flex-col items-center gap-4'>
                      <div className='flex items-center gap-1'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                          <path
                            d='M13.1201 14.2565C13.1201 14.9737 12.5387 15.5552 11.8214 15.5552C11.1042 15.5552 10.5227 14.9737 10.5227 14.2565C10.5227 13.5392 11.1042 12.9578 11.8214 12.9578C12.5387 12.9578 13.1201 13.5392 13.1201 14.2565Z'
                            fill='#D9D9D9'
                          />
                          <path
                            d='M19.5415 3.37082C19.151 2.98029 18.5178 2.98029 18.1273 3.37082C17.7368 3.76134 17.7368 4.3945 18.1273 4.78503L19.5415 3.37082ZM20.465 7.12269C20.8555 7.51322 21.4887 7.51322 21.8792 7.12269C22.2697 6.73217 22.2697 6.099 21.8792 5.70848L20.465 7.12269ZM12.8214 9.84091C12.8214 9.28862 12.3737 8.84091 11.8214 8.84091C11.2691 8.84091 10.8214 9.28862 10.8214 9.84091H12.8214ZM10.8214 13.2175C10.8214 13.7698 11.2691 14.2175 11.8214 14.2175C12.3737 14.2175 12.8214 13.7698 12.8214 13.2175H10.8214ZM9.22403 1C8.67174 1 8.22403 1.44772 8.22403 2C8.22403 2.55228 8.67174 3 9.22403 3V1ZM14.1591 3C14.7114 3 15.1591 2.55228 15.1591 2C15.1591 1.44772 14.7114 1 14.1591 1V3ZM17.3481 6.4877C16.9576 6.87822 16.9576 7.51139 17.3481 7.90191C17.7386 8.29244 18.3718 8.29244 18.7623 7.90191L17.3481 6.4877ZM20.0032 5.24675L20.7104 4.53965L20.0032 5.24675ZM10.8214 9.84091V13.2175H12.8214V9.84091H10.8214ZM9.22403 3H14.1591V1H9.22403V3ZM18.7623 7.90191L20.7104 5.95386L19.2961 4.53965L17.3481 6.4877L18.7623 7.90191ZM19.3929 13.4286C19.3929 17.6102 16.003 21 11.8214 21V23C17.1076 23 21.3929 18.7147 21.3929 13.4286H19.3929ZM11.8214 21C7.63984 21 4.25 17.6102 4.25 13.4286H2.25C2.25 18.7147 6.53527 23 11.8214 23V21ZM4.25 13.4286C4.25 9.24699 7.63984 5.85714 11.8214 5.85714V3.85714C6.53527 3.85714 2.25 8.14242 2.25 13.4286H4.25ZM11.8214 5.85714C16.003 5.85714 19.3929 9.24699 19.3929 13.4286H21.3929C21.3929 8.14242 17.1076 3.85714 11.8214 3.85714V5.85714ZM12.1201 14.2565C12.1201 14.4215 11.9864 14.5552 11.8214 14.5552V16.5552C13.091 16.5552 14.1201 15.526 14.1201 14.2565H12.1201ZM11.8214 14.5552C11.6565 14.5552 11.5227 14.4215 11.5227 14.2565H9.52273C9.52273 15.526 10.5519 16.5552 11.8214 16.5552V14.5552ZM11.5227 14.2565C11.5227 14.0915 11.6565 13.9578 11.8214 13.9578V11.9578C10.5519 11.9578 9.52273 12.987 9.52273 14.2565H11.5227ZM11.8214 13.9578C11.9864 13.9578 12.1201 14.0915 12.1201 14.2565H14.1201C14.1201 12.987 13.091 11.9578 11.8214 11.9578V13.9578ZM18.1273 4.78503L19.2961 5.95386L20.7104 4.53965L19.5415 3.37082L18.1273 4.78503ZM19.2961 5.95386L20.465 7.12269L21.8792 5.70848L20.7104 4.53965L19.2961 5.95386Z'
                            fill='black'
                          />
                        </svg>
                        <Countdown
                          date={moment().tz('Asia/Ho_Chi_Minh').add(1, 'day').startOf('day').valueOf()}
                          now={() => moment().tz('Asia/Ho_Chi_Minh').valueOf()}
                          renderer={({ hours, minutes, seconds }) => {
                            return (
                              <span className='text-feedback-error-defaul'>{`${zeroPad(hours)}:${zeroPad(
                                minutes
                              )}:${zeroPad(seconds)}`}</span>
                            )
                          }}
                        />
                      </div>
                      <button
                        type='submit'
                        className='p-2.5 text-center font-roboto text-[22px] uppercase font-bold  text-white bg-neutral-black w-64'>
                        {t(loading ? 'Submitting' : 'Submit')}
                      </button>
                    </div>
                  )}
                </div>
              </form>
              <div className='mt-8 md:mt-14'>
                <SubmissionTable />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full relative mt-20'>
          <Image src={Image2} alt='' className='absolute bottom-full -mb-3 right-0 w-[512px]' />
          <Image src={Image1} alt='' className='w-full relative' />
        </div>
      </div>
      <Modal open={!!milestone} setOpen={() => setMilestone(0)}>
        <div className='p-8 rounded-mlg bg-white w-full max-w-[547px] relative'>
          <div className='absolute top-3 right-3' onClick={() => setMilestone(0)}>
            <XMarkIcon width={20} height={20} />
          </div>
          <div className='flex flex-col items-center gap-8'>
            <div className='uppercase text-3xl text-stroke font-jaro text-[#00FF94]'>congraturations!!!</div>
            <Image src={Congrats} alt='' className='w-[289px]' />
            {milestone === 7 ? (
              <>
                <div className='text-lg font-semibold text-neutral-black'>
                  🎉 7 Drawings in Punktober - Your City! 🎉
                </div>
                <div className='p-4 bg-neutral-50 rounded-md text-sm'>
                  You’ve hit your 7 milestone! Your creative spark is lighting up Punktober. Keep the energy alive—your
                  city is counting on your talent to shine! 🖌✨
                </div>
              </>
            ) : milestone === 15 ? (
              <>
                <div className='text-lg font-semibold text-neutral-black'>
                  🌟 15 Drawings Done—Halfway Through Punktober! 🌟
                </div>
                <div className='p-4 bg-neutral-50 rounded-md text-sm'>
                  You're halfway through the challenge, and your commitment is inspiring. Every drawing adds life to
                  your city’s story. Keep the momentum going—you're unstoppable! 🚀🎨
                </div>
              </>
            ) : milestone === 20 ? (
              <>
                <div className='text-lg font-semibold text-neutral-black'>
                  👏 20 Drawings—Punktober Hero in Action! 👏
                </div>
                <div className='p-4 bg-neutral-50 rounded-md text-sm'>
                  With 20 creations, you’re shaping Punktober - Your City into something unforgettable. Stay strong and
                  finish this challenge like the star artist you are! 💪🌟
                </div>
              </>
            ) : milestone === 31 ? (
              <>
                <div className='text-lg font-semibold text-neutral-black'>🏆 31 Drawings—Punktober Champion! 🏆</div>
                <div className='p-4 bg-neutral-50 rounded-md text-sm'>
                  You’ve conquered Punktober - Your City! Your art and dedication have inspired the community. Celebrate
                  your journey—you’re the heart of this event! 🎉🎨
                </div>
              </>
            ) : (
              <></>
            )}
            <div className='space-y-4 flex flex-col items-center'>
              <button
                onClick={() => {
                  navigator.share({
                    url: `${location.origin}/events/your-city/${account.id}`,
                  })
                }}
                className='bg-black p-2.5 uppercase text-[22px] font-bold font-roboto min-w-56 text-white'>
                Share
              </button>
              <Link href={`/events/your-city/${account.id}`} className='flex items-center gap-1.5 shrink-0'>
                <svg width='23' height='24' viewBox='0 0 23 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19.9193 2.67672C17.2979 -0.780405 13.0118 -0.284829 11.5489 1.78985C9.5528 4.62134 11.6653 6.07747 8.2901 8.58623C6.55321 9.87717 1.82924 9.81795 0.4717 13.8956C-0.884984 17.9682 2.1924 24.3557 9.37334 23.8046C14.0414 23.4903 18.3292 21.0538 20.4696 17.1105C22.9104 12.614 22.5921 6.20214 19.9193 2.67672ZM3.84609 17.6942C1.23125 18.109 1.64041 14.9607 2.64188 13.5134C3.56186 12.1839 5.54038 11.1007 6.60659 11.741C9.05533 13.211 5.97482 17.357 3.84609 17.6945V17.6942Z'
                    fill='#F6A654'
                  />
                  <path
                    d='M19.9192 2.67934L20.0462 2.58357C18.6605 0.754557 16.8052 -0.00113212 15.1311 1.27287e-06C13.5725 0.000851317 12.1633 0.648018 11.4188 1.70094C10.9083 2.42433 10.6564 3.06923 10.5173 3.65944C10.4128 4.10203 10.3711 4.51289 10.3265 4.90419C10.2597 5.49214 10.1876 6.03135 9.90652 6.59719C9.62542 7.16276 9.13079 7.76544 8.19491 8.46134C7.78915 8.76396 7.18009 9.0014 6.47534 9.23913C5.41794 9.59757 4.147 9.96195 3.00356 10.6295C1.86012 11.296 0.841894 12.2778 0.320573 13.8481C0.105911 14.4924 0 15.1906 0 15.9086C0.000567888 17.7875 0.724341 19.8057 2.1523 21.3605C3.5794 22.9152 5.71664 24.0002 8.51434 23.999C8.798 23.999 9.08848 23.988 9.38577 23.9653H9.38435C14.0995 23.6479 18.4388 21.1868 20.6098 17.1885C21.7416 15.1025 22.2851 12.6192 22.2853 10.1957C22.2845 7.32398 21.5235 4.53357 20.0464 2.58357L19.9195 2.67934L19.7926 2.77511C21.2146 4.64861 21.9676 7.37952 21.967 10.1957C21.967 12.5722 21.4324 15.0072 20.3301 17.0374C18.2204 20.9258 13.9834 23.338 9.36305 23.6488H9.36163C9.0723 23.6712 8.79005 23.6819 8.51463 23.6819C5.79984 23.6808 3.75942 22.6381 2.38712 21.1463C1.01567 19.6544 0.318017 17.707 0.318585 15.9089C0.318585 15.222 0.420237 14.5573 0.622973 13.9484C0.954052 12.9555 1.48559 12.2208 2.12816 11.6484C3.09158 10.7905 4.31169 10.3028 5.4628 9.91123C6.03835 9.71516 6.59602 9.54316 7.09576 9.35757C7.5955 9.17169 8.03846 8.97363 8.38543 8.71607C9.24124 8.08024 9.75944 7.50278 10.0806 6.94571C10.3214 6.52834 10.4497 6.12457 10.5286 5.72817C10.647 5.13257 10.6601 4.55595 10.7825 3.93967C10.9049 3.32311 11.1309 2.66262 11.6792 1.8837C12.345 0.9359 13.6597 0.316784 15.1311 0.317634C16.711 0.318768 18.4632 1.02374 19.7926 2.77511L19.9195 2.67934H19.9192ZM3.84602 17.6968L3.82103 17.5401C3.66884 17.5642 3.52914 17.5755 3.4008 17.5755C3.13985 17.5755 2.92803 17.529 2.75596 17.4503C2.49842 17.3316 2.32295 17.1406 2.20397 16.8884C2.08557 16.6365 2.02963 16.3231 2.02992 15.9825C2.02793 15.1719 2.34907 14.2153 2.77271 13.6064C3.12395 13.0983 3.64414 12.6198 4.20407 12.2729C4.76344 11.9253 5.36342 11.7119 5.8589 11.713C6.11246 11.713 6.33678 11.7669 6.52447 11.8794C6.82317 12.059 7.02619 12.2752 7.15794 12.518C7.28941 12.7611 7.34989 13.034 7.34989 13.3295C7.35017 13.7463 7.22694 14.2074 7.01342 14.6658C6.6937 15.3538 6.17152 16.0341 5.58887 16.56C5.00707 17.0867 4.36223 17.4557 3.82075 17.5398L3.84574 17.6965L3.87072 17.8532C4.29607 17.7852 4.73931 17.5823 5.17034 17.2924C5.81631 16.8567 6.43474 16.222 6.89728 15.5198C7.35869 14.8174 7.66677 14.0475 7.66791 13.3293C7.66791 12.9904 7.59749 12.6623 7.43763 12.367C7.27805 12.0715 7.02989 11.8116 6.6883 11.6071C6.44184 11.4592 6.15704 11.3951 5.8589 11.3951C5.27454 11.3963 4.63226 11.6343 4.03626 12.0029C3.44083 12.3724 2.89254 12.8748 2.51092 13.4256C2.04724 14.0986 1.7136 15.0911 1.71161 15.9822C1.71218 16.4809 1.81753 16.953 2.08954 17.3117C2.22527 17.4905 2.40359 17.6384 2.62336 17.7387C2.84313 17.8393 3.10237 17.8929 3.4008 17.8929C3.5476 17.8929 3.70405 17.8801 3.87072 17.8535L3.84574 17.6968H3.84602Z'
                    fill='#581E18'
                  />
                  <path
                    d='M20.8797 8.60778C20.8797 9.90126 19.8288 10.9502 18.5326 10.9502C17.2364 10.9502 16.1855 9.90126 16.1855 8.60778C16.1855 7.3143 17.2364 6.26562 18.5326 6.26562C19.8288 6.26562 20.8797 7.3143 20.8797 8.60778Z'
                    fill='#61B9D9'
                  />
                  <path
                    d='M20.8793 8.6102H20.7202C20.7202 9.21374 20.4755 9.75861 20.0794 10.1542C19.683 10.5497 19.137 10.7937 18.5322 10.7937C17.9274 10.7937 17.3816 10.5494 16.985 10.1542C16.5889 9.75861 16.3441 9.21345 16.3441 8.6102C16.3441 8.00696 16.5889 7.46208 16.985 7.06624C17.3813 6.67097 17.9274 6.42672 18.5322 6.42672C19.1367 6.42672 19.6827 6.67097 20.0794 7.06624C20.4755 7.4618 20.7202 8.00667 20.7202 8.6102H21.0385C21.0385 7.22888 19.9164 6.10938 18.5325 6.10938C17.1482 6.10938 16.0264 7.22917 16.0264 8.6102C16.0264 9.99153 17.1485 11.1113 18.5325 11.1113C19.9167 11.1113 21.0385 9.99153 21.0385 8.6102H20.8795H20.8793Z'
                    fill='#581E18'
                  />
                  <path
                    d='M17.2962 3.92809C17.2962 5.22158 16.2453 6.27025 14.9491 6.27025C13.6529 6.27025 12.6021 5.22158 12.6021 3.92809C12.6021 2.63461 13.6529 1.58594 14.9491 1.58594C16.2453 1.58594 17.2962 2.63461 17.2962 3.92809Z'
                    fill='#E73A3A'
                  />
                  <path
                    d='M17.296 3.9227H17.137C17.137 4.52595 16.8923 5.07083 16.4962 5.46667C16.0998 5.86194 15.5538 6.10619 14.949 6.10619C14.3444 6.10619 13.7984 5.86194 13.402 5.46667C13.0059 5.07111 12.7612 4.52624 12.7612 3.9227C12.7612 3.31917 13.0059 2.7743 13.402 2.37874C13.7984 1.98347 14.3444 1.73922 14.949 1.73922C15.5538 1.73922 16.0998 1.98347 16.4962 2.37874C16.8923 2.7743 17.137 3.31917 17.137 3.9227H17.4553C17.4553 2.54138 16.3335 1.42188 14.949 1.42188C13.565 1.42188 12.4429 2.54138 12.4429 3.9227C12.4429 5.30374 13.565 6.42354 14.949 6.42354C16.3332 6.42354 17.455 5.30374 17.4553 3.9227H17.2963H17.296Z'
                    fill='#581E18'
                  />
                  <path
                    d='M20.0877 14.6237C20.0877 15.9172 19.0368 16.9661 17.7406 16.9661C16.4444 16.9661 15.3936 15.9175 15.3936 14.6237C15.3936 13.3299 16.4444 12.2812 17.7406 12.2812C19.0368 12.2812 20.0877 13.3299 20.0877 14.6237Z'
                    fill='#95C11F'
                  />
                  <path
                    d='M20.0871 14.6261H19.928C19.928 15.2296 19.6833 15.7745 19.2872 16.1701C18.8908 16.5653 18.3448 16.8096 17.74 16.8096C17.1352 16.8096 16.5892 16.5653 16.1928 16.1701C15.7967 15.7745 15.5519 15.2296 15.5519 14.6261C15.5519 14.0226 15.7967 13.4777 16.1928 13.0821C16.5892 12.6869 17.1352 12.4426 17.74 12.4426C18.3448 12.4426 18.8905 12.6869 19.2872 13.0821C19.6833 13.4777 19.928 14.0226 19.928 14.6261H20.2464C20.2464 13.2448 19.1242 12.125 17.7403 12.125C16.356 12.125 15.2342 13.2448 15.2339 14.6261C15.2339 16.0074 16.356 17.1269 17.7403 17.1272C19.1245 17.1272 20.2464 16.0074 20.2464 14.6261H20.0873H20.0871Z'
                    fill='#581E18'
                  />
                  <path
                    d='M9.77766 19.975C9.77766 21.2687 8.72678 22.3171 7.43058 22.3171C6.13437 22.3171 5.0835 21.2685 5.0835 19.975C5.0835 18.6815 6.13437 17.6328 7.43058 17.6328C8.72678 17.6328 9.77766 18.6815 9.77766 19.975Z'
                    fill='#7C5DA4'
                  />
                  <path
                    d='M9.7772 19.9774H9.61819C9.61819 20.5809 9.37344 21.1258 8.97733 21.5214C8.58095 21.9166 8.03492 22.1609 7.43041 22.1609C6.82561 22.1609 6.27958 21.9166 5.88319 21.5214C5.48709 21.1258 5.24233 20.5809 5.24233 19.9774C5.24233 19.3739 5.48709 18.8293 5.88319 18.4334C6.27958 18.0382 6.82561 17.7939 7.43041 17.7939C8.03492 17.7939 8.58095 18.0382 8.97733 18.4334C9.37344 18.829 9.61819 19.3739 9.61819 19.9774H9.9365C9.9365 18.5961 8.81463 17.4766 7.43041 17.4766C6.04618 17.4766 4.92432 18.5964 4.92432 19.9774C4.92432 21.3587 6.04618 22.4782 7.43041 22.4785C8.81435 22.4785 9.9365 21.3587 9.9365 19.9774H9.77749H9.7772Z'
                    fill='#581E18'
                  />
                  <path
                    d='M15.869 18.8343C15.869 20.1278 14.8181 21.1765 13.5219 21.1765C12.2257 21.1765 11.1748 20.1278 11.1748 18.8343C11.1748 17.5409 12.2257 16.4922 13.5219 16.4922C14.8181 16.4922 15.869 17.5406 15.869 18.8343Z'
                    fill='#FFCA00'
                  />
                  <path
                    d='M15.8685 18.829H15.7095C15.7095 19.4325 15.4647 19.9771 15.0686 20.3729C14.6723 20.7682 14.1262 21.0124 13.5214 21.0124C12.9166 21.0124 12.3709 20.7682 11.9742 20.3729C11.5781 19.9774 11.3334 19.4325 11.3334 18.829C11.3334 18.2254 11.5781 17.6805 11.9742 17.285C12.3706 16.8897 12.9166 16.6458 13.5214 16.6455C14.1259 16.6455 14.672 16.8894 15.0686 17.285C15.4647 17.6805 15.7095 18.2254 15.7095 18.829H16.0278C16.0278 17.4476 14.9057 16.3281 13.5217 16.3281C12.1378 16.3281 11.0156 17.4476 11.0156 18.829C11.0156 20.2103 12.1378 21.3298 13.5217 21.3298C14.9057 21.3298 16.0278 20.2103 16.0278 18.829H15.8688H15.8685Z'
                    fill='#581E18'
                  />
                  <path
                    d='M7.84497 11.9592C7.79954 11.917 7.73764 11.9802 7.77739 12.0264C8.21466 12.5293 8.28849 13.1266 8.23993 13.7687C8.19564 14.3487 7.86314 14.8321 7.78278 15.3857C7.77284 15.4554 7.84724 15.5512 7.92277 15.4928C8.39923 15.1253 8.51678 14.3322 8.55341 13.7687C8.59855 13.0827 8.3467 12.4247 7.84468 11.9592H7.84497Z'
                    fill='#581E18'
                  />
                  <path
                    d='M10.9358 6.24645C10.4028 7.79778 9.12962 8.51436 7.99016 9.57947C7.97539 9.59335 7.99442 9.61772 8.01174 9.60724C9.20146 8.88725 10.8418 7.77086 11.0962 6.29065C11.1141 6.18581 10.9707 6.14387 10.9358 6.24645Z'
                    fill='#581E18'
                  />
                  <path
                    d='M11.1104 5.70312C10.9059 5.70312 10.9059 6.01962 11.1104 6.01962C11.3148 6.01962 11.3151 5.70312 11.1104 5.70312Z'
                    fill='#581E18'
                  />
                  <path
                    d='M14.476 5.04668C14.3402 4.90473 14.1469 4.82907 13.9986 4.70071C13.8524 4.57377 13.705 4.37656 13.6326 4.19805C13.613 4.15045 13.5321 4.15102 13.5352 4.21137C13.548 4.45704 13.5892 4.63526 13.7385 4.83814C13.8828 5.03393 14.0816 5.24049 14.3169 5.31983C14.4785 5.37395 14.5841 5.15946 14.476 5.04668Z'
                    fill='#581E18'
                  />
                  <path
                    d='M14.6982 4.55052C14.6196 4.48932 14.554 4.51086 14.4617 4.49527C14.3609 4.47827 14.2831 4.42557 14.2317 4.33915C14.1993 4.28418 14.1235 4.32243 14.1338 4.37995C14.1553 4.49895 14.2093 4.62306 14.3158 4.68795C14.4194 4.75142 14.6119 4.79392 14.6979 4.68738C14.728 4.65026 14.7428 4.58538 14.6979 4.55024L14.6982 4.55052Z'
                    fill='#581E18'
                  />
                  <path
                    d='M19.3214 7.6751C19.2677 7.63402 19.2175 7.71761 19.2544 7.76209C19.3665 7.89866 19.4069 8.08737 19.4219 8.26078C19.4367 8.43136 19.3955 8.60392 19.4157 8.76996C19.4307 8.89917 19.6136 8.98559 19.6865 8.84306C19.8932 8.43788 19.651 7.92757 19.3214 7.67482V7.6751Z'
                    fill='#581E18'
                  />
                  <path
                    d='M20.1025 8.05085C20.0628 7.94969 19.927 7.98908 19.9421 8.09505C19.9679 8.27753 19.954 8.46935 19.9188 8.64956C19.8893 8.80031 19.8254 8.94765 19.8793 9.09895C19.8901 9.12927 19.9225 9.14429 19.952 9.12842C20.2791 8.95076 20.215 8.33618 20.1022 8.05085H20.1025Z'
                    fill='#581E18'
                  />
                  <path
                    d='M18.6984 13.8723C18.6703 13.8312 18.5993 13.8556 18.6149 13.9074C18.7276 14.2758 18.7327 14.7127 18.6703 15.0904C18.6322 15.3202 18.5439 15.5446 18.3974 15.7268C18.2994 15.8486 18.1867 15.877 18.1308 16.0243C18.114 16.0679 18.1487 16.1206 18.1915 16.1311C18.601 16.2328 18.8557 15.5681 18.9295 15.2672C19.0473 14.7872 18.9772 14.2792 18.6984 13.8723Z'
                    fill='#581E18'
                  />
                  <path
                    d='M19.3416 14.5977C19.3169 14.5475 19.2368 14.5719 19.2383 14.6257C19.2437 14.8346 19.1395 15.0227 19.0997 15.2219C19.0722 15.3602 19.2397 15.4248 19.32 15.3148C19.4739 15.1043 19.4509 14.8173 19.3413 14.5977H19.3416Z'
                    fill='#581E18'
                  />
                  <path
                    d='M15.1021 19.0698C15.0859 19.0612 15.0644 19.059 15.0482 19.0698C14.9468 19.1375 14.9406 19.2687 14.9034 19.378C14.8469 19.5449 14.7461 19.6676 14.6149 19.7824C14.3823 19.9858 14.0603 20.1428 13.7875 20.2859C13.7557 20.3026 13.7687 20.3595 13.8065 20.3559C14.2066 20.3153 14.5439 20.2054 14.8599 19.9427C15.03 19.8016 15.4315 19.2409 15.1021 19.0695V19.0698Z'
                    fill='#581E18'
                  />
                  <path
                    d='M14.8558 18.7999C14.849 18.7293 14.7712 18.7123 14.7297 18.7659C14.5855 18.9529 14.5142 19.1943 14.3225 19.3479C14.2626 19.396 14.3271 19.4952 14.3958 19.4734C14.692 19.3793 14.8842 19.1098 14.8555 18.7996L14.8558 18.7999Z'
                    fill='#581E18'
                  />
                  <path
                    d='M8.39391 20.9722C8.20935 21.0291 8.08668 21.1926 7.91916 21.2864C7.68377 21.4184 7.39926 21.404 7.15478 21.3065C7.12582 21.2955 7.10566 21.3366 7.12582 21.3561C7.3172 21.544 7.54123 21.6522 7.81495 21.5919C8.07334 21.5346 8.44105 21.3578 8.49386 21.0722C8.50465 21.0144 8.45752 20.9529 8.3942 20.9725L8.39391 20.9722Z'
                    fill='#581E18'
                  />
                  <path
                    d='M8.29877 20.6322C8.10569 20.5991 7.91147 20.6909 7.71725 20.6821C7.66614 20.6799 7.64684 20.7538 7.69142 20.7779C7.89018 20.8864 8.15396 20.87 8.31638 20.6983C8.33512 20.6784 8.32972 20.6373 8.29905 20.6322H8.29877Z'
                    fill='#581E18'
                  />
                  <path
                    d='M4.58752 22.005C4.47195 21.8475 4.36632 21.8126 4.18772 21.7186C3.85239 21.5412 3.55311 21.2998 3.26689 21.0538C2.745 20.6056 2.23873 20.0219 1.88863 19.4297L1.875 19.4376C2.18847 20.0488 2.53148 20.571 3.00538 21.0725C3.33674 21.4233 4.02162 22.1342 4.54606 22.0764C4.57786 22.073 4.6108 22.0373 4.58723 22.005H4.58752Z'
                    fill='#581E18'
                  />
                  <path
                    d='M5.05125 22.2734C4.91325 22.2734 4.91325 22.4871 5.05125 22.4871C5.18925 22.4871 5.18925 22.2734 5.05125 22.2734Z'
                    fill='#581E18'
                  />
                  <path
                    d='M17.1256 18.0844C17.0853 18.0425 17.0165 18.0646 16.9998 18.1176C16.8905 18.4675 16.9757 18.86 16.8771 19.2283C16.7664 19.6431 16.596 20.0308 16.3754 20.3985C16.355 20.4325 16.4049 20.4731 16.4316 20.4416C16.7218 20.0985 16.9907 19.7259 17.1483 19.3034C17.2806 18.9487 17.4183 18.3854 17.1253 18.0847L17.1256 18.0844Z'
                    fill='#581E18'
                  />
                  <path
                    d='M20.9501 6.86181C20.5906 6.40505 20.2181 5.8154 19.64 5.61253C18.9051 5.35496 18.2007 5.39577 17.4982 5.72927C17.4593 5.74768 17.4871 5.81087 17.5271 5.79784C18.2543 5.56606 19.0377 5.53149 19.7396 5.86612C20.2067 6.08855 20.4909 6.60935 20.8717 6.94058C20.9271 6.98846 20.9938 6.91763 20.9501 6.86209V6.86181Z'
                    fill='#581E18'
                  />
                  <path
                    d='M14.0586 6.8477C13.8596 6.70036 13.6168 6.65361 13.3967 6.53715C13.1517 6.40709 12.9555 6.21102 12.7704 6.00927C12.3308 5.53127 12.0642 4.84386 11.981 4.2086C11.9787 4.19131 11.952 4.19046 11.9532 4.2086C11.998 4.92632 12.1514 5.56413 12.5881 6.14981C12.8845 6.54763 13.5191 7.05143 14.0444 6.95622C14.1009 6.94602 14.0949 6.87462 14.0586 6.8477Z'
                    fill='#581E18'
                  />
                  <path
                    d='M16.7474 11.5573C16.2914 11.3711 15.6675 11.9996 15.406 12.3127C15.0409 12.7507 14.8353 13.2916 14.864 13.8589C14.8671 13.9161 14.9486 13.9295 14.9653 13.8725C15.1198 13.3466 15.3274 12.8459 15.7008 12.4362C15.8839 12.2356 16.1108 12.0902 16.3473 11.9619C16.539 11.8582 16.6741 11.8596 16.8005 11.6882C16.8382 11.6372 16.7948 11.5768 16.7471 11.5573H16.7474Z'
                    fill='#581E18'
                  />
                  <path
                    d='M7.81254 16.9201C7.7654 16.9235 7.75064 16.9932 7.80089 17.0054C8.27508 17.1221 8.71917 17.2748 9.12776 17.5483C9.5869 17.8563 9.79787 18.3159 10.027 18.7947C10.0878 18.9222 10.263 18.8265 10.2408 18.7046C10.0458 17.629 8.87108 16.8385 7.81254 16.9198V16.9201Z'
                    fill='#581E18'
                  />
                  <path
                    d='M19.4685 2.803C19.2907 2.58 19.1084 2.36154 18.9136 2.15328C18.743 1.97052 18.5533 1.80873 18.3506 1.6628C18.1257 1.50101 17.9363 1.49846 17.6759 1.45312L17.6714 1.46418C18.099 1.67045 18.5039 2.07366 18.8165 2.42246C19.0795 2.71572 19.3353 3.28242 19.7192 3.41928C19.7703 3.43741 19.8032 3.38414 19.7973 3.34136C19.7677 3.12743 19.5996 2.9679 19.4682 2.80328L19.4685 2.803Z'
                    fill='#581E18'
                  />
                  <path
                    d='M20.1547 3.82607L20.149 3.81162C20.1002 3.68779 19.9452 3.68779 19.8963 3.81162L19.8906 3.82607C19.8049 4.04453 20.2405 4.04453 20.1547 3.82607Z'
                    fill='#581E18'
                  />
                  <path
                    d='M2.30391 12.0912C1.6886 12.4678 1.26893 13.2011 1.13236 13.8944C1.12724 13.9199 1.16132 13.9284 1.1704 13.9049C1.44611 13.2107 1.91576 12.729 2.3607 12.1482C2.38682 12.1139 2.33713 12.0708 2.30362 12.0912H2.30391Z'
                    fill='#581E18'
                  />
                  <path
                    d='M2.63328 12.501C2.2863 12.5976 2.04495 12.9631 1.8601 13.2476C1.84534 13.2705 1.87884 13.2958 1.8973 13.2765C2.0211 13.1464 2.15228 13.0277 2.28801 12.9104C2.41947 12.7965 2.56372 12.6868 2.66934 12.5474C2.68695 12.5245 2.65827 12.4942 2.63357 12.501H2.63328Z'
                    fill='#581E18'
                  />
                </svg>
                <span className='text-feedback-info-link-defaul text-sm font-semibold'>View My Progress</span>
                <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M10.2852 7L15.2852 12L10.2852 17'
                    stroke='#2D72FB'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
