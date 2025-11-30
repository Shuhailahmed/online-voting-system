import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      {/* Top hero card */}
      <div className="card home-hero-card">
        <div className="home-hero-header">
          <div>
            <div className="hero-tag">
              <span role="img" aria-label="shield">
                🛡️
              </span>
              <span>Secure · Transparent · Paperless</span>
            </div>
            <h2 className="home-hero-title">
              Conduct modern online elections with confidence.
            </h2>
            <p className="home-hero-subtext">
              VoteX is an Online Voting System built on the MERN stack for{" "}
              <strong>Assam down town University</strong>. It allows students to
              vote from anywhere on campus while admins manage candidates,
              elections and results from one clean dashboard.
            </p>
          </div>
        </div>

        <div className="home-hero-body">
          <div className="hero-column">
            <ul className="home-bullets">
              <li>
                * <strong>One-person-one-vote:</strong> authenticated via unique{" "}
                <strong>Enrollment ID</strong>.
              </li>
              <li>
                * <strong>Role-based access:</strong> separate interfaces for{" "}
                <strong>Admin</strong> and <strong>Voter</strong>.
              </li>
              <li>
                * <strong>Real-time results:</strong> see vote counts and
                percentages immediately after elections close.
              </li>
              <li>
                * <strong>Secure storage:</strong> all data stored safely in
                MongoDB with JWT-based authentication.
              </li>
            </ul>
          </div>

          <div className="hero-column">
            <div className="home-callout-card">
              <p className="section-label">How it works</p>
              <ol className="home-steps">
                <li>
                  <strong>Register</strong> using your official Enrollment ID
                  and upload your college ID card.
                </li>
                <li>
                  <strong>Login</strong> as a voter to explore active elections
                  and candidate details.
                </li>
                <li>
                  <strong>Cast your vote</strong> – fast, simple and secure.
                </li>
                <li>
                  <strong>View results</strong> when the election is completed,
                  including live percentages for each candidate.
                </li>
              </ol>
              <p className="home-steps-footer">
                Tip: keep your Enrollment ID private – it’s your secure voter
                identity on the platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="card home-features-card">
        <p className="section-label">
          Why VoteX is perfect for college elections
        </p>
        <div className="home-feature-grid">
          <div className="home-feature">
            <h3>For Students</h3>
            <p>
              Simple login, clean interface and clear candidate information.
              Students can vote from any device connected to the campus network.
            </p>
            <ul>
              <li>🎫 Login using Enrollment ID & password</li>
              <li>🧑‍🤝‍🧑 View candidate photos, parties & manifestos</li>
              <li>📊 See election participation & final results</li>
            </ul>
          </div>

          <div className="home-feature">
            <h3>For Admins</h3>
            <p>
              Full control over elections, candidates and results – all from a
              professional admin console.
            </p>
            <ul>
              <li>🗳 Create, schedule and close elections</li>
              <li>👤 Add candidates with photos & party logos</li>
              <li>📈 Monitor total votes and live result summaries</li>
            </ul>
          </div>

          <div className="home-feature">
            <h3>For the University</h3>
            <p>
              Digital elections reduce paper usage, save time and create a clear
              audit trail for every decision.
            </p>
            <ul>
              <li>♻️ Paperless & eco-friendly election process</li>
              <li>📝 Transparent counting with stored records</li>
              <li>🔐 Secure authentication & authorization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Small footer note inside page (main footer still at bottom) */}
      <div
        style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#6b7280" }}
      >
        Built as a <strong>college project</strong> to demonstrate real-world
        usage of <strong>MongoDB, Express, React and Node.js</strong> with clean
        UI/UX principles.
      </div>
    </div>
  );
};

export default Home;
