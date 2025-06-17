import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Report from "./Rpage/Report.jsx";
import DoctorAnalysis from "./Reports/DoctorAnalysis";
import ManagementReport from "./Reports/managementReport/index.jsx";
import "./App.css";
// import "./doctor-dashboard/A"
import PatientTestResult from "./doctor-dashboard/PatientTestResult.jsx";
import PatientTestFollowUp from "./doctor-dashboard/PatientTestFollowUp.jsx";
import Analysis from "./doctor-dashboard/Analysis.jsx";
import PrescriptionOnly from "./doctor-dashboard/PrescriptionOnly.jsx";
import AnalysisCopy from "./doctor-dashboard/AnalysisCopy.jsx";
import FollowUpDoctorAnalysis from "./Reports/DoctorAnalysis/indexs.jsx";
import TestResults from "./doctor-dashboard/TestResults.jsx";
import OrderReport from "./Rpage/OrderReport.jsx";
// import DoctorNavbar from "./doctor-dashboard/DoctorNavbar.jsx";
function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route path="/doctor/report/:id" element={<Report />} />

          <Route path="/order-prescription/:id" element={<OrderReport />} />
          <Route
            path="/doctor-analyse-report/:id"
            element={<DoctorAnalysis />}
          />
          <Route
            path="/Followup/doctor-analyse-report/:id"
            element={<FollowUpDoctorAnalysis />}
          />
          <Route
            path="/Followup/create-prescription/:id"
            element={<AnalysisCopy />}
          />

          <Route path="/management-report/:id" element={<ManagementReport />} />
          <Route
            path="/patient-test-result/:id"
            element={<PatientTestResult />}
          />
          <Route
            path="/followup/patient-test-result/:id"
            element={<PatientTestFollowUp />}
          />
          <Route path="/analysis/:id" element={<Analysis />} />

          {/* <Route path="/followup/analysis/:id" element={<AnalysisCopy />} /> */}

          <Route path="/prescription_only/:id" element={<PrescriptionOnly />} />
          <Route path="/test-results/:id" element={<TestResults />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
