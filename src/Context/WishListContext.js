import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function setWishToken(){
    headers = {
      token: localStorage.getItem("userToken")
    }
  }
  function addToWishlist(productId) {
   
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) =>  response)
      .catch((err) => err);
  }

 function getWishList(){
 
  return axios
  .get(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    
    {
      headers,
    }
  )
  .then((response) =>  response)
  .catch((err) => err);
 }

 function removeFromWishList(id){
 
  return axios
  .delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    
    {
      headers,
    }
  )
  .then((response) =>  response)
  .catch((err) => err);
 }


  return (
    <WishListContext.Provider value={{addToWishlist,getWishList,removeFromWishList,setWishToken }}>
      {props.children}
    </WishListContext.Provider>
  );
}
