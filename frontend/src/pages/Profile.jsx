import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <div
        className="card"
        style={{
          maxWidth: "750px",
          margin: "0 auto",
          borderRadius: "1rem",
          padding: "2rem",
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.06)",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: "700",
              color: "#1e3a8a",
            }}
          >
            My Profile
          </h2>
          <p className="subtext">Your registered student & voter identity</p>
        </div>

        {/* PROFILE INFO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1rem",
            fontSize: "1rem",
          }}
        >
          <ProfileRow label="Name" value={user?.name} />
          <ProfileRow label="Email" value={user?.email} />
          <ProfileRow label="Enrollment ID" value={user?.enrollmentId} />
          <ProfileRow label="Faculty" value={user?.faculty || "Not provided"} />
          <ProfileRow label="Role" value={user?.role} valueColor="#2563eb" />
        </div>

        {/* ID CARD PREVIEW */}
        {user?.idCardPath && (
          <div style={{ marginTop: "2rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Uploaded ID Card
            </h3>

            <img
              src={`http://localhost:5000/${user.idCardPath}`}
              alt="ID Card"
              style={{
                width: "100%",
                maxWidth: "350px",
                borderRadius: "0.75rem",
                border: "1px solid #e5e7eb",
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value, valueColor }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "0.7rem 1rem",
      borderRadius: "0.75rem",
      background: "#f8fafc",
      border: "1px solid #e5e7eb",
    }}
  >
    <strong style={{ color: "#374151" }}>{label}:</strong>
    <span style={{ color: valueColor || "#111827" }}>{value}</span>
  </div>
);

export default Profile;
