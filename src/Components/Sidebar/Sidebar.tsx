/** @format */

import {
  AutoStories,
  Discount,
  Grade,
  Home,
  LockOpen,
  Logout,
  MeetingRoom,
  PeopleAlt,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.module.scss";
import React from "react";

// import Drawer from '@mui/material/Drawer';
// import Toolbar from '@mui/material/Toolbar';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';

const Sidebar = () => {
  const { pathname } = useLocation();
  const DrawerItems = [
    {
      id: 1,
      text: "Home",
      icon: <Home />,
      path: "/dashboard",
      time: "300",
      shape: "fade-right",
    },
    {
      id: 2,
      text: "Users",
      icon: <PeopleAlt />,
      path: "/dashboard/users",
      time: "400",
      shape: "fade-right",
    },
    {
      id: 3,
      text: "Rooms",
      icon: <MeetingRoom />,
      path: "/dashboard/rooms",
      subPath: "room",
      time: "500",
      shape: "fade-right",
    },
    {
      id: 4,
      text: "Facilities",
      icon: <Grade />,
      path: "/dashboard/facilities",
      subPath: "facility",
      time: "600",
      shape: "fade-right",
    },
    {
      id: 5,
      text: "Ads",
      icon: <Discount />,
      path: "/dashboard/ads",
      subPath: "ads",
      time: "700",
      shape: "fade-right",
    },
    {
      id: 6,
      text: "Bookings",
      icon: <AutoStories />,
      path: "/dashboard/bookings",
      subPath: "booking",
      time: "800",
      shape: "fade-right",
    },
  ];
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <>
      <Drawer
        sx={{
          display: { xs: display, sm: "block" },
          width: "230px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "230px",
            boxSizing: "border-box",
          },
        }}
        variant={DrawerVariant}
        anchor="left"
        open={true}
        onClose={() => {
          closeDrawer();
        }}
      >
        <Toolbar />
        <List>
          {DrawerItems.map(({ id, text, icon, path, subPath, time, shape }) => (
            <ListItem
              key={id}
              disablePadding
              className={` ${
                pathname === path || pathname?.includes(subPath)
                  ? "active"
                  : null
              }`}
            >
              <ListItemButton
                onClick={() => {
                  navigate(path);
                }}
              >
                <ListItemIcon data-aos-delay={time} data-aos={shape}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  data-aos-delay={time}
                  data-aos={shape}
                  primary={text}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding data-aos-delay="900" data-aos="fade-right">
            <ChangePassword />
          </ListItem>
          <ListItem disablePadding data-aos-delay="1000" data-aos="fade-right">
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={"Logout"} onClick={handelLogout} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
