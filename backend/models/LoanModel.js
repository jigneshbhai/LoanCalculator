const mongoose = require('mongoose');

const loanSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please name your calculation"],
      maxlength: [30, "The maximum character length for names is 30"],
    },
    formDataq: {
      loanFrequency: { value: { type: Number }, label: { type: String } },
      interestRate: { type: Number, min: 0 },
      startingBalance: { type: Number, min: 0 },
      duration: { type: Number, min: 0 },
      durationMultiplier: { value: { type: Number }, label: { type: String } },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan_Calculation", loanSchema);