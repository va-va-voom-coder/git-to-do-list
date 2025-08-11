import React, { useEffect } from "react";
import "./Login";
import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div>
      <h1>Thank you signin or Login Again </h1>
      <button className="login" onClick={goToLogin}>
        Login Again or signup
      </button>
    </div>
  );
}

export default Logout;
