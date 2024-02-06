/** @format */

import { LandingImg } from "@/Assets/Images";
import { Calendar, ImageCard, ImageCard2 } from "@/Components";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { AllAdsData } from "@/Redux/Features/Portal/Ads/getAllAdsSlice";
import { AddFavoriteItem } from "@/Redux/Features/Portal/Favorites/AddToFavoriteSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs, Range } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "./Landing.module.scss";
import { getRooms } from "@/Redux/Features/Portal/Rooms/GetAllRoomsSlice";
const Landing = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const [disabled, setDisabled] = useState(false);
  const [bookingGuestCount, setBookingGuestCount] = useState(1);
  const navigate = useNavigate();
  const today = dayjs();
  const nextDate = dayjs().add(1, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    today,
    nextDate,
  ]);

  useEffect(() => {
    getRoomsData(15);
    getAdsData();
    dispatch(fetchDataIslogged());
    getFavoriteData();
  }, [dispatch, count, data]);

  const handleIncrease = () => {
    setBookingGuestCount(bookingGuestCount + 1);
  };

  const handleDecrease = () => {
    if (bookingGuestCount > 1) {
      setBookingGuestCount(bookingGuestCount - 1);
    }
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 763,
        settings: {
          dots: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const startDate = dayjs(selectedDateRange[0]).format("YYYY-MM-DD");
  const endDate = dayjs(selectedDateRange[1]).format("YYYY-MM-DD");

  // const dateString = "2024-02-06T18:44:58.583Z";
  // const parsedDate = new Date(dateString);

  // const formattedDate = new Intl.DateTimeFormat("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // }).format(parsedDate);

  // console.log(formattedDate);

  const [adsData, setAdsData] = useState();
  //! ************************ Rooms Ads *************************
  const getAdsData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(AllAdsData());
      // @ts-ignore

      setAdsData(element?.payload?.data?.data?.ads);
    } finally {
    }
  };

  //! ************************ Add To Favorite  *************************
  const addItemToFavorite = async (roomId: any) => {
    try {
      setDisabled(true);
      // @ts-ignore
      const element = await dispatch(AddFavoriteItem(roomId));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setDisabled(false);
    }
  };

  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([]);
  const getFavoriteData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } finally {
    }
  };

  //! ************************ Get Rooms  *************************
  const [rooms, setRooms] = useState([]);

  const getRoomsData = async (roomCount: any) => {
    try {
      const element = await dispatch(
        // @ts-ignore
        getRooms({ startDate, endDate, roomCount })
      );
      // @ts-ignore

      setRooms(element?.payload?.data?.rooms);
    } finally {
    }
  };

  //! ************************ Delete From Favorite  *************************

  const deleteFavoriteItem = async (roomId: any) => {
    try {
      setDisabled(true);
      // @ts-ignore
      const element = await dispatch(RemoveFavoriteItem(roomId));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setDisabled(false);
    }
  };

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
            <Calendar {...{ selectedDateRange, setSelectedDateRange }} />

            <Box className="capacityCon">
              <IconButton
                onClick={handleIncrease}
                className="caleBtn"
                color="primary"
              >
                <Add />
              </IconButton>
              <TextField
                className="capacityField"
                label="Capacity"
                value={`${bookingGuestCount} person`}
              />
              <IconButton
                onClick={handleDecrease}
                className="caleBtnDiscernment"
                color="error"
              >
                <Remove />
              </IconButton>
            </Box>
          </Box>

          <Button
            className="submitExplore"
            onClick={() =>
              navigate(`/explore`, {
                state: { range: selectedDateRange, persons: bookingGuestCount },
              })
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
            <ImageCard
              key={ele?._id}
              {...{
                disabled,
                selectedDateRange,
                ele,
                index,
                deleteFavoriteItem,
                addItemToFavorite,
                startDate,
                endDate,
                bookingGuestCount,
                favList,
              }}
            />
          ))}
        </Box>

        <Typography variant="h4" className="bookingTitle">
          Most Booked Rooms
        </Typography>
        <Box className="sliderCon">
          <Slider {...settings}>
            {rooms?.map((ele, index) => (
              <>
                <ImageCard2
                  key={ele?._id}
                  {...{
                    selectedDateRange,
                    ele,
                    index,
                    deleteFavoriteItem,
                    addItemToFavorite,
                    startDate,
                    endDate,
                    bookingGuestCount,
                    favList,
                    disabled,
                  }}
                />
              </>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
