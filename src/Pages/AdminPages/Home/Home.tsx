import { useEffect, useState } from "react";
import "./Home.module.scss";
import { useDispatch } from "react-redux";
import { fetchDataIslogged } from "@/Redux/Features/Auth/LoginSlice";
import { PieChart } from '@mui/x-charts/PieChart';
import { toast } from "react-toastify";
import { chartsData } from "@/Redux/Features/Admin/Charts/ChartsSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCartsData()
    dispatch(fetchDataIslogged());
  }, [dispatch]);

  const [bookingStatus, setBookingStatus] = useState({})
  console.log(bookingStatus)

  //! ***************Get Facilities Data ***************
  const getCartsData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(chartsData());
      // @ts-ignore
      console.log(element);

      setBookingStatus(element?.payload?.data?.bookings);
    } catch (error) {
      toast.error(error);
    }
  }






  const data = [
    { id: 0, value: bookingStatus?.completed, label: 'Completed' },
    { id: 1, value: bookingStatus?.pending, label: 'Pending' },
    { id: 2, value: bookingStatus?.completed + bookingStatus?.pending, label: 'BookingRooms' },
  ];
  return <>



    <PieChart
      series={[{
        data,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      },
      ]}
      height={200} />




  </>
};

export default Home;
