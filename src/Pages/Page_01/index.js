import React from "react";
import Header from "../../Components/Header/Header";
import image1 from "../../assets/Image1.png";
import "./Main.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from '../../Components/Card/Card'
import Footer from "../../Components/Footer/Footer";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const index = () => {
  return (
    <>
      <div className="page01-container">
        <Header />
        <div className="triangle-left" />
        <div className="contents">
          <div className="content-left">
            <div className="heading">
              <div className="text">
                <h2>
                  Who pays you <br />
                  <span>on time</span>
                </h2>
              </div>
              <div className="sign">
                <span>?</span>
              </div>
            </div>
            <div className="para">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Nostrum voluptatem error obcaecati laudantium numquam, libero
                commodi molesti fsgfg cghht sti..
              </p>
            </div>
          </div>
          <div className="content-right">
            <img src={image1} alt="Illustrator" />
          </div>
        </div>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          arrows={false}
          className="cards"
          partialVisbile={true}
        >
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Carousel>
        <Footer />
      </div>
    </>
  );
};

export default index;
