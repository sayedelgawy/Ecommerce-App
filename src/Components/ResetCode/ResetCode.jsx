import React, { useState } from "react";
import style from './ResetCode.module.css';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";



export default function ResetCode() {

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  let validationSchema = Yup.object({
   
    resetCode: Yup.string().required("Code is required")
    
  });

  async function codeSubmit(values) {
    
    let  data = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    ).catch((err)=>{
      console.log(err);
      setErr('Invalid or expired code')
    });
    
    if(data?.data.status === "Success"){

      navigate('/resetPassword');

    }
   
  }

  let formik = useFormik({
    initialValues: {
     
      resetCode: "",
    },
    validationSchema,
    onSubmit: codeSubmit,
  });

  return <>
     <div className="w-75 mx-auto py-4">
        <form onSubmit={formik.handleSubmit}>
          {err&&<div className="alert alert-danger">{err}</div>}
          

          <label htmlFor="resetCode">Enter The Code That Sent in Your Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="resetCode"
            name="resetCode"
            className="form-control mb-3"
          />
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="alert alert-danger">{formik.errors.resetCode}</div>
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
