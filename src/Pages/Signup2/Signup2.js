import React, { useRef, useState } from "react";
import "./Signup2.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import loginlogo from "../../assets/Group 110.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import groupimage from "../../assets/Group 348.png";
import { serverLink } from "../../App";
import arrow from "../../assets/arrow.png";
import tick from "../../assets/tick.png";
import back from "../../assets/back.png";

const Signup2 = () => {
  const [userData, setUserData] = useState({
    Name: "",
    DOB: "",
    CompanyName: "",
    CompanyLogo:"",
    Position: "",
    Location: "",
    Email: "",
    Password: "",
  });
  const [rePassword, setRePassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState("none");
  const [showLoader, setShowLoader] = useState(false);
  const [eyeDisplay1, setEyeDisplay1] = useState("none");
  const [eye2Display1, setEye2Display1] = useState("block");
  const [eyeDisplay2, setEyeDisplay2] = useState("none");
  const [eye2Display2, setEye2Display2] = useState("block");
  const [form1Display, setForm1Display] = useState("block");
  const [form2Display, setForm2Display] = useState("none");

  const calenderRef = useRef();
  const passwordRef1 = useRef();
  const passwordRef2 = useRef();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };
  const signup = async (e) => {
    e.preventDefault();
    if (userData.Password !== rePassword) {
      toast.error("Password does not match", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      setButtonLoading("block");
      try {
        const res = await axios.post(`${serverLink}/auth/signup`, userData, {
          withCredentials: true,
        });
        if (res.status === 201) {
          setButtonLoading("none");
          setShowLoader(true);
          toast.success(res.data.Messege, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          }, 3100);
        }
      } catch (err) {
        setButtonLoading("none");
        console.log(err);
        toast.error(err.response.data.Messege, {
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

  const gotoNextPage = () => {
    if (
      userData.Name === "" ||
      userData.CompanyName === "" ||
      userData.Position === "" ||
      userData.Location === "" ||
      userData.DOB === ""
    ) {
      toast.error("Fill the inputs correctly", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      setForm1Display("none");
      setForm2Display("block");
    }
  };

  const handleSignupLogo=async(e)=>{
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
      setUserData({ ...userData, CompanyLogo: dat.secure_url });
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
  }


  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="login-container">
          <div className="login-box">
            <div className="login-box-color">
              <img
                src={groupimage}
                style={{ width: "700px" }}
                alt="Group image"
              />
            </div>
            <div className="login-box-form">
              <div className="login-box-form-logo">
                <img
                  src={loginlogo}
                  alt="Logo"
                  onClick={(e) => navigate("/")}
                />
              </div>
              <p>Signup a new paymaster account</p>
              <div className="login-form" style={{ display: form1Display }}>
                <div className="email-input">
                  <input
                    type="text"
                    required
                    name="Name"
                    onChange={handleSignup}
                    placeholder="Name"
                  />
                </div>
                <div className="email-input password-input">
                  <input
                    type="text"
                    required
                    name="DOB"
                    ref={calenderRef}
                    onChange={handleSignup}
                    onFocus={(e) => {
                      e.currentTarget.type = "date";
                      e.currentTarget.showPicker();
                    }}
                    placeholder="Date of Birth"
                  />
                  <i
                    class="fa-solid fa-calendar"
                    onClick={(e) => {
                      calenderRef.current.type = "date";
                      calenderRef.current.showPicker();
                    }}
                  ></i>
                </div>
                <div className="email-input">
                  <input
                    type="text"
                    required
                    name="CompanyName"
                    onChange={handleSignup}
                    placeholder="Company Name"
                  />
                </div>
                <div className="email-input logo-input">
                 <label htmlFor="companyLogo"><p>Company Logo</p>
                 {
                  userData.CompanyLogo? <i class="fa-solid fa-check" style={{color:"green"}}></i>: <i class="fa-solid fa-upload"></i>
                 }
              
                 
                 </label>
                  <input
                    type="file"
                    required
                    name="CompanyLogo"
                    id="companyLogo"
                    onChange={handleSignupLogo}
                    placeholder="Company Logo"
                  />
                </div>
                <div className="email-input">
                  <input
                    type="text"
                    required
                    name="Position"
                    onChange={handleSignup}
                    placeholder="Position"
                  />
                </div>
                <div className="email-input">
                  <input
                    type="text"
                    required
                    name="Location"
                    onChange={handleSignup}
                    placeholder="Location"
                  />
                </div>
                <button style={{ position: "relative" }} onClick={gotoNextPage}>
                  {buttonLoading !== "none" ? null : "Continue"}{" "}
                  <div class="dots" style={{ display: buttonLoading }}></div>
                  <img
                    src={arrow}
                    style={{ position: "absolute", right: "40px" }}
                    alt="Arrow"
                  />
                </button>
              </div>
              <form
                className="login-form"
                style={{ display: form2Display }}
                onSubmit={signup}
              >
                <div className="email-input">
                  <input
                    type="email"
                    required
                    name="Email"
                    onChange={handleSignup}
                    placeholder="Email Address"
                  />
                </div>
                <div className="password-input">
                  <input
                    type="password"
                    required
                    name="Password"
                    onChange={handleSignup}
                    placeholder="Password"
                    ref={passwordRef1}
                  />
                  <i
                    class="fa-solid fa-eye"
                    style={{ display: eyeDisplay1 }}
                    onClick={(e) => {
                      setEyeDisplay1("none");
                      setEye2Display1("block");
                      passwordRef1.current.type = "password";
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-eye-slash"
                    style={{ display: eye2Display1 }}
                    onClick={(e) => {
                      setEye2Display1("none");
                      setEyeDisplay1("block");
                      passwordRef1.current.type = "text";
                    }}
                  ></i>
                </div>
                <div className="password-input">
                  <input
                    type="password"
                    required
                    name="Password"
                    onChange={(e) => setRePassword(e.target.value)}
                    placeholder="Re-enter Password"
                    ref={passwordRef2}
                  />
                  <i
                    class="fa-solid fa-eye"
                    style={{ display: eyeDisplay2 }}
                    onClick={(e) => {
                      setEyeDisplay2("none");
                      setEye2Display2("block");
                      passwordRef2.current.type = "password";
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-eye-slash"
                    style={{ display: eye2Display2 }}
                    onClick={(e) => {
                      setEye2Display2("none");
                      setEyeDisplay2("block");
                      passwordRef2.current.type = "text";
                    }}
                  ></i>
                </div>
                <button type="submit" style={{ position: "relative" }}>
                  {buttonLoading !== "none" ? null : "Finish"}{" "}
                  <div class="dots" style={{ display: buttonLoading }}></div>
                  <img
                    src={tick}
                    style={{ position: "absolute", right: "40px" }}
                    alt="Arrow"
                  />
                </button>
                <div
                  className="back"
                  onClick={(e) => {
                    setForm2Display("none");
                    setForm1Display("block");
                  }}
                >
                  <img src={back} alt="back" />
                  Back
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Signup2;
