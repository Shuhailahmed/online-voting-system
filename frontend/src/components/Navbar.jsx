import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* BRAND LOGO */}
        <Link to="/" className="nav-brand">
          <span className="nav-brand-logo">X</span>
          <span className="nav-brand-text">VoteX</span>
        </Link>

        <nav className="nav-links">
          {/* ================= PUBLIC (NO LOGIN) ================= */}
          {!user && (
            <>
              <Link
                to="/login"
                className={`nav-link ${isActive("/login") ? "active" : ""}`}
              >
                Voter Login
              </Link>

              <Link
                to="/admin/login"
                className={`nav-link ${isActive("/admin") ? "active" : ""}`}
              >
                Admin Login
              </Link>

              <Link
                to="/register"
                className={`nav-link ${isActive("/register") ? "active" : ""}`}
              >
                Register
              </Link>
            </>
          )}

          {/* ================= VOTER NAVIGATION ================= */}
          {user && user.role === "voter" && (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
              >
                Dashboard
              </Link>

              <Link
                to="/elections"
                className={`nav-link ${isActive("/elections") ? "active" : ""}`}
              >
                Elections
              </Link>

              <Link
                to="/results"
                className={`nav-link ${isActive("/results") ? "active" : ""}`}
              >
                Results
              </Link>

              <Link
                to="/profile"
                className={`nav-link ${isActive("/profile") ? "active" : ""}`}
              >
                Profile
              </Link>
            </>
          )}

          {/* ================= ADMIN NAVIGATION ================= */}
          {user && user.role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className={`nav-link ${
                  isActive("/admin/dashboard") ? "active" : ""
                }`}
              >
                Admin
              </Link>

              <Link
                to="/admin/elections"
                className={`nav-link ${
                  isActive("/admin/elections") ? "active" : ""
                }`}
              >
                Elections
              </Link>

              <Link
                to="/admin/candidates"
                className={`nav-link ${
                  isActive("/admin/candidates") ? "active" : ""
                }`}
              >
                Candidates
              </Link>

              {/* ⭐ NEW — ADMIN LIVE RESULTS PAGE */}
              <Link
                to="/admin/results"
                className={`nav-link ${
                  isActive("/admin/results") ? "active" : ""
                }`}
              >
                Results
              </Link>
            </>
          )}

          {/* ================= LOGOUT BUTTON (visible when logged in) ================= */}
          {user && (
            <button className="btn small secondary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
