import TextField from 'components/Input/TextField'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { eventService } from 'src/services/eventService'
import { userService } from 'src/services/userService'
import { shorten } from 'src/utils'
import useSWR, { mutate } from 'swr'
import SubmissionTable from './submissionTable'

import Frame from 'components/pages/event/ava-2024/assets/frame.svg'
import Placeholder from 'components/pages/event/ava-2024/assets/placeholder.png'
import Modal from 'components/core/modal'
import Checkbox from 'components/core/Checkbox'
export default function Round3Submission() {
  const { account, getProfile } = useContext(Context)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data } = useSWR('/story-event/character/available', eventService.story.getAvailableCharacter, {
    revalidateOnFocus: false,
  })
  const form = useForm({
    defaultValues: {
      name: '',
      image: undefined,
      terms_agreed: true,
      selectedsUserCharacter: [],
      selectedCollectedCharacter: [],
      selectedDefaultCharacter: [],
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

  const submitHandler = async (data) => {
    try {
      if (!data.name || !data.image || !data.selectedCollectedCharacter.length) {
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
      payload.append('artwork', data.image)
      payload.append('terms_agreed', data.terms_agreed)
      payload.append(
        'artwork_characters',
        JSON.stringify([
          ...(data.selectedsUserCharacter?.map((id) => ({
            story_character_id: id,
          })) || []),
          ...(data.selectedCollectedCharacter?.map((id) => ({
            story_character_id: id,
          })) || []),
          ...(data.selectedDefaultCharacter?.map((id) => ({
            story_character_id: id,
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
        toast(
          t(
            'Submit artwork successfully. Your artwork need to be approved by admin. This process may take upto 24 hours after you submitted'
          ),
          {
            type: 'success',
          }
        )
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
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
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
              <div
                className='text-xs text-text-quatenary whitespace-pre-wrap line-clamp-3'
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(account.creator?.bio) }}></div>
            </div>
          </div>
          <div className='mt-8'>
            <Controller
              name='name'
              control={form.control}
              render={({ field }) => (
                <div className='w-full'>
                  <label className='text-sm font-medium' htmlFor='name'>
                    {t('Artwork name')} <span className='text-error-default'>*</span>
                  </label>
                  <TextField
                    placeholder={t('Enter artwork name')}
                    id='name'
                    className='mt-2 bg-transparent !border-white'
                    {...field}
                  />
                  <div className='mt-2 flex justify-end text-xs'>
                    <div
                      className={
                        field.value.length > 150 ? 'text-text-error-primary-3' : 'text-text-teriary'
                      }>{`${field.value.length}/150`}</div>
                  </div>
                </div>
              )}
            />
            <div className='max-w-[180px] mt-8'>
              <div className=''>
                <div className='text-sm font-medium'>
                  {t('Image')} (1:1) <span className='text-error-default'>*</span>
                </div>
                <div className='text-[10px] text-text-quatenary'>
                  {locale == 'vn' ? 'Khuyến khích 3508px x 4961px' : '3508px x 4961px recommended'}
                </div>
              </div>
              <div className='mt-4 relative rounded-xl border-[3px] border-black overflow-hidden'>
                <Controller
                  name='image'
                  control={form.control}
                  render={({ field }) => (
                    <label htmlFor='image'>
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
                        id='image'
                        type='file'
                        className='hidden'
                        accept='image/*'
                        onChange={(e) => field.onChange(e.target.files[0])}
                      />
                    </label>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full max-w-[1500px] mt-8'>
        <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
          <div className='text-lg font-semibold'>{t('IP info (Maximum 8)')}</div>
          <div className='mt-6 space-y-8'>
            <Controller
              name='selectedsUserCharacter'
              control={form.control}
              render={({ field }) => (
                <div className='space-y-8'>
                  <div>
                    <div className='text-sm font-medium'>{t('Self-created IPs (optional)')}</div>
                    <div className='text-xs text-text-quatenary'>{t('Maximum 1 IP')}</div>
                  </div>
                  {availableCharacters?.user_ip.length ? (
                    <div className='grid bg-[#0B0B0B] rounded-lg p-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8'>
                      {availableCharacters?.user_ip?.map((data, index) => (
                        <Character
                          data={data}
                          key={index}
                          {...field}
                          max={
                            form.watch('selectedDefaultCharacter').length +
                              form.watch('selectedCollectedCharacter').length <=
                            7
                              ? 1
                              : 0
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='w-full text-center bg-[#0B0B0B] rounded-lg p-8  text-gray-400'>
                      {t(`You don't own any IP`)}
                    </div>
                  )}
                </div>
              )}
            />
            <Controller
              name='selectedCollectedCharacter'
              control={form.control}
              render={({ field }) => (
                <div className='space-y-8'>
                  <div>
                    <div className='text-sm font-medium'>
                      {t('IPs created by other contestants')} <span className='text-error-default'>*</span>
                    </div>
                    <div className='text-xs text-text-quatenary'>{t('Maximum 3 IPs')}</div>
                  </div>
                  {availableCharacters?.collected.length ? (
                    <div className='grid bg-[#0B0B0B] rounded-lg p-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8'>
                      {availableCharacters?.collected?.map((data, index) => (
                        <Character
                          data={data}
                          key={index}
                          {...field}
                          max={
                            8 -
                              (form.watch('selectedsUserCharacter').length +
                                form.watch('selectedDefaultCharacter').length) >
                            3
                              ? 3
                              : 8 -
                                (form.watch('selectedsUserCharacter').length +
                                  form.watch('selectedDefaultCharacter').length)
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='w-full text-center bg-[#0B0B0B] rounded-lg p-8  text-gray-400'>
                      {locale == 'en' ? (
                        <span>
                          You didn't collect any IP. Go to{' '}
                          <Link href={`/events/ava-2024/map/character`} className='text-blue-400'>
                            Character
                          </Link>{' '}
                          to collect IP
                        </span>
                      ) : (
                        <span>
                          Bạn chưa thu thập IP nào. Truy cập trang{' '}
                          <Link href={`/events/ava-2024/map/character`} className='text-blue-400'>
                            Nhân vật
                          </Link>{' '}
                          để thu thập IP
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            />
            <Controller
              name='selectedDefaultCharacter'
              control={form.control}
              render={({ field }) => (
                <div className='space-y-8'>
                  <div>
                    <div className='text-sm font-medium'>{t('Punkga.me featured IPs')}</div>
                  </div>
                  <div className='grid bg-[#0B0B0B] rounded-lg p-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8'>
                    {availableCharacters?.default?.map((data, index) => (
                      <Character
                        data={data}
                        key={index}
                        {...field}
                        max={
                          8 -
                          (form.watch('selectedsUserCharacter').length +
                            form.watch('selectedCollectedCharacter').length)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className='mb-8'>
        <div
          onClick={() => setOpen(true)}
          className={`w-[217px] block rounded-md font-jaro text-2xl border border-white bg-black p-2.5 text-center cursor-pointer mt-6 ${
            loading && 'opacity-70 pointer-events-none'
          }`}>
          {t(loading ? 'Submitting' : 'submit2')}
        </div>
      </div>
      <SubmissionTable />
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
          <button
            onClick={form.handleSubmit(submitHandler)}
            className={`w-[217px] block rounded-md font-jaro text-2xl border border-white bg-black p-2.5 text-center cursor-pointer ${
              loading && 'opacity-70 pointer-events-none'
            }`}>
            {t(loading ? 'Submitting' : 'submit2')}
          </button>
        </div>
      </Modal>
    </form>
  )
}
const Character = ({ data, value, onChange, max }) => {
  const selected = value?.includes(data.id)
  const handler = () => {
    if (value?.includes(data.id)) {
      onChange(value.filter((d) => d != data.id))
    } else {
      if (value.length >= max) {
        if (max != 0) {
          onChange([...value.slice(1), data.id])
        }
      } else {
        onChange(value?.length ? [...value, data.id] : [data.id])
      }
    }
  }
  return (
    <div className='space-y-4 cursor-pointer' onClick={handler}>
      <Checkbox checked={selected} />
      <div
        className={`rounded-xl bg-[#191919] border-[3px] ${
          selected ? 'border-border-brand-hover' : 'border-[#3D3D3D]'
        } relative py-4 px-1`}>
        <Image
          alt=''
          src={data.descripton_url}
          width={150}
          height={300}
          className='w-full aspect-[165/233] object-cover rounded-[4px]'
        />
        <div className='mt-2 font-jaro w-full truncate text-xl'>{data.name}</div>
        {data.story_ip_asset?.ip_asset_id && (
          <Link
            href={`https://odyssey.explorer.story.foundation/ipa/${data?.story_ip_asset?.ip_asset_id}`}
            target='_blank'
            className='mt-1 text-xs font-medium text-brand-default'
            onClick={(e) => e.stopPropagation()}>
            {shorten(data.story_ip_asset?.ip_asset_id)}
          </Link>
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='21'
          height='8'
          viewBox='0 0 21 8'
          fill='none'
          className='absolute top-0.5 right-10'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.32454 0.729511C5.99954 1.14775 6.21842 2.05189 5.81342 2.74896L3.24784 7.16469C2.84284 7.86176 1.96732 8.08779 1.29231 7.66955C0.617309 7.25131 0.398429 6.34717 0.803431 5.65011L3.36901 1.23437C3.77401 0.537305 4.64953 0.311271 5.32454 0.729511ZM10.1706 0.729511C10.8456 1.14775 11.0645 2.05189 10.6595 2.74896L8.09393 7.16469C7.68893 7.86176 6.81341 8.08779 6.13841 7.66955C5.4634 7.25131 5.24452 6.34717 5.64953 5.65011L8.2151 1.23437C8.62011 0.537305 9.49563 0.311271 10.1706 0.729511ZM15.0167 0.729511C15.6917 1.14775 15.9106 2.05189 15.5056 2.74896L12.94 7.16469C12.535 7.86176 11.6595 8.08779 10.9845 7.66955C10.3095 7.25131 10.0906 6.34717 10.4956 5.65011L13.0612 1.23437C13.4662 0.537305 14.3417 0.311271 15.0167 0.729511ZM20.1479 0.729511C20.8229 1.14775 21.0418 2.05189 20.6368 2.74896L18.0712 7.16469C17.6662 7.86176 16.7907 8.08779 16.1157 7.66955C15.4407 7.25131 15.2218 6.34717 15.6268 5.65011L18.1924 1.23437C18.5974 0.537305 19.4729 0.311271 20.1479 0.729511Z'
            fill='black'
          />
        </svg>
        <Skew className='absolute top-0.5 right-1.5 w-2.5 h-2.5' />
      </div>
    </div>
  )
}
const Skew = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='11'
      height='11'
      viewBox='0 0 11 11'
      fill='none'
      className={className}>
      <path
        d='M11 5.5C11 8.53757 8.53757 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5Z'
        fill='#3D3B3E'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.5 10.1538C8.07025 10.1538 10.1538 8.07025 10.1538 5.5C10.1538 2.92975 8.07025 0.846154 5.5 0.846154C2.92975 0.846154 0.846154 2.92975 0.846154 5.5C0.846154 8.07025 2.92975 10.1538 5.5 10.1538ZM5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11Z'
        fill='black'
      />
      <path
        d='M3.13738 4.3327C2.80694 4.00225 2.80694 3.4665 3.13738 3.13605C3.46783 2.80561 4.00358 2.80561 4.33403 3.13605L7.92395 6.72598C8.2544 7.05642 8.2544 7.59218 7.92395 7.92262C7.59351 8.25307 7.05775 8.25307 6.72731 7.92262L3.13738 4.3327Z'
        fill='#181818'
      />
      <path
        d='M6.7259 3.13348C7.05634 2.80303 7.5921 2.80303 7.92254 3.13348C8.25298 3.46392 8.25298 3.99968 7.92254 4.33012L4.33261 7.92005C4.00217 8.25049 3.46641 8.25049 3.13597 7.92005C2.80553 7.5896 2.80553 7.05385 3.13597 6.7234L6.7259 3.13348Z'
        fill='#181818'
      />
    </svg>
  )
}
