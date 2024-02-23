import React, {useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { ColorRing } from "react-loader-spinner";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addToCart, setTokenCartContext } = useContext(CartContext);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
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
  let { id } = useParams();

  async function postToCart(id) {
    let { data } = await addToCart(id);

    if (data?.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("wait 10 sec for the server to respond");
    }
  }
  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
    setLoading(false);
  }

  useEffect(() => {
    setTokenCartContext();
    getProductDetails(id);
    
  }, []);
  return (
    <>
      {loading ? (
        <div className="row justify-content-center align-items-center">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{details.title}</title>
          </Helmet>
          <div className="row align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {details.images.map((image, index) => (
                  <img
                    src={image}
                    alt={details.title}
                    key={index}
                    className="w-100"
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <div className="details">
                <h3 className="h5">{details.title}</h3>
                <p className="py-3">{details.description}</p>
                <span className="font-sm text-main">
                  {details.category.name}
                </span>
                <div className="d-flex py-3 justify-content-between align-items-center">
                  <span className="font-sm">{details.price} EGP</span>

                  <span className="font-sm">
                    <i className="fas fa-star rating-color me-1"></i>
                    {details.ratingsAverage}
                  </span>
                </div>
                <button className="btn bg-main text-main-light w-100 btn-sm" onClick={() => postToCart(id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
