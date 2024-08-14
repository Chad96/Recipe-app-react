import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormPage.css";
import cryptoJS from "crypto-js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the user from the JSON server based on the entered email
      const response = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );
      const user = response.data[0];

      if (user) {
        // Decrypt the stored password
        const decryptedPassword = cryptoJS.AES.decrypt(
          user.password,
          "secret_key"
        ).toString(cryptoJS.enc.Utf8);

        // Check if the passwords match
        if (password === decryptedPassword) {
          alert("Login successful!");
          navigate("/dashboard"); // Redirect to the dashboard or any other page
        } else {
          alert("Incorrect password! Please try again.");
        }
      } else {
        alert("User not found! Please register first.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed! Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <nav className="nav justify-content-end">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </nav>
      <h2 className="text-center mb-4">Log In</h2>
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Log In
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
