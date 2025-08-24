from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Hardcoded admin account
ADMIN = {
    "email": "admin@example.com",
    "password": "admin123"
}

# Fake in-memory employees (replace with DB later)
employees = [
    {"id": 1, "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "phone": "9876543210", "department": "IT"},
    {"id": 2, "firstName": "Jane", "lastName": "Smith", "email": "jane.smith@example.com", "phone": "8765432109", "department": "HR"},
    {"id": 3, "firstName": "Michael", "lastName": "Johnson", "email": "michael.johnson@example.com", "phone": "7654321098", "department": "Finance"},
    {"id": 4, "firstName": "Emily", "lastName": "Brown", "email": "emily.brown@example.com", "phone": "6543210987", "department": "Operations"},
    {"id": 5, "firstName": "David", "lastName": "Wilson", "email": "david.wilson@example.com", "phone": "9123456780", "department": "IT"},
    {"id": 6, "firstName": "Sophia", "lastName": "Taylor", "email": "sophia.taylor@example.com", "phone": "9234567810", "department": "Marketing"},
    {"id": 7, "firstName": "James", "lastName": "Anderson", "email": "james.anderson@example.com", "phone": "9345678921", "department": "QA"},
    {"id": 8, "firstName": "Olivia", "lastName": "Thomas", "email": "olivia.thomas@example.com", "phone": "9456789032", "department": "Design"},
    {"id": 9, "firstName": "William", "lastName": "Moore", "email": "william.moore@example.com", "phone": "9567890143", "department": "DevOps"},
    {"id": 10, "firstName": "Ava", "lastName": "Martin", "email": "ava.martin@example.com", "phone": "9678901254", "department": "Product"}
]

# ---------- LOGIN ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if data["email"] == ADMIN["email"] and data["password"] == ADMIN["password"]:
        return jsonify({"success": True, "message": "Login successful", "user": {"email": data["email"]}})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401


# ---------- EMPLOYEES ----------
@app.route("/employees", methods=["GET"])
def get_employees():
    return jsonify(employees)


@app.route("/employees", methods=["POST"])
def add_employee():
    data = request.json
    new_emp = {
        "id": len(employees) + 1,
        **data
    }
    employees.append(new_emp)
    return jsonify(new_emp)


@app.route("/employees/<int:emp_id>", methods=["PUT"])
def update_employee(emp_id):
    data = request.json
    for emp in employees:
        if emp["id"] == emp_id:
            emp.update(data)
            return jsonify({"message": "Updated"})
    return jsonify({"message": "Employee not found"}), 404


@app.route("/employees/<int:emp_id>", methods=["DELETE"])
def delete_employee(emp_id):
    global employees
    employees = [emp for emp in employees if emp["id"] != emp_id]

    # Re-index IDs so no gaps
    employees = [{**emp, "id": i+1} for i, emp in enumerate(employees)]

    return jsonify({"message": "Deleted and re-indexed"})


# ---------- START SERVER ----------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
