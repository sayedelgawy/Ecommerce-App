import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function setTokenCartContext(){
    headers = {
      token: localStorage.getItem("userToken")
    }
  }
  const[numberOfCartItems,setNumberOfCartItems]=useState(0);

  function checkOutSession(cartId,shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://ecommerce-app-nine-theta.vercel.app`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setNumberOfCartItems(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  function getCartItems() {
  
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      )
      .then((response) => {
        setNumberOfCartItems(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  function deleteCartItems(productId) {
   
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      )
      .then((response) => {
        setNumberOfCartItems(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }
  function updateCartItems(productId,count) {
   
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
          count
        },
        {
          headers,
        }
      )
      .then((response) => {
        setNumberOfCartItems(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }
  function deleteCart() {
   
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      )
      .then((response) => {
        setNumberOfCartItems(0);
        return response
      })
      .catch((err) => err);
  }



  return <CartContext.Provider value={{numberOfCartItems,addToCart,getCartItems,deleteCartItems,updateCartItems,deleteCart,setTokenCartContext,checkOutSession}}>
    {props.children}
  </CartContext.Provider>
}
