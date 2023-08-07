import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


import { useTitle } from "../../hooks/useTitle";
import "./styles.css";

const Home = () => {
  useTitle("Home");

  return (
    <>
      <div className="calculator-container">
        <Link to="/loan-calculator" className="calculator-card">
          <div>
            <h2>LoanCalculator</h2>
            <hr />
            <p>
              This Calculator use for Get calculation of the Time Period and
              interest of Loan. Additionally, logged in users can save their
              calculations.,
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
