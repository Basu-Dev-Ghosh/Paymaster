import React, { useState, useEffect } from "react";
import "./NewHeader2.css";
import footerlogo from "../../assets/logo2.png";
import { serverLink } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const NewHeader2 = ({ setShowLoader, setIsLoggedin, setUser }) => {
    const [token, setToken] = useState(false);
    const [user2, setUser2] = useState(null)
    const navigate = useNavigate();
    const [searchinput, setSearchinput] = useState("");

    const isAuth = async () => {
        try {
            const res = await axios.get(`${serverLink}/auth/isauth`, { withCredentials: true })
            if (res.status === 200) {
                setToken(true);
                setUser(res.data.user)
                setUser2(res.data.user)
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
                <div className="new-header-logo" onClick={(e) => navigate('/')}>
                    <img src={footerlogo} alt="Footer-Logo" />
                    <h3>paymaster</h3>
                </div>
                <form className="landing-input landing-input-2" onSubmit={search}>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        value={searchinput}
                        placeholder="Search Company, Brand, Location"
                        onChange={(e) => setSearchinput(e.target.value)}
                    />
                </form>
                {token ? (
                    <>
                        <div className="user-icon">
                            {
                                user2?.CompanyLogo ?
                                    <img className="companyLogo" src={user2?.CompanyLogo} alt="Logo" />
                                    : <i class="fa-solid fa-user-tie"></i>
                            }
                        </div>
                        <a onClick={logout}>
                            <i class="fa-solid fa-right-from-bracket"></i> Sign out
                        </a>
                    </>
                ) : (
                    <a onClick={(e) => navigate('/login')}>
                        <i class="fa-solid fa-arrow-right-to-bracket"></i>Login
                    </a>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default NewHeader2;