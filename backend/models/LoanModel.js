const mongoose = require("mongoose");

// Define the LoanBill schema
const loanBillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    totalInterest: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the LoanBill model
const LoanBillModel = mongoose.model("LoanBill", loanBillSchema);

module.exports = LoanBillModel;
