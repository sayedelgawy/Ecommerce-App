import React, { useEffect } from "react";
import style from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { getCategories } from "../../Redux/CategoriesSlice";

export default function Categories() {
  let dispatch = useDispatch();

  let { categories, isLoading, error } = useSelector(
    ({ categories }) => categories
  );



  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <h2>Categories</h2>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
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
         <div className="row">
         {categories.map((category)=> <div key={category._id} className="col-md-3">
            <div className="category product">
              <img src={category.image} alt={category.name} className="w-100" height={300}/>
              <p>{category.name}</p>
            </div>
          </div>)}
         </div>
        </>
      )}
    </>
  );
}
