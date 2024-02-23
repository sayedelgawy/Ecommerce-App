import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import CounterContextProvider from "./Context/CounterContext";
import { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import WishList from "./Components/WishList/WishList";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import AllOrders from "./Components/AllOrders/AllOrders"

export default function App() {
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "shippingAddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
             <AllOrders/>
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "resetCode",
          element: <ResetCode/>,
        },
        {
          path:'resetPassword',
          element:<ResetPassword/>
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <CounterContextProvider>
        <Provider store={store}>
          <RouterProvider router={routers} />
          <Toaster />
        </Provider>
      </CounterContextProvider>
    </>
  );
}
