import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminLogin = () => {
  const { loginAdmin } = useAuth(); // now correctly provided by context
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await loginAdmin(form.email, form.password);

    setLoading(false);

    if (res.success) {
      navigate("/admin/dashboard");
    } else {
      setError(res.message || "Admin login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <h2 className="card-title">Admin Console</h2>
        <p className="card-subtitle" style={{ marginBottom: "1rem" }}>
          Restricted access. Only authorized election administrators can manage
          elections, candidates and results.
        </p>

        {error && (
          <p style={{ color: "red", marginBottom: "0.75rem" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Admin email"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Admin password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Enter Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
