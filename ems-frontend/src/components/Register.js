import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.department
    ) {
      alert("All fields are required!");
      return;
    }

    // Send data to Flask backend
    fetch("http://127.0.0.1:5000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Registration successful!");

        // ✅ Clear form after success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          department: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // ✅ vertical centering
        height: "100vh", // ✅ full page height
        backgroundColor: "#f9f9f9",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "340px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center", // ✅ center content
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Register</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
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

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
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

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
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

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
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
            width: "80%", // ✅ same width as inputs
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "15px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        {/* Blue link to Login */}
        <p style={{ marginTop: "15px" }}>
          <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>
            Go to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
