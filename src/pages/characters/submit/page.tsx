import UploadUpIcon from 'assets/images/icons/upload-up.svg'
import Button from 'components/core/Button'
import Checkbox from 'components/core/Checkbox'
import Modal from 'components/core/Modal'
import TextField from 'components/Input/TextField'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { eventService } from 'src/services/eventService'
import { userService } from 'src/services/userService'
import { mutate } from 'swr'
import SubmissionTable from './submissionTable'

export default function Page() {
  const { account, getProfile } = useContext(Context)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      avatar: undefined,
      name: '',
      description: '',
      terms_agreed: true,
    },
  })
  const creatorForm = useForm({
    defaultValues: {
      avatar: undefined,
      pen_name: '',
      bio: '',
    },
  })
  const submitHandler = async (data) => {
    try {
      if (!loading) {
        if (!data.name || !data.avatar) {
          throw new Error(t('Please fill all required fields'))
          return
        }
        if (data.name.length > 50) {
          throw new Error(t('Character name is too long'))
          return
        }
        if (data.description && data.description.length > 150) {
          throw new Error(t('Description is too long'))
          return
        }
        setLoading(true)
        const payload = new FormData()
        payload.append('name', data.name)
        payload.append('avatar', data.avatar)
        payload.append('description', data.description)
        payload.append('terms_agreed', data.terms_agreed)
        const res = await eventService.story.createCharacter(payload)
        if (res.data?.errors?.message) {
          toast(res.data.errors.message || res.data.errors?.[0]?.message, {
            type: 'error',
          })
        } else {
          await mutate('get-submissions')
          toast(locale == 'vn' ? 'Tạo nhân vật thành công' : 'Create new character successfully', {
            type: 'success',
          })
          form.reset()
        }
        setOpen(false)
        setLoading(false)
      }
    } catch (error) {
      setOpen(false)
      setLoading(false)
      toast(error.message, {
        type: 'error',
      })
    }
  }

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
  if (!account) return <div className='w-full text-center'>{t('Login to continue')}</div>
  if (!account.creator) {
    return (
      <div className='p-4 bg-background min-h-screen text-white lg:px-[84px] xl:pt-10'>
        <form onSubmit={creatorForm.handleSubmit(submitCreatorInformationHandler)} className='mx-auto max-w-3xl'>
          <div className='grid grid-cols-1 gap-8'>
            <div>
              <div className='rounded-md border-[3px] border-neutral-black bg-neutral-950 p-4 md:p-6'>
                <div className='text-lg font-semibold w-full'>{t('Creator’s information')}</div>
                <div className='text-sm font-medium text-text-quatenary mt-2'>
                  {t(
                    'We found that you have not registered as a Punkga Creator, please provide some information before submitting your works.'
                  )}
                </div>
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
                          <label htmlFor='image'>
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
                <Button type='submit' size='sm' className='mt-6 mx-auto min-w-32' color='neutral'>
                  {t(loading ? 'Submitting' : 'Register')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
  return (
    <>
      <div className='p-4 bg-background min-h-screen text-white lg:px-[84px] xl:pt-10'>
        <form onSubmit={form.handleSubmit(submitHandler)} className='mx-auto max-w-3xl space-y-8'>
          <div className='grid grid-cols-1 gap-8'>
            <div>
              <div className='rounded-md border-[3px] border-neutral-black bg-neutral-950 p-4 md:p-6'>
                <div className='text-lg font-semibold w-full'>{t('Submit character')}</div>
                <div className='bg-black rounded-md px-4 py-6 flex flex-col items-center mt-6 md:flex-row md:items-start gap-5 md:gap-3'>
                  <Controller
                    name='avatar'
                    control={form.control}
                    render={({ field }) => (
                      <div className='min-w-[209px] flex flex-col items-center'>
                        <div className='flex flex-col items-center'>
                          <div className='text-sm font-medium'>
                            {t('Character avatar')} (1:1) <span className='text-error-default'>*</span>
                          </div>
                          <div className='text-[10px] text-text-quatenary'>
                            {locale == 'vn' ? 'Khuyến khích 1500px x 1500px ' : '1500px x 1500px  recommended'}
                          </div>
                        </div>
                        <div className='mt-4 relative overflow-hidden w-full'>
                          <label htmlFor='char-image'>
                            <div
                              className={`w-full cursor-pointer overflow-hidden mx-auto max-w-[190px] aspect-square grid place-items-center  border-white rounded-lg ${
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
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                              )}
                              <input
                                id='char-image'
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
                            className='mt-2 bg-transparent !border-white'
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
                              className='mt-2 bg-transparent !border-white rounded-lg border text-sm p-2 min-h-20'
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
                <Button
                  type='button'
                  onClick={() => setOpen(true)}
                  size='sm'
                  className='mt-6 mx-auto min-w-32'
                  color='neutral'
                  leadingIcon={UploadUpIcon}>
                  {t(loading ? 'Submitting' : 'Submit character')}
                </Button>
              </div>
            </div>
          </div>
          <SubmissionTable />
        </form>
      </div>
      <Modal hideClose open={open} setOpen={setOpen}>
        <div className='flex flex-col gap-4 items-center max-w-xl px-8 py-4'>
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
                By sharing your work on AccessProtocol through PunkgaMe, you’ll unlock new ways to earn, grow your
                audience, and mint NFTs with ease. This is a perfect opportunity to boost your visibility and monetize
                your talent within an engaged creative community.
                <br />
                <br />
                Discover more about the benefits and program details!
                <br />
                <br />
                Note: PunkgaMe will never use your creations for commercial purposes without your permission.
              </>
            ) : (
              <>
                PunkgaMe đã chính thức hợp tác với Access Protocol, nền tảng hỗ trợ sáng tạo nội dung giúp các họa sĩ mở
                rộng thu nhập và tầm ảnh hưởng trong không gian Web3!
                <br />
                <br />
                Khi đồng ý chia sẻ tác phẩm lên AccessProtocol thông qua PunkgaMe, bạn sẽ có cơ hội nhận thưởng, mở rộng
                tệp khán giả và dễ dàng chuyển đổi tác phẩm của mình thành NFT. Đây là một cơ hội tuyệt vời để tăng độ
                nhận diện cá nhân và cũng như thu nhập cho các họa sĩ.
                <br />
                <br />
                Tìm hiểu thêm chi tiết chương trình!
                <br />
                <br />
                Lưu ý: PunkgaMe tuyệt đối không sử dụng tác phẩm của bạn cho mục đích thương mại nếu chưa có sự đồng ý
                của bạn!
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
          <Button onClick={form.handleSubmit(submitHandler)} size='sm' color='neutral'>
            {t(loading ? 'Submitting' : 'Confirm')}
          </Button>
        </div>
      </Modal>
    </>
  )
}
