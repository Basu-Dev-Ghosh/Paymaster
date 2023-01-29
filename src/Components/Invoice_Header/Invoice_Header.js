import React, { useState, useEffect } from "react";
import "../NewHeader2/NewHeader2.css";
import footerlogo from "../../assets/logo2.png";
import { serverLink } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const NewHeader2 = ({ setShowLoader, setIsLoggedin, setUser }) => {
    const [token, setToken] = useState(false);
    const navigate = useNavigate();
    const [searchinput, setSearchinput] = useState("");

    const isAuth = async () => {
        try {
            const res = await axios.get(`${serverLink}/auth/isauth`, { withCredentials: true })
            if (res.status === 200) {
                setToken(true);
                setUser(res.data.user)
                setIsLoggedin(true);
            }
        } catch (err) {

        }
    }

    const logout = async () => {
        try {
            setShowLoader(true);
            const res = await axios.get(`${serverLink}/auth/logout`, { withCredentials: true });
            if (res.status === 204) {
                toast.success(res.data.Messege, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate('/login')
                }, 2100);
            }
        }
        catch (err) {
            toast.error(err.data.Messege, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }

    }



    useEffect(() => {
        isAuth();
    }, []);


    const search = (e) => {
        e.preventDefault();
        if (searchinput === "") {
            toast.error("Please Input something", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
        else {
            setSearchinput("")
            navigate(`/search-result/${searchinput}`)
        }
    }

    return (
        <>
            <div className="new-header">
                <div className="new-header-logo">
                    <i className="fa-solid fa-receipt invoice-logo invoice-logo-main" onClick={(e) => navigate('/invoice')}></i>
                    <h3>Invoice</h3>
                    <div className="invoice-logo-container" onClick={() => navigate("/")}>
                        <img src={footerlogo} alt="Footer-Logo" className="paymaster-logo" />
                        <p>Paymaster</p>
                    </div>

                </div>
                 
                {true ? (
                    <>
                        <div className="user-icon">
                        <i class="fa-solid fa-gear"></i>
                        </div>
                        <a onClick={logout}>
                        <i class="fa-solid fa-question"></i> Help
                        </a>
                        <a onClick={()=>navigate("/")}>
                        <i class="fa-solid fa-xmark" style={{fontSize:"40px"}}></i>
                        </a>
                    </>
                ) : (<>
         
                    </>
                   
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default NewHeader2;