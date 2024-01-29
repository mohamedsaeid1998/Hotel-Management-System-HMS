import { getRooms } from '@/Redux/Features/Portal/Rooms/GetAllRoomsSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { ImageCard } from '@/Components';
import { Box, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import './Explore.module.scss';
import { AddFavoriteItem } from '@/Redux/Features/Portal/Favorites/AddToFavoriteSlice';
import { RemoveFavoriteItem } from '@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice';
import { getFavoriteItems } from '@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice';
import { toast } from 'react-toastify';

const Explore = () => {


  const { count } = useSelector((state) => state.AddToFavorite)
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice)
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    getRoomsData()
    getFavoriteData()
  }, [dispatch, count, data]);
  
  const [rooms, setRooms] = useState([])
  const { endDate: end, persons: per, startDate: str } = useParams()
  const endDate = end?.substring(end?.indexOf('=') + 1);
  const startDate = str?.substring(str?.indexOf('=') + 1);
  const bookingGuestCount = per?.substring(per?.indexOf('=') + 1);
  const getRoomsData = async () => {

    try {

      // @ts-ignore
      const element = await dispatch(getRooms({startDate,endDate}));
      // @ts-ignore
      console.log(element?.payload?.data?.rooms)

      setRooms(element?.payload?.data?.rooms);
    } finally {

    }
  }




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
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      // toast.error("Error fetching data:", error);
    }
  }


   //! ************************ Add To Favorite  *************************
   const addItemToFavorite = async (roomId: any) => {
    try {
      // @ts-ignore
      const element = await dispatch(AddFavoriteItem(roomId));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      // toast.error("Error fetching data:", error);
    }
  };


  return <>
    <Box component={'main'} className='exploreCom'>
      <Typography variant="h1" className='exploreTitle'>Explore ALL Rooms</Typography>

      <Typography variant="h4" className='subExploreTitle'>All Rooms</Typography>
<Box className="roomCon ">
{rooms?.map((ele, index) => <>
        <ImageCard key={ele?._id} {...{ ele, index, startDate, endDate, bookingGuestCount, favList, deleteFavoriteItem,addItemToFavorite }} />
      </>
      )}
</Box>


    </Box>


  </>
}

export default Explore