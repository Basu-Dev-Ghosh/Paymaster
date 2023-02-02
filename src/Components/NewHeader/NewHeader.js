import React, { useState, useEffect } from "react";
import "./NewHeader.css";
import footerlogo from "../../assets/logo2.png";
import { serverLink } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const NewHeader = ({ setShowLoader }) => {
  const [token, setToken] = useState(false);
  const [user,setUser]=useState(null)
  const navigate = useNavigate();

  const isAuth = async () => {
    try {
      const res = await axios.get(`${serverLink}/auth/isauth`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setToken(true);
        setUser(res.data.user)
      }
    } catch (err) {}
  };

  const logout = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${serverLink}/auth/logout`, {
        withCredentials: true,
      });
      if (res.status === 204) {
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
          navigate("/login");
        }, 2100);
      }
    } catch (err) {
      toast.error(err.data.Messege, {
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

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <div className="new-header">
        <div className="new-header-logo">
          <img src={footerlogo} alt="Footer-Logo" />
          <h3>paymaster</h3>
          <div className="invoice-logo-container" onClick={()=>navigate("/invoice")}>
          <i className="fa-solid fa-receipt invoice-logo"></i>
          <p>Invoice</p>
          </div>
          
        </div>
        {token ? (
          <>
            <div className="user-icon">
            {
              user.CompanyLogo?
              <img className="companyLogo" src={user.CompanyLogo} alt="Logo"  />
              :<i class="fa-solid fa-user-tie"></i>
            }
              
            </div>
            <a onClick={logout}>
              <i class="fa-solid fa-right-from-bracket"></i> Sign out
            </a>
          </>
        ) : (
          <a onClick={(e) => navigate("/login")}>
            <i class="fa-solid fa-arrow-right-to-bracket"></i>Login
          </a>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default NewHeader;
