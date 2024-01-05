import { AutoStories, Discount, Home, LockOpen, Logout, MeetingRoom, PeopleAlt } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Sidebar.module.scss';

const Sidebar = () => {


  const DrawerItems = [
    { text: "Home", icon: <Home />, path: "/dashboard" },
    { text: "Users", icon: <PeopleAlt />, path: "/dashboard/users" },
    { text: "Rooms", icon: <MeetingRoom />, path: "/dashboard/rooms" },
    { text: "Ads", icon: <Discount />, path: "/dashboard/ads" },
    { text: "Bookings", icon: <AutoStories />, path: "/dashboard/bookings" },
  ]
  const navigate = useNavigate()
  return <>
    <Drawer
      sx={{
        width: "230px",
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: "230px",
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >

      <Toolbar />
      <List>
        {DrawerItems.map(({ text, icon, path }) =>
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { navigate(path) }} >
              <ListItemIcon >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>

          </ListItem>
        )}

        <ListItem  disablePadding>
          <ListItemButton  >
            <ListItemIcon >
            <LockOpen />
            </ListItemIcon>
            <ListItemText primary={"ChangePassword"} />
          </ListItemButton>






        </ListItem>
        <ListItem  disablePadding>
          <ListItemButton  >
            <ListItemIcon >
              <Logout/>
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>

        </ListItem>


      </List>
    </Drawer>
  </>
}

export default Sidebar
