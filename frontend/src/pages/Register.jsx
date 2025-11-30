import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const faculties = [
  "BCA (BCAO)",
  "BPT",
  "BBA",
  "BSc Nursing",
  "B.Tech CSE",
  "B.Tech ECE",
  "MBA",
  "Other",
];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    enrollmentId: "",
    faculty: "",
    password: "",
    idCard: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    setForm((prev) => ({ ...prev, idCard: file || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, enrollmentId, faculty, password, idCard } = form;

    // basic validation
    if (!name || !email || !enrollmentId || !faculty || !password) {
      setError("Please fill all the fields.");
      return;
    }

    if (!idCard) {
      setError("Please upload your college ID card.");
      return;
    }

    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("email", email.trim());
    fd.append("enrollmentId", enrollmentId.trim());
    fd.append("faculty", faculty);
    fd.append("password", password);
    fd.append("idCard", idCard);

    const res = await register(fd);

    if (res.success) {
      // clear form and go to login page
      setForm({
        name: "",
        email: "",
        enrollmentId: "",
        faculty: "",
        password: "",
        idCard: null,
      });
      navigate("/login");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <h2>Student Registration</h2>
        <p
          style={{
            marginTop: "0.4rem",
            fontSize: "0.9rem",
            color: "#6b7280",
          }}
        >
          Register using your official <strong>Enrollment ID</strong>. This will
          be used as your voter identity. Upload your college ID card for
          verification.
        </p>

        {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ marginTop: "0.75rem" }}>
          <input
            className="input"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="input"
            name="email"
            type="email"
            placeholder="College Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="input"
            name="enrollmentId"
            placeholder="Enrollment ID (e.g. ADTU/1/2023-26/BCAO/038)"
            value={form.enrollmentId}
            onChange={handleChange}
          />

          {/* Faculty dropdown */}
          <select
            className="select"
            name="faculty"
            value={form.faculty}
            onChange={handleChange}
          >
            <option value="">Select Faculty / Programme</option>
            {faculties.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          {/* ID card upload */}
          <label style={{ fontSize: "0.85rem", color: "#4b5563" }}>
            Upload College ID Card (JPG / PNG)
          </label>
          <input
            className="input"
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFile}
          />

          <button
            className="btn"
            type="submit"
            style={{ marginTop: "0.75rem" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
