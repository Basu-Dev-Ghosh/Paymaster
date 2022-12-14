import React from "react";
import { useNavigate } from "react-router-dom";

const CongratsModal = ({ display, setShowCongratsModal }) => {
    const navigate = useNavigate();
    return (
        <div
            className="warning-modal"
            style={!display ? { display: "none" } : { display: "block" }}
        >
            <div className="warning-text">
                <i class="fa-solid fa-gift"></i>
                <p>Congrats! You review has been succesfully submitted</p>
            </div>
            <div className="buttons">
                <button onClick={(e) => setShowCongratsModal(false)}>Close</button>
                <button onClick={(e) => navigate("/")}>Rate more</button>
            </div>
        </div>
    );
};

export default CongratsModal;
