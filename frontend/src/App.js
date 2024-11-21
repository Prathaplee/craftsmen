import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KycDashboard from "./kycDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/kyc-dashboard" element={<KycDashboard />} />
        <Route path="*" element={<div>Page not found</div>} /> {/* Default fallback */}
      </Routes>
    </Router>
  );
}

export default App;
