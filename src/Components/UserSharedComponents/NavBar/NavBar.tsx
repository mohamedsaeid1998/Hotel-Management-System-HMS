import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './NavBar.module.scss'
import React, { useEffect, useState } from 'react'
import { Favorite } from '@mui/icons-material'
import { defaultImage } from '@/Assets/Images'
import { useDispatch } from 'react-redux'
import { UserDetails } from '@/Redux/Features/Admin/Users/GetUserDetailsSlice'

const NavBar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()


  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const userId = localStorage.getItem("userId");
  console.log(userId);

  useEffect(() => {
    if (localStorage.getItem("userId"))
      getData();
  }, [dispatch]);

  const getData = async () => {
    // @ts-ignore
    const element = await dispatch(UserDetails(userId));
    // @ts-ignore
    setUserData(element.payload.data.user);
  }

  console.log(userData);



  const handelLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  function notificationsLabel(count: number) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }



  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>

    <AppBar color='inherit' className='nav'>
      <Toolbar >
        <Typography className='subNav' variant="h4" component="div" color="initial"> <Typography variant='' className='blueColor'>Stay</Typography>cation.</Typography>
        <Stack className='navList' direction="row">
          <Link className={`navLink ${pathname === '/' ? "activeLink" : ""}`} to={'./'}>Home</Link>
          <Link className={`navLink ${pathname === '/explore' ? "activeLink" : ""}`} to={'./explore'}>Explore</Link>
          <Link className={`navLink ${pathname === '/room-reviews' ? "activeLink" : ""}`} to={'./room-reviews'}>Reviews</Link>
          <IconButton aria-label={notificationsLabel(100)}>
            <Badge badgeContent={98} color="primary">
              <Favorite onClick={() => navigate('./favorite-rooms')} />
            </Badge>
          </IconButton>
          {!localStorage.getItem("authToken") ? <>

            <Button className='navBtn' variant="contained" onClick={() => navigate('./login')}>
              Login Now
            </Button>
            <Button className='navBtnSign' variant="contained" onClick={() => navigate('./register')}>
              Sign Up
            </Button>

          </>
            :
            <>

              <Box className="navAvatar">
                <Tooltip title="Open settings">
                  <IconButton>
                    <img
                      className="nav-img"

                      src={
                        userData?.profileImage == null
                          ? defaultImage
                          : `http://res.cloudinary.com/dpa4yqvdv/image/upload/v1705784141/users/fod9w8mryr5c5raufxwc.jpg`
                      }
                      id="demo-positioned-button"
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Typography variant="caption" color="red" onClick={() => handelLogout()}>
                    Log Out
                  </Typography>
                </MenuItem>

              </Menu>
              <Box className="navInfo">
                <Typography variant="caption" color="initial">
                  {userData?.userName}
                </Typography>
                <Typography variant="caption" color="initial">
                  {userData?.email}
                </Typography>
              </Box>
            </>
          }

        </Stack>
      </Toolbar>
    </AppBar>
  </>
}

export default NavBar


{/* <Button
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
<MenuItem onClick={handleClose}>Profile</MenuItem>
<MenuItem onClick={handleClose}>My account</MenuItem>
<MenuItem onClick={handleClose}>Logout</MenuItem>
</Menu> */}

{/* <Button className='navBtn' variant="contained" onClick={() => navigate('./login')}>
              Login Now
            </Button>
            <Button className='navBtnSign' variant="contained" onClick={() => navigate('./register')}>
              Sign Up
            </Button> */}