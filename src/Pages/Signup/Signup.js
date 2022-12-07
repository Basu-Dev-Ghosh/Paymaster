import React, { useState } from "react";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import loginlogo from "../../assets/Group 110.png";
import { useNavigate } from "react-router-dom";
import linkedin from "../../assets/Group 376.png";
import gmail from "../../assets/Group 114.png";
import groupimage from "../../assets/Group 348.png";

const Signup = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="login-container">
          <div className="login-box">
            <div className="login-box-color">
              <img
                src={groupimage}
                style={{ width: "700px" }}
                alt="Group image"
              />
            </div>
            <div className="login-box-form">
              <div className="login-box-form-logo">
                <img
                  src={loginlogo}
                  alt="Logo"
                  onClick={(e) => navigate("/")}
                />
              </div>
              <p>Create new paymaster account</p>
              <button className="linkedin-button">
                <img src={linkedin} alt="Linked in icon" />
                Sign up with Linkedin
              </button>
              <button
                className="linkedin-button gmail-button"
                onClick={(e) => navigate("/signup2")}
              >
                <img src={gmail} alt="Linked in icon" />
                Sign up with Gmail
              </button>
              <div className="signup-link">
                <p>
                  Already have an account?{" "}
                  <span onClick={(e) => navigate("/login")}>Login</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Signup;
