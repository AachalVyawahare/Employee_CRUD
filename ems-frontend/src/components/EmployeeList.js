import React, { useEffect, useState } from "react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = () => {
    fetch("http://127.0.0.1:5000/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading employees:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://127.0.0.1:5000/employees/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => fetchEmployees())
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (emp) => {
    const firstName = prompt("Enter first name:", emp.firstName);
    const lastName = prompt("Enter last name:", emp.lastName);
    const email = prompt("Enter email:", emp.email);
    const phone = prompt("Enter phone:", emp.phone);
    const department = prompt("Enter department:", emp.department);

    fetch(`http://127.0.0.1:5000/employees/${emp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, department }),
    })
      .then((res) => res.json())
      .then(() => fetchEmployees())
      .catch((err) => console.error(err));
  };

  const handleAdd = () => {
    const firstName = prompt("Enter first name:");
    const lastName = prompt("Enter last name:");
    const email = prompt("Enter email:");
    const phone = prompt("Enter phone:");
    const department = prompt("Enter department:");

    if (!firstName || !lastName || !email || !phone || !department) {
      alert("All fields are required!");
      return;
    }

    fetch("http://127.0.0.1:5000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, department }),
    })
      .then((res) => res.json())
      .then(() => fetchEmployees())
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>
      <button onClick={handleAdd} style={{ marginBottom: "10px", padding: "8px" }}>
        Add Employee
      </button>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.department}</td>
              <td>
                <button onClick={() => handleEdit(emp)} style={{ marginRight: "5px" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
