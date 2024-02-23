import React, { useContext, useEffect } from "react";
import style from "./WishList.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function WishList() {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  //get wish list
  function getWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers,
    });
  }

  let { data, isLoading, refetch } = useQuery("wishList", getWishList);

  //wishlist context
  let { removeFromWishList } = useContext(WishListContext);

  //remove from wish list
  async function removeFromWishlist(id) {
    let { data } = await removeFromWishList(id);

    if (data?.status === "success") {
      refetch();
      toast.success(data.message);
    } else {
      toast.error(data?.message);
    }
  }

  //adding to cart
  let { addToCart, setTokenCartContext } = useContext(CartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data?.status === "success") {
      await removeFromWishList(id);
      refetch();
      toast.success(data.message);
    } else {
      toast.error(data?.message);
    }
  }
  useEffect(() => {
    setTokenCartContext();
  }, []);
  return (
    <>
      <div className="bg-main-light p-2 mt-5">
        <h2>My WishList</h2>
        {isLoading ? (
          <div className="loading">
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
              <title>WishList</title>
            </Helmet>

            {data?.data.count == 0 ? <p>Your Wishlist Is Empty</p> : ""}

            {data?.data.data.map((item) => (
              <div
                className="row border-1 border-bottom m-0 align-items-center"
                key={item._id}
              >
                <div className="col-md-2">
                  <div className="img">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="item">
                    <h3 className="h5 fw-bold">
                      {item.title.split(" ").splice(0, 3).join(" ")}
                    </h3>
                    <p className="text-main fw-bold">
                      Price : {item.price} EGP
                    </p>
                    <button
                      className="btn"
                      onClick={() => {
                        removeFromWishlist(item._id);
                      }}
                    >
                      <i className="fas fa-trash-can text-danger"></i>Remove
                    </button>
                  </div>
                </div>
                <div className="col-md-2 p-0">
                  <div className="count ">
                    <button
                      className="btn brdr w-75 py-2 fw-bold my-2"
                      onClick={() => {
                        postToCart(item._id);
                      }}
                    >
                      Add To cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
