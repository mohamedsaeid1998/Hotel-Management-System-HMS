/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setRatingRooms } from "@/Redux/UserPort/RatingSlice/RatingSlice";

export default function RatingComponent({ roomID }) {
  const [rateValue, setRateValue] = React.useState<number | null>(2);
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const dispatch = useDispatch();
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      roomId: roomID,
    },
  });

  const submitData = (data) => {
    setRating(data);
  };
  const setRating = async (data) => {
    setLoadingBtn(true);
    try {
      const roomData = await dispatch(setRatingRooms(data));
    } finally {
      setLoadingBtn(false);
      setValue("review", "");
    }
  };
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
      component="form"
      onSubmit={handleSubmit(submitData)}
    >
      <Controller
        name="roomId"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      <Typography component="legend">Rate</Typography>
      <Controller
        name="rating"
        control={control}
        defaultValue={rateValue}
        render={({ field: { onChange } }) => (
          <Rating name="rating" onChange={onChange} />
        )}
      ></Controller>

      <TextField
        placeholder="Type in here…"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        {...register("review")}
      />

      <Box style={{ marginTop: "1rem" }}>
        <Button
          color="primary"
          variant="contained"
          style={{ textAlign: "end" }}
          type="submit"
        >
          {loadingBtn ? <CircularProgress size={24} color="inherit" /> : "Rate"}
        </Button>
      </Box>
    </Box>
  );
}
