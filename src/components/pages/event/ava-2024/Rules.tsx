import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Rules() {
  const { locale } = useRouter()
  const [round, setRound] = useState(1)

  return (
    <div className='text-sm font-light max-h-[80vh] overflow-auto no-scrollbar'>
      {locale == 'en' ? (
        <div>
          <h1 className='text-2xl font-bold text-center'>AVA GRAND CONTEST 2024</h1>
          <p className='text-center'>Topic: FIND YOUR ARTISTIC VOICE</p>
          <div className='mt-5'>
            <h2 className='font-bold text-lg'>1/ Contest Message</h2>
            <p>
              - A message to your future self and to all art lovers: strive to improve yourself every day without
              relying on artificial intelligence.
            </p>
          </div>
          <div className='mt-5'>
            <h2 className='font-bold text-lg'>2/ Eligibility</h2>
            <p>
              - Open to comic artists and illustrators worldwide
              <br /> - No age restrictions
            </p>
          </div>
          <div className='mt-5'>
            <h2 className='font-bold text-lg'>3/ Submission Process</h2>
            <p>
              - Compulsory: Submit your entry in English at the{' '}
              <Link target='_blank' className='text-info-400' href='/events/ava-2024/map/submit-portal'>
                Website
              </Link>
            </p>
            <p>- Optional:</p>
            <p className=''>
              + Submit on Facebook Group{' '}
              <Link target='_blank' className='text-info-400' href='https://www.facebook.com/groups/1245774482777852'>
                "PunkgaMe - Vietnam Comic Artists Association"
              </Link>
              with hashtag <span className='text-info-400'>#PunkgaMe #AVA2024 #AVARound1</span>
            </p>
            <p className=''>
              + Submit on X with hashtag <span className='text-info-400'>#PunkgaMe #AVA2024 #AVARound1</span>
            </p>
          </div>
          <div className='mt-5'>
            <h2 className='font-bold text-lg'>4/ Contest Timeline and Rules</h2>
            <div className='mt-4 flex gap-2 -skew-x-12'>
              <div className='h-9 w-3 rounded bg-white'></div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 1 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(1)}>
                <span className='skew-x-12'>Round 1</span>
              </div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 2 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(2)}>
                <span className='skew-x-12'>Round 2</span>
              </div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 3 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(3)}>
                <span className='skew-x-12'>Round 3</span>
              </div>
            </div>
            <div className='mt-4'>
              {round == 1 ? (
                <>
                  <h3 className='text-red-500 font-semibold text-base'>Round 1: Your Artistic Voice</h3>
                  <h4 className='font-medium mt-1'>A/ Timeline:</h4>
                  <p>- From October 12 to October 18</p>
                  <h4 className='font-medium mt-1'>B/ Story:</h4>
                  <p>
                    - After a mysterious figure reaches out to Punka and Min Rabbit, they need more help to form an army
                    of artists to fight against evil AI in the future. That person is you.
                  </p>
                  <h4 className='font-medium mt-1'>C/ Submission Requirements:</h4>
                  <p>
                    - Sample submission, refer{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/drive/folders/1g9O2PBVOlLA6ZWnnxBb6KX1-bNMlXW-P?usp=drive_link'
                      target='_blank'>
                      HERE
                    </Link>
                  </p>
                  <p>
                    - Template of Round 1, please download{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/drive/folders/1JS-exiM9ENtKKTk7y1P0lkT6uF3SJYO0?usp=drive_link'
                      target='_blank'>
                      HERE
                    </Link>
                  </p>
                  <p>
                    - Submit 01 A4 page using the provided template, introducing a full-body character (front or 3/4
                    view) and 1 avatar (1:1 ratio, 1500x1500px) to create an exclusive IP in the IP room.
                  </p>
                  <p>
                    - Include additional details on the A4 page: name, occupation, artistic philosophy, and style of the
                    character.
                  </p>
                  <p>- The artwork must be in colour.</p>
                  <p>- Submit in English.</p>
                  <p>- Use any font (ensure readability).</p>
                  <h4 className='font-medium mt-1'>D/ Note:</h4>
                  <p>
                    - Your avatar will be stored in the IP room. Clicking on it will allow viewers to see your full
                    Round 1 submission.
                  </p>
                </>
              ) : round == 2 ? (
                <>
                  <h3 className='text-red-500 font-semibold text-base'>Round 2: The Art of Storytelling</h3>
                  <h4 className='font-medium mt-1'>A/ Timeline:</h4>
                  <p>- From October 19 to November 01</p>
                  <h4 className='font-medium mt-1'>B/ Story:</h4>
                  <p>
                    - Share your artistic journey or your creative experiences. The story should be complete and convey
                    a positive message, reflecting your personal view on the pure value of art in life. This is the key
                    to creating powerful weapons.
                  </p>
                  <h4 className='font-medium mt-1'>C/ Submission Requirements:</h4>
                  <p>- The submission should be 03-10 pages (excluding the cover).</p>
                  <p className='italic text-red-400'>
                    - No dialogue (Silent manga), the story should be told purely through visuals.
                  </p>
                  <p>
                    - The "Four-Leaf Clover Lantern" must appear in your submission. Contestants are free to creatively
                    design their own version of the lantern, or they can refer to and use the Organizers' provided image{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/file/d/1mxDR8G9zfIjb_96xD8cz6w-1TmPXVjNS/view?usp=drive_link'
                      target='_blank'>
                      HERE
                    </Link>
                  </p>

                  <p>- Colour is optional.</p>
                  <h4 className='font-medium mt-1'>D/ Note:</h4>
                  <p>- The entry must be told through visuals only (silent manga).</p>
                  <p>
                    - Each participant will have 03 Aura Points in Round 2. You can use these points to bring in up to
                    03 characters from other participants for cameos (01 character = 01 point). You may also use free
                    IPs provided by the organisers.
                  </p>
                  <p>
                    - Each IP used in your story will earn 01 bonus points for Round 2 (including free IPs). Max bonus
                    point is 09.
                  </p>
                  <p>
                    - You don’t need to participate in Round 1 to enter Round 2. However, to compete in the final round,
                    you must submit for Round 1.
                  </p>
                </>
              ) : (
                <>
                  <h3 className='text-red-500 font-semibold text-base'>Round 3: The Meaning of Pure Art</h3>
                  <h4 className='font-medium mt-1'>A/ Timeline:</h4>
                  <p>- From November 2nd to November 9th</p>
                  <h4 className='font-medium mt-1'>B/ Story:</h4>
                  <p>
                    - With the enemy weakened, a final strike is needed. This is the artist’s ultimate weapon. In this
                    round, reflect on the values and messages you conveyed in your story from Round 2.
                  </p>
                  <h4 className='font-medium mt-1'>C/ Submission Requirements:</h4>
                  <p>- Submit 01 A3 horizontal page</p>
                  <p>
                    The "Four-Leaf Clover Lantern" must appear in your submission. Contestants are free to creatively
                    design their own version of the lantern, or they can refer to and use the Organizers' provided image{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/file/d/1mxDR8G9zfIjb_96xD8cz6w-1TmPXVjNS/view?usp=drive_link'
                      target='_blank'>
                      HERE
                    </Link>
                  </p>

                  <p>- Colour is encouraged.</p>
                  <h4 className='font-medium mt-1'>D/ Note:</h4>
                  <p>
                    - You don’t need to participate in Round 2 to enter Round 3. However, to compete for the final
                    prizes, you must submit for Round 2.
                  </p>
                  <p>- Only those who participate in all 3 rounds will be eligible to compete for the grand prize.</p>
                </>
              )}
            </div>
          </div>
          <div className='mt-5'>
            <h2 className='font-bold text-lg'>5/ Contest Prizes</h2>
            <h4 className='font-medium mt-1'>A/ Round 1:</h4>
            <p>- 1st Best Character: $120 USD</p>
            <p>- 2nd Best Character: $80 USD</p>
            <p>- 3rd Best Character: $40 USD</p>
            <p>- Top 1 Vote on X: $40 USD</p>
            <p>- Top 1 Vote on Facebook Group: $40 USD</p>
            <h4 className='font-medium mt-1'>B/ Round 2:</h4>
            <p>- 1st Best Story Telling: $200 USD</p>
            <p>- 2nd Best Story Telling: $120 USD</p>
            <p>- 3rd Best Story Telling: $40 USD</p>
            <p>- Top 1 Vote on X (formerly Twitter): $80 USD</p>
            <p>- Top 1 Vote on Facebook Group: $80 USD</p>
            <h4 className='font-medium mt-1'>C/ Round 3:</h4>
            <p>- 1st Most Impressive Artwork: $120 USD</p>
            <p>- 2nd Most Impressive Artwork: $80 USD</p>
            <p>- 3rd Most Impressive Artwork: $40 USD</p>
            <p>- Top 1 Vote on X (formerly Twitter): $40 USD</p>
            <p>- Top 1 Vote on Facebook Group: $40 USD</p>
            <h4 className='font-medium mt-1'>D/ Most Collected IP Prizes:</h4>
            <p>- The Most Collected IP - Top 1: $120 USD</p>
            <p>- The Most Collected IP - Top 2: $80 USD</p>
            <p>- The Most Collected IP - Top 3: $40 USD</p>
            <h4 className='font-medium mt-1'>E/ Interaction & Community Contribution Prizes:</h4>
            <p>For 10 participants, each prize is $40 USD</p>
            <h4 className='font-medium mt-1'>F/ Final Prizes:</h4>
            <p>Note: Final prizes are only for participants who have completed all 3 rounds</p>
            <p>- 01 Masterpiece Award: $1,200 USD</p>
            <p>- 01 Excellence Award: $600 USD</p>
            <p>- 02 Artistic Merit Award: $400 USD each</p>
            <p>- 03 Best Emerging Artist: $120 USD each</p>
            <p>- 10 Consolation Prizes: $40 USD each</p>
            <h4 className='font-medium mt-1'>G/ Quest Campaign Prizes:</h4>
            <p>- 1 Top Leaderboard: $80 USD</p>
            <p>- 10 Lucky Angles: $40 USD</p>
          </div>
          <div className='mt-5'>
            <h2 className='font-bold text-lg'>6/ Other Benefits</h2>
            <p>
              - Outstanding works will be featured on major platforms and PunkgaMe's social media, giving participants a
              chance to promote their names and works to a global audience of art lovers.
            </p>
            <p>
              - Meet and network with industry experts: Contestants will have the opportunity to join exclusive
              workshops and Q&A sessions, expanding their network and gaining valuable insights.
            </p>
            <p>
              - Receive in-depth feedback from renowned artists: Contestants’ works will be reviewed and critiqued by
              professional artists, helping them improve skills and develop their unique style.
            </p>
            <p>
              - Featured in special edition publications: Exceptional works will be included in a limited edition
              PunkgaMe publication and exhibited at the post-contest event.
            </p>
            <p>
              - Opportunity to collaborate on major projects: PunkgaMe will scout talents to collaborate on large-scale
              projects, providing contestants with career development opportunities.
            </p>
            <p>
              - Special Highlight: The top 50 outstanding entries will be showcased in an exclusive art exhibition at
              VCCA - Vincom Center for Contemporary Art, Royal City, Hanoi.
            </p>
          </div>
          <div className='mt-5'>
            <h2 className='font-bold text-lg'>7/ Contest Rules</h2>
            <p>- PunkgaMe reserves the right to use submitted works for future promotional purposes.</p>
            <p>- Entries must comply with the basic community policies.</p>
            <p>
              - Contestants must ensure that their works are 100% original. In the event of any intellectual property
              infringement, the organisers will take appropriate action.
            </p>
            <p>- Prize winners are not allowed to transfer their prizes to any individual or organisation.</p>
            <p className='italic font-medium text-xs mt-5'>
              The announcement of winners and prize distribution details will be provided after the contest concludes.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className='text-2xl font-bold text-center'>CUỘC THI AVA GRAND CONTEST 2024</h1>
          <p className='text-center'>CHỦ ĐỀ: FIND YOUR ARTISTIC VOICE</p>

          <div className='mt-5'>
            <h2 className='font-bold text-lg'>1/ Thông điệp của Cuộc Thi</h2>
            <p>
              - Gửi đến bản thân tương lai và những người yêu nghệ thuật, hãy nỗ lực hoàn thiện bản thân mỗi ngày mà
              không phụ thuộc vào trí tuệ nhân tạo.
            </p>
          </div>

          <div className='mt-5'>
            <h2 className='font-bold text-lg'>2/ Đối tượng tham gia</h2>
            <p>- Họa sĩ truyện tranh và họa sĩ minh họa trên toàn Thế giới</p>
            <p>- Không giới hạn độ tuổi</p>
          </div>

          <div className='mt-5'>
            <h2 className='font-bold text-lg'>3/ Cách thức dự thi</h2>
            <p>
              - Bắt buộc: Nộp bài dự thi 2 bản bằng Tiếng Anh và Tiếng Việt tại{' '}
              <Link target='_blank' className='text-info-400' href='/events/ava-2024/map/submit-portal'>
                Website
              </Link>
            </p>
            <p>- Không bắt buộc:</p>
            <p className=''>
              + Nộp bài trên Group Facebook{' '}
              <Link target='_blank' className='text-info-400' href='https://www.facebook.com/groups/1245774482777852'>
                "PunkgaMe - Hội họa sĩ truyện tranh Việt Nam"
              </Link>
              kèm hashtag <span className='text-info-400'>#PunkgaMe #AVA2024 #AVARound1</span>
            </p>
            <p className=''>
              + Nộp bài trên X kèm hashtag <span className='text-info-400'>#PunkgaMe #AVA2024 #AVARound1</span>
            </p>
          </div>

          <div className='mt-5'>
            <h2 className='font-bold text-lg'>4/ Thời gian và thể lệ các vòng</h2>
            <div className='mt-4 flex gap-2 -skew-x-12'>
              <div className='h-9 w-3 rounded bg-white'></div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 1 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(1)}>
                <span className='skew-x-12'>Vòng 1</span>
              </div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 2 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(2)}>
                <span className='skew-x-12'>Vòng 2</span>
              </div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 3 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(3)}>
                <span className='skew-x-12'>Vòng 3</span>
              </div>
            </div>
            <div className='mt-4'>
              {round == 1 ? (
                <>
                  <h3 className='font-bold mt-4'>Vòng 1: Your Artistic Voice - Tiếng nói nghệ thuật của bạn</h3>
                  <h4 className='font-medium mt-1'>A/ Thời gian diễn ra:</h4>
                  <p>- Từ 12/10 - 18/10</p>
                  <h4 className='font-medium mt-1'>B/ Nội dung:</h4>
                  <p>
                    - Sau khi nhân vật bí ẩn tìm đến Thỏ Punka và Thỏ Min, họ cần thêm sự giúp đỡ để thành lập đội quân
                    nghệ sĩ chống lại trí tuệ nhân tạo xấu trong tương lai. Người đó chính là bạn.
                  </p>
                  <h4 className='font-medium mt-1'>C/ Yêu cầu bài dự thi:</h4>
                  <p>
                    - Bài thi mẫu, thí sinh tham khảo{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/drive/folders/1g9O2PBVOlLA6ZWnnxBb6KX1-bNMlXW-P?usp=drive_link'
                      target='_blank'>
                      TẠI ĐÂY
                    </Link>
                  </p>
                  <p>
                    - Template Vòng 1: Thí sinh vui lòng lấy{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/drive/folders/1JS-exiM9ENtKKTk7y1P0lkT6uF3SJYO0?usp=drive_link'
                      target='_blank'>
                      TẠI ĐÂY
                    </Link>
                  </p>
                  <p>
                    - Nộp 01 trang A4 theo Template của BTC, giới thiệu nhân vật full body góc chính diện hoặc 3/4 và 01
                    avatar nhân vật đó theo tỷ lệ 1:1 (1500x1500px) để tạo IP độc quyền trong IP room.
                  </p>
                  <p>
                    - Ở bài dự thi trang A4, ghi chú thêm một vài thông tin: tên, nghề nghiệp, quan điểm sáng tạo nghệ
                    thuật và phong cách nghệ thuật của nhân vật.
                  </p>
                  <p>- Tác phẩm bắt buộc có màu.</p>
                  <p>- Bắt buộc nộp 02 bản ENG và VIE.</p>
                  <p>- Sử dụng font tùy thích (số lượng chữ và kích thước cần dễ đọc).</p>
                  <h4 className='font-medium mt-1'>D/ Lưu ý:</h4>
                  <p>
                    - Avatar của bạn trong Vòng 1 sẽ được lưu trữ tại IP room, khi click vào Avatar bạn cũng có thể xem
                    được bài dự thi full Vòng 1 của mình.
                  </p>
                </>
              ) : round == 2 ? (
                <>
                  <h3 className='font-bold mt-4'>Vòng 2: The Art of Storytelling - Nghệ thuật kể chuyện</h3>
                  <h4 className='font-medium mt-1'>A/ Thời gian diễn ra:</h4>
                  <p>- Từ 19/10 - 01/11</p>
                  <h4 className='font-medium mt-1'>B/ Nội dung:</h4>
                  <p>
                    - Hãy chia sẻ về câu chuyện sáng tạo nghệ thuật hoặc những trải nghiệm của bạn trong quá trình sáng
                    tạo nghệ thuật. Câu chuyện nên có sự trọn vẹn và truyền tải thông điệp mang tinh thần tích cực, thể
                    hiện được quan điểm của cá nhân bạn về giá trị thuần túy mà nghệ thuật đem lại cho cuộc sống. Đây
                    chính là chìa khóa để tạo ra những vũ khí mạnh mẽ.
                  </p>
                  <h4 className='font-medium mt-1'>C/ Yêu cầu bài dự thi:</h4>
                  <p>- Bài dự thi từ 3-10 trang (không tính trang bìa).</p>
                  <p>- Bài thi không có thoại (Silent manga) và chỉ được sử dụng hình ảnh để kể câu chuyện của mình.</p>
                  <p>
                    - Trong bài thi, bắt buộc phải có sự xuất hiện của "Lồng đèn cỏ 4 lá". Thí sinh có thể thỏa sức sáng
                    tạo và thiết kế hình ảnh lồng đèn theo phong cách riêng của mình, hoặc có thể tham khảo và sử dụng
                    hình ảnh mẫu của Ban Tổ Chức{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/file/d/1mxDR8G9zfIjb_96xD8cz6w-1TmPXVjNS/view?usp=drive_link'
                      target='_blank'>
                      TẠI ĐÂY
                    </Link>
                  </p>
                  <p>- Kích thước khổ A4, tối đa 1 trang đôi.</p>
                  <p>- Không nhất thiết có màu.</p>
                  <h4 className='font-medium mt-1'>D/ Lưu ý:</h4>
                  <p>- Bài thi không có thoại và chỉ được sử dụng hình ảnh để kể câu chuyện của mình.</p>
                  <p>
                    - Mỗi thí sinh tham gia vòng 2 sẽ có luôn 03 Aura Point, bạn có thể dùng Aura Point đổi lấy nhân vật
                    của thí sinh khác để cameo, mỗi nhân vật tương ứng 01 Aura Point. Vậy tối đa mỗi thí sinh được đổi
                    lấy 03 nhân vật khác trong IP room để dùng cho bài dự thi của mình. Bên cạnh đó trong IP Room cũng
                    có một vài IP miễn phí khác đến từ BTC và các đơn vị đồng hành, bạn đều có thể sử dụng chúng một
                    cách miễn phí. Điểm tối đa là 09 điểm.
                  </p>
                  <p>
                    - Mỗi IP xuất hiện trong truyện của bạn tại vòng 2 đều sẽ được tính thêm 1 điểm cộng vào tổng điểm
                    Vòng 2 (bao gồm cả các IP miễn phí).
                  </p>
                  <p>
                    - Bạn không cần tham gia Vòng 1 để được tham gia Vòng 2. Tuy nhiên để có cơ hội tham gia tranh giải
                    chung cuộc, bạn buộc phải nộp bài Vòng 1.
                  </p>
                </>
              ) : (
                <>
                  <h3 className='font-bold mt-4'>Vòng 3: The meaning of Pure Art - Ý nghĩa của nghệ thuật thuần túy</h3>
                  <h4 className='font-medium mt-1'>A/ Thời gian diễn ra:</h4>
                  <p>- Từ ngày 02/11 - 09/11</p>
                  <h4 className='font-medium mt-1'>B/ Nội dung:</h4>
                  <p>
                    - Khi kẻ địch đã suy yếu, một đòn dứt điểm là cần thiết. Đây chính là vũ khí mạnh nhất của những
                    nghệ sĩ. Ở vòng này, hãy đúc kết những giá trị và thông điệp bạn muốn truyền tải xuyên suốt câu
                    chuyện bạn đã kể ở vòng 2.
                  </p>
                  <h4 className='font-medium mt-1'>C/ Yêu cầu bài dự thi:</h4>
                  <p>- Bài dự thi chỉ nộp 01 trang kích thước khổ A3 ngang.</p>
                  <p>
                    - Trong bài thi, bắt buộc phải có sự xuất hiện của "Lồng đèn cỏ 4 lá". Thí sinh có thể thỏa sức sáng
                    tạo và thiết kế hình ảnh lồng đèn theo phong cách riêng của mình, hoặc có thể tham khảo và sử dụng
                    hình ảnh mẫu của Ban Tổ Chức{' '}
                    <Link
                      className='text-info-500'
                      href='https://drive.google.com/file/d/1mxDR8G9zfIjb_96xD8cz6w-1TmPXVjNS/view?usp=drive_link'
                      target='_blank'>
                      TẠI ĐÂY
                    </Link>
                    .
                  </p>
                  <p>- Khuyến khích có màu.</p>
                  <h4 className='font-medium mt-1'>D/ Lưu ý:</h4>
                  <p>
                    - Bạn không cần tham gia Vòng 2 để được tham gia Vòng 3. Tuy nhiên, để có cơ hội tham gia tranh giải
                    chung cuộc, bạn buộc phải nộp bài Vòng 2.
                  </p>
                  <p>- Những thí sinh tham gia đủ 3 Vòng sẽ dành được cơ hội tranh giải chung cuộc.</p>
                </>
              )}
            </div>
          </div>

          <div className='mt-5'>
            <h2 className='font-bold text-lg'>5/ Giải thưởng cuộc thi</h2>
            <h4 className='font-medium mt-1'>A/ Vòng 1:</h4>
            <p>- Giải Nhất Nhân vật xuất sắc nhất: 3.000.000 VNĐ</p>
            <p>- Giải Nhì Nhân vật xuất sắc nhất: 2.000.000 VNĐ</p>
            <p>- Giải Ba Nhân vật xuất sắc nhất: 1.000.000 VNĐ</p>
            <p>- Top 1 lượt bình chọn trên X: 1.000.000 VNĐ</p>
            <p>- Top 1 lượt bình chọn trên Group Facebook: 1.000.000 VNĐ</p>

            <h4 className='font-medium mt-1'>B/ Vòng 2:</h4>
            <p>- Giải Nhất Câu chuyện kể xuất sắc nhất: 5.000.000 VNĐ</p>
            <p>- Giải Nhì Câu chuyện kể xuất sắc nhất: 3.000.000 VNĐ</p>
            <p>- Giải Ba Câu chuyện kể xuất sắc nhất: 1.000.000 VNĐ</p>
            <p>- Top 1 lượt bình chọn trên X: 2.000.000 VNĐ</p>
            <p>- Top 1 lượt bình chọn trên Group Facebook: 2.000.000 VNĐ</p>

            <h4 className='font-medium mt-1'>C/ Vòng 3:</h4>
            <p>- Giải Nhất Artwork ấn tượng: 3.000.000 VNĐ</p>
            <p>- Giải Nhì Artwork ấn tượng: 2.000.000 VNĐ</p>
            <p>- Giải Ba Artwork ấn tượng: 1.000.000 VNĐ</p>
            <p>- Top 1 bình chọn trên X: 1.000.000 VNĐ</p>
            <p>- Top 1 bình chọn trên Group Facebook: 1.000.000 VNĐ</p>

            <h4 className='font-medium mt-1'>D/ Giải Most Collected IP:</h4>
            <p>- Top 1 IP được sử dụng nhiều nhất: 3.000.000 VNĐ</p>
            <p>- Top 2 IP được sử dụng nhiều nhất: 2.000.000 VNĐ</p>
            <p>- Top 3 IP được sử dụng nhiều nhất: 1.000.000 VNĐ</p>

            <h4 className='font-medium mt-1'>E/ Giải tương tác, đóng góp cho cộng đồng:</h4>
            <p>- Dành cho 10 bạn, mỗi giải 1.000.000 VNĐ</p>

            <h4 className='font-medium mt-1'>F/ Giải thưởng chung cuộc:</h4>
            <p>- Lưu ý: Giải thưởng chung cuộc chỉ dành cho những bạn đã tham gia cả 3 Vòng thi.</p>
            <p>- 01 Giải Đặc Biệt: 30.000.000 VNĐ</p>
            <p>- 01 Giải Nhất: 15.000.000 VNĐ</p>
            <p>- 02 Giải Nhì: 10.000.000 VNĐ / giải</p>
            <p>- 03 Giải Ba: 3.000.000 VNĐ / giải</p>
            <p>- 10 Giải Khuyến Khích: 1.000.000 VNĐ / giải</p>
            <h4 className='font-medium mt-1'>G/ Quest Campaign Award:</h4>
            <p>- 1 Giải Top Leaderboard: 2.000.000 VNĐ</p>
            <p>10 giải may mắn: 1.000.000 VNĐ/ giải</p>
          </div>

          <div className='mt-5'>
            <h2 className='font-bold text-lg'>6/ Quyền lợi khác</h2>
            <p>
              - Các tác phẩm xuất sắc sẽ được giới thiệu trên các nền tảng lớn và mạng xã hội của PunkgaMe, giúp thí
              sinh quảng bá tên tuổi và tác phẩm của mình đến đông đảo khán giả nghệ thuật trên toàn thế giới.
            </p>
            <p>
              - Gặp gỡ và giao lưu với các chuyên gia: Thí sinh sẽ có cơ hội tham gia các buổi Workshop và Q&A độc
              quyền, giúp mở rộng mạng lưới và học hỏi thêm kinh nghiệm.
            </p>
            <p>
              - Nhận tư vấn chuyên sâu từ các họa sĩ nổi tiếng: tác phẩm của thí sinh sẽ được các họa sĩ chuyên nghiệp
              đánh giá và đưa ra nhận xét, giúp thí sinh cải thiện kĩ năng và phát triển phong cách riêng.
            </p>
            <p>
              - Tác phẩm xuất hiện trong ấn phẩm đặc biệt: Những tác phẩm xuất sắc sẽ được xuất hiện trong ấn phẩm phiên
              bản giới hạn của PunkgaMe và được triển lãm tại sự kiện sau Cuộc thi.
            </p>
            <p>
              - Cơ hội làm việc cùng các dự án lớn: PunkgaMe sẽ tìm kiếm tài năng để hợp tác trong các dự án lớn, giúp
              thí sinh có cơ hội phát triển sự nghiệp.
            </p>
            <p>
              - Đặc biệt: Top 50 bài thi xuất sắc nhất sẽ được trưng bày trong một buổi triển lãm nghệ thuật độc đáo tại
              VCCA - Trung tâm Nghệ thuật Đương Đại Vincom, Royal City, Hà Nội.
            </p>
          </div>

          <div className='mt-5'>
            <h2 className='font-bold text-lg'>7/ Quy định cuộc thi</h2>
            <p>- PunkgaMe được phép sử dụng hình ảnh sản phẩm cho các mục đích quảng bá trong tương lai.</p>
            <p>- Tác phẩm không vi phạm chính sách cơ bản của cộng đồng.</p>
            <p>
              - Thí sinh cam kết 100% tác phẩm của mình. Trong trường hợp phát hiện bất kì dấu hiệu xâm phạm quyền sở
              hữu trí tuệ của người khác, BTC sẽ xem xét xử lý.
            </p>
            <p>- Người đoạt giải không được chuyển nhượng giải thưởng cho bất kì cá nhân hay tổ chức nào khác.</p>
          </div>

          <p className='mt-5'>Thời gian công bố và cách thức nhận giải sẽ được thông báo sau khi Cuộc thi kết thúc.</p>
        </div>
      )}
    </div>
  )
}
