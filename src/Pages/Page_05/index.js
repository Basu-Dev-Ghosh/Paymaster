import React, { useState } from "react";
import Header03 from "../../Components/Header/Header";
import "./Main.css";
import applelogo from "../../assets/AppleLogo.png";
import Footer from "../../Components/Footer/Footer";
import StarRatings from "react-star-ratings";
const Index = () => {
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

  return (
    <>
      <Header03 />
      <div className="page5-container">
        <div className="page5-row1">
          <p>Find the company you want to review</p>
        </div>
        <div className="outer">
          <div className="page5-row2">
            <div className="row2-heading">
              <div className="image-section">
                <img src={applelogo} alt="Apple Logo" />
              </div>
              <div className="text-section">
                <div className="text-row1">
                  <h1>Apple</h1>
                  <p>Technology company</p>
                </div>
                <div className="text-row2">
                  <p>Cupertine, California, United states</p>
                </div>
              </div>
            </div>
            <div className="row2-input">
              <textarea placeholder="Write a review"></textarea>
            </div>
            <div className="row2-buttons">
              <i class="fa-regular fa-image"></i>
              <i class="fa-solid fa-square-plus"></i>
              <img src="" alt="" />
            </div>
          </div>
          <div className="page5-row3">
            <div className="page5-row3-col1">
              <p>On time payment</p>
              <p>Negotiation</p>
              <p>Responsive</p>
              <p>Ethical</p>
            </div>{" "}
            <div className="page5-row3-col2">
              <div className="stars">
                <StarRatings
                  changeRating={changeRating}
                  rating={rating.OnTimePayment}
                  starRatedColor="gold"
                  starDimension="25px"
                  numberOfStars={5}
                  starSpacing="2px"
                  starHoverColor="gold"
                  name="OnTimePayment"
                  className="starrating"
                />
              </div>
              <div className="stars">
                <StarRatings
                  changeRating={changeRating}
                  rating={rating.Negotiation}
                  starRatedColor="gold"
                  starDimension="25px"
                  numberOfStars={5}
                  starSpacing="2px"
                  starHoverColor="gold"
                  name="Negotiation"
                />
              </div>
              <div className="stars">
                <StarRatings
                  changeRating={changeRating}
                  rating={rating.Responsive}
                  starRatedColor="gold"
                  starDimension="25px"
                  numberOfStars={5}
                  starSpacing="2px"
                  starHoverColor="gold"
                  name="Responsive"
                />
              </div>
              <div className="stars">
                <StarRatings
                  changeRating={changeRating}
                  rating={rating.Ethical}
                  starRatedColor="gold"
                  starDimension="25px"
                  numberOfStars={5}
                  starSpacing="2px"
                  starHoverColor="gold"
                  name="Ethical"
                />
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
