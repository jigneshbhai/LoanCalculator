import axios from "axios";

const API_URL = "/api/users/";


// Get user data
const getUserData = async (user) => {
  const config = {
    headers: {
      Authorization: `${user.token}`,
    },
  };

  const response = await axios.get(`${API_URL}me`, config);

  if (response.data) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...response.data, token: user.token })
    );
  }

  return { ...response.data, token: user.token };
};

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  getUserData,
  register,
  logout,
  login,
};

export default authService;
