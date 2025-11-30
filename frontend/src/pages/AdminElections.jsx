import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";

const emptyForm = {
  title: "",
  description: "",
  status: "draft",
  startAt: "",
  endAt: "",
};

const AdminElections = () => {
  const [elections, setElections] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");

  const load = () => {
    api
      .get("/elections")
      .then((r) => setElections(r.data))
      .catch((err) => {
        console.error("Failed to load elections:", err);
        alert(
          err.response?.data?.message || "Failed to load elections from server"
        );
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple front-end validation
    if (!form.title.trim()) {
      alert("Please enter an election title.");
      return;
    }

    try {
      const payload = {
        ...form,
        // empty strings → let backend treat as null
        startAt: form.startAt || null,
        endAt: form.endAt || null,
      };

      if (editingId) {
        await api.put(`/elections/${editingId}`, payload);
      } else {
        await api.post("/elections", payload);
      }

      setForm(emptyForm);
      setEditingId("");
      load();
    } catch (err) {
      console.error("Error saving election:", err);
      alert(
        err.response?.data?.message || "Failed to save election (check backend)"
      );
    }
  };

  const handleEdit = (el) => {
    setEditingId(el._id);
    setForm({
      title: el.title,
      description: el.description || "",
      status: el.status,
      startAt: el.startAt ? el.startAt.substring(0, 16) : "",
      endAt: el.endAt ? el.endAt.substring(0, 16) : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this election?")) return;
    try {
      await api.delete(`/elections/${id}`);
      load();
    } catch (err) {
      console.error("Error deleting election:", err);
      alert(
        err.response?.data?.message ||
          "Failed to delete election (check backend)"
      );
    }
  };

  return (
    <div>
      <div className="card">
        <h2>{editingId ? "Edit Election" : "Create Election"}</h2>
        <form
          onSubmit={handleSubmit}
          className="grid-2"
          style={{ marginTop: "0.75rem" }}
        >
          <div>
            <input
              className="input"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
            <textarea
              className="input"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div>
            <select
              className="select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <label>Start</label>
            <input
              className="input"
              type="datetime-local"
              name="startAt"
              value={form.startAt}
              onChange={handleChange}
            />
            <label>End</label>
            <input
              className="input"
              type="datetime-local"
              name="endAt"
              value={form.endAt}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                className="btn secondary"
                type="button"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => {
                  setEditingId("");
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 style={{ marginTop: "1rem" }}>All Elections</h2>
      {elections.map((el) => (
        <div key={el._id} className="card">
          <h3>{el.title}</h3>
          <p>{el.description}</p>
          <p>
            <strong>Status:</strong> {el.status}
          </p>
          <button className="btn secondary" onClick={() => handleEdit(el)}>
            Edit
          </button>
          <button
            className="btn danger"
            style={{ marginLeft: "0.5rem" }}
            onClick={() => handleDelete(el._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminElections;
