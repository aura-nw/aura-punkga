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
export default function Round2Submission() {
  const [name, setName] = useState('')
  const { account } = useContext(Context)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [description, setDescription] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState<any>()
  const [error, setError] = useState()
  const { data, mutate } = useSWR('get-submissions', eventService.story.getSubmissions, {
    revalidateOnFocus: false,
  })
  const submitHandler = async () => {
    try {
      if (name && name.length <= 50 && description && avatar && !loading) {
        setLoading(true)
        const payload = new FormData()
        payload.append('name', name)
        payload.append('avatar', avatar)
        payload.append('description', description)
        const res = await eventService.story.createCharacter(payload)
        if (res.data?.errors?.message) {
          toast(res.data.errors.message, {
            type: 'error',
          })
        } else {
          await mutate()
          toast(locale == 'vn' ? 'Tạo nhân vật thành công' : 'Create new character successfully', {
            type: 'success',
          })
          setName('')
          setAvatar(undefined)
          setDescription(undefined)
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
  const submissions = data?.data?.data?.story_event_submission
  if (!account) return <div className='w-full text-center'>{t('Login to continue')}</div>
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8'>
      <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-4 md:p-6'>
        <div>{t('Creator’s information')}</div>
        <div>
          <label className='text-sm font-medium' htmlFor='name'>
            {t('Character name')} <span className='text-error-default'>*</span>
          </label>
          <TextField id='name' className='mt-2 bg-transparent' value={name} onChange={setName} />
          <div className='mt-2 flex justify-between text-xs'>
            <div className='text-text-error-primary-3'>{error}</div>
            <div
              className={
                name.length > 50 ? 'text-text-error-primary-3' : 'text-text-teriary'
              }>{`${name.length}/50`}</div>
          </div>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-10'>
          <div>
            <div className=''>
              <div className='text-sm font-medium'>
                {t('Upload Character Avatar')} (1:1) <span className='text-error-default'>*</span>
              </div>
              <div className='text-[10px] text-text-quatenary'>
                {locale == 'vn' ? 'Khuyến khích 1500px x 1500px' : '1500px x 1500px recommended'}
              </div>
            </div>
            <div className='mt-4 relative rounded-xl border-[3px] border-black overflow-hidden'>
              <label htmlFor='character-avatar'>
                <div className='absolute bottom-0 inset-x-0 w-full'>
                  {avatar ? (
                    <Image
                      src={URL.createObjectURL(avatar)}
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
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div>
            <div className=''>
              <div className='text-sm font-medium'>
                {t('Upload description')} (A4) <span className='text-error-default'>*</span>
              </div>
              <div className='text-[10px] text-text-quatenary'>
                {locale == 'vn' ? 'Khuyến khích 1500px x 2122px' : '1500px x 2122px recommended'}
              </div>
            </div>
            <div className='mt-4 relative rounded-xl border-[3px] border-black overflow-hidden'>
              <label htmlFor='character-description'>
                <div className='absolute bottom-0 inset-x-0 w-full'>
                  {description ? (
                    <Image
                      src={URL.createObjectURL(description)}
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
                  id='character-description'
                  type='file'
                  className='hidden'
                  accept='image/*'
                  onChange={(e) => setDescription(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
        <div
          className={`w-[217px] rounded-md font-jaro text-2xl border border-white bg-black p-2.5 text-center mx-auto cursor-pointer mt-6 ${
            loading && 'opacity-70 pointer-events-none'
          }`}
          onClick={submitHandler}>
          {t(loading ? 'Submitting' : 'submit2')}
        </div>
      </div>
      <div className='rounded-md border-[3px] border-neutral-black bg-neautral-950 p-6'>
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
  )
}
