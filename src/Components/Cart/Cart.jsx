import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getCartItems,
    deleteCartItems,
    updateCartItems,
    deleteCart,
    setTokenCartContext,
  } = useContext(CartContext);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    let { data } = await getCartItems();
    setCart(data);
    setLoading(false);
  }
  async function deleteItems(id) {
    setLoading(true);
    let { data } = await deleteCartItems(id);
    setCart(data);
    setLoading(false);
  }
  async function updateItems(id, count) {
    if (count > 0) {
      let { data } = await updateCartItems(id, count);
      setCart(data);
    } else {
      let { data } = await deleteCartItems(id);
      setCart(data);
    }
  }

  async function deleteAllCart() {
    await deleteCart();
    setCart(null);
  }

  useEffect(() => {
    setTokenCartContext();
    getItems();
  }, []);
  useEffect(() => {
    if (cart?.numOfCartItems == 0) {
      setCart(null);
    }
  }, [cart, setCart]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="bg-main-light p-2 mt-5">
        <h2>Cart Shop</h2>

        {loading ? (
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
            {cart ? (
              <>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-main">
                      Total Cart price: {cart.data.totalCartPrice} EGP
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/shippingAddress/${cart.data._id}`}
                      className="btn bg-main text-light m-3"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <p>Your Cart Is Empty</p>
            )}

            {cart?.data.products.map((product) => (
              <div
                className="row border-1 border-bottom m-0 align-items-center"
                key={product.product.id}
              >
                <div className="col-md-1">
                  <div className="img">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="item">
                    <h3 className="h5 fw-bold">
                      {product.product.title.split(" ").splice(0, 3).join(" ")}
                    </h3>
                    <p className="text-main fw-bold">
                      Price : {product.price} EGP
                    </p>
                    <button
                      onClick={() => {
                        deleteItems(product.product.id);
                      }}
                      className="btn"
                    >
                      <i className="fas fa-trash-can text-danger"></i>Remove
                    </button>
                  </div>
                </div>
                <div className="col-md-1 p-0">
                  <div className="count ">
                    <button
                      className="btn brdr px-2 py-1"
                      onClick={() => {
                        updateItems(product.product.id, product.count + 1);
                      }}
                    >
                      +
                    </button>
                    <span className="mx-1">{product.count}</span>
                    <button
                      className="btn brdr px-2 py-1"
                      onClick={() => {
                        updateItems(product.product.id, product.count - 1);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {cart && (
          <div className="row py-4">
            <button
              onClick={() => {
                deleteAllCart();
              }}
              className="btn"
            >
              <i className="fas fa-trash-can text-danger"></i>Remove All
            </button>
          </div>
        )}
      </div>
    </>
  );
}
