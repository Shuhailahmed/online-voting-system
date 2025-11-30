import { Link } from "react-router-dom";

const ElectionCard = ({ election }) => {
  return (
    <div
      className="card"
      style={{
        padding: "1.5rem",
        borderRadius: "1rem",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.3s",
      }}
    >
      <h3
        style={{
          fontSize: "1.4rem",
          fontWeight: "600",
          color: "#1e293b",
        }}
      >
        {election.title}
      </h3>

      <p
        style={{
          margin: "0.7rem 0",
          fontSize: "0.95rem",
          color: "#475569",
          lineHeight: "1.5",
        }}
      >
        {election.description}
      </p>

      <p style={{ margin: "0.3rem 0", fontSize: "0.95rem" }}>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color:
              election.status === "active"
                ? "#16a34a"
                : election.status === "completed"
                ? "#7c3aed"
                : "#2563eb",
            fontWeight: 600,
          }}
        >
          {election.status}
        </span>
      </p>

      {election.startAt && (
        <p style={{ margin: "0.2rem 0", color: "#334155" }}>
          <strong>Start:</strong> {new Date(election.startAt).toLocaleString()}
        </p>
      )}

      {election.endAt && (
        <p style={{ margin: "0.2rem 0", color: "#334155" }}>
          <strong>End:</strong> {new Date(election.endAt).toLocaleString()}
        </p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <Link
          to={`/elections/${election._id}`}
          className="btn"
          style={{
            background: "#2563eb",
            padding: "0.6rem 1.3rem",
            color: "white",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          View & Vote
        </Link>
      </div>
    </div>
  );
};

export default ElectionCard;
