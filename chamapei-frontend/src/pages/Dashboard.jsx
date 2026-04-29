// dashboard page(core ui)
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/dashboard").then(res => {
      setData(res.data);
    });
  }, []);


  // the ai saving tips section
const [tips, setTips] = useState([]);

const getTips = async () => {
  const res = await api.post("/ai/tips", {
    balance: data.balance,
    transactions: []
  });

  setTips(res.data.tips);
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chamapei Dashboard</h1>

      <div>
        <h3>Total Income: KSh {data.total_income}</h3>
        <h3>Total Expense: KSh {data.total_expense}</h3>
        <h2>Balance: KSh {data.balance}</h2>
      </div>

      <div>
         <button onClick={getTips}>Get AI Savings Tips</button>

         <ul>
            {tips.map((t, i) => (
            <li key={i}>{t}</li>
             ))}
         </ul>
      </div>
    </div>
  );
}


