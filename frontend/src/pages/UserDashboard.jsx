import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axiosInstance.js";
import ElectionCard from "../components/ElectionCard.jsx";

const UserDashboard = () => {
  const { user } = useAuth();
  const [active, setActive] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    api.get("/elections/active").then((res) => setActive(res.data));
    api
      .get("/elections/completed")
      .then((res) => setCompletedCount(res.data.length));
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Welcome, {user?.name}</h2>
            <p className="card-subtitle">
              Your Enrollment ID: <strong>{user?.enrollmentId}</strong>
            </p>
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#9ca3af",
              textAlign: "right",
            }}
          >
            <div>Role: Voter</div>
            <div>Secure one-person-one-vote system</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title">Active Elections</h3>
          <p className="card-subtitle">
            View all ongoing elections where you can still cast your vote.
          </p>
          {active.length === 0 && (
            <p style={{ marginTop: "0.6rem", color: "#9ca3af" }}>
              No active elections right now. Check back later.
            </p>
          )}
          {active.map((el) => (
            <ElectionCard key={el._id} election={el} />
          ))}
        </div>

        <div className="card">
          <h3 className="card-title">Overview</h3>
          <p className="card-subtitle">Quick stats from the voting system.</p>
          <ul
            style={{
              marginTop: "0.7rem",
              paddingLeft: "1rem",
              fontSize: "0.9rem",
              color: "#e5e7eb",
            }}
          >
            <li>
              Active elections:{" "}
              <strong style={{ color: "#60a5fa" }}>{active.length}</strong>
            </li>
            <li>
              Completed elections:{" "}
              <strong style={{ color: "#a5b4fc" }}>{completedCount}</strong>
            </li>
            <li>Each election allows only one vote per voter.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;