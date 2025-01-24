import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { eventService } from 'src/services/eventService'
import useSWR from 'swr'

export default function SubmissionTable() {
  const { t } = useTranslation()
  const { data } = useSWR('get-submissions-6', () => eventService.story.getSubmissions(6), {
    revalidateOnFocus: false,
  })
  const submissions = data?.data?.data?.story_event_submission
  return (
    <div className=''>
      <div className='text-lg font-semibold'>{t('My submission')}</div>
      <div className=' text-sm mt-2'>
        {t(
          'Submitted characters need to be approved by admin. This process may take upto 24 hours after you submitted'
        )}
        .{' '}
      </div>
      <div className='mt-6 p-3 lg:p-6 rounded-[10px] text-text-primary overflow-auto w-full border border-border-primary'>
        {submissions?.length ? (
          <div className='w-full min-w-[600px]'>
            <div className='grid w-full grid-cols-[1fr_20%_25%] text-sm font-semibold border-b border-white'>
              <div className='p-4'>{t('Name')}</div>
              <div className='p-4'>{t('Status')}</div>
              <div className='p-4'>{t('Submitted at')}</div>
            </div>
            <div className='h-[260px] overflow-auto'>
              {submissions?.map((submission, index) => (
                <div
                  className='grid w-full grid-cols-[1fr_20%_25%] text-sm font-medium text-text-primary'
                  key={submission.id}>
                  <div className='p-4 truncate'>{submission.name}</div>
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
                  <div className='p-4'>{moment(submission.created_at).format('DD/MM/yyyy')}</div>
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
