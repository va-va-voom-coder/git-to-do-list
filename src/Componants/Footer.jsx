import React from "react";
import "../index.css";

function Footer({ isLoggedIn }) {
  return (
    <footer className="footer">
      {isLoggedIn ? (
        <p>© 2025 My App | You're logged in</p>
      ) : (
        <p>Welcome! Please login or signupgi</p>
      )}
    </footer>
  );
}

export default Footer;
