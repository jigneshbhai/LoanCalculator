import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { reset, logout } from "../../features/auth/authSlice";
import { setDarkMode } from "../../features/theme/themeSlice";
import UserOptionsList from "./UserOptionsList";
import "./styles.css";
import NavLinks from "./NavLinks";
import Burger from "./Burger";

const Nav = () => {
  const [listOpen, setListOpen] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const listRef = useRef();
  const navLinksRef = useRef();

  const handleLogout = () => {
    setListOpen(false);
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
    toast.success("Logged out.");
  };

   const handleDarkModeChange = async () => {
     const mode = !darkMode;
     if (user) {
       try {
         dispatch(setDarkMode(mode));
       } catch (error) {
         console.error("Error updating user preferences:", error);
       }
     } else {
       dispatch(setDarkMode(mode));
       localStorage.setItem("darkMode", JSON.stringify(mode));
     }
   };

  const handleBurgerClick = () => {
    setBurgerActive(!burgerActive);
    listOpen && setListOpen(false);
  };

  useEffect(() => {
    setBurgerActive(false);
  }, [darkMode, location]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <p>
            <span>Loan</span>Calc<span>ulator</span>
          </p>
        </Link>
      </div>

      <NavLinks
        user={user}
        listOpen={listOpen}
        setListOpen={setListOpen}
        handleDarkModeChange={handleDarkModeChange}
        burgerActive={burgerActive}
        setBurgerActive={setBurgerActive}
        navLinksRef={navLinksRef}
        listRef={listRef}
      />
      <UserOptionsList
        handleLogout={handleLogout}
        listOpen={listOpen}
        setListOpen={setListOpen}
        listRef={listRef}
      />
      <Burger
        handleBurgerClick={handleBurgerClick}
        burgerActive={burgerActive}
      />
    </nav>
  );
};

export default Nav;
