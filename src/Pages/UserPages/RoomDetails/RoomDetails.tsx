import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import './RoomDetails.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { roomDetails } from '@/Redux/Features/Portal/Rooms/GetRoomDetailsSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RoomDetails1, RoomDetails2, RoomDetails3, ic_ac, ic_bathroom, ic_bedroom, ic_diningroom, ic_kulkas, ic_livingroom, ic_tv, ic_wifi } from '@/Assets/Images';
import { Calendar } from '@/Components';
import dayjs, { Dayjs, Range } from 'dayjs';
import { CreateBooking } from '@/Redux/Features/Portal/Booking/CreateBookingSlice';
import { toast } from 'react-toastify';


const RoomDetails = () => {

  const dispatch = useDispatch();
  const today = dayjs();
  const nextDate = dayjs().add(5, 'day');
  const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
    today,
    nextDate,
  ]);

  const { endDate: end, persons: per, startDate: str, id: roomId } = useParams()
  const endDate = end?.substring(end?.indexOf('=') + 1);
  const startDate = str?.substring(str?.indexOf('=') + 1);
  const bookingGuestCount = per?.substring(per?.indexOf('=') + 1);
  const id = roomId?.substring(roomId?.indexOf('=') + 1);
  
  const [details, setDetails] = useState()
  const [price, setPrice] = useState(0)
const navigate = useNavigate()

  useEffect(() => {
    getRoomDetails()
  }, []);


//! ************************ Get Room Details *************************
  const getRoomDetails = async () => {

    try {
      // @ts-ignore
      const element = await dispatch(roomDetails(id));
      // @ts-ignore
      setDetails(element?.payload?.data?.data?.room);
      // @ts-ignore
      setPrice(element?.payload?.data?.data?.room?.price)
    } finally {
    }
  }
  

  //! ************************ Booking Room  *************************

  const handleBooking = async(e:any) => {
    e.preventDefault()
    try {
      // @ts-ignore
      const element = await dispatch(CreateBooking({startDate,endDate,id,price}));
      console.log(element);
      
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
      navigate('/stripePayment')
    } catch (error) {
      // toast.error("Error fetching data:", error);
    }
  }

    //! ************************ facilities Content *************************

  const facilitiesDetails = [
    { Icon: ic_bedroom, main: 5, sub: "bedroom" },
    { Icon: ic_livingroom, main: 1, sub: "living room" },
    { Icon: ic_bathroom, main: 3, sub: "bathroom" },
    { Icon: ic_diningroom, main: 1, sub: "dining room" },
    { Icon: ic_wifi, main: 10, sub: "mbp/s" },
    { Icon: ic_ac, main: 7, sub: "unit ready" },
    { Icon: ic_kulkas, main: 2, sub: "refigrator" },
    { Icon: ic_tv, main: 4, sub: "television" },
  ]


  return <>
    <Box component={"main"} className="roomDetailsCon">
      <Typography variant="h1" className='title'>{details?.roomNumber}</Typography>
      <Link to={'/'} className='path'>Home</Link>
      <Typography variant='caption' className='slash'>/</Typography>
      <Typography variant='caption' className='subPath'>Room Details</Typography>

      <Box component={"section"} className="roomImages">

        <Box className="gridDetails">
          {details && <>
            <img className='image' src={details?.images[0] ? details?.images[0] : RoomDetails1} alt="roomImage" />
            <img className='img' src={details?.images[1] ? details?.images[1] : RoomDetails2} alt="roomImage" />
            <img className='img' src={details?.images[2] ? details?.images[2] : RoomDetails3} alt="roomImage" />
          </>
          }

        </Box>
      </Box>

      <Box component={"section"} className="roomDetailsBooking">

        <Box className="roomDetailsDec">

          <Typography className='description'>
            Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
          </Typography>
          <Typography className='description'>
            Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.
          </Typography>
          <Typography className='description'>
            Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The national agency for design: enabling Singapore to use design for economic growth and to make lives better.
          </Typography>

          <Box className="roomFacilities">
            {facilitiesDetails.map(({ main, Icon, sub }) => <Box key={main} className="facilities">
              <img className='facilitiesIcon' src={Icon} alt="Icons" />
              <Typography className='mainDec'>{main} <Typography variant='caption' className="subDec"> {sub}</Typography></Typography>
            </Box>
            )}

          </Box>


        </Box>

        <Box component={"form"} className="roomDetailsBook">
          <Card variant="outlined" className='roomDetailsCard'>
            <CardContent className='cardContent'>
              <Typography className='bookingCon'>Start Booking</Typography>
              <Typography className='bookingPrice'>$280 <Typography variant='caption' className='priceFor'> per night</Typography> </Typography>
              <Typography className='bookingDiscount'>Discount 20% Off</Typography>
              <Typography className='bookingTitle'>Pick a Date</Typography>
              <Calendar {...{ setSelectedDateRange, selectedDateRange }} />
              <Typography className='grayColor'>You will pay  <Typography variant='caption' className='bookingCon'> $480 USD </Typography> <Typography variant='caption' className='sub'>pre</Typography> <Typography variant='caption' className='bookingCon'> 2 Person</Typography> </Typography>
              <Box className="submitBooking">
                <Button className="submitBtn" type='submit' variant="contained" onClick={handleBooking}>
                  Continue Book
                </Button>
              </Box>

            </CardContent>
          </Card>
        </Box>

      </Box>

    </Box>
  </>
}

export default RoomDetails