/** @format */

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const BookingCalender = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#your_custom_color", // Replace with your desired color
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default BookingCalender;
