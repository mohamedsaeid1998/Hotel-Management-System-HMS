import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../utils/Custom/Custom";
import "./ForgetPassword.module.scss";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/api/v0/portal/users/forgot-password`, data)
      .then((res) => {
        toast.success("send successfully");
        navigate("/resetPassword");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
            Forgot password
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

        <Button
          type="submit"
          sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
          variant="contained"
        >
          Send mail
        </Button>
      </form>
    </>
  );
};

export default ForgetPassword;
