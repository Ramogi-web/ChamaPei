import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function GroupForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createGroup = async () => {
    if (!name.trim()) return alert("Group name is required");

    try {
      setLoading(true);

      const res = await api.post("/groups", { name });

      alert("Group created successfully!");

      setName("");

      if (onSuccess) onSuccess(res.data);

    } catch (err) {
      console.error(err);
      alert("Failed to create group");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>

      {/* 🔙 BACK HOME BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "15px",
          padding: "8px 12px",
          cursor: "pointer"
        }}
      >
        ← Back Home
      </button>

      <h3>Create Chama Group</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter group name"
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={createGroup} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}