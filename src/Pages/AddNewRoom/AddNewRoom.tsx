/** @format */

import { Button, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import "./AddNewRoom.module.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { FacilitiesData } from "@/Redux/Features/Facilities/FacilitiesSlice";
import { useForm } from "react-hook-form";
import { ChevronRight } from "@mui/icons-material";
import { CreateRooms } from "@/Redux/Features/Rooms/CreateRoomsSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateRoom, { updateRoomData } from "@/Redux/Features/Rooms/UpdateRoom";
import { RoomsDataDetails } from "@/Redux/Features/Rooms/RoomDetailsSlice";
interface propState {
  isEdit: boolean;
}
const AddNewRoom = () => {
  const location = useLocation();
  const { id } = useParams();
  const [roomId, setRoomId] = useState(null);
  const [checkPage, setCheckPage] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isEdit } = location.state as propState;
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const required = "This Field is required";

  //? ***************Get Facilities Data ***************
  const dispatch = useDispatch();
  const [selectData, setSelectData] = useState(null);

  const getFacilitiesData = async () => {
    // @ts-ignore
    const element = await dispatch(FacilitiesData());
    // @ts-ignore
    setSelectData(element.payload.data.facilities);
  };
  const getRoomDetails = useCallback(
    async (roomId) => {
      setLoading(true);
      console.log(roomId);
      try {
        const getEditRoomData = await dispatch(RoomsDataDetails(roomId));
        setRoomDetails(getEditRoomData.payload.data.room);
        // setRoomDetails(getEditRoomData.payload.data.room);
        // // setValue("roomNumber", roomDetails?.roomNumber);
        // console.log(roomDetails?.price);
        // setValue("price", roomDetails?.price);
        setValue("roomNumber", roomDetails?.roomNumber);
        setValue("price", roomDetails?.price);
        setValue("discount", roomDetails?.discount);
        setValue("capacity", roomDetails?.capacity);
        setValue("facilities", roomDetails?.facilities[0]._id);
        setValue("facilities", roomDetails?.facilities[1]._id);
        // trigger("price");
        // setLoading(false);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (isEdit) {
      setCheckPage(isEdit);
      getRoomDetails(roomId);
    }
    setRoomId(id);
    getFacilitiesData();
  }, [roomId, isEdit, getRoomDetails]);

  //! ***************Selected Input ***************

  const [Facilities, setFacilities] = useState<string[]>([]);
  const facilities = getValues("facilities");

  //! ***************Selected Images ***************
  const [images, setImages] = useState([]);

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };
  //? ***************Send Data***************
  const sendData = async (data: any) => {
    if (!checkPage) {
      const roomsData = await dispatch(
        CreateRooms({ ...data, facilities, images })
      );
      if (roomsData?.payload?.message === "Room created successfully") {
        toast.success(" Room created successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/rooms");
      } else {
        toast.error(" Room was not created successfully", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } else {
      const id = roomId;
      const updateData = await dispatch(
        updateRoomData({ ...data, facilities, images, id })
      );
      if (updateData?.payload?.success) {
        toast.success(updateData?.payload?.message, {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/rooms");
      } else {
        toast.error(" Error please try agin", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      {!loading ? (
        <Box
          className="formContainer"
          component="form"
          onSubmit={handleSubmit(sendData)}
        >
          <TextField
            variant="filled"
            type="text"
            className="roomNumber"
            label="Room Number"
            {...register("roomNumber", {
              required,
              minLength: { value: 3, message: "minlength is 3 " },
              validate: (value) =>
                (value !== undefined && +value > 0) ||
                "Please enter a positive number",
            })}
            error={Boolean(errors.roomNumber)}
            helperText={
              Boolean(errors.roomNumber)
                ? errors?.roomNumber?.message?.toString()
                : null
            }
          />

          <Box className="middleInputs">
            <TextField
              variant="filled"
              type="number"
              className="price"
              label="Price"
              {...register("price", {
                required,
                validate: (value) =>
                  (value !== undefined && +value > 0) ||
                  "Please enter a positive number",
              })}
              error={!!errors.price}
              helperText={
                !!errors.price ? errors?.price?.message?.toString() : null
              }
            />

            <TextField
              variant="filled"
              type="number"
              className="capacity"
              label="Capacity"
              {...register("capacity", {
                required,
                validate: (value) =>
                  (value !== undefined && +value > 0) ||
                  "Please enter a positive number",
              })}
              error={Boolean(errors.capacity)}
              helperText={
                Boolean(errors.capacity)
                  ? errors?.capacity?.message?.toString()
                  : null
              }
            />
          </Box>

          <Box className="middleInputs">
            <TextField
              variant="filled"
              type="number"
              className="discount"
              label="Discount"
              {...register("discount", {
                required,
                validate: (value) =>
                  (value !== undefined && +value >= 0) ||
                  "Please enter a positive number",
              })}
              error={Boolean(errors.discount)}
              helperText={
                Boolean(errors.discount)
                  ? errors?.discount?.message?.toString()
                  : null
              }
            />

            <TextField
              label="select facilities"
              className="facilities"
              color="secondary"
              onClick={() => setFacilities(facilities)}
              defaultValue={Facilities}
              select
              SelectProps={{ multiple: true }}
              {...register("facilities", {
                required,
              })}
              error={!!errors.facilities}
              helperText={
                !!errors.facilities
                  ? errors?.facilities?.message?.toString()
                  : null
              }
            >
              {selectData?.map(({ _id, name }: any) => (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="imagesBtn">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Images
              <input onChange={handleImageChange} type="file" multiple hidden />
            </Button>
          </Box>

          <Box className="btnContainer">
            <Link to={"/dashboard/rooms"}>
              <Button variant="outlined" size="large">
                Cancel
              </Button>
            </Link>

            <Button variant="contained" type="submit" size="large">
              Submit <ChevronRight />
            </Button>
          </Box>
        </Box>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default AddNewRoom;
