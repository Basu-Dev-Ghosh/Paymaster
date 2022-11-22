import React from "react";
import "./Main.css";
import Header03 from "../../Components/Header_03/Header03";
import applelogo from "../../assets/AppleLogo.png";
import StarRatings from "react-star-ratings";
import Card02 from "../../Components/Card02/Card02";
import Footer from "../../Components/Footer/Footer";
const Index = () => {
  return (
    <>
      <Header03 />
      <div className="page06-container">
        <aside className="side-section">
          <div className="side-row1">
            <img src={applelogo} alt="Apple Logo" />
            <h1>Apple</h1>
          </div>
          <div className="side-row2">
            <h6>Lorem ipsum dolor sit amet, consectetur.</h6>
          </div>
          <div className="side-row3">
            <div className="side-row3-col1">
              <p>On time payment</p>
              <p>Negotiation</p>
              <p>Responsive</p>
              <p>Ethical</p>
            </div>
            <div className="side-row3-col2">
              <div className="stars">
                <StarRatings
                  rating={4.5}
                  starRatedColor="gold"
                  starDimension="22px"
                  numberOfStars={5}
                  starSpacing="4px"
                  name="rating"
                />
              </div>
              <div className="stars">
                <StarRatings
                  rating={3.5}
                  starRatedColor="gold"
                  starDimension="22px"
                  numberOfStars={5}
                  starSpacing="4px"
                  name="rating"
                />
              </div>
              <div className="stars">
                <StarRatings
                  rating={2.5}
                  starRatedColor="gold"
                  starDimension="22px"
                  numberOfStars={5}
                  starSpacing="4px"
                  name="rating"
                />
              </div>
              <div className="stars">
                <StarRatings
                  rating={2}
                  starRatedColor="gold"
                  starDimension="22px"
                  numberOfStars={5}
                  starSpacing="4px"
                  name="rating"
                />
              </div>
            </div>
          </div>
          <div className="side-row4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi at
              exercitationem natus iusto vitae eius. Odio temporibus, optio enim
              voluptatibus, placeat cupiditate fuga aliquid reiciendis veniam
              dolorum, ex sapiente maiores!
            </p>
          </div>
          <div className="side-row5">
            <div className="stars">
              <StarRatings
                rating={4}
                starRatedColor="gold"
                starDimension="34px"
                numberOfStars={5}
                starSpacing="4px"
                name="rating"
              />
            </div>
          </div>
        </aside>
        <main className="main-section">
          <Card02 />
          <Card02 />
          <Card02 />
          <Card02 />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
