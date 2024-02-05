import { chartsData } from "@/Redux/Features/Admin/Charts/ChartsSlice";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCartsData()
    dispatch(fetchDataIslogged());
  }, [dispatch]);

  const [bookingStatus, setBookingStatus] = useState({
    booking: {},
    user: {},
    ads: 0,
    facilities: 0,
    rooms: 0
  })
  console.log(bookingStatus)

  //! ***************Get Facilities Data ***************
  const getCartsData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(chartsData());
      // @ts-ignore
      const dataKind = element?.payload?.data;

      setBookingStatus({
        booking: dataKind?.bookings,
        user: dataKind?.users,
        ads: dataKind?.ads,
        facilities: dataKind?.facilities,
        rooms: dataKind?.rooms,
      });

    } catch (error) {
      toast.error(error);
    }
  }



  const data = [
    { id: 0, value: bookingStatus?.booking?.completed, label: 'Completed', },
    { id: 1, value: bookingStatus?.booking?.pending, label: 'Pending', },
    { id: 2, value: bookingStatus?.booking?.completed + bookingStatus?.booking?.pending, label: 'BookingRooms', },
  ];

  const data2 = [
    { id: 0, value: bookingStatus?.user?.admin, label: 'Admin', color: 'rgb(0, 196, 159)' },
    { id: 1, value: bookingStatus?.user?.user, label: 'User', color: 'rgb(255, 128, 66)' },
  ];

  const data3 = [
    { id: 0, value: bookingStatus?.rooms, label: 'All Rooms', color: 'orange' },
    { id: 1, value: bookingStatus?.ads, label: 'discounts', color: 'rgb(184, 0, 216)' },
    { id: 2, value: bookingStatus?.facilities, label: 'facilities', color: 'rgb(46, 150, 255)' },
  ];
  return <>
    <Box component={"main"}>

      <Box className="cards">
        <Card className="card">
          <CardContent className="cardCon">
            <RoomPreferencesIcon />
            <Typography className="title">here</Typography>
            <Typography className="number">50</Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="cardCon">
            <RoomPreferencesIcon />
            <Typography className="title">here</Typography>
            <Typography className="number">50</Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent className="cardCon">
            <RoomPreferencesIcon />
            <Typography className="title">here</Typography>
            <Typography className="number">50</Typography>
          </CardContent>
        </Card>

      </Box>

      <Box className="chartsCon">
        {bookingStatus.booking && <>

          <PieChart
            series={[{
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
            ]}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}
            width={300} height={300}
          />

          <PieChart
            series={[{
              data: data2,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
            ]}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}
            height={300}
            width={300}
          />

          {/* <PieChart className="heree"
            // margin={{ top: 100, bottom: 100, left: 100, right: 100 }}

            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}

            display={"block"}

          /> */}
          <PieChart
            series={[{
              data: data3,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
            ]}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}
            height={300}
            width={300}
          />
        </>
        }

      </Box>

    </Box>

  </>
};

export default Home;
