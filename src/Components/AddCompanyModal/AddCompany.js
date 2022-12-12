import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./AddCompany.css";
import gallery from "../../assets/gallery.svg";
import axios from "axios";
import Loader from "../Loader/Loader";
import { serverLink } from "../../App";
import { useNavigate } from "react-router-dom";

const AddCompany = ({ display, setDisplay }) => {
  const [companyData, setCompanyData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [companyLogo, setCompanyLogo] = useState("");
  const navigate = useNavigate();

  const handleCompany = (e) => {
    const newCompanyData = { ...companyData };
    newCompanyData[e.target.name] = e.target.value;
    setCompanyData(newCompanyData);
  };

  const handleImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "paymaster");
    data.append("cloud_name", "basustudent");
    try {
      setShowLoader(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/basustudent/image/upload",
        data
      );
      const dat = res.data;
      setCompanyData({ ...companyData, CompanyLogo: dat.secure_url });
      setCompanyLogo(dat.secure_url);
      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
      toast.error(err.data.Messege, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const AddCompany = async () => {
    console.log("hi");
    if (companyLogo === "") {
      toast.warning("Upload a Logo First", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      try {
        setShowLoader(true);
        const res = await axios.post(
          `${serverLink}/company/create`,
          companyData,
          {
            withCredentials: true,
          }
        );
        if (res.status === 201) {
          toast.success(res.data.Messege, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setCompanyData({});
          setCompanyLogo("");
          navigate(`/company/${res.data.company._id}`);
        }
      } catch (err) {
        setShowLoader(false);
        toast.error(err.data.Messege, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div
          className="rate-form-modal"
          style={!display ? { display: "none" } : { display: "block" }}
        >
          <i
            class="fa-solid fa-circle-xmark cross"
            onClick={(e) => setDisplay(false)}
          ></i>
          <div className="rate-form-header rate-form-header-add-company">
            <label
              className="rate-form-logo add-company-form-logo"
              htmlFor="imageinput"
            >
              {companyLogo ? (
                <img src={companyLogo} alt="Logo" />
              ) : (
                <img src={gallery} alt="Logo" />
              )}
            </label>
            <input
              type="file"
              onChange={handleImage}
              id="imageinput"
              style={{ width: "0", height: "0" }}
            />

            <div className=" company-name-input">
              <input
                type="text"
                required
                name="CompanyName"
                onChange={handleCompany}
                value={companyData?.CompanyName}
                placeholder="Company Name"
              />
            </div>
            <div className="company-name-input">
              <input
                type="text"
                equired
                name="CompanyUrl"
                onChange={handleCompany}
                value={companyData?.CompanyUrl}
                placeholder="Company URL"
              />
            </div>
            <div className="company-name-input">
              <input
                type="text"
                required
                name="CompanyLocation"
                onChange={handleCompany}
                value={companyData?.CompanyLocation}
                placeholder="Company Location"
              />
            </div>
            <div className="rate-form-input-text-add-company">
              <textarea
                placeholder="Company Description"
                required
                rows={4}
                onChange={handleCompany}
                name="CompanyDescription"
                value={companyData?.CompanyDescription}
              ></textarea>
            </div>
          </div>

          <div
            className="rate-form-button"
            style={{ justifyContent: "flex-end" }}
          >
            <div className="rate-form-submit">
              <button onClick={AddCompany}>Create Company</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default AddCompany;
