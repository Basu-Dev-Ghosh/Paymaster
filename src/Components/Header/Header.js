import React, { useRef, useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/Logo.png";
import axios from "axios";
import { serverLink } from "../../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Header = ({ setShowLoader, companies }) => {
  const [display, setDisplay] = useState("flex");
  const [token, setToken] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const navigate = useNavigate();
  const show = (e) => {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };
  const isAuth = async () => {
    try {
      const res = await axios.get(`${serverLink}/auth/isauth`, { withCredentials: true })
      if (res.status === 200) {
        setToken(true);
      }
    } catch (err) {

    }
  }



  useEffect(() => {
    isAuth();
    if (window.innerWidth <= 1000) {
      setDisplay("none");
    } else {
      setDisplay("flex");
    }
  }, [window.innerWidth]);

  const logout = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${serverLink}/auth/logout`, { withCredentials: true });
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
          navigate('/page02')
        }, 2100);
      }
    }
    catch (err) {
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

  }
  const search = () => {
    console.log(filterName);
    if (filterName) {
      navigate(`/page08/${filterName}/${filterLocation == "" ? "_" : filterLocation}?`);
    } else {
      toast.warning("Please Input", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }


  return (
    <>
      <div className="header">
        <div className="header-logo" onClick={(e) => navigate('/')}>
          <img src={logo} alt="Logo-Paymaster" />
        </div>
        <div className="hamburger">
          <i class="fa-solid fa-bars" onClick={show}></i>
        </div>
        <div className="header-form hide" style={{ display: `${display}` }}>
          <input type="text" list="companyname" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Companies" />
          <datalist id="companyname">
            {
              companies?.map((company) => {
                return <option value={company.CompanyName} />
              })
            }
          </datalist>
          <input type="text" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} placeholder="Location" list="cityname" />
          <datalist id="cityname">
            {
              companies?.map((company) => {
                return <option value={company.CompanyLocation} />
              })
            }
          </datalist>
          <button onClick={search}>Search</button>
          {
            token ? <a onClick={logout}>Logout<i class="fa-solid fa-right-from-bracket"></i></a> :
              <a onClick={(e) => navigate('/page02')}>Log in<i class="fa-solid fa-right-from-bracket"></i></a>
          }

        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Header;
