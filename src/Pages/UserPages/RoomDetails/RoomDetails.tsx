import { Box } from '@mui/material';
import './RoomDetails.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { roomDetails } from '@/Redux/Features/Portal/Rooms/GetRoomDetailsSlice';
import { useParams } from 'react-router-dom';
import { RoomDetails1 } from '@/Assets/Images';


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
      console.log(element?.payload.data?.data?.room?.images)

      setDetails(element?.payload?.data?.data?.room?.images);
    } finally {

    }
  }
  useEffect(() => {
    getRoomDetails()
  }, []);


  console.log(details);
  
  return <>
<Box component={"main"} className="roomDetailsCon">
<Box component={"section"} className="roomImages">
<Box className="gridDetails">
  {/* <img className='img' src={details[0]?details[0]:RoomDetails1} alt="" /> */}
</Box>
</Box>
</Box>
  </>
}

export default RoomDetails