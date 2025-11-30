import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";

const AdminResults = () => {
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // load completed elections once
  useEffect(() => {
    api
      .get("/elections/completed")
      .then((res) => setCompleted(res.data))
      .catch(() => {});
  }, []);

  // function to load results once
  const fetchResults = async (electionId) => {
    if (!electionId) return;
    setLoading(true);
    try {
      const res = await api.get(`/votes/results/${electionId}`);
      setResults(res.data);
    } catch (err) {
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  // when selected election changes, start polling every 5 seconds
  useEffect(() => {
    if (!selected) return;

    // load immediately
    fetchResults(selected);

    // then poll every 5 seconds
    const intervalId = setInterval(() => {
      fetchResults(selected);
    }, 5000);

    // cleanup on change/unmount
    return () => clearInterval(intervalId);
  }, [selected]);

  const activeElection = completed.find((e) => e._id === selected) || null;

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Live Election Results (Admin)</h2>
        <p className="card-subtitle">
          View real-time vote counts for each candidate. Data refreshes every{" "}
          <strong>5 seconds</strong>.
        </p>

        <div style={{ marginTop: "0.75rem", maxWidth: "420px" }}>
          <select
            className="select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select a completed election</option>
            {completed.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>

        {activeElection && (
          <p
            style={{
              marginTop: "0.4rem",
              fontSize: "0.85rem",
              color: "#6b7280",
            }}
          >
            Showing results for: <strong>{activeElection.title}</strong>
          </p>
        )}
      </div>

      {selected && (
        <div className="card">
          <h3 className="card-title">Candidate-wise Results</h3>
          {loading && <p>Updating results...</p>}

          {!loading && results && (
            <>
              <p className="card-subtitle">
                Total Votes: <strong>{results.totalVotes}</strong>
              </p>

              <div style={{ overflowX: "auto", marginTop: "0.75rem" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.9rem",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={thStyle}>#</th>
                      <th style={thStyle}>Candidate</th>
                      <th style={thStyle}>Party</th>
                      <th style={thStyle}>Votes</th>
                      <th style={thStyle}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.results.map((r, index) => (
                      <tr key={r.candidateId}>
                        <td style={tdStyle}>{index + 1}</td>
                        <td style={tdStyle}>{r.name}</td>
                        <td style={tdStyle}>{r.party}</td>
                        <td style={tdStyle}>{r.votes}</td>
                        <td style={tdStyle}>{r.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.8rem",
                  color: "#9ca3af",
                }}
              >
                This table includes candidates with zero votes as well, updated
                automatically.
              </p>
            </>
          )}

          {!loading && !results && (
            <p style={{ marginTop: "0.75rem" }}>
              No votes have been cast for this election yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const thStyle = {
  textAlign: "left",
  padding: "0.5rem",
  borderBottom: "1px solid #e5e7eb",
  fontWeight: 600,
};

const tdStyle = {
  padding: "0.5rem",
  borderBottom: "1px solid #f3f4f6",
};

export default AdminResults;
