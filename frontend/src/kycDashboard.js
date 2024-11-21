import React from "react";
import './styles/kycDashboard.css'; // or './styles/KycDashboard.css', depending on the exact file name

function KycDashboard() {
  const data = [
    {
      name: "John Doe",
      aadhar: "1234 5678 9012",
      pan: "ABCDE1234F",
      amount: "1000",
    },
  ];

  return (
    <div className="kyc-dashboard">
      <h1 className="title">Pending KYC Approvals</h1>
      <div className="card-container">
        {data.map((user, index) => (
          <div className="card" key={index}>
            <div className="card-details">
              <p><strong>Subscriber Name:</strong> {user.name}</p>
              <p><strong>Aadhar:</strong> {user.aadhar}</p>
              <p><strong>PAN:</strong> {user.pan}</p>
              <p><strong>Amount:</strong> ₹{user.amount}</p>
            </div>
            <div className="card-actions">
              <button className="approve-button">Approve</button>
              <button className="reject-button">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KycDashboard;
