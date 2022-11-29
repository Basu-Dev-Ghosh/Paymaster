import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header02.css";
const Header02 = () => {
  const navigate = useNavigate();
  return (
    <div className="header02">
      <h1 onClick={(e) => navigate('/')}>paymaster</h1>
    </div>
  );
};

export default Header02;
