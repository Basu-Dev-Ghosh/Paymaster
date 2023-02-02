import React, { useRef, useState,useEffect } from "react";
import jsPDF from "jspdf";
import "./Pdfdata.css";
import html2pdf from 'html2pdf.js';

import logo from "../../assets/logo2.png";
import Loader from "../../Components/Loader/Loader";

const Pdfdata = ({pdfInfo,invoiceList,companyLogo,setPdfPreviewMode}) => {
  const componentRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);
  const [isLoading,setIsLoading]=useState(false)
  const handleDownloadPDF =async () => {
    const options = {
      filename: 'example.pdf',
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2,useCORS:true},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    const elementHTML = componentRef.current.innerHTML;

    // Remove media queries from the styles
    setIsLoading(true);
    const style = document.createElement("style");
    style.innerHTML = ".pdf-style{width: 800px !important;height: 1000px !important;padding: 30px !important;background-color: #fff;} .pdf-page .ofr{ text-align: right; color: #98999d; font-family: 'NEXA LIGHT'; padding: 5px 30px; } .pdf-page-row1{ padding: 0px 30px; margin-top: 60px; display: flex; justify-content: space-between; } .pdf-page-row1-col1{ display: flex; flex-direction: column; } .pdf-page-row1-col1 .heading{ font-weight: bold; font-family: 'Nexa Bold'; font-size: 17px; } .pdf-page-row1-col1 p{ margin-bottom: 5px; } .pdf-page-row1-col1 .data{ font-family: 'Nexa Light'; font-size: 11px; letter-spacing: 2px; margin-top: 7px; width: 70%; } .pdf-page-row1-col1 .data p{ margin-bottom: 4px; line-height: 15px; } .pdf-page-row2{ padding: 0px 30px; margin-top: 40px; display: flex; flex-direction: column; } .pdf-page-row2 .heading{ margin-bottom: 20px; font-family: 'Nexa Bold'; font-size: 24px; color: #41ac77; letter-spacing: 2px; } .pdf-page-row2 .data{ display: flex; justify-content: space-between; font-family: 'Nexa Light'; align-items:  center; } .pdf-page-row2 .data .pdf-page-row2-col1{ display: flex; flex-direction: column; } .invoice-to{ display: flex; flex-direction: column; margin-bottom: 8px; } .invoice-to p:nth-child(1){ font-family: 'Nexa Bold'; margin-bottom: 5px; font-size: 14px; } .invoice-to p:nth-child(2){ font-size: 13px; } .pdf-page-row2 .data .pdf-page-row2-col2{ margin-right: 20px; display: flex; flex-direction: column; align-items: flex-start; } .invoice-details{ display: flex; margin-bottom: 5px; justify-content: space-between; width: 200px; } .invoice-details p:nth-child(1){ font-family: 'Nexa Bold'; margin-right: 10px; font-size: 14px; } .invoice-details p:nth-child(2){ font-size: 13px; margin-left: 10px; } .pdf-page-row2 hr{ color: #41ac77; margin-top: 14px; height: 1px; background-color: rgb(78, 199, 140); border: none; } .pdf-page-row3{ width: 100%; margin-top: 50px; } .pdf-page-row3 table,.pdf-page-row3 thead{ width: 100%; display: inline; } .pdf-page-row3 table tbody{ width: 100%; display: inline; } .pdf-page-row3 table thead tr{ display: flex; justify-content: space-around; width: 100%; background-color: rgba(139, 203, 197, 0.4); padding: 6px; color: #05b474; font-family: 'Nexa Light'; font-size: 12px; align-items: center; } .pdf-page-row3 table thead tr th:nth-child(2){ flex: .3; } .pdf-page-row3 table tbody tr{ display: flex; justify-content: space-around; align-items: center; padding: 6px; text-align: center; font-family: 'Nexa Light'; font-size: 11px; margin-bottom: 5px; } .pdf-page-row3 table tbody tr td:nth-child(2){ flex: .3; } .pdf-page-row3 table tbody tr td:nth-child(2) p:nth-child(1){ font-family: 'Nexa Bold'; font-size: 13px; margin-bottom: 2px; } .pdf-page-row3{ border-bottom: 2px dashed rgb(166, 164, 164); padding-bottom: 20px; } .pdf-page-row4{ display: flex; justify-content: space-between; margin-top: 40px; font-family: 'Nexa Light'; font-size: 12px; } .pdf-page-row4 p:nth-child(3){ flex: .2; font-family: 'Nexa Bold'; font-size: 16px; }"
    document.body.appendChild(style);
    
    await html2pdf().from(componentRef.current).set(options).save();
    document.body.removeChild(style);
    setIsLoading(false)
  };

  

  console.log(companyLogo);
  return (
    <>
      {pdfData ? (
        <iframe src={pdfData} frameborder="0"></iframe>
      ) : (
        <div className="pdf-container">
        <div className="download-buttons">
        <i class="fa-solid fa-paper-plane"></i>
        <i class="fa-solid fa-download" onClick={handleDownloadPDF}></i>
        <i class="fa-solid fa-xmark" onClick={()=>setPdfPreviewMode(false)}></i>
        </div>
        {
          isLoading ? <Loader/>
          : <div className="pdf-page pdf-style" ref={componentRef}>
          <p className="ofr">ORIGINAL FOR RECIPENT</p>
          <div className="pdf-page-row1">
            <div className="pdf-page-row1-col1">
              <div className="heading">
                <p>{pdfInfo.companyName}</p>
                Pvt. Ltd.<p></p>
              </div>
              <div className="data">
                
                  <p>
                  {
                    pdfInfo.billingAddress

                  }
                  </p>
                
              </div>
            </div>
            <div className="pdf-page-row1-col2">
              <img src={companyLogo} alt="Logo" />
            </div>
          </div>
          <div className="pdf-page-row2">
            <p className="heading">Invoice</p>
            <div className="data">
              <div className="pdf-page-row2-col1">
                <div className="invoice-to">
                  <p>INVOICE TO</p>
                  <p>{pdfInfo.client}</p>
                </div>
                <div className="invoice-to">
                  <p>PLACE OF SUPPLY</p>
                  <p>{pdfInfo.placeOfSupply}</p>
                </div>
              </div>
              <div className="pdf-page-row2-col2">
                <div className="invoice-details">
                  <p>INVOICE NO.</p>
                  <p>{pdfInfo.invoiceNo}</p>
                </div>
                <div className="invoice-details">
                  <p>DATE</p>
                  <p>{pdfInfo.invoiceDate}</p>
                </div>
                <div className="invoice-details">
                  <p>DUE DATE</p>
                  <p>{pdfInfo.dueDate}</p>
                </div>
                <div className="invoice-details">
                  <p>TERMS</p>
                  <p>{pdfInfo.terms}</p>
                </div>
              </div>
              </div>
              <hr />
          </div>
          <div className="pdf-page-row3">
          <table>
          <thead>
          <tr>
          <th>NO</th>
          <th>ACTIVITY</th>
          <th>QTY</th>
          <th>RATE</th>
          <th>AMOUNT</th>
          <th>TAX</th>
          </tr>
          </thead>
          <tbody>
          {
            invoiceList?.map((invoiceData,index)=>{
              return(
                <tr>
          <td>{index+1}</td>
          <td>
          <p>{invoiceData.product}</p>
          <p>{invoiceData.description}</p>
          </td>
          <td>{invoiceData.qty}</td>
          <td>{invoiceData.rate}</td>
          <td>{invoiceData.amount}</td>
          <td>{invoiceData.tax} %</td>
      
          </tr>
              )
            })
          }
          
          
          </tbody>
          
          </table>
          </div>
          <div className="pdf-page-row4">
          <p>{pdfInfo.messege}</p>
          <p>BALANCE DUE</p>
          <p>{pdfInfo.total}</p>
          </div>
        </div>
        }
         
        </div>
      )}
    </>
  );
};

export default Pdfdata;
