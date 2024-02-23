import React, { useEffect } from "react";
import style from "./Brands.module.css";
import { getBrands } from "../../Redux/BrandsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";

export default function Brands() {
  let dispatch = useDispatch();
  let { brands, isLoading, error } = useSelector(({ brands }) => brands);

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  return (
    <>
      <h2>Brands</h2>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
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
          <div className="row py-5 p-2">
            {brands.map((brand)=><div key={brand._id} className="col-md-3">
              <div className="product">
                <img src={brand.image} alt={brand.name} className="w-100" />
                <p>{brand.name}</p>
              </div>
            </div>)}
          </div>
        </>
      )}
    </>
  );
}
