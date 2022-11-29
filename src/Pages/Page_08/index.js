import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Main.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
const Index = () => {
  const { name, location } = useParams();
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const getCompaniesByName = async () => {
    try {
      setShowLoader(true)
      const res = await axios.get(`${serverLink}/company/${name}/${location}`, { withCredentials: true })
      if (res.status === 202) {
        setCompanies(res.data.company)
        setShowLoader(false)
      }
    } catch (err) {
      setShowLoader(false)
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

  useEffect(() => {
    getCompaniesByName();
  }, [name, location]);
  return (
    <>{
      showLoader ? <Loader /> : (<>
        <Header setShowLoader={setShowLoader} />
        <div className="page08-container">
          <h1>Search results for {name === "_" ? location : name}</h1>
          <div className="search-results">
            {companies.length !== 0 ? (
              <div className="cards">
                {
                  companies?.map((company) => {
                    return <Card company={company} />
                  })
                }
              </div>
            ) : (
              <div className="notfound-text">
                <h1>No results found!</h1>
                <button onClick={(e) => navigate('/page09')}>Add a new one</button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>)
    }

      <ToastContainer />
    </>
  );
};

export default Index;
