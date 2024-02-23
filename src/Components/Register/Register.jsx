import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "min lenght is 3")
      .max(10, "max lenght is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][\w @]{5,8}$/,
        "password start with capital letter ex:Ahmed123"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "repassword must match password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "plaese enter egyption number"),
  });

  async function registerSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      values
    ).catch((err)=>{
      setErr(err.response.data.message);
      setLoading(false);
    });
    
    if(data.message === 'success'){
      setLoading(false);
      navigate('/login');
    }
   
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <form onSubmit={formik.handleSubmit}>
          {err&&<div className="alert alert-danger">{err}</div>}
          <label htmlFor="name">Name</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            name="name"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger">{formik.errors.name}</div>
          )}

          <label htmlFor="email">E-mail</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}
          <label htmlFor="phone">Phone</label>
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
          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}

          <label htmlFor="rePassword">rePassword</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          )}
          {loading ? (
            <button className="btn bg-main text-light" type="button">
              <ColorRing
                visible={true}
                height="20"
                width="45"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-light"
              type="submit"
            >
              Register
            </button>
          )}
          
           <Link className='ps-4' to={'/login'}>Login</Link>
        </form>
      </div>
    </>
  );
}
