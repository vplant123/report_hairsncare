import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BASE_URL from "../Config";
// import BASE_URL from '../../../Config';
import { useParams } from "react-router-dom";
import "./Analysis.css";
import "./DoctorAnalysisReport.css";

import Test6 from "./Test6.jsx";

// import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PrescriptionUser from "./PrescriptionUser.jsx";

// import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";

const PrescriptionOnly = () => {
  const [data1, setData1] = useState({});

  const [selectedOptions4, setSelectedOptions4] = useState({ medicine: null });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedTests, setSelectedTests] = useState({
    mainTests: [],
    subTests: {
      "Blood Sugar": [],
    },
  });
  const params = useParams();
  const [userId, appointmentId, orderId] = params.id.split(",");
  const navigate = useNavigate();

  const fetchPatientTestResult = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/doctor/get-ordered-medicines?userId=${userId}&orderId=${orderId}`
      );
      const data = await response.json();
      setData1(data.data[0]);

      // Extract medicines from the API response and set them in selectedOptions4
      if (data.data[0]?.products) {
        const medicines = data.data[0].products.map(product => ({
          name: product.item.name,
          quantity: product.quantity,
          price: product.item.price,
          description: product.item.description,
          route: "Oral",
          subCategory: "Tablets",
          dosage: "",
          frequency: "Daily at night",
          when: "Before food",
          duration: "1 month",
          instructions: "",
        }));
        setSelectedOptions4(prev => ({
          ...prev,
          medicines: medicines,
        }));
      }
    } catch (err) {
      console.error("Error fetching patient test result:", err);
    }
  };

  useEffect(() => {
    fetchPatientTestResult();
  }, [orderId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/doctor/prescription-detail-form?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            appointmentId,
            personal: {
              name: data1?.personal?.name,
              age: data1?.personal ? data1?.personal["Select your age group"] : "",
              phone: data1?.personal?.phoneNumber,
              email: data1?.personal?.email,
              sex: data1?.personal?.Gender?.src === "/assets/img/question/female.svg" ? "Female" : "Male",
            },
            medicines: selectedOptions4?.medicines || [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit prescription");
      }
      toast.success("Prescription submitted successfully");
      const data = await response.json();
      navigate("/appointment");
    } catch (error) {
      console.error("Error submitting prescription:", error);
      toast.error("Failed to submit prescription");
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        fontSize: "12px",
      }}
      className="checkbox-container11"
    >
      <div
        id="report"
        className="report-container1"
        style={{ padding: "10px", boxSizing: "border-box" }}
      >
        <Test6
          selectedOptions={selectedOptions4}
        //   setSelectedOptions={setSelectedOptions4}
        //   selectedTests={selectedTests}
        //   setSelectedTests={setSelectedTests}
        />
      </div>
      {showPreview && (
        <PrescriptionUser
          data={{
            preview: "preview",
            personal: {
              name: data1?.personal?.name,
              age: data1?.personal ? data1?.personal["Select your age group"] : "",
              phone: data1?.personal?.phoneNumber,
              email: data1?.personal?.email,
              sex: data1?.personal?.Gender?.src === "/assets/img/question/female.svg" ? "Female" : "Male",
            },
            bloodTest: selectedTests,
            test6: {
              medicines: selectedOptions4?.medicines || []
            }
          }}
        />
      )}
      <div>
        <div style={{ textAlign: "center" }}>
          <button
            style={showPreview ? { backgroundColor: "red" } : null}
            className="pdf"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Close Preview" : "Preview"}
          </button>
        </div>
        <div className="test-btnn">
          <button onClick={handleSubmit}>Submit Prescription</button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default PrescriptionOnly;
