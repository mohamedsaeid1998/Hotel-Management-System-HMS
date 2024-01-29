/** @format */

import { LandingImg } from "@/Assets/Images";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { AllAdsData } from "@/Redux/Features/Portal/Ads/getAllAdsSlice";
import {
  Add,
  CalendarMonth,
  Favorite,
  Remove,
  Visibility,
} from "@mui/icons-material";
import { Box, Button, Popover, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs, Range } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Landing.module.scss";
import { AddFavoriteItem } from "@/Redux/Features/Portal/Favorites/AddToFavoriteSlice";
import { toast } from "react-toastify";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);

  const [personsCount, setPersonsCount] = useState(1);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    dayjs("2024-01-25"),
    dayjs("2024-01-30"),
  ]);
  // console.log(selectedDateRange);
  // console.log(personsCount);

  useEffect(() => {
    getAdsData();
    dispatch(fetchDataIslogged());
    getFavoriteData();
  }, [dispatch, count, data]);

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
    setPersonsCount(personsCount + 1);
  };

  const handleDecrease = () => {
    if (personsCount > 1) {
      setPersonsCount(personsCount - 1);
    }
  };

  const startDate = selectedDateRange[0]?.format("YYYY-MM-DD");
  const endDate = selectedDateRange[1]?.format("YYYY-MM-DD");

  const [adsData, setAdsData] = useState();
  //! ************************ Rooms Ads *************************
  const getAdsData = useCallback(async () => {
    try {
      // @ts-ignore
      const element = await dispatch(AllAdsData());
      // @ts-ignore
      setAdsData(element?.payload?.data?.data?.rooms);
    } finally {
    }
  }, [dispatch]);

  //! ************************ Add To Favorite  *************************
  const addItemToFavorite = useCallback(
    async (roomId: any) => {
      try {
        // @ts-ignore
        const element = await dispatch(AddFavoriteItem(roomId));
        console.log(element);
        // @ts-ignore
        toast.success(element?.payload?.message, {
          autoClose: 2000,
          theme: "colored",
        });
      } catch (error) {
        // toast.error("Error fetching data:", error);
      }
    },
    [dispatch]
  );

  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([]);
  const getFavoriteData = useCallback(async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } finally {
    }
  }, [dispatch]);

  //! ************************ Delete From Favorite  *************************

  const deleteFavoriteItem = useCallback(
    async (roomId: any) => {
      try {
        // @ts-ignore
        const element = await dispatch(RemoveFavoriteItem(roomId));
        // console.log(element);
        // @ts-ignore
        toast.success(element?.payload?.message, {
          autoClose: 2000,
          theme: "colored",
        });
      } catch (error) {
        // toast.error("Error fetching data:", error);
      }
    },
    [dispatch]
  );

  const open = Boolean(anchorEl);

  return (
    <>
      <Box component="section" className="landingSec">
        <Box className="leftCon">
          <Typography variant="h1" className="title">
            Forget Busy Work, Start Next Vacation
          </Typography>
          <Typography className="subTitle">
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </Typography>

          <Box className="bookingCon">
            <Typography variant="h3" className="bookingTitle">
              Start Booking
            </Typography>
            <Typography variant="h4" className="subBookingTitle">
              Pick a Date
            </Typography>
          </Box>

          <Box className="exploreCon">
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

            <Box className="capacityCon">
              <Button
                onClick={handleIncrease}
                className="caleBtn"
                variant="contained"
                color="primary"
              >
                <Add />
              </Button>
              <TextField
                className="calendarField"
                label="Capacity"
                value={`${personsCount} person`}
              />
              <Button
                onClick={handleDecrease}
                className="caleBtn"
                variant="contained"
                color="error"
              >
                <Remove />
              </Button>
            </Box>
          </Box>

          <Button
            className="submitExplore"
            onClick={() =>
              navigate(
                `/explore/startDate=${startDate}/endDate=${endDate}/persons=${personsCount}`
              )
            }
            variant="contained"
            color="primary"
          >
            Explore
          </Button>
        </Box>

        <Box className="rightCon">
          <img className="LandingImg" src={LandingImg} alt="Landing Image" />
        </Box>
      </Box>

      <Box component="section" className="viewSec">
        <Typography variant="h4" className="adsTitle">
          Most Popular Ads
        </Typography>

        <Box className="grid">
          {adsData?.map((ele, index) => (
            <>
              <Box
                key={ele._id}
                className={`${index === 0 ? "main" : ""} here`}
              >
                <img
                  className="RoomPicture"
                  src={ele.images[0]}
                  alt="RoomPicture"
                />
                <Box className="layer">
                  <Box className="text ">
                    <Typography variant="h6" className="roomName">
                      {ele.roomNumber.toUpperCase()}
                    </Typography>
                    <Box className="icons">
                      {favList?.some(
                        (favorite: any) => favorite._id === ele?._id
                      ) ? (
                        <Favorite
                          color="error"
                          onClick={() => deleteFavoriteItem(ele._id)}
                        />
                      ) : (
                        <Favorite onClick={() => addItemToFavorite(ele._id)} />
                      )}

                      <Visibility
                        onClick={() => {
                          navigate(
                            `/room-details/startDate=${startDate}/endDate=${endDate}/persons=${personsCount}/${ele._id}`
                          );
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ))}
        </Box>

        <Typography variant="h4" className="adsTitle">
          {" "}
          Most Booked Rooms
        </Typography>
        <Box className="sliderCon">
          {adsData?.map((ele) => (
            <>
              <Box key={ele._id} className={` here `}>
                <img
                  className="RoomPicture"
                  src={ele.images[0]}
                  alt="RoomPicture"
                />
                <Box className="layer">
                  <Box className="text ">
                    <Typography variant="h6" className="roomName">
                      {ele.roomNumber.toUpperCase()}
                    </Typography>
                    <Box className="icons">
                      {favList?.some(
                        (favorite: any) => favorite._id === ele?._id
                      ) ? (
                        <Favorite
                          color="error"
                          onClick={() => deleteFavoriteItem(ele._id)}
                        />
                      ) : (
                        <Favorite onClick={() => addItemToFavorite(ele._id)} />
                      )}

                      <Visibility
                        onClick={() =>
                          navigate(
                            `/room-details/startDate=${startDate}/endDate=${endDate}/persons=${personsCount}`
                          )
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Landing;
