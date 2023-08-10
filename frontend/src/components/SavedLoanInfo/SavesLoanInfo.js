import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

import calculatorService from "../../features/utils/calculatorService";
import { useSelector } from "react-redux";

import "./styles.css";
import LoanDetails from "../LoanDetails/LoanDetails";

const SavesLoanInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const [loanBills, setLoanBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    async function fetchLoanBills() {
      try {
        if (!user) {
          console.error("User not found in Redux state");
          return;
        }

        const loanBillsData = await calculatorService.fetchLoanBills(
          user._id,
          user.token
        );
        setLoanBills(loanBillsData);
      } catch (error) {
        console.error("Error fetching loan bills:", error);
      }
    }

    fetchLoanBills();
  }, [user]);

  const handleDelete = async (billId) => {
    try {
      await calculatorService.deleteLoanBill(user._id, user.token, billId);
      setLoanBills((prevBills) =>
        prevBills.filter((bill) => bill._id !== billId)
      );

      toast.success("Loan bill deleted successfully");
    } catch (error) {
      console.error("Error deleting loan bill:", error);
      toast.error("Failed to delete loan bill");
    }
  };

  const handleCardClick = (bill) => {
    setSelectedBill(bill);
  };

  return (
    <div className="saves-loan-info">
      <div className="container">
        <h2 className="title">Saved Loan Information</h2>
        <ul className="loan-list">
          {loanBills.map((bill) => (
            <li key={bill._id} className="loan-item">
              <div className="card" onClick={() => handleCardClick(bill)}>
                <p className="amount">Loan Amount: {bill.loanAmount}</p>
                <p className="interest">Total Interest: {bill.totalInterest}</p>
                <p className="total">Total Amount: {bill.totalAmount}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(bill._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {selectedBill && <LoanDetails bill={selectedBill} />}
      </div>
    </div>
  );
};

export default SavesLoanInfo;
