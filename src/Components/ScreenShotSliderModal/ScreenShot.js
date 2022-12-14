import React from "react";
import "./ScreenShot.css";
import SimpleImageSlider from "react-simple-image-slider";

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
      <SimpleImageSlider
        width={400}
        height={300}
        images={ss}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
};

export default ScreenShot;
