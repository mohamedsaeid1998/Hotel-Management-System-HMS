import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  if (localStorage.getItem("authToken")&&localStorage.getItem("userRole")==="admin" ) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
