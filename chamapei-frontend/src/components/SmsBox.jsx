import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function SmsBox() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sms, setSms] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!sms.trim()) return;

    try {
      const res = await api.post("/transactions", {
        sms,
        group_id: id
      });

      setResult(res.data);
      setSms("");

      // 🔥 REDIRECT AFTER SUCCESS
      setTimeout(() => {
        navigate(`/groups/${id}`);
      }, 800);

    } catch (err) {
      console.error(err);
      alert("Failed to save transaction");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h3>Paste M-PESA SMS</h3>

        <textarea
          rows="4"
          value={sms}
          onChange={(e) => setSms(e.target.value)}
          placeholder="Paste SMS here..."
        />

        <br /><br />

        <button onClick={handleSubmit}>
          Save Transaction
        </button>

        {result && (
          <div>
            <p>Transaction saved ✔</p>
          </div>
        )}
      </div>
    </div>
  );
}