import React, { useContext } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../Assets/images/freshcart-logo.svg";

import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
//import { useSelector } from "react-redux";

export default function Navbar() {

  //let { count } = useSelector(({ counter }) => counter);

  let { userToken, setUserToken } = useContext(UserContext);
  let {numberOfCartItems}=useContext(CartContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src={logoImage} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"cart"}>
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"wishlist"}>
                      Wish List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"products"}>
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"categories"}>
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"brands"}>
                      Brands
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook px-2"></i>
                <i className="fab fa-instagram px-2"></i>
                <i className="fab fa-twitter px-2"></i>
              </li>
              {userToken ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={logOut}>
                      LogOut
                    </span>
                  </li>
                  <li  className="nav-item position-relative"><Link  className="nav-link ng-star-inserted" to={'cart'}><i  className="fa-solid fa-cart-shopping fs-3"></i><div  className="badge position-relative text-white bg-main">{numberOfCartItems}</div></Link></li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"register"}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"login"}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
