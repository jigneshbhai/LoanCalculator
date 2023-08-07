const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { saveLoanBill } = require("../controllers/LoanControllers");

// Route for saving the loan bill
router.post("/save-loan-bill", protect, saveLoanBill);

module.exports = router;
