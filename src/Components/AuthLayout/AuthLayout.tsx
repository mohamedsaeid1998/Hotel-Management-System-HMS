import React from 'react'
import './AuthLayout.module.scss'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return <>

<Box component ="div">
<Outlet/>
</Box>


  </>
}

export default AuthLayout