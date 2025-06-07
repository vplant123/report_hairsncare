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
  const [selectedOptions4, setSelectedOptions4] = useState({ medicines: [] });
  const [showPreview, setShowPreview] = useState(false);
  const params = useParams();
  const [userId, appointmentId, orderId] = params.id.split(",");
  const navigate = useNavigate();

  const fetchPatientTestResult = async () => {
    try {
      toast.info("Fetching prescription data...", {
        position: "bottom-right",
        autoClose: 1000,
      });

      console.log("Fetching with params:", { userId, orderId });
      const response = await fetch(
        `${BASE_URL}/doctor/get-ordered-medicines?userId=${userId}&orderId=${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Add any auth headers if required
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);

        if (response.status === 404) {
          throw new Error(
            "Prescription data not found. Please check if the order ID is correct."
          );
        }
        throw new Error(
          `Server error: ${response.status}. Please try again later.`
        );
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      if (!data || !data.data || !data.success) {
        console.error("Invalid data structure received:", data);
        throw new Error("Invalid data received from server");
      }

      const orderData = data.data;
      setData1(orderData);
      console.log("Order data:", orderData);

      // Extract medicines from the products array
      if (orderData?.products && orderData.products.length > 0) {
        const medicinesList = orderData.products.map((product) => ({
          name: product.item.name,
          quantity: product.quantity.toString(),
          route: product.item.category || "Oral",
          subCategory: product.item.subCategory || "Tablets",
          dosage: "",
          frequency: "Daily at night",
          when: "Before food",
          duration: "1 month",
          instructions: "",
          price: product.item.price,
          description: product.item.description,
        }));

        console.log("Processed medicines list:", medicinesList);

        setSelectedOptions4((prev) => ({
          ...prev,
          medicines: medicinesList,
        }));

        toast.success("✅ Prescription data loaded successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
          },
        });
      } else {
        toast.warning("⚠️ No medicines found in the prescription", {
          position: "bottom-right",
          autoClose: 3000,
          style: {
            backgroundColor: "#ff9800",
            color: "white",
            fontWeight: "bold",
          },
        });
      }
    } catch (err) {
      console.error("Error fetching patient test result:", err);
      toast.error(`❌ ${err.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        style: {
          backgroundColor: "#f44336",
          color: "white",
          fontWeight: "bold",
        },
      });
    }
  };

  useEffect(() => {
    fetchPatientTestResult();
  }, []);

  const handleSubmit = async () => {
    try {
      toast.info("Submitting prescription...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Create the test6 object with medicines array and individual medicine details
      const test6Data = {
        medicines: selectedOptions4?.medicines.map((medicine) => ({
          kit: medicine.name,
          route: medicine.route || "Oral",
          subCategory: medicine.subCategory || "Tablets",
          quantity: medicine.quantity || "1",
          dosage: medicine.dosage || "",
          frequency: medicine.frequency || "Daily at night",
          when: medicine.when || "Before food",
          duration: medicine.duration || "1 month",
          instructions: medicine.instructions || "",
          price: medicine.price,
          description: medicine.description,
        })),
      };

      const prescriptionData = {
        userId,
        appointmentId,
        orderId,
        status: "completed",
        personal: {
          name: data1?.userId?.fullname || "",
          phone: data1?.userId?.mobile || "",
          email: data1?.userId?.email || "",
          addressId: data1?.addressId || "",
        },
        test6: test6Data,
        dianosis: data1?.dianosis || [],
        hairScalp: data1?.hairScalp || {},
        overall: data1?.overall || {},
        nutrition: data1?.nutrition || {},
        lifeStyle: data1?.lifeStyle || {},
        stress: data1?.stress || {},
        management: data1?.management || {},
        bloodTest: data1?.bloodTest || {},
      };

      console.log("Submitting prescription data:", prescriptionData);

      const response = await fetch(
        `${BASE_URL}/doctor/prescription-detail-form?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prescriptionData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to submit prescription"
        );
      }

      console.log("Prescription submission response:", responseData);
      toast.success("✅ Prescription submitted successfully!", {
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
      console.error("Error submitting prescription:", error);
      toast.error(`❌ ${error.message || "Failed to submit prescription"}`, {
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
          setSelectedOptions={setSelectedOptions4}
        />
      </div>
      {showPreview && (
        <PrescriptionUser
          data={{
            preview: "preview",
            personal: {
              name: data1?.userId?.fullname || "",
              phone: data1?.userId?.mobile || "",
              email: data1?.userId?.email || "", // You might want to add this to your user data if needed
              addressId: data1?.addressId || "",
            },
            bloodTest: {
              mainTests: [],
              subTests: {
                "Blood Sugar": [],
              },
            },
            test6: {
              medicines: selectedOptions4?.medicines || [],
            },
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

export default PrescriptionOnly;
