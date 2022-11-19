import React from "react";
import "./Main.css";
import logo from "../../assets/FooterLogo.png";
const index = () => {
  return (
    <div className="page-02-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="form">
        <div className="row1 page4-row1">
          <h1>Welcome to paymaster</h1>
          <h3>Please take a moment to complete the account</h3>
        </div>
        <form className="row3 page4-row3">
          <div className="row3-row1">
            <div className="form-input">
              <label htmlFor="firstname">First Name</label>
              <input type="text" id="firstname" />
            </div>
            <div className="form-input">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" id="lastname" />
            </div>
          </div>
          <h3>Date of Birth</h3>
          <div className="row3-row2">
            <div className="form-input">
              <label htmlFor="month">Month</label>
              <input type="text" id="month" />
            </div>
            <div className="form-input">
              <label htmlFor="year">Year</label>
              <input type="text" id="year" />
            </div>
          </div>
          <label htmlFor="company">Company Name</label>
          <input type="text" id="company" />
          <label htmlFor="location">Location</label>
          <input type="text" id="location" />{" "}
          <label htmlFor="position">Position</label>
          <input type="text" id="position" />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default index;
