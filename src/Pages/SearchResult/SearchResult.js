import React, { useState, useEffect } from "react";
import "./SearchResult.css";
import NewHeader2 from "../../Components/NewHeader2/NewHeader2";
import "./SearchResult.css";
import axios from "axios";
import Card from "../../Components/Card/Card";
import { serverLink } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const SearchResult = () => {
  const [filter, setFilter] = useState("");
  const { searchinput } = useParams();
  const [companies, setCompanies] = useState([]);
  const [companies2, setCompanies2] = useState([]);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const getCompaniesByName = async () => {
    try {
      setShowLoader(true);
      console.log("Hi");
      const res = await axios.get(
        `${serverLink}/company/searchinput/${searchinput}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 202) {
        setCompanies(res.data.company);
        setCompanies2(res.data.company);
        setShowLoader(false);
      }
    } catch (err) {
      setShowLoader(false);
    }
  };

  const filterCompanies = (min, max) => {
    const newCompanies = companies2.filter((company) => {
      let percentage =
        ((company.OTP +
          company.Negotiation +
          company.Responsive +
          company.Ethical) /
          20) *
        100;
      return percentage >= min && percentage < max;
    });
    setCompanies(newCompanies);
  };

  const searchWithFilter = (e) => {
    setCompanies(companies2);
    switch (e.target.value) {
      case "75-100":
        filterCompanies(75, 100);
        break;
      case "50-75":
        filterCompanies(50, 75);
        break;
      case "25-50":
        filterCompanies(25, 50);
        break;
      case "0-25":
        filterCompanies(0, 25);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getCompaniesByName();
  }, [searchinput]);
  return (
    <>
      <NewHeader2 />
      <div className="search-result-box">
        <div className="search-result-box-header">
          <p>
            Search Results for {searchinput}{" "}
            <span>{`(${companies.length} Results)`}</span>
          </p>
          <div className="dropdown-div">
            <select className="dropdown" onChange={searchWithFilter}>
              <option value="" disabled selected hidden>
                Rating Range
              </option>
              <option value="75-100">75-100%</option>
              <option value="50-75">50-75%</option>
              <option value="25-50">25-50%</option>
              <option value="0-25">0-25%</option>
            </select>
          </div>
        </div>
        <div className="search-result-box-content">
          {companies.length === 0 ? (
            <h1>No results found</h1>
          ) : (
            companies.map((company) => {
              return <Card company={company} />;
            })
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
