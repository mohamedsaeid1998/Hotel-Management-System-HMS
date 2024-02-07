/** @format */

import { LandingImg, RoomDetails1, RoomDetails2, RoomDetails3, RoomPicture1, RoomPicture2 } from "@/Assets/Images";
import { Calendar, ImageCard, ImageCard2, LoginDialog } from "@/Components";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { AllAdsData } from "@/Redux/Features/Portal/Ads/getAllAdsSlice";
import { AddFavoriteItem } from "@/Redux/Features/Portal/Favorites/AddToFavoriteSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs, Range } from "dayjs";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "./Landing.module.scss";
import { getRooms } from "@/Redux/Features/Portal/Rooms/GetAllRoomsSlice";
import UsersReviews from "./UsersReview";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,EffectFade, Navigation, Pagination } from 'swiper/modules';


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
    if (localStorage.getItem("userRole") === "user") getFavoriteData();
  }, [dispatch, count, data]);

  const handleIncrease = () => {
    setBookingGuestCount(bookingGuestCount + 1);
  };

  const handleDecrease = () => {
    if (bookingGuestCount > 1) {
      setBookingGuestCount(bookingGuestCount - 1);
    }
  };


  var settings2 = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
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
      if (!localStorage.getItem("authToken")) {
        return handleClickOpen();
      } else if (localStorage.getItem("userRole") !== "user") {
        toast.error("please ensure you are logged in to your user account", {
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        // @ts-ignore
        const element = await dispatch(AddFavoriteItem(roomId));
        // @ts-ignore
        toast.success(element?.payload?.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
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
    } catch (error) { }
  };

  //! ************************ Get Rooms  *************************
  const [rooms, setRooms] = useState([]);

  const getRoomsData = async (roomCount: any) => {
    try {
      // @ts-ignore
      const element = await dispatch(
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  var settings = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };








  const images = [
    { img: LandingImg },
    { img: RoomDetails1 },
    { img: RoomDetails2 },
    { img: RoomDetails3 },
    { img: RoomPicture1 },
    { img: RoomPicture2 },
  ]

  return <>
    <LoginDialog {...{ handleClose, open }} />
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
              sx={{
                fontSize: { xs: "1px", sm: "1px", md: "1px" },
                padding: {
                  xs: "8px 16px",
                  sm: "10px 20px",
                  md: "12px 24px",
                },
                width: { xs: "40px", sm: "50px" },
                height: { xs: "40px", sm: "50px" },
                borderRadius: "12px",
                p: "8px",
                mr: { xs: "5px", sm: "10px" },
                ml: "5px",
              }}
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
              sx={{
                fontSize: { xs: "1px", sm: "1px", md: "1px" },
                padding: {
                  xs: "8px 16px",
                  sm: "10px 20px",
                  md: "12px 24px",
                },
                width: { xs: "40px", sm: "50px" },
                height: { xs: "40px", sm: "50px" },
                borderRadius: "12px",
                p: "8px",
                mr: { xs: "5px", sm: "10px" },
                ml: "5px",
              }}
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
      {/* <Slider {...settings}>
        {images?.map((ele) => <Box className="rightCon">
          <img className="LandingImg background"  src={ele} alt="Landing Image" />
        </Box>)}
      </Slider> */}
      <Box className="rightCon">
        <Swiper
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          effect={'fade'}
          pagination={{
            clickable: true,
          }}
          // loop={true}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}

          className="LandingImg "
        >
          <SwiperSlide>
            <Box className="">
              <img className="background" src={LandingImg} />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className="">
              <img className="background" src={RoomDetails2} />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className="">
              <img className="background" src={RoomDetails3} />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className="">
              <img className="background" src={RoomDetails1} />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>


    </Box>

    <Box className="userContainer">
      <Box component="section" className="viewSec">
        <Typography variant="h4" className="adsTitle">
          Most Popular Ads
        </Typography>

        <Box className="grid">
          {adsData?.map((ele, index) => (
            <Fragment key={ele?._id}>
              <ImageCard
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
            </Fragment>
          ))}
        </Box>

        <Typography variant="h4" className="bookingTitle">
          Most Booked Rooms
        </Typography>
        <Box className="sliderCon">
          <Slider {...settings2}>
            {rooms?.map((ele, index) => (
              <Fragment key={ele?._id}>
                <ImageCard2
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
              </Fragment>
            ))}
          </Slider>
        </Box>
      </Box>
      <Box component="section" className="reviewUsersSection">
        <UsersReviews />
      </Box>
    </Box>
  </>
};

export default Landing;
