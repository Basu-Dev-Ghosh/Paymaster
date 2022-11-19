import React from "react";
import "./Main.css";
import logo from "../../assets/FooterLogo.png";
import linkedin from "../../assets/LinkedIn.png";
const index = () => {
  return (
    <div className="page-02-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="form">
        <div className="row1">
          <h1>Log In</h1>
          <h3>
            New user?<span>Create an account</span>
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
        <form className="row3">
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default index;
