import Facebook from 'assets/images/Facebook.png'
import X from 'assets/images/x.png'
import MainButton from 'components/Button/MainButton'
import Modal from 'components/Modal'
import Tooltip from 'components/Tooltip'
import BannerDesktop from 'components/pages/event/assets/banner-desktop.png'
import BannerMobile from 'components/pages/event/assets/banner-mobile.png'
import Banner from 'components/pages/event/assets/banner.png'
import BannerEn from 'components/pages/event/assets/banner_en.png'
import ComicList from 'components/pages/event/wow-yourself/ComicList'
import JudgeBoard from 'components/pages/event/wow-yourself/JudgeBoard'
import Timeline from 'components/pages/event/wow-yourself/TimeLine'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
export default function WowYourSelf() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <div className=''>
      <Image src={BannerMobile} className='w-full lg:hidden h-auto' alt='' />
      <div className='pk-container hidden lg:block'>
        <Image src={BannerDesktop} className='w-full mt-3 h-auto' alt='' />
      </div>
      <div className='pk-container'>
        <div className='flex flex-col gap-4 lg:gap-5 mt-5 lg:mt-8 lg:flex-row lg:justify-between'>
          <div className='lg:w-full lg:max-w-[840px]'>
            <h1 className='text-base font-bold leading-5 flex items-center gap-2 lg:text-xl'>
              {moment().isAfter(moment('2024-06-18'))
                ? t('WoW YOURSELF - Round 3: Grow YOURSELF')
                : moment().isAfter(moment('2024-06-11'))
                ? t('WoW YOURSELF - Round 2: Know YOURSELF')
                : t('WoW YOURSELF - Round 1: Show YOURSELF')}
              <Tooltip label={t('Share on Facebook')}>
                <Link
                  target='_blank'
                  href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2FPunkgaMeManga%2Fposts%2Fpfbid02H7stNei37BqvRZD5ygKW1WdJsdWad7TYgwhHMSFMY6deWh3NVzWjXXBByc5rC2nml&amp;src=sdkpreparse'
                  className='cursor-pointer'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z'
                      stroke='#1FAB5E'
                      strokeWidth='1.5'
                    />
                    <path d='M14 6.5L9 10' stroke='#1FAB5E' strokeWidth='1.5' strokeLinecap='round' />
                    <path d='M14 17.5L9 14' stroke='#1FAB5E' strokeWidth='1.5' strokeLinecap='round' />
                    <path
                      d='M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z'
                      stroke='#1FAB5E'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z'
                      stroke='#1FAB5E'
                      strokeWidth='1.5'
                    />
                  </svg>
                </Link>
              </Tooltip>
            </h1>
            <div className='mt-1 flex gap-3 items-center lg:mt-3'>
              <Tooltip label={t('View on Twitter')}>
                <Link target='_blank' href='https://x.com/PunkgaMeManga/status/1796810762088018331'>
                  <Image src={X} alt='' className='w-8 h-8' />
                </Link>
              </Tooltip>
              <Tooltip label={t('View on Facebook')}>
                <Link
                  target='_blank'
                  href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02H7stNei37BqvRZD5ygKW1WdJsdWad7TYgwhHMSFMY6deWh3NVzWjXXBByc5rC2nml'>
                  <Image src={Facebook} alt='' className='w-8 h-8' />
                </Link>
              </Tooltip>
            </div>
            {locale == 'vn' ? (
              <p className='text-xs leading-5 mt-4 lg:mt-3 lg:text-sm lg:leading-6'>
                WoW YOURSELF - CUỘC THI VẼ TRUYỆN HOT NHẤT MÙA HÈ CHỈ CÓ TẠI PUNKGA ME!
                <br />
                Bạn có đam mê vẽ truyện? Bạn muốn thể hiện cá tính và tài năng của mình? Vậy thì đừng bỏ lỡ cơ hội tỏa
                sáng cùng cuộc thi WoW YOURSELF do Punkga ME tổ chức!
                <br />
                Tổng giải thưởng lên đến 8.000.000+ VNĐ cùng nhiều phần quà hấp dẫn khác, WoW YOURSELF hứa hẹn sẽ mang
                đến những trải nghiệm thú vị và cơ hội phát triển bản thân cho tất cả các hoạ sĩ.
                <br />
                Tham gia group cuộc thi của Punkga tại đây:{' '}
                <Link
                  href='https://www.facebook.com/groups/punkga.me'
                  target='_blank'
                  className='text-[#2684FC] underline'>
                  https://www.facebook.com/groups/punkga.me
                </Link>
              </p>
            ) : (
              <p className='text-xs leading-5 mt-4 lg:mt-3 lg:text-sm lg:leading-6'>
                WoW YOURSELF - THE HOTTEST COMIC DRAWING CONTEST OF THE SUMMER ONLY AT PUNKGA ME!
                <br />
                Do you have a passion for drawing comics? Do you want to showcase your personality and talent? Then
                don't miss the chance to shine in the WoW YOURSELF contest organized by Punkga ME!
                <br />
                With a total prize pool of over 8,000,000+ VND and many other attractive rewards, WoW YOURSELF promises
                to bring exciting experiences and personal development opportunities for all artists.
                <br />
                Join the Punkga contest group here:{' '}
                <Link
                  href='https://www.facebook.com/groups/punkga.me'
                  target='_blank'
                  className='text-[#2684FC] underline'>
                  https://www.facebook.com/groups/punkga.me
                </Link>
              </p>
            )}
          </div>
          <div className='flex flex-col gap-4 lg:w-1/2 lg:max-w-[400px] lg:shrink-0'>
            <div className='flex gap-5'>
              <ViewRule />
              <MainButton
                disabled={!(moment().isAfter(moment('2024-06-18')) && moment().isBefore(moment('2024-06-30')))}
                className='w-full'>
                {t('Submit my artwork')}
              </MainButton>
            </div>
            <div className='bg-[#F2F2F2] rounded-2xl py-5 px-4 flex flex-col gap-5 text-[#1C1C1C]'>
              <div className='flex gap-6 justify-between'>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px]'>{t('Participants')}</div>
                  <div className='font-semibold lg:text-lg'>164</div>
                </div>
                <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px]'>{t('Submitted artworks')}</div>
                  <div className='font-semibold lg:text-lg'>164</div>
                </div>
              </div>
            </div>
            <Link href='/campaigns'>
              <Image src={locale == 'vn' ? Banner : BannerEn} alt='' className='w-full rounded-2xl overflow-hidden' />
            </Link>
          </div>
        </div>
        {!(moment().isAfter(moment('2024-06-18')) && moment().isBefore(moment('2024-06-30'))) && <Timeline />}
        {moment().isAfter(moment('2024-06-18')) && moment().isBefore(moment('2024-06-30')) && <ComicList />}
        <JudgeBoard />
        {moment().isAfter(moment('2024-06-18')) && moment().isBefore(moment('2024-06-30')) && <Timeline />}
      </div>
    </div>
  )
}
function ViewRule() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { locale } = useRouter()
  return (
    <>
      <MainButton style='secondary' className='w-full' onClick={() => setOpen(true)}>
        {t('View Rule')}
      </MainButton>
      <Modal open={open} setOpen={setOpen}>
        {locale == 'vn' ? (
          <div className=' w-[90vw] p-5 lg:p-10 max-w-[1000px] h-[90vh] overflow-auto'>
            <div className='w-full text-center text-xl font-bold'>Thể lệ chi tiết cuộc thi WoW Yourself</div>
            <br />
            <strong className='text-md'>VÒNG 1: Show YOURSELF</strong>
            <ol className='list-decimal list-inside pl-5 [&>li]:mt-2 text-sm leading-6'>
              <li className='font-bold'>
                Sáng tạo:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>
                    Hoàn thiện hoặc phác thảo 1 trang truyện giới thiệu hoặc chia sẻ về câu chuyện của bản thân bạn
                  </li>
                </ul>
              </li>
              <li className='font-bold'>
                Bài đăng đính kèm:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>Tên/Nickname: [Tên của bạn]</li>
                  <li>Hashtag: #PunkgaMe #Wowyourself #Showyourself</li>
                </ul>
              </li>
              <li className='font-bold'>
                Địa điểm:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>Group Facebook Punkga Me - Hội họa sĩ truyện tranh 🇻🇳</li>
                </ul>
              </li>
              <li className='font-bold'>Thời gian:</li>
              <li className='font-bold'>
                Giải thưởng:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>Top 2: Do Ban Giám Khảo bình chọn - nhận ngay 2 cuốn artbook cực xịn</li>
                  <li>Top 5: Bài đăng có nhiều lượt react và share nhất - nhận 5 điểm cộng vào kết quả chung cuộc</li>
                </ul>
              </li>
              <li className='font-bold'>
                Lưu ý:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>
                    Tác phẩm không yêu cầu quá hoàn thiện về chất lượng nhưng cần đảm bảo có hình ảnh, chia khung và có
                    thoại
                  </li>
                  <li>
                    Vòng đầu tiên sẽ không có họa sĩ bị loại. Tất cả thí sinh nộp bài thi đúng yêu cầu sẽ đủ điều kiện
                    tham gia vòng tiếp theo
                  </li>
                  <li>
                    Tác phẩm của họa sĩ tham gia có thể được vẽ bằng tay hoặc bằng máy, đảm bảo tác phẩm dễ đọc, sạch sẽ
                    và gọn gàng.
                  </li>
                </ul>
              </li>
            </ol>
            <br />
            <strong className='text-md'>VÒNG 2: Know YOURSELF</strong>
            <ol className="ist-decimal list-inside pl-5 [&>li]:mt-2 nested-counter text-sm [counter-reset:item] [&_ol]:[counter-reset:item] [&>li]:[counter-increment:item] [&>li::marker]:[content:counters(item,'.')_'._'] [&_ol>li]:[counter-increment:item] [&_ol>li::marker]:[content:counters(item,'.')_'._']">
              <li className='font-bold'>Chủ đề: Summer Spirit - Linh Hồn Mùa Hạ</li>
              <li className='[&::marker]:font-bold'>
                <strong>Yêu cầu:</strong>
                <ol className='list-decimal list-inside pl-5 [&>li]:mt-2'>
                  <li>
                    Sáng tạo:
                    <ul className='list-disc list-inside pl-5'>
                      <li>Vẽ phác thảo ý tưởng kèm thoại từ 3-5 trang truyện về chủ đề</li>
                      <li> Hashtag: #PunkgaMe #Wowyourself #Knowyourself</li>
                    </ul>
                  </li>
                  <li>
                    Bài đăng đính kèm:
                    <ul className='list-disc list-inside pl-5'>
                      <li>Tên/Nickname: [Tên của bạn]</li>
                      <li>Có thể vẽ bằng tay hoặc máy</li>
                      <li>
                        Các hoạ sĩ tham gia khi kết hợp thêm yếu tố <strong>"FALLING STAR - SAO BĂNG"</strong> để nhận
                        10 điểm Bonus từ Ban giám khảo.
                      </li>
                    </ul>
                  </li>
                  <li>Địa điểm: Group Facebook Punkga ME - Hội họa sĩ truyện tranh Việt Nam 🇻🇳</li>
                  <li>Thời gian nhận tác phẩm: 9h00 ngày 11/6 - 24h00 ngày 17/6</li>
                </ol>
              </li>
              <li className='font-bold'>
                Giải thưởng Vòng 2:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>
                    TOP 10: Do Ban Giám Khảo và ban cố vấn bình chọn - Nhận 10 điểm cộng trên mỗi hoạ sĩ và được cộng
                    vào kết quả chung cuộc!
                  </li>
                  <li>TOP 2: Do Ban Giám Khảo bình chọn - Nhận 1 cuốn artbook trên mỗi hoạ sĩ</li>
                </ul>
              </li>
              <li className='[&::marker]:font-bold'>
                <strong>Lưu ý:</strong>
                <ol className='list-decimal list-inside pl-5 [&>li]:mt-2'>
                  <li>Điểm bonus sẽ là điểm tích luỹ cho đến kết quả cuối cùng</li>
                  <li>
                    Thí sinh chỉ cần hoàn thành tác phẩm dưới dạng bản thảo thô kèm thoại (NAME). Một thành viên bất kì
                    trong ban cố vấn sẽ feedback và đưa ý kiến để các thí sinh tiếp tục hoàn thiện bài thi ở vòng sau
                    với chất lượng tốt nhất.
                  </li>
                  <li>
                    Tất cả các tác phẩm đều nhận được sự đánh giá của các cố vấn là những họa sĩ truyện tranh chuyên
                    nghiệp.
                  </li>
                  <li>Mỗi tác phẩm sẽ nhận được feedback từ 1 vị cố vấn trong 48H.</li>
                  <li>
                    Vòng 2 sẽ không có hoạ sĩ bị loại và tất cả thí sinh nộp bài thi đúng yêu cầu sẽ đủ điều kiện tham
                    gia vòng tiếp theo.
                  </li>
                </ol>
              </li>
            </ol>
            <br />
            <strong className='text-md'>VÒNG 3: Grow YOURSELF</strong>
            <ol className="ist-decimal list-inside pl-5 [&>li]:mt-2 nested-counter text-sm [counter-reset:item] [&_ol]:[counter-reset:item] [&>li]:[counter-increment:item] [&>li::marker]:[content:counters(item,'.')_'._'] [&_ol>li]:[counter-increment:item] [&_ol>li::marker]:[content:counters(item,'.')_'._']">
              <li className='[&::marker]:font-bold'>
                <strong>Yêu cầu:</strong>
                <ul className='list-disc list-inside pl-5 [&>li]:mt-2'>
                  <li>
                    Hoàn thiện chỉn chu 5 trang bản thảo thô trước đó dựa trên feedback của Ban giám khảo từ vòng 2.
                  </li>
                </ul>
              </li>
              <li className='[&::marker]:font-bold'>
                <strong>Địa điểm:</strong>
                <ol className='list-decimal list-inside pl-5 [&>li]:mt-2'>
                  <li>Website của Punkga Me (link nộp bài sẽ được thông báo vào ngày 18/6)</li>
                  <li>
                    Group Facebook Punkga Me - Hội họa sĩ truyện tranh Việt Nam 🇻🇳 và đính kèm:
                    <ul className='list-disc list-inside pl-5'>
                      <li>Tên/Nickname: [Tên của bạn]</li>
                      <li>Hashtag: #PunkgaMe #Wowyourself #Growyourself</li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li className='font-bold'>
                Thời gian nhận tác phẩm trên website và group Facebook:
                <ul className='list-disc list-inside pl-5 [&>li]:mt-2 font-normal'>
                  <li>9h00 ngày 18/6 - 24h00 ngày 30/6</li>
                </ul>
              </li>
              <li className='[&::marker]:font-bold'>
                <strong>Lưu ý:</strong>
                <ul className='list-disc list-inside pl-5 [&>li]:mt-2'>
                  <li>Thời gian chấm điểm diễn ra từ ngày 1/7 - 8/7.</li>
                  <li>Thời gian bình chọn tính từ lúc nộp bài đến khi vòng 3 kết thúc vào ngày 30/6.</li>
                  <li>
                    Số lượng tương tác trên website và group Facebook được tính độc lập với barem chấm điểm của Ban Giám
                    Khảo và Ban Cố Vấn
                  </li>
                </ul>
              </li>
            </ol>
            <strong className='text-md mt-5 block'>Kết quả sẽ được công bố vào ngày 09/07</strong>
          </div>
        ) : (
          <div className=' w-[90vw] p-5 lg:p-10 max-w-[1000px] h-[90vh] overflow-auto'>
            <div className='w-full text-center text-xl font-bold'>Detailed Rules for the WoW Yourself Contest</div>
            <br />
            <strong className='text-md'>ROUND 1: Show YOURSELF</strong>
            <ol className='list-decimal list-inside pl-5 [&>li]:mt-2 text-sm leading-6'>
              <li className='font-bold'>
                Creativity:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>Complete or sketch one comic page introducing or sharing your personal story</li>
                </ul>
              </li>
              <li className='font-bold'>
                Post details:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>Name/Nickname: [Your Name]</li>
                  <li>Hashtag: #PunkgaMe #Wowyourself #Showyourself</li>
                </ul>
              </li>
              <li className='font-bold'>
                Location:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>Punkga Me Facebook Group - Comic Artists Community 🇻🇳</li>
                </ul>
              </li>
              <li className='font-bold'>Timeline:</li>
              <li className='font-bold'>
                Prizes:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>Top 2: Selected by the Judges - Receive 2 premium artbooks</li>
                  <li>
                    Top 5: Posts with the most reactions and shares - Receive 5 bonus points towards the final result
                  </li>
                </ul>
              </li>
              <li className='font-bold'>
                Note:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>The artwork does not need to be highly polished but must include images, panels, and dialogue</li>
                  <li>
                    No artists will be eliminated in the first round. All participants who submit their entries
                    correctly will qualify for the next round
                  </li>
                  <li>Artwork can be created by hand or digitally, ensuring it is readable, clean, and tidy</li>
                </ul>
              </li>
            </ol>
            <br />
            <strong className='text-md'>ROUND 2: Know YOURSELF</strong>
            <ol className="ist-decimal list-inside pl-5 [&>li]:mt-2 nested-counter text-sm [counter-reset:item] [&_ol]:[counter-reset:item] [&>li]:[counter-increment:item] [&>li::marker]:[content:counters(item,'.')_'._'] [&_ol>li]:[counter-increment:item] [&_ol>li::marker]:[content:counters(item,'.')_'._']">
              <li className='font-bold'>Theme: Summer Spirit</li>
              <li className='[&::marker]:font-bold'>
                <strong>Requirements:</strong>
                <ol className='list-decimal list-inside pl-5 [&>li]:mt-2'>
                  <li>
                    Creativity:
                    <ul className='list-disc list-inside pl-5'>
                      <li>Sketch a concept with dialogue for a 3-5 page comic on the theme</li>
                      <li> Hashtag: #PunkgaMe #Wowyourself #Knowyourself</li>
                    </ul>
                  </li>
                  <li>
                    Post details:
                    <ul className='list-disc list-inside pl-5'>
                      <li>Name/Nickname: [Your Name]</li>
                      <li>Artwork can be created by hand or digitally</li>
                      <li>
                        Artists incorporating the <strong>"FALLING STAR"</strong> element will receive a 10-point bonus
                        from the Judges.
                      </li>
                    </ul>
                  </li>
                  <li>Location: Punkga ME Facebook Group - Vietnamese Comic Artists Community 🇻🇳</li>
                  <li>Submission Period: 9:00 AM June 11 - 12:00 AM June 17</li>
                </ol>
              </li>
              <li className='font-bold'>
                Round 2 Prizes:
                <ul className='list-disc list-inside pl-5 font-normal'>
                  <li>
                    TOP 10: Selected by Judges and advisors - Receive 10 bonus points each, added to the final result.
                  </li>
                  <li>TOP 2: Selected by Judges - Receive 1 artbook each.</li>
                </ul>
              </li>
              <li className='[&::marker]:font-bold'>
                <strong>Note:</strong>
                <ol className='list-decimal list-inside pl-5 [&>li]:mt-2'>
                  <li>Bonus points accumulate towards the final result.</li>
                  <li>
                    Participants only need to complete a rough draft with dialogue (NAME). An advisor will provide
                    feedback to help refine the submission for the next round.
                  </li>
                  <li>All entries will be evaluated by professional comic artists.</li>
                  <li>Each entry will receive feedback from one advisor within 48 hours.</li>
                  <li>
                    No artists will be eliminated in Round 2. All participants who submit their entries correctly will
                    qualify for the next round.
                  </li>
                </ol>
              </li>
            </ol>
            <br />
            <strong className='text-md'>ROUND 3: Grow YOURSELF</strong>
            <ol className="ist-decimal list-inside pl-5 [&>li]:mt-2 nested-counter text-sm [counter-reset:item] [&_ol]:[counter-reset:item] [&>li]:[counter-increment:item] [&>li::marker]:[content:counters(item,'.')_'._'] [&_ol>li]:[counter-increment:item] [&_ol>li::marker]:[content:counters(item,'.')_'._']">
              <li className='[&::marker]:font-bold'>
                <strong>Requirements:</strong>
                <ul className='list-disc list-inside pl-5 [&>li]:mt-2'>
                  <li>Polish and complete the previous 5-page draft based on feedback from Round 2.</li>
                </ul>
              </li>
              <li className='[&::marker]:font-bold'>
                <strong>Location:</strong>
                <ol className='list-decimal list-inside pl-5 [&>li]:mt-2'>
                  <li>Punkga Me website (submission link will be announced on June 18)</li>
                  <li>
                    Punkga Me Facebook Group - Vietnamese Comic Artists Community 🇻🇳:
                    <ul className='list-disc list-inside pl-5'>
                      <li>Name/Nickname: [Your Name]</li>
                      <li>Hashtag: #PunkgaMe #Wowyourself #Growyourself</li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li className='font-bold'>
                Submission Period:
                <ul className='list-disc list-inside pl-5 [&>li]:mt-2 font-normal'>
                  <li>9:00 AM June 18 - 12:00 AM June 30</li>
                </ul>
              </li>
              <li className='[&::marker]:font-bold'>
                <strong>Note:</strong>
                <ul className='list-disc list-inside pl-5 [&>li]:mt-2'>
                  <li>Scoring will take place from July 1 to July 8.</li>
                  <li>Voting period runs from submission until the end of Round 3 on June 30.</li>
                  <li>
                    Interaction counts on the website and Facebook group are independent of the Judges' and Advisors'
                    scoring criteria.
                  </li>
                </ul>
              </li>
            </ol>
            <strong className='text-md mt-5 block'>Results will be announced on July 9.</strong>
          </div>
        )}
      </Modal>
    </>
  )
}
