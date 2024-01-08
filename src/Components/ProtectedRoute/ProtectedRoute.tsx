import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (userData == null && localStorage.getItem("adminToken") == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
