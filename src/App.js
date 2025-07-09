import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Check login status on app load and attach tab/window close event
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    // Clear localStorage on browser/tab close
    const clearStorageOnClose = () => {
      localStorage.clear(); // Remove all items from localStorage
    };

    window.addEventListener("beforeunload", clearStorageOnClose);

    return () => {
      window.removeEventListener("beforeunload", clearStorageOnClose);
    };
  }, []);

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
      ) : isRegistering ? (
        <>
          <RegisterForm onRegister={handleLoginSuccess} />
          <p
            className="p"
            style={{
              textAlign: "center",
              marginBottom: "-16px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
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
                textDecoration: "underline",
              }}
            >
              Log In
            </button>
          </p>
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLoginSuccess} />
          <p
            className="p"
            style={{
              textAlign: "center",
              marginTop: "0px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
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
                textDecoration: "underline",
              }}
            >
              Register
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
