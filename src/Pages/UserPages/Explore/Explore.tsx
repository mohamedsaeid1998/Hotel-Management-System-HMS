import { getRooms } from "@/Redux/Features/Portal/Rooms/GetAllRoomsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageCard2 } from "@/Components";
import { Box, Breadcrumbs, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { AddFavoriteItem } from "@/Redux/Features/Portal/Favorites/AddToFavoriteSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { RemoveFavoriteItem } from "@/Redux/Features/Portal/Favorites/RemoveFavoriteItemSlice";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Explore.module.scss";
import { Home, Living } from "@mui/icons-material";
const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const dispatch = useDispatch();
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = rooms?.slice(indexOfFirstItem, indexOfLastItem);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const handlePageChange = async (event, page) => {
    try {
      setIsLoading(true);
      setCurrentPage(page);
      await getRoomsData(52);
    } finally {
      setIsLoading(false);
    }
  };
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
    setIsLoading(true);
    try {
      setIsLoading(true);
      const element = await dispatch(
        // @ts-ignore
        getRooms({ startDate, endDate, roomCount })
      );
      // @ts-ignore
      setRooms(element?.payload?.data?.rooms);
    } finally {
      setIsLoading(false);
    }
  };

  //! ************************ Get All Favorite Rooms  *************************
  const [favList, setFavList] = useState([]);
  const getFavoriteData = async () => {
    setIsLoading(true);

    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavList(element?.payload?.data?.favoriteRooms[0]?.rooms);
    } finally {
      setIsLoading(false);
    }
  };

  //! ************************ Delete From Favorite  *************************

  const deleteFavoriteItem = async (roomId: any) => {
    try {
      setDisabled(true)
      // @ts-ignore
      const element = await dispatch(RemoveFavoriteItem(roomId));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setDisabled(false)
    }
  };

  //! ************************ Add To Favorite  *************************
  const addItemToFavorite = async (roomId: any) => {
    try {
      setDisabled(true)
      // @ts-ignore
      const element = await dispatch(AddFavoriteItem(roomId));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } finally  {
      setDisabled(false)
    }
  };
  const loadingArray = Array.from(
    new Array(currentRooms?.length || itemsPerPage)
  );
  return (
    <>
      <Box component={"main"} className={style.exploreContainer}>
        <Typography variant="h1" className="title">
          Explore ALL Rooms
        </Typography>


        <Breadcrumbs aria-label="breadcrumb">
          <Link className="path" color="inherit" to={"/"}> <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography variant="caption" className="subPath" >
            <Living fontSize="inherit" sx={{ mr: 0.5 }} />
            Explore
          </Typography>
        </Breadcrumbs>



        <Typography
          variant="h4"
          className="subTitle"
          style={{ fontSize: "clamp(1rem, 2.5vw, 2rem)" }}
        >
          All Rooms
        </Typography>
        <Box className={style.ExploreImages} justifyContent={"center"}>
          {isLoading
            ? loadingArray.map(() => (
              <Skeleton
                variant="rounded"
                width={200}
                height={200}
                animation="wave"
              />
            ))
            : currentRooms?.length >= 0 &&
            currentRooms?.map((ele, index) => (
              <Box
                key={index}
                sx={{ width: 200, height: 200, my: 2 }}
                className={` ${isSmallScreen ? style.imgExplore : ""}`}
              >
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
                    disabled
                  }}
                />
              </Box>
            ))}
        </Box>
        <Stack spacing={2} marginTop={4} justifyContent={"center"}>
          <Pagination
            page={currentPage}
            variant="outlined"
            color="primary"
            count={Math.ceil(rooms.length / itemsPerPage)}
            className={style.pagination}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Explore;
