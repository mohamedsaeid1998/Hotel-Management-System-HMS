import {
  Box,
  Button,
  FormControl,
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

const ResetPassword = () => {
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
  return (
    <>
      <Box component="div">
        <Typography
          className={`subNav`}
          variant="h4"
          component="div"
          color="initial"
        >
          <Typography
            variant=""
            className="blueColor"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Stay
          </Typography>
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
          type="password"
          className="auth-input"
          label="Password"
          color="primary"
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
          type="password"
          className="auth-input"
          label="Confirm password"
          color="primary"
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
