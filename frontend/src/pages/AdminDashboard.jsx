import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalElections: 0,
    activeElections: 0,
    completedElections: 0,
    voters: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [allE, activeE, completedE] = await Promise.all([
          api.get("/elections"),
          api.get("/elections/active"),
          api.get("/elections/completed"),
        ]);

        // Fetch voters count
        let votersCount = 0;
        try {
          const voters = await api.get("/users/voters");
          votersCount = voters.data.count;
        } catch {
          votersCount = 0;
        }

        setStats({
          totalElections: allE.data.length,
          activeElections: activeE.data.length,
          completedElections: completedE.data.length,
          voters: votersCount,
        });
      } catch (error) {
        console.error("Failed to load admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Top overview card */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="section-label">Admin overview</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2>Manage elections with confidence</h2>
            <p className="subtext">
              Monitor participation, configure elections, and keep an eye on the
              overall health of the voting system in real time.
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
              fontSize: "0.85rem",
              color: "#6b7280",
              minWidth: "180px",
            }}
          >
            <div>
              Signed in as:{" "}
              <strong style={{ color: "#111827" }}>
                {user?.name || "Admin"}
              </strong>
            </div>
            <div>Role: Administrator</div>
            <div>Last action is logged for audit trail.</div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          marginBottom: "1.5rem",
        }}
      >
        <div className="card">
          <p className="section-label">Total elections</p>
          <div
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#1d4ed8",
              marginBottom: "0.25rem",
            }}
          >
            {stats.totalElections}
          </div>
          <p className="subtext">
            All elections ever configured in the system. Use this to track
            historical activity of your college elections.
          </p>
        </div>

        <div className="card">
          <p className="section-label">Active elections</p>
          <div
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#16a34a",
              marginBottom: "0.25rem",
            }}
          >
            {stats.activeElections}
          </div>
          <p className="subtext">
            Elections currently open for voting. Make sure candidate details and
            timelines are correctly configured here.
          </p>
        </div>

        <div className="card">
          <p className="section-label">Completed elections</p>
          <div
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#7c3aed",
              marginBottom: "0.25rem",
            }}
          >
            {stats.completedElections}
          </div>
          <p className="subtext">
            Results are locked and visible to voters. Ideal for generating
            reports or sharing final outcomes with departments.
          </p>
        </div>

        <div className="card">
          <p className="section-label">Registered voters (approx.)</p>
          <div
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#0f766e",
              marginBottom: "0.25rem",
            }}
          >
            {stats.voters}
          </div>
          <p className="subtext">
            Number of student accounts enrolled in the system. Each enrollment
            ID is treated as a unique voter identity.
          </p>
        </div>
      </div>

      {/* Helpful info strip */}
      <div className="card">
        <p className="section-label">Quick tips</p>
        <ul
          style={{
            listStyle: "disc",
            paddingLeft: "1.25rem",
            fontSize: "0.9rem",
            color: "#4b5563",
          }}
        >
          <li>
            Use the <strong>Elections</strong> tab to create new elections,
            update timelines, or close ongoing ones.
          </li>
          <li>
            In <strong>Candidates</strong>, attach clear photos and party logos
            so students can quickly recognize their choices.
          </li>
          <li>
            Encourage students to log in using their{" "}
            <strong>Enrollment ID</strong> to maintain one-person-one-vote
            security.
          </li>
          <li>
            After an election is completed, revisit this dashboard to check
            participation and compare with previous events.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
