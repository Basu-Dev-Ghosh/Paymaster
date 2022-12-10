import React from "react";
import { useNavigate } from "react-router-dom";
import "./WarningModal.css";
const WarningModal = ({ display, setShowWarningPopup }) => {
  const navigate = useNavigate();
  return (
    <div
      className="warning-modal"
      style={!display ? { display: "none" } : { display: "block" }}
    >
      <i class="fa-solid fa-circle-xmark"></i>
      <div className="warning-text">
        <p>Oops! You are not logged in</p>
      </div>
      <div className="buttons">
        <button onClick={(e) => setShowWarningPopup(false)}>Close</button>
        <button onClick={(e) => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default WarningModal;
