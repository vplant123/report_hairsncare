import React, { useEffect, useState } from "react";
import BASE_URL from "../Config";
import { useParams, useNavigate } from "react-router-dom";
import "./Analysis.css";
import "./DoctorAnalysisReport.css";
// import Test1 from "./analysis/Test1.jsx";
import Test6 from "./analysis/Test6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrescriptionUser from "./PrescriptionUser.jsx";

const AnalysisCopy = () => {
  const [data1, setData1] = useState({});
  const [selectedOptions4, setSelectedOptions4] = useState({ medicines: [] });
  const [showPreview, setShowPreview] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedTests, setSelectedTests] = useState({
    mainTests: [],
    subTests: {
      "Blood Sugar": [],
    },
  });

  const params = useParams();
  const [userId, appointmentId, haiTestId] = params.id.split(",");
  const navigate = useNavigate();

  const fetchPatientTestResult = async () => {
    try {
      toast.info("Fetching patient data...", {
        position: "bottom-right",
        autoClose: 1000,
      });

      // Fetch prescription data
      const prescriptionResponse = await fetch(
        `${BASE_URL}/doctor/getPrescription?appointmentId=${appointmentId}`
      );

      if (!prescriptionResponse.ok) {
        throw new Error(`Error: ${prescriptionResponse.status}`);
      }

      const prescriptionData = await prescriptionResponse.json();
      setData1(prescriptionData.data);

      if (prescriptionData.data?.test6?.medicines) {
        setSelectedOptions4({
          medicines: prescriptionData.data.test6.medicines,
        });
      }

      // Fetch hair test data
      const hairTestResponse = await fetch(
        `${BASE_URL}/doctor/get-hair-test?userId=${userId}&hairTestId=${haiTestId}`
      );

      if (!hairTestResponse.ok) {
        throw new Error(`Error: ${hairTestResponse.status}`);
      }

      const hairTestData = await hairTestResponse.json();
      const hairTest = hairTestData.data[0];

      // Set diagnosis data
      if (hairTest) {
        setSelectedOptions(hairTest.dianosis || []);
        setSelectedTests(
          hairTest.bloodTest || {
            mainTests: [],
            subTests: {
              "Blood Sugar": [],
            },
          }
        );
      }

      toast.success("✅ Patient data loaded successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error fetching patient data:", err);
      toast.error(`❌ ${err.message}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    // fetchPatientTestResult();
  }, []);

  // Add effect to handle prescription updates
  useEffect(() => {
    if (selectedOptions4?.medicines?.length > 0) {
      setShowPreview(true);
    }
  }, [selectedOptions4]);

  const handleSubmit = async () => {
    try {
      toast.info("Submitting prescription...", {
        position: "top-right",
        autoClose: 1000,
      });

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
            followUpDate: selectedOptions4?.followUpDate || null,
            personal: {
              name: data1?.personal?.name || "",
              phone: data1?.personal?.phone || "",
              email: data1?.personal?.email || "",
              addressId: data1?.addressId || "",
            },
            dianosis: selectedOptions,
            test6: selectedOptions4,
            bloodTest: selectedTests,
            medicines: selectedOptions4?.medicines
              ? Object.keys(selectedOptions4?.medicines[0])
              : "",
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to submit prescription"
        );
      }

      toast.success("✅ Prescription submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error submitting prescription:", error);
      toast.error(`❌ ${error.message || "Failed to submit prescription"}`, {
        position: "top-right",
        autoClose: 5000,
      });
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
        {/* <Test1
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        /> */}

        <Test6
          selectedOptions={selectedOptions4}
          setSelectedOptions={setSelectedOptions4}
          selectedTests={selectedTests}
          setSelectedTests={setSelectedTests}
        />
      </div>

      {showPreview && selectedOptions4?.medicines?.length > 0 && (
        <PrescriptionUser
          data={{
            preview: "preview",
            personal: {
              name: data1?.personal?.name || "",
              phone: data1?.personal?.phone || "",
              email: data1?.personal?.email || "",
              addressId: data1?.addressId || "",
            },
            dianosis: selectedOptions,
            bloodTest: selectedTests,
            test6: selectedOptions4,
            followUpDate: selectedOptions4?.followUpDate || null,
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: showPreview ? "#dc3545" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          onClick={() => {
            if (selectedOptions4?.medicines?.length > 0) {
              setShowPreview(!showPreview);
            } else {
              toast.warning("Please add medicines before previewing");
            }
          }}
        >
          {showPreview ? "Close Preview" : "Preview"}
        </button>

        <button
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          onClick={() => {
            if (selectedOptions4?.medicines?.length > 0) {
              handleSubmit();
            } else {
              toast.warning("Please add medicines before submitting");
            }
          }}
        >
          Submit Prescription
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

export default AnalysisCopy;
