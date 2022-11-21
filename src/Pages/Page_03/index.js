import React from 'react'
import './Main.css'
import logo from "../../assets/FooterLogo.png";
import linkedin from "../../assets/LinkedIn.png";
import email from "../../assets/Email.png";
import { NavLink, useNavigate } from 'react-router-dom';
const Index = () => {
    const navigate = useNavigate();
    return (
        <div className="page-02-container">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="form">
                <div className="row1">
                    <h1>Create an account</h1>
                    <h3>
                        Already have an account?<span>
                            <NavLink
                                to={"/page02"}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                Log in{" "}
                            </NavLink>{" "}</span>
                    </h3>
                </div>
                <div className="row2" style={{ display: "flex", flexDirection: "column" }}>
                    <img src={linkedin} alt="Log in with linkedin" style={{ margin: "15px 0" }} />
                    <img src={email} onClick={e => navigate('/page04')} alt="Log in with linkedin" />
                </div>

            </div>
        </div>
    )
}

export default Index