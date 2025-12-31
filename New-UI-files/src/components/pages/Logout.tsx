import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove logged-in user
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Logging out...</h2>
    </div>
  );
}
