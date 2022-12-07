import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ value }) => {
  return (
    <div
      class="circle"
      style={{
        backgroundImage: `conic-gradient(#DE3767 ${value}%, rgba(232, 221, 221, 0.97) 0)`,
      }}
    >
      <div class="inner">{value}%</div>
    </div>
  );
};

export default ProgressBar;
