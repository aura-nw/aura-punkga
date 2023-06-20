import Slider from "react-slick"
import Mock from "assets/images/mokup1.png"
import Mock2 from "assets/images/mokup2.png"
import Image from "next/image"
export default function Carousel({children}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}>
        <ul className="punkga-carousel" style={{ margin: "0px" }}>
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          background: "#ababab",
          width: 14,
          height: 8,
          borderRadius: "10px",
        }}></div>
    ),
  }
  return (
    <div className="w-[100%]">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}
