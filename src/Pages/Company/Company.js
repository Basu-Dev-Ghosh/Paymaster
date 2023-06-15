import React, { useState, useEffect } from "react";
import NewHeader2 from "../../Components/NewHeader2/NewHeader2";
import "./Company.css";
import ProgressBar from "../../Components/ProgressBarHigh/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import { customStyles, star } from "../../Components/Card/Card";
import { Rating } from "@smastrom/react-rating";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../../App";
import Loader from "../../Components/Loader/Loader";
import Review from "../../Components/Review/Review";
import Footer from "../../Components/Footer/Footer";
import WarningModal from "../../Components/WarningModal/WarningModal";
import RateFormModal from "../../Components/RateFormModal/RateFormModal";
import ScreenShot from "../../Components/ScreenShotSliderModal/ScreenShot";
import CongratsModal from "../../Components/CongratsModal/CongratsModal";

const Company = () => {
  const { id } = useParams();
  const [company, setCompany] = useState();
  const [value, setValue] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [user, setUser] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userRated, setUserRated] = useState(false)
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showRateFormModal, setShowRateFormModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const navigate = useNavigate();

  const getCompanyById = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${serverLink}/company/${id}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setCompany(res.data.company);
        setValue(
          ((res.data.company.OTP +
            res.data.company.Negotiation +
            res.data.company.Responsive +
            res.data.company.Ethical) /
            20) *
          100
        );
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
        setRatings(res.data.ratings.reverse());
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
  function capitalize(word) {
    return word
      ?.split("")
      ?.map((letter, index) =>
        index ? letter.toLowerCase() : letter.toUpperCase()
      )
      .join("");
  }

  const rate = async () => {
    if (!isLoggedin) {
      setShowWarningPopup(true);
    } else {
      setShowRateFormModal(true);
    }
  };
  const checkUserIsRated = async () => {
    try {
      const res = await axios.get(`${serverLink}/rating/israted/${id}`, { withCredentials: true })
      if (res.status === 202) {
        setUserRated(true)
      }
    } catch (err) {
      setUserRated(false)
    }
  }











  useEffect(() => {
    getCompanyById();
    getRatingsByCompanyId();

  }, []);

  useEffect(() => {
    if (user) {
      checkUserIsRated();
    }
  }, [user])


  return (
    <>
      <WarningModal
        display={showWarningPopup}
        setShowWarningPopup={setShowWarningPopup}
      />
      <RateFormModal
        display={showRateFormModal}
        setShowRateFormModal={setShowRateFormModal}
        company={company}
        setShowCongratsModal={setShowCongratsModal}
        setUserRated={setUserRated}
      />
      <CongratsModal
        display={showCongratsModal}
        setShowCongratsModal={setShowCongratsModal}
      />

      {showLoader ? (
        <Loader />
      ) : (
        <div
          style={
            showWarningPopup || showRateFormModal || showCongratsModal
              ? { filter: "blur(5px)" }
              : { filter: "blur(0px)" }
          }
        >
          <NewHeader2
            setShowLoader={setShowLoader}
            setUser={setUser}
            setIsLoggedin={setIsLoggedin}
          />
          <div className="landing-container company-landing-container">
            <div className="company-info">
              <div className="company-info-row1">
                <div className="logo-circle">
                  <img src={company?.CompanyLogo} alt="Logo" />
                </div>
                <div className="info-text">
                  <p>{capitalize(company?.CompanyName)}</p>
                  <a href={company?.CompanyUrl} target='_blank'>{company?.CompanyUrl}</a>
                  <p>{company?.CompanyDescription}</p>
                </div>
              </div>
              <div className="company-info-row2">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime tempora laboriosam alias ipsum ab enim placeat sunt,
                  fugit dolorem unde nostrum? Nemo optio velit explicabo?Lorem
                  ipsum dolor, sit amet consectetur
                </p>
              </div>
            </div>
            <div className="company-score">
              <div className="company-score-row1">
                <ProgressBar value={value} />
                <div className="company-score-row2">
                  <p>Overall score</p>
                  {
                    userRated ? <button style={{ backgroundColor: "green", color: "#fff" }}>Rated</button> : <button onClick={rate}>Rate</button>
                  }
                </div>
              </div>

            </div>
          </div>
          <div className="top-companies top-ratings">
            <div className="rating-box">
              <p>On time payment</p>
              <Rating
                style={{ maxWidth: 80 }}
                value={Math.floor(company?.OTP)}
                readOnly
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>{" "}
            <div className="rating-box">
              <p>Negotiation</p>
              <Rating
                style={{ maxWidth: 80 }}
                value={Math.floor(company?.Negotiation)}
                readOnly
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>{" "}
            <div className="rating-box">
              <p>Responsive</p>
              <Rating
                style={{ maxWidth: 80 }}
                value={Math.floor(company?.Responsive)}
                readOnly
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>
            <div className="rating-box">
              <p>Ethical</p>
              <Rating
                style={{ maxWidth: 80 }}
                value={Math.floor(company?.Ethical)}
                readOnly
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>{" "}
          </div>
          <Review ratings={ratings} isLoggedin={isLoggedin} setShowWarningPopup={setShowWarningPopup} user={user} />
          <Footer />
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Company;
