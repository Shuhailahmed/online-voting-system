const CandidateCard = ({ candidate, onVote, disabled }) => {
  const baseUrl = "http://localhost:5000/";

  return (
    <div
      className="card"
      style={{
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: "1.5rem",
        background: "#ffffff",
      }}
    >
      {/* Flex layout */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
        }}
      >
        {/* Candidate Photo */}
        {candidate.photo && (
          <img
            src={baseUrl + candidate.photo}
            alt={candidate.name}
            style={{
              width: "130px",
              height: "130px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "3px solid #e5e7eb",
            }}
          />
        )}

        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            {candidate.name}
          </h3>

          <p style={{ margin: "0.4rem 0", fontSize: "0.95rem" }}>
            <strong style={{ color: "#4f46e5" }}>Party:</strong>{" "}
            {candidate.party}
          </p>

          {/* Party Logo */}
          {candidate.partyLogo && (
            <img
              src={baseUrl + candidate.partyLogo}
              alt={candidate.party + " logo"}
              style={{
                width: "100px",
                marginTop: "0.5rem",
                borderRadius: "6px",
                padding: "4px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
            />
          )}

          {/* Manifesto */}
          {candidate.manifesto && (
            <p
              style={{
                marginTop: "1rem",
                lineHeight: "1.5rem",
                color: "#374151",
                fontSize: "0.95rem",
                whiteSpace: "pre-line",
                maxWidth: "95%",
              }}
            >
              {candidate.manifesto}
            </p>
          )}

          {/* Vote Button */}
          {onVote && (
            <button
              className="btn"
              onClick={() => onVote(candidate._id)}
              disabled={disabled}
              style={{
                marginTop: "1rem",
                padding: "10px 20px",
                background: disabled ? "#9ca3af" : "#2563eb",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.95rem",
                cursor: disabled ? "not-allowed" : "pointer",
                boxShadow: "0 2px 10px rgba(37,99,235,0.3)",
                transition: "0.2s ease-in-out",
              }}
            >
              Vote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
