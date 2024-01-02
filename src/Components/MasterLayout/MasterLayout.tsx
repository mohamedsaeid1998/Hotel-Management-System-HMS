import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from '..'
import './MasterLayout.module.scss'

const MasterLayout = () => {


  return <>







        <Box component={"div"} >
          <Sidebar />
        </Box>

        <Box component={"div"} >
          <Navbar />
          <Outlet />
        </Box>





  </>
}

export default MasterLayout


{/* <Navbar {...{logOut}}/>
<div className="container-fluid d-flex ps-0 pe-0 ">

<div className={`sidebar-container `}>
<SideBar {...{ logOut ,setSidebarOpen ,isSidebarOpen}} />
</div>
<div className={`container-fluid main ${isSidebarOpen ? 'main-sidebar-open' : 'main-sidebar-closed'} `}>

<Outlet />
</div>

</div>  */}