/** @format */

import { Box, Button, FormLabel, TextField } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const FeedbackComponent = ({ roomID }) => {
  const [text, setText] = React.useState("");
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      roomId: roomID,
    },
  });
  // const handleCommentsChange = (event) => {
  //   setText(event.target.value);
  // };

  // const handleSubmit = () => {
  //   console.log("Customer Comments:", text);
  // };
  const submitData = (data) => {
    console.log(data);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(submitData)}>
      <TextField
        // style={{ position: "fixed", left: 0, bottom: 0, width: "100%" }}
        placeholder="Type in here…"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={text}
      />
      <Box style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          style={{ textAlign: "end" }}
          color="primary"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackComponent;
