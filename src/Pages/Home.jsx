import React, { useState, useEffect } from "react";
import "../index.css";

function Home() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.name) {
      setUser(user.name);
    }
  });

  return (
    <div className="page-center">
      <div className="center-box">
        <h1>
          {" "}
          Welcome ,<br />
          {`${user}`}
        </h1>
      </div>
    </div>
  );
}

export default Home;
