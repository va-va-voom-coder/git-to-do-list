import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <nav className="navbar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/Todolist"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Todolist
            </NavLink>
            <NavLink
              to="/Logout"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/Login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
            <NavLink
              to="/Signup"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Signup
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
