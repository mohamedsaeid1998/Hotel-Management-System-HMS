import { Box, List, ListItem, Menu, MenuItem, Typography } from '@mui/material'
import './Footer.module.scss'

const Footer = () => {
  return <>
<Box className="footerContainer">

<Box className="mainPart">
<Typography className='subNav' variant="h4" component="div" color="initial"> <Typography variant='' className='blueColor'>Stay</Typography>cation.</Typography>
<Typography  className='subPara'>We kaboom your beauty holiday instantly and memorable.</Typography>
</Box>


  <List className='footerList'>
    <ListItem className='listHead'>For Beginners</ListItem>
    <ListItem className='listChild'>New Account</ListItem>
    <ListItem className='listChild'>Start Booking a Room</ListItem>
    <ListItem className='listChild'>Use Payments</ListItem>
  </List>

  <List className='footerList'>
    <ListItem className='listHead'>Explore Us</ListItem>
    <ListItem className='listChild'>Our Careers</ListItem>
    <ListItem className='listChild'>Privacy</ListItem>
    <ListItem className='listChild'>Terms & Conditions</ListItem>
  </List>

  <List className='footerList'>
    <ListItem className='listHead'>Connect Us</ListItem>
    <ListItem className='listChild'>upskilling.eg1@gmail.com</ListItem>
    <ListItem className='listChild'>011 - 5493 - 2137</ListItem>
    <ListItem className='listChild'>Staycation, Egypt , Giza</ListItem>
  </List>


</Box>
<Box className="FooterCopyRight">
Copyright 2024 • All rights reserved • Staycation
</Box>
  </>
}

export default Footer