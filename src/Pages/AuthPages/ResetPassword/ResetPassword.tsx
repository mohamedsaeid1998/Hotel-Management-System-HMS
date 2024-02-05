/** @format */

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../../utils/Custom/Custom";
import "./ResetPassword.module.scss";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const required = "This Field is required";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    baseUrl
      .post(`/api/v0/portal/users/reset-password`, data)
      .then(() => {
        toast.success("send successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      <Box component="div">
        <Typography variant="h4" component="h4" sx={{ padding: "20px" }}>
          <Box component="span" sx={{ color: "skyblue" }}>
            Stay
          </Box>
          cation.
        </Typography>
      </Box>
      <Box sx={{ padding: "30px 70px" }}>
        <Box component="div">
          <Typography variant="h4" component="h4">
            Reset Password
          </Typography>
          <Typography>
            If you already have an account register <br /> You can
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "bold",
              }}
            >
              Login here !
            </Link>
          </Typography>
        </Box>
      </Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "80%", margin: "auto" }}
      >
        <TextField
          variant="outlined"
          type="email"
          className="auth-input"
          label="Email"
          color="primary"
          {...register("email", {
            required,
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is InValid",
            },
          })}
          error={!!errors.email}
          helperText={
            !!errors.email ? errors?.email?.message?.toString() : null
          }
        />
        <TextField
          variant="outlined"
          type="text"
          className="auth-input"
          label="OTP"
          color="primary"
          {...register("seed", {
            required,
          })}
          error={!!errors.seed}
          helperText={!!errors.seed ? errors?.seed?.message?.toString() : null}
        />

        <TextField
          variant="outlined"
          type={showPassword ? "text" : "password"}
          className="auth-input"
          label="Password"
          color="primary"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password", {
            required,
          })}
          error={!!errors.password}
          helperText={
            !!errors.password ? errors?.password?.message?.toString() : null
          }
        />

        <TextField
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          className="auth-input"
          label="Confirm password"
          color="primary"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("confirmPassword", {
            required,
            validate: (value) =>
              value === getValues("password") || "password is don't match",
          })}
          error={!!errors.confirmPassword}
          helperText={
            !!errors.confirmPassword
              ? errors?.confirmPassword?.message?.toString()
              : null
          }
        />
        <Button
          type="submit"
          sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
          variant="contained"
        >
          Reset
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
