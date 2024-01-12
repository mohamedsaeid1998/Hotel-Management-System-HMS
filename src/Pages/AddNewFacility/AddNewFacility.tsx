import { CreateFacility } from '@/Redux/Features/Facilities/CreateFacilitySlice';
import { ChevronRight } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import './AddNewFacility.module.scss';
const AddNewFacility = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const required = "This Field is required"

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  //? ***************Send Data***************

  const sendData = async (data: any) => {
    setLoading(true)
    // @ts-ignore
    const FacilityData = await dispatch(CreateFacility(data))
    // @ts-ignore
    if (FacilityData?.payload?.message === "Room Facility created successfully") {
      setLoading(false)
      toast.success("Room Facility Created Successfully", {
        autoClose: 2000,
        theme: "colored",
      })
      navigate('/dashboard/facilities')
    } else {
      setLoading(false)
      toast.error("Room Facility Was Not Created Successfully", {
        autoClose: 2000,
        theme: "colored",
      })
    }

  }


  return <>
    <Box className='formContainer' component="form" onSubmit={handleSubmit(sendData)}>

      <TextField variant="filled" type="text" className='roomNumber' label="Facility Name" color='secondary'
        {...register("name", {
          required,
          minLength: { value: 3, message: "minlength is 3" },
        })}
        error={!!errors.name}
        helperText={!!errors.name ? errors?.name?.message?.toString() : null
        } />

      <Box className='btnContainer'>

        <Link to={'/dashboard/facilities'}>
          <Button variant="outlined" size="large" >
            Cancel
          </Button>
        </Link>


        {loading ?
          <LoadingButton className='loadingButton' loading variant="outlined" >
            Submit
          </LoadingButton> : <Button variant="contained" type='submit' size="large"  >
            Submit <ChevronRight />
          </Button>}

      </Box>


    </Box>
  </>
}

export default AddNewFacility