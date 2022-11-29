import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header03 from "../../Components/Header_03/Header03";
import "./Main.css";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { serverLink } from "../../App";
import Loader from "../../Components/Loader/Loader";
const Index = () => {
  const { id } = useParams();
  const [screenshots, setScreenShots] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [review, setReview] = useState("");
  const [company, setCompany] = useState();
  const [rating, setRating] = useState({
    OnTimePayment: 0,
    Negotiation: 0,
    Responsive: 0,
    Ethical: 0,
  });
  const changeRating = (newRating, name) => {
    setRating((old) => {
      return { ...old, [name]: newRating };
    });
  };

  const getCompanyById = async () => {
    try {
      const res = await axios.get(`${serverLink}/company/${id}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setCompany(res.data.company);
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
      try {
        setShowLoader(true);
        const res = await axios.post(
          `${serverLink}/rating/create`,
          {
            Review: review,
            Ratings: rating,
            Screenshots: screenshots,
            Companyid: id,
          },
          { withCredentials: true }
        );
        if (res.status === 201) {
          toast.success(res.data.Messege, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setReview("");
          setRating({
            OnTimePayment: 0,
            Negotiation: 0,
            Responsive: 0,
            Ethical: 0,
          });
          setScreenShots([]);
          setShowLoader(false);
        }
      } catch (err) {
        setShowLoader(false);
        toast.error(err.response.data.Messege, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
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

  useEffect(() => {
    setShowLoader(true);
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
          <div className="page5-container">
            <div className="page5-row1">
              <p>Find the company you want to review</p>
            </div>
            <div className="outer">
              <div className="page5-row2">
                <div className="row2-heading">
                  <div className="image-section">
                    <img src={company?.CompanyLogo} alt="Company Logo" />
                  </div>
                  <div className="text-section">
                    <div className="text-row1">
                      <h1>{company?.CompanyName}</h1>
                      <p>{company?.CompanyDescription}</p>
                    </div>
                    <div className="text-row2">
                      <p>{company?.CompanyLocation}</p>
                    </div>
                  </div>
                </div>
                <div className="row2-input">
                  <textarea
                    placeholder="Write a review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </div>
                <div className="row2-buttons">
                  {screenshots.length === 0 ? (
                    <i class="fa-regular fa-image"></i>
                  ) : (
                    screenshots.map((sc) => {
                      return (
                        <img
                          src={sc}
                          alt="Screenshots"
                          srcset=""
                          width={50}
                          height={50}
                          style={{ marginRight: "17px" }}
                        />
                      );
                    })
                  )}

                  <label htmlFor="screenshot">
                    <i class="fa-solid fa-square-plus"></i>
                  </label>
                  <input
                    type="file"
                    onChange={handleImage}
                    style={{ width: "0" }}
                    id="screenshot"
                  />
                  <button className="submit-button" onClick={AddRating}>
                    Submit
                  </button>
                </div>
              </div>
              <div className="page5-row3">
                <div className="page5-row3-col1">
                  <p>On time payment</p>
                  <p>Negotiation</p>
                  <p>Responsive</p>
                  <p>Ethical</p>
                </div>
                <div className="page5-row3-col2">
                  <div className="stars">
                    <StarRatings
                      changeRating={changeRating}
                      rating={rating.OnTimePayment}
                      starRatedColor="orange"
                      starDimension="20px"
                      numberOfStars={5}
                      starSpacing="2px"
                      starHoverColor="orange"
                      name="OnTimePayment"
                      className="starrating"
                    />
                  </div>
                  <div className="stars">
                    <StarRatings
                      changeRating={changeRating}
                      rating={rating.Negotiation}
                      starRatedColor="orange"
                      starDimension="20px"
                      numberOfStars={5}
                      starSpacing="2px"
                      starHoverColor="orange"
                      name="Negotiation"
                    />
                  </div>
                  <div className="stars">
                    <StarRatings
                      changeRating={changeRating}
                      rating={rating.Responsive}
                      starRatedColor="orange"
                      starDimension="20px"
                      numberOfStars={5}
                      starSpacing="2px"
                      starHoverColor="orange"
                      name="Responsive"
                    />
                  </div>
                  <div className="stars">
                    <StarRatings
                      changeRating={changeRating}
                      rating={rating.Ethical}
                      starRatedColor="orange"
                      starDimension="20px"
                      numberOfStars={5}
                      starSpacing="2px"
                      starHoverColor="orange"
                      name="Ethical"
                    />
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
          <Footer />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default Index;
