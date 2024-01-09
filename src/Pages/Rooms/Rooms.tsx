/** @format */

import { NoImage5 } from "@/Assets/Images";
import { TableHeader } from "@/Components";
import { deleteRoom } from "@/Redux/Features/Rooms/DeleteRoomSlice";
import { RoomsData } from "@/Redux/Features/Rooms/GetRoomsSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  ListItemIcon,
  ListItemText,
  MenuList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { indigo } from "@mui/material/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Rooms.module.scss";

import DeleteModal from "@/Components/DeleteModal/DeleteModal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ViewRoomDetails } from "..";

const Rooms = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [viewRoom, setViewRoom] = useState(false);
  const [roomDetailsData, setRoomDetailsData] = useState([]);
  const [roomId, setRoomId] = useState();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  {
    /*Handle delete slice */
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const element = await dispatch(RoomsData());
      setTableData(element.payload.data.rooms);
    } finally {
      setLoading(false);
    }
    const element = await dispatch(RoomsData());
    setTableData(element.payload.data.rooms);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setRoomId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewDetailsHandler = async (id: number) => {
    setViewRoom(false);
    try {
      const response = await axios.get(
        `http://154.41.228.234:3000/api/v0/admin/rooms/${id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDYzODYzOSwiZXhwIjoxNzA1ODQ4MjM5fQ.dixSKzJg0GUeBzRrHxsbSqqYiv1ley3p3cXRmjGDr1Y`,
          },
        }
      );
      setRoomDetailsData(response.data.data?.room);
      setViewRoom(true);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(roomId);

  useEffect(() => {
    viewDetailsHandler();
  }, []);
  return (
    <>
      {!viewRoom ? (
        <>
          <TableHeader title={"Rooms"} subTitle={"Room"} path={"/addNewRoom"} />
          <TableContainer className="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>RoomNumber</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableBody>
                  <TableCell colSpan={7}>Loading...</TableCell>
                </TableBody>
              ) : tableData?.length > 0 ? (
                <TableBody>
                  {tableData?.map((room) => (
                    <TableRow key={room?._id}>
                      <TableCell>{room.roomNumber}</TableCell>
                      <TableCell>
                        {room.images[0] === "" ? (
                          <img
                            className="img-table"
                            src={NoImage5}
                            alt="images"
                          />
                        ) : (
                          <img
                            className="img-table"
                            src={
                              `http://upskilling-egypt.com:3000/` +
                              room?.images[0]
                            }
                            alt="image"
                          />
                        )}
                      </TableCell>
                      <TableCell>{room.price}</TableCell>
                      <TableCell>{room.discount}</TableCell>
                      <TableCell>{room.capacity}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={(e) => handleClick(e, room?._id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <MenuList>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "20ch",
                              },
                            }}
                          >
                            <MenuItem>
                              <ListItemIcon
                                style={{ color: indigo[500] }}
                                onClick={() => viewDetailsHandler(roomId)}
                              >
                                <VisibilityIcon />
                              </ListItemIcon>
                              view
                            </MenuItem>
                            <MenuItem>
                              <ListItemIcon style={{ color: indigo[500] }}>
                                <EditIcon />
                              </ListItemIcon>
                              <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleOpenDialog}>
                              <ListItemIcon
                                style={{ color: indigo[500] }}
                                // onClick={handleOpenDialog}
                              >
                                <DeleteOutlineIcon />
                              </ListItemIcon>
                              <ListItemText>Delete</ListItemText>
                            </MenuItem>
                          </Menu>
                        </MenuList>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow></TableRow>
                </TableBody>
              ) : (
                "No Data Available"
              )}
            </Table>
          </TableContainer>
        </>
      ) : (
        <ViewRoomDetails roomDetailsData={roomDetailsData} />
      )}
      <DeleteModal
        roomId={roomId}
        getData={getData}
        handleSubmit={handleSubmit}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
      />
    </>
  );
};

export default Rooms;
