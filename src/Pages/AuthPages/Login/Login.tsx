import { fetchDataStart } from "@/Redux/Features/Auth/RegisterSlice";
import { ChevronLeft } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/Auth/LoginSlice";
import "./Login.module.scss";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, islogged } = useSelector((state) => state.login)
  const required = "This Field is required";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // useCallback(async()=>{try{}catch{}},[])
  const onSubmit = useCallback(async (data: { email: string; password: string }) => {
    dispatch(fetchData(data))

  }, [dispatch])

  if (islogged === "admin") {
    navigate("/dashboard");
  } else if (islogged === "user") {
    navigate("/");
  }
  console.log(islogged);



  useEffect(() => {

    dispatch(fetchDataStart(false));
  }, [dispatch]);

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
                color: "#c60d0d",
                fontWeight: "bold",
              }}
            >
              {" "}
              Register here !
            </Link>
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Box sx={{ textAlign: "end" }}>
            <Link
              to="/forget-password"
              style={{
                textDecoration: "none",
                color: "#c60d0d",
                fontWeight: "bold",
              }}
            >
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
