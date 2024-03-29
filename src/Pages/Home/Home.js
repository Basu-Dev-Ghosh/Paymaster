import React, { useState, useEffect, useRef } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WarningModal from "../../Components/WarningModal/WarningModal";
import { useQuery } from "react-query";

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
  const [searchinput, setSearchinput] = useState("");
  const inputRef = useRef(null);
  const [showWarningPopup, setShowWarningPopup] = useState(false);

  const navigate = useNavigate();
  const getCompanies = async () => {
    try {
      const res = await axios.get(`${serverLink}/company`, {
        withCredentials: true,
      });
      if (res.status === 202) {
        return res.data.companies;
      }
    } catch (err) {
      return err;
    }
  };

  const { isLoading: showLoader2, data: companies } = useQuery(
    "companies",
    getCompanies
  );

  const search = (e) => {
    e.preventDefault();
    if (searchinput === "") {
      toast.error("Please Input something", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      navigate(`/search-result/${searchinput}`);
    }
  };

  // useEffect(() => {
  //   if (!company) {
  //     return;
  //   }

  //   fetch("https://www.heritageit.edu")
  //     .then(response => response.text())
  //     .then(html => {
  //       const parser = new DOMParser();
  //       const doc = parser.parseFromString(html, 'text/html');
  //       const logo = doc.querySelector('img[alt="logo"]');
  //       console.log(doc);
  //       if (logo) {
  //         console.log(logo);
  //         setLogoUrl(logo.src);
  //       }
  //     });
  // }, [company]);

  return (
    <>
      <WarningModal
        display={showWarningPopup}
        setShowWarningPopup={setShowWarningPopup}
      />
      <div
        style={
          showWarningPopup ? { filter: "blur(5px)" } : { filter: "blur(0px)" }
        }
      >
        {showLoader && showLoader2 ? (
          <Loader />
        ) : (
          <>
            <NewHeader
              setShowLoader={setShowLoader}
              setShowWarningPopup={setShowWarningPopup}
            />
            <div className="landing-container">
              <div className="landing-text">
                <h1>
                  Who pays you <span>on time?</span>
                </h1>
                <form className="landing-input" onSubmit={search}>
                  <i class="fa-solid fa-magnifying-glass"></i>

                  <input
                    type="text"
                    ref={inputRef}
                    placeholder="Search Company, Brand, Location"
                    onChange={(e) => setSearchinput(e.target.value)}
                    list={searchinput === "" ? "" : "Companies"}
                  />

                  <datalist id="Companies">
                    {companies?.map((comp) => {
                      return <option value={comp.CompanyName.toLowerCase()} />;
                    })}
                  </datalist>
                </form>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  saepe quam ea est itaque doloremque minus quo ipsum nulla
                  reiciendis.
                </p>
              </div>
            </div>
            <div className="top-companies">
              {companies?.length > 0 ? (
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
              ) : null}
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
            <ToastContainer />
          </>
        )}
      </div>
    </>
    // <MyComponent/>
  );
};

export default Home;
