import React from "react";
import "./ProgressBar.css";
import { RadialProgress } from 'react-radial-progress-indicator';
const ProgressBar = ({ value }) => {
  return (

    <div className="progressHigh">
      <RadialProgress
        backgroundColour="#dff0d8"
        backgroundTransparent
        duration={3000}
        fontRatio={4}
        height="100%"
        ringBgColour="#E3E3E3"
        ringFgColour="#C63B79"
        ringIntermediateColour="#59648D"
        ringThickness={0.4}
        startStep={0}
        step={value / 10}
        steps={10}
        text={function text(steps, proportion) { return "".concat(Math.floor(100 * proportion), "%") }}
        width="100%"
      />
    </div>

  );
};

export default ProgressBar;
