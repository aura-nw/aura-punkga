import Modal from 'components/Modal'
import Tooltip from 'components/Tooltip'
import ChupButton from 'components/core/Button/ChupButton'
import BannerDesktop from 'components/pages/event/kaia-island/assets/desktop-banner.png'
import BannerDesktopVN from 'components/pages/event/kaia-island/assets/desktop-banner-vn.png'
import Artworks from 'components/pages/event/kaia-island/Artwork'
import TimeLine from 'components/pages/event/kaia-island/TimeLine'
import BannerMobile from 'components/pages/event/kaia-island/assets/mobile-banner.png'
import BannerMobileVN from 'components/pages/event/kaia-island/assets/mobile-banner-vn.png'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

import WaveFooter from 'components/pages/event/kaia-island/assets/wave.svg'
export default function KaiaIsland() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [seeMore, setSeeMore] = useState(false)
  const { data, isLoading } = useSWR(
    'https://script.google.com/macros/s/AKfycbyrIAyXFFkHVMzvV3Ku4syqak92g6-oPWuro6f-eVSWqYallYP4Fg9X5p_b5Zb894XDyg/exec',
    (url) => fetch(url).then((res) => res.json())
  )
  return (
    <div className=''>
      <Image src={locale == 'vn' ? BannerMobileVN : BannerMobile} className='w-full lg:hidden h-auto' alt='' />
      <div className='pk-container hidden lg:block'>
        <Image src={locale == 'vn' ? BannerDesktopVN : BannerDesktop} className='w-full h-auto' alt='' />
      </div>
      <div className='pk-container'>
        <div className='flex flex-col gap-8 lg:gap-5 mt-5 lg:mt-8 lg:flex-row lg:justify-between'>
          <div className='lg:w-full lg:max-w-[840px]'>
            <h1 className='font-medium flex items-start gap-4 text-xl text-neutral-black'>
              {moment().isAfter(moment('2024-07-31'))
                ? t(`Kaia's Island Mythology Record - Round 3: Golden Treasure!`)
                : moment().isAfter(moment('2024-07-24'))
                ? t(`Kaia's Island Mythology Record - Round 2: Adventure Time!`)
                : t(`Kaia's Island Mythology Record - Round 1: To the Island!`)}
              <Tooltip label={t('Share on Facebook')}>
                <Link
                  target='_blank'
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    'https://www.facebook.com/PunkgaMeManga/posts/pfbid02dnvJYumJhC1Nh1WungWkV54FNHdvMULh57iGLzAfAXGpvzCuhexBHGTayNbafMkSl'
                  )}`}
                  className='cursor-pointer'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
            </h1>
            <div className='text-sm font-medium flex flex-col gap-2.5 mt-1.5 md:flex-row md:items-center'>
              <div>
                <span>{t('Starts at')}:</span> {locale == 'vn' ? '17 Tháng 7 2024' : '17 Jul 2024'}
              </div>
              <span className='w-1 h-1 rounded-full bg-[#646464] hidden md:inline-block'></span>
              <div>
                <span>{t('Ends at')}:</span> {locale == 'vn' ? '13 Tháng 8 2024' : '13 Aug 2024'}
              </div>
            </div>
            <div className='mt-4 flex gap-4 items-center'>
              <Link
                href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02dnvJYumJhC1Nh1WungWkV54FNHdvMULh57iGLzAfAXGpvzCuhexBHGTayNbafMkSl'
                target='_blank'
                className='bg-[#0866FF] rounded-sm px-1 py-0.5 pr-2.5 flex items-center gap-1 text-xxs leading-4 font-semibold text-text-white'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M13 8.01837C13 5.24682 10.7614 3 8 3C5.2386 3 3 5.24682 3 8.01837C3 10.3718 4.6144 12.3466 6.7922 12.889V9.55198H5.7612V8.01837H6.7922V7.35755C6.7922 5.6495 7.5624 4.8578 9.2332 4.8578C9.55 4.8578 10.0966 4.92023 10.3202 4.98246V6.37254C10.2022 6.3601 9.9972 6.35388 9.7426 6.35388C8.9228 6.35388 8.606 6.66562 8.606 7.47598V8.01837H10.2392L9.9586 9.55198H8.606V13C11.0814 12.6999 13 10.5842 13 8.01837Z'
                    fill='white'
                  />
                </svg>
                {t('Go to Fanpage')}
              </Link>
              <Link
                href='https://x.com/PunkgaMeManga/status/1812863530972160222'
                target='_blank'
                className='bg-neutral-500 rounded-sm px-1 py-0.5 pr-2.5 flex items-center gap-1 text-xxs leading-4 font-semibold text-text-white'>
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
              <p className={`text-sm text-text-teriary mt-4 ${seeMore ? '' : 'line-clamp-6 md:line-clamp-3'}`}>
                <strong>
                  📢 [THÔNG BÁO CHÍNH THỨC] Cuộc thi “Ghi chép về truyền thuyết đảo Kaia - Kaia's Island Mythology
                  Record” với tổng giải thưởng lên đến 50 triệu đồng! 📢
                </strong>
                <br />
                <br />
                <div>
                  Bạn có phải là một họa sĩ đầy đam mê, luôn khao khát được khám phá những vùng đất mới và ghi lại những
                  câu chuyện kỳ bí? Vậy thì cuộc thi "Ghi chép về truyền thuyết đảo Kaia" chính là sân chơi dành cho
                  bạn! 🏝️
                </div>
                <br />
                <strong>👥 Đối tượng tham gia: Tất cả các họa sĩ không giới hạn độ tuổi.</strong>
                <br />
                <br />
                <strong>💰 Tổng giá trị giải tưởng: Lên đến 50.000.000 VNĐ</strong>
                <br />
                <br />
                <strong>💎 Thể lệ cuộc thi:</strong>
                <br />
                <ul className='list-inside list-disc'>
                  <li>Vòng 1 (17/7 - 23/7): To the Island! (Cá nhân)</li>
                  <li>Vòng 2 (24/7 - 30/7): Adventure Time! (Cá nhân)</li>
                  <li>Vòng 3 (31/7 - 13/8): Golden Treasure! (Nhóm)</li>
                </ul>
                <br />
                <strong>Giải thưởng chung cuộc - Dựa vào lượt bình chọn của Ban Giám Khảo:</strong>
                <br />
                <ul className='list-inside list-disc'>
                  <li>1 Giải Đặc Biệt (Huyền thoại sống): 8.000.000 VNĐ</li>
                  <li>1 Giải Nhất (Người dệt giai thoại): 6.000.000 VNĐ</li>
                  <li>1 Giải Nhì (Nhà thực địa): 4.000.000 VNĐ</li>
                  <li>1 Giải Ba (Nghiên cứu sinh xuất sắc): 2.000.000 VNĐ</li>
                  <li>1 Giải MVP cá nhân xuất sắc: In 3D nhân vật chính của người đạt giải</li>
                </ul>
                <br />
                <strong>
                  Hàng ngàn giải thưởng hấp dẫn khác từ nhà tài trợ dành cho các bạn hoạ sĩ, độc giả theo dõi cuộc thi
                  Ghi chép về truyền thuyết đảo Kaia.
                </strong>
                <br />
                <br />
                <div>
                  Hãy để trí tưởng tượng của bạn bay cao, bay xa và cùng PunkgaMe khám phá những điều kỳ diệu trên đảo
                  Kaia!
                </div>
              </p>
            ) : (
              <p className={`text-sm text-text-teriary mt-4 ${seeMore ? '' : 'line-clamp-6 md:line-clamp-3'}`}>
                <strong>📢 [OFFICIAL ANNOUNCEMENT] "Kaia's Island Mythology Record" Contest! 📢</strong>
                <br />
                <br />
                <div>
                  Are you a passionate artist, always eager to explore new lands and capture mysterious stories? Then
                  the "Kaia's Island Mythology Record" contest by @PunkgaMeManga, @klaytn_official, @Klaytn_VN, and
                  @AuraNetworkHQ is the perfect playground for you! 🏝️
                </div>
                <br />
                <strong>👥 Eligibility: Open to all artists</strong>
                <br />
                <br />
                <strong>💰 Total Prize Pool: Up to $2000</strong>
                <br />
                <br />
                <strong>💎 Contest Rules:</strong>
                <br />
                <ul className='list-inside list-disc'>
                  <li>Round 1 (July 17th - 23rd): To the Island! (Individual)</li>
                  <li>Round 2 (July 24th - 30th): Adventure Time! (Individual)</li>
                  <li>Round 3 (July 31st - August 13th): Golden Treasure! (Group)</li>
                </ul>
                <br />
                <strong>Grand Prize - Based on Jury Votes:</strong>
                <br />
                <ul className='list-inside list-disc'>
                  <li>1 Special Prize (Living Legend)</li>
                  <li>1 First Prize (Story Weaver)</li>
                  <li>1 Second Prize (Field Explorer)</li>
                  <li>1 Third Prize (Outstanding Researcher)</li>
                  <li>1 MVP Individual Prize: 3D print of the winner's main character</li>
                </ul>
                <br />
                <strong>
                  Thousands of other attractive prizes from our sponsors for artists, and readers who follow the "Kaia's
                  Island Mythology Record" contest.
                </strong>
                <br />
                <br />
                <div>Let your imagination soar and join PunkgaMe in discovering the wonders of Kaia Island!</div>
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
                <ChupButton
                  size='sm'
                  onClick={() =>
                    window.open(
                      'https://docs.google.com/forms/d/e/1FAIpQLScQbHPR9S5E623IItgHutKouzZ2CYhcEDf5e3iAU44pe9ON-A/viewform',
                      '_blank'
                    )
                  }
                  className='w-full'>
                  {t('Submit my artwork')}
                </ChupButton>
              )}
            </div>
            <div className='bg-neutral-white rounded-mlg py-5 px-4 flex flex-col gap-6 text-[#1C1C1C]'>
              <div className='flex gap-5 justify-between'>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-text-teriary text-sm font-medium'>{t('Participants')}</div>
                  <div className='font-semibold text-xl'>
                    {+data?.generalData?.find((value) => value.key == 'Participants')?.value || '---'}
                  </div>
                </div>
                <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-text-teriary text-sm font-medium'>{t('Submitted artworks')}</div>
                  <div className='font-semibold text-xl'>
                    {+data?.generalData?.find((value) => value.key == 'Submitted artworks')?.value || '---'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TimeLine />
        <Artworks />
      </div>

      <div className='mt-28 -mb-14 w-screen flex justify-center overflow-hidden'>
        <Image src={WaveFooter} alt='' className='w-screen min-w-[1080px]' />
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
      <ChupButton color='dark' size='sm' className='w-full' onClick={() => setOpen(true)}>
        {t('View Rule')}
      </ChupButton>
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
