import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import GroupForm from "../components/GroupForm";
import Navbar from "../components/Navbar";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔁 Load groups from backend (UNCHANGED)
  const loadGroups = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/groups");

      setGroups(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load groups. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <Navbar />

     {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          margin: "10px 20px",
          padding: "8px 12px",
          cursor: "pointer"
        }}
      >
        ← Back to Dashboard
      </button>

      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h1>My Chama Groups</h1>

        {/* CREATE GROUP SECTION */}
        <div style={{ marginBottom: "30px" }}>
          <GroupForm onSuccess={loadGroups} />
        </div>

        {/* STATUS */}
        {loading && <p>Loading groups...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* EMPTY STATE */}
        {!loading && groups.length === 0 && !error && (
          <div style={{ padding: "15px", background: "#f1f5f9", borderRadius: "8px" }}>
            <p>No groups found yet.</p>
            <p>Create your first chama group above 👆</p>
          </div>
        )}

        {/* GROUP LIST */}
        {groups.length > 0 && (
          <div>
            <h3>Your Groups</h3>

            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => navigate(`/groups/${group.id}`)}
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  background: "#ffffff",
                  transition: "0.2s"
                }}
              >
                <h4 style={{ margin: "0" }}>{group.name}</h4>

                <small style={{ color: "#666" }}>
                  Click to open → add contributions & view balances
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}