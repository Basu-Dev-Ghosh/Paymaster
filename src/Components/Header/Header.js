import React, { useRef } from "react";
import "./Header.css";
import logo from "../../assets/Logo.png";
const Header = () => {
  const showref = useRef();
  const show = (e) => showref.current.classList.toggle("show");
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo-Paymaster" />
      </div>
      <div className="hamburger">
        <i class="fa-solid fa-bars" onClick={show}></i>
      </div>
      <div className="header-form" ref={showref}>
        <input type="text" placeholder="Companies" />
        <input type="text" placeholder="Location" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Header;
