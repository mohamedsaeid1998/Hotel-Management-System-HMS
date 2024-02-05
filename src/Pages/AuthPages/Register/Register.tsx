/** @format */

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/Auth/RegisterSlice";
import "./Register.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isRegister } = useSelector((state) => state.register);

  const navigate = useNavigate();
  const required = "This Field is required";
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(fetchData(data));
  };
  useEffect(() => {
    if (isRegister) {
      navigate("/login");
    }
  }, [isRegister, navigate]);
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
            Sign up
          </Typography>
          <Typography>
            If you already have an account register
            <br /> You can
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#c60d0d",
                fontWeight: "bold",
              }}
            >
              Login here !
            </Link>
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            type="text"
            className="auth-input"
            label="User Name"
            color="primary"
            {...register("userName", {
              required,
            })}
            error={!!errors.userName}
            helperText={
              !!errors.userName ? errors?.userName?.message?.toString() : null
            }
          />

          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <TextField
                variant="outlined"
                type="tel"
                className="auth-input"
                label="Phone Number"
                color="primary"
                {...register("phoneNumber", {
                  required,
                  pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message:
                      "Phone number must start with 01 and be 11 digits in total",
                  },
                })}
                error={!!errors.phoneNumber}
                helperText={
                  !!errors.phoneNumber
                    ? errors?.phoneNumber?.message?.toString()
                    : null
                }
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                variant="outlined"
                type="text"
                className="auth-input"
                label="Country"
                color="primary"
                {...register("country", {
                  required,
                  minLength: {
                    value: 3,
                    message: "minlength 3 letters",
                  },
                })}
                error={!!errors.country}
                helperText={
                  !!errors.country ? errors?.country?.message?.toString() : null
                }
              />
            </Grid>
          </Grid>

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
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*0-9]).{5,}$/,
                message:
                  "password must be 5 char, contains one uppercase letter, one lowercase letter, and  special char or number",
              },
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

          {/* <InputLabel sx={{ marginTop: "5px" }}>Profile Image</InputLabel> */}
          {/* <FormControl sx={{ width: "100%" }}>
            <Input type="file" {...register("profileImage")} />
          </FormControl> */}

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Profile Image
            <VisuallyHiddenInput
              type="file"
              {...register("profileImage")}
              error={!!errors.profileImage}
              helperText={
                !!errors.profileImage
                  ? errors?.profileImage?.message?.toString()
                  : null
              }
            />
          </Button>
          <Button
            type="submit"
            sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
            variant="contained"
          >
            Sign up
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Register;
