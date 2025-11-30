import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance.js";
import CandidateCard from "../components/CandidateCard.jsx";

const ElectionDetails = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    api.get(`/elections/${id}`).then((r) => setElection(r.data));
    api.get(`/candidates/election/${id}`).then((r) => setCandidates(r.data));
  }, [id]);

  const handleVote = async (candidateId) => {
    setMessage("");
    setShowPopup(false);

    try {
      const res = await api.post(`/votes/${id}`, { candidateId });
      setMessage(res.data.message);
      setShowPopup(true);

      // Auto-hide popup after 3 sec
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error while voting");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  if (!election) return <p>Loading...</p>;

  return (
    <div style={{ position: "relative" }}>
      {/* ⭐ Popup Message (Slide Down) */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 22px",
            borderRadius: "8px",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            animation: "slideDown 0.4s ease-out",
            zIndex: 2000,
          }}
        >
          {message}
        </div>
      )}

      {/* Popup animation injection */}
      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translate(-50%, -30px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>

      <div className="card">
        <h2>{election.title}</h2>
        <p style={{ marginTop: "0.5rem" }}>{election.description}</p>
      </div>

      <h3>Candidates</h3>
      {candidates.length === 0 && <p>No candidates added yet.</p>}

      <div className="grid-2">
        {candidates.map((c) => (
          <CandidateCard key={c._id} candidate={c} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default ElectionDetails;
