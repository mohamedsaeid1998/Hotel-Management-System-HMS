/** @format */

import {
  RoomDetails1,
  RoomDetails2,
  RoomDetails3,
  ac,
  bathroom,
  bedroom,
  diningroom,
  kulkas,
  livingroom,
  tv,
  wifi,
} from "@/Assets/Images";
import { Calendar } from "@/Components";
import { CreateBooking } from "@/Redux/Features/Portal/Booking/CreateBookingSlice";
import { roomDetails } from "@/Redux/Features/Portal/Rooms/GetRoomDetailsSlice";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs, { Dayjs, Range } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./RoomDetails.module.scss";
import { LoadingButton } from "@mui/lab";
import { Details, Home } from "@mui/icons-material";
import FeedbackComponent from "@/Components/UserSharedComponents/FeedbackComponent/FeedbackComponent";
import RatingComponent from "@/Components/UserSharedComponents/Rating/RatingComponent";
import Slider from "react-slick";

const RoomDetails = () => {
  const [showMore, setShowMore] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const isMobile = useMediaQuery("(max-width:576px)");
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const dispatch = useDispatch();
  const today = dayjs();
  const nextDate = dayjs().add(5, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    today,
    nextDate,
  ]);

  const { state } = useLocation();
  const { range } = state;
  // const startDate =
  //   state?.range === undefined ? today : state?.range[0].format("YYYY-MM-DD");
  // const endDate =
  //   state?.range === undefined
  //     ? nextDate
  //     : state?.range[1].format("YYYY-MM-DD");

  const startDate = range ? dayjs(range[0]).format("YYYY-MM-DD") : today;
  const endDate = range ? dayjs(range[0]).format("YYYY-MM-DD") : nextDate;

  const bookingGuestCount = state?.persons;
  const id = state?.roomId;

  const [details, setDetails] = useState();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getRoomDetails();
  }, []);

  //! ************************ Get Room Details *************************
  const getRoomDetails = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(roomDetails(id));
      // console.log(element?.payload?.data?.data?.room?.discount);
      // @ts-ignore
      setDetails(element?.payload?.data?.data?.room);
      // @ts-ignore
      setPrice(element?.payload?.data?.data?.room?.price);
    } finally {
    }
  };

  //! ************************ Booking Room  *************************
  const [loading, setLoading] = useState(false);
  const handleBooking = async (e: any) => {
    e.preventDefault();
    try {
      // @ts-ignore
      setLoading(true);
      const element = await dispatch(
        CreateBooking({ startDate, endDate, id, price })
      );
      console.log(element);

      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
      navigate(`/stripePayment/${element?.payload?.data?.booking?._id}`);
    } finally {
      setLoading(false);
    }
  };

  //! ************************ facilities Content *************************
  const facilitiesDetails = [
    { Icon: bedroom, main: 5, sub: "bedroom" },
    { Icon: livingroom, main: 1, sub: "living room" },
    { Icon: bathroom, main: 3, sub: "bathroom" },
    { Icon: diningroom, main: 1, sub: "dining room" },
    { Icon: wifi, main: 10, sub: "mbp/s" },
    { Icon: ac, main: 7, sub: "unit ready" },
    { Icon: kulkas, main: 2, sub: "refigrator" },
    { Icon: tv, main: 4, sub: "television" },
  ];
  {
    /*Show more paragraph  */
  }
  const maxLength = 100;
  const descriptions = [
    "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    "Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.",
    "Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The national agency for design: enabling Singapore to use design for economic growth and to make lives better.",
  ];
  const displayedDescriptions = showMore
    ? descriptions
    : descriptions.slice(0, 1);
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  console.log(details);

  return (
    <>
      <Box component={"main"} className="roomDetailsCon">
        <Typography variant="h1" className="title">
          Village Angga
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="path" color="inherit" to={"/"}>
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography variant="caption" className="subPath">
            <Details fontSize="inherit" sx={{ mr: 0.5 }} />
            Room Details
          </Typography>
        </Breadcrumbs>
        <Box component={"section"} className="roomImages">
          {!isMobile ? (
            details && (
              <Box className="gridDetails">
                <>
                  <img
                    className="image"
                    src={details?.images[0] ? details?.images[0] : RoomDetails1}
                    alt="roomImage"
                  />
                  <img
                    className="img"
                    src={details?.images[1] ? details?.images[1] : RoomDetails2}
                    alt="roomImage"
                  />
                  <img
                    className="img"
                    src={details?.images[2] ? details?.images[2] : RoomDetails3}
                    alt="roomImage"
                  />
                </>
              </Box>
            )
          ) : (
            <Slider {...settings2}>
              <>
                {details?.images?.map((image, index) => (
                  <Box style={{ width: "20rem", hieght: "20rem" }}>
                    <img
                      key={index}
                      className="image"
                      style={{ width: "100%" }}
                      src={image}
                      alt={`roomImage-${index}`}
                    />
                  </Box>
                ))}
              </>
            </Slider>
          )}
        </Box>

        <Box
          component={"section"}
          className={`roomDetailsBooking ${
            isSmallScreen && style.roomBookMobView
          }`}
        >
          <Box className="roomDetailsDec">
            {displayedDescriptions?.map((description, index) => (
              <Typography
                key={index}
                className={`description ${showMore ? "show-all" : ""}`}
              >
                {description}
              </Typography>
            ))}
            {showMore ? "" : "..."}
            <Button color="primary" onClick={handleShowMore}>
              {showMore ? "Show Less" : "Show More"}
            </Button>

            <Box className="roomFacilities">
              {facilitiesDetails.map(({ main, Icon, sub, index }) => (
                <Box key={index} className="facilities">
                  <img className="facilitiesIcon" src={Icon} alt="Icons" />
                  <Typography className="mainDec">
                    {main}
                    <Typography variant="caption" className="subDec">
                      {sub}
                    </Typography>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box component={"form"} className="roomDetailsBook">
            <Card variant="outlined" className="roomDetailsCard">
              <CardContent className="cardContent">
                <Typography className="bookingCon">Start Booking</Typography>
                <Typography className="bookingPrice">
                  {`$${price}`}
                  <Typography variant="caption" className="priceFor">
                    per night
                  </Typography>
                </Typography>
                {Math.round((details?.discount / price) * 100) !== 0 && (
                  <Typography className="bookingDiscount">
                    Discount {Math.round((details?.discount / price) * 100)}%
                    Off
                  </Typography>
                )}
                <Typography className="bookingTitle">Pick a Date</Typography>
                <Box className={style.calenderBox} style={{ background: "" }}>
                  <Calendar {...{ setSelectedDateRange, selectedDateRange }} />
                </Box>

                <Typography className="grayColor">
                  You will pay
                  <Typography variant="caption" className="bookingCon">
                    {`$${
                      bookingGuestCount ? price * bookingGuestCount : price
                    } USD`}
                  </Typography>
                  <Typography variant="caption" className="sub">
                    pre
                  </Typography>
                  <Typography variant="caption" className="bookingCon">
                    {`${
                      bookingGuestCount !== 1 && bookingGuestCount !== undefined
                        ? `${bookingGuestCount} persons`
                        : `1 person`
                    } `}
                  </Typography>
                </Typography>
                <Box className="submitBooking">
                  {loading ? (
                    <LoadingButton
                      className="submitBtn white"
                      loading
                      variant="outlined"
                    >
                      Continue Book
                    </LoadingButton>
                  ) : (
                    <Button
                      className="submitBtn"
                      type="submit"
                      variant="contained"
                      onClick={handleBooking}
                    >
                      Continue Book
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box component={"section"} className={style.review}>
          <Box className={style.roomfeedback}>
            <Typography color="#152C5B" fontSize={"clamp(1rem, 2.5vw, 2rem)"}>
              Rating
            </Typography>
            <RatingComponent id={id} />
          </Box>
          <Box className={style.reviewLine}></Box>
          <Box className={style.comments}>
            <Typography color="#152C5B" fontSize={"clamp(1rem, 2.5vw, 2rem)"}>
              Comment
            </Typography>
            <FeedbackComponent />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RoomDetails;
