import { ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../Redux/Features/Auth/LoginSlice";
import "./Login.module.scss";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(fetchData(data));
  };
  if (localStorage.getItem("authToken") != null) {
    navigate("/dashboard");
  }

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
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {" "}
              Register here !
            </Link>
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
            <Link to="/forget-password" style={{ textDecoration: "none" }}>
              Forget Password
            </Link>
          </Box>
          {loading ? (
            <LoadingButton
              sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
              className="loadingButton"
              loading
              variant="outlined"
            >
              Login
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
              type="submit"
              size="large"
            >
              <ChevronLeft /> Login
            </Button>
          )}
        </form>
      </Box>
    </>
  );
};

export default Login;
