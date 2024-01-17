/** @format */

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import "./Navbar.module.scss";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { UserDetails } from "@/Redux/Features/Users/GetUserDetailsSlice";
import { defaultImage } from "@/Assets/Images";
import { Backdrop, CircularProgress } from "@mui/material";

const Navbar = ({ showDrawer }: any) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const element = await dispatch(UserDetails(userId));
      // @ts-ignore
      setUserData(element.payload.data.user);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [setUserData]);
  return (
    <>
      {loading ? (
        <Backdrop
          style={{ opacity: 1, backgroundColor: "rgb(4 87 253 / 4%)" }}
          sx={{
            color: "#203FC7",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{ flexGrow: 1, display: { sm: "none" }, color: "black" }}
              >
                <IconButton
                  onClick={() => {
                    showDrawer();
                  }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Box className="navAvatar">
                <Tooltip title="Open settings">
                  <IconButton>
                    <Avatar
                      src={
                        `http://upskilling-egypt.com:3000/` +
                        userData?.profileImage
                      }
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box className="navInfo">
                <Typography variant="caption" color="initial">
                  {userData?.userName}
                </Typography>
                <Typography variant="caption" color="initial">
                  {userData?.email}
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};

export default Navbar;
