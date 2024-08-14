import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormPage.css";
import cryptoJS from "crypto-js";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Encrypt password
    const encryptedPassword = cryptoJS.AES.encrypt(
      password,
      "secret_key"
    ).toString();

    // Convert profile picture to base64, hash it with SHA-256, and then register user
    if (profilePicture) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const hashedProfilePicture = hashImage(reader.result);
        await registerUser(hashedProfilePicture, encryptedPassword);
      };
      reader.readAsDataURL(profilePicture);
    } else {
      await registerUser("", encryptedPassword);
    }
  };

  const hashImage = (imageBase64) => {
    return cryptoJS.SHA256(imageBase64).toString(cryptoJS.enc.Hex);
  };

  const registerUser = async (profilePictureHash, encryptedPassword) => {
    const user = {
      username,
      email,
      password: encryptedPassword,
      profilePicture: profilePictureHash,
    };

    try {
      await axios.post("http://localhost:3000/users", user);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <nav className="nav justify-content-end">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/login">
          Log in
        </Link>
      </nav>
      <h2 className="text-center mb-4">Register</h2>
      <form
        className="form-signin"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
