/** @format */

import { CreateAds } from "@/Redux/Features/Ads/CreateAdsSlice";
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
import { updateAdsData } from "@/Redux/Features/Ads/UpdateAdsSlice";

const AddNewAds = () => {
  const [AdsID, setAdsID] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const { isEdit } = location.state as propState;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const required = "This Field is required";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //? ***************Get Rooms Id ***************
  const [roomsData, setRoomsData] = useState([]);

  const getData = useCallback(async () => {
    try {
      // @ts-ignore
      const element = await dispatch(RoomsData());
      // @ts-ignore
      setRoomsData(element.payload.data.rooms);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setRoomsData, dispatch]);

  useEffect(() => {
    if (isEdit) {
      setAdsID(id);
    }

    getData();
  }, [AdsID]);

  //? ***************Send Data***************

  const sendData = async (data: any) => {
    setLoading(true);
    if (!isEdit) {
      // @ts-ignore
      const createAdsData = await dispatch(CreateAds({ ...data }));
      // @ts-ignore
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
      const id = AdsID;
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

    // AdsID
  };
  return (
    <>
      <Box
        className="formContainer"
        component="form"
        onSubmit={handleSubmit(sendData)}
      >
        {!isEdit ? (
          <TextField
            label="select Room"
            className="roomNumber"
            color="secondary"
            select
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
        ) : (
          ""
        )}

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
            error={!!errors.discount}
            helperText={
              !!errors.discount ? errors?.discount?.message?.toString() : null
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
            error={!!errors.isActive}
            helperText={
              !!errors.isActive ? errors?.isActive?.message?.toString() : null
            }
          >
            <MenuItem value={"true"}>Active</MenuItem>
            <MenuItem value={"false"}>Not Active</MenuItem>
          </TextField>
        </Box>
        <Box className="btnContainer">
          <Link to={"/dashboard/ads"}>
            <Button variant="outlined" size="large">
              Cancel
            </Button>
          </Link>

          {loading ? (
            <LoadingButton className="loadingButton" loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <Button variant="contained" type="submit" size="large">
              Submit <ChevronRight />
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AddNewAds;
