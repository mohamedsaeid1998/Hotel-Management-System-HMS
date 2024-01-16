/** @format */

import { CreateAds } from "@/Redux/Features/Ads/CreateAdsSlice";
import { updateAdsData } from "@/Redux/Features/Ads/UpdateAdsSlice";
import { getAdsDetailsData } from "@/Redux/Features/Ads/getAdsDetalisSlice";
import { RoomsData } from "@/Redux/Features/Rooms/GetRoomsSlice";
import { ChevronRight } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddNewAds.module.scss";

const AddNewAds = () => {
  const [isActive, setIsActive] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const { isEdit } = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const required = "This Field is required";

  //? ***************Get Rooms Id ***************

  const getData = useCallback(async () => {
    try {
      // @ts-ignore
      const element = await dispatch(RoomsData());
      // @ts-ignore
      setRoomsData(element.payload.data.rooms);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  }, [setRoomsData, dispatch]);

  //? ***************Get details Data***************
  const getDetailsAds = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const detailsAdsData = await dispatch(getAdsDetailsData(id));
      const roomDetails = detailsAdsData?.payload.data?.ads;
      const initActiveValue =
        roomDetails?.isActive !== undefined && String(roomDetails?.isActive);
      setIsActive(initActiveValue);

      setValue("discount", roomDetails?.room?.discount);

      setValue("discount", roomDetails?.room?.discount);
    } catch (error) {
      toast.error("Error fetching existing data:", error);
    } finally {
      setLoading(false);
    }
  };

  //? ***************Send Data***************
  // @ts-ignore

  const sendData = async (data: any) => {
    setLoading(true);
    if (!isEdit) {
      // @ts-ignore
      const createAdsData = await dispatch(CreateAds({ ...data }));
      if (createAdsData?.payload?.message === "Ads created successfully") {
        setLoading(false);
        toast.success("Ads Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/ads");
      } else {
        setLoading(false);
        toast.error(createAdsData?.payload?.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } else {
      const updateAds = await dispatch(updateAdsData({ ...data, id }));
      // @ts-ignore
      if (updateAds?.payload?.success) {
        setLoading(false);
        toast.success("Ads Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/ads");
      } else {
        setLoading(false);
        toast.error("Ads Was Not Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    }
  };
  useEffect(() => {
    if (isEdit) {
      getDetailsAds();
    }
    getData();
  }, []);
  return (
    <>
      {loading
        ? "loading"
        : roomsData.length > 0 && (
            <>
              <Box
                className="formContainer"
                component="form"
                onSubmit={handleSubmit(sendData)}
              >
                <TextField
                  label="select Room"
                  className="roomNumber"
                  color="secondary"
                  select
                  disabled={isEdit}
                  defaultValue={roomsData[0]._id}
                  {...register("room", {
                    required,
                  })}
                  error={!!errors.room}
                  helperText={
                    !!errors.room ? errors?.room?.message?.toString() : null
                  }
                >
                  {roomsData?.map(({ _id, roomNumber }: any) => (
                    <MenuItem key={_id} value={_id}>
                      {roomNumber}
                    </MenuItem>
                  ))}
                </TextField>

                <Box className="middleInputs">
                  <TextField
                    variant="filled"
                    type="number"
                    className="discount"
                    label="discount"
                    color="secondary"
                    {...register("discount", {
                      required,

                      valueAsNumber: true,
                      validate: (value) =>
                        (value !== undefined && +value >= 0) ||
                        "Please enter a positive number",
                    })}
                    defaultValue={" "}
                    error={!!errors.discount}
                    helperText={
                      !!errors.discount
                        ? errors?.discount?.message?.toString()
                        : null
                    }
                  />

                  <TextField
                    label="select Room"
                    className="discount"
                    color="secondary"
                    select
                    {...register("isActive", {
                      required,
                    })}
                    defaultValue={isActive}
                    error={!!errors.isActive}
                    helperText={
                      !!errors.isActive
                        ? errors?.isActive?.message?.toString()
                        : null
                    }
                  >
                    <MenuItem value={"true"}>Active</MenuItem>
                    <MenuItem defaultValue="" value={"false"}>
                      Not Active
                    </MenuItem>
                  </TextField>
                </Box>

                <Box className="btnContainer">
                  <Link to={"/dashboard/ads"}>
                    <Button variant="outlined" size="large">
                      Cancel
                    </Button>
                  </Link>

                  {loading ? (
                    <LoadingButton
                      className="loadingButton"
                      loading
                      variant="outlined"
                    >
                      Submit
                    </LoadingButton>
                  ) : (
                    <Button variant="contained" type="submit" size="large">
                      Submit <ChevronRight />
                    </Button>
                  )}
                </Box>
              </Box>{" "}
            </>
          )}
    </>
  );
};

export default AddNewAds;
