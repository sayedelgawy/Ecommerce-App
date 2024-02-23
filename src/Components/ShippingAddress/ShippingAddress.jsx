import React, { useContext } from "react";
import style from "./ShippingAddress.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function ShippingAddress() {
  let validationSchema = Yup.object({
    details: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "plaese enter egyption number"),

    city: Yup.string().required("City is required"),
  });

  let { checkOutSession } = useContext(CartContext);

  let { cartId } = useParams();

  async function checkOut(values) {

    let {data}= await checkOutSession(cartId,values);

    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: checkOut,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shipping Info</title>
      </Helmet>
      <h2 className="h5 py-4">Shipping Info</h2>
      <div className="w-75 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Address Details</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="details"
            name="details"
            className="form-control mb-3"
          />
          {formik.errors.details && formik.touched.details && (
            <div className="alert alert-danger">{formik.errors.details}</div>
          )}

          <label htmlFor="phone">phone</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          )}
          <label htmlFor="city">city</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="city"
            name="city"
            className="form-control mb-3"
          />
          {formik.errors.city && formik.touched.city && (
            <div className="alert alert-danger">{formik.errors.city}</div>
          )}
          <button className="btn bg-main text-light w-100" type="submit">
            Pay now
          </button>
        </form>
      </div>
    </>
  );
}
