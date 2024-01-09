/** @format */

import React, { useState } from "react";
import { deleteImg } from "@/Assets/Images";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";
import { FormControl } from "@mui/base/FormControl";
import { deleteRoom } from "@/Redux/Features/Rooms/DeleteRoomSlice";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = ({
  itemId,
  getData,
  handleSubmit,
  handleCloseDialog,
  openDialog,
}) => {
  const id = itemId;
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(deleteRoom(id));
    getData();
  };

  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={{ textAlign: "end" }} sx={{ borderRadius: "50%" }}>
        <Button
          color="error"
          sx={{ borderRadius: "70%", minWidth: "2.5rem" }}
          onClick={handleCloseDialog}
          variant="outlined"
        >
          x
        </Button>
      </DialogTitle>
      <DialogContent dividers style={{ textAlign: "center" }}>
        <DialogContentText id="alert-dialog-slide-description">
          <img src={deleteImg} alt="Delete Modal Image" />
        </DialogContentText>
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

export default DeleteModal;
