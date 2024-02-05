/** @format */

import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import style from "./NavBar.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
const DrawerComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile && (
        <>
          <IconButton edge="start" onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            open={drawerOpen}
            onClose={() => setDrawerOpen(!drawerOpen)}
          >
            <List className={style.navStyle}>
              <ListItem>
                <Link to="/">Home</Link>
              </ListItem>
              <ListItem>
                <Link to="/explore">Explore</Link>
              </ListItem>
              <ListItem>
                <Link to="/room-reviews">Reviews</Link>
              </ListItem>
              <ListItem>
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
                  <ListItem>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setDrawerOpen(!drawerOpen);
                        navigate("/logout");
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
