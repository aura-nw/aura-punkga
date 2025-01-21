import HeadComponent from 'components/Head'
import Layout from 'components/Layout'
import Button from 'components/pages/event/literature-infinity/Button'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Mascot4 from 'components/pages/event/literature-infinity/assets/mascot-4.png'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { Context } from 'src/context'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { userService } from 'src/services/userService'
import TextField from 'components/Input/TextField'
import SubmissionTable from './submissionTable'
import { zeroPad } from 'react-countdown'
import { mutate } from 'swr'
import { eventService } from 'src/services/eventService'
import UserGreen from 'assets/images/userGreen.svg'
import DOMPurify from 'dompurify'
import { useWindowSize } from 'usehooks-ts'

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <PageContent />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

const PageContent = () => {
  const router = useRouter()
  const { account, getProfile } = useContext(Context)
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const creatorForm = useForm({
    defaultValues: {
      avatar: undefined,
      pen_name: '',
      bio: '',
    },
  })
  const form = useForm({
    defaultValues: {
      avatar: undefined,
      name: '',
      description: '',
      terms_agreed: true,
    },
  })
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
      if (!loading) {
        if (!data.name || !data.avatar) {
          throw new Error(t('Please fill all required fields'))
        }
        if (data.name.length > 50) {
          throw new Error(t('Character name is too long'))
        }
        if (data.description && data.description.length > 150) {
          throw new Error(t('Description is too long'))
        }
        setLoading(true)
        const payload = new FormData()
        payload.append('name', data.name)
        payload.append('avatar', data.avatar)
        payload.append('description', data.description)
        payload.append('terms_agreed', data.terms_agreed)
        payload.append('contest_id', '6')
        const res = await eventService.story.createCharacter(payload)
        if (res.data?.errors?.message) {
          toast(res.data.errors.message || res.data.errors?.[0]?.message, {
            type: 'error',
          })
        } else {
          await mutate('get-submissions-6')
          toast(router.locale == 'vn' ? 'Tạo nhân vật thành công' : 'Create new character successfully', {
            type: 'success',
          })
          form.reset()
        }
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      toast(error.message, {
        type: 'error',
      })
    }
  }
  return (
    <div className={`min-h-screen bg-background-bg-primary ${width >= 1280 ? 'pk-container py-10' : ''}`}>
      <Link
        href={'/events/literature-infinity/round-1'}
        className='sticky top-14 z-50 bg-background-bg-primary p-4 flex items-center gap-3'>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M15 17L10 12L15 7' stroke='#6D6D6D' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <div className='text-[#3d3d3d] text-lg font-medium leading-relaxed'>Round 1 - Submit a character</div>
      </Link>
      <div className='p-4 xl:max-w-screen-md xl:mx-auto'>
        {!account ? (
          <>
            <div className='w-full text-center py-12'>{'Login to continue'}</div>
          </>
        ) : account.creator ? (
          <>
            <div className='bg-[#ffffff] p-4 rounded-md'>
              <form onSubmit={form.handleSubmit(submitHandler)} className='w-full'>
                <div className='flex flex-col items-center md:flex-row md:items-start gap-5 md:gap-3'>
                  <Controller
                    name='avatar'
                    control={form.control}
                    render={({ field }) => (
                      <div className='min-w-[209px] flex flex-col items-center'>
                        <div className='flex flex-col items-center'>
                          <div className='text-sm font-medium'>
                            {t('Image')} (1:1) <span className='text-error-default'>*</span>
                          </div>
                          <div className='text-[10px] text-text-quatenary'>
                            {router.locale == 'vn' ? 'Khuyến khích 480px x 480px ' : '480px x 480px  recommended'}
                          </div>
                        </div>
                        <div className='mt-4 relative overflow-hidden w-full'>
                          <label htmlFor='image'>
                            <div
                              className={`w-full cursor-pointer overflow-hidden mx-auto max-w-[110px] aspect-square grid place-items-center  border-border-primary rounded-2xl ${
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
                                  fill='none'
                                  className='w-7 h-7'>
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

                  <div className='w-full'>
                    <Controller
                      name='name'
                      control={form.control}
                      render={({ field }) => (
                        <div className='w-full'>
                          <label className='text-sm font-medium' htmlFor='char-name'>
                            {t('Character name')} <span className='text-error-default'>*</span>
                          </label>
                          <TextField
                            placeholder={t('Enter character name')}
                            id='char-name'
                            className='mt-2 bg-transparent [&_input::placeholder]:!text-[#6d6d6d]'
                            {...field}
                          />
                          <div className='mt-2 flex justify-between text-xs'>
                            <div className='text-text-error-primary-3'></div>
                            <div
                              className={
                                field.value.length > 50 ? 'text-text-error-primary-3' : 'text-text-teriary'
                              }>{`${field.value.length}/50`}</div>
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
                            <label className='text-sm font-medium' htmlFor='description'>
                              {t('Description')}
                            </label>
                            <textarea
                              id='description'
                              className='mt-2 bg-transparent placeholder-[#6d6d6d] rounded-lg border text-sm p-2 min-h-20'
                              placeholder={t('Tell something about yourself')}
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
                <div className='flex flex-col items-center gap-3 mt-10'>
                  <Button className='' type='submit'>
                    {t(loading ? 'Submitting' : 'Submit character')}
                  </Button>
                </div>
              </form>
            </div>
            <div className='mt-4 bg-white rounded-md p-4'>
              <SubmissionTable />
            </div>
          </>
        ) : (
          <form
            onSubmit={creatorForm.handleSubmit(submitCreatorInformationHandler)}
            className='flex flex-col items-center gap-10'>
            <div className='mx-auto w-full '>
              <div className='text-sm font-medium w-full'>
                {t(
                  'We found that you have not registered as a Punkga Creator, please provide some information before submitting your works.'
                )}
              </div>
              <div className='  rounded-md p-4 bg-white flex flex-col items-center mt-6 md:flex-row md:items-start gap-5 md:gap-3'>
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
                          {router.locale == 'vn' ? 'Khuyến khích 480px x 480px' : '480px x 480px recommended'}
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
            <Button type='submit' disabled={!creatorForm.formState.isValid}>
              {t(loading ? 'Loading' : 'Confirm & Next Step')}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const props = {
    title: 'Literature Infinity Contest| Win 20M VND with Creative Comics',
    description: 'Join the Literature Infinity Contest to celebrate Vietnamese literature and the Year of the Snake!',
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
