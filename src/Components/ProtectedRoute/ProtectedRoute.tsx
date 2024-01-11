import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { role } = useSelector((state) => state);
  console.log(role);
  if (role == null && localStorage.getItem("userRole") == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
