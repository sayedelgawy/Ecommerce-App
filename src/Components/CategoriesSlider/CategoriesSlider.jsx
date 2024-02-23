import React from "react";
//import style from "./CategoriesSlider.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("categories", getCategories);

  let settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="row">
        <Slider {...settings}>
          {data?.data.data.map((category) =>
            <div key={category._id} className="col-md-2">
              <div className="img">
                <img src={category.image} alt="" className="w-100" height={200} />
              </div>
            </div>
          )}
        </Slider>
      </div>
    </>
  );
}
