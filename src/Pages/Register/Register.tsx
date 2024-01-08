import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../utils/Custom/Custom";
import "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const onSubmit = (data) => {
    data.role = "user";
    const addFormData = new FormData();
    addFormData.append("userName", data["userName"]);
    addFormData.append("email", data["email"]);
    addFormData.append("password", data["password"]);
    addFormData.append("confirmPassword", data["confirmPassword"]);
    addFormData.append("phoneNumber", data["phoneNumber"]);
    addFormData.append("country", data["country"]);
    addFormData.append("role", data["role"]);
    addFormData.append("profileImage", data["profileImage"][0]);

    axios
      .post(`${baseUrl}/api/v0/portal/users`, addFormData)
      .then((res) => {
        toast.success("created successfully");
        navigate("/login");
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
            Sign up
          </Typography>
          <Typography>
            If you already have an account register
            <br /> You can
            <Link to="/login"> Login here !</Link>
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel sx={{ marginTop: "5px" }}>User Name</InputLabel>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              type="text"
              placeholder="Please type here ..."
              {...register("userName", {
                required: true,
              })}
            />
            {errors.userName && errors.userName.type === "required" && (
              <Box className="text-danger" sx={{ color: "red" }}>
                userName is required
              </Box>
            )}
          </FormControl>

          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <InputLabel sx={{ marginTop: "5px" }}>Phone Number</InputLabel>
              <FormControl sx={{ width: "100%" }}>
                <OutlinedInput
                  type="tel"
                  placeholder="Enter Your phone Number"
                  {...register("phoneNumber", {
                    required: true,
                  })}
                />
                {errors.phoneNumber &&
                  errors.phoneNumber.type === "required" && (
                    <Box className="text-danger" sx={{ color: "red" }}>
                      phone Number is required
                    </Box>
                  )}
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12}>
              <InputLabel sx={{ marginTop: "5px" }}>Country</InputLabel>
              <FormControl sx={{ width: "100%" }}>
                <OutlinedInput
                  type="text"
                  placeholder=" Enter Your country"
                  {...register("country", {
                    required: true,
                  })}
                />
                {errors.country && errors.country.type === "required" && (
                  <Box className="text-danger" sx={{ color: "red" }}>
                    country is required
                  </Box>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <InputLabel>Email Address</InputLabel>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              type="email"
              placeholder="Please enter your email "
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
          </FormControl>

          <InputLabel>Password</InputLabel>
          <FormControl sx={{ width: "100%" }}>
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
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              type="password"
              placeholder="Please Enter Confirm password ..."
              {...register("confirmPassword", {
                required: "confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "password is don't match",
              })}
            />
            {errors?.confirmPassword ? (
              <span>{errors?.confirmPassword?.message}</span>
            ) : null}
          </FormControl>
          <InputLabel sx={{ marginTop: "5px" }}>Profile Image</InputLabel>
          <FormControl sx={{ width: "100%" }}>
            <Input type="file" {...register("profileImage")} />
          </FormControl>
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
