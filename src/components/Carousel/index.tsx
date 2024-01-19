import Slider from 'react-slick'
export default function Carousel({ children, setting, className }: any) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
        }}>
        <ul className='punkga-carousel' style={{ margin: '0px' }}>
          {' '}
          {dots}{' '}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          background: '#ababab',
          width: 14,
          height: 8,
          borderRadius: '10px',
        }}></div>
    ),
    ...setting,
  }
  return (
    <div className={className}>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}
