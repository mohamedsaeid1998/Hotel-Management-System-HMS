import { CreateFacility } from '@/Redux/Features/Facilities/CreateFacilitySlice';
import { ChevronRight } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, MenuItem, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import './AddNewAds.module.scss'
import { CreateAds } from '@/Redux/Features/Ads/CreateAdsSlice';
import { RoomsData } from '@/Redux/Features/Rooms/GetRoomsSlice';

const AddNewAds = () => {



  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const required = "This Field is required"

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)






  //? ***************Get Rooms Id ***************
  const [roomsData, setRoomsData] = useState([])

 

  const getData = async () => {
    // @ts-ignore
    let element = await dispatch(RoomsData())
    // @ts-ignore
    setRoomsData(element.payload.data.rooms)
  }

  useEffect(() => {
    getData()
  }, []);



console.log(roomsData);



  //? ***************Send Data***************

  const sendData = async (data: any) => {
    setLoading(true)
    // @ts-ignore
    const FacilityData = await dispatch(CreateAds(data))
    // @ts-ignore
    if (FacilityData?.payload?.message === "Ads created Successfully") {
      setLoading(false)
      toast.success("Ads Created Successfully", {
        autoClose: 2000,
        theme: "colored",
      })
      navigate('/dashboard/ads')
    } else {
      setLoading(false)
      toast.error("Ads Was Not Created Successfully", {
        autoClose: 2000,
        theme: "colored",
      })
    }

  }




// {
//   "room": "6586d2cf226912e0754061c9",
//   "discount": 100,
//   "isActive": false
// }

  return <>
    <Box className='formContainer' component="form" onSubmit={handleSubmit(sendData)}>

    <TextField label="select room" className='roomNumber' color="secondary"  select
          {...register("room", {
            required,
          })}
          error={!!errors.room}
          helperText={!!errors.room ? errors?.room?.message?.toString() : null
          } >

          {roomsData?.map(({ _id,roomNumber }: any) => <MenuItem key={_id} value={_id}>{roomNumber}</MenuItem>)}

        </TextField>


{/* <TextField variant="filled" type="text" className='roomNumber' label="Facility Name" color='secondary'
  {...register("room", {
    required,
    minLength: { value: 3, message: "minlength is 3" },
  })}
  error={!!errors.name}
  helperText={!!errors.name ? errors?.name?.message?.toString() : null
  } /> */}

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


</Box>  </>
}

export default AddNewAds