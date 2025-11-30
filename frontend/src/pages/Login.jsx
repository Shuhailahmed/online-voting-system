import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(form.email, form.password, false);
    if (res.success) navigate("/dashboard");
    else setError(res.message);
  };

  return (
    <div
      className="auth-layout"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card auth-card"
        style={{
          width: "450px",
          maxWidth: "90%",
        }}
      >
        <h2 className="auth-title">
          <b>Voter Login</b>
        </h2>
        <p className="auth-subtitle">
          Sign in with your registered email and password to access your voter
          dashboard and cast votes securely.
        </p>

        {error && (
          <p style={{ color: "#fca5a5", marginBottom: "0.8rem" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>

        <div
          style={{
            marginTop: "0.9rem",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            color: "#9ca3af",
          }}
        >
          <span>
            New here? <Link to="/register">Create voter account</Link>
          </span>
          <span>
            Admin? <Link to="/admin/login">Login here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
