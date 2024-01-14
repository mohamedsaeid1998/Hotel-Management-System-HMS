import { useLocation } from "react-router-dom";
import "./AuthBackground.module.scss";

const AuthBackground = () => {
  const { pathname } = useLocation();
  const backgroundImage =
    pathname === "/login"
      ? "auth-background"
      : pathname === "/register"
      ? "auth-background2"
      : pathname === "/forget-password"
      ? "auth-background3"
      : pathname === "reset-password"
      ? "auth-background3"
      : "auth-background";
  const sectionTitle =
    pathname === "/login"
      ? "Sign in to Roamhome"
      : pathname === "/register"
      ? "Sign up to Roamhome"
      : pathname === "/forget-password"
      ? "Forgot password"
      : pathname === "reset-password"
      ? "Reset Password"
      : null;
  const sectionDesc =
    pathname === "/login"
      ? "Homes as unique as you."
      : pathname === "/register"
      ? "Homes as unique as you."
      : pathname === "/forget-password"
      ? "Homes as unique as you."
      : pathname === "reset-password"
      ? "Homes as unique as you."
      : null;

  return (
    <>
      <div className={`auth ${backgroundImage}`}>
        <div className="auth-desc">
          <h3>{sectionTitle}</h3>
          <p>{sectionDesc}</p>
        </div>
      </div>
    </>
  );
};

export default AuthBackground;
