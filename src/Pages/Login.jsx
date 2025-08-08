import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "./login.css";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login({ onLogin = () => {} }) {
  const navigate = useNavigate();
  const passwordRef = useRef();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    console.log("All registered users:", users);
    console.log("Entered email:", email);
    console.log("Entered password:", password);

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email cannot be blank.");
      return;
    }
    const foundUser = users.find((u) => u.email === email);
    if (!foundUser) {
      setEmailError("Email is not registered.");
      return;
    }

    if (!password) {
      setPasswordError("Password cannot be blank.");
      return;
    }

    if (foundUser.password !== password) {
      setPasswordError("Incorrect password.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    onLogin();
    toast.success("Login successful!");
    navigate("/Todolist");
  };

  const goToSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className="page-center">
      <div className="center-box">
        <h1>Login Page</h1>

        <div className="form-row">
          <label>Email ID</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="vaild email id"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const users = JSON.parse(localStorage.getItem("users")) || [];

                if (!email.trim()) {
                  setEmailError("Email cannot be blank.");
                  return;
                }

                const foundUser = users.find((u) => u.email === email);
                if (!foundUser) {
                  setEmailError("Email is not registered.");
                } else {
                  setEmailError("");
                  passwordRef.current.focus();
                }
              }
            }}
          />
          {emailError && <span className="error-text">{emailError}</span>}
        </div>

        <div className="form-row password-container ">
          <label>Password</label>
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Type here"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
          {passwordError && <span className="error-text">{passwordError}</span>}
        </div>
        <button className="login" onClick={handleLogin}>
          Login
        </button>
        <hr />
        <button className="already" onClick={goToSignup}>
          Create account
        </button>
      </div>
    </div>
  );
}

export default Login;
