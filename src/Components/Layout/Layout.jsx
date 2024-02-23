import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";


export default function Layout() {
  return (
    <>
      <Navbar />
      <Offline>
        <div className="loading">
          
            <h2 className="text-center py-3 text-danger fw-bold">
            Please Check Your internet Connection
            </h2>
          
        </div>
      </Offline>
      <div className="container pt-5 mt-3 min-vh-100">
      <Outlet/>
      </div>
      <Footer/>
    </>
  );
}
