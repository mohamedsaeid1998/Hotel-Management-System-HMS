import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { ImageCard } from '@/Components';


import { getFavoriteItems } from '@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice';
import { RemoveFavoriteItem } from '@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice';
import { toast } from 'react-toastify';
import "./Favorites.module.scss";
import { Box } from '@mui/material';

const Favorites = () => {


  

  const { count } = useSelector((state) => state.AddToFavorite)
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice)

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
  }, [dispatch, count, data]);

console.log(favList);


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



  return (
    <>
        <Box component={'main'} className='exploreCom'>
<Box className="roomCon ">
        {favList?.map((ele, index) => <>
          <ImageCard key={ele?._id} {...{ ele, index,favList,deleteFavoriteItem }} />

          </>)}
          </Box>
          </Box>
    </>
  );
};

export default Favorites;
