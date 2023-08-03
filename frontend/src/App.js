import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setDarkMode } from "./features/theme/themeSlice";
import { getUserData } from "./features/auth/authSlice";


import Nav from "./components/Nav/Nav";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";





function App() {

  const { user, message } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const [updates, setUpdates] = useState(0);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    let body = document.body;
    if (!user) {
      // When user is not logged update the local storage value for darkmode
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
    darkMode === true
      ? body.classList.add("darkmode")
      : body.classList.remove("darkmode");
    setUpdates(updates + 1);
  }, [darkMode]);

  return (
    <>
      <Router>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
