/** @format */

import { fetchDataStart } from "@/Redux/Features/Auth/RegisterSlice";
import baseUrl from "@/utils/Custom/Custom";
import { ChevronRight, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchData } from "../../../Redux/Features/Auth/LoginSlice";
import "./Login.module.scss";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, islogged } = useSelector((state) => state.login);
  const required = "This Field is required";
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback(
    async (data: { email: string; password: string }) => {
      dispatch(fetchData(data));
    },
    [dispatch]
  );

  if (islogged === "admin") {
    navigate("/dashboard");
  } else if (islogged === "user") {
    navigate("/");
  }

  useEffect(() => {
    dispatch(fetchDataStart(false));
  }, [dispatch]);

  function handleCallbackResponse(response: any) {
    localStorage.setItem("authToken", response.credential);
    const accessToken = localStorage.getItem("authToken");
    baseUrl
      .post("/api/v0/portal/users/auth/google", { accessToken })
      .then((res) => {
        localStorage.setItem("authToken", res.data.data.token);
        localStorage.setItem("userRole", res.data.data.user.role);
        localStorage.setItem("userId", res.data.data.user._id);
        console.log(res.data.message);
        navigate("/dashboard");
        toast.success(res.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch((error) =>
        toast.error(error, {
          autoClose: 2000,
          theme: "colored",
        })
      );
  }

  useEffect(() => {
    const google = window.google;
    google.accounts.id.initialize({
      client_id:
        "761128849378-ee7o8qlsfc5j6a1hik63auo1oq037hs5.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

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
            Sign in
          </Typography>
          <Typography>
            If you don’t have an account register <br /> You can

            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
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
            className="auth-input"
            label="Password"
            color="primary"
            type={showPassword ? "text" : "password"}
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

          <Box sx={{ textAlign: "end" }}>
            <Link
              to="/forget-password"
              style={{
                textDecoration: "none",
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
              Login <ChevronRight />
            </Button>
          )}
          <div id="signInDiv"></div>
        </form>
      </Box >
    </>
  );
};

export default Login;

{
  /* <IconButton onClick={handleClickShowPassword} >
{showPassword ? <VisibilityOff /> : <Visibility />}
</IconButton> */
}
