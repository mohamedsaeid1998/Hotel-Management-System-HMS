import { Footer, NavBar } from '@/Pages'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return <>

    <Box>

      <NavBar />
      <Box className="userContainer">
        <Outlet />
        <Footer />
      </Box>
    </Box>
  </>
}

export default UserLayout