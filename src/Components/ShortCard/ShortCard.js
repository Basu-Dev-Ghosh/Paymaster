import React, { useEffect } from "react";
import ProgressBar from "../ProgressBarLow/ProgressBar";
import "./ShortCard.css";
import { Rating } from "@smastrom/react-rating";
import { customStyles, star } from "../Card/Card";
import { useState } from "react";
import axios from "axios";
import { serverLink } from "../../App";
const ShortCard = ({ rating }) => {
  const [showMore, setShowMore] = useState(false);
  const [user, setUser] = useState({});
  const [value, setValue] = useState(0);
  const getUserById = async () => {
    try {
      const res = await axios.get(`${serverLink}/user/${rating.From}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setUser(res.data.user);
        setValue(
          ((rating?.OTP +
            rating?.Negotiation +
            rating?.Responsive +
            rating?.Ethical) /
            20) *
            100
        );
      }
    } catch (err) {}
  };

  useEffect(() => {
    getUserById();
  }, [rating]);
  return (
    <div className="short-card">
      <div className="short-card-row1">
        <div className="user-info">
          <ProgressBar value={value} />
          <div className="user-info-text">
            <p>{user?.FirstName}</p>
            <p>29 NOVEMBER 2022</p>
          </div>
        </div>
      </div>
      <div className="short-card-row2">
        <p>{rating?.Review}</p>
        <p onClick={(e) => setShowMore(!showMore)}>
          {showMore ? "Read Less" : "Read More"}
        </p>
      </div>
      <div className="short-card-row3">
        <div className="helpful-buttons">
          <p>Was this review helpful?</p>
          <button className="yes-button">Yes</button>
          <button className="no-button">No</button>
        </div>
        <div className="recommended-screenshots">
          {rating.Screenshots.length !== 0 && (
            <img src={rating?.Screenshots[0]} alt="ScreenShot" />
          )}
        </div>
      </div>
      <div
        className="short-card-row4"
        style={!showMore ? { height: "0" } : { height: "auto" }}
      >
        <p className="rating-heading">Rating Breakdown</p>
        <div className="individual-ratings">
          <div className="row3-row1">
            <p>On time payement</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 150 }}
                value={rating?.OTP}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="medium"
                spaceInside="small"
              />
            </div>
          </div>
          <div className="row3-row1">
            <p>Negotiation</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 150 }}
                value={rating?.Negotiation}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="medium"
                spaceInside="small"
              />
            </div>
          </div>
          <div className="row3-row1">
            <p>Responsive</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 150 }}
                value={rating?.Responsive}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="medium"
                spaceInside="small"
              />
            </div>
          </div>
          <div className="row3-row1">
            <p>Ethical</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 150 }}
                value={rating?.Ethical}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="medium"
                spaceInside="small"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortCard;
