import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { eventService } from 'src/services/eventService'
import useSWR from 'swr'

export default function SubmissionTable() {
  const { t } = useTranslation()
  const { data } = useSWR('get-submissions', () => eventService.story.getSubmissions(), {
    revalidateOnFocus: false,
  })
  const submissions = data?.data?.data?.story_event_submission
  return (
    <div className='rounded-md border-[3px] border-neutral-black bg-neutral-950 p-6 h-fit'>
      <div className='text-lg font-semibold'>{t('My submission')}</div>
      <div className='text-feedback-info-link-defaul text-xs mt-2'>
        {t(
          'Submitted artworks/mangas need to be approved by admin. This process may take upto 24 hours after you submitted'
        )}
        .{' '}
      </div>
      <div className='mt-6 p-6 rounded-[10px] bg-black overflow-auto w-full'>
        {submissions?.length ? (
          <div className='w-full min-w-[700px]'>
            <div className='grid w-full grid-cols-[8%_1fr_15%_20%_25%] text-sm font-semibold border-b border-white'>
              <div className='px-2 py-4'>{t('No')}</div>
              <div className='p-4'>{t('Name')}</div>
              <div className='p-4'>{t('Type')}</div>
              <div className='p-4'>{t('Submission')}</div>
              <div className='p-4'>{t('Submitted at')}</div>
            </div>
            <div className='h-[260px] overflow-auto'>
              {submissions?.map((submission, index) => (
                <div
                  className='grid w-full grid-cols-[8%_1fr_15%_20%_25%] text-sm font-medium text-text-quatenary'
                  key={submission.id}>
                  <div className='px-2 py-4'>#{index + 1}</div>
                  <div className='p-4 truncate'>{submission.name}</div>
                  <div className='p-4 capitalize'>{t(submission.type)}</div>
                  <div
                    className={`p-4 capitalize ${
                      submission.status == 'Submitted'
                        ? 'text-text-info-primary'
                        : submission.status == 'Approved'
                        ? 'text-text-brand-hover'
                        : 'text-text-warning-primary-2'
                    }`}>
                    {t(submission.status)}
                  </div>
                  <div className='p-4'>{moment(submission.created_at).format('HH:mm DD/MM/yyyy')}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='text-center w-full h-full grid place-items-center'>{t('No submission found')}!</div>
        )}
      </div>
    </div>
  )
}
