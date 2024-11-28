import TextField from 'components/Input/TextField'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
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
import Modal from 'components/pages/event/your-city/Modal'
import axios from 'axios'
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
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz('2025-01-01', 'Asia/Ho_Chi_Minh'))) {
      replace('/events/your-city/home')
    }
  }, [])

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
      terms_agreed: true,
    },
  })
  const { data } = useSWR('get-all-topic', () => eventService.punktober.getAllTopic(), {
    revalidateOnFocus: false,
  })
  const topics = data?.data?.data?.artwork_topics
  const currentTopic = topics?.find((topic) => topic.date == moment().format('YYYY-MM-DD'))
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
        setOpen(false)

        return
      }
      if (data.name.length > 150) {
        setOpen(false)

        return
      }
      setLoading(true)
      const payload = new FormData()
      payload.append('name', data.name)
      payload.append('artwork', data.artwork)
      payload.append('description', data.description)
      payload.append('contest_id', '4')
      payload.append('artwork_topic_id', currentTopic.id)
      const res = await eventService.story.submitArtwork(payload)
      if (res.data.errors?.[0]?.message) {
        toast(res.data.errors?.[0]?.message, {
          type: 'error',
        })
        setLoading(false)
      } else {
        await mutate('get-submissions')
        toast(
          t(
            'Submit artwork successfully. Your artwork need to be approved by admin. This process may take upto 24 hours after you submitted'
          ),
          {
            type: 'success',
          }
        )
        form.reset()
        setLoading(false)
      }
      setOpen(false)
    } catch (error) {
      setLoading(false)
      toast(error.message, {
        type: 'error',
      })
    }
  }
  if (!account) return <div className='w-full text-center py-12'>{t('Login to continue')}</div>
  if (!account.creator) {
    return (
      <>
        <div className='bg-[#DBDBDB] min-h-screen relative py-12'>
          <Link
            href='/events/your-city/home'
            className='absolute top-12 left-[4%] flex items-center font-medium text-sm'>
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
            <div className='mx-auto w-full max-w-[860px] border-[3px] border-gray-black p-6 rounded-md bg-gray-900 text-white'>
              <div className='text-lg font-semibold w-full'>{t('Creator’s information')}</div>
              <div className='text-sm font-medium text-text-quatenary mt-2 w-full'>
                {t(
                  'We found that you have not registered as a Punkga Creator, please provide some information before submitting your works.'
                )}
              </div>
              <div className='bg-neutral-100 border-[3px] border-neutral-black text-neutral-black rounded-md px-4 py-6 flex flex-col items-center mt-6 md:flex-row md:items-start gap-5 md:gap-3'>
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
                            className={`w-full cursor-pointer overflow-hidden mx-auto max-w-[180px] aspect-square grid place-items-center  border-neutral-400 rounded-full ${
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
                          className='mt-2 bg-transparent !border-neutral-default [&_input]:!placeholder-neutral-950 [&_input::placeholder]:font-medium'
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
                            className='mt-2 bg-transparent !border-neutral-default rounded-lg border text-sm py-2 px-3 min-h-20 placeholder:!text-neutral-950 placeholder:font-medium'
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
              {t('Confirm & Next Step')}
            </button>
          </form>
        </div>
        <div className='sticky w-full bottom-0'>
          <Image src={Image2} alt='' className='absolute bottom-full -mb-3 right-0 w-[512px]' />
          <Image src={Image1} alt='' className='w-full relative' />
        </div>
      </>
    )
  }
  return (
    <div>
      <div className='bg-[#DBDBDB] min-h-screen relative py-12'>
        <Link href='/events/your-city/home' className='fixed top-32 left-[4%] flex items-center font-medium text-sm'>
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
          <div className='uppercase text-neutral-black font-roboto text-[40px] font-bold'>
            {currentTopic?.title || 'No topic'}
          </div>
          <div className='flex items-center gap-1.5 font-medium text-xl text-gray-950'>
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
                  <span className='text-feedback-error-defaul'>{`${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
                    seconds
                  )}`}</span>
                )
              }}
            />
            <span>{moment().tz('Asia/Ho_Chi_Minh').format('ddd, DD MMMM')} GMT +7</span>
          </div>
          <div className='w-full max-w-[1129px] rounded-lg p-6 bg-neutral-900 mt-9'>
            <div className='grid grid-cols-[auto_1fr] gap-4'>
              <div className='rounded-3xl border-[2px] border-neutral-500 outline outline-2 outline-neutral-black'>
                <div className='aspect-square rounded-[22px] border-[2px] border-neutral-800 overflow-hidden'>
                  <Image src={account.creator.avatar_url} alt='creator avatar' width={120} height={120} />
                </div>
              </div>
              <div>
                <div className='text-base font-bold text-green-500'>{account.creator.pen_name}</div>
                <div
                  className='text-sm text-neutral-white whitespace-pre-wrap line-clamp-4 mt-2'
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(account.creator?.bio) }}></div>
              </div>
            </div>
            <div className='mt-12'>
              <div className='text-neutral-white font-semibold text-lg'>{t('Submit artwork')}</div>
              <div className='flex items-center gap-1.5 text-text-error-primary-3 bg-feedback-error-100 p-2.5 rounded text-xs mt-4 font-semibold'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'>
                  <path
                    d='M17.542 15.9895L10.8845 3.62617C10.4127 2.74961 9.15564 2.74961 8.68337 3.62617L2.02634 15.9895C1.92388 16.1797 1.87252 16.3934 1.87725 16.6094C1.88199 16.8255 1.94267 17.0366 2.05336 17.2223C2.16406 17.4079 2.32099 17.5616 2.50884 17.6685C2.69669 17.7754 2.90904 17.8317 3.12517 17.832H16.4412C16.6575 17.8321 16.8701 17.776 17.0582 17.6692C17.2463 17.5625 17.4035 17.4088 17.5144 17.2231C17.6254 17.0374 17.6862 16.8261 17.691 16.6099C17.6959 16.3937 17.6445 16.1799 17.542 15.9895ZM9.78415 15.918C9.62963 15.918 9.47859 15.8721 9.35011 15.7863C9.22164 15.7005 9.1215 15.5784 9.06237 15.4357C9.00324 15.2929 8.98777 15.1359 9.01791 14.9843C9.04806 14.8328 9.12246 14.6936 9.23172 14.5843C9.34098 14.475 9.48019 14.4006 9.63174 14.3705C9.78328 14.3403 9.94037 14.3558 10.0831 14.4149C10.2259 14.4741 10.3479 14.5742 10.4337 14.7027C10.5196 14.8312 10.5654 14.9822 10.5654 15.1367C10.5654 15.3439 10.4831 15.5426 10.3366 15.6891C10.1901 15.8357 9.99135 15.918 9.78415 15.918ZM10.6326 8.06055L10.4084 12.8262C10.4084 12.9919 10.3425 13.1509 10.2253 13.2681C10.1081 13.3853 9.94913 13.4512 9.78337 13.4512C9.61761 13.4512 9.45864 13.3853 9.34143 13.2681C9.22422 13.1509 9.15837 12.9919 9.15837 12.8262L8.93415 8.0625C8.92911 7.94867 8.94704 7.83499 8.98688 7.72823C9.02671 7.62148 9.08763 7.52383 9.166 7.44112C9.24437 7.35841 9.33859 7.29233 9.44305 7.24681C9.5475 7.20129 9.66006 7.17727 9.774 7.17617H9.7822C9.89691 7.17611 10.0105 7.1993 10.116 7.24432C10.2215 7.28935 10.3168 7.35528 10.3961 7.43815C10.4754 7.52102 10.5371 7.6191 10.5775 7.72647C10.6179 7.83385 10.6361 7.94829 10.631 8.06289L10.6326 8.06055Z'
                    fill='#F73B3B'
                  />
                </svg>
                {t(
                  'Please note that only ONE submission is allowed per day. Please double-check your submission before submitting.'
                )}
              </div>
            </div>
            <form onSubmit={form.handleSubmit(submitHandler)} className='flex flex-col items-center gap-14 mt-4'>
              <div className='w-full border-[3px] border-gray-black p-6 rounded-md bg-neutral-100 text-neutral-black grid gap-11 grid-cols-[auto_1fr]'>
                <Controller
                  name='artwork'
                  control={form.control}
                  render={({ field }) => (
                    <div className='min-w-[209px] flex flex-col items-center'>
                      <div className='flex flex-col items-center'>
                        <div className='text-sm font-medium'>
                          {t('Image')} (1:1) <span className='text-error-default'>*</span>
                        </div>
                        <div className='text-[10px] text-text-secondary'>
                          {locale == 'vn' ? 'Khuyến khích 480px x 480px' : '480px x 480px recommended'}
                        </div>
                      </div>
                      <div className='mt-4 relative overflow-hidden w-full'>
                        <label htmlFor='image'>
                          <div
                            className={`w-full cursor-pointer overflow-hidden mx-auto max-w-[180px] aspect-square grid place-items-center  border-neutral-400 rounded-2xl ${
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
                          className='mt-2 bg-transparent !border-neutral-default [&_input]:!placeholder-neutral-950 [&_input::placeholder]:font-medium'
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
                            className='mt-2 bg-transparent !border-neutral-default rounded-lg border text-sm py-2 px-3 min-h-20 placeholder:!text-neutral-950 placeholder:font-medium'
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
              <div
                onClick={() => setOpen(true)}
                className='p-2.5 text-center font-roboto text-[22px] uppercase font-bold text-neutral-black bg-white w-64'>
                {t('Submit')}
              </div>
              <Modal hideClose open={open} setOpen={setOpen}>
                <div className='flex flex-col gap-4 items-center max-w-xl px-8 py-4 bg-[#DBDBDB] text-neutral-black rounded-mlg border-[3px] border-neutral-black'>
                  <div className='text-lg font-semibold'>
                    {locale == 'en' ? 'Earn Rewards with Access Protocol!' : 'Cơ Hội Nhận Thưởng Cùng Access Protocol!'}
                  </div>
                  <div className='text-sm font-medium'>
                    {locale == 'en' ? (
                      <>
                        PunkgaMe has partnered with AccessProtocol, a content aggregation and monetization platform that
                        empowers creators in the Web3 space.
                        <br />
                        <br />
                        By sharing your work on AccessProtocol through PunkgaMe, you’ll unlock new ways to earn, grow
                        your audience, and mint NFTs with ease. This is a perfect opportunity to boost your visibility
                        and monetize your talent within an engaged creative community.
                        <br />
                        <br />
                        Discover more about the benefits and program details!
                        <br />
                        <br />
                        Note: PunkgaMe will never use your creations for commercial purposes without your permission.
                      </>
                    ) : (
                      <>
                        PunkgaMe đã chính thức hợp tác với Access Protocol, nền tảng hỗ trợ sáng tạo nội dung giúp các
                        họa sĩ mở rộng thu nhập và tầm ảnh hưởng trong không gian Web3!
                        <br />
                        <br />
                        Khi đồng ý chia sẻ tác phẩm lên AccessProtocol thông qua PunkgaMe, bạn sẽ có cơ hội nhận thưởng,
                        mở rộng tệp khán giả và dễ dàng chuyển đổi tác phẩm của mình thành NFT. Đây là một cơ hội tuyệt
                        vời để tăng độ nhận diện cá nhân và cũng như thu nhập cho các họa sĩ.
                        <br />
                        <br />
                        Tìm hiểu thêm chi tiết chương trình!
                        <br />
                        <br />
                        Lưu ý: PunkgaMe tuyệt đối không sử dụng tác phẩm của bạn cho mục đích thương mại nếu chưa có sự
                        đồng ý của bạn!
                      </>
                    )}
                  </div>
                  <Controller
                    name='terms_agreed'
                    control={form.control}
                    render={({ field }) => (
                      <div className='flex gap-2 items-start' onClick={() => field.onChange(!field.value)}>
                        <Checkbox checked={field.value} />
                        <div className='text-sm font-medium'>
                          {locale == 'en'
                            ? 'I agree to PunkgaMe minting this artwork as an NFT on Access Protocol and distributing it as a reward for subscribers.'
                            : 'Tôi cho phép PunkgaMe sử dung nội dung này để tạo NFT trên Access Protocol và sử dụng làm phần thưởng cho người đăng ký kênh.'}
                        </div>
                      </div>
                    )}
                  />
                  <button
                    onClick={form.handleSubmit(submitHandler)}
                    className={`p-2.5 text-center font-roboto text-[22px] uppercase font-bold text-white bg-neutral-black w-64 ${
                      loading && 'opacity-70 pointer-events-none'
                    }`}>
                    {t(loading ? 'Submitting' : 'submit2')}
                  </button>
                </div>
              </Modal>
            </form>
            <div className='mt-14'>
              <SubmissionTable />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full relative'>
        <Image src={Image2} alt='' className='absolute bottom-full -mb-3 right-0 w-[512px]' />
        <Image src={Image1} alt='' className='w-full relative' />
      </div>
    </div>
  )
}
