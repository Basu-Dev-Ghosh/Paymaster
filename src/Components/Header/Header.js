import React, { useRef, useState } from "react";
import "./Header.css";
import logo from "../../assets/Logo.png";
const Header = () => {
  const [display, setDisplay] = useState("flex");
  const show = (e) => {
    console.log("HI");
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo-Paymaster" />
      </div>
      <div className="hamburger">
        <i class="fa-solid fa-bars" onClick={show}></i>
      </div>
      <div className="header-form" style={{ display: `${display}` }}>
        <input type="text" placeholder="Companies" />
        <input type="text" placeholder="Location" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Header;
