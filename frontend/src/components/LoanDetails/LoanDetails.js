import React from "react";
import { Pie } from "react-chartjs-2";
import "./styles.css";

const LoanDetails = ({ bill }) => {
  const data = {
    labels: ["Loan Amount", "Total Interest"],
    datasets: [
      {
        data: [bill.loanAmount, bill.totalInterest],
        backgroundColor: ["#3a2de2", "#00ecfd"],
        borderColor: "#fff", 
        borderWidth: 1, 
        hoverOffset: 8, 
      },
    ],
  };

  return (
    <div className="loan-details">
      <p className="amount">Loan Amount: {bill.loanAmount}</p>
      <p className="interest">Total Interest: {bill.totalInterest}</p>
      <p className="total">Total Amount: {bill.totalAmount}</p>
      <div className="chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default LoanDetails;
