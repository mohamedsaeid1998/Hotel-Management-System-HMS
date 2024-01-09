import { Button, MenuItem, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react'
import './AddNewRoom.module.scss'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { FacilitiesData } from '@/Redux/Features/Facilities/FacilitiesSlice';
import { useForm } from 'react-hook-form';
import { ChevronRight } from '@mui/icons-material';
import { CreateRooms } from '@/Redux/Features/Rooms/CreateRoomsSlice';
import { Link } from 'react-router-dom';

const AddNewRoom = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();


  const required = "This Field is required"

  //? ***************Get Facilities Data ***************
  const dispatch = useDispatch();
  const [selectData, setSelectData] = useState(null)

  useEffect(() => {
    getFacilitiesData()
  }, []);

  const getFacilitiesData = async () => {
    // @ts-ignore
    let element = await dispatch(FacilitiesData())
    // @ts-ignore
    setSelectData(element.payload.data.facilities)
  }


  //! ***************Selected Input ***************
  const [Facilities, setFacilities] = useState<string[]>([])
  const selectedFacilities = getValues("facilities")


  //! ***************Selected Images ***************
  const [images, setImgs] = useState([]);

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files)
    setImgs(files);
  }
  //? ***************Send Data***************

  const sendData = (data: any) => {

    dispatch(CreateRooms({ ...data, selectedFacilities, images }))

  }


  return <>
    <Box className='formContainer' component="form" onSubmit={handleSubmit(sendData)}>

      <TextField variant="filled" type="number" className='roomNumber' label="Room Number"
        {...register("roomNumber", {
          required,
          minLength: { value: 3, message: "minlength is 3 " }

        })}
        error={Boolean(errors.roomNumber)}
        helperText={Boolean(errors.roomNumber) ? errors?.roomNumber?.message?.toString() : null
        } />



      <Box className="middleInputs">

        <TextField variant="filled" type="number" className='price' label="Price"
          {...register("price", {
            required,
          })}
          error={Boolean(errors.price)}
          helperText={Boolean(errors.price) ? errors?.price?.message?.toString() : null
          } />



        <TextField variant="filled" type="number" className='capacity' label="Capacity"
          {...register("capacity", {
            required,
          })}
          error={Boolean(errors.capacity)}
          helperText={Boolean(errors.capacity) ? errors?.capacity?.message?.toString() : null
          } />

      </Box>





      <Box className="middleInputs">

        <TextField variant="filled" type="number" className='discount' label="Discount"
          {...register("discount", {
            required,
          })}
          error={Boolean(errors.discount)}
          helperText={Boolean(errors.discount) ? errors?.discount?.message?.toString() : null
          } />




        <TextField label="select facilities" className='facilities' color="secondary" onClick={() => setFacilities(facilities)} defaultValue={Facilities} select SelectProps={{ multiple: true }}
          {...register("facilities", {
            required,
          })}
          error={Boolean(errors.facilities)}
          helperText={Boolean(errors.facilities) ? errors?.facilities?.message?.toString() : null
          } >

          {selectData?.map(({ _id, name }: any) => <MenuItem key={_id} value={_id}>{name}</MenuItem>)}

        </TextField>

      </Box>
      <Box className="imagesBtn">
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload Images
          <input onChange={handleImageChange} type="file" multiple hidden />
        </Button>
      </Box>


      <Box className='btnContainer'>

        <Link to={'/dashboard/rooms'}>
          <Button variant="outlined"  size="large" >
          Cancel 
          </Button>
        </Link>


        <Button variant="contained" type='submit' size="large" >
          Submit <ChevronRight />
        </Button>

      </Box>


    </Box>


  </>
}

export default AddNewRoom


