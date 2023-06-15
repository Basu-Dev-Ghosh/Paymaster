import React from "react";
import "./Card.css";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'





import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import ProgressBar from "../ProgressBar/ProgressBar";
// import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
// import 'react-circular-progressbar/dist/styles.css';
// import { DashedProgress } from "react-dashed-progress";
export const Star = (
  <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
);

export const customStyles = {
  itemShapes: Star,
  boxBorderWidth: 0,

  activeFillColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
  activeBoxColor: ['#DE3767', '#DE3767', '#DE3767', '#DE3767', '#DE3767'],
  activeBoxBorderColor: ['#DE3767', '#DE3767', '#DE3767', '#DE3767', '#DE3767'],

  inactiveFillColor: '#fff',
  inactiveBoxColor: '#E3E3E3',
  inactiveBoxBorderColor: '#fff',
};



const Card = ({ company }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card" onClick={(e) => navigate(`/company/${company.CompanyName.toLowerCase()}/${company._id}`)}>
        <div className="row1">
          <div className="logo">
            <img src={company?.CompanyLogo} alt="AppleLogo" />
          </div>
          <div className="title">
            <h1>{company?.CompanyName}</h1>
            <p>{company?.CompanyDescription}</p>
          </div>
        </div>
        <div className="row3">
          <div className="row3-row1">
            <p>On time payement</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 90 }}
                value={Math.floor(company.OTP)}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>
          </div>
          <div className="row3-row1">
            <p>Negotiation</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 90 }}
                value={Math.floor(company?.Negotiation) || 0}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>
          </div>
          <div className="row3-row1">
            <p>Responsive</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 90 }}
                value={Math.floor(company?.Responsive) || 0}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>
          </div>
          <div className="row3-row1">
            <p>Ethical</p>
            <div className="ratings">
              <Rating
                style={{ maxWidth: 90 }}
                value={Math.floor(company?.Ethical) || 0}
                readOnly={true}
                itemStyles={customStyles}
                radius="full"
                spaceBetween="small"
                spaceInside="small"
              />
            </div>
          </div>
        </div>
        <div className="row4">
          <div className="ratings">
            <ProgressBar value={((company.OTP + company.Negotiation + company.Responsive + company.Ethical) / 20) * 100} />
          </div>
          <p>{company?.Raters.length} Reviews</p>
        </div>
      </div>
    </>
  );
};

export default Card;
