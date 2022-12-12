import React, { useState, useEffect } from "react";
import "./LongCard.css";
import Avatar from "react-avatar";
import ProgressBar from "../ProgressBarHigh/ProgressBar";
import thumbsup from "../../assets/Path 4.svg";
import thumbsdown from "../../assets/Path 42.svg";
import ScreenShot from "../ScreenShotSliderModal/ScreenShot";
import { customStyles, star } from "../Card/Card";
import { useCallback } from "react";
import { serverLink } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Rating } from "@smastrom/react-rating";

const LongCard = ({ rating, isLoggedin, setShowWarningPopup, user }) => {
  const [display, setDisplay] = useState(false);
  const [ratingUser, setRatingUser] = useState({});
  const [newRatingLikes, setNewRatingLikes] = useState(rating.Likes);
  const [newRatingDisLikes, setNewRatingDisLikes] = useState(rating.Dislikes);
  const [ss, setSS] = useState([]);
  const [value, setValue] = useState(0);
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
  const setss = () => {
    setShowScrenShotsModal(true)
  }

  const like = async () => {
    if (!isLoggedin) {
      setShowWarningPopup(true);
    } else {
      try {

        const res = await axios.put(`${serverLink}/rating/like/${rating._id}`, {}, {
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
        const res = await axios.put(`${serverLink}/rating/dislike/${rating._id}`, {}, {
          withCredentials: true,
        })
        if (res.status === 202) {
          console.log(res.data);
          setNewRatingDisLikes([...newRatingDisLikes, user?._id])
        }
      } catch (err) {
        toast.warning("Rating Dislike failed")
      }
    }
  }
  console.log(newRatingDisLikes);



  return (
    <>
      <ScreenShot display={showScreenShotsModal} setShowScrenShotsModal={setShowScrenShotsModal} ss={rating?.Screenshots} />
      <div className="long-card">
        <div className="long-card-col1">
          <div className="user-info">
            <Avatar size="40" round name={ratingUser?.Name || ratingUser?.FirstName} />
            <div className="user-info-text">
              <p>{ratingUser?.Name || ratingUser?.FirstName}</p>
              <p>{newRatingLikes?.length + newRatingDisLikes?.length} Reviews</p>
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
              <div className="recommended-icon" style={!rating?.Recommendation ? { backgroundColor: "#D22424" } : { backgroundColor: "#17BF91" }}>
                {
                  rating?.Recommendation ? <img src={thumbsup} alt="thumbsup" /> : <img src={thumbsdown} style={{ color: "#fff" }} alt="thumbsup" />
                }

              </div>
              <div className="recommended-text">
                <p>Recommended</p>
                <p>POSTED {rating.Time.toUpperCase()}</p>
              </div>
              <div className="recommended-screenshots">
                {rating?.Screenshots?.length >= 3 ? (
                  <>
                    {ss?.map((s, index) => {
                      return <img src={s} style={{ cursor: "pointer" }} onClick={(e) => setShowScrenShotsModal(true)} key={index} alt="ScreenShot" />;
                    })}
                    <div className="see-more-ss" onClick={(e) => setShowScrenShotsModal(true)}>+4</div>
                  </>
                ) : (
                  <>
                    {rating?.Screenshots?.map((s, index) => {
                      return <img src={s} key={index} style={{ cursor: "pointer" }} onClick={setss} alt="Screenshot" />;
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
              {
                newRatingLikes?.includes(`${user._id}`) || newRatingDisLikes?.includes(user._id) ?
                  <p>You Reviewd this rating</p>
                  : <>
                    <p>Was this review helpful?</p>
                    <button className="yes-button" onClick={like}>Yes</button>
                    <button className="no-button" onClick={disLike}>No</button>
                  </>
              }


            </div>
            <div className="helpful-info">
              <p>
                <span>{newRatingLikes?.length} people</span> found this review helpful
              </p>
              <p>
                <span>{newRatingDisLikes?.length} people</span> found this review not helpful
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

    </>

  );
};

export default LongCard;
