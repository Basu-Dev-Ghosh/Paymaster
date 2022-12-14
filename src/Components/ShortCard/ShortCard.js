import React, { useEffect } from "react";
import ProgressBar from "../ProgressBarLow/ProgressBar";
import "./ShortCard.css";
import { Rating } from "@smastrom/react-rating";
import { customStyles, star } from "../Card/Card";
import { useState } from "react";
import ScreenShot from "../ScreenShotSliderModal/ScreenShot";
import axios from "axios";
import { serverLink } from "../../App";
import { toast } from "react-toastify";
const ShortCard = ({ rating, isLoggedin, setShowWarningPopup, user }) => {
  const [showMore, setShowMore] = useState(false);
  const [ratingUser, setRatingUser] = useState({});
  const [value, setValue] = useState(0);
  const [newRatingLikes, setNewRatingLikes] = useState(rating.Likes);
  const [newRatingDisLikes, setNewRatingDisLikes] = useState(rating.Dislikes);
  const [showScreenShotsModal, setShowScrenShotsModal] = useState(false);
  const getUserById = async () => {
    try {
      const res = await axios.get(`${serverLink}/user/${rating.From}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setRatingUser(res.data.user);
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

  const like = async () => {
    if (!isLoggedin) {
      setShowWarningPopup(true);
    } else {
      try {

        const res = await axios.get(`${serverLink}/rating/like/${rating._id}`, {
          withCredentials: true,
        })
        if (res.status === 202) {

          setNewRatingLikes([...newRatingLikes, user?._id])

        }
      } catch (err) {
        toast.warning("Rating like failed")
      }
    }
  }

  const disLike = async () => {

    if (!isLoggedin) {
      setShowWarningPopup(true);
    } else {
      try {
        const res = await axios.get(`${serverLink}/rating/dislike/${rating._id}`, {
          withCredentials: true,
        })
        if (res.status === 202) {
          setNewRatingDisLikes([...newRatingDisLikes, user?._id])
        }
      } catch (err) {
        toast.warning("Rating Dislike failed")
      }
    }
  }












  useEffect(() => {
    getUserById();
  }, [rating]);
  return (
    <>
      <ScreenShot display={showScreenShotsModal} setShowScrenShotsModal={setShowScrenShotsModal} ss={rating?.Screenshots} />
      <div className="short-card">
        <div className="short-card-row1">
          <div className="user-info">
            <ProgressBar value={value} />
            <div className="user-info-text">
              <p>{ratingUser?.Name || ratingUser?.FirstName}</p>
              <p>{rating?.Time?.toUpperCase}</p>
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
            {
              newRatingLikes?.includes(user?._id) || newRatingDisLikes?.includes(user?._id) ?
                <p>You Reviewd this rating</p>
                : <>
                  <p>Was this review helpful?</p>
                  <button className="yes-button" onClick={like}>Yes</button>
                  <button className="no-button" onClick={disLike}>No</button>
                </>
            }
          </div>
          <div className="recommended-screenshots">
            {rating?.Screenshots?.length !== 0 && (
              <img src={rating?.Screenshots[0]} onClick={(e) => setShowScrenShotsModal(true)} alt="ScreenShot" />
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
    </>
  );
};

export default ShortCard;
