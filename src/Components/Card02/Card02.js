import React from "react";
import "./Card02.css";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
const Card02 = ({ company }) => {
  const navigate = useNavigate();
  return (
    <div className="card page6-card" onClick={(e) => {
      navigate(`/page07/${company._id}`)
    }}>
      <div className="row1">
        <div className="logo">
          <img src={company?.CompanyLogo} alt="Company Logo" style={{ width: "60px" }} />
        </div>
        <div className="title">
          <h1>{company?.CompanyName}</h1>
        </div>
      </div>
      <div className="row2">
        <p>{company?.CompanyDescription}</p>
      </div>
      <div className="row3">
        <div className="row3-row1">
          <p>On time payement</p>
          <div className="ratings">
            <StarRatings
              rating={company?.OTP}
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
              rating={company?.Negotiation}
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
              rating={company?.Responsive}
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
              rating={company?.Ethical}
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
            rating={(company?.OTP + company?.Negotiation + company?.Responsive + company?.Ethical) / 4}
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
