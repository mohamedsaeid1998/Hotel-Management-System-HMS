import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./AuthLayout.module.scss";
import AuthBackground from "../AuthBackground/AuthBackground";
const AuthLayout = () => {
  return (
    <>
      <Grid className="authLayout" container spacing={2}>
        <Grid item md={6} sm={12}>
          <Outlet />
        </Grid>
        <Grid item md={6} sm={12}>
          <AuthBackground />
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLayout
