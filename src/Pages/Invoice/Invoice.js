import React from "react";
import { useState } from "react";
import Invoice_Header from "../../Components/Invoice_Header/Invoice_Header";
import "./Invoice.css";
const Invoice = () => {
  const [addLineMode, setAddLineMode] = useState(false);

  return (
    <>
      <Invoice_Header />
      <div className="invoice-upper">
        <div className="invoice-upper-col1">
          <div className="invoice-upper-col1-row1">
            <div className="row1-dropdown-div">
              <p>Client</p>
              <div className="dropdown-div">
                <select className="dropdown" id="dropdown">
                  <option value="all" selected>
                    Select a client
                  </option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
            </div>
            <div className="input-div">
              <div className="para-div">
                <p>Client</p>
                <p>Ce/Bsc</p>
              </div>
              <input type="text" placeholder="Seperate emails with comma" />
              <div className="input-checkbox-div">
                <input type="checkbox" />
                <p>Send</p>
              </div>
            </div>
            <div className="checkbox-div">
              <p>Setup</p>
              <div className="input-checkbox-div">
                <input type="checkbox" />
                <p>Razorpay</p>
              </div>
            </div>
          </div>
          <div className="invoice-upper-col1-row1">
            <div className="row1-dropdown-div">
              <p>Billing</p>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="7"
                  style={{ outline: "none", padding: "20px" }}
                ></textarea>
              </div>
            </div>
            <div className="input-div">
              <div className="para-div">
                <p>Terms</p>
                <p>?</p>
              </div>
              <input
                type="text"
                className="row2-input"
                placeholder="Due on recipt"
              />
            </div>
            <div className="input-div">
              <div className="para-div">
                <p>Invoice</p>
              </div>
              <input
                type="text"
                className="row2-input"
                placeholder="27/01/2022"
              />
            </div>
            <div className="input-div">
              <div className="para-div">
                <p>Due</p>
              </div>
              <input
                type="text"
                className="row2-input"
                placeholder="27/01/2022"
              />
            </div>
          </div>
          <div className="invoice-upper-col1-row1">
            <div className="row1-dropdown-div">
              <p>Place of supply</p>
              <div className="dropdown-div">
                <select className="dropdown" id="dropdown">
                  <option value="all" selected>
                    Select place
                  </option>
                  <option value="positive">Tamilnadu</option>
                  <option value="negative">Bihar</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="invoice-upper-col2">
          <div className="balance-div">
            <p>Balance</p>
            <p>* 23,600.00</p>
          </div>
          <div className="input-div">
            <div className="para-div">
              <p>Invoice</p>
            </div>
            <input type="text" className="row2-input" placeholder="2700" />
          </div>
        </div>
      </div>
      <div className="invoice-lower">
        <div className="filter-row">
          <div className="row1-dropdown-div">
            <p>Amounts</p>
            <div className="dropdown-div">
              <select className="dropdown" id="dropdown">
                <option value="all" selected>
                  Exclusive of Tax
                </option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>
          </div>
        </div>
        <table className="table-row">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>PRODUCT/SERVICE</th>
              <th>HSN/SAC</th>
              <th>DESCRIPTION</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>AMOUNT(INR)</th>
              <th>TAX</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i class="fa-solid fa-layer-group table-sign"></i>
              </td>
              <td>1</td>
              <td>2D</td>
              <td></td>
              <td>2 minute</td>
              <td>1</td>
              <td>20,000</td>
              <td>20,000.00</td>
              <td>18%</td>
              <td style={{ cursor: "pointer" }}>
                <i class="fa-solid fa-trash"></i>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <i class="fa-solid fa-layer-group table-sign"></i>
              </td>
              <td>2</td>
              <td>2D</td>
              <td></td>
              <td>2 minute</td>
              <td>1</td>
              <td>20,000</td>
              <td>20,000.00</td>
              <td>18%</td>
              <td style={{ cursor: "pointer" }}>
                <i class="fa-solid fa-trash"></i>
              </td>
            </tr>
            {addLineMode && (
              <tr>
                <td>
                  <i class="fa-solid fa-plus table-sign"></i>
                </td>
                <td>3</td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    placeholder="Product/Service"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    placeholder="HSN/SAC"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    placeholder="Description"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    placeholder="Qty"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    placeholder="Rate"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    placeholder="Amount"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    placeholder="Tax"
                  />
                </td>
                <td style={{ cursor: "pointer" }}>
                  <i class="fa-solid fa-check"></i>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="table-buttons">
          <div className="buttons">
            <button onClick={() => setAddLineMode(!addLineMode)}>
              Add line
            </button>
            <button>Clear all lines</button>
            <button>Add subtotal</button>
          </div>
          <div className="subtotal">
            <p>Subtot</p> <p>20,000.00</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-col1">
            <div className="textarea-div1">
              <p>Messege on</p>
              <textarea name="" id="" cols="30" rows="7"></textarea>
            </div>
            <div className="textarea-div2">
              <p>Messege on</p>
              <textarea name="" id="" cols="30" rows="7"></textarea>
            </div>
            <div className="textarea-div3">
              <div className="para">
                <p>
                  <i class="fa-solid fa-paperclip"></i>Attachments
                </p>
                <p>Maximum size 20 MB</p>
              </div>
              <div className="file-input">
                <label htmlFor="file">Select file</label>
                <input type="file" name="" id="file" />
              </div>
            </div>
          </div>
          <div className="form-row-col2">
            <div className="input-div1">
              <div className="dropdown-div">
                <select className="dropdown" id="dropdown">
                  <option value="all" selected>
                    Discount percent
                  </option>
                  <option value="positive">Tamilnadu</option>
                  <option value="negative">Bihar</option>
                </select>
              </div>
              <input type="text" />
              <p>0.00</p>
            </div>
            <div className="input-div2">
              <p>CGST 9% on</p>
              <input type="text" placeholder="1900.00"/>
            </div>
            <div className="input-div3">
              <p>SGST 9% on</p>
              <input type="text" placeholder="1900.00"/>
            </div>
            <div className="input-div4">
              <p>Tot</p>
              <p>23,600.00</p>
            </div>
            <div className="input-div5">  <p>Balance</p>
            <p>23,600.00</p></div>
          
          </div>
        </div>
        
      </div>
      <div className="preview-row">
        <div className="buttons1">
        <button>Cancel</button>
        <button>Clear</button>
        </div>
        <div className="buttons2">
        <button>Save</button>
        <button>Print or Preview</button>
        </div>
        </div>
    </>
  );
};

export default Invoice;
