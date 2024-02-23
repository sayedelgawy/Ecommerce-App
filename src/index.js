import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserContextProvider from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
//import { ReactQueryDevtools } from "react-query/devtools";
import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishListContext";

let queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WishListContextProvider>
    </CartContextProvider>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
