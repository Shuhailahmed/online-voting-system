import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";

const AdminCandidates = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({
    name: "",
    party: "",
    manifesto: "",
    partyLogo: null,
    photo: null,
  });

  useEffect(() => {
    api
      .get("/elections")
      .then((r) => setElections(r.data))
      .catch((err) => {
        console.error("Failed to load elections for candidates:", err);
        alert(
          err.response?.data?.message ||
            "Failed to load elections. Check backend."
        );
      });
  }, []);

  const loadCandidates = () => {
    if (!selectedElection) return;
    api
      .get(`/candidates/election/${selectedElection}`)
      .then((r) => setCandidates(r.data))
      .catch((err) => {
        console.error("Failed to load candidates:", err);
        alert(
          err.response?.data?.message ||
            "Failed to load candidates for this election."
        );
      });
  };

  useEffect(() => {
    loadCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedElection]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setForm({ ...form, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedElection) {
      alert("Please select an election first.");
      return;
    }
    if (!form.name.trim() || !form.party.trim()) {
      alert("Please enter candidate name and party.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("party", form.party);
      fd.append("manifesto", form.manifesto);
      if (form.partyLogo) fd.append("partyLogo", form.partyLogo);
      if (form.photo) fd.append("photo", form.photo);

      await api.post(`/candidates/${selectedElection}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({
        name: "",
        party: "",
        manifesto: "",
        partyLogo: null,
        photo: null,
      });
      loadCandidates();
    } catch (err) {
      console.error("Error adding candidate:", err);
      alert(
        err.response?.data?.message ||
          "Failed to add candidate (check backend / auth)."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete candidate?")) return;
    try {
      await api.delete(`/candidates/${id}`);
      loadCandidates();
    } catch (err) {
      console.error("Error deleting candidate:", err);
      alert(
        err.response?.data?.message ||
          "Failed to delete candidate (check backend)."
      );
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Manage Candidates</h2>
        <select
          className="select"
          value={selectedElection}
          onChange={(e) => setSelectedElection(e.target.value)}
        >
          <option value="">Select election</option>
          {elections.map((e) => (
            <option key={e._id} value={e._id}>
              {e.title}
            </option>
          ))}
        </select>

        {selectedElection && (
          <form onSubmit={handleSubmit} className="grid-2">
            <div>
              <input
                className="input"
                name="name"
                placeholder="Candidate name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className="input"
                name="party"
                placeholder="Party"
                value={form.party}
                onChange={handleChange}
              />
              <textarea
                className="input"
                name="manifesto"
                placeholder="Manifesto"
                value={form.manifesto}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div>
              <label>Party Logo</label>
              <input
                className="input"
                type="file"
                name="partyLogo"
                onChange={handleFile}
              />
              <label>Candidate Photo</label>
              <input
                className="input"
                type="file"
                name="photo"
                onChange={handleFile}
              />
              <button
                className="btn"
                type="submit"
                style={{ marginTop: "0.75rem" }}
              >
                Add Candidate
              </button>
            </div>
          </form>
        )}
      </div>

      {selectedElection && (
        <div>
          <h3 style={{ marginTop: "1rem" }}>Candidates</h3>
          {candidates.length === 0 && <p>No candidates added.</p>}
          {candidates.map((c) => (
            <div key={c._id} className="card">
              <strong>{c.name}</strong> ({c.party})
              <button
                className="btn danger"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCandidates;
