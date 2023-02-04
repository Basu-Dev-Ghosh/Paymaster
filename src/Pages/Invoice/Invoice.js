import React from "react";
import { useState, useEffect } from "react";
import Invoice_Header from "../../Components/Invoice_Header/Invoice_Header";
import "./Invoice.css";
import { ToastContainer, toast } from "react-toastify";
import Pdfdata from "../Pdfdata/Pdfdata";
import { serverLink } from "../../App";
import axios from "axios";
import AddCompany from "../../Components/AddClientModal/AddClient";



const Invoice = () => {
  const [addLineMode, setAddLineMode] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceData, setInvoiceData] = useState({});
  const [subTotal, setSubtotal] = useState(0);
  const [user, setUser] = useState();
  const [discountPercent, setDiscountPercent] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [pdfPreviewMode, setPdfPreviewMode] = useState(false);
  const [companyLogo, setCompanyLogo] = useState("")
  const [clients, setClients] = useState([]);
  const [addClientMode, setAddClientMode] = useState(false)
  const [pdfData, setPdfData] = useState({
    send: false
  });

  const isAuth = async () => {
    try {
      const res = await axios.get(`${serverLink}/auth/isauth`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setCompanyLogo(res.data.user.CompanyLogo)
        setUser(res.data.user);
        setPdfData({ ...pdfData, companyName: res.data.user.CompanyName })
        setClients(res.data.clients)
      }
    } catch (err) { }
  };
  useEffect(() => {
    isAuth();
    console.log(companyLogo);
  }, []);

  useEffect(() => {
    if (discountType === "Value") {
      let dis = subTotal - discountPercent;
      setTotalWithDiscount(dis);
      setTotal(dis);
    } else {
      let dis = subTotal - (subTotal * discountPercent) / 100;
      setTotalWithDiscount(dis);
      setTotal(dis);
    }
  }, [discountPercent, subTotal,discountType]);

  useEffect(() => {
    setPdfData({ ...pdfData, total: total.toFixed(2) })
  }, [total]);

  useEffect(() => {
    let tot = 0;
    if (sgst >= 0) {
      tot = parseInt(sgst) + (parseInt(sgst) * 9) / 100;
      setTotal(tot);
    }
    if (!sgst) {
      if (!cgst) {
        if (discountType === "Value") {
          let dis = subTotal - discountPercent;
          setTotalWithDiscount(dis);
          setTotal(dis);
        } else {
          let dis = subTotal - (subTotal * discountPercent) / 100;
          setTotalWithDiscount(dis);
          setTotal(dis);
        }
      } else {
        tot = parseInt(cgst) + (parseInt(cgst) * 9) / 100;
        setTotal(tot);
      }
    }
  }, [sgst]);
  useEffect(() => {
    let tot = 0;
    if (cgst >= 0) {
      tot = parseInt(cgst) + (parseInt(cgst) * 9) / 100;
      setTotal(tot);
    }
    if (!cgst) {
      if (!sgst) {
        if(discountType==="Value"){
          let dis = subTotal - discountPercent;
          setTotalWithDiscount(dis);
          setTotal(dis);
        }else{
          let dis = subTotal - (subTotal * discountPercent) / 100;
          setTotalWithDiscount(dis);
          setTotal(dis);
        }
      } else {
        tot = parseInt(sgst) + (parseInt(sgst) * 9) / 100;
        setTotal(tot);
      }
    }
  }, [cgst]);

  const handleList = (e) => {
    const newList = { ...invoiceData };
    newList[e.target.name] = e.target.value;
    setInvoiceData(newList);
  };

  const addList = () => {
    if (
      !invoiceData.product ||
      !invoiceData.description ||
      !invoiceData.qty ||
      !invoiceData.rate ||
      !invoiceData.amount ||
      !invoiceData.tax
    ) {
      toast.warning("Fill the fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      setInvoiceList((oldData) => {
        return [...oldData, invoiceData];
      });
      setInvoiceData({});
      setAddLineMode(false);
    }
  };
  useEffect(() => {
    if (invoiceData.qty && invoiceData.rate) {
      let amount = invoiceData.qty * invoiceData.rate;
      setInvoiceData({ ...invoiceData, amount });
    }
    if (!invoiceData.qty || !invoiceData.rate) {
      setInvoiceData({ ...invoiceData, amount: 0 });
    }
  }, [invoiceData.qty, invoiceData.rate]);

  const deleteItem = (index) => {
    setInvoiceList((oldData) => {
      return oldData.filter((data, ind) => {
        return ind !== index;
      });
    });
  };

  const addSubTotal = () => {
    let subt = 0;
    invoiceList.map((item) => {
      subt += item.amount;
    });
    setSubtotal(subt);
  };

  useEffect(() => {
    let subt = 0;
    invoiceList.map((item) => {
      subt += item.amount;
    });
    setSubtotal(subt);
  }, [invoiceList]);

  return (
    <>
      {
        addClientMode && <AddCompany display={addClientMode} setDisplay={setAddClientMode} setClients={setClients} />
      }
      {
        pdfPreviewMode ? <Pdfdata pdfInfo={pdfData} invoiceList={invoiceList} companyLogo={companyLogo} setPdfPreviewMode={setPdfPreviewMode} />
          :
          <div style={
            addClientMode
              ? { filter: "blur(5px)" }
              : { filter: "blur(0px)" }
          }>


            <Invoice_Header setAddClientMode={setAddClientMode} />

            <div className="invoice-upper">
              <div className="invoice-upper-col1">
                <div className="invoice-upper-col1-row1">
                  <div className="row1-dropdown-div">
                    <p>Client</p>
                    <div className="dropdown-div">
                      <select className="dropdown" id="dropdown" onChange={(e) => setPdfData({ ...pdfData, client: e.target.value })}>
                        <option value="all" selected>
                          Select a client
                        </option>
                        {
                          clients?.map((client) => {
                            return (
                              <option value={client.ClientName}>{client.ClientName}</option>
                            )
                          })
                        }

                      </select>
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="para-div">
                      <p>Client</p>
                      <p>Ce/Bsc</p>
                    </div>
                    <input type="text" placeholder="Seperate emails with comma" onChange={(e) => setPdfData({ ...pdfData, clientEmail: e.target.value })} />
                  </div>
                  <div className="input-checkbox-div input-checkbox-div2">
                    <input type="checkbox" onChange={(e) => setPdfData({ ...pdfData, send: e.target.checked })} />
                    <p>Send</p>
                  </div>
                </div>
                <div className="invoice-upper-col1-row1 invoice-upper-col1-row2">
                  <div className="row1-dropdown-div">
                    <p>Billing address</p>
                    <div>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="7"
                        style={{ outline: "none", padding: "20px" }}
                        onChange={(e) => setPdfData({ ...pdfData, billingAddress: e.target.value })}
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
                      onChange={(e) => setPdfData({ ...pdfData, terms: e.target.value })}
                    />
                  </div>
                  <div className="input-div">
                    <div className="para-div">
                      <p>Invoice</p>
                    </div>
                    <input
                      type="date"
                      id="date"
                      onFocus={(e) => {
                        e.currentTarget.showPicker();
                      }}
                      onChange={(e) => setPdfData({ ...pdfData, invoiceDate: e.target.value })}
                    />

                  </div>
                  <div className="input-div">
                    <div className="para-div">
                      <p>Due</p>
                    </div>
                    <input
                      type="date"
                      className="row2-input"
                      placeholder="27/01/2022"
                      onFocus={(e) => {
                        e.currentTarget.showPicker();
                      }}
                      onChange={(e) => setPdfData({ ...pdfData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="invoice-upper-col1-row1">
                  <div className="row1-dropdown-div">
                    <p>Place of supply</p>
                    <div className="dropdown-div">
                      <select className="dropdown" id="dropdown" onChange={(e) => setPdfData({ ...pdfData, placeOfSupply: e.target.value })}>
                        <option value="all" selected>
                          Select place
                        </option>

                        <option value={user?.Location}>{user?.Location}</option>

                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-upper-col2">
                <div className="balance-div">
                  <img src={user?.CompanyLogo} alt="Logo" />
                </div>
                <div className="input-div">
                  <div className="para-div">
                    <p>Invoice</p>
                  </div>
                  <input type="text" className="row2-input" placeholder="2700" onChange={(e) => setPdfData({ ...pdfData, invoiceNo: e.target.value })} />
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
                    <th>DESCRIPTION</th>
                    <th>QTY</th>
                    <th>RATE</th>
                    <th>AMOUNT(INR)</th>
                    <th>TAX</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceList.map((data, index) => {
                    return (
                      <tr>
                        <td>
                          <i class="fa-solid fa-layer-group table-sign"></i>
                        </td>
                        <td>{index + 1}</td>
                        <td>{data.product}</td>

                        <td>{data.description}</td>
                        <td>{data.qty}</td>
                        <td>{data.rate}</td>
                        <td>{data.amount}</td>
                        <td>{data.tax} %</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={(e) => deleteItem(index)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </td>
                      </tr>
                    );
                  })}{" "}
                  {addLineMode && (
                    <tr className="table-row-input">
                      <td>
                        <i class="fa-solid fa-plus table-sign"></i>
                      </td>
                      <td>{invoiceList.length ? invoiceList.length + 1 : 1}</td>
                      <td>
                        <input
                          type="text"
                          className="table-input"
                          placeholder="Product/Service"
                          name="product"
                          value={invoiceData.product}
                          onChange={handleList}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="table-input"
                          placeholder="Description"
                          name="description"
                          value={invoiceData.description}
                          onChange={handleList}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="table-input"
                          placeholder="Qty"
                          name="qty"
                          value={invoiceData.qty}
                          onChange={handleList}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="table-input"
                          placeholder="Rate"
                          name="rate"
                          value={invoiceData.rate}
                          onChange={handleList}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="table-input"
                          placeholder="Amount"
                          name="amount"
                          value={invoiceData.amount}
                          onChange={handleList}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="table-input"
                          placeholder="Tax %"
                          name="tax"
                          value={invoiceData.tax}
                          onChange={handleList}
                        />
                      </td>
                      <td style={{ cursor: "pointer" }}>
                        <i class="fa-solid fa-check" onClick={addList}></i>
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
                  <button onClick={(e) => setInvoiceList([])}>Clear all lines</button>
                  <button onClick={addSubTotal}>Add subtotal</button>
                </div>
                <div className="subtotal">
                  <p>Subtot</p> <p>{parseInt(subTotal).toFixed(2)}</p>
                </div>
              </div>
              <div className="form-row">
                <div className="form-row-col1">
                  <div className="textarea-div1">
                    <p>Messege on</p>
                    <textarea name="" id="" cols="34" rows="10" onChange={(e) => setPdfData({ ...pdfData, messege: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="form-row-col2">
                  <div className="input-div1">
                    <div className="dropdown-div">
                      <select className="dropdown" id="dropdown" onChange={(e) => setDiscountType(e.target.value)}>
                        <option value="all" selected hidden>
                          Discount
                        </option>
                        <option value="Percentage">Percentage</option>
                        <option value="Value">Value</option>
                      </select>
                    </div>
                    <input
                      type="number"
                      onChange={(e) => setDiscountPercent(e.target.value)}
                    />
                    <p>{totalWithDiscount.toFixed(2)}</p>
                  </div>
                  <div className="input-div2">
                    <p>CGST 9% on</p>
                    <input
                      type="number"
                      placeholder="1900.00"
                      onChange={(e) => setSgst(e.target.value)}
                    />
                  </div>
                  <div className="input-div3">
                    <p>SGST 9% on</p>
                    <input
                      type="number"
                      placeholder="1900.00"
                      onChange={(e) => setCgst(e.target.value)}
                    />
                  </div>
                  <div className="input-div4">
                    <p>Total</p>
                    <p>{total.toFixed(2)}</p>
                  </div>
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
                <button onClick={() => setPdfPreviewMode(true)}>Print or Preview</button>
              </div>
            </div>
            <ToastContainer />
          </div>
      }
    </>

  );
};

export default Invoice;
