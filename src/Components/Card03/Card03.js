import React from "react";
import "./Card03.css";
import applelogo from "../../assets/AppleLogo.png";
import ss from "../../assets/ScreenShot.jpeg";
import StarRatings from "react-star-ratings";
const Card03 = () => {
  return (
    <div className="card03">
      <div className="card03-col1">
        <div className="col1-row1">
          <img src={applelogo} alt="logo" />
          <h1>Andrew</h1>
          <p>Brand Moustache</p>
        </div>
        <div className="col1-row2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis quasi, obcaecati corporis nesciunt eveniet sunt numquam
            ipsam, nobis voluptatum fugit
          </p>
        </div>
        <div className="col1-row3">
          <div className="screenshots">
            <img src={ss} alt="ScreenShot" />
            <img src={ss} alt="ScreenShot" />
            <img src={ss} alt="ScreenShot" />
            <img src={ss} alt="ScreenShot" />
          </div>
        </div>
      </div>
      <div className="card03-col2">
        <div className="col2-row1">
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

        <div className="col2-row2 side-row3">
          <div className="side-row3-col1">
            <p>On time payment</p>
            <p>Negotiation</p>
            <p>Responsive</p>
            <p>Ethical</p>
          </div>
          <div className="side-row3-col2">
            <div className="stars">
              <StarRatings
                rating={4.5}
                starRatedColor="orange"
                starDimension="14px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
            <div className="stars">
              <StarRatings
                rating={3.5}
                starRatedColor="orange"
                starDimension="14px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
            <div className="stars">
              <StarRatings
                rating={2.5}
                starRatedColor="orange"
                starDimension="14px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
            <div className="stars">
              <StarRatings
                rating={2}
                starRatedColor="orange"
                starDimension="14px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card03;
