import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  selectAuthToken,
  selectError,
  setAuthToken,
  setError,
} from "../../Redux/Features/Auth/LoginSlice.ts";
import baseUrl from "../../utils/Custom/Custom";
import "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: { email: string; password: string }) => {
    axios
      .post(`${baseUrl}/api/v0/admin/users/login`, data)
      .then((res) => {
        dispatch(setAuthToken(res.data.data.token));
        toast.success("Welcome");
        navigate("/dashboard");
      })
      .catch((err) => {
        dispatch(setError(err.message || "An error occurred"));
        toast.error(err.response.data.message || "An error occurred");
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
            Sign in
          </Typography>
          <Typography>
            If you don’t have an account register <br /> You can
            <Link to="/register"> Register here !</Link>
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ width: "100%", margin: "20px 0" }}>
            <OutlinedInput
              type="email"
              placeholder="Enter Your Email"
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

          <FormControl sx={{ width: "100%", margin: "20px 0" }}>
            <OutlinedInput
              type="password"
              placeholder="Please Enter Your Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <Box className="text-danger" sx={{ color: "red" }}>
                Password is required
              </Box>
            )}
          </FormControl>
          <Box sx={{ textAlign: "end" }}>
            <Link to="/forgetPassword" style={{ textDecoration: "none" }}>
              Forget Password
            </Link>
          </Box>
          <Button
            type="submit"
            sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
            variant="contained"
          >
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
