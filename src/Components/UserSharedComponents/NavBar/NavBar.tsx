import { defaultImage } from "@/Assets/Images";
import { UserDetails } from "@/Redux/Features/Admin/Users/GetUserDetailsSlice";
import { getFavoriteItems } from "@/Redux/Features/Portal/Favorites/GetAllFavoritesSlice";
import { Favorite } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DrawerComponent from "./DrawerComponent";
import "./NavBar.module.scss";
const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { count } = useSelector((state) => state.AddToFavorite);
  const { data } = useSelector((state) => state.RemoveFavoriteItemSlice);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) getData();
    if (localStorage.getItem("userRole") === "user") getFavoriteData();
  }, [dispatch, count, data]);

  const getData = async () => {
    // @ts-ignore
    const element = await dispatch(UserDetails(userId));
    // @ts-ignore
    setUserData(element.payload.data.user);
  };
  const [favoriteItemsCount, setFavoriteItemsCount] = useState(0);
  const getFavoriteData = useCallback(async () => {
    try {
      // @ts-ignore
      const element = await dispatch(getFavoriteItems());
      // @ts-ignore
      setFavoriteItemsCount(
        element?.payload?.data?.favoriteRooms[0]?.rooms?.length
      );
    } finally {
    }
  }, [dispatch]);

  const handelLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  function notificationsLabel(count: number) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  // const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateToFav = () => {
    if (
      !localStorage.getItem("authToken") ||
      localStorage.getItem("userRole") !== "user"
    ) {
      toast.error("please ensure you are logged in to your user account", {
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      navigate("./favorite-rooms");
    }
  };
  return (
    <>
      <AppBar color="inherit" className="nav">
        <Toolbar>
          {isSmallScreen && <DrawerComponent />}

          <Typography
            className={`subNav ${isSmallScreen ? "centerText" : ""}`}
            variant="h4"
            component="div"
            color="initial"
            margin={"auto"}
            textAlign={"center"}
          >
            <Typography
              variant=""
              className="blueColor"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              Stay
            </Typography>
            cation.
          </Typography>
          {isSmallScreen ? (
            ""
          ) : (
            <Stack className="navList" direction="row">
              <Link
                className={`navLink ${pathname === "/" ? "activeLink" : ""}`}
                to={"./"}
              >
                {t("home")}
              </Link>
              <Link
                className={`navLink ${
                  pathname?.includes("explore") ? "activeLink" : ""
                }`}
                to={"./explore"}
              >
                {t("explore")}
              </Link>
              <IconButton
                onClick={navigateToFav}
                aria-label={notificationsLabel(100)}
              >
                <Badge
                  badgeContent={
                    favoriteItemsCount === 0 ? "0" : favoriteItemsCount
                  }
                  color="primary"
                >
                  <Favorite />
                </Badge>
              </IconButton>
              {i18n.language == "ar" ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  En
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                >
                  Ar
                </Button>
              )}
              {!localStorage.getItem("authToken") ? (
                <>
                  <Button
                    className="navBtn"
                    variant="contained"
                    onClick={() => navigate("./login")}
                  >
                    {t("login")}
                  </Button>
                  <Button
                    className="navBtnSign"
                    variant="contained"
                    onClick={() => navigate("./register")}
                  >
                    {t("signup")}
                  </Button>
                </>
              ) : (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData?.profileImage == null
                            ? defaultImage
                            : `http://res.cloudinary.com/dpa4yqvdv/image/upload/v1705784141/users/fod9w8mryr5c5raufxwc.jpg`
                        }
                      />
                    </IconButton>
                  </Box>
                  <Box className="navInfo">
                    <Typography variant="caption" color="initial">
                      {userData?.userName}
                    </Typography>
                    <Typography variant="caption" color="initial">
                      {userData?.email}
                    </Typography>
                  </Box>
                  <Button
                    className="navBtn"
                    variant="contained"
                    onClick={handelLogout}
                  >
                    {t("Logout")}
                  </Button>
                </>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;

{
  /* <Button
id="demo-positioned-button"
aria-controls={open ? 'demo-positioned-menu' : undefined}
aria-haspopup="true"
aria-expanded={open ? 'true' : undefined}
onClick={handleClick}
> 
Dashboard
</Button>
<Menu
id="demo-positioned-menu"
aria-labelledby="demo-positioned-button"
anchorEl={anchorEl}
open={open}
onClose={handleClose}
anchorOrigin={{
  vertical: 'top',
  horizontal: 'left',
}}
transformOrigin={{
  vertical: 'top',
  horizontal: 'left',
}}
> 
<MenuItemonClick={handleClose}>Profile</MenuItem>
<MenuItem onClick={handleClose}>My account</MenuItem>
<MenuItem onClick={handleClose}>Logout</MenuItem>
</Menu> */
}

{
  /* <Button className='navBtn' variant="contained" onClick={() => navigate('./login')}>
              Login Now
            </Button>
            <Button className='navBtnSign' variant="contained" onClick={() => navigate('./register')}>
              Sign Up
            </Button> */
}
