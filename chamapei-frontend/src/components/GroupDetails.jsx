import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [memberName, setMemberName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [splitResult, setSplitResult] = useState(null);

  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [loadingSplit, setLoadingSplit] = useState(false);
  const [loadingMember, setLoadingMember] = useState(false);

  // 🔥 LOAD GROUP SUMMARY
  const loadSummary = async () => {
    try {
      setLoadingSummary(true);

      const res = await api.get(`/dashboard/${id}`);

      setSummary(res.data);
    } catch (err) {
      console.error("Summary error:", err?.response?.data || err.message);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, [id]);

  // 👥 ADD MEMBER
  const addMember = async () => {
    if (!memberName.trim()) return;

    try {
      setLoadingMember(true);

      await api.post(`/groups/${id}/members`, {
        name: memberName
      });

      setMemberName("");
      alert("Member added!");

    } catch (err) {
      console.error("Add member error:", err?.response?.data || err.message);
      alert("Failed to add member");

    } finally {
      setLoadingMember(false);
    }
  };

  // ⚖️ SPLIT MONEY
  const splitMoney = async () => {
    if (!totalAmount || isNaN(totalAmount)) {
      alert("Enter a valid amount");
      return;
    }

    try {
      setLoadingSplit(true);

      const res = await api.post(`/groups/${id}/split`, {
        total_amount: Number(totalAmount)
      });

      setSplitResult(res.data);

      alert("Split successful!");

      // 🔥 refresh summary after split
      loadSummary();

    } catch (err) {
      console.error("Split error:", err?.response?.data || err.message);
      alert("Failed to split money");

    } finally {
      setLoadingSplit(false);
    }
  };

  return (
    <div>
      <Navbar />

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/groups")}
        style={{
          margin: "10px 20px",
          padding: "8px 12px",
          cursor: "pointer"
        }}
      >
        ← Back to Groups
      </button>

      <div style={{ padding: "20px", maxWidth: "750px", margin: "auto" }}>
        <h1>Group Dashboard</h1>

        {/* 📊 FINANCIAL SUMMARY */}
        <div style={boxStyle}>
          <h3>Financial Summary</h3>

          {loadingSummary ? (
            <p>Loading summary...</p>
          ) : summary ? (
            <div>
              <p>💰 Income: KSh {summary.total_income}</p>
              <p>💸 Expense: KSh {summary.total_expense}</p>
              <h4>📊 Balance: KSh {summary.balance}</h4>
            </div>
          ) : (
            <p>No summary available</p>
          )}
        </div>

        {/* 👥 ADD MEMBER */}
        <div style={boxStyle}>
          <h3>Add Member</h3>

          <input
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Member name"
          />

          <button onClick={addMember} disabled={loadingMember}>
            {loadingMember ? "Adding..." : "Add Member"}
          </button>
        </div>

        {/* 💬 SMS */}
        <div style={boxStyle}>
          <h3>Transactions (SMS)</h3>

          <button onClick={() => navigate(`/groups/${id}/sms`)}>
            Go to SMS Page
          </button>
        </div>

        {/* ⚖️ SPLIT */}
        <div style={boxStyle}>
          <h3>Split Money</h3>

          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter total amount"
          />

          <button onClick={splitMoney} disabled={loadingSplit}>
            {loadingSplit ? "Splitting..." : "Split Now"}
          </button>

          {splitResult && (
            <div style={{ marginTop: "15px" }}>
              <h4>Split Results</h4>
              <pre style={{ background: "#f1f5f9", padding: "10px" }}>
                {JSON.stringify(splitResult, null, 2)}
              </pre>
            </div>
          )}
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