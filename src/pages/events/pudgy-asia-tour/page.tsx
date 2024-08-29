import Modal from 'components/Modal'
import Tooltip from 'components/Tooltip'
import Button from 'components/core/Button/Button'
import BannerDesktopVN from 'components/pages/event/pudgy-asia-tour/assets/desktop-banner-vn.png'
import BannerDesktop from 'components/pages/event/pudgy-asia-tour/assets/desktop-banner.png'
import BannerMobileVN from 'components/pages/event/pudgy-asia-tour/assets/mobile-banner-vn.png'
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
import Rule1 from 'components/pages/event/pudgy-asia-tour/assets/rule1.png'
import Rule1VN from 'components/pages/event/pudgy-asia-tour/assets/rule1vn.png'
import Rule2 from 'components/pages/event/pudgy-asia-tour/assets/rule2.png'
import Rule3 from 'components/pages/event/pudgy-asia-tour/assets/rule3.png'
export default function Pudgy() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [seeMore, setSeeMore] = useState(false)
  const { data, isLoading } = useSWR(
    'https://script.google.com/macros/s/AKfycbxPbBuEeVJjMzQ2sxNIOkXMz8huVk53C8C9usU2J59j0sMMrb_ZAUARwCa_UJvGYpaR5A/exec',
    (url) => fetch(url).then((res) => res.json())
  )
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
                <Tooltip label={t('Share on X')}>
                  <Link
                    target='_blank'
                    href={`https://twitter.com/intent/retweet?tweet_id=1823226519180673093`}
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
                  <span>{t('Starts at')}:</span> {locale == 'vn' ? '12 Tháng 8 2024' : '12 August 2024'}
                </div>
                <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                <div>
                  <span>{t('Ends at')}:</span> {locale == 'vn' ? '01 Tháng 9 2024' : '01 September 2024'}
                </div>
              </div>
              <div className='mt-4 flex gap-4 items-center'>
                <Link
                  href='https://x.com/PunkgaMeManga/status/1823226519180673093'
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
                <Link
                  href='https://discord.com/channels/1257197165227409450/1272788384351518844'
                  target='_blank'
                  className='bg-[#454545] rounded-sm py-1 px-2.5 flex items-center gap-1 text-xxs leading-4 font-semibold text-text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='22'
                    height='18'
                    viewBox='0 0 22 18'
                    fill='none'
                    className='w-4 h-4'>
                    <path
                      d='M18.6239 1.80801C17.2217 1.16462 15.7181 0.6906 14.1459 0.419108C14.1173 0.413868 14.0887 0.426962 14.0739 0.453152C13.8805 0.797099 13.6663 1.24581 13.5163 1.59849C11.8254 1.34533 10.1431 1.34533 8.48679 1.59849C8.33676 1.23797 8.11478 0.797099 7.92053 0.453152C7.90578 0.427836 7.87718 0.414742 7.84855 0.419108C6.27725 0.689732 4.7736 1.16375 3.37052 1.80801C3.35838 1.81325 3.34797 1.82199 3.34106 1.83333C0.488942 6.09433 -0.292371 10.2506 0.0909151 14.3553C0.0926494 14.3754 0.103922 14.3946 0.119532 14.4068C2.00127 15.7887 3.82406 16.6277 5.61301 17.1838C5.64164 17.1925 5.67197 17.182 5.69019 17.1584C6.11337 16.5806 6.49059 15.9712 6.81402 15.3304C6.83311 15.2929 6.81489 15.2484 6.77588 15.2335C6.17754 15.0066 5.6078 14.7298 5.05975 14.4156C5.0164 14.3902 5.01293 14.3282 5.05281 14.2986C5.16814 14.2121 5.2835 14.1222 5.39363 14.0314C5.41355 14.0149 5.44131 14.0114 5.46474 14.0218C9.06518 15.6657 12.9631 15.6657 16.521 14.0218C16.5445 14.0105 16.5722 14.014 16.593 14.0306C16.7032 14.1214 16.8185 14.2121 16.9347 14.2986C16.9746 14.3282 16.972 14.3902 16.9286 14.4156C16.3806 14.7359 15.8108 15.0066 15.2116 15.2327C15.1726 15.2475 15.1553 15.2929 15.1744 15.3304C15.5047 15.9703 15.882 16.5797 16.2973 17.1576C16.3147 17.182 16.3459 17.1925 16.3745 17.1838C18.1721 16.6277 19.9949 15.7887 21.8766 14.4068C21.8931 14.3946 21.9035 14.3763 21.9053 14.3562C22.364 9.61067 21.1369 5.48849 18.6525 1.8342C18.6465 1.82199 18.6361 1.81325 18.6239 1.80801ZM7.35169 11.856C6.26771 11.856 5.37454 10.8608 5.37454 9.63862C5.37454 8.41644 6.25039 7.42127 7.35169 7.42127C8.46163 7.42127 9.34616 8.42518 9.32881 9.63862C9.32881 10.8608 8.45296 11.856 7.35169 11.856ZM14.6619 11.856C13.5779 11.856 12.6847 10.8608 12.6847 9.63862C12.6847 8.41644 13.5606 7.42127 14.6619 7.42127C15.7718 7.42127 16.6563 8.42518 16.639 9.63862C16.639 10.8608 15.7718 11.856 14.6619 11.856Z'
                      fill='white'
                    />
                  </svg>
                  {t('Go to Discord')}
                </Link>
                <Link
                  href='https://www.facebook.com/PunkgaMeManga'
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
              </div>
              {locale == 'vn' ? (
                <p className={`text-sm font-semibold mt-4 ${seeMore ? '' : 'line-clamp-6'}`}>
                  📢 CUỘC THI VẼ PUDGY ASIA ART ĐÃ CHÍNH THỨC BẮT ĐẦU!
                  <br />
                  <br />
                  Những chú chim cánh cụt Pudgy đáng yêu đến từ quốc đảo xa xôi đang háo hức khám phá những điều kỳ diệu
                  của châu Á! Bạn có sẵn sàng trở thành người bạn đồng hành cùng các chú Pudgy tham gia những trải
                  nghiệm du lịch độc đáo và đáng nhớ nhất không? Hãy để trí tưởng tượng bay cao, bay xa và cùng những
                  chú chim cánh cụt Pudgy du hí khắp châu Á qua những nét vẽ đầy màu sắc!
                  <br />
                  <br />
                  ⏳ Thời gian diễn ra: 12/08 - 01/09
                  <br />
                  👥 Đối tượng tham gia: Dành cho tất cả các họa sĩ, không giới hạn độ tuổi.
                  <br />
                  <br />
                  CÁCH THỨC THAM GIA: ĐĂNG KÝ: (12/08 - 25/08)
                  <ul className='list-inside list-disc pl-5'>
                    <li>
                      Điền thông tin vào form đăng ký:{' '}
                      <Link href='https://bit.ly/pudgyasiaart' target='_blank' className='text-info-default underline'>
                        https://bit.ly/pudgyasiaart
                      </Link>
                    </li>
                    <li>
                      BTC sẽ gửi đến bạn 1-2 chú Pudgy ngẫu nhiên trong vòng 24h gồm hình ảnh và đoạn văn giới thiệu về
                      Pudgy sẽ đồng hành cùng bạn trong cuộc phiêu lưu sáng tạo.
                    </li>
                  </ul>
                </p>
              ) : (
                <p className={`text-sm font-semibold mt-4 ${seeMore ? '' : 'line-clamp-6'}`}>
                  [PUDGY ASIA ART - DISCOVER ASIA TOURISM & CULTURE] 📢 THE COLORFUL ART CONTEST IS OFFICIALLY OPEN FOR
                  REGISTRATION! 🎨
                  <br />
                  <br />
                  The adorable Pudgy penguins from a faraway island are eager to explore the wonders of Asia! Are you
                  ready to become their companion, guiding them through unique and unforgettable travel experiences? Let
                  your imagination soar and join the Pudgy penguins on a journey across Asia through your colorful
                  artwork!
                  <br />
                  <br />⏳ Event Duration: August 12th - September 1st <br />
                  👥 Participants: Open to all artists, regardless of age.
                  <br />
                  <br /> HOW TO PARTICIPATE: <br />
                  ✏️ REGISTRATION: (August 12th - 25th)
                  <ul className='list-inside list-disc pl-5'>
                    <li>
                      Fill out the registration form:{' '}
                      <Link
                        href='https://bit.ly/pudgy-asia-art'
                        target='_blank'
                        className='text-info-default underline'>
                        https://bit.ly/pudgy-asia-art
                      </Link>
                    </li>
                    <li>
                      The Organizing Committee will send you 1-2 random Pudgy penguins within 24 hours, along with an
                      image and introduction about the Pudgy that will accompany you on this creative adventure.
                    </li>
                  </ul>
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
                        'https://docs.google.com/forms/d/e/1FAIpQLScJtKi4WDONR_7NUTB1qhQ-azCnKmexzk5aZfKXjuxUROBqOg/viewform',
                        '_blank'
                      )
                    }
                    className='w-full cursor-pointer bg-[#4A7CF9] rounded-mlg text-center text-lg font-semibold text-white h-10 grid place-items-center'>
                    {t('Submit my artwork')}
                  </div>
                )}
              </div>
              <div className='bg-neutral-white rounded-mlg py-5 px-4 flex flex-col gap-6 text-[#1C1C1C] border border-black'>
                <div className='flex gap-5 justify-between'>
                  <div className='flex flex-col gap-1 w-[40%]'>
                    <div className='text-sm font-semibold'>{t('Participants')}</div>
                    <div className='font-semibold text-2xl'>
                      {data?.generalData?.find((d) => d.key == 'Participants').value || '---'}
                    </div>
                  </div>
                  <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
                  <div className='flex flex-col gap-1 w-[40%]'>
                    <div className='text-sm font-semibold'>{t('Submitted artworks')}</div>
                    <div className='font-semibold text-2xl'>
                      {data?.generalData?.find((d) => d.key == 'Submitted artworks').value || '---'}
                    </div>
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
        className='w-full cursor-pointer bg-[#183442] rounded-mlg text-center text-lg font-semibold text-white h-10 grid place-items-center'
        onClick={() => setOpen(true)}>
        {t('View Rule')}
      </div>
      <Modal open={open} setOpen={setOpen}>
        {locale == 'vn' ? (
          <div className=' w-[90vw] p-5 lg:p-10 max-w-[1000px] max-h-[90vh] overflow-auto'>
            <div className='w-full text-center text-lg font-semibold'>💎 Contest Rules</div>
            <ul className='mt-8 text-sm list-disc list-inside'>
              <strong>📢 CUỘC THI VẼ PUDGY ASIA ART ĐÃ CHÍNH THỨC BẮT ĐẦU!</strong>
              <br />
              <br />
              <p>
                Những chú chim cánh cụt Pudgy đáng yêu đến từ quốc đảo xa xôi đang háo hức khám phá những điều kỳ diệu
                của châu Á! Bạn có sẵn sàng trở thành người bạn đồng hành cùng các chú Pudgy tham gia những trải nghiệm
                du lịch độc đáo và đáng nhớ nhất không? Hãy để trí tưởng tượng bay cao, bay xa và cùng những chú chim
                cánh cụt Pudgy du hí khắp châu Á qua những nét vẽ đầy màu sắc!
              </p>
              <br />
              <p>
                <strong>⏳ Thời gian diễn ra:</strong>
                12/08 - 01/09
              </p>
              <p>
                <strong>👥 Đối tượng tham gia:</strong>
                Dành cho tất cả các họa sĩ, không giới hạn độ tuổi.
              </p>
              <br />
              <strong>CÁCH THỨC THAM GIA:</strong>
              <br />
              <br />
              <div className='pl-5'>
                <div>
                  <strong>1. ĐĂNG KÝ: </strong>
                  (12/08 - 25/08)
                </div>
                <div className='pl-5'>
                  <li>
                    Điền thông tin vào form đăng ký:{' '}
                    <Link href='https://bit.ly/pudgyasiaart' target='_blank' className='text-info-default underline'>
                      https://bit.ly/pudgyasiaart
                    </Link>
                  </li>
                  <li>
                    BTC sẽ gửi đến bạn 1-2 chú Pudgy ngẫu nhiên trong vòng 24h gồm hình ảnh và đoạn văn giới thiệu về
                    Pudgy sẽ đồng hành cùng bạn trong cuộc phiêu lưu sáng tạo.
                  </li>
                </div>
              </div>
              <br />
              <div className='pl-5'>
                <div>
                  <strong>2. SÁNG TẠO: </strong>
                  (15/08 - 01/09)
                </div>
                <div className='pl-5'>
                  <li>
                    <strong>Nhiệm vụ 1: Thiết kế nhân vật hướng dẫn viên (1 trang truyện)</strong>
                    <div className='pl-5'>
                      <li>
                        Vẽ OC (Original Character) của bạn cùng 1-2 Pudgy đáng yêu đang thực hiện chuyến đi chơi Châu Á,
                        tất cả các thành viên trong chuyến đi phải mặc trang phục du lịch.
                      </li>
                      <li>
                        Lưu ý:
                        <div className='pl-5'>
                          <li>Bắt buộc tô màu.</li>
                          <li>
                            Giới thiệu đầy đủ thông tin về OC của bạn như hình ảnh, tên, mô tả tính cách, sở thích,
                            nguồn gốc và đặc điểm của nhân vật,...
                          </li>
                          <Image src={Rule1} alt='' className='mx-auto' />
                        </div>
                      </li>
                    </div>
                  </li>
                </div>
                <br />
                <div className='pl-5'>
                  <li>
                    <strong>Nhiệm vụ 2: Ghi chú du lịch (3-5 trang truyện)</strong>
                    <div className='pl-5'>
                      <li>
                        Vẽ và kể về chuyến đi đáng nhớ của OC & Pudgy, khám phá những nét văn hóa độc đáo của Việt Nam
                        hoặc một quốc gia châu Á bất kỳ.
                      </li>
                      <li>
                        Lưu ý:
                        <div className='pl-5'>
                          <li>Những tác phẩm có trải nghiệm độc đáo và thú vị sẽ được đánh giá cao.</li>
                          <li>Mỗi bài thi chỉ được chọn 1 quốc gia.</li>
                          <Image src={Rule2} alt='' className='mx-auto' />
                        </div>
                      </li>
                    </div>
                  </li>
                </div>
                <br />
                <div className='pl-5'>
                  <li>
                    <strong>Nhiệm vụ 3: Selfie nhóm (1 trang truyện)</strong>
                    <div className='pl-5'>
                      <li>
                        Bắt trọn khoảnh khắc "sống ảo" của OC và Pudgy khi khám phá những nét văn hóa độc đáo của nước
                        châu Á mà bạn chọn.
                      </li>
                      <li>
                        Lưu ý: Có thể tô màu hoặc không.
                        <Image src={Rule3} alt='' className='mx-auto' />
                      </li>
                    </div>
                  </li>
                </div>
              </div>
              <br />
              <div className='pl-5'>
                <div>
                  <strong>3. NỘP BÀI: </strong>
                  (15/08 - 01/09)
                </div>
                <div className='pl-5'>
                  <li>Nộp bài qua website Punkga.Me (đang cập nhật) trước 01/09.</li>
                  <li>Nộp 2 bản: Tiếng Việt và Tiếng Anh (BTC sẽ hỗ trợ dịch nếu hoạ sĩ cần)</li>
                </div>
              </div>
              <br />
              <strong>
                TÀI NGUYÊN (MẪU, TEMPLATE, HƯỚNG DẪN):{' '}
                <Link
                  className='text-text-info-primary underline font-normal'
                  href={`https://bit.ly/pudgy-asia-art-resource`}
                  target='_blank'>
                  https://bit.ly/pudgy-asia-art-resource
                </Link>
              </strong>
              <br />
              <br />
              <strong>YÊU CẦU CHUNG:</strong>
              <br />
              <div className='pl-5'>
                <li>
                  Kích thước của tác phẩm: size vuông, từ 2000 x 2000 px, chất lượng từ 300 dpi, dung lượng dưới 1 MB.
                </li>
                <li>Vibe: Hài hước, vui vẻ, lạc quan, năng động, tích cực.</li>
                <li>Vẽ tay hoặc máy đều được.</li>
              </div>
              <br />
              <p>
                Chỉ 60 họa sĩ đăng ký sớm nhất mới có cơ hội đồng hành cùng Pudgy trong chuyến phiêu lưu khám phá châu Á
                đầy màu sắc! Đừng bỏ lỡ cơ hội thể hiện tài năng và rinh về những giải thưởng hấp dẫn!
              </p>
            </ul>
          </div>
        ) : (
          <div className=' w-[90vw] p-5 lg:p-10 max-w-[1000px] max-h-[90vh] overflow-auto'>
            <div className='w-full text-center text-lg font-semibold'>💎 Contest Rules</div>
            <ul className='mt-8 text-sm list-disc list-inside'>
              <strong>📢 THE COLORFUL ART CONTEST IS OFFICIALLY OPEN FOR REGISTRATION! 🎨</strong>
              <br />
              <br />
              <p>
                The adorable Pudgy penguins from a faraway island are eager to explore the wonders of Asia! Are you
                ready to become their companion, guiding them through unique and unforgettable travel experiences? Let
                your imagination soar and join the Pudgy penguins on a journey across Asia through your colorful
                artwork!
              </p>
              <br />
              <p>
                <strong>⏳ Event Duration:</strong>
                August 12th - September 1st
              </p>
              <p>
                <strong>👥 Participants:</strong>
                Open to all artists, regardless of age.
              </p>
              <br />
              <strong>HOW TO PARTICIPATE:</strong>
              <br />
              <br />
              <div className='pl-5'>
                <div>
                  <strong>1. REGISTRATION: </strong>
                  (August 12th - 25th)
                </div>
                <div className='pl-5'>
                  <li>
                    Fill out the registration form:{' '}
                    <Link href='https://bit.ly/pudgyasiaart' target='_blank' className='text-info-default underline'>
                      https://bit.ly/pudgyasiaart
                    </Link>
                  </li>
                  <li>
                    The Organizing Committee will send you 1-2 random Pudgy penguins within 24 hours, along with an
                    image and introduction about the Pudgy that will accompany you on this creative adventure.
                  </li>
                </div>
              </div>
              <br />
              <div className='pl-5'>
                <div>
                  <strong>2. CREATION: </strong>
                  (August 15th - September 1st)
                </div>
                <div className='pl-5'>
                  <li>
                    <strong>Task 1: Tour Guide Character Design (1-page comic)</strong>
                    <div className='pl-5'>
                      <li>
                        Draw your OC (Original Character) with 1-2 adorable Pudgy penguins embarking on an Asia journey.
                        All members of the trip must be dressed in travel attire.
                      </li>
                      <li>
                        Note:
                        <div className='pl-5'>
                          <li>Coloring is mandatory.</li>
                          <li>
                            Provide complete information about your OC, including image, name, personality description,
                            hobbies, origin, and character traits.
                          </li>
                          <Image src={Rule1VN} alt='' className='mx-auto' />
                        </div>
                      </li>
                    </div>
                  </li>
                </div>
                <br />
                <div className='pl-5'>
                  <li>
                    <strong>Task 2: Travel Journal (3-5 pages comic)</strong>
                    <div className='pl-5'>
                      <li>
                        Draw and write about the memorable experiences and emotions of your OC and the adorable Pudgy
                        penguin during their trip to Vietnam or any other Asia country.
                      </li>
                      <li>
                        Note:
                        <div className='pl-5'>
                          <li>
                            Entries with unique and interesting experiences in lesser-known countries will be highly
                            appreciated.
                          </li>
                          <li>Each entry can only focus on one country.</li>
                          <li>Coloring is optional.</li>
                          <Image src={Rule2} alt='' className='mx-auto' />
                        </div>
                      </li>
                    </div>
                  </li>
                </div>
                <br />
                <div className='pl-5'>
                  <li>
                    <strong>Task 3: Group Selfie (1-page comic)</strong>
                    <div className='pl-5'>
                      <li>
                        Capture a "selfie" moment of your OC and Pudgy as they explore the unique culture of the chosen
                        Asia country.
                      </li>
                      <li>
                        Note: Coloring is optional.
                        <Image src={Rule3} alt='' className='mx-auto' />
                      </li>
                    </div>
                  </li>
                </div>
              </div>
              <br />
              <div className='pl-5'>
                <div>
                  <strong>3. SUBMISSION: </strong>
                </div>
                <div className='pl-5'>
                  <li>
                    Submit your entry through the PunkgaMe website (currently being updated) before September 1st.
                  </li>
                  <li>
                    Submit 2 versions: Vietnamese and English (The PunkgaMe will provide translation assistance if
                    needed).
                  </li>
                </div>
              </div>
              <br />
              <strong>GENERAL REQUIREMENTS:</strong>
              <br />
              <div className='pl-5'>
                <li>Artwork size: Square, from 2000 x 2000 px, 300 dpi quality, file size under 1 MB</li>
                <li>Vibe: Humorous, cheerful, optimistic, energetic, and positive.</li>
                <li>Both hand-drawn and digital art are accepted.</li>
              </div>
              <br />
              <p>
                🚀 Limited slots: Only the first 60 registered artists will have the opportunity to join Pudgy on this
                colorful Asia adventure! Don't miss the chance to showcase your talent and win attractive prizes!
              </p>
            </ul>
          </div>
        )}
      </Modal>
    </>
  )
}
