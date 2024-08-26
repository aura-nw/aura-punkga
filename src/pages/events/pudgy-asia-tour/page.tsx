import Modal from 'components/Modal'
import Tooltip from 'components/Tooltip'
import Button from 'components/core/Button/Button'
import BannerDesktopVN from 'components/pages/event/kaia-island/assets/desktop-banner-vn.png'
import BannerDesktop from 'components/pages/event/kaia-island/assets/desktop-banner.png'
import BannerMobileVN from 'components/pages/event/kaia-island/assets/mobile-banner-vn.png'
import BannerMobile from 'components/pages/event/pudgy-asia-tour/assets/mobile-banner.png'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

import FooterAnimationSection from 'components/pages/event/pudgy-asia-tour/FooterAnimationSection'
import TimeLine from 'components/pages/event/pudgy-asia-tour/TimeLine'
import PudgyList from 'components/pages/event/pudgy-asia-tour/Pudgy'
export default function Pudgy() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [seeMore, setSeeMore] = useState(false)
  return (
    <>
      <style jsx global>
        {`
          .text-stroke {
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #000;
          }
        `}
      </style>
      <div className='bg-[#F5FDFF] estedad-font'>
        <Image src={locale == 'vn' ? BannerMobileVN : BannerMobile} className='w-full lg:hidden h-auto' alt='' />
        <div className='pk-container hidden lg:block'>
          <Image src={locale == 'vn' ? BannerDesktopVN : BannerDesktop} className='w-full h-auto' alt='' />
        </div>
        <div className='pk-container'>
          <div className='flex flex-col gap-8 lg:gap-5 mt-5 lg:mt-8 lg:flex-row lg:justify-between'>
            <div className='lg:w-full lg:max-w-[840px]'>
              <div className='flex items-center gap-4'>
                <h1 className='font-black uppercase text-stroke tracking-[1.6px]  gap-4 text-[32px] leading-[42px] text-[#3B86F7] trailer-font drop-shadow-[1px_1px_0px_#000]'>
                  {t(`Pudgy Asia Art Contest`)}
                </h1>
                <Tooltip label={t('Share on Facebook')}>
                  <Link
                    target='_blank'
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      'https://www.facebook.com/PunkgaMeManga/posts/pfbid02dnvJYumJhC1Nh1WungWkV54FNHdvMULh57iGLzAfAXGpvzCuhexBHGTayNbafMkSl'
                    )}`}
                    className='cursor-pointer grid place-items-center bg-white w-[30px] h-[30px] block rounded-full border border-black'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4'>
                      <path
                        d='M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z'
                        stroke='#0B0B0B'
                        strokeWidth='1.5'
                      />
                      <path d='M14 6.5L9 10' stroke='#0B0B0B' strokeWidth='1.5' strokeLinecap='round' />
                      <path d='M14 17.5L9 14' stroke='#0B0B0B' strokeWidth='1.5' strokeLinecap='round' />
                      <path
                        d='M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z'
                        stroke='#0B0B0B'
                        strokeWidth='1.5'
                      />
                      <path
                        d='M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z'
                        stroke='#0B0B0B'
                        strokeWidth='1.5'
                      />
                    </svg>
                  </Link>
                </Tooltip>
              </div>
              <div className='text-sm font-semibold flex gap-2.5 mt-1.5 flex-row items-center'>
                <div>
                  <span>{t('Starts at')}:</span> {locale == 'vn' ? '17 Tháng 7 2024' : '17 Jul 2024'}
                </div>
                <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                <div>
                  <span>{t('Ends at')}:</span> {locale == 'vn' ? '13 Tháng 8 2024' : '13 Aug 2024'}
                </div>
              </div>
              <div className='mt-4 flex gap-4 items-center'>
                <Link
                  href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02dnvJYumJhC1Nh1WungWkV54FNHdvMULh57iGLzAfAXGpvzCuhexBHGTayNbafMkSl'
                  target='_blank'
                  className='bg-[#0866FF] rounded-sm px-1 py-1 pr-2.5 flex items-center gap-1 text-xxs leading-4 font-semibold text-text-white'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M13 8.01837C13 5.24682 10.7614 3 8 3C5.2386 3 3 5.24682 3 8.01837C3 10.3718 4.6144 12.3466 6.7922 12.889V9.55198H5.7612V8.01837H6.7922V7.35755C6.7922 5.6495 7.5624 4.8578 9.2332 4.8578C9.55 4.8578 10.0966 4.92023 10.3202 4.98246V6.37254C10.2022 6.3601 9.9972 6.35388 9.7426 6.35388C8.9228 6.35388 8.606 6.66562 8.606 7.47598V8.01837H10.2392L9.9586 9.55198H8.606V13C11.0814 12.6999 13 10.5842 13 8.01837Z'
                      fill='white'
                    />
                  </svg>
                  {t('Go to Fanpage')}
                </Link>
                <Link
                  href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02dnvJYumJhC1Nh1WungWkV54FNHdvMULh57iGLzAfAXGpvzCuhexBHGTayNbafMkSl'
                  target='_blank'
                  className='bg-[#454545] rounded-sm py-1 px-2.5 flex items-center gap-1 text-xxs leading-4 font-semibold text-text-white'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='18' viewBox='0 0 22 18' fill='none' className='w-4 h-4'>
                    <path
                      d='M18.6239 1.80801C17.2217 1.16462 15.7181 0.6906 14.1459 0.419108C14.1173 0.413868 14.0887 0.426962 14.0739 0.453152C13.8805 0.797099 13.6663 1.24581 13.5163 1.59849C11.8254 1.34533 10.1431 1.34533 8.48679 1.59849C8.33676 1.23797 8.11478 0.797099 7.92053 0.453152C7.90578 0.427836 7.87718 0.414742 7.84855 0.419108C6.27725 0.689732 4.7736 1.16375 3.37052 1.80801C3.35838 1.81325 3.34797 1.82199 3.34106 1.83333C0.488942 6.09433 -0.292371 10.2506 0.0909151 14.3553C0.0926494 14.3754 0.103922 14.3946 0.119532 14.4068C2.00127 15.7887 3.82406 16.6277 5.61301 17.1838C5.64164 17.1925 5.67197 17.182 5.69019 17.1584C6.11337 16.5806 6.49059 15.9712 6.81402 15.3304C6.83311 15.2929 6.81489 15.2484 6.77588 15.2335C6.17754 15.0066 5.6078 14.7298 5.05975 14.4156C5.0164 14.3902 5.01293 14.3282 5.05281 14.2986C5.16814 14.2121 5.2835 14.1222 5.39363 14.0314C5.41355 14.0149 5.44131 14.0114 5.46474 14.0218C9.06518 15.6657 12.9631 15.6657 16.521 14.0218C16.5445 14.0105 16.5722 14.014 16.593 14.0306C16.7032 14.1214 16.8185 14.2121 16.9347 14.2986C16.9746 14.3282 16.972 14.3902 16.9286 14.4156C16.3806 14.7359 15.8108 15.0066 15.2116 15.2327C15.1726 15.2475 15.1553 15.2929 15.1744 15.3304C15.5047 15.9703 15.882 16.5797 16.2973 17.1576C16.3147 17.182 16.3459 17.1925 16.3745 17.1838C18.1721 16.6277 19.9949 15.7887 21.8766 14.4068C21.8931 14.3946 21.9035 14.3763 21.9053 14.3562C22.364 9.61067 21.1369 5.48849 18.6525 1.8342C18.6465 1.82199 18.6361 1.81325 18.6239 1.80801ZM7.35169 11.856C6.26771 11.856 5.37454 10.8608 5.37454 9.63862C5.37454 8.41644 6.25039 7.42127 7.35169 7.42127C8.46163 7.42127 9.34616 8.42518 9.32881 9.63862C9.32881 10.8608 8.45296 11.856 7.35169 11.856ZM14.6619 11.856C13.5779 11.856 12.6847 10.8608 12.6847 9.63862C12.6847 8.41644 13.5606 7.42127 14.6619 7.42127C15.7718 7.42127 16.6563 8.42518 16.639 9.63862C16.639 10.8608 15.7718 11.856 14.6619 11.856Z'
                      fill='white'
                    />
                  </svg>
                  {t('Go to Discord')}
                </Link>
                <Link
                  href='https://x.com/PunkgaMeManga/status/1812863530972160222'
                  target='_blank'
                  className='bg-neutral-500 rounded-sm px-1 py-1 pr-2.5 flex items-center gap-1 text-xxs leading-4 font-semibold text-text-white'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M4.0219 3L7.49669 7.96401L4 12H4.78703L7.84845 8.46635L10.3219 12H13L9.32962 6.75682L12.5844 3H11.7973L8.97802 6.25432L6.7 3H4.0219ZM5.17926 3.61933H6.40957L11.8425 11.3807H10.6122L5.17926 3.61933Z'
                      fill='white'
                    />
                  </svg>
                  {t('Go to X')}
                </Link>
              </div>
              {locale == 'vn' ? (
                <p className={`text-sm font-semibold mt-4 ${seeMore ? '' : 'line-clamp-6 md:line-clamp-3'}`}>
                  🔥The hottest comic drawing contest of the summer only at Punkga MeDo you have a passion for drawing
                  comics? Do you want to showcase your personality and talent? Then don't miss the chance to shine in
                  the WoW YOURSELF contest organized by Punkga Me!
                </p>
              ) : (
                <p className={`text-sm font-semibold mt-4 ${seeMore ? '' : 'line-clamp-6 md:line-clamp-3'}`}>
                  🔥The hottest comic drawing contest of the summer only at Punkga MeDo you have a passion for drawing
                  comics? Do you want to showcase your personality and talent? Then don't miss the chance to shine in
                  the WoW YOURSELF contest organized by Punkga Me!
                </p>
              )}
              <div
                className='mt-1.5 text-text-info-primary text-sm font-semibold cursor-pointer'
                onClick={() => setSeeMore(!seeMore)}>
                {seeMore ? t('See less') : t('See more')}
              </div>
            </div>
            <div className='flex flex-col gap-4 lg:w-1/2 lg:max-w-[400px] lg:shrink-0'>
              <div className='flex gap-4 flex-col'>
                <ViewRule />
                {moment().isAfter(moment('2024-07-31')) && (
                  <div
                    onClick={() =>
                      window.open(
                        'https://docs.google.com/forms/d/e/1FAIpQLScQbHPR9S5E623IItgHutKouzZ2CYhcEDf5e3iAU44pe9ON-A/viewform',
                        '_blank'
                      )
                    }
                    className='w-full bg-[#4A7CF9] rounded-mlg text-center text-lg font-semibold text-white h-10 grid place-items-center'>
                    {t('Submit my artwork')}
                  </div>
                )}
              </div>
              <div className='bg-neutral-white rounded-mlg py-5 px-4 flex flex-col gap-6 text-[#1C1C1C] border border-black'>
                <div className='flex gap-5 justify-between'>
                  <div className='flex flex-col gap-1 w-[40%]'>
                    <div className='text-sm font-semibold'>{t('Participants')}</div>
                    <div className='font-semibold text-2xl'>200</div>
                  </div>
                  <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
                  <div className='flex flex-col gap-1 w-[40%]'>
                    <div className='text-sm font-semibold'>{t('Submitted artworks')}</div>
                    <div className='font-semibold text-2xl'>400</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TimeLine />
        <PudgyList />
        <div className='mt-28 -mb-14 flex justify-center overflow-hidden'>
          <FooterAnimationSection />
        </div>
      </div>
    </>
  )
}
function ViewRule() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { locale } = useRouter()
  return (
    <>
      <div
        className='w-full bg-[#183442] rounded-mlg text-center text-lg font-semibold text-white h-10 grid place-items-center'
        onClick={() => setOpen(true)}>
        {t('View Rule')}
      </div>
      <Modal open={open} setOpen={setOpen}>
        {locale == 'vn' ? (
          <div className=' w-[90vw] p-5 lg:p-10 max-w-[1000px] max-h-[90vh] overflow-auto'>
            <div className='w-full text-center text-lg font-semibold'>💎 Contest Rules</div>
            <ul className='mt-8 text-sm list-disc list-inside '>
              <strong>Vòng 1 (17/7 - 30/7): To the Island! (Cá nhân) 🏝️</strong>
              <br />
              <div className='pl-5'>
                <li>
                  <strong>Nhiệm vụ:</strong> Tạo một nhân vật đại diện cho bạn (OC) và một người bạn đồng hành hoặc thú
                  cưng. Thể hiện tính cách và câu chuyện của họ thông qua hình ảnh và mô tả ngắn gọn. Sử dụng mẫu có sẵn
                  của chúng tôi:{' '}
                  <Link href='https://bit.ly/templatev1kaia' target='_blank'>
                    tại đây
                  </Link>
                </li>
                <br />
                <li>
                  <strong>Giải thưởng:</strong> Top 10 Giải thưởng Ý tưởng Ấn tượng dựa trên lượt tương tác trên nhóm
                  Facebook "PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳" và bình chọn của Ban Giám Khảo.
                </li>
                <br />
                <li>
                  <strong>Gia hạn nộp bài:</strong> đến hết ngày 30/7.
                </li>
                <br />
                <li>
                  <strong>📝 Thông tin nộp bài:</strong>
                  <div className='pl-5'>
                    <br />
                    1/ Tên/Biệt danh: [Tên của bạn] <br />
                    <br />
                    2/ Bài dự thi vòng 1 (bắt buộc) + caption (tùy chọn) <br />
                    <br />
                    3/ Hashtag: #KAIAIslandv1 #PunkgaMe #ArtMangaContest <br />
                    <br />
                    4/ Nộp bài trên: <br />
                    <div className='pl-5'>
                      4.1/ Website PunkgaMe:{' '}
                      <Link href='https://bit.ly/tutorialr1kaia' target='_blank'>
                        tại đây
                      </Link>{' '}
                      <br />
                      4.2/ Nhóm Facebook:{' '}
                      <Link href='https://www.facebook.com/groups/punkga.me' target='_blank'>
                        PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳
                      </Link>
                    </div>
                  </div>
                </li>
                <br />
                <div>
                  <strong>⚠️ Lưu ý quan trọng: </strong>
                  Những họa sĩ nộp bài sau ngày 24/7 sẽ không đủ điều kiện nhận phần thưởng vòng 1, nhưng bài dự thi của
                  họ vẫn sẽ được xem xét để đủ điều kiện tham gia vòng 2.
                </div>
              </div>
              <br />
              <strong>Vòng 2 (24/7 - 30/7): Adventure Time! (Cá nhân) ⛵</strong>
              <br />
              <div className='pl-5'>
                <li>
                  <strong>Nhiệm vụ:</strong> Vẽ 1 trang truyện tranh về cuộc hành trình đến đảo Kaia. Để nhân vật của
                  bạn đối mặt với thử thách, khám phá điều kỳ diệu và ghi lại những khoảnh khắc đáng nhớ. Sử dụng mẫu có
                  sẵn của chúng tôi:{' '}
                  <Link href='https://bit.ly/templatev2kaia' target='_blank'>
                    tại đây
                  </Link>
                </li>
                <br />
                <li>
                  <strong>Giải thưởng:</strong> Top 5 Giải thưởng Câu chuyện Cá nhân dựa trên lượt tương tác trên nhóm
                  Facebook "PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳" và bình chọn của Ban Giám Khảo.
                </li>
                <br />
                <li>
                  <strong>📝 Thông tin nộp bài:</strong>
                  <div className='pl-5'>
                    <br />
                    1/ Tên/Biệt danh: [Tên của bạn] <br />
                    <br />
                    2/ Bài dự thi vòng 2 (bắt buộc) + caption (tùy chọn) <br />
                    <br />
                    3/ Hashtag: #KAIAIslandv2 #PunkgaMe #ArtMangaContest <br />
                    <br />
                    4/ Nộp bài trên: <br />
                    <div className='pl-5'>
                      4.1/ Website PunkgaMe:{' '}
                      <Link href='https://bit.ly/tutorialr1kaia' target='_blank'>
                        tại đây
                      </Link>{' '}
                      <br />
                      4.2/ Nhóm Facebook:{' '}
                      <Link href='https://www.facebook.com/groups/punkga.me' target='_blank'>
                        PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
              <br />
              <strong>Vòng 3 (31/7 - 13/8): Golden Treasure! (Cá nhân hoặc Nhóm) 🏆</strong>
              <div className='pl-5'>
                <br />
                <li>
                  <strong>Nhiệm vụ:</strong> Tạo một câu chuyện về Đảo Kaia.
                </li>
                <br />
                <li>
                  <strong>Tham gia cá nhân hoặc nhóm:</strong>
                  <div className='pl-5'>
                    <ul className='list-disc list-inside'>
                      <li>
                        <strong>Cá nhân:</strong> 👤 Gửi tối đa 3 trang.
                      </li>
                      <li>
                        <strong>Nhóm (2-5 thành viên):</strong> 👥 Mỗi thành viên gửi tối đa 3 trang (tối đa 15 trang
                        cho cả nhóm).
                      </li>
                    </ul>
                  </div>
                </li>
                <br />
                <li>
                  <strong>Điều kiện tiên quyết:</strong> Phải nộp bài dự thi cho cả Vòng 1 và Vòng 2.
                </li>
                <br />
                <li>
                  <strong>📝 Thông tin nộp bài:</strong> [Thông tin chi tiết sẽ được công bố sau]
                </li>
                <br />
                <li>
                  <strong>🏆 Giải thưởng chung cuộc - Dựa trên bình chọn của Ban Giám Khảo:</strong>
                  <div className='pl-5'>
                    🥇 1 Giải Đặc Biệt (Huyền thoại sống): 8.000.000 VNĐ <br />
                    🥇 1 Giải Nhất (Người dệt giai thoại): 6.000.000 VNĐ <br />
                    🥈 1 Giải Nhì (Nhà thám hiểm): 4.000.000 VNĐ <br />
                    🥉 1 Giải Ba (Nhà nghiên cứu xuất sắc): 2.000.000 VNĐ <br />
                    🌟 1 Giải MVP cá nhân xuất sắc: Mô hình in 3D nhân vật chính của người chiến thắng.
                  </div>
                </li>
              </div>
            </ul>
          </div>
        ) : (
          <div className=' w-[90vw] p-5 lg:p-10 max-w-[1000px] max-h-[90vh] overflow-auto'>
            <div className='w-full text-center text-lg font-semibold'>💎 Contest Rules</div>
            <ul className='mt-8 text-sm list-disc list-inside '>
              <strong>Round 1 (July 17th - 30th): To the Island! (Individual) 🏝️</strong>
              <br />
              <div className='pl-5'>
                <li>
                  <strong>Task:</strong> Create a character representing yourself (OC) and a companion or pet. Showcase
                  their personality and story through visuals and a brief description. Use our provided template:{' '}
                  <Link href='https://bit.ly/templatev1kaia' target='_blank'>
                    here
                  </Link>
                </li>
                <br />
                <li>
                  <strong>Prize:</strong> Top 10 Impressive Concept awards based on interactions on the Facebook group
                  and "PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳" and jury votes.
                </li>
                <br />
                <li>
                  <strong>Gia hạn nộp bài:</strong> July 30th.
                </li>
                <br />
                <li>
                  <strong>📝 Submission Details:</strong>
                  <div className='pl-5'>
                    <br />
                    1/ Name/Nickname: [Your Name] <br />
                    <br />
                    2/ Round 1 entry (required) + caption (optional) <br />
                    <br />
                    3/ Hashtag: #KAIAIslandv1 #PunkgaMe #ArtMangaContest <br />
                    <br />
                    4/ Submitting on: <br />
                    <div className='pl-5'>
                      4.1/ Submit your artwork on PunkgaMe website:{' '}
                      <Link href='https://bit.ly/tutorialr1kaia' target='_blank'>
                        here
                      </Link>{' '}
                      <br />
                      4.2/ Facebook group:{' '}
                      <Link href='https://www.facebook.com/groups/punkga.me' target='_blank'>
                        PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳
                      </Link>
                    </div>
                  </div>
                </li>
                <br />
                <div>
                  <strong>⚠️ Important Note: </strong>
                  Artists submitting after July 24th will not be eligible for Round 1 rewards, but their entries will
                  still be considered for qualification to Round 2.
                </div>
              </div>
              <br />
              <strong>Round 2 (July 24th - 30th): Adventure Time! (Individual) ⛵</strong>
              <br />
              <div className='pl-5'>
                <li>
                  <strong>Task:</strong> Draw a 1-page comic about the journey to Kaia Island. Let your character face
                  challenges, discover wonders, and capture memorable moments. Use our provided template:{' '}
                  <Link href='https://bit.ly/templatev2kaia' target='_blank'>
                    here
                  </Link>
                </li>
                <br />
                <li>
                  <strong>New Participants Welcome:</strong> Contestants can join from Round 2 and submit both Round 1 &
                  Round 2 entries. (Late Round 1 entries won't be scored).
                </li>
                <br />
                <li>
                  <strong>Prize:</strong> Top 5 Individual Story awards based on interactions on the Facebook group
                  "PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳" and jury votes.
                </li>
                <br />
                <li>
                  <strong>📝 Submission Details:</strong>
                  <div className='pl-5'>
                    <br />
                    1/ Name/Nickname: [Your Name] <br />
                    <br />
                    2/ Round 2 entry (required) + caption (optional) <br />
                    <br />
                    3/ Hashtag: #KAIAIslandv2 #PunkgaMe #ArtMangaContest <br />
                    <br />
                    4/ Submitting on: <br />
                    <div className='pl-5'>
                      4.1/ Submit your artwork on PunkgaMe website:{' '}
                      <Link href='https://bit.ly/tutorialr1kaia' target='_blank'>
                        here
                      </Link>{' '}
                      <br />
                      4.2/ Facebook group:{' '}
                      <Link href='https://www.facebook.com/groups/punkga.me' target='_blank'>
                        PunkgaMe - Hội họa sĩ truyện tranh Việt Nam 🇻🇳
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
              <br />
              <strong>Round 3 (July 31st - August 13th): Golden Treasure! (Solo or Group) 🏆</strong>
              <div className='pl-5'>
                <br />
                <li>
                  <strong>Task:</strong> Create a story about Kaia Island.
                </li>
                <br />
                <li>
                  <strong>Participation Options:</strong>
                  <div className='pl-5'>
                    <ul className='list-disc list-inside'>
                      <li>
                        <strong>Solo</strong>: 👤 Submit up to 3 pages.
                      </li>
                      <li>
                        <strong>Group (2-5 members)</strong>: 👥 Each member submits up to 3 pages (max 15 pages total).
                      </li>
                    </ul>
                  </div>
                </li>
                <br />
                <li>
                  <strong>Prerequisite:</strong> Must have submitted entries for both Round 1 and Round 2.
                </li>
                <br />
                <li>
                  <strong>📝 Submission Details:</strong> TBC
                </li>
                <br />
                <li>
                  <strong>🏆 Grand Prizes - Based on Jury Votes:</strong>
                  <div className='pl-5'>
                    🥇 1 Special Prize (Living Legend) <br />
                    🥇 1 First Prize (Story Weaver) <br />
                    🥈 1 Second Prize (Field Explorer) <br />
                    🥉 1 Third Prize (Outstanding Researcher) <br />
                    🌟 1 MVP Individual Prize: 3D print of the winner's main character
                  </div>
                </li>
              </div>
            </ul>
          </div>
        )}
      </Modal>
    </>
  )
}
