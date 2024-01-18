/** @format */

//@ts-nocheck
import LoadingComponent from "@/Components/Loading/Loading";
import { FacilitiesData } from "@/Redux/Features/Facilities/FacilitiesSlice";
import { CreateRooms } from "@/Redux/Features/Rooms/CreateRoomsSlice";
import { RoomsDataDetails } from "@/Redux/Features/Rooms/RoomDetailsSlice";
import { updateRoomData } from "@/Redux/Features/Rooms/UpdateRoom";
import { ChevronRight } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddNewRoom.module.scss";
interface propState {
  isEdit: boolean;
}
const AddNewRoom = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm();

  const [checkPage, setCheckPage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectData, setSelectData] = useState(null);
  const [Facilities, setFacilities] = useState<string[]>([]);
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isEdit } = location.state as propState;
  const facilities = getValues("facilities");

  const navigate = useNavigate();

  const required = "This Field is required";

  //? ***************Get Facilities Data ***************
  const getFacilitiesData = useCallback(async () => {
    try {
      // @ts-ignore
      const element = await dispatch(FacilitiesData());
      // @ts-ignore
      setSelectData(element.payload.data.facilities);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }, [dispatch]);

  const [EditFacilities, setEditFacilities] = useState();
  const getRoomDetails = async () => {
    setLoading(true);
    try {
      const getEditRoomData = await dispatch(RoomsDataDetails(id));
      const roomDetails = getEditRoomData.payload.data.room;
      setValue("price", roomDetails?.price);
      setValue("roomNumber", roomDetails?.roomNumber);
      setValue("discount", roomDetails?.discount);
      setValue("capacity", roomDetails?.capacity);

      const roomsIds = [];
      const details = roomDetails?.facilities.map((ele) =>
        roomsIds.push(ele._id)
      );

      setEditFacilities(roomsIds);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFacilitiesData();
    if (isEdit) {
      getRoomDetails();
      setCheckPage(isEdit);
    }
  }, []);

  //! ***************Selected Images ***************
  const [images, setImages] = useState([]);

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  //? ***************Send Data***************
  const submitData = (data: any) => {
    const addFormData = new FormData();

    // for (let i = 0; i < images.length; i++) {
    //   addFormData.append('imgs', images[i]);
    // }

    // for (let i = 0; i < facilities.length; i++) {
    //   addFormData.append('facilities[]', facilities[i]);
    // }

    facilities.forEach((facility: string) =>
      addFormData.append("facilities[]", facility)
    );

    images.forEach((img) => addFormData.append("imgs", img));

    addFormData.append("roomNumber", data["roomNumber"]);
    addFormData.append("price", data["price"]);
    addFormData.append("capacity", data["capacity"]);
    addFormData.append("discount", data["discount"]);
    sendData(addFormData);
  };

  const sendData = async (addFormData: any) => {
    if (!checkPage) {
      const roomsData = await dispatch(CreateRooms(addFormData));
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
      const roomId = id;
      const updateData = await dispatch(
        updateRoomData({ addFormData, roomId })
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
      {loading ? (
        <LoadingComponent />
      ) : (
        setSelectData.length > 0 && (
          <>
            <Box
              className="formContainer"
              component="form"
              onSubmit={handleSubmit(submitData)}
            >
              <TextField
                variant="filled"
                type="text"
                className="roomNumber"
                label="Room Number"
                {...register("roomNumber", {
                  required,
                  minLength: { value: 3, message: "minlength is 3 " },
                  pattern: {
                    value: /^[^-][A-Za-z0-9]*$/,
                    message: '"Please enter a positive number"',
                  },
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
                {isEdit ? (
                  <TextField
                    label="select facilities"
                    className="facilities"
                    color="secondary"
                    onClick={() => setFacilities(facilities)}
                    defaultValue={EditFacilities}
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
                ) : (
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
                )}
              </Box>
              <Box className="imagesBtn">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Images
                  <input
                    onChange={handleImageChange}
                    type="file"
                    multiple
                    hidden
                  />
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
          </>
        )
      )}
    </>
  );
};

export default AddNewRoom;
