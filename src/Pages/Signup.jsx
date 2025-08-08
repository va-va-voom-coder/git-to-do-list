import React, { useState, useRef } from "react";
import "../Pages/signup.css";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const birthdayRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    isLongEnough: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        error = "Name must contain only alphabets.";
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "Email cannot be blank.";
      } else if (!emailRegex.test(value)) {
        error = "Example: abc@gmail.com or xyz@outlook.com";
      }
    }

    if (name === "password") {
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const isLongEnough = value.length >= 8;

      setPasswordCriteria({
        hasUppercase,
        hasLowercase,
        hasNumber,
        isLongEnough,
      });

      if (!value.trim()) {
        error = "Password cannot be blank.";
      } else if (
        !hasUppercase ||
        !hasLowercase ||
        !hasNumber ||
        !isLongEnough
      ) {
        error =
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be at least 8 characters.";
      } else {
        error = "";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  const goToLogin = () => {
    navigate("/Login");
  };
  const handleFormKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const { name, email, password, birthday } = formData;
    let newErrors = { ...errors };

    switch (e.target.name) {
      case "name":
        if (!name.trim()) {
          newErrors.name = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
          newErrors.name = "Name must contain only alphabets.";
        } else {
          newErrors.name = "";
          emailRef.current.focus();
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
          newErrors.email = "Email cannot be blank.";
        } else if (!emailRegex.test(email)) {
          newErrors.email = "exmaple @gmail.com,@outlook.com.";
        } else {
          newErrors.email = "";
          passwordRef.current.focus();
        }
        break;

      case "password":
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const isLongEnough = password.length >= 8;
        if (!password.trim()) {
          newErrors.password = "Password cannot be blank.";
        } else if (
          !hasUppercase ||
          !hasLowercase ||
          !hasNumber ||
          !isLongEnough
        ) {
          newErrors.password =
            "Must be 8+ chars with uppercase, lowercase & number.";
        } else {
          newErrors.password = "";
          setTimeout(() => {
            const input = birthdayRef.current?.input;
            if (input) input.focus();
          }, 0);
        }
        break;

      case "birthday":
        if (!birthday) {
          newErrors.birthday = "Please select your birthday.";
        } else {
          newErrors.birthday = "";
          handleSignup();
        }

        break;

      default:
        break;
    }
    setErrors(newErrors);
  };
  const handleSignup = () => {
    console.log("Signup button clicked");
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const birthday = formData.birthday || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // localStorage.setItem("currentUser", JSON.stringify(newUser));

    const newErrors = {
      name: !name
        ? "Name is required"
        : !/^[A-Za-z\s]+$/.test(name)
        ? "Name must contain only alphabets"
        : "",
      email: !email
        ? "Email is required"
        : !emailRegex.test(email)
        ? "Invalid email"
        : "",
      password: !password
        ? "Password is required"
        : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
        ? "Password must be 8+ chars, include uppercase, lowercase, number"
        : "",
      birthday: !birthday ? "Birthday is required" : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg);
    if (hasError) return;

    const storedUsers = localStorage.getItem("users");
    let existingUsers = [];

    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        console.log("Parsed users from localStorage:", parsedUsers);
        existingUsers = Array.isArray(parsedUsers) ? parsedUsers : [];
      } catch {
        console.log("Could not parse users from localStorage");
        existingUsers = [];
      }
    }

    const emailExists = existingUsers.some((user) => user.email === email);
    if (emailExists) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is already registered",
      }));
      toast.error("❌ Email is already registered");
      return;
    }

    const newUser = { name, email, password, birthday };
    console.log("New user to store:", newUser);
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    toast.success("✅ Signup successful!");
    navigate("/Login");
  };

  return (
    <div className="page-center">
      <div className="center-box">
        <form
          onSubmit={(e) => e.preventDefault()}
          onKeyDown={handleFormKeyDown}
        >
          <h1>Signup Page</h1>
          <div className="form-row">
            <div className="input-label-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                ref={nameRef}
              />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="form-row">
            <div className="input-label-group">
              <label htmlFor="email">Email ID:</label>
              <input
                type="email"
                id="email"
                placeholder="Valid email id"
                name="email"
                value={formData.email}
                onChange={handleChange}
                ref={emailRef}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-row">
            <div className="input-label-group password-wrapper">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Type here"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                ref={passwordRef}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            {formData.password && !errors.password && (
              <div className="password-criteria">Password looks good!</div>
            )}
            {formData.password && errors.password && (
              <div className="password-criteria">
                <div
                  style={{
                    color: passwordCriteria.hasUppercase ? "green" : "red",
                  }}
                >
                  {passwordCriteria.hasUppercase ? "" : " "}
                  uppercase
                </div>
                <div
                  style={{
                    color: passwordCriteria.hasLowercase ? "green" : "red",
                  }}
                >
                  {passwordCriteria.hasLowercase ? "" : ""} lowercase
                </div>
                <div
                  style={{
                    color: passwordCriteria.hasNumber ? "green" : "red",
                  }}
                >
                  {passwordCriteria.hasNumber ? "" : ""} digit
                </div>
                <div
                  style={{
                    color: passwordCriteria.isLongEnough ? "green" : "red",
                  }}
                >
                  {passwordCriteria.isLongEnough ? "" : ""} 8 characters
                </div>
              </div>
            )}
          </div>
          <div className="form-row">
            <div className="input-label-group">
              <label htmlFor="birthday">Birthday:</label>
              <DatePicker
                selected={
                  formData.birthday ? new Date(formData.birthday) : null
                }
                onChange={(date) =>
                  setFormData((prev) => ({
                    ...prev,
                    birthday: date.toISOString().split("T")[0],
                  }))
                }
                placeholderText="Select your birthday"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                inputRef={birthdayRef}
              />
            </div>
            {errors.birthday && (
              <div className="error-message">{errors.birthday}</div>
            )}
          </div>
          <button className="login" onClick={handleSignup}>
            Signup
          </button>
          <hr />
          <button className="already" onClick={goToLogin}>
            Alredy have account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
