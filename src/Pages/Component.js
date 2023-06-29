import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
const Component = () => {
  const componentRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);
  function generatePdf() {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    doc.html(componentRef.current, {
      async callback(doc) {
        const data = doc.output("datauristring");
        setPdfData(data);
        doc.save("Basudev");
      },
    });
  }

  return (
    <>
      {pdfData ? (
        <iframe src={pdfData} frameborder="0"></iframe>
      ) : (
        <div className="pdf-container">
          <div className="pdf-page"></div>
        </div>
      )}

      <button onClick={generatePdf}>Download Pdf</button>
    </>
  );
};

export default Component;
