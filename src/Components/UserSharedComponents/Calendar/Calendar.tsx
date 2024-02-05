/** @format */

import { CalendarMonth } from "@mui/icons-material";
import { Box, Button, IconButton, Popover, TextField } from "@mui/material";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs, Range } from "dayjs";
import { useState } from "react";
import "./Calendar.module.scss";
import { Add, Remove } from "@mui/icons-material";

interface IProps {
  selectedDateRange?: any;
  setSelectedDateRange?: any;
}

const Calendar = ({
  selectedDateRange,
  setSelectedDateRange,
  handleIncrease,
  bookingGuestCount,
  handleDecrease,
}: IProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCalendarChange = (newDateRange: Range<Dayjs>) => {
    setSelectedDateRange(newDateRange);
  };

  const handleButtonClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelected = () => {
    handlePopoverClose();
  };

  // const startDate = selectedDateRange[0]?.format('YYYY-MM-DD')
  // const endDate = selectedDateRange[1]?.format('YYYY-MM-DD')

  // console.log(`${selectedDateRange[0]?.format('YYYY-MM-DD')} - ${selectedDateRange[1]?.format('YYYY-MM-DD')}`);

  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        className="caleBtn"
        onClick={handleButtonClick}
        variant="contained"
        color="primary"
      >
        <CalendarMonth />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangeCalendar"]}>
            <DateRangeCalendar
              value={selectedDateRange}
              onChange={handleCalendarChange}
              onAccept={handleDateSelected}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Popover>

      <TextField
        className="calendarField"
        label="Selected Date Range"
        value={`${selectedDateRange[0]?.format(
          "YYYY-MM-DD"
        )} - ${selectedDateRange[1]?.format("YYYY-MM-DD")}`}
      />
    </>
  );
};

export default Calendar;
