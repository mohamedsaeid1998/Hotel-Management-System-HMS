import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../utils/Custom/Custom";
import "./ResetPassword.module.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/api/v0/portal/users/reset-password`, data)
      .then((res) => {
        toast.success("send successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.message);
      });
  };
  return (
    <>
      <Box component="div">
        {" "}
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
            <Link to="/login">Login here !</Link>
          </Typography>
        </Box>
      </Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "80%", margin: "auto" }}
      >
        <InputLabel sx={{ marginTop: "5px" }}>Email</InputLabel>
        <FormControl sx={{ width: "100%", margin: "20px 0" }}>
          <OutlinedInput
            type="email"
            placeholder="Please type here ..."
            {...register("email", {
              required: true,
              pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <Box className="text-danger" sx={{ color: "red" }}>
              email is required
            </Box>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <Box component="span" sx={{ color: "red" }}>
              invalid email
            </Box>
          )}
        </FormControl>
        <InputLabel sx={{ marginTop: "5px" }}>OTP</InputLabel>
        <FormControl sx={{ width: "100%", margin: "20px 0" }}>
          <OutlinedInput
            type="text"
            placeholder="Please type here ..."
            {...register("seed", {
              required: true,
            })}
          />
          {errors.seed && errors.seed.type === "required" && (
            <Box className="text-danger" sx={{ color: "red" }}>
              OTP is required
            </Box>
          )}
        </FormControl>
        <InputLabel sx={{ marginTop: "5px" }}>Password</InputLabel>
        <FormControl sx={{ width: "100%", margin: "20px 0" }}>
          <OutlinedInput
            type="password"
            placeholder="Please type here ..."
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <Box className="text-danger" sx={{ color: "red" }}>
              password is required
            </Box>
          )}
        </FormControl>
        <InputLabel sx={{ marginTop: "5px" }}>Confirm Password</InputLabel>
        <FormControl sx={{ width: "100%", margin: "20px 0" }}>
          <OutlinedInput
            type="password"
            placeholder="Please type here ..."
            {...register("confirmPassword", {
              required: true,
            })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <Box className="text-danger" sx={{ color: "red" }}>
                confirm Password is required
              </Box>
            )}
        </FormControl>

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
