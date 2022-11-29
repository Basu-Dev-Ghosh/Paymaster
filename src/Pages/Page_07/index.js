import React, { useEffect, useState } from "react";
import "./Main.css";
import StarRatings from "react-star-ratings";
import Header03 from "../../Components/Header_03/Header03";
import Card03 from "../../Components/Card03/Card03";
import Footer from "../../Components/Footer/Footer";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { serverLink } from "../../App";
import { useParams } from "react-router-dom";

const Index = () => {
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [company, setCompany] = useState();
  const [ratings, setRatings] = useState([]);

  const getCompanyById = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${serverLink}/company/${id}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setCompany(res.data.company);
        setShowLoader(false);
      }
    } catch (err) {
      setShowLoader(false);
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

  const getRatingsByCompanyId = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${serverLink}/rating/${id}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setRatings(res.data.ratings);
        setShowLoader(false);
      }
    } catch (err) {
      setShowLoader(false);
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
    setShowLoader(true)
    getCompanyById();
    getRatingsByCompanyId();
    setShowLoader(false)
  }, [id]);





  return (
    <>{
      showLoader ? <Loader /> : (<>
        <Header03 setShowLoader={setShowLoader} />
        <div className="page07-container">
          <div className="upper">
            <div className="upper-row1 row2-heading">
              <div className="image-section">
                <img src={company?.CompanyLogo} alt="Company Logo" />
              </div>
              <div className="text-section">
                <div className="text-row1">
                  <h1 style={{ color: "#fff" }}>{company?.CompanyName}</h1>
                  <p style={{ color: "#fff" }}>{company?.CompanyDescription}</p>
                </div>
                <div className="text-row2">
                  <p style={{ color: "#fff" }}>
                    {company?.CompanyLocation}
                  </p>
                </div>
              </div>
              <div className="stars">
                <StarRatings
                  rating={
                    (company?.OTP +
                      company?.Negotiation +
                      company?.Responsive +
                      company?.Ethical) /
                    4 || 0
                  }
                  starRatedColor="orange"
                  starDimension="32px"
                  numberOfStars={5}
                  starSpacing="4px"
                  name="rating"
                />
              </div>
            </div>

            <div className="upper-row2">
              <div className="row3-row1">
                <p>On time payement</p>
                <div className="ratings">
                  <StarRatings
                    rating={company?.OTP}
                    starRatedColor="orange"
                    starDimension="15px"
                    numberOfStars={5}
                    starSpacing="0px"
                    name="rating"
                  />
                </div>
              </div>
              <div className="row3-row1">
                <p>Negotiation</p>
                <div className="ratings">
                  <StarRatings
                    rating={company?.Negotiation}
                    starRatedColor="orange"
                    starDimension="15px"
                    numberOfStars={5}
                    starSpacing="0px"
                    name="rating"
                  />
                </div>
              </div>
              <div className="row3-row1">
                <p>Responsive</p>
                <div className="ratings">
                  <StarRatings
                    rating={company?.Responsive}
                    starRatedColor="orange"
                    starDimension="15px"
                    numberOfStars={5}
                    starSpacing="0px"
                    name="rating"
                  />
                </div>
              </div>
              <div className="row3-row1">
                <p>Ethical</p>
                <div className="ratings">
                  <StarRatings
                    rating={company?.Ethical}
                    starRatedColor="orange"
                    starDimension="15px"
                    numberOfStars={5}
                    starSpacing="0px"
                    name="rating"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lower">
            {
              ratings.length === 0 ? <h3 >No ratings available</h3> : ratings.map((rating, index) => {
                return <Card03 rating={rating} key={index} />
              })
            }
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
