import React from "react";
import "./ScreenShot.css";

const ScreenShot = ({ display, setShowScrenShotsModal, ss }) => {
  return (
    <div
      className="screenshot-slider"
      style={display ? { display: "flex" } : { display: "none" }}
    >
      <i
        class="fa-solid fa-circle-xmark cross-ss"
        onClick={(e) => setShowScrenShotsModal(false)}
      ></i>
      <div className="ss-box">
        {ss?.map((sss) => {
          return <img src={sss} alt="Image" />;
        })}
      </div>
    </div>
  );
};

export default ScreenShot;
