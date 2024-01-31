/** @format */

import { getRooms } from "@/Redux/Features/Portal/Rooms/GetAllRoomsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImageCard2 } from "@/Components";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { AddFavoriteItem } from "@/Redux/Features/Portal/Favorites/AddToFavoriteSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Explore.module.scss";

const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rooms, setRooms] = useState([]);

  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const dispatch = useDispatch();
  const isLargeScreen = useMediaQuery("(min-width: 960px)");
  // const itemsPerPage = isLargeScreen ? 12 : 6;
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = rooms.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getRoomsData(52);
    getFavoriteData();
  }, [dispatch, count, data]);

  const { endDate: end, persons: per, startDate: str } = useParams();
  const endDate = end?.substring(end?.indexOf("=") + 1);
  const startDate = str?.substring(str?.indexOf("=") + 1);
  const bookingGuestCount = per?.substring(per?.indexOf("=") + 1);
  //! ************************ Get Rooms  *************************
  const getRoomsData = async (roomCount: any) => {
    try {
      // @ts-ignore
      const element = await dispatch(
        getRooms({ startDate, endDate, roomCount })
      );
      // @ts-ignore
      setRooms(element?.payload?.data?.rooms);
    } finally {
    }
  };

  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([]);
  const getFavoriteData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } finally {
    }
  };

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
  };

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

  return (
    <>
      <Box component={"main"} className="exploreCom">
        <Typography variant="h1" className="title">
          Explore ALL Rooms
        </Typography>
        <Link to={"/"} className="path">
          Home
        </Link>
        <Typography variant="caption" className="slash">
          /
        </Typography>
        <Typography variant="caption" className="subPath">
          Explore
        </Typography>
        <Typography variant="h4" className="subTitle">
          All Rooms
        </Typography>
        <Box className="roomCon" justifyContent={"center"}>
          {currentRooms?.map((ele, index) => (
            <>
              <ImageCard2
                className={style.cardImage}
                key={ele?._id}
                {...{
                  ele,
                  index,
                  startDate,
                  endDate,
                  bookingGuestCount,
                  favList,
                  deleteFavoriteItem,
                  addItemToFavorite,
                }}
              />
            </>
          ))}
        </Box>
      </Box>
      <Stack spacing={2} marginTop={4} justifyContent={"center"}>
        {/* <Pagination count={10} hidePrevButton hideNextButton /> */}
        <Pagination
          page={currentPage}
          variant="outlined"
          color="primary"
          count={Math.ceil(rooms.length / itemsPerPage)}
          className={style.pagination}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </Stack>
    </>
  );
};

export default Explore;
