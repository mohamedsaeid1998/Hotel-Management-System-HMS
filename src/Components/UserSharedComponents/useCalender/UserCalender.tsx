/** @format */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
const UserCalender = ({ price }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  return (
    <>
      {" "}
      <div>
        <CalendarMonthIcon color="secondary" />
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="start-date-picker"
        />

        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="end-date-picker"
        />
        <Typography>You will pay ${price} USD per 1 Person</Typography>

        <Box marginTop={4} >
          <Button variant="contained">
            {loadingBtn ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Continue Book"
            )}
          </Button>
        </Box>
      </div>
    </>
  );
};

export default UserCalender;
