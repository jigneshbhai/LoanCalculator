const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { saveLoanBill, getLoanBills, deleteLoanBill } = require("../controllers/LoanControllers");

// Route for saving the loan bill
router.post("/save-loan-bill", protect, saveLoanBill);
router.get("/fetch-loan-bills",protect, getLoanBills);
router.delete("/delete-loan-bill/:billId", protect, deleteLoanBill);

module.exports = router;
