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
      <h1>Thank you</h1>
      <button className="login" onClick={goToLogin}>
        Login Again
      </button>
    </div>
  );
}

export default Logout;
