import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./pages/Dashboard";
import "./App.css";
// In src/index.js or src/App.js
import './index.css'; // ✅ Must match your file name

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <>
          {isRegistering ? (
            <>
              <RegisterForm onRegister={handleLoginSuccess} />
              <p className="p" style={{ textAlign: "center",marginBottom:"-16px", fontSize: "20px",fontWeight: "bold" }}>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "bold",
                     fontSize: "20px",
                    textDecoration: "underline"
                  }}
                >
                  Log In
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginForm onLogin={handleLoginSuccess} />
              <p className="p" style={{ textAlign: "center", marginTop: "0px", fontSize: "20px",fontWeight: "bold" }}> 
                Don't have an account?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "bold",
                     fontSize: "20px",
                    textDecoration: "underline"
                   
                  }}
                >
                  Register
                </button>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
