import React from "react";
import Header02 from "../../Components/Header_02/Header02";
import "./Main.css";
import applelogo from "../../assets/AppleLogo.png";
import Footer from "../../Components/Footer/Footer";
const Index = () => {
  return (
    <>
      <Header02 />
      <div className="page5-container">
        <div className="page5-row1">
          <p>Find the company you want to review</p>
          <div className="header-form">
            <input
              type="text"
              style={{ padding: "25px", width: "630px" }}
              placeholder="Companies"
              className="page5-input"
            />

            <input
              type="text"
              name="city"
              className="page5-input"
              list="cityname"
              style={{ padding: "23px", width: "250px", fontSize: "32px" }}
              placeholder="Location"
            />
            <datalist id="cityname">
              <option value="Boston" />
              <option value="Cambridge" />
            </datalist>
            <button className="page5-button">Search</button>
          </div>
        </div>
        <div className="page5-row2">
          <div className="row2-heading">
            <div className="image-section">
              <img src={applelogo} alt="Apple Logo" />
            </div>
            <div className="text-section">
              <div className="text-row1">
                <h1>Apple</h1>
                <p>Technology company</p>
              </div>
              <div className="text-row2">
                <p>Cupertine, California, United states</p>
              </div>
            </div>
          </div>
          <div className="row2-input">
            <textarea placeholder="Write a review"></textarea>
          </div>
          <div className="row2-buttons">
            <i class="fa-regular fa-image"></i>
            <i class="fa-solid fa-square-plus"></i>
            <img src="" alt="" />
          </div>
        </div>
        <div className="page5-row3">
          <div className="page5-row3-row1">
            <p>On time payment</p>
            <div className="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>{" "}
          <div className="page5-row3-row1">
            <p>Negotiation</p>
            <div className="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>{" "}
          <div className="page5-row3-row1">
            <p>Responsive</p>
            <div className="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>{" "}
          <div className="page5-row3-row1">
            <p>Ethical</p>
            <div className="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
