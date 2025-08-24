import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // For programmatic navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Both fields are required!");
      return;
    }

    // Send login request to Flask backend
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then((data) => {
        alert(data.message); // Optional: show success message
        navigate("/employees"); // Redirect
      })
      .catch((err) => {
        alert("Invalid credentials ❌");
        console.error(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "320px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center", // center contents
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "80%", // narrower input
            padding: "10px",
            margin: "10px auto",
            display: "block",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: "80%",
            padding: "10px",
            margin: "10px auto",
            display: "block",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "80%", // same width as inputs
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "15px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ marginTop: "15px" }}>
          <Link to="/register" style={{ color: "blue", textDecoration: "none" }}>
            Go to Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
