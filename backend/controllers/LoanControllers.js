const asyncHandler = require("express-async-handler");

const loanModel = require("../models/LoanModel");

//postcalculation
const postCalculation = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please Provide a name for your calculation");
  }

  const calculation = await loanModel.create({
    user: req.user.id,
    name: req.body.name,
    formData: req.body.formData,
  });

  req.status(200).json(calculation);
});

//getcalculations
const getCalculations = asyncHandler(async (req, res) => {
  const calculation = await loanModel.find({ user: req.user.id });

  res.status(200).json(calculation);
});

//getsingal calculation
const getCalculation = asyncHandler(async (req, res) => {
  const calculation = await calculatorModel.findById(req.params.id);

  if (!calculation) {
    res.status(400);
    throw new Error("Calculation does not exist.");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Make sure the logged in user matches the calculation owner
  if (calculation.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  res.status(200).json(calculation);
});

//put calculation
const putCalculation = asyncHandler(async (req, res) => {
  const calculation = await calculatorModel.findById(req.params.id);

  if (!calculation) {
    res.status(400);
    throw new Error("Calculation does not exist.");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Make sure the logged in user matches the calculation owner
  if (calculation.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  // If updating only name
  if (req.body.name) {
    const updatedCalculation = await calculatorModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name.trim() } },
      { new: true }
    );

    res.status(200).json(updatedCalculation);
    return;
  }

  const updatedCalculation = await calculatorModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { formData: req.body.formData } },
    { new: true }
  );

  res.status(200).json(updatedCalculation);
});

//delete calculation
const deleteCalculation = asyncHandler(async (req, res) => {
  const calculation = await calculatorModel.findById(req.params.id);

  if (!calculation) {
    res.status(400);
    throw new Error("Calculation does not exist.");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Make sure the logged in user matches the calculation owner
  if (calculation.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await calculation.remove();

  res.status(200).json({ id: req.params.id, name: calculation.name });
});

module.exports = {
  postCalculation,
  getCalculations,
  getCalculation,
  putCalculation,
  deleteCalculation,
};
