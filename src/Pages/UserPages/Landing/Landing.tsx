import { LandingImg } from '@/Assets/Images';
import { Calendar, ImageCard } from '@/Components';
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { AllAdsData } from '@/Redux/Features/Portal/Ads/getAllAdsSlice';
import { AddFavoriteItem } from '@/Redux/Features/Portal/Favorites/AddToFavoriteSlice';
import { getFavoriteItems } from '@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice';
import { RemoveFavoriteItem } from '@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice';
import { Add, Remove } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs, Range } from 'dayjs';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Slider from "react-slick";
import './Landing.module.scss';
const Landing = () => {

  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.AddToFavorite)
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice)

  const [bookingGuestCount, setBookingGuestCount] = useState(1);
  const navigate = useNavigate()
  const today = dayjs();
  const nextDate = dayjs().add(5, 'day');
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    today,
    nextDate,
  ]);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAdsData()
    dispatch(fetchDataIslogged());
    getFavoriteData()
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      // {
      //   breakpoint: 770,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 1,
      //     initialSlide: 2
      //   }
      // },
      // {
      //   breakpoint: 600,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //     initialSlide: 2
      //   }
      // },
      // {
      //   breakpoint: 400,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   }
      // },
    ]
  }



  const startDate = selectedDateRange[0]?.format('YYYY-MM-DD')
  const endDate = selectedDateRange[1]?.format('YYYY-MM-DD')

  console.log(`${selectedDateRange[0]?.format('YYYY-MM-DD')} - ${selectedDateRange[1]?.format('YYYY-MM-DD')}`);
  const [adsData, setAdsData] = useState();
  //! ************************ Rooms Ads *************************
  const getAdsData = async () => {

    try {
      setLoading(true)
      // @ts-ignore
      const element = await dispatch(AllAdsData());
      // @ts-ignore
      setAdsData(element?.payload?.data?.data?.rooms);
    } finally {
      setLoading(false)
    }
  }


  //! ************************ Add To Favorite  *************************
  const addItemToFavorite = async (roomId: any) => {
    try {
      // @ts-ignore
      const element = await dispatch(AddFavoriteItem(roomId));
      console.log(element)
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      // toast.error("Error fetching data:", error);
    }
  };

  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([])
  const getFavoriteData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms)

    } finally {

    }
  }


  //! ************************ Delete From Favorite  *************************

  const deleteFavoriteItem = async (roomId: any) => {
    try {
      // @ts-ignore
      const element = await dispatch(RemoveFavoriteItem(roomId));
      console.log(element)
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      // toast.error("Error fetching data:", error);
    }
  }



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

          <Calendar {...{selectedDateRange,setSelectedDateRange}}/>

          <Box className="capacityCon">
            <Button onClick={handleIncrease} className="caleBtn" variant="contained" color="primary">
              <Add />
            </Button>
            <TextField
              className='calendarField'
              label="Capacity"
              value={`${bookingGuestCount} person`}
            />
            <Button onClick={handleDecrease} className="caleBtn" variant="contained" color="error">
              <Remove />
            </Button>
          </Box>

        </Box>

        <Button className="submitExplore" onClick={() => navigate(`/explore/startDate=${startDate}/endDate=${endDate}/persons=${bookingGuestCount}`)} variant="contained" color="primary">
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
          <ImageCard key={ele._id} {...{ ele, index, deleteFavoriteItem, addItemToFavorite, startDate, endDate, bookingGuestCount, favList }} />
        </>
        )}

      </Box>

      <Typography variant='h4' className="bookingTitle"> Most Booked Rooms</Typography>
      <Box className="sliderCon">


      <Slider  {...settings}>

          
       
        {adsData?.map((ele,index) => <>


          <ImageCard   key={ele._id} {...{ele,index,deleteFavoriteItem,addItemToFavorite,startDate,endDate,bookingGuestCount,favList}}/>


        </>
        )}

        </Slider>

      </Box>



    </Box>


  </>
}

export default Landing
