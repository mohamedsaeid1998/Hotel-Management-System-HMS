import { fetchDataStart } from "@/Redux/Features/Auth/RegisterSlice";
import { ChevronRight, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/Auth/LoginSlice";
import './LoginDialog.module.scss';
interface IProps {
  open: boolean,
  handleClose: () => void
}

const LoginDialog = ({ open, handleClose }: IProps) => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);
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
      const ele = await dispatch(fetchData(data));
      if (ele?.payload === "user")
        window.location.reload();

      if (ele?.payload === "admin")
        navigate('./dashboard')
    },
    [dispatch]
  );


  useEffect(() => {
    dispatch(fetchDataStart(false));
  }, [dispatch]);

  // function handleCallbackResponse(response: any) {
  //   localStorage.setItem("authToken", response.credential);
  //   const accessToken = localStorage.getItem("authToken");
  //   baseUrl
  //     .post("/api/v0/portal/users/auth/google", { accessToken })
  //     .then((res) => {
  //       localStorage.setItem("authToken", res.data.data.token);
  //       localStorage.setItem("userRole", res.data.data.user.role);
  //       localStorage.setItem("userId", res.data.data.user._id);
  //       console.log(res.data.message);
  //       navigate("/dashboard");
  //       toast.success(res.data.message, {
  //         autoClose: 2000,
  //         theme: "colored",
  //       });
  //     })
  //     .catch((error) =>
  //       toast.error(error, {
  //         autoClose: 2000,
  //         theme: "colored",
  //       })
  //     );
  // }



  return <>

    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className='title' >
        LOGIN
      </DialogTitle>
      <DialogContent>
        <DialogContentText >
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
                to="/register"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Registration ?
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
          </Box >
        </DialogContentText>
      </DialogContent>
    </Dialog>



  </>
}

export default LoginDialog