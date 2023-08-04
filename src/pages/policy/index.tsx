import HeadComponent from 'components/Head'
import Header from 'components/Header'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export default function Policy() {
  const { locale } = useRouter()
  if (locale == 'vn') {
    return (
      <>
        <HeadComponent title='Policy | Punkga.me' />
        <Header />
        <div className='pk-container py-5 px-3 md:px-0 text-sm [&_p]:mb-2 [&>h1]:font-bold [&>h1]:text-4xl [&>h1]:mb-3 [&>h1]:mt-7 [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mb-3 [&>h2]:mt-5 [&>ul]:pl-6 [&>ul]:list-disc [&>ul>*]:mb-2'>
          <h1>Chính sách Bảo mật</h1>
          <p>Cập nhật lần cuối: 06 tháng 4 năm 2023</p>
          <p>
            Chính sách Bảo mật này mô tả các chính sách và quy trình của chúng tôi về việc thu thập, sử dụng và tiết lộ
            thông tin của bạn khi bạn sử dụng dịch vụ và cung cấp thông tin về quyền riêng tư của bạn và cách luật pháp
            bảo vệ bạn.
          </p>
          <p>
            Chúng tôi sử dụng dữ liệu cá nhân của bạn để cung cấp và cải thiện dịch vụ. Bằng cách sử dụng dịch vụ, bạn
            đồng ý với việc thu thập và sử dụng thông tin theo chính sách bảo mật này.
          </p>
          <div className='w-full h-[1px] bg-slate-400 my-6'></div>
          <h1>Giải thích và Định nghĩa</h1>
          <h2>1. Giải thích</h2>
          <p>
            Các từ bắt đầu bằng chữ cái đầu tiên in hoa có nghĩa được xác định trong các điều kiện sau đây. Các định
            nghĩa sau đây sẽ có cùng ý nghĩa dù chúng xuất hiện ở số ít hay số nhiều.
          </p>
          <h2>2. Định nghĩa</h2>
          <ul>
            <p>Với mục đích trong Chính sách Bảo mật này:</p>
            <li>
              <strong>Tài khoản</strong> có nghĩa là một tài khoản duy nhất được tạo ra cho bạn để truy cập dịch vụ của
              chúng tôi hoặc một phần của dịch vụ của chúng tôi.
            </li>
            <li>
              <strong>Công ty liên kết</strong> có nghĩa là một thực thể điều khiển, được điều khiển bởi hoặc cùng được
              điều khiển với một bên, trong đó "điều khiển" có nghĩa là sở hữu 50% hoặc nhiều hơn cổ phần, quyền sở hữu
              vốn hoặc chứng khoán khác có quyền bỏ phiếu để bầu cử các giám đốc hoặc các cơ quan quản lý khác.
            </li>
            <li>
              <strong>Công ty</strong> (được gọi là "Công ty", "Chúng tôi", "Chúng ta" hoặc "Của chúng tôi" trong Thỏa
              thuận này) đề cập đến AURA Network, Hà Nội.
            </li>
            <li>
              <strong>Cookies</strong> là các tệp nhỏ được đặt trên máy tính, thiết bị di động hoặc bất kỳ thiết bị nào
              khác của bạn bởi một trang web, chứa chi tiết lịch sử duyệt web của bạn trên trang web đó trong số nhiều
              ứng dụng khác.
            </li>
            <li>
              <strong>Quốc gia</strong> đề cập đến: Việt Nam
            </li>
            <li>
              <strong>Thiết bị</strong> có nghĩa là bất kỳ thiết bị nào có thể truy cập dịch vụ như máy tính, điện thoại
              di động hoặc máy tính bảng số.
            </li>
            <li>
              <strong>Dữ liệu cá nhân</strong> là bất kỳ thông tin nào liên quan đến cá nhân đã xác định hoặc có thể xác
              định.
            </li>
            <li>
              <strong>Dịch vụ</strong> đề cập đến trang web.
            </li>
            <li>
              <strong>Nhà cung cấp dịch vụ</strong> có nghĩa là bất kỳ cá nhân hoặc tổ chức pháp nhân nào xử lý dữ liệu
              thay mặt cho Công ty. Đó là các công ty hoặc cá nhân bên thứ ba được Công ty thuê để hỗ trợ Dịch vụ, cung
              cấp Dịch vụ thay mặt cho Công ty, thực hiện các dịch vụ liên quan đến Dịch vụ hoặc hỗ trợ Công ty trong
              việc phân tích cách Dịch vụ được sử dụng.
            </li>
            <li>
              <strong>Dịch vụ truyền thông xã hội bên thứ ba</strong> đề cập đến bất kỳ trang web hoặc trang web mạng xã
              hội nào thông qua đó Người dùng có thể đăng nhập hoặc tạo tài khoản để sử dụng Dịch vụ.
            </li>
            <li>
              <strong>Dữ liệu sử dụng</strong> đề cập đến dữ liệu được thu thập tự động, được tạo ra bằng cách sử dụng
              Dịch vụ hoặc từ cơ sở hạ tầng Dịch vụ chính mình (ví dụ: thời gian thăm một trang).
            </li>
            <li>
              <strong>Trang web</strong> đề cập đến Punkga, có thể truy cập từ punkga.me
            </li>
            <li>
              <strong>Bạn</strong> có nghĩa là cá nhân truy cập hoặc sử dụng Dịch vụ, hoặc công ty, hoặc tổ chức pháp
              nhân khác thay mặt cho cá nhân đó truy cập hoặc sử dụng Dịch vụ, nếu có thể.
            </li>
          </ul>
          <h1>Thu thập và Sử dụng Dữ liệu Cá nhân của Bạn</h1>
          <h2>1. Loại Dữ liệu Đã Thu thập</h2>
          <h2>1.1 Dữ liệu Cá nhân</h2>
          <p>
            Trong quá trình sử dụng Dịch vụ của chúng tôi, chúng tôi có thể yêu cầu Bạn cung cấp cho chúng tôi một số
            thông tin xác định được cá nhân có thể được sử dụng để liên hệ hoặc xác định Bạn. Thông tin xác định được cá
            nhân có thể bao gồm, nhưng không giới hạn:
          </p>
          <ul>
            <li>Địa chỉ email</li>
            <li>Tên và họ</li>
            <li>Số điện thoại</li>
            <li>Dữ liệu sử dụng</li>
          </ul>
          <h2>1.2 Dữ liệu Sử dụng</h2>
          <p>Dữ liệu sử dụng được tự động thu thập khi sử dụng Dịch vụ.</p>
          <p>
            Dữ liệu sử dụng có thể bao gồm thông tin như địa chỉ Giao thức Internet của Thiết bị của Bạn (ví dụ: địa chỉ
            IP), loại trình duyệt, phiên bản trình duyệt, các trang của Dịch vụ của chúng tôi mà Bạn truy cập, thời gian
            và ngày truy cập của Bạn, thời gian dành cho những trang đó, định danh thiết bị duy nhất và dữ liệu chẩn
            đoán khác.
          </p>
          <p>
            Khi Bạn truy cập Dịch vụ bằng hoặc thông qua thiết bị di động, chúng tôi có thể thu thập một số thông tin cụ
            thể, bao gồm, nhưng không giới hạn, loại thiết bị di động Bạn sử dụng, ID duy nhất của thiết bị di động Bạn,
            địa chỉ IP của thiết bị di động Bạn, hệ điều hành di động của Bạn, loại trình duyệt Internet di động Bạn sử
            dụng, định danh thiết bị duy nhất và dữ liệu chẩn đoán khác.
          </p>
          <p>
            Chúng tôi cũng có thể thu thập thông tin mà trình duyệt của Bạn gửi khi Bạn truy cập Dịch vụ hoặc khi Bạn
            truy cập Dịch vụ bằng hoặc thông qua thiết bị di động.
          </p>
          <h2>1.3 Thông tin từ Các Dịch vụ Truyền thông Xã hội Bên thứ ba</h2>
          <p>
            Công ty cho phép Bạn tạo tài khoản và đăng nhập để sử dụng Dịch vụ thông qua các Dịch vụ Truyền thông Xã hội
            Bên thứ ba sau đây:
          </p>
          <ul>
            <li>Google</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
          <p>
            Nếu Bạn quyết định đăng ký thông qua hoặc cấp quyền truy cập cho chúng tôi vào một Dịch vụ Truyền thông Xã
            hội Bên thứ ba, chúng tôi có thể thu thập Dữ liệu cá nhân đã liên kết với tài khoản Dịch vụ Truyền thông Xã
            hội Bên thứ ba của Bạn, như tên của Bạn, địa chỉ email của Bạn, các hoạt động của Bạn hoặc danh sách liên
            lạc của Bạn liên quan đến tài khoản đó.
          </p>
          <p>
            Bạn cũng có thể có khả năng chia sẻ thông tin bổ sung với Công ty thông qua tài khoản Dịch vụ Truyền thông
            Xã hội Bên thứ ba của Bạn. Nếu Bạn chọn cung cấp thông tin và Dữ liệu cá nhân như vậy, trong quá trình đăng
            ký hoặc thông qua cách khác, Bạn đang cho phép Công ty sử dụng, chia sẻ và lưu trữ thông tin đó theo cách
            nhất qu án với Chính sách Bảo mật này.
          </p>
          <h2>1.4 Công nghệ Theo dõi và Cookie</h2>
          <p>
            Chúng tôi sử dụng Cookie và các công nghệ theo dõi tương tự để theo dõi hoạt động trên Dịch vụ của chúng tôi
            và lưu trữ một số thông tin. Các công nghệ theo dõi được sử dụng là đèn báo, thẻ và mã lệnh để thu thập và
            theo dõi thông tin và cải thiện và phân tích Dịch vụ của chúng tôi. Các công nghệ mà chúng tôi sử dụng có
            thể bao gồm:
          </p>
          <ul>
            <li>
              <strong>Cookie hoặc Cookie Trình duyệt. </strong>Cookie là một tệp nhỏ được đặt trên Thiết bị của Bạn. Bạn
              có thể chỉ thị trình duyệt của mình từ chối tất cả Cookie hoặc cho biết khi một Cookie đang được gửi. Tuy
              nhiên, nếu Bạn không chấp nhận Cookie, Bạn có thể không thể sử dụng một số phần của Dịch vụ của chúng tôi.
              Trừ khi Bạn đã điều chỉnh cài đặt trình duyệt của Bạn để từ chối Cookie, Dịch vụ của chúng tôi có thể sử
              dụng Cookie.
            </li>
            <li>
              <strong>Đèn báo Web. </strong>Một số phần của Dịch vụ của chúng tôi và email của chúng tôi có thể chứa các
              tệp điện tử nhỏ được biết đến với tên đèn báo web (còn được gọi là hình ảnh rõ ràng, thẻ pixel và hình ảnh
              pixel đơn) cho phép Công ty, ví dụ, đếm người dùng đã truy cập các trang đó hoặc mở email và cho các thống
              kê trang web liên quan khác (ví dụ: ghi lại sự phổ biến của một số phần và xác minh tính toàn vẹn của hệ
              thống và máy chủ).
            </li>
          </ul>
          <p>
            Cookie có thể là "Cookie Lưu trữ" hoặc "Cookie Phiên". Cookie Lưu trữ tồn tại trên máy tính cá nhân hoặc
            thiết bị di động của Bạn khi Bạn ngoại tuyến, trong khi Cookie Phiên bị xóa ngay khi Bạn đóng trình duyệt
            web của mình. Tìm hiểu thêm về cookie trên trang web Bài viết Chính sách Bảo mật Miễn phí.
          </p>
          <p>Chúng tôi sử dụng cả Cookie Phiên và Cookie Lưu trữ cho các mục đích được nêu dưới đây:</p>
          <ul>
            <li>
              <p className='font-bold'>Cookie Cần thiết / Cần thiết</p>
              <p>Loại: Cookie Phiên</p>
              <p>Quản lý bởi: Chúng tôi</p>
              <p>
                Mục đích: Cookie này là cần thiết để cung cấp cho Bạn các dịch vụ có sẵn thông qua Trang web và để cho
                phép Bạn sử dụng một số tính năng của nó. Chúng hỗ trợ xác thực người dùng và ngăn chặn việc sử dụng
                gian lận của tài khoản người dùng. Mà không có Cookie này, những dịch vụ mà Bạn đã yêu cầu không thể
                được cung cấp và chúng tôi chỉ sử dụng Cookie này để cung cấp cho Bạn những dịch vụ đó.
              </p>
            </li>
            <li>
              <p className='font-bold'>Chính sách Cookie / Chấp nhận Cookie Thông báo</p>
              <p>Loại: Cookie Lưu trữ</p>
              <p>Quản lý bởi: Chúng tôi</p>
              <p>
                Mục đích: Cookie này xác định xem người dùng đã chấp nhận việc sử dụng cookie trên Trang web hay chưa.
              </p>
            </li>
            <li>
              <p className='font-bold'>Cookie Chức năng</p>
              <p>Loại: Cookie Lưu trữ</p>
              <p>Quản lý bởi: Chúng tôi</p>
              <p>
                Mục đích: Cookie này cho phép chúng tôi nhớ các lựa chọn Bạn thực hiện khi sử dụng Trang web, chẳng hạn
                như nhớ chi tiết đăng nhập hoặc ngôn ngữ ưa thích của Bạn. Mục đích của Cookie này là cung cấp cho Bạn
                trải nghiệm cá nhân hơn và tránh việc Bạn phải nhập lại các lựa chọn của Bạn mỗi khi Bạn sử dụng Trang
                web.
              </p>
            </li>
          </ul>
          <p>
            Đối với thông tin chi tiết về các cookie chúng tôi sử dụng và các lựa chọn của Bạn liên quan đến cookie, vui
            lòng truy cập Chính sách Cookie của chúng tôi hoặc phần Cookie trong Chính sách Bảo mật của chúng tôi.
          </p>
          <h2>2. Sử dụng Dữ liệu Cá nhân của Bạn</h2>
          <p>Công ty có thể sử dụng Dữ liệu Cá nhân cho các mục đích sau:</p>
          <ul>
            <li>
              <strong>Để cung cấp và duy trì Dịch vụ</strong>, bao gồm giải quyết vấn đề kỹ thuật và hỗ trợ người dùng,
              để ngăn chặn gian lận và cải thiện tính bảo mật Dịch vụ của chúng tôi. Dịch:
            </li>
            <li>
              <strong>Quản lý Tài khoản của bạn:</strong> để quản lý việc đăng ký của bạn là người dùng dịch vụ. Các Dữ
              liệu Cá nhân mà bạn cung cấp có thể cung cấp cho bạn quyền truy cập vào các chức năng khác nhau của dịch
              vụ mà có sẵn cho bạn như một người dùng đã đăng ký.
            </li>
            <li>
              <strong>Thực hiện hợp đồng:</strong> việc phát triển, tuân thủ và thực hiện hợp đồng mua bán các sản phẩm,
              hàng hóa hoặc dịch vụ mà bạn đã mua hoặc bất kỳ hợp đồng khác với chúng tôi thông qua dịch vụ.
            </li>
            <li>
              <strong>Liên hệ với bạn:</strong> Liên hệ với bạn qua email, cuộc gọi điện thoại, tin nhắn SMS hoặc các
              hình thức giao tiếp điện tử tương tự khác, chẳng hạn như thông báo đẩy của ứng dụng di động về cập nhật
              hoặc các thông tin liên quan đến chức năng, sản phẩm hoặc dịch vụ đã ký hợp đồng, bao gồm các cập nhật về
              bảo mật khi cần thiết hoặc hợp lý để triển khai chúng.
            </li>
            <li>
              <strong>Cung cấp cho bạn:</strong> tin tức, ưu đãi đặc biệt và thông tin chung về hàng hóa, dịch vụ và sự
              kiện khác mà chúng tôi cung cấp và tương tự những gì bạn đã mua hoặc hỏi về trừ khi bạn đã chọn không nhận
              thông tin đó.
            </li>
            <li>
              <strong>Quản lý các yêu cầu của bạn:</strong> Tiếp nhận và quản lý các yêu cầu của bạn đối với chúng tôi.
            </li>
            <li>
              <strong>Cho giao dịch kinh doanh:</strong> Chúng tôi có thể sử dụng thông tin của bạn để đánh giá hoặc
              thực hiện việc sáp nhập, thoái vốn, cơ cấu lại, giải thể hoặc giao dịch mua bán khác của một phần hoặc
              toàn bộ tài sản của chúng tôi, cho dù như một công ty đang hoạt động hay là một phần của quá trình phá
              sản, thanh lý hoặc các thủ tục tương tự, trong đó Dữ liệu Cá nhân mà chúng tôi giữ về người dùng dịch vụ
              của chúng tôi là một trong những tài sản được chuyển nhượng.
            </li>
            <li>
              <strong>Và cho các mục đích khác:</strong> Chúng tôi có thể sử dụng thông tin của bạn cho các mục đích
              khác như phân tích dữ liệu, xác định xu hướng sử dụng, xác định hiệu quả của các chiến dịch quảng cáo của
              chúng tôi và để đánh giá và cải thiện Dịch vụ, sản phẩm, dịch vụ, marketing và trải nghiệm của bạn.
            </li>
          </ul>
          <p>Chúng tôi có thể chia sẻ thông tin cá nhân của bạn trong các tình huống sau:</p>
          <ul>
            <li>
              <strong>Với các nhà cung cấp dịch vụ:</strong> Chúng tôi có thể chia sẻ thông tin cá nhân của bạn với các
              nhà cung cấp dịch vụ để theo dõi và phân tích việc sử dụng dịch vụ của chúng tôi và để liên hệ với bạn.
            </li>
            <li>
              <strong>Cho giao dịch kinh doanh:</strong> Chúng tôi có thể chia sẻ hoặc chuyển thông tin cá nhân của bạn
              liên quan đến việc hợp nhất, bán tài sản của Công ty, tài trợ hoặc mua lại toàn bộ hoặc một phần của doanh
              nghiệp chúng tôi cho một công ty khác.
            </li>
            <li>
              <strong>Với các công ty liên kết:</strong> Chúng tôi có thể chia sẻ thông tin của bạn với các công ty liên
              kết của chúng tôi, trong trường hợp đó, chúng tôi sẽ yêu cầu các công ty liên kết này tuân thủ Chính sách
              bảo mật này. Các công ty liên kết bao gồm công ty mẹ của chúng tôi và bất kỳ công ty con, đối tác liên
              doanh hoặc công ty khác mà chúng tôi kiểm soát hoặc được kiểm soát chung với chúng tôi.
            </li>
            <li>
              <strong>Với các đối tác kinh doanh:</strong> Chúng tôi có thể chia sẻ thông tin của bạn với các đối tác
              kinh doanh của chúng tôi để cung cấp cho bạn một số sản phẩm, dịch vụ hoặc khuyến mãi cụ thể.
            </li>
            <li>
              <strong>Với các người dùng khác:</strong> khi bạn chia sẻ thông tin cá nhân hoặc tương tác với người dùng
              khác trong các khu vực công cộng, thông tin đó có thể được tất cả các người dùng xem và được phân ph ối
              công khai bên ngoài. Nếu bạn tương tác với người dùng khác hoặc đăng ký thông qua Dịch vụ Mạng Xã hội của
              Bên thứ ba, danh bạ của bạn trên Dịch vụ Mạng Xã hội của Bên thứ ba có thể nhìn thấy tên, hồ sơ, hình ảnh
              và mô tả hoạt động của bạn. Tương tự, người dùng khác sẽ có thể xem các mô tả hoạt động của bạn, giao tiếp
              với bạn và xem hồ sơ của bạn.
            </li>
            <li>
              <strong>Với sự đồng ý của bạn:</strong> Chúng tôi có thể tiết lộ thông tin cá nhân của bạn cho mục đích
              khác với sự đồng ý của bạn.
            </li>
          </ul>
          <h2>2.1 Lưu giữ Dữ liệu Cá nhân của bạn</h2>
          <p>
            Công ty sẽ chỉ lưu giữ Dữ liệu Cá nhân của bạn trong thời gian cần thiết cho các mục đích được nêu trong
            Chính sách Bảo mật này. Chúng tôi sẽ lưu giữ và sử dụng Dữ liệu Cá nhân của bạn trong mức cần thiết để tuân
            thủ các nghĩa vụ pháp lý của chúng tôi (ví dụ, nếu chúng tôi bắt buộc phải lưu giữ dữ liệu của bạn để tuân
            thủ các luật pháp áp dụng), giải quyết tranh chấp và thi hành các hợp đồng và chính sách pháp lý của chúng
            tôi.
          </p>
          <p>
            Công ty cũng sẽ lưu giữ Dữ liệu Vận hành cho mục đích phân tích nội bộ. Thông tin Vận hành thường được lưu
            giữ trong một khoảng thời gian ngắn, trừ khi dữ liệu này được sử dụng để củng cố tính bảo mật hoặc cải thiện
            tính năng của Dịch vụ của chúng tôi, hoặc chúng tôi phải tuân thủ các yêu cầu pháp lý để lưu giữ dữ liệu này
            trong khoảng thời gian dài hơn.
          </p>
          <h2>2.2 Chuyển Giao Dữ liệu Cá nhân của bạn</h2>
          <p>
            Thông tin của bạn, bao gồm Dữ liệu Cá nhân, được xử lý tại các văn phòng hoạt động của Công ty và tại bất kỳ
            nơi nào khác mà các bên tham gia vào quá trình xử lý đang đặt. Điều này có nghĩa là thông tin này có thể
            được chuyển đến - và duy trì trên - máy tính nằm ngoài tiểu bang, tỉnh, quốc gia hoặc khu vực quản lý khác
            nơi luật bảo vệ dữ liệu có thể khác so với những luật bảo vệ dữ liệu từ khu vực của bạn.
          </p>
          <p>
            Sự đồng ý của bạn đối với Chính sách Bảo mật này được thể hiện qua việc bạn gửi thông tin như vậy cho chúng
            tôi.
          </p>
          <p>
            Công ty sẽ thực hiện tất cả các biện pháp cần thiết một cách hợp lý để đảm bảo rằng dữ liệu của bạn được xử
            lý một cách an toàn và phù hợp với Chính sách Bảo mật này và không có việc chuyển Giao Dữ liệu Cá nhân của
            bạn sẽ xảy ra cho một tổ chức hoặc quốc gia mà không có các biện pháp kiểm soát đủ bao gồm an ninh dữ liệu
            của bạn và thông tin cá nhân khác.
          </p>
          <h2>2.3 Xóa Dữ liệu Cá nhân của bạn</h2>
          <p>Bạn có quyền xóa hoặc yêu cầu chúng tôi hỗ trợ xóa Dữ liệu Cá nhân mà chúng tôi đã thu thập về bạn.</p>
          <p>
            {' '}
            Dịch vụ của chúng tôi có thể cung cấp cho bạn khả năng xóa một số thông tin về bạn từ bên trong Dịch vụ.
          </p>
          <p>
            Bạn có thể cập nhật, điều chỉnh hoặc xóa thông tin của bạn bất cứ lúc nào bằng cách đăng nhập vào Tài khoản
            của bạn, nếu bạn có một, và truy cập vào phần cài đặt tài khoản cho phép bạn quản lý thông tin cá nhân của
            bạn. Bạn cũng có thể liên hệ với chúng tôi để yêu cầu truy cập, sửa đổi hoặc xóa bất kỳ thông tin cá nhân
            nào mà bạn đã cung cấp cho chúng tôi.
          </p>
          <p>
            Xin lưu ý, tuy nhiên, chúng tôi có thể cần lưu giữ một số thông tin khi chúng tôi có nghĩa vụ pháp lý hoặc
            cơ sở hợp pháp để làm như vậy.
          </p>
          <h2>3. Các giao dịch kinh doanh</h2>
          <p>
            Nếu Công ty liên quan đến việc hợp nhất, mua lại hoặc bán tài sản, Dữ liệu Cá nhân của bạn có thể được chuy
            ển giao. Chúng tôi sẽ thông báo trước khi Dữ liệu Cá nhân của bạn được chuyển giao và trở thành đối tượng
            của một Chính sách Bảo mật khác.
          </p>
          <h2>4. Thực thi pháp luật</h2>
          <p>
            Trong một số trường hợp, Công ty có thể bắt buộc phải tiết lộ Dữ liệu Cá nhân của bạn nếu yêu cầu làm như
            vậy bởi luật pháp hoặc theo yêu cầu hợp lệ của các cơ quan công quyền công cộng (ví dụ, một tòa án hoặc một
            cơ quan chính phủ).
          </p>
          <h2>5. Yêu cầu pháp lý khác</h2>
          <p>
            Công ty có thể tiết lộ Dữ liệu Cá nhân của bạn theo niềm tin tốt rằng hành động như vậy là cần thiết để:
          </p>
          <ul>
            <li>Tuân thủ một nghĩa vụ pháp lý</li>
            <li>Bảo vệ và bảo vệ quyền hoặc tài sản của Công ty</li>
            <li>Ngăn chặn hoặc điều tra hành vi sai trái có thể xảy ra liên quan đến Dịch vụ</li>
            <li>Bảo vệ an toàn cá nhân của Người dùng Dịch vụ hoặc công chúng</li>
            <li>Phòng chống trách nhiệm pháp lý</li>
          </ul>
          <h2>6. Bảo mật của Dữ liệu Cá nhân của bạn</h2>
          <p>
            An ninh Dữ liệu Cá nhân của bạn quan trọng đối với chúng tôi, nhưng xin lưu ý rằng không có phương thức
            truyền tải trên Internet hoặc phương thức lưu trữ điện tử nào là hoàn toàn an toàn. Trong khi chúng tôi cố
            gắng sử dụng các phương tiện thương mại chấp nhận được để bảo vệ Dữ liệu Cá nhân của bạn, chúng tôi không
            thể đảm bảo tính bảo mật tuyệt đối của nó.
          </p>
          <h2>7. Bảo mật dành cho trẻ em</h2>
          <p>
            Dịch vụ của chúng tôi không dành cho bất kỳ ai dưới 13 tuổi. Chúng tôi không thu thập thông tin cá nhân có
            thể nhận dạng từ bất kỳ ai dưới 13 tuổi. Nếu bạn là cha mẹ hoặc người giám hộ và bạn nhận thấy rằng con bạn
            đã cung cấp cho chúng tôi Dữ liệu Cá nhân, xin vui lòng liên hệ với chúng tôi. Nếu chúng tôi nhận thấy rằng
            chúng tôi đã thu thập Dữ liệu Cá nhân từ ai đó dưới 13 tuổi mà không xác minh được sự đồng ý của phụ huynh,
            chúng tôi sẽ thực hiện các biện pháp để loại bỏ thông tin đó khỏi máy chủ của chúng tôi.
          </p>
          <p>
            Nếu chúng tôi cần phải dựa vào sự đồng ý của pháp luật cho việc xử lý thông tin của bạn và quốc gia của bạn
            yêu cầu sự đồng ý từ phụ huynh, chúng tôi có thể yêu cầu sự đồng ý của phụ huynh trước khi thu thập và sử
            dụng thông tin đó.
          </p>
          <h2>8. Liên kết đến các trang web khác</h2>
          <p>
            Dịch vụ của chúng tôi có thể chứa liên kết đến các trang web khác không được vận hành bởi chúng tôi. Nếu bạn
            nhấp vào một liên kết của bên thứ ba, bạn sẽ được chuyển hướng đến trang web của bên thứ ba đó. Chúng tôi
            mạnh mẽ khuyến khích bạn xem xét Chính sách Bảo mật của mỗi trang web mà bạn truy cập.
          </p>
          <p>
            Chúng tôi không kiểm soát và không chịu trách nhiệm về nội dung, các chính sách bảo mật hoặc thực tiễn của
            bất kỳ trang web hoặc dịch vụ của bên thứ ba nào.
          </p>
          <h2>9. Thay đổi Chính sách Bảo mật này</h2>
          <p>
            Chúng tôi có thể cập nhật Chính sách Bảo mật của chúng tôi từ thời gian này đến thời gian khác. Chúng tôi sẽ
            thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính sách Bảo mật mới này trên trang này.
          </p>
          <p>
            Chúng tôi sẽ thông báo cho bạn qua email và/hoặc thông báo nổi bật trên Dịch vụ của chúng tôi, trước khi
            thay đổi có hiệu lực và cập nhật ngày "Cập nhật lần cuối" ở đầu Chính sách Bảo mật này.
          </p>
          <p>
            Bạn được khuyến khích xem xét Chính sách Bảo mật này định kỳ để nắm bắt những thay đổi. Các thay đổi của Ch
            ính sách Bảo mật này có hiệu lực khi được đăng trên trang này.
          </p>
          <h2>10. Liên hệ chúng tôi</h2>
          <p>Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo mật này, bạn có thể liên hệ với chúng tôi:</p>
          <ul>
            <li>Email: support@aura.network</li>
          </ul>
        </div>
      </>
    )
  }
  return (
    <>
      <HeadComponent title='Policy | Punkga.me' />
      <Header />
      <div className='pk-container py-5 px-3 md:px-0 text-sm [&_p]:mb-2 [&>h1]:font-bold [&>h1]:text-4xl [&>h1]:mb-3 [&>h1]:mt-7 [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mb-3 [&>h2]:mt-5 [&>ul]:pl-6 [&>ul]:list-disc [&>ul>*]:mb-2'>
        <h1>Privacy Policy</h1>
        <p>Last updated: April 06, 2023</p>
        <p>
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
          information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>
        <p>
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the
          collection and use of information in accordance with this Privacy Policy.
        </p>
        <div className='w-full h-[1px] bg-slate-400 my-6'></div>
        <h1>Interpretation and Definitions</h1>
        <h2>1. Interpretation</h2>
        <p>
          The words of which the initial letter is capitalized have meanings defined under the following conditions. The
          following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </p>
        <h2>2. Definitions</h2>
        <ul>
          <p>For the purposes of this Privacy Policy:</p>
          <li>
            <strong>Account </strong>
            means a unique account created for You to access our Service or parts of our Service.
          </li>
          <li>
            <strong>Affiliate </strong>
            means an entity that controls, is controlled by or is under common control with a party, where "control"
            means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for
            election of directors or other managing authority.
          </li>
          <li>
            <strong>Company </strong>
            (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to AURA Network, Hanoi.
          </li>
          <li>
            <strong>Cookies </strong>
            are small files that are placed on Your computer, mobile device or any other device by a website, containing
            the details of Your browsing history on that website among its many uses.
          </li>
          <li>
            <strong>Country </strong>
            refers to: Vietnam
          </li>
          <li>
            <strong>Device </strong>
            means any device that can access the Service such as a computer, a cellphone or a digital tablet.
          </li>
          <li>
            <strong>Personal Data </strong>
            is any information that relates to an identified or identifiable individual.
          </li>
          <li>
            <strong>Service </strong>
            refers to the Website.
          </li>
          <li>
            <strong>Service Provider </strong>
            means any natural or legal person who processes the data on behalf of the Company. It refers to third-party
            companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf
            of the Company, to perform services related to the Service or to assist the Company in analyzing how the
            Service is used.
          </li>
          <li>
            <strong>Third-party Social Media Service </strong>
            refers to any website or any social network website through which a User can log in or create an account to
            use the Service.
          </li>
          <li>
            <strong>Usage Data </strong>
            refers to data collected automatically, either generated by the use of the Service or from the Service
            infrastructure itself (for example, the duration of a page visit).
          </li>
          <li>
            <strong>Website </strong>
            refers to Punkga, accessible from punkga.me
          </li>
          <li>
            <strong>You </strong>
            means the individual accessing or using the Service, or the company, or other legal entity on behalf of
            which such individual is accessing or using the Service, as applicable.
          </li>
        </ul>
        <h1>Collecting and Using Your Personal Data</h1>
        <h2>1. Types of Data Collected</h2>
        <h2>1.1 Personal Data</h2>
        <p>
          While using Our Service, We may ask You to provide Us with certain personally identifiable information that
          can be used to contact or identify You. Personally identifiable information may include, but is not limited
          to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Usage Data</li>
        </ul>
        <h2>1.2 Usage Data</h2>
        <p>Usage Data is collected automatically when using the Service.</p>
        <p>
          Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser
          type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time
          spent on those pages, unique device identifiers and other diagnostic data.
        </p>
        <p>
          When You access the Service by or through a mobile device, We may collect certain information automatically,
          including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address
          of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique
          device identifiers and other diagnostic data.
        </p>
        <p>
          We may also collect information that Your browser sends whenever You visit our Service or when You access the
          Service by or through a mobile device.
        </p>
        <h2>1.3 Information from Third-Party Social Media Services</h2>
        <p>
          The Company allows You to create an account and log in to use the Service through the following Third-party
          Social Media Services:
        </p>
        <ul>
          <li>Google</li>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>LinkedIn</li>
        </ul>
        <p>
          If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may
          collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as
          Your name, Your email address, Your activities or Your contact list associated with that account.
        </p>
        <p>
          You may also have the option of sharing additional information with the Company through Your Third-Party
          Social Media Service's account. If You choose to provide such information and Personal Data, during
          registration or otherwise, You are giving the Company permission to use, share, and store it in a manner
          consistent with this Privacy Policy.
        </p>
        <h2>1.4 Tracking Technologies and Cookies</h2>
        <p>
          We use Cookies and similar tracking technologies to track the activity on Our Service and store certain
          information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to
          improve and analyze Our Service. The technologies We use may include:
        </p>
        <ul>
          <li>
            <strong>Cookies or Browser Cookies. </strong>A cookie is a small file placed on Your Device. You can
            instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do
            not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your
            browser setting so that it will refuse Cookies, our Service may use Cookies.
          </li>
          <li>
            <strong>Web Beacons. </strong>Certain sections of our Service and our emails may contain small electronic
            files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit
            the Company, for example, to count users who have visited those pages or opened an email and for other
            related website statistics (for example, recording the popularity of a certain section and verifying system
            and server integrity).
          </li>
        </ul>
        <p>
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or
          mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
          Learn more about cookies on the Free Privacy Policy website article.
        </p>
        <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
        <ul>
          <li>
            <p className='font-bold'>Necessary / Essential Cookies</p>
            <p>Type: Session Cookies</p>
            <p>Administered by: Us</p>
            <p>
              Purpose: These Cookies are essential to provide You with services available through the Website and to
              enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user
              accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use
              these Cookies to provide You with those services.
            </p>
          </li>
          <li>
            <p className='font-bold'>Cookies Policy / Notice Acceptance Cookies</p>
            <p>Type: Persistent Cookies</p>
            <p>Administered by: Us</p>
            <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
          </li>
          <li>
            <p className='font-bold'>Functionality Cookies</p>
            <p>Type: Persistent Cookies</p>
            <p>Administered by: Us</p>
            <p>
              Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering
              your login details or language preference. The purpose of these Cookies is to provide You with a more
              personal experience and to avoid You having to re-enter your preferences every time You use the Website.
            </p>
          </li>
        </ul>
        <p>
          For more information about the cookies we use and your choices regarding cookies, please visit our Cookies
          Policy or the Cookies section of our Privacy Policy.
        </p>
        <h2>2. Use of Your Personal Data</h2>
        <p>The Company may use Personal Data for the following purposes:</p>
        <ul>
          <li>
            <strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.
          </li>
          <li>
            <strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal
            Data You provide can give You access to different functionalities of the Service that are available to You
            as a registered user.
          </li>
          <li>
            <strong>For the performance of a contract:</strong> the development, compliance and undertaking of the
            purchase contract for the products, items or services You have purchased or of any other contract with Us
            through the Service.
          </li>
          <li>
            <strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of
            electronic communication, such as a mobile application's push notifications regarding updates or informative
            communications related to the functionalities, products or contracted services, including the security
            updates, when necessary or reasonable for their implementation.
          </li>
          <li>
            <strong>To provide You</strong> with news, special offers and general information about other goods,
            services and events which we offer that are similar to those that you have already purchased or enquired
            about unless You have opted not to receive such information.
          </li>
          <li>
            <strong>To manage Your requests:</strong> To attend and manage Your requests to Us.
          </li>
          <li>
            <strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger,
            divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our
            assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which
            Personal Data held by Us about our Service users is among the assets transferred.
          </li>
          <li>
            <strong>For other purposes:</strong> We may use Your information for other purposes, such as data analysis,
            identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and
            improve our Service, products, services, marketing and your experience.
          </li>
        </ul>
        <p>We may share Your personal information in the following situations:</p>
        <ul>
          <li>
            <strong>With Service Providers:</strong> We may share Your personal information with Service Providers to
            monitor and analyze the use of our Service, to contact You.
          </li>
          <li>
            <strong>For business transfers:</strong> We may share or transfer Your personal information in connection
            with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a
            portion of Our business to another company.
          </li>
          <li>
            <strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will
            require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other
            subsidiaries, joint venture partners or other companies that We control or that are under common control
            with Us.
          </li>
          <li>
            <strong>With business partners:</strong> We may share Your information with Our business partners to offer
            You certain products, services or promotions.
          </li>
          <li>
            <strong>With other users:</strong> when You share personal information or otherwise interact in the public
            areas with other users, such information may be viewed by all users and may be publicly distributed outside.
            If You interact with other users or register through a Third-Party Social Media Service, Your contacts on
            the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity.
            Similarly, other users will be able to view descriptions of Your activity, communicate with You and view
            Your profile.
          </li>
          <li>
            <strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with
            Your consent
          </li>
        </ul>
        <h2>2.1 Retention of Your Personal Data</h2>
        <p>
          The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this
          Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal
          obligations (for example, if we are required to retain your data to comply with applicable laws), resolve
          disputes, and enforce our legal agreements and policies.
        </p>
        <p>
          The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a
          shorter period of time, except when this data is used to strengthen the security or to improve the
          functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
        </p>
        <h2>2.2 Transfer of Your Personal Data</h2>
        <p>
          Your information, including Personal Data, is processed at the Company's operating offices and in any other
          places where the parties involved in the processing are located. It means that this information may be
          transferred to — and maintained on — computers located outside of Your state, province, country or other
          governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
        </p>
        <p>
          Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement
          to that transfer.
        </p>
        <p>
          The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in
          accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization
          or a country unless there are adequate controls in place including the security of Your data and other
          personal information.
        </p>
        <h2>2.3 Delete Your Personal Data</h2>
        <p>
          You have the right to delete or request that We assist in deleting the Personal Data that We have collected
          about You.
        </p>
        <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
        <p>
          You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one,
          and visiting the account settings section that allows you to manage Your personal information. You may also
          contact Us to request access to, correct, or delete any personal information that You have provided to Us.
        </p>
        <p>
          Please note, however, that We may need to retain certain information when we have a legal obligation or lawful
          basis to do so.
        </p>
        <h2>3. Business Transactions</h2>
        <p>
          If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We
          will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy
          Policy.
        </p>
        <h2>4. Law enforcement</h2>
        <p>
          Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so
          by law or in response to valid requests by public authorities (e.g. a court or a government agency).
        </p>
        <h2>5. Other legal requirements</h2>
        <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
        <ul>
          <li>Comply with a legal obligation</li>
          <li>Protect and defend the rights or property of the Company</li>
          <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
          <li>Protect the personal safety of Users of the Service or the public</li>
          <li>Protect against legal liability</li>
        </ul>
        <h2>6. Security of Your Personal Data</h2>
        <p>
          The security of Your Personal Data is important to Us, but remember that no method of transmission over the
          Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means
          to protect Your Personal Data, We cannot guarantee its absolute security.
        </p>
        <h2>7. Children's Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable
          information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child
          has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data
          from anyone under the age of 13 without verification of parental consent, We take steps to remove that
          information from Our servers.
        </p>
        <p>
          If We need to rely on consent as a legal basis for processing Your information and Your country requires
          consent from a parent, We may require Your parent's consent before We collect and use that information.
        </p>
        <h2>8. Links to Other Websites</h2>
        <p>
          Our Service may contain links to other websites that are not operated by Us. If You click on a third party
          link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of
          every site You visit.
        </p>
        <p>
          We have no control over and assume no responsibility for the content, privacy policies or practices of any
          third party sites or services.
        </p>
        <h2>9. Changes to this Privacy Policy</h2>
        <p>
          We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new
          Privacy Policy on this page.
        </p>
        <p>
          We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming
          effective and update the "Last updated" date at the top of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </p>
        <h2>10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul>
          <li>By email: support@aura.network</li>
        </ul>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
