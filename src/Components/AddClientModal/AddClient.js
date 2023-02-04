import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import gallery from "../../assets/gallery.svg";
import axios from "axios";
import "../AddCompanyModal/AddCompany.css";
import Loader from "../Loader/Loader";
import { serverLink } from "../../App";
import { useNavigate } from "react-router-dom";

const AddCompany = ({ display, setDisplay,setClients }) => {
  const [clientName, setClientName] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  



  const AddCompany = async () => {
    if (clientName === "") {
      toast.warning("Enter a valid client name", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      try {
      
        setShowLoader(true);
        const res = await axios.post(
          `${serverLink}/client/create`,
          {clientName},
          {
            withCredentials: true,
          }
        );
        if (res.status === 201) {
          toast.success(res.data.Messege, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
            setClients((old)=>{
            return [...old,{ClientName:clientName}]
        })
        setDisplay(false)
        }
      } catch (err) {
        setShowLoader(false);
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
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div
          className="rate-form-modal add-client-modal"
          style={!display ? { display: "none" } : { display: "block" }}
        >
          <i
            class="fa-solid fa-circle-xmark cross"
            onClick={(e) => setDisplay(false)}
          ></i>
          <div className="rate-form-header rate-form-header-add-company">
            
            <div className=" company-name-input">
              <input
                type="text"
                required
                name="CompanyName"
                onChange={(e)=>setClientName(e.target.value)}
                value={clientName}
                placeholder="Client Name"
              />
            </div>
            
          </div>

          <div
            className="rate-form-button"
            style={{ justifyContent: "flex-end" }}
          >
            <div className="rate-form-submit">
              <button onClick={AddCompany}>Add client</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default AddCompany;
