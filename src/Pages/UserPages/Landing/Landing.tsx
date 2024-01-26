import { LandingImg, RoomPicture1, RoomPicture2 } from '@/Assets/Images';
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { Add, CalendarMonth, Remove } from '@mui/icons-material';
import { Box, Button, Paper, Popover, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs, Range } from 'dayjs';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './Landing.module.scss';
import { AllAdsData } from '@/Redux/Features/Portal/getAllAdsSlice';
const Landing = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataIslogged());
  }, [dispatch]);


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    dayjs('2024-01-25'),
    dayjs('2024-01-30'),
  ]);

  const handleCalendarChange = (newDateRange: Range<Dayjs>) => {
    setSelectedDateRange(newDateRange);
  };

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelected = () => {
    handlePopoverClose();
  };

  const handleIncrease = () => {
    setCapacity(capacity + 1);
  };

  const handleDecrease = () => {
    if (capacity > 1) {
      setCapacity(capacity - 1);
    }
  };

  console.log(`${selectedDateRange[0]?.format('YYYY-MM-DD')} - ${selectedDateRange[1]?.format('YYYY-MM-DD')}`);
  const [adsData, setAdsData] = useState();

  const getAdsData = useCallback(async () => {

    try {
      // @ts-ignore
      const element = await dispatch(AllAdsData());
      // @ts-ignore
      // console.log(element.payload.data.data.rooms)
      setAdsData(element?.payload?.data?.data?.rooms);
    } finally {

    }
  }, [dispatch]);

  useEffect(() => {
    getAdsData();
  }, []);

  console.log(adsData)

  const open = Boolean(anchorEl);

  const [capacity, setCapacity] = useState(1);


  return <>
    <Box component="section" className="landingSec">

      <Box className="leftCon">

        <Typography variant="h1" className='title'>Forget Busy Work, Start Next Vacation</Typography>
        <Typography className='subTitle'>We provide what you need to enjoy your holiday with family. Time to make another memorable moments.</Typography>

        <Box className="bookingCon">

          <Typography variant="h3" className='bookingTitle'>Start Booking</Typography>
          <Typography variant="h4" className='subBookingTitle'>Pick a Date</Typography>



        </Box>

        <Box className="exploreCon">
          <Button className="caleBtn" onClick={handleButtonClick} variant="contained" color="primary">
            <CalendarMonth />
          </Button>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateRangeCalendar']}>
                <DateRangeCalendar
                  value={selectedDateRange}
                  onChange={handleCalendarChange}
                  onAccept={handleDateSelected}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Popover>


          <TextField
            className='calendarField'
            label="Selected Date Range"
            value={`${selectedDateRange[0]?.format('YYYY-MM-DD')} - ${selectedDateRange[1]?.format('YYYY-MM-DD')}`}
          />

          <Box className="capacityCon">
            <Button onClick={handleIncrease} className="caleBtn" variant="contained" color="primary">
              <Add />
            </Button>
            <TextField
              className='calendarField'
              label="Capacity"
              value={capacity}
            />
            <Button onClick={handleDecrease} className="caleBtn" variant="contained" color="error">
              <Remove />
            </Button>
          </Box>

        </Box>

        <Button className="submitExplore" variant="contained" color="primary">
          Explore
        </Button>

      </Box>

      <Box className="rightCon">

        <img className='LandingImg' src={LandingImg} alt="Landing Image" />

      </Box>

    </Box>


    <Box component="section" className="viewSec">

      <Typography variant='h4' className="adsTitle"> Most Popular Ads</Typography>

      <Box className="grid">
        {adsData?.map((ele, index) => <>
          <Box className="here">
          <img className={`${index===0?"main":"sub"}`} src={ele.images[0]} alt="RoomPicture1" />
          </Box>

        </>
        )}


{/* <div className="here">
            <img className={`pic${index + 1}`} src={ele.images[0]} alt="RoomPicture1" />
            <div className="layer">
              <div className="text ">
                <h6 className="fw-bold">WEB DESIGN</h6>
                <div className="icons">
                  <span><a className="text-white dir" href="#"><i className="fa fa-chain-broken"></i></a></span>
                  <span className="ps-2"><a className="text-white dom" href="#"><i className="fa fa-search-plus"></i></a></span>
                </div>
              </div>
            </div>
          </div> */}

      </Box>
    </Box>


  </>
}

export default Landing
