import React from "react";
import "./Main.css";
import applelogo from "../../assets/AppleLogo.png";
import StarRatings from "react-star-ratings";
import Header03 from "../../Components/Header_03/Header03";
import Card03 from "../../Components/Card03/Card03";
import Footer from "../../Components/Footer/Footer";
const Index = () => {
  return (
    <>
      <Header03 />
      <div className="page07-container">
        <div className="upper">
          <div className="upper-row1 row2-heading">
            <div className="image-section">
              <img src={applelogo} alt="Apple Logo" />
            </div>
            <div className="text-section">
              <div className="text-row1">
                <h1 style={{ color: "#fff" }}>Apple</h1>
                <p style={{ color: "#fff" }}>Technology company</p>
              </div>
              <div className="text-row2">
                <p style={{ color: "#fff" }}>
                  Cupertine, California, United states
                </p>
              </div>
            </div>
            <div className="stars">
              <StarRatings
                rating={4}
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
                  rating={4.5}
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
                  rating={4.5}
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
                  rating={4.5}
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
                  rating={4.5}
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
          <Card03 />
          <Card03 />
          <Card03 />
          <Card03 />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
