import React, { useState } from "react";
import "./Login.css";
import linkedin from "../../assets/Group 376.png";
import loginlogo from "../../assets/Group 110.png";
import group from "../../assets/Group 20.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { serverLink } from "../../App";
import Loader from "../../Components/Loader/Loader";
import { useRef } from "react";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [buttonLoading, setButtonLoading] = useState("none");
  const [eyeDisplay, setEyeDisplay] = useState("none");
  const [eye2Display, setEye2Display] = useState("block");
  const [showLoader, setShowLoader] = useState(false);
  const passwordRef = useRef();

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
      const res = await axios.post(`${serverLink}/auth/login`, userData, {
        withCredentials: true,
      });
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
          navigate("/");
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
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="login-container">
          <img src={group} className="content-image" alt="Content image" />
          <div className="login-box">
            <div className="login-box-form">
              <div className="login-box-form-logo">
                <img
                  src={loginlogo}
                  alt="Logo"
                  onClick={(e) => navigate("/")}
                />
              </div>
              <p>Login to your paymaster account</p>
              <button className="linkedin-button">
                <img src={linkedin} alt="Linked in icon" />
                Log in with Linkedin
              </button>
              <div className="or-line">
                <div className="line1" />
                <p>or</p>
                <div className="line2" />
              </div>
              <form className="login-form" onSubmit={login}>
                <div className="email-input">
                  <input
                    type="email"
                    required
                    name="Email"
                    onChange={handleLogin}
                    placeholder="Email"
                  />
                </div>
                <div className="password-input">
                  <input
                    type="password"
                    required
                    name="Password"
                    onChange={handleLogin}
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <i
                    class="fa-solid fa-eye"
                    style={{ display: eyeDisplay }}
                    onClick={(e) => {
                      setEyeDisplay("none");
                      setEye2Display("block");
                      passwordRef.current.type = "password";
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-eye-slash"
                    style={{ display: eye2Display }}
                    onClick={(e) => {
                      setEye2Display("none");
                      setEyeDisplay("block");
                      passwordRef.current.type = "text";
                    }}
                  ></i>
                </div>
                <button type="submit">
                  {buttonLoading !== "none" ? null : "Continue"}{" "}
                  <div class="dots" style={{ display: buttonLoading }}></div>
                </button>
              </form>
              <div className="signup-link">
                <p>
                  New here?{" "}
                  <span onClick={(e) => navigate("/signup")}>Signup</span>
                </p>
              </div>
            </div>
            <div className="login-box-color"></div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;
