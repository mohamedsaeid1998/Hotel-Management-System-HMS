import { fetchData } from "@/Redux/Features/Auth/ChangePasswordSlice";
import { ChevronLeft, LockOpen } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(fetchData(data));
  };
  const { isConfirmPassword, loading } = useSelector(
    (state) => state.changePassword
  );
  console.log("isConfirmPassword", isConfirmPassword);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    if (isConfirmPassword && !isPasswordChanged) {
      handleClose();
      setValue("oldPassword", null);
      setValue("newPassword", null);
      setValue("confirmPassword", null);
    }
  }, [isConfirmPassword, isPasswordChanged]);
  return (
    <>
      <div>
        <ListItemButton onClick={handleOpen}>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary={"ChangePassword"} />
        </ListItemButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="changePasswordBox">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Change Password
              </Typography>
              <InputLabel sx={{ marginTop: "10px" }}>Old Password</InputLabel>
              <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                <OutlinedInput
                  type="password"
                  placeholder="Old Password"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />
                {errors.oldPassword &&
                  errors.oldPassword.type === "required" && (
                    <Box className="text-danger" sx={{ color: "red" }}>
                      Old Password is required
                    </Box>
                  )}
              </FormControl>
              <InputLabel sx={{ marginTop: "10px" }}>New password</InputLabel>
              <FormControl sx={{ width: "100%" }}>
                <OutlinedInput
                  type="password"
                  placeholder="new password"
                  {...register("newPassword", {
                    required: true,
                  })}
                />
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <Box className="text-danger" sx={{ color: "red" }}>
                      New Password is required
                    </Box>
                  )}
              </FormControl>
              <InputLabel sx={{ marginTop: "10px" }}>
                Confirm Password
              </InputLabel>
              <FormControl sx={{ width: "100%" }}>
                <OutlinedInput
                  type="password"
                  placeholder="confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <Box className="text-danger" sx={{ color: "red" }}>
                      confirm Password is required
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
                  Login
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
                  type="submit"
                  size="large"
                >
                  Change Password
                </Button>
              )}
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}
