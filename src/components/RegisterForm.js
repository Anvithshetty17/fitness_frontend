import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
function RegisterForm({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                email,
                password
            });
            localStorage.setItem("token", res.data.token);
            onRegister(); // notify App
        } catch (err) {
            setError("Registration failed");
        }
    };

    return (
        <div className="container">
           
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className="form" onSubmit={handleRegister}>
            <h2>Register</h2>
                <div className="flex-column">
                    <label>Email</label>
                </div>
                <div className="inputForm">
                    <input
                        type="email"
                        className="input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex-column">
                    <label>Password</label>
                </div>
                <div className="inputForm">
                    <input
                        type="password"
                        className="input"
                        placeholder="Password (min 6 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="p" style={{ color: "red" }}>{error}</p>}

                <button type="submit" className="button-submit">Sign Up</button>

               
            </form>

        </div>
    );
}

export default RegisterForm;