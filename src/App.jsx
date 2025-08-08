import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Componants/Header";
import Footer from "./Componants/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Todolist from "./Pages/Todolist";
import Logout from "./Pages/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedInUser") ? true : false;
  });

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <ToastContainer position="top-right" autoClose={1500} />

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/Todolist"
          element={isLoggedIn ? <Todolist /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Logout"
          element={<Logout onLogout={() => setIsLoggedIn(false)} />}
        />
      </Routes>

      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
