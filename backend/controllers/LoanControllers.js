const LoanBillModel = require("../models/LoanModel");
const asyncHandler = require("express-async-handler");

const saveLoanBill = asyncHandler(async (req, res) => {
  const { loanAmount, totalInterest, totalAmount } = req.body;
  const userId = req.user._id; // Assuming you have the user ID available in the req.user object after authentication

  try {
    // Create a new LoanBill document using the LoanBillModel
    const loanBill = new LoanBillModel({
      userId: userId, // Use userId
      loanAmount: loanAmount, // Use loanAmount
      totalInterest: totalInterest, // Use totalInterest
      totalAmount: totalAmount, // Use totalAmount
    });

    await loanBill.save();

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

const getLoanBills = asyncHandler(async(req,res) => {
    try {
      const userId = req.user._id;
      const loanBills = await LoanBillModel.find({ userId });
      res.json(loanBills);
    } catch (error) {
      console.error("Error fetching loan bills:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch loan bills",
      });
    }
})

const deleteLoanBill = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const billId = req.params.billId; // Assuming you pass the billId as a URL parameter

    // Check if the bill exists and belongs to the user
    const billToDelete = await LoanBillModel.findOne({ _id: billId, userId });
    if (!billToDelete) {
      return res.status(404).json({
        success: false,
        message: "Loan bill not found or does not belong to the user",
      });
    }

    // Delete the bill
    await billToDelete.remove();

    res.json({
      success: true,
      message: "Loan bill deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting loan bill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete loan bill",
    });
  }
});

module.exports = {
  saveLoanBill,
  getLoanBills,
  deleteLoanBill,
};
