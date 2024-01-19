/** @format */

import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { deleteImg } from "@/Assets/Images";
import { useDispatch } from "react-redux";
import { deleteDialog } from "@/Redux/Features/DeleteDialogSlice/DeleteDialogSlice";
import { getDataGridUtilityClass } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { pink } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteDialog = ({ getData, openDialog, handleCloseDialog, itemId }) => {
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const currentUrl = pathname.split("/").pop();
  const { handleSubmit } = useForm();
  const id = itemId;
  const dispatch = useDispatch();

  const deleteItem = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(deleteDialog({ id, currentUrl }));
      if (getData) {
        await getData();
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, getData, id, currentUrl]);

  return (
    <Dialog
      style={{ opacity: ".5", width: "100%" }}
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={{ textAlign: "end" }} sx={{ borderRadius: "50%" }}>
        <Button
          color="error"
          sx={{ borderRadius: "50% 50%", minWidth: "2.5rem" }}
          onClick={handleCloseDialog}
          variant="outlined"
        >
          <CloseIcon sx={{ color: pink[500] }} />
        </Button>
      </DialogTitle>
      <DialogContent
        id="alert-dialog-slide-description"
        style={{ textAlign: "center" }}
      >
        <img src={deleteImg} alt="Delete Modal" />
        <DialogContentText id="alert-dialog-slide-description">
          Delete This Room ?
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <form onSubmit={handleSubmit(deleteItem)}>
          <Button
            color="error"
            onClick={handleCloseDialog}
            variant="outlined"
            type="submit"
          >
            Delete this item
          </Button>
        </form>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
