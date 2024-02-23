import React from "react";
import style from "./MainSlider.module.css";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";
import img1 from "../../Assets/images/grocery-banner.png";
import img2 from "../../Assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  let settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="row my-3 g-0">
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={slide1} height={400} alt="main banner slide img" className="w-100 rounded-start"/>
            <img src={slide2}  height={400} alt="main banner slide img" className="w-100 rounded-start"/>
            <img src={slide3} height={400} alt="main banner slide img" className="w-100 rounded-start"/>
          </Slider>
        </div>
        <div className="col-md-3">
          <div className="images">
            <img src={img1} alt="main small slide banner" height={200}  className="w-100"/>
            <img src={img2} alt="main small slide banner" height={200} className="w-100"/>
          </div>
        </div>
      </div>
    </>
  );
}
