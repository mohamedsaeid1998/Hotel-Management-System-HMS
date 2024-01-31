/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageCard2 } from "@/Components";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { toast } from "react-toastify";
import "./Favorites.module.scss";
import { Box, Button, useMediaQuery } from "@mui/material";
import style from "./Favorites.module.scss";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Tooltip from "@mui/material/Tooltip";
import LoadingComponent from "@/Components/Shared/Loading/Loading";

const Favorites = () => {
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const dispatch = useDispatch();
  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([]);
  const getFavoriteData = async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      console.log(element);

      // @ts-ignore

      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } finally {
    }
  };
  useEffect(() => {
    getFavoriteData();
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
  };
  const [visibleImages, setVisibleImages] = useState(6);

  const loadMoreImages = () => {
    setVisibleImages(favList.length);
  };
  const loadLessImages = () => {
    setVisibleImages(
      Math.min(visibleImages - (isSmallScreen ? 3 : 6), favList.length)
    );
  };
  return (
    <>
      <Box
        component={"main"}
        style={{ height: "100vh" }}
        className="exploreCom"
      >
        {favList?.length <= 0 ? (
          <LoadingComponent />
        ) : (
          <>
            <Box className="roomCon ">
              {favList.slice(0, visibleImages).map((ele, index) => (
                <>
                  <ImageCard2
                    key={ele?._id}
                    {...{ ele, index, favList, deleteFavoriteItem }}
                  />
                </>
              ))}
            </Box>
            <Box textAlign={"center"} marginTop={4}>
              {visibleImages < favList.length && (
                <Tooltip title="show more">
                  <Button onClick={loadMoreImages} className={style.showMore}>
                    <KeyboardDoubleArrowDownIcon />
                  </Button>
                </Tooltip>
              )}
              {visibleImages == favList.length && (
                <Tooltip title="show less">
                  <Button onClick={loadLessImages} className={style.showMore}>
                    <KeyboardDoubleArrowUpIcon />
                  </Button>
                </Tooltip>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Favorites;
