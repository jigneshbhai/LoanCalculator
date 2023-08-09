import axios from "axios";

const API_URL = "/api/loan-bill/";

const saveLoanBill = async (userId, loanBillData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_URL}save-loan-bill`,
      { userId, ...loanBillData },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchLoanBills = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${API_URL}fetch-loan-bills?userId=${userId}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteLoanBill = async (userId, token, billId) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.delete(
      `${API_URL}delete-loan-bill/${billId}`, // Corrected URL here
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const calculatorService = {
  saveLoanBill,
  fetchLoanBills,
  deleteLoanBill,
};

export default calculatorService;
