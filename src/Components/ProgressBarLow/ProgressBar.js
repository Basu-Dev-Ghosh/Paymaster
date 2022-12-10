import React from "react";
import "./ProgressBarLow.css";
import { RadialProgress } from 'react-radial-progress-indicator';
const ProgressBar = ({ value }) => {
    return (
        <div className="progressLow">
            {
                value >= 50 ? <i className="fa-solid fa-thumbs-up progress-icon"></i> :
                    <i className="fa-solid fa-thumbs-down progress-icon"></i>
            }


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
                segmented
                showIntermediateProgress
                startStep={0}
                step={value / 10}
                steps={10}
                text={function text(steps, proportion) { return "" }}
                width="100%"
            />
        </div >

    );
};

export default ProgressBar;
