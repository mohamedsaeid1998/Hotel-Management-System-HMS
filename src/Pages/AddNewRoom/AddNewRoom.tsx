// import { Box } from '@mui/material';
import { Button, MenuItem, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react'
import './AddNewRoom.module.scss'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { FacilitiesData } from '@/Redux/Features/Facilities/FacilitiesSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';
import { CreateRooms } from '@/Redux/Features/Rooms/CreateRoomsSlice';


const AddNewRoom = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
 const facilities= getValues("facilities")

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
  const [Facilities, setFacilities] = useState<string[]>(["65995a88638848bce6efdf91","6598a985638848bce6efcb13"])

  // const handleChange = (event: any) => {
  //   setFacilities(event.target.value)
    
  // }




  //! ***************Selected Images ***************
  const [imageFile, setImageFile] = useState([]);

  const handleImageChange = (event: any) => {
      const files = Array.from(event.target.files)
      setImageFile(files);
  }

  //? ***************Send Data***************

  const sendData = (data: any) => {
    console.log(imageFile);
    console.log(data);



   dispatch(CreateRooms({...data,facilities }))
  
    // await dispatch(postStudentsData({ studentName, classYear, teacher, age, phone }))
  }



  return <>
    <Box className='formContainer' component="form" onSubmit={handleSubmit(sendData)}>

      <TextField variant="filled" type="text" className='roomNumber' label="Room Number"
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
          }  />




        <TextField label="select facilities"  className='facilities' color="secondary"  value={Facilities} select SelectProps={{multiple: true}}
        {...register("facilities", {
          required,
        })}
          error={Boolean(errors.facilities)}
          helperText={Boolean(errors.facilities) ? errors?.facilities?.message?.toString() : null
          } >

          {selectData?.map(({_id,name}:any) => <MenuItem key={_id} value={_id}>{name}</MenuItem>)}

        </TextField>

      </Box>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload Images
        <input onChange={handleImageChange} type="file" multiple hidden />
      </Button>

      <Button sx={{ mt: "22px" }} variant="contained" type='submit'  >

        Submit <ChevronRight />
      </Button>


    </Box>


  </>
}

export default AddNewRoom


