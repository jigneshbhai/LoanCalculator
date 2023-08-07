import React from "react";
import { Pie } from "react-chartjs-2";

const LoanBill = ({ loanAmount, totalInterest, totalAmount }) => {
  const data = {
    labels: ["Loan Amount", "Total Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["#47B39C", "#7031AC"],
      },
    ],
  };

  const billStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
  };

  const chartContainerStyles = {
    width: "200px",
    height: "200px",
  };

  const billDetailsStyles = {
    marginTop: "20px",
    textAlign: "center",
  };

  return (
    <div style={billStyles}>
      <h2>Loan Information</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="pie-chart" style={chartContainerStyles}>
          <Pie data={data} />
        </div>
        <div style={billDetailsStyles}>
          <p>Loan Amount: ₹{loanAmount}</p>
          <p>Total Interest: ₹{totalInterest}</p>
        </div>
      </div>
      <table style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loan Amount</td>
            <td>₹{loanAmount}</td>
          </tr>
          <tr>
            <td>Total Interest</td>
            <td>₹{totalInterest}</td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td>₹{totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoanBill;
