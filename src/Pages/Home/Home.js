import React, { useState, useEffect } from "react";
import "./Home.css";
import NewHeader from "../../Components/NewHeader/NewHeader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../../Components/Card/Card";
import axios from "axios";
import { serverLink } from "../../App";
import Loader from "../../Components/Loader/Loader";
import group from "../../assets/Group 20.png";
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
    items: 2,
  },
};

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [companies, setCompanies] = useState([]);
  const getCompanies = async () => {
    try {
      setShowLoader(true);
      const res = await axios.get(`${serverLink}/company`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        setCompanies(res.data.companies);
        setShowLoader(false);
      }
    } catch (err) {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <NewHeader setShowLoader={setShowLoader} />
          <div className="landing-container">
            <div className="landing-text">
              <h1>
                Who pays you <span>on time?</span>
              </h1>
              <div className="landing-input">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search Company, Brand, Location"
                />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                saepe quam ea est itaque doloremque minus quo ipsum nulla
                reiciendis.
              </p>
            </div>
          </div>
          <div className="top-companies">
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              arrows={false}
              className="cards"
            >
              {companies?.map((company) => {
                return <Card company={company} />;
              })}
            </Carousel>
          </div>
          <div className="brand-info">
            <div className="brnad-info-text">
              <p>Adipiscing elit, sed diam nonummy nibh euismod tincidun.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>
            <div className="brand-info-image">
              <img src={group} alt="" />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
