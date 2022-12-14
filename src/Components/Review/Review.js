import React, { useEffect, useState } from "react";
import LongCard from "../LongCard/LongCard";
import ShortCard from "../ShortCard/ShortCard";
import "./Review.css";

const Review = ({ ratings, isLoggedin, setShowWarningPopup, user }) => {
  const [rating1, setRating1] = useState([]);
  const [rating2, setRating2] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [filterRatings, setFilterRatings] = useState([]);

  useEffect(() => {
    if (ratings.length > 1) {
      let halflength = ratings.length / 2;
      const arr1 = ratings.slice(0, halflength);
      const arr2 = ratings.slice(halflength, ratings.length);
      setRating1(arr1);
      setRating2(arr2);
    } else if (ratings.length === 1) {
      setRating1(ratings);
    }
  }, [ratings]);

  const filterReview = (e) => {
    switch (e.target.value) {
      case "positive":
        const filteredArr = ratings.filter((rating) => {
          return rating.Recommendation === true
        })
        setFilterRatings([...filteredArr])
        console.log(filterRatings);
        setFilterMode(true);
        break;
      case "negative":
        const filteredArr2 = ratings.filter((rating) => {
          return rating.Recommendation === false
        })
        setFilterRatings(filteredArr2)
        setFilterMode(true);
        break;
      case "all":
        setFilterMode(false)
        break;

      default:
        break;
    }

  }

  return (
    <div className="search-result-box review-box">
      <div className="search-result-box-header review-box-header">
        <div className="review-total-text">
          <p>Overall Reviews</p>
          <p>
            Very Positive<span>({ratings?.length || '0'} Reviews)</span>
          </p>
        </div>
        <div className="dropdowns">
          <div className="dropdown-div">
            <select className="dropdown" onChange={filterReview}>
              <option value="all" selected >
                All
              </option>
              <option value="positive" >Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          <div className="dropdown-div">
            <select className="dropdown">
              <option value="" disabled selected hidden>
                Lifetime
              </option>
              <option value="75-100">75-100%</option>
              <option value="50-75">50-75%</option>
              <option value="25-50">25-50%</option>
              <option value="0-25">0-25%</option>
            </select>
          </div>
        </div>
      </div>
      <div className="search-result-box-content review-box-content">
        {ratings.length === 0 ? (
          <h1>No reviews</h1>
        ) : !filterMode ? (

          <>
            <div className="long-cards">
              {rating1?.map((rating, index) => {
                return <LongCard rating={rating} key={index} isLoggedin={isLoggedin} setShowWarningPopup={setShowWarningPopup} user={user} />;
              })}
            </div>
            <div className="short-cards">
              {rating2?.map((rating, index) => {
                return <ShortCard rating={rating} key={index} isLoggedin={isLoggedin} setShowWarningPopup={setShowWarningPopup} user={user} />;
              })}
            </div>
          </>
        ) : (
          <>
            <div className="long-cards">
              {filterRatings?.map((rating, index) => {
                return <LongCard rating={rating} key={index} isLoggedin={isLoggedin} setShowWarningPopup={setShowWarningPopup} user={user} />;
              })}
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Review;
