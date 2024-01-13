import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from '..'
import './MasterLayout.module.scss'

const MasterLayout = () => {




  return <>


  <Box className='containerBox'>

        <Box>
          <Sidebar />
        </Box>

        <Box className="mainContainer">
          <Navbar />
          <Outlet />
        </Box>
  </Box>





  </>
}

export default MasterLayout


