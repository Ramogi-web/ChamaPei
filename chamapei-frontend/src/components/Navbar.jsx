import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        Chamapei
      </h2>

      <div style={styles.links}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/groups")}>
         My Groups
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#1e293b",
    color: "white"
  },
  logo: {
    cursor: "pointer"
  },
  links: {
    display: "flex",
    gap: "10px"
  }
};