import { getRooms } from '@/Redux/Features/Portal/Rooms/GetAllRoomsSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { ImageCard } from '@/Components';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';

import { AddFavoriteItem } from '@/Redux/Features/Portal/Favorites/AddToFavoriteSlice';
import { RemoveFavoriteItem } from '@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice';
import { getFavoriteItems } from '@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice';
import { toast } from 'react-toastify';
import "./Favorites.module.scss";

const Favorites = () => {


  const dispatch = useDispatch();
  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([])
  const getFavoriteData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      console.log(element);
      
      // @ts-ignore
      
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms)

    } finally {

    }
  }
  useEffect(() => {
    getFavoriteData()
  }, []);

console.log(favList);


  return (
    <>
      <div>
        {favList?.map((ele, index) => <>
          <ImageCard key={ele?._id} {...{ ele, index, startDate, endDate, bookingGuestCount, favList, deleteFavoriteItem,addItemToFavorite }} />

          </>)}
      </div>
    </>
  );
};

export default Favorites;
