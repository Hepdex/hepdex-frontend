import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);
  return user ? children : <div>Loading...</div>;
}
