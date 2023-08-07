const LoanBillModel = require("../models/LoanModel");
const asyncHandler = require("express-async-handler");

const saveLoanBill = asyncHandler(async (req, res) => {
  const { loanAmount, totalInterest, totalAmount } = req.body;
  const userId = req.user._id; // Assuming you have the user ID available in the req.user object after authentication

  try {
    // Create a new LoanBill document using the LoanBillModel
    const loanBill = await LoanBillModel.create({
      userId,
      loanAmount,
      totalInterest,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      data: loanBill,
    });
  } catch (error) {
    console.error("Error saving loan bill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save loan bill",
    });
  }
});

module.exports = {
  saveLoanBill,
};
