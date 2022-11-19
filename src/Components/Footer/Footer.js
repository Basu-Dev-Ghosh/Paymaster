import React from "react";
import footerlogo from "../../assets/logo2.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footerlogo} alt="Footer-Logo" />
        <h3>paymaster</h3>
      </div>
      <div className="copyright">
        <p>Copyright &copy; 2008-2022, Paymaster, Inc.</p>
      </div>
      <div className="links">
        <i class="fa-brands fa-youtube"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
      </div>
    </div>
  );
};

export default Footer;
