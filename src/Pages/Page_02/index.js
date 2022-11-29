import React, { useState } from "react";
import "./Main.css";
import logo from "../../assets/FooterLogo.png";
import linkedin from "../../assets/LinkedIn.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

const Index = () => {
  const [userData, setUserData] = useState({})
  const [buttonLoading, setButtonLoading] = useState('none');
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };
  const login = async (e) => {
    e.preventDefault();
    setButtonLoading("block");
    try {
      const res = await axios.post(`${serverLink}/auth/login`, userData, { withCredentials: true });
      if (res.status === 202) {
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
        }, 2100);
      }

    } catch (err) {
      setButtonLoading("none");
      toast.error(err.response.data.Messege, {
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
            <div className="row1">
              <h1>Log In</h1>
              <h3>
                New user?
                <span>
                  {" "}
                  <NavLink
                    to={"/page03"}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Create an account{" "}
                  </NavLink>{" "}
                </span>
              </h3>
            </div>
            <div className="row2">
              <img src={linkedin} alt="Log in with linkedin" />
            </div>
            <div className="or">
              <hr />
              <p>or</p>
              <hr />
            </div>
            <form className="row3" onSubmit={login}>
              <label htmlFor="email">Email Address</label>
              <input type="text" name="Email" onChange={handleLogin} id="email" />
              <label htmlFor="password">Password</label>
              <input type="password" name="Password" onChange={handleLogin} id="password" />
              <button type="submit" className="register-button">{buttonLoading !== "none" ? null : "Continue"} <div class="dots" style={{ display: buttonLoading }}></div></button>
            </form>
          </div>
        </div>
      }

      <ToastContainer />
    </>
  );
};

export default Index;
