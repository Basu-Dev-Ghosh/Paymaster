import React, { useState, useEffect } from "react";
import "./Card03.css";
import applelogo from "../../assets/AppleLogo.png";
import ss from "../../assets/ScreenShot.jpeg";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { serverLink } from "../../App";
import Avatar from 'react-avatar';
const Card03 = ({ rating }) => {
  const [user, setUser] = useState({});
  const getUserById = async () => {
    try {

      const res = await axios.get(`${serverLink}/user/${rating.From}`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setUser(res.data.user);

      }
    } catch (err) {


    }
  };




  useEffect(() => {
    getUserById();
  }, [rating]);
  return (
    <div className="card03">
      <div className="card03-col1">
        <div className="col1-row1">
          <Avatar name={user.FirstName} size="70" />
          <h1>{`${user.FirstName} ${user.LastName}`}</h1>
          <p>{user.CompanyName}</p>
        </div>
        <div className="col1-row2">
          <p>
            {
              rating.Review
            }
          </p>
        </div>
        <div className="col1-row3">
          <div className="screenshots">
            {
              rating.Screenshots.map((ss) => {
                return <img src={ss} alt="ScreenShot" />
              })
            }
          </div>
        </div>
      </div>
      <div className="card03-col2">
        <div className="col2-row1">
          <div className="stars">
            <StarRatings
              rating={(rating.OTP + rating.Negotiation + rating.Responsive + rating.Ethical) / 4}
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
                rating={rating.OTP}
                starRatedColor="orange"
                starDimension="14px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
            <div className="stars">
              <StarRatings
                rating={rating.Negotiation}
                starRatedColor="orange"
                starDimension="14px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
            <div className="stars">
              <StarRatings
                rating={rating.Responsive}
                starRatedColor="orange"
                starDimension="14px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
            <div className="stars">
              <StarRatings
                rating={rating.Ethical}
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
