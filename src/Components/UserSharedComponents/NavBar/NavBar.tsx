import { AppBar, Badge, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './NavBar.module.scss'
import { useEffect } from 'react'
import { Favorite } from '@mui/icons-material'

const NavBar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
  return <>

    <AppBar color='inherit' className='nav'>
      <Toolbar >
        <Typography className='subNav' variant="h4" component="div" color="initial"> <Typography variant='' className='blueColor'>Stay</Typography>cation.</Typography>
        <Stack className='navList' direction="row">
          <Link className={`navLink ${pathname === '/' ? "activeLink" : ""}`} to={'./'}>Home</Link>
          <Link className={`navLink ${pathname === '/explore' ? "activeLink" : ""}`} to={'./explore'}>Explore</Link>
          <Link className={`navLink ${pathname === '/reviews' ? "activeLink" : ""}`} to={'./reviews'}>Reviews</Link>
          <Link className={`navLink ${pathname === '/favorites' ? "activeLink" : ""}`} to={'./favorites'}>Favorites</Link>

          {localStorage.getItem("authToken") ? <><IconButton aria-label={notificationsLabel(100)}>
            <Badge badgeContent={98} color="primary">
              <Favorite />
            </Badge>
          </IconButton> <Button className='navBtnOut' variant="contained" color="error" onClick={() => handelLogout()}>
              Log Out
            </Button> </> : <>
            <Button className='navBtn' variant="contained" onClick={() => navigate('./login')}>
              Login Now
            </Button>
            <Button className='navBtnSign' variant="contained" onClick={() => navigate('./register')}>
              Sign Up
            </Button>
          </>
          }



        </Stack>
      </Toolbar>
    </AppBar>
  </>
}

export default NavBar