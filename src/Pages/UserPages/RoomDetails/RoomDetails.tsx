import { Box, Typography } from '@mui/material';
import './RoomDetails.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { roomDetails } from '@/Redux/Features/Portal/Rooms/GetRoomDetailsSlice';
import { Link, useParams } from 'react-router-dom';
import { RoomDetails1, RoomDetails2, RoomDetails3 } from '@/Assets/Images';


const RoomDetails = () => {


  const dispatch = useDispatch();


  const { endDate: end, persons: per, startDate: str, id:roomId} = useParams()
  const id = roomId?.substring(roomId?.indexOf('=') + 1);
  const [details, setDetails] = useState()
  const getRoomDetails = async () => {
console.log(id);

    try {
      // @ts-ignore
      const element = await dispatch(roomDetails(id));
      // @ts-ignore
      console.log(element?.payload.data?.data?.room)

      setDetails(element?.payload?.data?.data?.room);
    } finally {

    }
  }
  useEffect(() => {
    getRoomDetails()
  }, []);


  console.log(details);
  
  return <>
<Box component={"main"} className="roomDetailsCon">
<Typography variant="h1" className='title'>{details?.roomNumber}</Typography>
      <Link to={'/'} className='path'>Home</Link>
<Typography variant='caption' className='slash'>/</Typography>
<Typography variant='caption' className='subPath'>Room Details</Typography>

<Box component={"section"} className="roomImages">
  
<Box className="gridDetails">
  {details&&<>
    <img className='image' src={details?.images[0] ? details?.images[0] : RoomDetails1} alt="roomImage" />
    <img className='img' src={details?.images[1] ? details?.images[1] : RoomDetails2} alt="roomImage" />
    <img className='img' src={details?.images[2] ? details?.images[2] : RoomDetails3} alt="roomImage" />
  </>
  }

</Box>
</Box>

<Box className="roomDetailsBooking">

</Box>

</Box>
  </>
}

export default RoomDetails