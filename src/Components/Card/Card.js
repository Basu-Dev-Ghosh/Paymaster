import React from "react";
import "./Card.css";
import applelogo from "../../assets/AppleLogo.png";
const Card = () => {
  return (
    <>
      <div className="card">
        <div className="row1">
          <div className="logo">
            <img src={applelogo} alt="AppleLogo" />
          </div>
          <div className="title">
            <h1>Apple</h1>
          </div>
        </div>
        <div className="row2">
          <p>Technology Company</p>
        </div>
        <div className="row3">
          <div className="row3-row1">
            <p>On time payement</p>
            <div className="ratings">
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-regular fa-star-half-stroke"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-sharp fa-solid fa-star"
                style={{ opacity: ".1", margin: "0 2px" }}
              ></i>
            </div>
          </div>
          <div className="row3-row1">
            <p>Negotiation</p>
            <div className="ratings">
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-regular fa-star-half-stroke"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-sharp fa-solid fa-star"
                style={{ opacity: ".1", margin: "0 2px" }}
              ></i>
            </div>
          </div>
          <div className="row3-row1">
            <p>Responsive</p>
            <div className="ratings">
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-regular fa-star-half-stroke"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-sharp fa-solid fa-star"
                style={{ opacity: ".1", margin: "0 2px" }}
              ></i>
            </div>
          </div>
          <div className="row3-row1">
            <p>Ethical</p>
            <div className="ratings">
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-solid fa-star"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-regular fa-star-half-stroke"
                style={{ color: "#F7AB17", margin: "0 2px" }}
              ></i>
              <i
                class="fa-sharp fa-solid fa-star"
                style={{ opacity: ".1", margin: "0 2px" }}
              ></i>
            </div>
          </div>
        </div>
        <div className="row4">
          <div className="ratings">
            <i
              class="fa-solid fa-star"
              style={{ color: "#F7AB17", margin: "0 3px" }}
            ></i>
            <i
              class="fa-solid fa-star"
              style={{ color: "#F7AB17", margin: "0 3px" }}
            ></i>
            <i
              class="fa-solid fa-star"
              style={{ color: "#F7AB17", margin: "0 3px" }}
            ></i>
            <i
              class="fa-solid fa-star-half"
              style={{ color: "#F7AB17", margin: "0 3px" }}
            ></i>
            <i
              class="fa-sharp fa-solid fa-star"
              style={{ opacity: ".1", margin: "0 3px" }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
