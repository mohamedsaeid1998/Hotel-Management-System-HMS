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
  const deleteHandler = () => {
    axios
      .delete(`http://154.41.228.234:3000/api/v0/admin/rooms/${itemId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDU2OTYyMywiZXhwIjoxNzA1Nzc5MjIzfQ.noHrXaGYeIqjYk4A3GhBcLS3CWTawveLCf7Iqr691AQ`,
        },
      })
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
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
        <form onSubmit={handleSubmit(deleteHandler)}>
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
