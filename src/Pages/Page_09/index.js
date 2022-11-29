import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import "./Main.css";
import Avatar from "react-avatar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { serverLink } from "../../App";
import { useNavigate } from "react-router-dom";
const Index = () => {
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
  const AddCompany = async (e) => {
    e.preventDefault();
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
          navigate(`/page06/${res.data.company._id}`);
        }
      } catch (err) {
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
        <>
          <Header setShowLoader={setShowLoader} />
          <div className="add-company-container">
            <form className="row3" onSubmit={AddCompany}>
              <div className="col1">
                <label
                  htmlFor="CompanyLogo"
                  style={{ overlflow: "hidden !important" }}
                >
                  <Avatar
                    size="150"
                    src={
                      companyLogo
                        ? companyLogo
                        : "https://static.thenounproject.com/png/1156518-200.png"
                    }
                  />
                </label>
                <input
                  type="file"
                  onChange={handleImage}
                  name="CompanyLogo"
                  id="CompanyLogo"
                />
              </div>
              <div className="col2">
                <label htmlFor="CompanyName">Company Name</label>
                <input
                  type="text"
                  required
                  name="CompanyName"
                  onChange={handleCompany}
                  id="CompanyName"
                  value={companyData?.CompanyName}
                />
                <label htmlFor="CompanyUrl">Company URL</label>
                <input
                  type="text"
                  required
                  name="CompanyUrl"
                  onChange={handleCompany}
                  id="CompanyUrl"
                  value={companyData?.CompanyUrl}
                />
                <label htmlFor="CompanyLocation">Company Location</label>
                <input
                  type="text"
                  required
                  name="CompanyLocation"
                  onChange={handleCompany}
                  id="CompanyLocation"
                  value={companyData?.CompanyLocation}
                />
                <label htmlFor="CompanyDescription">Company Description</label>
                <textarea
                  type="text"
                  required
                  rows={4}
                  onChange={handleCompany}
                  name="CompanyDescription"
                  id="CompanyDescription"
                  value={companyData?.CompanyDescription}
                />
                <button type="submit" className="register-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <Footer />
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default Index;
