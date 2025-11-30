import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";

const Results = () => {
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    api.get("/elections").then((r) => setCompleted(r.data));
  }, []);

  const handleViewResults = async () => {
    if (!selected) return;
    try {
      const res = await api.get(`/votes/results/${selected}`);
      setResults(res.data);
    } catch (err) {
      setResults(null);
    }
  };

  const currentElection = completed.find((e) => e._id === selected);

  return (
    <div className="results-page">
      {/* Header */}
      <div className="results-header">
        <h2>Election Results</h2>
        <p className="results-subtitle">
          View final vote counts for completed elections. Results are read-only
          and can be accessed by any registered voter.
        </p>
      </div>

      {/* Filter card */}
      <div className="card results-filter-card">
        <div className="section-label">Select election</div>
        <div className="results-filter-row">
          <select
            className="select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select completed election</option>
            {completed.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
          </select>
          <button className="btn" onClick={handleViewResults}>
            View Results
          </button>
        </div>
      </div>

      {/* Results block */}
      {results && (
        <div className="card results-card">
          <div className="results-card-header">
            <div>
              <h3 className="results-title">
                {currentElection ? currentElection.title : "Election Results"}
              </h3>
              <p className="results-meta">
                Total votes cast:{" "}
                <span className="results-count">{results.totalVotes}</span>
              </p>
            </div>
          </div>

          {results.results.length === 0 && (
            <p className="empty-state">
              No votes were recorded for this election yet.
            </p>
          )}

          {results.results.map((r) => (
            <div key={r.candidateId} className="candidate-row">
              <div className="candidate-main">
                <span className="candidate-name">{r.name}</span>
                <span className="candidate-party">({r.party})</span>
              </div>
              <div className="candidate-stat">
                <div className="candidate-bar">
                  <div
                    className="candidate-bar-fill"
                    style={{ width: `${r.percentage}%` }}
                  />
                </div>
                <span className="candidate-count">
                  {r.votes} votes · {r.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!results && completed.length === 0 && (
        <p className="empty-state">
          There are no completed elections yet. Once an election is finished,
          you’ll be able to view its results here.
        </p>
      )}
    </div>
  );
};

export default Results;
