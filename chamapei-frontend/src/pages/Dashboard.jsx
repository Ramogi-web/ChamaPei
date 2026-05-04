import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [tips, setTips] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingTips, setLoadingTips] = useState(false);

  const navigate = useNavigate();

  // 📁 LOAD GROUPS
  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoadingGroups(true);

        const res = await api.get("/groups");
        setGroups(res.data || []);
      } catch (err) {
        console.error("Groups error:", err);
      } finally {
        setLoadingGroups(false);
      }
    };

    loadGroups();
  }, []);

  // 🤖 AI SAVINGS TIPS (RESTORED)
  const getTips = async () => {
    try {
      setLoadingTips(true);

      const res = await api.post("/ai/tips", {
        balance: 0,
        transactions: []
      });

      setTips(res.data.tips || []);
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setLoadingTips(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "850px", margin: "auto" }}>
        <h1>Chamapei Dashboard 🏠</h1>

        {/* 🧭 WELCOME SECTION */}
        <div style={boxStyle}>
          <h3>Welcome 👋</h3>
          <p>
            Manage your chama groups, track contributions, paste M-PESA SMS,
            and split money automatically.
          </p>
        </div>

        {/* ⚡ QUICK ACTIONS */}
        <div style={boxStyle}>
          <h3>Quick Actions</h3>

          <button onClick={() => navigate("/groups")}>
            📁 View Groups
          </button>

          <button
            onClick={() => navigate("/GroupForm")}
            style={{ marginLeft: "10px" }}
          >
            ➕ Create Group
          </button>
        </div>

        {/* 👥 GROUPS LIST */}
        <div style={boxStyle}>
          <h3>Your Groups</h3>

          {loadingGroups && <p>Loading groups...</p>}

          {!loadingGroups && groups.length === 0 && (
            <p>No groups yet. Create your first group 👆</p>
          )}

          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => navigate(`/groups/${group.id}`)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "8px",
                cursor: "pointer",
                background: "#f9fafb"
              }}
            >
              <strong>{group.name}</strong>
              <p style={{ margin: 0, fontSize: "12px" }}>
                Click to open group dashboard
              </p>
            </div>
          ))}
        </div>

        {/* 📌 HOW IT WORKS */}
        <div style={boxStyle}>
          <h3>How Chamapei Works</h3>

          <ul>
            <li>1. Create a group</li>
            <li>2. Add members</li>
            <li>3. Paste M-PESA SMS in group</li>
            <li>4. System records contributions automatically</li>
            <li>5. Split money among members</li>
          </ul>
        </div>

        {/* 🤖 AI SAVINGS TIPS */}
        <div style={boxStyle}>
          <h3>AI Savings Tips 🤖</h3>

          <button onClick={getTips} disabled={loadingTips}>
            {loadingTips ? "Generating..." : "Get AI Savings Tips"}
          </button>

          <ul style={{ marginTop: "10px" }}>
            {tips.length === 0 && !loadingTips && (
              <p>No tips yet. Click to generate insights.</p>
            )}

            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const boxStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  marginBottom: "15px"
};