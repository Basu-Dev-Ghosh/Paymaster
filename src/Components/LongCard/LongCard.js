import React, { useState, useEffect } from "react";
import "./LongCard.css";
import Avatar from "react-avatar";
import ProgressBar from "../ProgressBarHigh/ProgressBar";
import thumbsup from "../../assets/Path 4.svg";
import thumbsdown from "../../assets/Path 278.svg";
import ss from "../../assets/images.png";
import { customStyles, star } from "../Card/Card";
import { Rating } from "@smastrom/react-rating";
import { useCallback } from "react";
import { serverLink } from "../../App";
import axios from "axios";

const LongCard = ({ rating }) => {
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState({});
  const [ss, setSS] = useState([]);
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
    } catch (err) { }
  };
  const toggleshow = useCallback(() => {
    if (!display) setDisplay(true);
    else setDisplay(false);
  });

  useEffect(() => {
    getUserById();
    if (rating.Screenshots.length >= 3) {
      let arr = rating.Screenshots.slice(0, 2);
      setSS(arr);
    }
  }, [rating]);

  return (
    <div className="long-card">
      <div className="long-card-col1">
        <div className="user-info">
          <Avatar size="55" round name={user?.FirstName} />
          <div className="user-info-text">
            <p>{user?.FirstName}</p>
            <p>13 Reviews</p>
          </div>
        </div>
        <div className="rating-wheel">
          <ProgressBar value={value} />
        </div>
      </div>
      <div className="divider1" />
      <div className="long-card-col2">
        <div className="long-card-col2-row1">
          <div className="recommended">
            <div className="recommended-icon">
              {
                rating?.Recommendation ? <img src={thumbsup} alt="thumbsup" /> : <img src={thumbsdown} alt="thumbsup" />
              }

            </div>
            <div className="recommended-text">
              <p>Recommended</p>
              <p>POSTED {rating.Time.toUpperCase()}</p>
            </div>
            <div className="recommended-screenshots">
              {rating?.Screenshots.length >= 3 ? (
                <>
                  {ss?.map((s) => {
                    return <img src={s} alt="ScreenShot" />;
                  })}
                  <div className="see-more-ss">+4</div>
                </>
              ) : (
                <>
                  {rating?.Screenshots.map((s) => {
                    return <img src={s} alt="Screenshot" />;
                  })}
                </>
              )}
            </div>
          </div>
          <div className="review-text">
            <p>{rating?.Review}</p>
          </div>
        </div>
        <div className="divider2" />
        <div className="long-card-col2-row2">
          <div className="helpful-buttons">
            <p>Was this review helpful?</p>
            <button className="yes-button">Yes</button>
            <button className="no-button">No</button>
          </div>
          <div className="helpful-info">
            <p>
              <span>220 people</span> found this review helpful
            </p>
            <p>
              <span>15 people</span> found this review not helpful
            </p>
          </div>
        </div>
        <div className="show-more-icon" onClick={toggleshow}>
          {!display ? (
            <i class="fa-solid fa-angle-down"></i>
          ) : (
            <i class="fa-solid fa-angle-up"></i>
          )}
        </div>
        <div className="divider3" />
        <div
          className="long-card-col2-row2 long-card-col2-row3"
          style={!display ? { height: "0" } : { height: "auto" }}
        >
          <p className="rating-heading">Individual Rating Breakdown</p>
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
    </div>
  );
};

export default LongCard;
