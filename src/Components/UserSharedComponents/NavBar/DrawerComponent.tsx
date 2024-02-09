/** @format */

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import style from "./NavBar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link, useNavigate } from "react-router-dom";
import { lightBlue } from "@mui/material/colors";
const DrawerComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const handelLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      {isMobile && (
        <>
          <IconButton edge="start" onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(!drawerOpen)}
          >
            <List className={style.navStyle}>
              <ListItem>
                <Typography
                  className={`subNav  `}
                  variant="h4"
                  component="div"
                  color="initial"
                  style={{ marginBottom: "2rem" }}
                  margin={"auto"}
                  textAlign={"center"}
                >
                  <Typography
                    variant=""
                    className={style.logo}
                    style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
                  >
                    Stay
                  </Typography>
                  cation.
                </Typography>
              </ListItem>
              <ListItem>
                <Box
                  className={style.navArrow}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <ArrowCircleRightIcon fontSize="large" color="action" />
                </Box>
              </ListItem>
              <ListItem className={style.navSectionsSmallView}>
                <Link to="/">Home</Link>
              </ListItem>
              <ListItem className={style.navSectionsSmallView}>
                <Link to="/explore">Explore</Link>
              </ListItem>

              <ListItem className={style.navSectionsSmallView}>
                <Link to="/favorite-rooms">Favorite</Link>
              </ListItem>
              {!localStorage.getItem("authToken") ? (
                <>
                  <ListItem>
                    <Button
                      className="navBtn"
                      variant="contained"
                      onClick={() => {
                        setDrawerOpen(!drawerOpen);
                        navigate("/login");
                      }}
                    >
                      Login Now
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      className="navBtnSign"
                      variant="contained"
                      onClick={() => {
                        setDrawerOpen(!drawerOpen);
                        navigate("/register");
                      }}
                    >
                      Sign Up
                    </Button>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setDrawerOpen(!drawerOpen);
                        handelLogout();
                      }}
                    >
                      Logout
                    </Button>
                  </ListItem>
                </>
              )}
            </List>
          </Drawer>
        </>
      )}
    </>
  );
};

export default DrawerComponent;
