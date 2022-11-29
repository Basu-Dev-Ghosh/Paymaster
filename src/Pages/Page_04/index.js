import React, { useState } from "react";
import "./Main.css";
import logo from "../../assets/FooterLogo.png";
import Loader from "../../Components/Loader/Loader";
import axios from 'axios'
import { serverLink } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

/*
toast.success("Wow so easy !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
*/

const Index = () => {
  const [userData, setUserData] = useState({})
  const [buttonLoading, setButtonLoading] = useState('none');
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const handleSignup = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };
  const signup = async (e) => {
    e.preventDefault();
    setButtonLoading("block");
    try {
      const res = await axios.post(`${serverLink}/auth/signup`, userData, { withCredentials: true });
      if (res.status === 201) {
        setButtonLoading("none");
        setShowLoader(true);
        toast.success(res.data.Messege, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setTimeout(() => {
          navigate('/')
        }, 3100);
      }

    } catch (err) {
      setButtonLoading("none");
      toast.error(err.data.Messege, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }

  return (
    <>
      {
        showLoader ? <Loader /> : <div className="page-02-container">
          <div className="logo" onClick={(e) => navigate('/')}>
            <img src={logo} alt="Logo" />
          </div>
          <div className="form">
            <div className="row1 page4-row1">
              <h1>Welcome to paymaster</h1>
              <h3>Please take a moment to complete the account</h3>
            </div>
            <form className="row3 page4-row3" onSubmit={signup}>
              <div className="row3-row1">
                <div className="form-input">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" required name="FirstName" onChange={handleSignup} id="firstname" />
                </div>
                <div className="form-input">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" required name="LastName" onChange={handleSignup} id="lastname" />
                </div>
              </div>
              <h3>Date of Birth</h3>
              <div className="row3-row2">
                <div className="form-input">
                  <label htmlFor="month"></label>
                  <input type="date" required name="DOB" onChange={handleSignup} id="month" />
                </div>
              </div>
              <label htmlFor="company">Company Name</label>
              <input type="text" name="CompanyName" onChange={handleSignup} id="company" />
              <label htmlFor="email">Email address</label>
              <input type="email" required name="Email" onChange={handleSignup} id="email" />
              <label htmlFor="location">Location</label>
              <input type="text" name="Location" required onChange={handleSignup} id="location" />{" "}
              <label htmlFor="position">Position</label>
              <input type="text" name="Position" onChange={handleSignup} id="position" />{" "}
              <label htmlFor="password">Password</label>
              <input type="password" required name="Password" onChange={handleSignup} id="password" />
              <button type="submit" className="register-button">{buttonLoading !== "none" ? null : "Continue"} <div class="dots" style={{ display: buttonLoading }}></div></button>
            </form>
          </div>
        </div>
      }

      <ToastContainer />\
    </>

  );
};

export default Index;
