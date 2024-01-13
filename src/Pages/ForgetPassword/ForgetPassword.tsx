import { ChevronRight } from "@mui/icons-material";
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
import { fetchData } from "../../Redux/Features/Auth/ForgetPasswordSlice";
import "./ForgetPassword.module.scss";
import { useEffect } from "react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isForgetPassword, loading } = useSelector(
    (state) => state.ForgetPassword
  );
  console.log(isForgetPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    dispatch(fetchData(data));
  };
  if (isForgetPassword) {
    console.log(loading);
    console.log("isForgetPassword", isForgetPassword);
    navigate("/reset-password");
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
            Forgot password
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
            sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
            type="submit"
            size="large"
          >
            Send mail <ChevronRight />
          </Button>
        )}
      </form>
    </>
  );
};

export default ForgetPassword;
