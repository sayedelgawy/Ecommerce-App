import React, { useState } from "react";
import style from './ForgetPassword.module.css';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

export default function ForgetPassword() {

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  let validationSchema = Yup.object({
   
    email: Yup.string().required("email is required").email("email is invalid")
    
  });

  async function emailSubmit(values) {
    
    let  data= await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    ).catch((err)=>{
      setErr('Your Email Is Not In Our Database')
    });
    
    
    if(data?.data.statusMsg === 'success'){
      localStorage.setItem('userEmail',values.email);
      navigate('/resetCode');

    }
   
  }

  let formik = useFormik({
    initialValues: {
     
      email: "",
    },
    validationSchema,
    onSubmit: emailSubmit,
  });

  return <>
    <div className="w-75 mx-auto py-4">
        <form onSubmit={formik.handleSubmit}>
          {err&&<div className="alert alert-danger">{err}</div>}
          

          <label htmlFor="email">Enter Your E-mail</label>
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
          
          
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-light"
              type="submit"
            >
              Send
            </button>
            
            
          
          
          
        </form>
      </div>
    </>
  
}
