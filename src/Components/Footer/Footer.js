import React from "react";
import youtube from "../../assets/Path 20.svg";
import facebook from "../../assets/Path 19.svg";
import instagram from "../../assets/Group 62.svg";
import twitter from "../../assets/Path 15.svg";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <p>Copyright © 2008-2022, Paymaster, Inc.</p>
      </div>
      <div className="links">
        <img src={youtube} alt="Youtube icon" />
        <img src={twitter} alt="Twitter icon" />
        <img src={instagram} alt="Instagram icon" />
        <img src={facebook} alt="Facebook icon" />
      </div>
    </div>
  );
};

export default Footer;
