import Ava from 'components/pages/event/ava-2024/assets/ava.svg'
import Flame from 'components/pages/event/ava-2024/assets/flame.svg'
import FourLeafClover from 'components/pages/event/ava-2024/assets/fourleafclover.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
export default function Award() {
  const { locale } = useRouter()
  if (locale == 'vn') {
    return (
      <div className='w-[80vw] max-w-[500px] max-h-[80vh] overflow-auto no-scrollbar font-light'>
        <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black'>
          <div className='text-lg font-bold rounded-md bg-[#A967FF] px-2 py-0.5'>Tổng giải thưởng</div>
          <Image src={Ava} alt='' className='w-[138px] h-auto' />
          <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>150.000.000 VND</div>
          <div className='font-medium mt-2'>53 giải thưởng</div>
        </div>
        <div className='w-full border-t border-dashed border-white my-4'></div>
        <div className='text-lg font-medium w-full text-center'>Giải thưởng chung kết</div>
        <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black mt-4'>
          <div className='text-lg font-bold rounded-md bg-[#1EBB61] px-2 py-0.5'>Giải đặc biệt</div>
          <Image src={Flame} alt='' className='w-[138px] h-auto' />
          <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>30.000.000 VND</div>
        </div>
        <div className='mt-4 bg-neutral-950 p-4 text-sm space-y-1.5'>
          <div className='flex gap-1.5 items-center'>
            <span>
              <Image src={FourLeafClover} alt='' className='w-5' />
            </span>
            Chung kết - 01 Giải Nhất: 15.000.000 VND
          </div>
          <div className='flex gap-1.5 items-center'>
            <span>
              <Image src={FourLeafClover} alt='' className='w-5' />
            </span>
            Chung kết - 02 Giải Nhì: 10.000.000 VND
          </div>
          <div className='flex gap-1.5 items-center'>
            <span>
              <Image src={FourLeafClover} alt='' className='w-5' />
            </span>
            Chung kết - 03 Giải Ba: 5.000.000 VND
          </div>
          <div className='flex gap-1.5 items-center'>
            <span>
              <Image src={FourLeafClover} alt='' className='w-5' />
            </span>
            Chung kết - 10 Giải Khuyến khích: 1.000.000 VND
          </div>
        </div>
        <div className='w-full border-t border-dashed border-white my-4'></div>
        <div className='text-lg font-medium w-full text-center mt-5'>Giải thưởng khác</div>
        <div className='mt-4 bg-neutral-950 p-4 text-sm space-y-1.5'>
          <div>
            <h2>Vòng 1</h2>
            <p>01 Nhân vật xuất sắc nhất: 3.000.000 VNĐ</p>
            <p>01 Nhân vật xuất sắc nhất: 2.000.000 VNĐ</p>
            <p>01 Nhân vật xuất sắc nhất: 1.000.000 VNĐ</p>
            <br />
            <h2>Vòng 2</h2>
            <p>01 Kể chuyện xuất sắc nhất: 200 USD</p>
            <p>01 Kể chuyện xuất sắc nhất: 3.000.000 VNĐ</p>
            <p>01 Kể chuyện xuất sắc nhất: 1.000.000 VNĐ</p>
            <br />
            <h2>Vòng 3</h2>
            <p>01 Tác phẩm ấn tượng nhất: 3.000.000 VNĐ</p>
            <p>01 Tác phẩm ấn tượng nhất: 2.000.000 VNĐ</p>
            <p>01 Tác phẩm ấn tượng nhất: 1.000.000 VNĐ</p>
            <br />
            <h2>Bình chọn hàng đầu</h2>
            <p>Bình chọn hàng đầu Facebook Vòng 1: 1.000.000 VNĐ</p>
            <p>Bình chọn hàng đầu Facebook Vòng 2: 2.000.000 VNĐ</p>
            <p>Bình chọn hàng đầu Facebook Vòng 3: 1.000.000 VNĐ</p>
            <p>Bình chọn hàng đầu X Vòng 1: 1.000.000 VNĐ</p>
            <p>Bình chọn hàng đầu X Vòng 2: 2.000.000 VNĐ</p>
            <p>Bình chọn hàng đầu X Vòng 3: 1.000.000 VNĐ</p>
            <br />
            <h2>IP được sưu tập nhiều nhất</h2>
            <p>IP được sưu tập nhiều nhất - Top 1: 3.000.000 VNĐ</p>
            <p>IP được sưu tập nhiều nhất - Top 2: 2.000.000 VNĐ</p>
            <p>IP được sưu tập nhiều nhất - Top 3: 1.000.000 VNĐ</p>
            <br />
            <h2>Đóng góp cho cộng đồng</h2>
            <p>Đóng góp cho cộng đồng (Kinh nghiệm, Kiến thức, Tương tác cộng đồng) - 10 giải: 60 USD mỗi giải</p>
            <br />
            <h2>Camp Quest</h2>
            <p>Bảng xếp hạng: 2 triệu + 10 người may mắn x 1 triệu: 480 USD</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='w-[80vw] max-w-[500px] max-h-[80vh] overflow-auto no-scrollbar font-light'>
      <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black'>
        <div className='text-lg font-bold rounded-md bg-[#A967FF] px-2 py-0.5'>Prize pool</div>
        <Image src={Ava} alt='' className='w-[138px] h-auto' />
        <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>6000 USD</div>
        <div className='font-medium mt-2'>53 prizes</div>
      </div>
      <div className='w-full border-t border-dashed border-white my-4'></div>
      <div className='text-lg font-medium w-full text-center'>Grand Final Prizes</div>
      <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black mt-4'>
        <div className='text-lg font-bold rounded-md bg-[#1EBB61] px-2 py-0.5'>Special Prize</div>
        <Image src={Flame} alt='' className='w-[138px] h-auto' />
        <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>1200 USD</div>
      </div>
      <div className='mt-4 bg-neutral-950 p-4 text-sm space-y-1.5'>
        <div className='flex gap-1.5 items-center'>
          <span>
            <Image src={FourLeafClover} alt='' className='w-5' />
          </span>
          Grand Final - 01 1st Prize: 600 USD
        </div>
        <div className='flex gap-1.5 items-center'>
          <span>
            <Image src={FourLeafClover} alt='' className='w-5' />
          </span>
          Grand Final - 02 2nd Prize: 400 USD
        </div>
        <div className='flex gap-1.5 items-center'>
          <span>
            <Image src={FourLeafClover} alt='' className='w-5' />
          </span>
          Grand Final - 03 3rd Prize: 200 USD
        </div>
        <div className='flex gap-1.5 items-center'>
          <span>
            <Image src={FourLeafClover} alt='' className='w-5' />
          </span>
          Grand Final - 10 Encouragement Prizes: 40 USD
        </div>
      </div>

      <div className='w-full border-t border-dashed border-white my-4'></div>
      <div className='text-lg font-medium w-full text-center mt-5'>Other Prizes</div>
      <div className='mt-4 bg-neutral-950 p-4 text-sm space-y-1.5'>
        <div>
          <h2>Round 1</h2>
          <p>01 Best Character (1st): 120 USD</p>
          <p>01 Best Character (2nd): 80 USD</p>
          <p>01 Best Character (3rd): 40 USD</p>
          <br />
          <h2>Round 2</h2>
          <p>01 Best Story Telling (1st): 200 USD</p>
          <p>01 Best Story Telling (2nd): 120 USD</p>
          <p>01 Best Story Telling (3rd): 40 USD</p>

          <br />
          <h2>Round 3</h2>
          <p>01 Impressive Artwork (1st): 120 USD</p>
          <p>01 Impressive Artwork (2nd): 80 USD</p>
          <p>01 Impressive Artwork (3rd): 40 USD</p>
          <br />

          <h2>Top Votes</h2>
          <p>Top Vote Facebook Round 1: 40 USD</p>
          <p>Top Vote Facebook Round 2: 80 USD</p>
          <p>Top Vote Facebook Round 3: 40 USD</p>
          <p>Top Vote X Round 1: 40 USD</p>
          <p>Top Vote X Round 2: 80 USD</p>
          <p>Top Vote X Round 3: 40 USD</p>
          <br />

          <h2>The Most Collected IP</h2>
          <p>The Most Collected IP - Top 1: 120 USD</p>
          <p>The Most Collected IP - Top 2: 80 USD</p>
          <p>The Most Collected IP - Top 3: 40 USD</p>
          <br />

          <h2>Community Contribute</h2>
          <p>Community Contribute (Experience, Knowledge, Community Engagement) - 10 prizes: 60 USD each</p>
          <br />

          <h2>Camp Quest</h2>
          <p>Leaderboard: 80 USD + 10 lucky winners x 40 UDS: 480 USD</p>
        </div>
      </div>
    </div>
  )
}
