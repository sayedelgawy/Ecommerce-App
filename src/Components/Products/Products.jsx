//import style from './Products.module.css';
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function Products() {
  //getting product
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, refetch } = useQuery(
    "products",
    getProducts
  ); 


  const [featuredProducts, setFeaturedProducts] = useState(null);

  useEffect(() => {
    if (data) {

      setFeaturedProducts(data.data.data);
      
    }
  }, [data]);


  function searchHandler(e) {

    const searchTerm = e.target.value.toLowerCase();
  
    setFeaturedProducts(data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  ));

  }
  
  
  



  //wish list product state array
  const [dataOfWishProducts, setDataOfWishProducts] = useState([]);

  //wishlist context
  let { addToWishlist, getWishList, removeFromWishList, setWishToken } =
    useContext(WishListContext);

  //add or delete from wishlist when click
  async function postToWishList(id) {
    if (dataOfWishProducts?.includes(id)) {
      let { data } = await removeFromWishList(id);

      setDataOfWishProducts(data?.data);

      if (data?.status === "success") {
        toast.success(data.message);
      } else {
        toast.error("wait 10 sec for the server to respond");
      }
    } else {
      let { data } = await addToWishlist(id);

      setDataOfWishProducts(data?.data);

      if (data?.status === "success") {
        toast.success(data.message);
      } else {
        toast.error("wait 10 sec for the server to respond");
      }
    }
  }

  async function getWishListItems() {
    let { data } = await getWishList();
    setDataOfWishProducts(data?.data.map((obj) => obj._id));
  }


  useEffect(() => {
    setWishToken();
    setTokenCartContext();
    getWishListItems();
    getCartItems();
  }, []);

  //adding to cart
  let { addToCart, setTokenCartContext,getCartItems } = useContext(CartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);

    if (data?.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("wait 10 sec for the server to respond");
    }
  }

  return (
    <>
      <input type="text" onInput={searchHandler} className="w-100 form-control my-5" placeholder="Search" />
      {isLoading ? (
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
        <div className="row gy-4 min-vh-100">
          {featuredProducts?.map((product) => {
            return (
              <div key={product.id} className="col-lg-2 ">
                <div className="product p-2">
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      src={product.imageCover}
                      className="w-100"
                      alt={product.title}
                    />
                    <span className="font-sm text-main">
                      {product.category.name}
                    </span>
                    <h3 className="h5">
                      {product.title.split(" ").splice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex py-3 justify-content-between align-items-center">
                      <span className="font-sm">{product.price} EGP</span>
                      <span className="font-sm">
                        <i className="fas fa-star rating-color me-1"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <i
                    className={`fa-solid fa-heart fs-4 cursor-pointer ${
                      dataOfWishProducts &&
                      dataOfWishProducts?.includes(product.id)
                        ? "red"
                        : ""
                    }`}
                    onClick={() => postToWishList(product.id)}
                  ></i>
                  <button
                    onClick={() => postToCart(product.id)}
                    className="btn bg-main text-main-light w-100 btn-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
