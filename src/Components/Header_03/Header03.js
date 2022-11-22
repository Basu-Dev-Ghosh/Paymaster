import React, { useState, useEffect } from 'react'
import './Header03.css'
import logo from "../../assets/Logo.png";
const Header03 = () => {
    const [display, setDisplay] = useState("flex");
    const show = (e) => {
        console.log("HI");
        if (display === "none") {
            setDisplay("flex");
        } else {
            setDisplay("none");
        }
    };
    useEffect(() => {
        if (window.innerWidth <= 1000) {
            setDisplay("none");
        } else {
            setDisplay("flex");
        }
    }, [window.innerWidth]);
    return (
        <div className="header header3">
            <div className="header-logo">
                <img src={logo} alt="Logo-Paymaster" />
            </div>
            <div className="hamburger">
                <i class="fa-solid fa-bars" onClick={show}></i>
            </div>
            <div className="header-form hide" style={{ display: `${display}` }}>
                <input type="text" placeholder="Companies" />
                <input
                    type="text"
                    name="city"
                    className="page6-input"
                    list="cityname"
                    placeholder="Location"

                />
                <datalist id="cityname">
                    <option value="Boston" />
                    <option value="Cambridge" />
                </datalist>
                <button className='header3-button'>Search</button>
            </div>
        </div>
    )
}

export default Header03