import MainButton from 'components/Button/MainButton'
import BannerDesktop from 'components/pages/event/assets/banner-desktop.png'
import BannerMobile from 'components/pages/event/assets/banner-mobile.png'
import Banner from 'components/pages/event/assets/banner.png'
import Image from 'next/image'
import Link from 'next/link'
import X from 'assets/images/x.png'
import Facebook from 'assets/images/Facebook.png'
import moment from 'moment'
import JudgeBoard from 'components/pages/event/wow-yourself/JudgeBoard'
import { useState } from 'react'
import Modal from 'components/Modal'
export default function WowYourSelf() {
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
              Wow yourself - Final round{' '}
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
            </h1>
            <div className='mt-1 flex gap-3 items-center lg:mt-3'>
              <Link target='_blank' href='https://x.com/PunkgaMeManga/status/1796810762088018331'>
                <Image src={X} alt='' className='w-8 h-8' />
              </Link>
              <Link
                target='_blank'
                href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02H7stNei37BqvRZD5ygKW1WdJsdWad7TYgwhHMSFMY6deWh3NVzWjXXBByc5rC2nml'>
                <Image src={Facebook} alt='' className='w-8 h-8' />
              </Link>
            </div>
            <p className='text-xs leading-5 mt-4 lg:mt-3 lg:text-sm lg:leading-6'>
              WoW YOURSELF - CUỘC THI VẼ TRUYỆN HOT NHẤT MÙA HÈ CHỈ CÓ TẠI PUNKGA ME!
              <br />
              Bạn có đam mê vẽ truyện? Bạn muốn thể hiện cá tính và tài năng của mình? Vậy thì đừng bỏ lỡ cơ hội tỏa
              sáng cùng cuộc thi WoW YOURSELF do Punkga ME tổ chức!
              <br />
              Tổng giải thưởng lên đến 8.000.000+ VNĐ cùng nhiều phần quà hấp dẫn khác, WoW YOURSELF hứa hẹn sẽ mang đến
              những trải nghiệm thú vị và cơ hội phát triển bản thân cho tất cả các hoạ sĩ.
              <br />
              Tham gia group cuộc thi của Punkga tại đây:{' '}
              <Link href='http://www.facebook.com/group/punkga.me' className='text-[#2684FC] underline'>
                http://www.facebook.com/group/punkga.me
              </Link>
            </p>
          </div>
          <div className='flex flex-col gap-4 lg:w-1/2 lg:max-w-[400px] lg:shrink-0'>
            <div className='flex gap-5'>
              <ViewRule />
              <MainButton disabled={!moment().isAfter(moment('2024-06-11'))} className='w-full'>
                Submit my artwork
              </MainButton>
            </div>
            <div className='bg-[#F2F2F2] rounded-2xl py-5 px-4 flex flex-col gap-5 text-[#1C1C1C]'>
              <div className='flex gap-6 justify-between'>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px]'>Participants</div>
                  <div className='font-semibold lg:text-lg'>12</div>
                </div>
                <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px]'>Submitted artworks</div>
                  <div className='font-semibold lg:text-lg'>2048</div>
                </div>
              </div>
            </div>
            {/* <Link href=''>
              <Image src={Banner} alt='' className='w-full' />
            </Link> */}
          </div>
        </div>
        <div className='flex flex-col items-center w-full mt-10 xl:mt-8 xl:flex-row xl:max-w-[1280px] mx-auto'>
          <div
            className={`lg:min-h-[138px] max-w-[400px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
              moment().isAfter(moment('2024-06-03'))
                ? moment().isBefore(moment('2024-06-10'))
                  ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
                  : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
                : 'border-[#DEDEDE]'
            }`}>
            <div className='font-semibold leading-5'>Round 1: Show YOURSELF</div>
            <div className='flex gap-6 justify-between'>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Start</div>
                <div className='font-semibold'>03/06 - 10/06</div>
              </div>
              <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Participants:</div>
                <div className='font-semibold'>2048</div>
              </div>
            </div>
            <Link
              href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02fm2AemHFfMWPaZxPceJHyQbj1PsPUkfXCoJbLZJGAJuXCfpc49apQknwdkdEfkhbl?rdid=2Ew6QNhR0hxgSi2o'
              target='_blank'
              className='text-[#2684FC] text-sm'>
              View on facebook
            </Link>
          </div>
          <div className='w-[1px] h-[32px] xl:flex-1 xl:h-[1px] xl:min-w-5 xl:shrink-0 bg-[#1C1C1C1A]'></div>
          <div
            className={`xl:min-h-[138px] max-w-[400px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
              moment().isAfter(moment('2024-06-11'))
                ? moment().isBefore(moment('2024-06-17'))
                  ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
                  : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
                : 'border-[#DEDEDE]'
            }`}>
            <div className='font-semibold leading-5'>Round 2: Know YOURSELF</div>
            <div className='flex gap-6 justify-between'>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Start</div>
                <div className='font-semibold'>11/06 - 17/06</div>
              </div>
              <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Participants:</div>
                <div className='font-semibold'>---</div>
              </div>
            </div>
          </div>
          <div className='w-[1px] h-[32px] xl:flex-1 xl:h-[1px] xl:min-w-5 xl:shrink-0 bg-[#1C1C1C1A]'></div>
          <div
            className={`xl:min-h-[138px] max-w-[400px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
              moment().isAfter(moment('2024-06-18'))
                ? moment().isBefore(moment('2024-06-30'))
                  ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
                  : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
                : 'border-[#DEDEDE]'
            }`}>
            <div className='font-semibold leading-5'>Round 3: Grow YOURSELF</div>
            <div className='flex gap-6 justify-between'>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Start</div>
                <div className='font-semibold'>18/06 - 30/06</div>
              </div>
              <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Participants:</div>
                <div className='font-semibold'>---</div>
              </div>
            </div>
          </div>
        </div>
        <JudgeBoard />
      </div>
    </div>
  )
}
function ViewRule() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <MainButton style='secondary' className='w-full' onClick={() => setOpen(true)}>
        View Rule
      </MainButton>
      <Modal open={open} setOpen={setOpen}>
        <div className=' w-[90vw] p-5 lg:p-10 max-w-[1000px] h-[90vh] overflow-auto'>
          <div className='w-full text-center text-xl font-bold'>Thể lệ chi tiết cuộc thi WoW Yourself</div>
          <br />
          <strong className='text-md'>VÒNG 1: Show YOURSELF</strong>
          <ol className='list-decimal list-inside pl-5 [&>li]:mt-2 text-sm leading-6'>
            <li className='font-bold'>
              Sáng tạo:
              <ul className='list-disc list-inside pl-5 font-normal'>
                <li>Hoàn thiện hoặc phác thảo 1 trang truyện giới thiệu hoặc chia sẻ về câu chuyện của bản thân bạn</li>
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
                      Các hoạ sĩ tham gia khi kết hợp thêm yếu tố <strong>"FALLING STAR - SAO BĂNG"</strong> để nhận 10
                      điểm Bonus từ Ban giám khảo.
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
                  TOP 10: Do Ban Giám Khảo và ban cố vấn bình chọn - Nhận 10 điểm cộng trên mỗi hoạ sĩ và được cộng vào
                  kết quả chung cuộc!
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
                  trong ban cố vấn sẽ feedback và đưa ý kiến để các thí sinh tiếp tục hoàn thiện bài thi ở vòng sau với
                  chất lượng tốt nhất.
                </li>
                <li>
                  Tất cả các tác phẩm đều nhận được sự đánh giá của các cố vấn là những họa sĩ truyện tranh chuyên
                  nghiệp.
                </li>
                <li>Mỗi tác phẩm sẽ nhận được feedback từ 1 vị cố vấn trong 48H.</li>
                <li>
                  Vòng 2 sẽ không có hoạ sĩ bị loại và tất cả thí sinh nộp bài thi đúng yêu cầu sẽ đủ điều kiện tham gia
                  vòng tiếp theo.
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
      </Modal>
    </>
  )
}