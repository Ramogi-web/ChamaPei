//  group creation ui
import { useState } from "react";
import api from "../api/axios";

export default function GroupForm() {
  const [name, setName] = useState("");

  const createGroup = async () => {
    await api.post("/groups", { name });
    alert("Group created!");
    setName("");
  };

  return (
    <div>
      <h3>Create Chama Group</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group name"
      />

      <button onClick={createGroup}>Create</button>
    </div>
  );
}