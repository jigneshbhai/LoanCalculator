import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import LoanBill from "../../components/LoanComponents/LoanBill";
import authService from "../../features/auth/authService";


const LoanCalculator = () => {


  

  const [amount, setAmount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [loanTenure, setLoanTenure] = useState();
  const [tenureType, setTenureType] = useState("monthly"); // "monthly" or "yearly"
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [totalInterest, setTotalInterest] = useState("");



  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 1200;
    const totalPayments =
      tenureType === "monthly" ? loanTenure : loanTenure * 12;
    const monthlyPayment =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    return monthlyPayment.toFixed(2);
  };

  const calculateTotalPayment = () => {
    const monthlyPayment = calculateMonthlyPayment();
    const totalPayments =
      tenureType === "monthly" ? loanTenure : loanTenure * 12;
    const totalPayment = (monthlyPayment * totalPayments).toFixed(2);
    return totalPayment;
  };

  const calculateTotalInterest = () => {
    const totalPayment = calculateTotalPayment();
    const totalInterest = (totalPayment - amount).toFixed(2);
    return totalInterest;
  };

  const handleAmountChange = (e) => {
    setAmount(+e.target.value);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(+e.target.value);
  };

  const handleLoanTenureChange = (e) => {
    setLoanTenure(+e.target.value);
  };

  const handleTenureTypeChange = (e) => {
    setTenureType(e.target.value);
  };

  const handleCalculate = () => {
    const monthlyPayment = calculateMonthlyPayment();
    const totalPayment = calculateTotalPayment();
    const totalInterest = calculateTotalInterest();

    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
    setTotalInterest(totalInterest);

    // Scroll to the results div after the calculation is done
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


const { user } = useSelector((state) => state.auth);

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); 
  }, []);

 const resultsRef = useRef(null);
 const navigate = useNavigate();

 const handleSaveLoanBill = async () => {
   try {
     if (!user) {
       toast.error("Please log in to save the loan bill.");
       navigate("/login");
       // You can add a redirection here if needed
     } else {
       
       if (!user || !user.token) {
         toast.error("User data not found. Please log in again.");
         return;
       }

       // Handle saving the loan bill when the user is logged in
       const loanBillData = {
         loanAmount: amount,
         totalInterest: totalInterest,
         totalAmount: totalPayment,
       };

       // Call the API to save the loan bill
       const response = await authService.saveLoanBill(user, loanBillData);

       if (response && response.success) {
         toast.success("Loan bill saved successfully!");
       } else {
         toast.error("Failed to save the loan bill. Please try again.");
       }
     }
   } catch (error) {
     console.error("Error saving loan bill:", error);
     toast.error("An error occurred while saving the loan bill.");
   }
 };

 

  return (
    <>
      <div>
        <h1>Loan Calculator</h1>
        <div>
          <label>Loan Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Loan Amount ₹"
            value={amount}
            onChange={handleAmountChange}
          />
          <input
            type="range"
            min="0"
            max="100000"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div>
          <label>Interest Rate</label>
          <input
            type="number"
            name="interestRate"
            placeholder="%"
            value={interestRate}
            onChange={handleInterestRateChange}
          />
          <input
            type="range"
            min="0"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={handleInterestRateChange}
          />
        </div>
        <div>
          <label>Loan Tenure</label>
          <input
            type="number"
            name="loanTenure"
            value={loanTenure}
            onChange={handleLoanTenureChange}
          />
          <input
            type="range"
            min="0"
            max="480"
            value={loanTenure}
            onChange={handleLoanTenureChange}
          />
        </div>
        <div>
          <label>Loan Tenure Type</label>
          <label>
            <input
              type="radio"
              name="tenureType"
              value="monthly"
              checked={tenureType === "monthly"}
              onChange={handleTenureTypeChange}
            />
            Monthly
          </label>
          <label>
            <input
              type="radio"
              name="tenureType"
              value="yearly"
              checked={tenureType === "yearly"}
              onChange={handleTenureTypeChange}
            />
            Yearly
          </label>
        </div>
        <button onClick={handleCalculate}>Calculate</button>

        <div ref={resultsRef} className="result">
          {monthlyPayment && (
            <div>
              <label>Monthly Payment</label>
              <input type="text" value={monthlyPayment} disabled />
            </div>
          )}
          {totalPayment && (
            <div>
              <label>Total Payment</label>
              <input type="text" value={totalPayment} disabled />
            </div>
          )}
          {totalInterest && (
            <div>
              <label>Total Interest</label>
              <input type="text" value={totalInterest} disabled />
            </div>
          )}
        </div>

        { monthlyPayment && totalPayment && totalInterest && (
          <>
            <LoanBill
              loanAmount={amount}
              totalInterest={totalInterest}
              totalAmount={totalPayment}
            />
            <button onClick={handleSaveLoanBill}>Save</button>
          </>
        )}
      </div>
    </>
  );
};

export default LoanCalculator;
