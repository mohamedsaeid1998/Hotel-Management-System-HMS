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
    { text: "Home", icon: <Home />, path: "/dashboard" },
    { text: "Users", icon: <PeopleAlt />, path: "/dashboard/users" },
    { text: "Rooms", icon: <MeetingRoom />, path: "/dashboard/rooms" },
    { text: "Facilities", icon: <Grade />, path: "/dashboard/facilities" },
    { text: "Ads", icon: <Discount />, path: "/dashboard/ads" },
    { text: "Bookings", icon: <AutoStories />, path: "/dashboard/bookings" },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        sx={{
          width: "230px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "230px",
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {DrawerItems.map(({ text, icon, path }) => (
            <ListItem
              key={text}
              disablePadding
              className={pathname === path ? "active" : null}
            >
              <ListItemButton
                onClick={() => {
                  navigate(path);
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LockOpen />
              </ListItemIcon>
              <ListItemText primary={"ChangePassword"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
