import React from "react";
import "./Card.css";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
const Card = ({ company }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card" onClick={(e) => navigate(`/page06/${company._id}`)}>
        <div className="row1">
          <div className="logo">
            <img src={company?.CompanyLogo} alt="AppleLogo" />
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
                rating={company?.OTP || 0}
                starRatedColor="gold"
                starDimension="12px"
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
                rating={company?.Negotiation || 0}
                starRatedColor="gold"
                starDimension="12px"
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
                rating={company?.Responsive || 0}
                starRatedColor="gold"
                starDimension="12px"
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
                rating={company?.Ethical || 0}
                starRatedColor="gold"
                starDimension="12px"
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
              rating={(company?.OTP +
                company?.Negotiation +
                company?.Responsive +
                company?.Ethical) /
                4 || 0}
              starRatedColor="gold"
              starDimension="22px"
              numberOfStars={5}
              starSpacing="0px"
              name="rating"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
