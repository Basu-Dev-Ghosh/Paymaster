import React from "react";
import "./Main.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import NewHeader2 from "../../Components/NewHeader2/NewHeader2";
const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="page01-container">
      <NewHeader2 />
      <div className="contents welcome">
        <div className="congrats-text">
          <i class="fa-solid fa-face-smile"></i>
          <h1>Congrats! Your Review has been Submitted</h1>
        </div>
        <div className="backtohome-button">
          <button onClick={(e) => navigate("/")}>Back to home</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
