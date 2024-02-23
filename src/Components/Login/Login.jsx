import style from './Login.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useContext } from 'react';
import {UserContext} from '../../Context/UserContext';


export default function Login() {
   
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  
  let validationSchema = Yup.object({
   
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][\w @]{5,8}$/,
        "password start with capital letter ex:Ahmed123"
      )
    
  });
  let {setUserToken}=useContext(UserContext)

  async function loginSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      values
    ).catch((err)=>{
      setErr(err.response.data.message);
      setLoading(false);
    });
    
    if(data.message === 'success'){
      setLoading(false);
      localStorage.setItem('userToken',data.token);
      setUserToken(data.token);
      navigate('/');
    }
   
  }

  let formik = useFormik({
    initialValues: {
     
      email: "",
      password: "",
     
    },
    validationSchema,
    onSubmit: loginSubmit,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <form onSubmit={formik.handleSubmit}>
          {err&&<div className="alert alert-danger">{err}</div>}
          

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

          
          {loading ? 
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
           : 
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-light"
              type="submit"
            >
              login
            </button>
            
            
          }
          <Link className='ps-4' to={'/forgetPassword'}>Forget Password?</Link> 
          <Link className='ps-4' to={'/register'}>Or Register Now</Link>
          
        </form>
      </div>
    </>
  );
  
}
