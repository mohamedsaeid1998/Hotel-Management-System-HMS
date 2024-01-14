/** @format */

import { CreateFacility } from "@/Redux/Features/Facilities/CreateFacilitySlice";
import { ChevronRight } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddNewFacility.module.scss";
import { updateFacilityData } from "@/Redux/Features/Facilities/updateFacilitySlice";
import { FacilitiesData } from "@/Redux/Features/Facilities/FacilitiesSlice";
import { facilitiesDataDetails } from "@/Redux/Features/Facilities/FacilitiesDetailsSlice";
interface propState {
  isEdit: boolean;
}
const AddNewFacility = () => {
  const { id } = useParams();
  const [facilityID, setFacilityID] = useState("");
  const [facDetails, setFacDetails] = useState([]);

  const location = useLocation();
  const { isEdit } = location.state as propState;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const required = "This Field is required";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const facilityDetails = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const facilityEditDetails = await dispatch(facilitiesDataDetails(id));
        setFacDetails(facilityEditDetails.payload.data.facility);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, setValue]
  );
  //? ***************Send Data***************
  const sendData = async (data: any) => {
    setLoading(true);
    if (!isEdit) {
      // @ts-ignore
      const FacilityData = await dispatch(CreateFacility(data));
      // @ts-ignore
      if (
        FacilityData?.payload?.message === "Room Facility created successfully"
      ) {
        setLoading(false);
        toast.success("Room Facility Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/room-facilities");
      } else {
        setLoading(false);
        toast.error("Room Facility Was Not Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    } else {
      const id = facilityID;
      const updateData = await dispatch(updateFacilityData({ data, id }));
      if (updateData?.payload?.success) {
        setLoading(false);
        toast.success("Room Facility Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/dashboard/room-facilities");
      } else {
        setLoading(false);
        toast.error("Room Facility Was Not Created Successfully", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    }
  };
  useEffect(() => {
    if (isEdit) {
      setFacilityID(id);
      facilityDetails(id);
      setValue("name", facDetails.name);
    }
  }, [id]);
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
            label="Facility Name"
            color="secondary"
            {...register("name", {
              required,
              minLength: { value: 3, message: "minlength is 3" },
            })}
            error={!!errors.name}
            helperText={
              !!errors.name ? errors?.name?.message?.toString() : null
            }
          />

          <Box className="btnContainer">
            <Link to={"/dashboard/room-facilities"}>
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
        </Box>
      ) : (
        "...Loading"
      )}
    </>
  );
};
export default AddNewFacility;
