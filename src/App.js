import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./pages/Dashboard";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {isLoggedIn ? (
          <Dashboard onLogout={handleLogout} />
        ) : isRegistering ? (
          <div className="container mx-auto px-4 py-8">
            <RegisterForm onRegister={handleLoginSuccess} />
            <div className="text-center mt-8">
              <p className="text-gray-600 text-lg">
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold underline transition-colors duration-200"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <LoginForm onLogin={handleLoginSuccess} />
            <div className="text-center mt-8">
              <p className="text-gray-600 text-lg">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold underline transition-colors duration-200"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
