import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";
import ElectionCard from "../components/ElectionCard.jsx";

const ElectionsList = () => {
  const [active, setActive] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    api.get("/elections/active").then((r) => setActive(r.data));
    api.get("/elections/upcoming").then((r) => setUpcoming(r.data));
    api.get("/elections/completed").then((r) => setCompleted(r.data));
  }, []);

  return (
    <div className="elections-page">
      {/* Active */}
      <section className="elections-section">
        <div className="elections-section-header">
          <h2 className="elections-title">Active Elections</h2>
          <p className="elections-caption">
            Elections that are currently open for voting.
          </p>
        </div>

        {active.length === 0 && (
          <p className="elections-empty">No active elections.</p>
        )}
        {active.map((e) => (
          <ElectionCard key={e._id} election={e} />
        ))}
      </section>

      {/* Upcoming */}
      <section className="elections-section">
        <div className="elections-section-header">
          <h2 className="elections-title">Upcoming Elections</h2>
          <p className="elections-caption">
            Scheduled elections that will start soon.
          </p>
        </div>

        {upcoming.length === 0 && (
          <p className="elections-empty">No upcoming elections.</p>
        )}
        {upcoming.map((e) => (
          <ElectionCard key={e._id} election={e} />
        ))}
      </section>

      {/* Completed */}
      <section className="elections-section">
        <div className="elections-section-header">
          <h2 className="elections-title">Completed Elections</h2>
          <p className="elections-caption">
            Elections that are finished and results are declared.
          </p>
        </div>

        {completed.length === 0 && (
          <p className="elections-empty">No completed elections.</p>
        )}
        {completed.map((e) => (
          <ElectionCard key={e._id} election={e} />
        ))}
      </section>
    </div>
  );
};

export default ElectionsList;
