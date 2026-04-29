//  this is the sms input box
import { useState } from "react";
import api from "../api/axios";

export default function SmsBox() {
  const [sms, setSms] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await api.post("/transactions", { sms });
    setResult(res.data);
    setSms("");
  };

  return (
    <div>
      <h3>Paste M-PESA SMS</h3>

      <textarea
        rows="4"
        value={sms}
        onChange={(e) => setSms(e.target.value)}
        placeholder="Paste SMS here..."
      />

      <button onClick={handleSubmit}>
        Save Transaction
      </button>

      {result && (
        <div>
          <p>Saved: {result.data.amount} from {result.data.sender}</p>
        </div>
      )}
    </div>
  );
}