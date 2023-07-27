import Slider from "react-slick"
export default function Carousel({children}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
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
  }
  return (
    <div className="w-[100%] pb-5">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}
