import { ChevronRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/Auth/ForgetPasswordSlice";
import "./ForgetPassword.module.scss";
import { Helmet } from 'react-helmet'
const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const required = "This Field is required";

  const { isForgetPassword, loading } = useSelector(
    (state) => state.ForgetPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    dispatch(fetchData(data));
  };
  if (isForgetPassword) {
    navigate("/reset-password");
  }

  return (
    <>
      <Helmet>
        <title> Reset Password • Staycation</title>
      </Helmet>
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
      <Box sx={{ padding: { xs: "20px 20px",} }}>
        <Box component="div">
          <Typography variant="h4" component="h4">
            Forgot password
          </Typography>
          <Typography>
            If you already have an account register <br />
            You can
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {/*  */} Login here !
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box
        component={"form"}
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

        {loading ? (
          <LoadingButton
            sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
            className="loadingButton"
            loading
            variant="outlined"
          >
            Send mail
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            sx={{
              width: "100%",
              mt: 2,
              padding: { lg: ".5em" },
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1rem",
              },
            }}
            type="submit"
            size="large"
          >
            Send mail <ChevronRight />
          </Button>
        )}
      </Box>
    </>
  );
};

export default ForgetPassword;
