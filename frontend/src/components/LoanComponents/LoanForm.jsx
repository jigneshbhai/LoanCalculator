import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

import {
	closeCalculation,
	createCalculation,
	getCalculations,
	getCalculation,
	deleteCalculation,
	updateCalculation,
	renameCalculation,
} from "../../features/loanCalculator/loanCalculatorSlice"
import {
  durationMultipliers,
  contributionFrequencies,
} from "../../assets/data";
import calculateSimpleInterest from "../../helpers/calculateSimpledInterest";
import FormGroup from "../FormComponents/FormGroup";
import BalanceInput from "../FormComponents/BalanceInput";
import CurrencySelector from "../FormComponents/CurrencySelector";

const LoanForm = ({
  user,
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  setReport,
  setCalculationCount,
  setLoadingCalculation,
  setActiveCalculationId,
}) => {
  const [calculationName, setCalculationName] = useState("");
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  const { activeCalculation, calculations, isLoading } = useSelector(
    (state) => state.loanCalculations
  );
  const { currency } = useSelector((state) => state.currency);

  const dispatch = useDispatch();

  const {
    loanAmount,
    interestRate,
    compoundFrequency,
    duration,
    durationMultiplier,
  } = formData || {};

  const contributionRef = useRef();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formValidated = () => {
    const requiredFields = [loanAmount, interestRate, duration];
    const requiredFieldLabels = ["loanAmount", "interestRate", "duration"];
    const errors = { ...formErrors };

    requiredFields.forEach((rf, i) => {
      const notNumberAndEmpty = !(!isNaN(rf) && rf !== "");
      errors[requiredFieldLabels[i]] = notNumberAndEmpty;
      setFormErrors(errors);
    });

   
    

    // Check that all the required and optional fields are numbers and not empty values
    return (
      requiredFields.every((rf) => !isNaN(rf) && rf !== "")
    );
  };

  const handleCalculation = (e) => {
    e.preventDefault();
    // Default value for contributions is 0
     setFormData({ ...formData, contribution: 0 });

    if (formValidated()) {
      const compoundInterest = calculateSimpleInterest(formData);
      let breakdown;

      // If investment duration is over 24 months set the chart breakdown option to yearly
      if (durationMultiplier.value * duration >= 24) {
        breakdown = "yearly";
      } else {
        breakdown = "monthly";
      }

      setReport({
        ...compoundInterest,
        
        currency,
        breakdown,
      });
      setCalculationCount((prev) => prev + 1);
      setLoadingCalculation(true);
    } else {
      toast.error("Incorrect field values");
    }
  };

  const resetCalculator = () => {
    const errors = { ...formErrors };

    setFormData({
      loanAmount: "",
      interestRate: "",
      duration: "",
      durationMultiplier: durationMultipliers[0],
    });

    // Reset all form errors
    for (const field in errors) {
      errors[field] = false;
    }

    setFormErrors(errors);
    setReport(null);

    toast.success("Form cleared");
  };

  const closeAndResetCalculation = () => {
    setFormData({
      loanAmount: "",
      interestRate: "",
      duration: "",
      durationMultiplier: durationMultipliers[0],
    });

    setReport(null);
    setActiveCalculationId(null);
    setCalculationName("");
  };

  const openSaveModal = () => {
    if (user) {
      if (formValidated()) {
        if (!activeCalculation) {
          // Prompt user to name the calculation
          setSaveModalOpen(true);
        } else {
          const data = {
            _id: activeCalculation._id,
            name: calculationName,
            formData,
          };

          // Update excisting active calculation
          dispatch(updateCalculation(data));
          setCalculationName("");
        }
      } else {
        toast.error("Incorrect field values");
      }
    } else {
      toast.error("Please login to save calculation");
    }
  };

  const openRenameModal = () => {
    setRenameModalOpen(true);
  };

  const openImportModal = () => {
    if (user) {
      setImportModalOpen(true);
    } else {
      toast.error("Please login to load a calculation");
    }
  };

  const closeActiveCalculation = () => {
    dispatch(closeCalculation());
    closeAndResetCalculation();
  };

  const toggleContributionMultiplier = (e) => {
    e.preventDefault();
    setFormData({ ...formData});
    contributionRef.current.focus();
  };

  

  return (
    <div className="form">
      <form onSubmit={handleCalculation}>
        <FormGroup>
          <BalanceInput
            balance={loanAmount}
            error={formErrors.loanAmount}
            handleChange={handleChange}
          />
          <CurrencySelector />
        </FormGroup>
      </form>
    </div>
  );
};

export default LoanForm;
