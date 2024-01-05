import React, { useState } from 'react'
import './AddNewRoom.module.scss'
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'

const AddNewRoom = () => {


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  return <>
    <Box component="form" className='formContainer'>
      <TextField className='roomNumber' label="Room Number" />
      <Box className="middleInputs">
        <TextField className='price' label="Price" />
        <TextField className='capacity' label="Capacity" />
      </Box>


      <Box className="middleInputs">
        <TextField className='discount' label="Discount" />
        <FormControl className='facilities' sx={{ minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">facilities</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>

          </Select>
        </FormControl>
      </Box>


    </Box>

  </>
}

export default AddNewRoom