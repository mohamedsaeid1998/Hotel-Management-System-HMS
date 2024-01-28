/** @format */

import { CommentUserRoom } from "@/Redux/UserPort/CommentUerRoom/CommentUerRoomSlice";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const FeedbackComponent = ({ roomID }) => {
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      roomId: roomID,
    },
  });

  const submitData = (data) => {
    setComment(data);
  };
  const setComment = async (data) => {
    setLoadingBtn(true);
    try {
      const roomCommentData = await dispatch(CommentUserRoom(data));
    } finally {
      setLoadingBtn(false);
      setValue("comment", "");
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(submitData)} >
      <TextField
        // style={{ position: "fixed", left: 0, bottom: 0, width: "100%" }}
        placeholder="Type in here…"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        {...register("comment")}
      />
      <Box style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          style={{ textAlign: "end" }}
          color="primary"
          type="submit"
        >
          {loadingBtn ? <CircularProgress size={24} color="inherit" /> : "Send"}
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackComponent;
