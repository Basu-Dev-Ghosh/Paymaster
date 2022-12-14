import React, { useState } from "react";
import "./RateFormModal.css";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo2.png";
import gallery from "../../assets/gallery.svg";
import { Rating } from "@smastrom/react-rating";
import thumbsup from "../../assets/Path 5.svg";
import thumbsdown from "../../assets/Path 278.svg";
import axios from "axios";
import Loader from "../Loader/Loader";
import { serverLink } from "../../App";
import { useNavigate } from "react-router-dom";

export const Star = (
  <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
);

export const customStyles = {
  itemShapes: Star,
  boxBorderWidth: 0,

  activeFillColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
  activeBoxColor: ["#DE3767", "#DE3767", "#DE3767", "#DE3767", "#DE3767"],
  activeBoxBorderColor: ["#DE3767", "#DE3767", "#DE3767", "#DE3767", "#DE3767"],

  inactiveFillColor: "#fff",
  inactiveBoxColor: "#E3E3E3",
  inactiveBoxBorderColor: "#fff",
};
const RateFormModal = ({
  display,
  setShowRateFormModal,
  company,
  setShowCongratsModal,
  setUserRated,
}) => {
  const [OnTimePayment, setOnTimePayment] = useState(0);
  const [Negotiation, setNegotiation] = useState(0);
  const [Responsive, setResponsive] = useState(0);
  const [Ethical, setEthical] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [recommendation, setRecommendation] = useState(false);
  const [screenshots, setScreenShots] = useState([]);
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const handleImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "paymaster");
    data.append("cloud_name", "basustudent");
    try {
      setShowLoader(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/basustudent/image/upload",
        data
      );
      const dat = res.data;
      setScreenShots((old) => {
        return [...old, dat.secure_url];
      });
      setShowLoader(false);
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

  const AddRating = async () => {
    if (review) {
      const today = new Date();
      const dat = today.getDate();
      const td = today.toLocaleString("default", { month: "long" });
      const year = today.getFullYear();
      const date = dat + " " + td + " " + year;
      try {
        setShowLoader(true);
        const res = await axios.post(
          `${serverLink}/rating/create`,
          {
            Review: review,
            Ratings: { OnTimePayment, Negotiation, Responsive, Ethical },
            Screenshots: screenshots,
            Companyid: company._id,
            Recommendation: recommendation,
            Time: date,
          },
          { withCredentials: true }
        );
        if (res.status === 201) {
          setUserRated(true);
          setReview("");
          setOnTimePayment(0);
          setNegotiation(0);
          setResponsive(0);
          setEthical(0);
          setScreenShots([]);
          setShowRateFormModal(false);
          setShowCongratsModal(true);
          setShowLoader(false);
        }
      } catch (err) {
        setShowLoader(false);

        setTimeout(() => {
          toast.error(err.response.data.Messege, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }, 100);
      }
    } else {
      toast.warning("Please add a review", {
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

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div
          className="rate-form-modal"
          style={!display ? { display: "none" } : { display: "block" }}
        >
          <i
            class="fa-solid fa-circle-xmark cross"
            onClick={(e) => setShowRateFormModal(false)}
          ></i>
          <div className="rate-form-header">
            <div className="rate-form-logo">
              <img src={company?.CompanyLogo} alt="Logo" />
            </div>
            <div className="rate-form-logo-text">
              <p>{company?.CompanyName}</p>
              <p>{company?.CompanyDescription}</p>
            </div>
          </div>
          <div className="rate-form-review">
            <div className="rate-form-input-text">
              <textarea
                placeholder="Write your review..."
                rows="4"
                onChange={(e) => setReview(e.target.value)}
                value={review}
                required
              ></textarea>
            </div>
            <label className="rate-form-input-image" htmlFor="imageinput">
              <input
                type="file"
                onChange={handleImage}
                id="imageinput"
                style={{ width: "0" }}
              />
              <img src={gallery} alt="" />
              <p>
                {screenshots.length === 0
                  ? "Add single or multiple images"
                  : `${screenshots.length} photo selected`}
              </p>
            </label>
          </div>
          <div className="rate-form-rating">
            <div className="rate-form-ratings">
              <p>On time payment</p>
              <Rating
                style={{ maxWidth: 130 }}
                value={OnTimePayment}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="medium"
                spaceInside="small"
                onChange={setOnTimePayment}
              />
            </div>

            <div className="rate-form-ratings">
              <p>Negotiation</p>
              <Rating
                style={{ maxWidth: 130 }}
                value={Negotiation}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="medium"
                spaceInside="small"
                onChange={setNegotiation}
              />
            </div>
            <div className="rate-form-ratings">
              <p>Responsive</p>
              <Rating
                style={{ maxWidth: 130 }}
                value={Responsive}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="medium"
                spaceInside="small"
                onChange={setResponsive}
              />
            </div>
            <div className="rate-form-ratings">
              <p>Ethical</p>
              <Rating
                style={{ maxWidth: 130 }}
                value={Ethical}
                itemStyles={customStyles}
                radius="full"
                onChange={setEthical}
                spaceBetween="medium"
                spaceInside="small"
              />
            </div>
          </div>
          <div className="rate-form-button">
            <div className="rate-form-recommended">
              <p>Do you recommend This?</p>
              <div className="recommended-buttons">
                <button
                  className="thumbsup"
                  onClick={(e) => setRecommendation(true)}
                  style={
                    recommendation
                      ? { backgroundColor: "rgb(9, 87, 94)", color: "#fff" }
                      : { backgroundColor: "#fff" }
                  }
                >
                  <img src={thumbsup} alt="thumbsup" />
                  Yes
                </button>
                <button
                  className="thumbsdown"
                  style={
                    !recommendation
                      ? { backgroundColor: "rgb(94, 18, 9)", color: "#fff" }
                      : { backgroundColor: "#fff" }
                  }
                  onClick={(e) => setRecommendation(false)}
                >
                  <img src={thumbsdown} alt="thumbsup" />
                  No
                </button>
              </div>
            </div>

            <div className="rate-form-submit">
              <button onClick={AddRating}>Post Review</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default RateFormModal;
