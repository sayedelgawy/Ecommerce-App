import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import {UserContext} from '../../Context/UserContext';
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  let {setUserToken}=useContext(UserContext);

  useEffect(() => {
    // Fetch the email from localStorage when the component mounts
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!newPassword) {
      setNewPasswordError('Password is required');
      return false;
    } else if (!/^[A-Z][\w @]{5,8}$/.test(newPassword)) {
      setNewPasswordError('Password must start with a capital letter and be 6-9 characters long');
      return false;
    }
    setNewPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    try {
      setSubmitting(true);
      const {data} = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email, newPassword }
      );

      localStorage.setItem('userToken',data.token);
      setUserToken(data.token);
      localStorage.removeItem('userEmail')
      navigate('/'); // Handle response from the server
    } catch (error) {
      console.error(error);
      // Handle error, maybe set an error message in state
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-75 mx-auto py-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            disabled // Disable the email input as it's coming from localStorage
          />
          {emailError && <div className="alert alert-danger">{emailError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {newPasswordError && <div className="alert alert-danger">{newPasswordError}</div>}
        </div>
        <button
          type="submit"
          className="btn bg-main text-light"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
