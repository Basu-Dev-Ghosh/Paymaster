import React, { useState, useEffect } from "react";
import "./Main.css";
import Header03 from "../../Components/Header_03/Header03";
import applelogo from "../../assets/AppleLogo.png";
import StarRatings from "react-star-ratings";
import Card02 from "../../Components/Card02/Card02";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../../App";
import Loader from "../../Components/Loader/Loader";
const Index = () => {
  const { id } = useParams();
  const [company, setCompany] = useState();
  const [companies, setCompanies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const getCompanyById = async () => {
    try {
      const res = await axios.get(`${serverLink}/company/${id}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        console.log(res.data.company);
        setCompany(res.data.company);
        console.log(company);
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
  const getCompanies = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${serverLink}/company`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        let cmps = res.data.companies.filter((c) => {
          return c._id !== id;
        });
        setCompanies(cmps);
        setShowLoader(false);
      }
    } catch (err) {}
  };
  useEffect(() => {
    setShowLoader(true);
    getCompanies();
    getCompanyById();
    setShowLoader(false);
  }, []);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <Header03 setShowLoader={setShowLoader} />
          <div className="page06-container">
            <div className="side-section">
              <div className="side-row1">
                <img src={company?.CompanyLogo} alt="Apple Logo" />
                <h1>{company?.CompanyName}</h1>
              </div>
              <div className="side-row2">
                <h6>Lorem ipsum dolor sit amet, consectetur.</h6>
              </div>
              <div className="side-row3">
                <div className="side-row3-col1">
                  <p>On time payment</p>
                  <p>Negotiation</p>
                  <p>Responsive</p>
                  <p>Ethical</p>
                </div>
                <div className="side-row3-col2">
                  <div className="stars">
                    <StarRatings
                      rating={company?.OTP || 0}
                      starRatedColor="gold"
                      starDimension="12px"
                      numberOfStars={5}
                      starSpacing="4px"
                      name="rating"
                    />
                  </div>
                  <div className="stars">
                    <StarRatings
                      rating={company?.Negotiation || 0}
                      starRatedColor="gold"
                      starDimension="12px"
                      numberOfStars={5}
                      starSpacing="4px"
                      name="rating"
                    />
                  </div>
                  <div className="stars">
                    <StarRatings
                      rating={company?.Responsive || 0}
                      starRatedColor="gold"
                      starDimension="12px"
                      numberOfStars={5}
                      starSpacing="4px"
                      name="rating"
                    />
                  </div>
                  <div className="stars">
                    <StarRatings
                      rating={company?.Ethical || 0}
                      starRatedColor="gold"
                      starDimension="12px"
                      numberOfStars={5}
                      starSpacing="4px"
                      name="rating"
                    />
                  </div>
                </div>
              </div>
              <div className="side-row4">
                <p>{company?.CompanyDescription}</p>
              </div>
              <div className="side-row5">
                <div className="stars">
                  <StarRatings
                    rating={
                      (company?.OTP +
                        company?.Negotiation +
                        company?.Responsive +
                        company?.Ethical) /
                        4 || 0
                    }
                    starRatedColor="gold"
                    starDimension="34px"
                    numberOfStars={5}
                    starSpacing="4px"
                    name="rating"
                  />
                </div>
                <button
                  className="rate-button"
                  onClick={(e) => navigate(`/page05/${id}`)}
                >
                  Rate
                </button>
                <button
                  className="rate-button"
                  onClick={(e) => navigate(`/page07/${id}`)}
                >
                  View Ratings
                </button>
              </div>
            </div>

            {showLoader ? (
              <Loader />
            ) : (
              <div className="main-section">
                {companies?.map((company) => {
                  return <Card02 company={company} />;
                })}
              </div>
            )}
          </div>
          <Footer />
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default Index;
