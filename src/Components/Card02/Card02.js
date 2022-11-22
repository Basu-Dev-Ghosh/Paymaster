import React from "react";
import "./Card02.css";
import applelogo from "../../assets/AppleLogo.png";
import StarRatings from "react-star-ratings";
const Card02 = () => {
  return (
    <div className="card page6-card">
      <div className="row1">
        <div className="logo">
          <img src={applelogo} alt="AppleLogo" style={{ width: "60px" }} />
        </div>
        <div className="title">
          <h1>Apple</h1>
        </div>
      </div>
      <div className="row2">
        <p>Technology Company</p>

        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className="row3">
        <div className="row3-row1">
          <p>On time payement</p>
          <div className="ratings">
            <StarRatings
              rating={4.5}
              starRatedColor="orange"
              starDimension="10px"
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
              starDimension="10px"
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
              starDimension="10px"
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
              starDimension="10px"
              numberOfStars={5}
              starSpacing="0px"
              name="rating"
            />
          </div>
        </div>
      </div>
      <div className="row4">
        <div className="ratings">
          <StarRatings
            rating={4.5}
            starRatedColor="orange"
            starDimension="28px"
            numberOfStars={5}
            starSpacing="0px"
            name="rating"
          />
        </div>
      </div>
    </div>
  );
};

export default Card02;
