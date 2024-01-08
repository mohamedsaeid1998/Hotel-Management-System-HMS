import { useLocation } from "react-router-dom";
import "./AuthBackground.module.scss";

const AuthBackground = () => {
  const { pathname } = useLocation();
  const backgroundImage =
    pathname === "/login"
      ? "auth-background"
      : pathname === "/register"
      ? "auth-background2"
      : pathname === "/forgetPassword"
      ? "auth-background3"
      : pathname === "resetPassword"
      ? "auth-background3"
      : "auth-background";

  return (
    <>
      <div className={`auth ${backgroundImage}`}>AuthBackground</div>
    </>
  );
};

export default AuthBackground;
