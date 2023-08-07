const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require("./routes/UserRoutes");
const loanBillRoutes = require("./routes/LoanRoutes"); // Add this line to include the loan routes

app.use("/api/users", userRoutes);
app.use("/api/loan-bill", loanBillRoutes); // Use "/api" as the prefix for loan routes

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port: ${port}`));