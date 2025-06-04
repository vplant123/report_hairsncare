import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import html2pdf from "html2pdf.js";
import BASE_URL from "../Config";
import "./PrescriptionUser.css";

const PrescriptionUser = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const userId = storedUserData?.logedInUser?.user._id;
  const [prescriptionM, setPrescriptionM] = useState({});

  useEffect(() => {
    console.log("koejgt", data.test6?.medicines?.[0]?.medicines);
    setPrescriptionM(data.test6?.medicines?.[0]?.medicines);
  }, [data.test6?.medicines?.[0]?.medicines]);

  // Fetch cart items directly
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/cart/get-cart?userId=${userId}`
        );
        const result = await response.json();
        setCartItems(result.data.items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const contentRef = useRef();

  if (!data) {
    return <h2>Error</h2>;
  }

  const handleAddToCart = async () => {
    try {
      setLoader(true);
      toast.info("Adding items to cart...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Create cart items from the medicines
      const cartItemsToAdd =
        data.test6?.medicines?.map(medicine => ({
          productId: medicine._id,
          quantity: parseInt(medicine.quantity) || 1,
        })) || [];

      const response = await fetch(
        `${BASE_URL}/cart/update-cart?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: storedUserData.logedInUser.accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItemsToAdd),
        }
      );

      const result = await response.json();
      setLoader(false);

      if (response.ok) {
        console.log("Cart updated successfully:", result);
        toast.success("🛒 Items added to cart successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
          },
        });
        navigate("/create-order");
      } else {
        throw new Error(result.message || "Failed to update cart");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
      toast.error(`❌ ${error.message || "Error updating cart"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontWeight: "bold",
        },
      });
    }
  };

  const formatDate = () => {
    const date = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-GB", options).replace(",", "");
  };

  let medData = data.test6?.medicines?.[0]?.medicines || {};
  console.log("koejgt", medData);

  const generatePDF = () => {
    try {
      setLoading(true);
      toast.info("Generating PDF...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const element = contentRef.current;
      const opt = {
        margin: 0.5,
        filename: `Prescription.pdf`,
        image: { type: "jpeg", quality: 0.7 },
        html2canvas: { scale: 1.5, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().from(element).set(opt).save();
      setLoading(false);
      toast.success("📄 PDF generated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
          fontWeight: "bold",
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error("❌ Failed to generate PDF", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontWeight: "bold",
        },
      });
    }
  };

  let p = 7;

  return (
    <div>
      <div style={{ justifyContent: "center" }} className="d-flex">
        {!data?.preview && (
          <button className="pdf" onClick={generatePDF}>
            {loading
              ? "Please wait, download will start"
              : "Generate and Download PDF"}
          </button>
        )}
        <div
          style={{
            display: "flex",
            margin: "0 0 0 10px",
          }}
        >
          {!data?.preview && (
            <button
              className="pdf-1"
              style={{ backgroundColor: "#c7c74d" }}
              onClick={handleAddToCart}
            >
              {loading ? "Please wait" : "Buy"}
            </button>
          )}
        </div>
      </div>
      <div
        id="report"
        className="report-container page-break-2"
        ref={contentRef}
      >
        <div className="heading-container">
          <div className="image-container">
            <img className="rx-logo" src="/RX.png" alt="RX Logo" />
            <img
              className="logo-main"
              src="/assets/img/logo.png"
              alt="Main Logo"
            />
          </div>
          <div className="time-detail">
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              Ref no: <span>EFA3E6F55</span>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              Date and Time: <span>{formatDate()}</span>
            </div>
          </div>
        </div>
        <div className="patient-detail-container">
          <div className="d-flex flex-column">
            <div className="d-flex">
              <h5 style={{ fontWeight: "600" }}>Patient details:</h5>
              <div
                className="d-flex"
                style={{ margin: "2px 0 0 9px", fontSize: "15px", gap: "10px" }}
              >
                <div>{data.personal?.name}</div>
                <div>{data.personal?.sex}</div>
              </div>
            </div>
            <div className="d-flex">
              <h5 style={{ fontWeight: "600" }}>Phone:</h5>
              <div
                style={{ margin: "2px 0 0 9px", fontSize: "15px", gap: "10px" }}
              >
                {data.personal?.phone}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h5 className="color-head-blue" style={{ fontWeight: "600" }}>
            Doctor's Note/ Provisional Diagnosis
          </h5>
          {data?.dianosis?.map((item, index) => (
            <div key={index} style={{ fontSize: "14px", fontWeight: "600" }}>
              <div>
                {index + 1}) {item.option}
              </div>
              {item.subOption && (
                <div>
                  <li>{item.subOption}</li>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="medicine-container" style={{ height: "63%" }}>
          <div className="labs">
            <div style={{ textAlign: "center", fontWeight: "600" }}>
              <h4 className="med-heading">Lab Tests</h4>
            </div>
            {data.bloodTest?.mainTests.length > 0 ? (
              data.bloodTest.mainTests.map((test, index) => (
                <div key={index} className="input-med-1">
                  <input type="checkbox" checked={true} readOnly />
                  <p className="lab-test-1">{test}</p>

                  {test === "Blood Sugar" && (
                    <div className="sub-input-med">
                      {data.bloodTest.subTests["Blood Sugar"].map(
                        (subTest, subIndex) => (
                          <div key={subIndex} className="input-med-1">
                            <input type="checkbox" checked={true} readOnly />
                            <p className="lab-test-1">{subTest}</p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No test prescribed.</p>
            )}
          </div>
          <div className="medicine">
            <div style={{ textAlign: "center", fontWeight: "600" }}>
              <h4 className="med-heading">Medicines</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div className="presc">
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  Prescription
                </div>
                <div>
                  {data.test6?.medicines?.map((medicine, index) => (
                    <div
                      key={medicine.name}
                      className={`d-flex flex-column ${
                        index + 1 === p ||
                        index + 1 === 10 + p ||
                        index + 1 === 20 + p
                          ? "page-break-1"
                          : ""
                      }`}
                    >
                      <div
                        className="d-flex"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        <div>{index + 1}.</div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 0 0 7px",
                          }}
                        >
                          {medicine.name} X {medicine.quantity}
                        </div>
                      </div>
                      <div
                        style={{
                          margin: "0 0 6px 25px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {`${medicine.dosage || ""} ${
                          medicine.route || "Oral"
                        } ${medicine.frequency || "Daily"} ${
                          medicine.route === "Oral" ? medicine.when || "" : ""
                        } ${medicine.duration || ""} ${
                          medicine.instructions || ""
                        }`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="heading-container item2559"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <div>
                  <img
                    className="img-sign"
                    src="/Amit-Sir---Signature.png"
                    alt="Doctor's Image"
                  />
                  <h4 style={{ color: "#008CD7", fontWeight: "600" }}>
                    Dr Amit Agarkar
                  </h4>
                  <div style={{ fontSize: "17px", fontWeight: "600" }}>
                    MBBS, MD, FCPS,DDV
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: "600" }}>
                    Fellowship in Hair Transplant
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: "600" }}>
                    Reg. No,- 06/07/2868
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dec-container" style={{ margin: "50px 0 0 0" }}>
          <p>Disclaimer</p>
        </div>
        <div className="disclaimer">
          <div>
            1. The information and advice provided here is provisional in nature
            as it is based on the limited information made available by the
            patient.
          </div>
          <div>
            2. The information is confidential in nature and for recipients use
            only.
          </div>
          <div>3.The Prescription is generated on a Teleconsultation.</div>
          <div>4. Not Valid for Medico-legal purpose.</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <button
          className="pdf-1"
          style={{ backgroundColor: "#c7c74d" }}
          onClick={handleAddToCart}
        >
          {loading ? "Please wait" : "Buy"}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default PrescriptionUser;
