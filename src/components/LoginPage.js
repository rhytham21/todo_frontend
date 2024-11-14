import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginPage.module.css"; // Import modular CSS
import { BaseAPI } from "./data";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    assword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Update state when input fields change
  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset any existing error messages

    try {
      // Send login request to the server
      const response = await axios.post(`${BaseAPI}/user/login`, credentials);
      const { token } = response.data;

      await localStorage.setItem("authToken", token); // Store the token in localStorage
      // const nav = () => {
      //   // navigate('/todolist');
      //   location.href = "/todolist";
      // };
      // nav();
      // location.
      setTimeout(() => {
        navigate("/todolist");
      }, 2000);
      // navigate("/todolist", { replace: true });
      // navigate("/todolist"); // Redirect to TodoList page on successful login
    } catch (error) {
      setError("Invalid email or password. Please try again."); // Set error message
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
